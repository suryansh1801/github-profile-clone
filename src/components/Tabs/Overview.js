import React from 'react';
import { PinnedRepos } from '../Repositories/PinnedRepos';
import { ContributionHeatmap } from '../Stats/ContributionHeatmap';

export const Overview = ({ repos, contributions }) => {
  return (
    <>
      <PinnedRepos repos={repos} />

      <ContributionHeatmap data={contributions} />
    </>
  );
};