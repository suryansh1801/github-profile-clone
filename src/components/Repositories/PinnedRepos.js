import React from 'react';

// Helper to map language names to GitHub colors
const getLangColor = (lang) => {
  const colors = {
    JavaScript: '#f1e05a',
    TypeScript: '#2b7489',
    HTML: '#e34c26',
    CSS: '#563d7c',
    Python: '#3572A5',
    Java: '#b07219',
    Shell: '#89e051',
    Dart: '#00B4AB',
    Vue: '#41b883',
    'Jupyter Notebook': '#DA5B0B'
  };
  return colors[lang] || '#8b949e'; // Default grey if unknown
};

const RepoCard = ({ repo }) => (
  <div className="repo-card">
    <div className="repo-header">
      <a href={repo.html_url} target="_blank" rel="noopener noreferrer" className="repo-name">
        {repo.name}
      </a>
      <span className="badge">{repo.visibility || (repo.private ? 'Private' : 'Public')}</span>
    </div>
    
    <p className="repo-desc">
       {/* Truncate description if it's too long */}
       {repo.description ? repo.description : <i>No description provided.</i>}
    </p>
    
    <div className="repo-meta">
      {repo.language && (
        <span className="lang">
          <span 
            className="lang-color" 
            style={{ backgroundColor: getLangColor(repo.language) }}
          ></span>
          {repo.language}
        </span>
      )}
      
      {/* Optional: Add Star Count if you want more detail */}
      {repo.stargazers_count > 0 && (
         <span style={{ marginLeft: '16px', display: 'flex', alignItems: 'center', gap: '4px' }}>
            <svg aria-hidden="true" height="16" viewBox="0 0 16 16" width="16" fill="#656d76"><path d="M8 .25a.75.75 0 0 1 .673.418l1.882 3.815 4.21.612a.75.75 0 0 1 .416 1.279l-3.046 2.97.719 4.192a.75.75 0 0 1-1.088.791L8 12.347l-3.766 1.98a.75.75 0 0 1-1.088-.79l.72-4.194L.818 6.374a.75.75 0 0 1 .416-1.28l4.21-.611L7.327.668A.75.75 0 0 1 8 .25Z"></path></svg>
            {repo.stargazers_count}
         </span>
      )}
    </div>
  </div>
);

export const PinnedRepos = ({ repos }) => {
  // Guard clause if API returns empty or error
  if (!repos || repos.length === 0) {
      return <div className="pinned-section">No repositories found.</div>;
  }

  return (
    <div className="pinned-section">
      <div className="section-title">
          <h2>Popular repositories</h2>
          <span className="link">Customize your pins</span>
      </div>
      <div className="pinned-grid">
          {repos.map((repo) => (
              <RepoCard key={repo.id} repo={repo} />
          ))}
      </div>
    </div>
  );
};