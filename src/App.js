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

// --- The Profile Layout & Router ---
const ProfileView = () => {
  const { username } = useParams(); // Gets 'shreeramk' from URL
  
  // Fetch ALL data once here and pass it down
  const { profile, repos, contributions, loading, error } = useGitHubData(username);

  if (loading) return <div className="loading">Loading {username}'s Profile...</div>;
  if (error) return <div className="error">Error: {error}</div>;

  return (
    <div className="container">
      {/* Navbar with Tab Navigation (built-in) */}
      <Navbar username={username} />
      
      <div className="main-layout">
        {/* Left Sidebar (Static) */}
        <ProfileSidebar profile={profile} />

        {/* Right Content (Dynamic based on Route) */}
        <main className="content">
            <Routes>
                {/* 1. Overview Tab (Default) */}
                <Route index element={
                    <Overview repos={repos} contributions={contributions} />
                } />
                
                {/* 2. Repositories Tab */}
                <Route path="repos" element={
                    <RepositoryList repos={repos} />
                } />

                {/* 3. Other Tabs (Placeholders) */}
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

// --- Main App Entry ---
function App() {
  return (
    <Router>
      <Routes>
        {/* Wildcard to match /username and /username/anything */}
        <Route path="/:username/*" element={<ProfileView />} />
        
        {/* Redirect root to default user */}
        <Route path="/" element={<Navigate to="/shreeramk" replace />} />
      </Routes>
    </Router>
  );
}

export default App;