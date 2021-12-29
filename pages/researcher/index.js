import { useState } from "react";
import { render } from "react-dom";
import { useIntl } from "react-intl";
import Breadcrumb from "../../components/breadcrumb";

const tabs = [
  {
    id: 'papers',
    render: () => <div>papers</div>
  },
  {
    id: 'awards',
    render: () => <div>awards</div>
  },
  {
    id: 'advising',
    render: () => <div>advising</div>
  },
  {
    id: 'initiatives',
    render: () => <div>initiatives</div>
  },
];

export default function ResearcherPage() {
  const [activeTab, setActiveTab] = useState(tabs[0]);
  const { formatMessage: f } = useIntl();

  return (
    <main className="navbar-padded-container container fade-in">
      <Breadcrumb />

      <section className="hero">
        <div className="hero-body">
          <p className="title">{ f({ id: 'heroTitle'}) }</p>
          <p className="subtitle">{ f({ id: 'heroSubtitle'}) }</p>

          <nav className="level">
            <div className="level-item has-text-centered">
              <div>
                <p className="heading">{ f({ id: 'papers' }) }</p>
                <p className="title">4</p>
              </div>
            </div>
            <div className="level-item has-text-centered">
              <div>
                <p className="heading">{ f({ id: 'advisored' }) }</p>
                <p className="title">22</p>
              </div>
            </div>
            <div className="level-item has-text-centered">
              <div>
                <p className="heading">{ f({ id: 'directAwards' }) }</p>
                <p className="title">19</p>
              </div>
            </div>
            <div className="level-item has-text-centered">
              <div>
                <p className="heading">{ f({ id: 'studentAwards' }) }</p>
                <p className="title">+20</p>
              </div>
            </div>
          </nav>

        </div>
      </section>
      
      <div className="tabs is-medium is-centered">
        <ul>
          {
            tabs.map((tab) => ( 
              <li key={tab.id} className={ activeTab === tab ? 'is-active' : '' }>
                <a onClick={() => setActiveTab(tab)}>{ f({ id: `tabs.${tab.id}` }) }</a>
              </li>
            ))
          }
        </ul>
      </div>

      <div className="container">
        { activeTab && activeTab.render() }
      </div>
    </main>
  );
}
