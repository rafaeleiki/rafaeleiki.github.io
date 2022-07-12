import Breadcrumb from "./breadcrumb";
import Footer from "./footer";

export default function Layout({ page, children }) {
  return (
    <>
      <main className="navbar-padded-container container">

      <Breadcrumb messagePrefix={'/' + page} />
      { children }

      </main>
      <Footer />
    </>
  );
}
