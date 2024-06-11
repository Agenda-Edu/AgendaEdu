# API de Agenda Educativa

Este repositório contém uma API desenvolvida para gerenciar uma agenda educativa. Abaixo, detalho as principais funcionalidades da API, bem como as tecnologias utilizadas em sua construção.

## Funcionalidades Principais

1. **Autenticação de Usuários:** Permite que os usuários façam login na plataforma utilizando email e senha.
2. **Gerenciamento de Usuários:** Permite o cadastro, edição, visualização e exclusão de usuários.
3. **Gerenciamento de Alunos:** Possibilita o cadastro, edição, visualização e exclusão de informações de alunos.
4. **Envio de Mensagens:** Permite o envio de mensagens para os usuários, podendo ser alertas, avisos, lembretes ou mensagens comemorativas.

## Tecnologias Utilizadas

- ![Node.js](https://upload.wikimedia.org/wikipedia/commons/thumb/d/d9/Node.js_logo.svg/220px-Node.js_logo.svg.png): Plataforma para o desenvolvimento do servidor HTTP e das APIs.
- ![Express.js](https://upload.wikimedia.org/wikipedia/commons/thumb/6/64/Expressjs.png/220px-Expressjs.png): Framework para desenvolvimento de aplicações web com Node.js.
- ![Prisma ORM](https://avatars.githubusercontent.com/u/34112259?s=200&v=4): Ferramenta de ORM para interação com o banco de dados MongoDB.
- ![MongoDB](https://webassets.mongodb.com/_com_assets/cms/mongodb_logo1-76twgcu2dm.png): Banco de dados NoSQL utilizado para armazenar os dados da aplicação.
- ![JWT](https://jwt.io/img/pic_logo.svg): Utilizado para autenticação e autorização de usuários.
- ![bcrypt](https://upload.wikimedia.org/wikipedia/commons/thumb/8/88/Bcrypt_logo.svg/220px-Bcrypt_logo.svg.png): Biblioteca para hash de senhas.
- ![dotenv](https://upload.wikimedia.org/wikipedia/commons/thumb/c/c7/Dotenv_logo.svg/220px-Dotenv_logo.svg.png): Utilizado para carregar variáveis de ambiente a partir de um arquivo `.env`.
- ![moment.js](https://upload.wikimedia.org/wikipedia/commons/thumb/3/3a/Moment.js_logo.svg/220px-Moment.js_logo.svg.png): Biblioteca para manipulação de datas e horas.
- ![TypeScript](https://upload.wikimedia.org/wikipedia/commons/thumb/4/4c/Typescript_logo_2020.svg/220px-Typescript_logo_2020.svg.png): Linguagem de programação utilizada para escrever o código-fonte da API.

## Arquitetura

A API segue a arquitetura MVC (Model-View-Controller), com algumas adaptações:

- **Controller:** Responsável por receber as requisições HTTP, chamar os serviços apropriados e retornar as respostas adequadas.
- **Service:** Contém a lógica de negócio da aplicação, sendo responsável por manipular os dados e executar operações no banco de dados.
- **Repository:** Camada responsável por abstrair o acesso ao banco de dados.
- **Middleware:** Utilizado para interceptar e processar requisições HTTP antes de serem enviadas para as rotas.

Espero que este README forneça uma visão clara das funcionalidades da API e das tecnologias utilizadas em sua implementação. Em caso de dúvidas ou sugestões, não hesite em entrar em contato!
