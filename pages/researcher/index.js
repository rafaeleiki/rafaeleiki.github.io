
import { useIntl } from "react-intl";
import Breadcrumb from "../../components/breadcrumb";
import Footer from "../../components/footer";
import Grid from "../../components/grid";
import { PAPERS_GRID } from "./_constants";

export default function ResearcherPage() {

  const { formatMessage: f } = useIntl();

  return (
    <>
      <main className="navbar-padded-container container">

      <Breadcrumb />

      <div className="section">
        <Grid
          messagesPrefix="papers"
          initialGrid={PAPERS_GRID}
          key="experiences-section"
        />
      </div>

      </main>
      <Footer />
    </>
  );
}
