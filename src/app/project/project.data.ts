import {Project} from './project';

export const PROJECTS: Project[] = [
  {
    id: 'about',
    name: 'Rafael Eiki',
    color: '#343434',
    symbol: '<img src="assets/img/eiki.jpg" />',
    desc: `<h2>Tecnologia, educação, IHC, P&D</h2>
           <p>Rafael Eiki é um programador e pesquisador de IHC e tecnologias educacionais.
              Formado em Técnico em Informática pelo Colégio Técnico de Campinas e 
              estudante da graduação em Ciência da Computação na Univesidade Estadual
              de Campinas, membro do grupo de pesquisa InterHad, Microsoft Student
              Partner e co-fundador da Vivros.</p>
           <p>Começou a pesquisar sobre tecnologias para educação em 2014, com detaque
              para as práticas de letramento digital. Desenvolveu 2 pesquisas entre 2014 e 
              2016 com o projeto Yarner, sendo um dos representantes do Brasil na Intel ISEF
              2016, a maior feira de ciências do mundo.</p>
           <p>Ganhador de mais de 30 prêmios acadêmicos, de empreendedorismo e impacto social
              e mais 17 prêmios como coorientador de projetos.</p>
           <p>Principais prêmios: ganhador do Hackathon Facebook Brazil 2018, representando o
              país na mundial; vencedor da Campus Mobile 2018; ganhador do Hackathon Motorola 
              Mod the Future 2017; finalista LATAM da Imagine Cup 2017 e 2018; 
              Oracle Academy Outstanding project in Systems Software 2016; 
              GoDaddy Web Innovator Award 2016; 4º lugar na Intel ISEF 2016; Melhor pesquisa
              do estado de São Paulo na Feira Brasileira de Ciências e Engenharia 2016; 
              Menção honrosa de destaque científico do Instituto 3M; 1º lugar na Mostra de
              Ciência e Inovação 3M 2015; Medalhista de bronze na Olimpíada Brasileira de
              Informática 2014; Campeão da Copa Rio Info de Algoritmo 2013.</p>`,
  },
  {
    id: 'playkids',
    name: 'PlayKids',
    color: '#947cfb',
    symbol: '<img src="assets/img/playkids.png" />',
    desc: `<h2>Desenvolvimento do app #1 infantil em 2015</h2>
           <p>PlayKids é uma plataforma educativa com desenhos, livros, 
           jogos e atividades para as crianças.</p> 
           <p> A empresa possui vários aplicativos com conteúdos de vídeos, games e
            outras atividades para melhorar as habilidades das crianças enquanto
            elas estão se entretendo. O PlayKids, um dos produtos da empresa, é um
            dos maiores aplicativos para crianças no mundo.</p>
           <p>Rafael trabalhou no desenvolvimento da área de servidor de conteúdo da empresa,
            atuando tanto com front-end quanto com back-end. Ele trabalhou com um time
            diversificado e espalhado pelo mundo num app global.</p>
           <p>Aplicativo disponível para iOS, Android, Apple Watch e Apple TV.
            Mais detalhes em <a href="https://playkids.com" target="_blank">playkids.com</a></p>`,
  },
  {
    id: 'yarner',
    name: 'Yarner',
    color: '#1B98D6',
    symbol: '<img src="assets/img/yarner-f.png" />',
    desc: `<h2>Plataforma de criação de livros digitais interativos</h2>
           <p>Yarner é um projeto que tem como objetivo melhorar os hábitos culturais
              de leitura e escrita através de uma plataforma que permite a criação,
              leitura e compartilhamento de livros digitais interativos.</p>
           <p>Rafael é co-fundador do Yarner, trabalhando com todas as áreas do projeto,
              incluindo a pesquisa que foi feita baseada nele.</p>
           <p>O projeto recebeu mais de 20 prêmios em feiras de ciência no Brasil e nos
              Estados Unidos, incluindo prêmios de empresas como Intel, 3M, Oracle e GoDaddy.</p>
           <p>Disponível em <a href="http://www.yarner.com.br" target="_blank">www.yarner.com.br</a></p>`,
  },
  {
    id: 'cooking',
    name: 'CooKing',
    color: '#f23100',
    symbol: '<img src="assets/img/cooking.svg" />',
    desc: `<h2>App de assistente virtual na cozinha</h2>
           <p>CooKing é um aplicativo que funciona como seu assistente na cozinha. Com ele,
              é possível controlar e obter ajuda com tudo na cozinha: da seleção do prato
              ao momento de preparo.</p>
           <p>Rafael é co-fundador do CooKing.</p>
           <p>O projeto recebeu 2 prêmios de empreendedorismo e foi finalista
              da final nacional da Imagine Cup 2017.</p>
           <p>Saiba mais na <a href="http://fb.com/projetocooking" target="_blank">página do Facebook do projeto
              </a></p>`,
  },
  {
    id: 'virada',
    name: 'Virada das Coisas',
    color: '#ff559e',
    symbol: '<img src="assets/img/virada.jpg" />',
    desc: `<h2>Design de uma experiência IoT para a Virada Cultural</h2>
           <p>A Virada Cultural é um evento que acontece anualmente em diversas cidades do Brasil.
              Ela reúne arte em suas mais diversas formas para todos, de forma gratuita,
              incluindo apresentações de circenses, dança, shows e outras atrações.
           </p>
           <p>Esse projeto procura construir elementos de design baseado em Internet das Coisas (IoT)
              para o evento. Algumas dessas interações podem não estar disponíveis no momento, mas
              seriam possíveis num futuro próximo. A ideia central é usar IoT para criar mais
              interações sociais através de displays e outras tecnologias que estariam espalhadas
              pela cidade.
           </p>
           <p>Mais sobre o projeto pode ser visto no
              <a href="https://github.com/rafaeleiki/virada-cultural" target="_blank">GitHub</a>
           </p>
           <div>
              <iframe width="560" height="315" src="https://www.youtube.com/embed/2facGiyaGW4"
                      frameborder="0" allowfullscreen>
              </iframe>
           </div>`,
  },
  {
    id: 'data-structure',
    name: 'Estrutura de Dados',
    color: '#0047ff',
    symbol: '<span class="fa fa-database project-icon"></span>',
    desc: `<p>Com o objetivo de estudar estruturas de dados, Rafael desenvolveu
              alguns projetos em Java em 2013.
           </p>
           <p>"Turista" foi uma aplicação que permitia o usuário criar mapas
              com localidades e caminhos entre esses pontos. Usando o peso de cada
              caminho era possível obter os caminho mais curtos entre dois pontos,
              o menor caminho que passasse exclusivamente por alguns pontos ou que
              passasse por alguns lugares. Era possível tomar notas para cada caminho,
              com a intenção de ser usado por turistas. As anotações poderiam ser
              usadas para criar uma agenda com o que seria feito em cada dia / hora
              e também era possível customizar os mapas.
           </p>
           <p>"Lar" foi uma aplicação criada para compactar arquivos. Usando o algoritmo
              da Árvore de Huffman, ela permitia a compressão de arquivos no formato ".lar".
              Era possível colocar uma senha para proteger os arquivos.
           </p>`,
  },
  {
    id: 'smart-rep',
    name: 'SmartRep',
    color: '#1c4587',
    symbol: '<img src="assets/img/smartrep.png" />',
    desc: `<h2>Compartilhamento de recursos em repúblicas com IoT</h2>
           <p>É muito comum a divisão de casas por jovens para morarem em comunidade,
              especialmente na época da faculdade. Muitas vezes, é o primeiro momento
              que uma pessoa se muda, indo para outra cidade ou simplesmente para morar
              mais próximo de onde irá estudar. Quando surge a necessidade de dividr recursos
              da casa com outras pessoas, podem ocorrer problemas. Muitas coisas
              não são propriamente divisíveis (como a máquina de lavar e o banheiro)
              para uso mútuo. 
           </p>
           <p>Com a proposta de conseguir dividir "o indivisível", foi criado o projeto
              SmartRep. Ele consiste em uma série de itens IoT para utilização em
              repúblicas, permitindo um melhor controle e novas funcionalidades a itens
              do cotidiano.
           </p>
           <p>Foram aplicadas metodologias de desenvolvimento ágil e construindo
              a documentação, usando o projeto como caso de estudo em Engenharia de Software.
              Foram implementados uma máquina de lavar e varal inteligente, ligados
              com um web app.
           </p>
           <p>O projeto foi desenvolvido com Angular 4, servidor Node, Raspberry PI para
              os itens IoT e foi criado um sensor para interagir com o varal. Para
              representação do funcionamento, foi criada uma maquete funcional da casa.
           </p>`,
  },
  {
    id: 'interhad',
    name: 'InterHad',
    color: '#89b03f',
    symbol: '<img src="assets/img/interhad.png" />',
    desc: `<h2>Membro do grupo de pesquisa em IHC da Unicamp</h2>
           <p>O grupo de pesquisa InterHad (Interação Humano-Artefato) da Unicamp
              faz pesquisas na área de Interação Humano-Computador. Coordenado pela
              professora Maria Cecília Calani Baranauskas, é considerado um dos
              grupos mais importantes da área no país. Rafael é membro do grupo desde
              2016.
           </p>
           <p>Lá, Rafael participou dos projetos Sistemas Socioenativos (temático FAPESP),
              OpenDesign e realizou sua Iniciação Científica com a pesquisa sobre Leitura
              Colaborativa no ambiente Físico-Virtual (LCFV), fazendo-o desde a concepção
              da ideia e do conceito, design, implementação e teste.
           </p>
           <p>Mais informações do grupo podem ser vistas na página oficial.
           </p>`,
  },
  {
    id: 'defense-snap',
    name: 'DefenseSnap',
    color: '#6000d5',
    symbol: '<img src="assets/img/defense_snap.png" />',
    desc: `<h2>Moto Mod para defesa da mulher com anel bluetooth</h2>
           <p>Segundo o "Mapa da Violência 2015: Homicídio de Mulheres no Brasil",
              a cada 2 horas, uma mulher é assassinada. São 13 mulheres mortas por dia,
              vítimas da violência física. Esse problema grave é repetido em 
              diversos outros países do mundo.
           </p>
           <p>Com o objetivo de conseguir proporcionar uma forma de melhorar
              a defesa desse público, foi desenvolvido o DefenseSnap. Ele utiliza os
              Mods (Moto Snap) do Moto Z para criar um snap em 2 partes.
              A proposta do DefenseSnap é fornecer um botão de pânico da fácil ativação 
              e imperceptível para o agressor. Além de acionar os contatos da vítima 
              enviando dados de localização, o snap permite usar uma sirene de alta 
              frequência, baseado na solução do apito anti-assédio. O botão será acoplado 
              em um anel Bluetooth, podendo ser acionada com apenas uma mão. O anel é
              recarregado de forma wireless pelo próprio mod. Futuramente, a polícia 
              poderá ser acionada pelo acessório. 
           </p>
           <p>O DefenseSnap foi o campeão do Hackathon Mod the Future Brasil 2017.
              Rafael participou da concepção, design, codificação e foi o responsável
              pela parte de negócios da equipe. 
           </p>
           <p>Além do primeiro lugar no Hackathon, o produto segue com um processo
              de pré-aceleração da Baita Aceleradora.
           </p>`,
  },
  {
    id: 'cientista-beta',
    name: 'Cientista Beta',
    color: '#f73f46',
    symbol: '<img src="assets/img/cientista_beta.png" />',
    desc: `<h2>Mentor & desenvolvimento das plataformas de TI</h2>
           <p> Cientista Beta surgiu em 2015 como uma iniciativa que visa 
               aproximar os jovens da ciência. Além de fornecer conteúdo
               relacionados a produção de ciência durante o ensino básico,
               o projeto conta com o Programa de Iniciação Científica Decola Beta.
           </p>
           <p>O Decola Beta é voltado para estudantes do Ensino Médio e Técnico,
              onde jovens de todo o país recebem mentoria de outros engenheiros
              e cientistas do país. O programa teve início em 2016. 
           </p>
           <p>Rafael foi mentor do Decola Beta durante a edição 2017 e entrou para a
              equipe da organização em 2018, fazendo parte da equipe de TI, desenvolvendo
              a plataforma do Decola Beta e o Mapa das Feiras, projeto para mapear as feiras
              de ciência no Brasil e permitir uma maior democratização desse tipo de evento. 
           </p>
           <p>Para saber mais do projeto, acesse 
              <a href="http://cientistabeta.com.br" target="_blank">o site do Cientista Beta</a>.
           </p>`,
  },
  {
    id: 'mostractc',
    name: 'Mostractc',
    color: '#131313',
    symbol: '<img src="assets/img/mostra.png" />',
    desc: `<h2>Avaliador, mídias sociais e comitê científico</h2>
           <p>A Mostra de Trabalhos de Cursos Técnicos (Mostractc) é um evento que ocorre
              anualmente em Campinas, São Paulo, organizado pelo Colégio Técnico de 
              Campinas, da UNICAMP. Ela promove a exibição de trabalhos desenvolvidos
              por estudantes de ensino médio e técnico de todo o país.
           </p>
           <p>A primeira edição da mostra ocorreu em 2010, com 86 trabalhos da 
              Região Metropolitana de Campinas, com projetos de 12 escolas.
              Em 2015, esse número saltou para 428 projetos e cerca de 2000 participantes
              de 6 estados do país.
           </p>
           <p>Rafael participou da mostra de 2014, levando o prêmio principal do evento.
              Em 2016, voltou para o evento como avaliador. Atuou como
              responsável pela comunicação e conteúdo em mídias sociais até 2017 e 
              participou do comitê científico do evento.
           </p>
           <p>Saiba mais no 
              <a href="http://mostradetrabalhos.cotuca.unicamp.br/" target="_blank">
                site oficial da mostra
              </a>.
           </p>`,
  },
  {
    id: 'ic',
    name: 'Iniciação Científica',
    color: 'rgba(39, 255, 0, 1)',
    symbol: '<div class="lcfv-bg project-icon">\n' +
    '          <span class="fa fa-simplybuilt lcfv-icon"></span>\n' +
    '        </div>',
    desc: `<p>Rafael atualmente é bolsista de Iniciação Científica pelo
              Instituto de Computação na UNICAMP. Com a orientação de Maria
              Cecília Calani Baranauskas, ele trabalha com tecnologia
              voltada para práticas de leitura.
           </p>
           <p>Com o projeto iniciado em 2017, Rafael trabalha para o desenvolvimento
              do conceito de leitura colaborativa multiambiente através do uso
              de tecnologias contemporâneas.
           </p>
           <p>O projeto está vinculado ao Projeto Temático FAPESP para
              o desenvolvimento do conceito de sistemas socioenativos.
           </p>`,
  },
  {
    id: 'vivros',
    name: 'Vivros',
    color: '#e9cf1a',
    symbol: '<img src="assets/img/vivros.png" />',
    desc: `<h2>Livros criativos interativos no papel e no celular</h2>
           <p>Vivros é uma editora de livros interativos no papel e no celular. Com títulos
              originais, a Vivros oferece "livro mais vivos", em que dependendo de como são
              lido, o conteúdo em si muda.</p>
           <p>Buscando criar um leitura mais criativa e democrática, a Vivros acredita
              na importância dos livros de papel para o desenvolvimento infantil, mas entende
              que é necessário a contextualização do material clássico para o mundo atual, digital
              e dinâmico.</p>
           <p>Saiba mais em: <a href="https://vivros.com">www.vivros.com</a>.</p>`,
  },
  {
    id: 'devy',
    name: 'DevY',
    color: '#6851a7',
    symbol: '<img src="assets/img/devy.png" />',
    desc: `<h2>Coordenador de programa de mentoria de projetos</h2>
           <p>DevY - Developing You - é um projeto de mentoria de pesquisas científicas de 
              alunos do Ensino Médio.</p>
           <p>Executado durante os anos de 2017 e 2018, o projeto apoiou mais de 30 alunos,
           com 12 projetos sendo mentorados de forma fixa. Foram auxiliados alunos de Sâo Paulo,
           Minas Gerais e Espírito Santo. Rafael criou o programa e é seu coordenador.</p>
           <p>Saiba mais <a href="https://rafaeleiki.github.io/devy">no site oficial</a>.</p>`,
  },
];
