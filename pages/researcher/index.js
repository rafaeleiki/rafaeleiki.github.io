import Breadcrumb from "../../components/breadcrumb";
import Footer from "../../components/footer";
import Grid from "../../components/grid";
import useTranslation from "../../components/hooks/useTranslation";
import Layout from "../../components/layout";
import { PAPERS_GRID } from "../../components/page-constants/researcher-constants";

export default function ResearcherPage() {
  return (
    <Layout page="researcher">
      <div className="section">
        <Grid
          messagesPrefix="/researcher"
          initialGrid={PAPERS_GRID}
          key="experiences-section"
        />
      </div>
    </Layout>
  );
}
