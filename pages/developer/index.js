import Breadcrumb from '../../components/breadcrumb';
import Footer from '../../components/footer';
import Grid from '../../components/grid';

import {
  EXPERIENCE_GRID,
  EDUCATION_GRID,
} from '../../components/page-constants/developer-constants';

export default function DeveloperPage() {

  return (
    <>
      <main className="navbar-padded-container container">

      <Breadcrumb messagePrefix="/developer" />

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

      </main>
      <Footer />
    </>
  );
}
