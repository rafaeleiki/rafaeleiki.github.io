"use client";

import Grid from '../../components/grid';
import Layout from '../../components/layout';
import { PAPERS_GRID } from '../../components/page-constants/researcher-constants';

export default function ResearcherPage() {
  return (
    <Layout page="researcher">
      <Grid
        messagesPrefix="/researcher"
        initialGrid={PAPERS_GRID}
        key="experiences-section"
      />
    </Layout>
  );
}
