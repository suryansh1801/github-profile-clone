import { useState, useEffect } from 'react';
import { githubService } from '../services/githubServices';

export const useGitHubData = (username) => {
  const [profile, setProfile] = useState(null);
  const [repos, setRepos] = useState([]); // New State for Repos
  const [contributions, setContributions] = useState(null);
  
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const loadData = async () => {
      setLoading(true);
      try {
        // Fetch all 3 data sources in parallel
        const [userData, repoData, contribData] = await Promise.all([
          githubService.fetchUserProfile(username),
          githubService.fetchUserRepos(username),
          githubService.fetchContributions(username)
        ]);
        
        setProfile(userData);
        setRepos(repoData); // Store the real repos
        setContributions(contribData);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    if (username) {
      loadData();
    }
  }, [username]);

  return { profile, repos, contributions, loading, error };
};