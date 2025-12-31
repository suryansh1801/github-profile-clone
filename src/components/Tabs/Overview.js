import React from 'react';
import { PinnedRepos } from '../Repositories/PinnedRepos';
import { ContributionHeatmap } from '../Stats/ContributionHeatmap';

export const Overview = ({ repos, contributions }) => {
  return (
    <>
      {/* 1. Pinned Repositories (Top 6 Popular) */}
      <PinnedRepos repos={repos} />

      {/* 2. Contribution Graph */}
      <ContributionHeatmap data={contributions} />
    </>
  );
};