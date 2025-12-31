import React from 'react';

// Using a small local component for icons to keep this file self-contained
const Icon = ({ path }) => (
  <svg height="16" viewBox="0 0 16 16" width="16" fill="#656d76">
    <path d={path} fillRule="evenodd"></path>
  </svg>
);

export const ProfileSidebar = ({ profile }) => {
  if (!profile) return null;

  return (
    <aside className="sidebar">
      <div className="profile-image-container">
        <img src={profile.avatar_url} alt={profile.login} className="profile-img" />
        <div className="status-icon">🎯</div>
      </div>

      <h1 className="vcard-names">
        <span className="p-name">{profile.name}</span>
        <span className="p-nickname">{profile.login}</span>
      </h1>
      
      <div className="bio">{profile.bio}</div>
      <button className="btn-edit-profile">Edit profile</button>

      <div className="profile-details">
        <div className="detail-item">
            {/* SVG paths omitted for brevity, you can reuse the ones from previous step */}
            <span><b>{profile.followers}</b> followers</span> · <span><b>{profile.following}</b> following</span>
        </div>
        {profile.company && <div className="detail-item">{profile.company}</div>}
        {profile.location && <div className="detail-item">{profile.location}</div>}
        {profile.blog && <div className="detail-item"><a href={profile.blog}>{profile.blog}</a></div>}
      </div>
    </aside>
  );
};