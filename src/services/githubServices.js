const BASE_URL_USER = 'https://api.github.com/users';
const BASE_URL_CONTRIB = 'https://github-contributions-api.jogruber.de/v4';

const fetchJson = async (url) => {
  const response = await fetch(url);
  if (!response.ok) {
    throw new Error(`API Error: ${response.statusText}`);
  }
  return response.json();
};

export const githubService = {
  fetchUserProfile: (username) => fetchJson(`${BASE_URL_USER}/${username}`),
  
  fetchUserRepos: (username) => fetchJson(`${BASE_URL_USER}/${username}/repos?sort=pushed&per_page=6`),
  
  fetchContributions: (username) => fetchJson(`${BASE_URL_CONTRIB}/${username}?y=last`),
};