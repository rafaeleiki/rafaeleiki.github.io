import Image from 'next/image';
import Link from 'next/link';

export default function Developer() {
  return (
    <main className="navbar-padded-contrainer container">
      <div className="block px-5 py-6">
        <nav className="breadcrumb mt-6" aria-label="breadcrumbs">
          <ul>
            <li><Link href="/"><a href="#">Home</a></Link></li>
            <li className="is-active"><a href="#" aria-current="page">Desenvolvedor Full-Stack</a></li>
          </ul>
        </nav>
      </div>

      <div className="section is-medium columns">
        <div className="column text-column">
          <h1 className="title is-size-1 block">
            Experiências
          </h1>
          
          <div className="block">
            <div className="block">
              <h3 className="is-size-5 title">Engenheiro de Software Senior</h3>
              <h4 className="is-size-6 subtitle">Lift Ventures - Jan/2021 - Presente</h4>
            </div>
            <p className="block">
              Desenvolvedor Full-Stack, trabalhando com Ruby on Rails e React.
            </p>
            <hr />
          </div>

          <div className="block">
            <div className="block">
              <h3 className="is-size-5 title">Engenheiro de Software III</h3>
              <h4 className="is-size-6 subtitle">QuintoAndar - Abr/2021 - Dez/2021</h4>
            </div>
            <p className="block">
              Desenvolvedor Full-Stack, trabalhando com Java (Spring, Hibernate) e React.
            </p>
            <hr />
          </div>

          <div className="block">
            <div className="block">
              <h3 className="is-size-5 title">Cofundador</h3>
              <h4 className="is-size-6 subtitle">Vivros - Jan/2018 - Mar/2021</h4>
            </div>
            <p className="block">
              Co-fundador da Vivros, uma startup de livros interativos no papel e no app. Além de responsabilidades
              de negócio, fiz parte do desenvolvimento do site (Ruby on Rails, React) e do aplicativo Android (Java, Kotlin).
            </p>
          </div>
        </div>

        <div className="column image-column">
          <Image
            src="/images/cm20-abertura.webp"
            layout="fill"
            objectFit="cover"
          />
        </div>
      </div>

      <div className="section is-medium columns">
        <div className="column image-column">
          <Image
            src="/images/microsoft-internship.webp"
            layout="fill"
            objectFit="cover"
          />
        </div>

        <div className="column text-column">
          
          <div className="block">
            <div className="block">
              <h3 className="is-size-5 title">Estágio de Inverno - Engenheiro Back-end</h3>
              <h4 className="is-size-6 subtitle">Microsoft - Dez/2018 - Mar/2019</h4>
            </div>
            <p className="block">
              Estágio no Business Application Group desenvolvendo uma feature para ajudar publicadores parceiros e clientes do Dynamics 365 em uma estrutura backend complexa usando C#.
            </p>
            <hr />
          </div>

          <div className="block">
            <div className="block">
              <h3 className="is-size-5 title">Líder Técnico de Engenharia - Full-stack</h3>
              <h4 className="is-size-6 subtitle">Instituto Cientista Beta - Fev/2018 - Dez/2018</h4>
            </div>
            <p className="block">
              Desenvolvimento das plataformas virtuais do Decola Beta e Mapa das Feiras, impactando o programa com mais de 100 jovens, mentores e mentores parceiros. Coordenação de uma equipe de 3 engenheiros. Projetos desenvolvidos usando Ruby on Rails e JavaScript.
            </p>
          </div>

        </div>
      </div>

      <div className="section is-medium columns">
        <div className="column text-column">
          
          <div className="block">
            <div className="block">
              <h3 className="is-size-5 title">P&D de Iniciação Científica</h3>
              <h4 className="is-size-6 subtitle">Unicamp - Nov/2016 - Jun/2019</h4>
            </div>
            <p className="block">
              Além das responsabilidades de pesquisa, atuei no desenvolvimento (principalmente web, JavaScript, AR.js) 
                de tecnologias para suporte à minha pesquisa e as do laboratório de pesquisa LInterHAD.
                Mais detalhes da parte de pesquisa aqui.
            </p>
            <hr />
          </div>

          <div className="block">
            <div className="block">
              <h3 className="is-size-5 title">Desenvolvedor Full-Stack Jr.</h3>
              <h4 className="is-size-6 subtitle">PlayKids - Nov/2015 - Jun/2016</h4>
            </div>
            <p className="block">
              Desenvolvimento do CMS da equipe do PlayKids, com 6 milhões de usuários ativos por mês em mais de 25 países.
                Tecnologias: Ruby on Rails, jQuery, Spring (Java).
            </p>
          </div>
          

          <div className="block">
            <div className="block">
              <h3 className="is-size-5 title">Estagiário de Desenvolvimento Full-stack</h3>
              <h4 className="is-size-6 subtitle">PlayKids - Jan/2015 - Out/2015</h4>
            </div>
            <p className="block">
              Desenvolvimento do CMS da equipe do PlayKids, com 6 milhões de usuários ativos por mês em mais de 25 países.
                Tecnologias: Ruby on Rails, jQuery, Spring (Java).
            </p>
          </div>
        </div>

        <div className="column image-column">
          <Image
            src="/images/ihc2019.webp"
            layout="fill"
            objectFit="cover"
          />
        </div>
      </div>

      <div className="section is-medium columns">
      <div className="column image-column">
          <Image
            src="/images/fb-hack.webp"
            layout="fill"
            objectFit="cover"
          />
        </div>

        <div className="column text-column">
          <h1 className="title is-size-1 block">
            Formação
          </h1>
          
          <div className="block">
            <div className="block">
              <h3 className="title is-size-5">Bacharel em Ciência da Computação</h3>
              <h4 className="is-size-6 subtitle">Unicamp - 2015 a 2019</h4>
            </div>
            <p className="block">
              Bacharel em Ciência da Computação, certificado em Sistemas de Informação, formado na UNICAMP em 2019. Foco de pesquisa em Interação Humano-Computador e tecnologias para educação, orientado por Cecília Baranauskas, referência mundial na área. Ganhador do prêmio "Melhor Iniciação Científica 2018" do Instituto de Computação da UNICAMP.
            </p>
            <hr />
          </div>

          <div className="block">
            <div className="block">
              <h3 className="title is-size-5">Técnico em Informática</h3>
              <h4 className="is-size-6 subtitle">COTUCA (Unicamp) - 2012 a 2015</h4>
            </div>
            <p className="block">
              Técnico em Informática com ênfase em tecnologia para educação no Trabalho de Conclusão de Curso.
            </p>
          </div>
        </div>
      </div>

    </main>
  );
}
