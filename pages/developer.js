import Image from 'next/image';
import Link from 'next/link';

const TEXT_COLUMN = 1;
const IMAGE_COLUMN = 2;

function Grid({title, grid}) {
  return (
    <div>
      {
        grid.map((columns, i) => (
          <div className="section columns">
            { columns.map((column) => 
                column.type === TEXT_COLUMN 
                ? (<div className="column text-column">
                    { i === 0 && 
                      (<h1 className="title is-size-1 block">{title}</h1>) 
                    }
                    { column.experiences.map(experience => (
                      <article class="media">
                        <figure class="media-left">
                          <p class="image is-64x64">
                            <Image
                              src={experience.companyLogoSrc}
                              width={64}
                              height={64}
                            />
                          </p>
                        </figure>
                        <div class="media-content">
                          <div class="content">
                            <p>
                              <strong>{ experience.title }</strong>{' '}
                              <small className="is-inline-block">@{ experience.company }</small>{'  '} 
                              <small className="is-inline-block">{ experience.time }</small>
                              <br />
                              { experience.description }
                            </p>
                          </div>
                        </div>
                      </article>
                    )) }
                  </div>)
                : (
                    <div className="column image-column">
                      <Image
                        src={column.imageSrc}
                        layout="fill"
                        objectFit="cover"
                        objectPosition={column.objectPosition}
                      />
                    </div>
                  )
              ) 
            }
          </div>    
        ))
      }
    </div>
  );
}

export default function Developer() {

  const experienceGrid = [
    [
      {
        type: TEXT_COLUMN,
        experiences: [
          {
            title: 'Engenheiro de Software Senior',
            company: 'Lift Ventures',
            time: 'Jan/2021-Presente',
            description: 'Desenvolvedor Full-Stack, trabalhando com Ruby on Rails e React.',
            companyLogoSrc: '/images/lift-ventures.webp',
          },
          {
            title: 'Engenheiro de Software III',
            company: 'QuintoAndar',
            time: 'Abr/2021-Dez/2021',
            description: 'Desenvolvedor Full-Stack, trabalhando com Java (Spring, Hibernate) e React.',
            companyLogoSrc: '/images/quintoandar.webp',
          },
          {
            title: 'Cofundador',
            company: 'Vivros',
            time: 'Jan/2018-Mar/2021',
            description: 'Co-fundador da Vivros, uma startup de livros interativos no papel e no app. Além de responsabilidades de negócio, fiz parte do desenvolvimento do site (Ruby on Rails, React) e do aplicativo Android (Java, Kotlin).',
            companyLogoSrc: '/images/vivros.gif',
          }
        ]
      },
      {
        type: IMAGE_COLUMN,
        imageSrc: '/images/cm20-abertura.webp',
        objectPosition: 'top',
      },
    ],
    [
      {
        type: IMAGE_COLUMN,
        imageSrc: '/images/microsoft-internship.webp',
        objectPosition: 'center',
      },
      {
        type: TEXT_COLUMN,
        experiences: [
          {
            title: 'Estágio de Inverno - Engenheiro Back-end',
            company: 'Microsoft',
            time: 'Dez/2018-Mar/2019',
            description: 'Estágio no Business Application Group desenvolvendo uma feature para ajudar publicadores parceiros e clientes do Dynamics 365 em uma estrutura backend complexa usando C#.',
            companyLogoSrc: '/images/microsoft.webp',
          },
          {
            title: 'Líder Técnico de Engenharia - Full-stack',
            company: 'Instituto Cientista Beta',
            time: 'Fev/2018-Dez/2018',
            description: 'Desenvolvimento das plataformas virtuais do Decola Beta e Mapa das Feiras, impactando o programa com mais de 100 jovens, mentores e mentores parceiros. Coordenação de uma equipe de 3 engenheiros. Projetos desenvolvidos usando Ruby on Rails e JavaScript.',
            companyLogoSrc: '/images/cientista-beta.webp',
          },
        ]
      },
    ],
    [
      {
        type: TEXT_COLUMN,
        experiences: [
          {
            title: 'P&D de Iniciação Científica',
            company: 'Unicamp',
            time: 'Nov/2016-Jun/2019',
            description: 'Além das responsabilidades de pesquisa, atuei no desenvolvimento (principalmente web, JavaScript, AR.js) de tecnologias para suporte à minha pesquisa e as do laboratório de pesquisa LInterHAD. Mais detalhes da parte de pesquisa aqui.',
            companyLogoSrc: '/images/unicamp.webp',
          },
          {
            title: 'Desenvolvedor Full-Stack Jr.',
            company: 'PlayKids (Movile)',
            time: 'Nov/2015-Jun/2016',
            description: 'Desenvolvimento do CMS da equipe do PlayKids, com 6 milhões de usuários ativos por mês em mais de 25 países. Tecnologias: Ruby on Rails, jQuery, Spring (Java).',
            companyLogoSrc: '/images/playkids.webp',
          },
          {
            title: 'Estagiário de Desenvolvimento Full-stack',
            company: 'PlayKids (Movile)',
            time: 'Jan/2015-Out/2015',
            description: 'Co-fundador da Vivros, uma startup de livros interativos no papel e no app. Além de responsabilidades de negócio, fiz parte do desenvolvimento do site (Ruby on Rails, React) e do aplicativo Android (Java, Kotlin).',
            companyLogoSrc: '/images/playkids.webp',
          }
        ]
      },
      {
        type: IMAGE_COLUMN,
        imageSrc: '/images/ihc2019.webp',
        objectPosition: 'center',
      },
    ],
  ];

  const educationGrid = [
    [
      {
        type: IMAGE_COLUMN,
        imageSrc: '/images/fb-hack.webp',
        objectPosition: 'center',
      },
      {
        type: TEXT_COLUMN,
        experiences: [
          {
            title: 'Bacharel em Ciência da Computação',
            company: 'UNICAMP',
            time: 'Fev/2015-Dez/2019',
            description: 'Bacharel em Ciência da Computação, certificado em Sistemas de Informação, formado na Universidade Estadual de Campinas (UNICAMP) em 2019. Foco de pesquisa em Interação Humano-Computador e tecnologias para educação, orientado por Cecília Baranauskas, referência mundial na área. Ganhador do prêmio "Melhor Iniciação Científica 2018" do Instituto de Computação da UNICAMP.',
            companyLogoSrc: '/images/unicamp.webp',
          },
          {
            title: 'Técnico em Informática',
            company: 'COTUCA',
            time: 'Fev/2012-Nov/2015',
            description: 'Técnico em Informática com ênfase em tecnologia para educação no Trabalho de Conclusão de Curso.',
            companyLogoSrc: '/images/cotuca.webp',
          },
        ]
      },
    ]
  ];

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

      { <Grid title="Experiências" grid={experienceGrid} /> }

      { <Grid title="Formação" grid={educationGrid} /> }

    </main>
  );
}
