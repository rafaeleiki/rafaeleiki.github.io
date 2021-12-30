import Breadcrumb from '../../components/breadcrumb';
import Footer from '../../components/footer';
import Grid from '../../components/grid';

import {
  EXPERIENCE_GRID,
  EDUCATION_GRID,
} from './_constants';

export default function DeveloperPage() {

  return (
    <>
      <main className="navbar-padded-container container">

      <Breadcrumb />

      { <Grid 
          messagesPrefix="experiences"
          initialGrid={EXPERIENCE_GRID} 
          key="experiences-section" 
        /> }

      { <Grid 
          messagesPrefix="education"
          initialGrid={EDUCATION_GRID} 
          key="education-section" 
        /> }

      </main>
      <Footer />
    </>
  );
}
