import React from 'react';
import { BrowserRouter as Router, Routes, Route, useParams, Navigate } from 'react-router-dom';
import './App.css';

// Hooks
import { useGitHubData } from './hooks/useGitHubData';

// Components
import { Navbar } from './components/Layout/Navbar';
import { ProfileSidebar } from './components/Profile/ProfileSidebar';

// Tab Views
import { Overview } from './components/Tabs/Overview';
import { RepositoryList } from './components/Tabs/RepositoryList';

const ProfileView = () => {
  const { username } = useParams(); // Gets 'shreeramk' from URL
  
  // Fetch ALL data once here and pass it down
  const { profile, repos, contributions, loading, error } = useGitHubData(username);

  if (loading) return <div className="loading">Loading {username}'s Profile...</div>;
  if (error) return <div className="error">Error: {error}</div>;

  return (
    <div className="container">
      <Navbar username={username} />
      
      <div className="main-layout">
        <ProfileSidebar profile={profile} />

        <main className="content">
            <Routes>
                <Route index element={
                    <Overview repos={repos} contributions={contributions} />
                } />
                
                <Route path="repos" element={
                    <RepositoryList repos={repos} />
                } />

                <Route path="projects" element={
                    <div className="empty-tab"><h3>Projects coming soon...</h3></div>
                } />
                <Route path="packages" element={
                     <div className="empty-tab"><h3>Packages coming soon...</h3></div>
                } />
                <Route path="stars" element={
                     <div className="empty-tab"><h3>Starred Repos coming soon...</h3></div>
                } />
            </Routes>
        </main>
      </div>
    </div>
  );
};

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/:username/*" element={<ProfileView />} />
        
        <Route path="/" element={<Navigate to="/shreeramk" replace />} />
      </Routes>
    </Router>
  );
}

export default App;