import Breadcrumb from '../../components/breadcrumb';
import Footer from '../../components/footer';
import Grid from '../../components/grid';
import Layout from '../../components/layout';

import {
  EXPERIENCE_GRID,
  EDUCATION_GRID,
} from '../../components/page-constants/developer-constants';

export default function DeveloperPage() {

  return (
    <Layout page="developer">
      { <Grid
          messagesPrefix="/developer"
          initialGrid={EXPERIENCE_GRID}
          key="experiences-section"
        /> }

      { <Grid
          messagesPrefix="/developer"
          initialGrid={EDUCATION_GRID}
          key="education-section"
        /> }
    </Layout>
  );
}
