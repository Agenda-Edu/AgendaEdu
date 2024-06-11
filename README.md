# API de Agenda Educativa

Este repositório contém uma API desenvolvida para gerenciar uma agenda educativa. Abaixo, detalho as principais funcionalidades da API, bem como as tecnologias utilizadas em sua construção.

## Funcionalidades Principais

1. **Autenticação de Usuários:** Permite que os usuários façam login na plataforma utilizando email e senha.
2. **Gerenciamento de Usuários:** Permite o cadastro, edição, visualização e exclusão de usuários.
3. **Gerenciamento de Alunos:** Possibilita o cadastro, edição, visualização e exclusão de informações de alunos.
4. **Envio de Mensagens:** Permite o envio de mensagens para os usuários, podendo ser alertas, avisos, lembretes ou mensagens comemorativas.

## Tecnologias Utilizadas

- <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/d/d9/Node.js_logo.svg/300px-Node.js_logo.svg.png" width="50" height="50">: Plataforma para o desenvolvimento do servidor HTTP e das APIs.
- <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/6/64/Expressjs.png/300px-Expressjs.png" width="50" height="50">: Framework para desenvolvimento de aplicações web com Node.js.
- <img src="https://avatars.githubusercontent.com/u/34112259?s=200&v=4" width="50" height="50">: Ferramenta de ORM para interação com o banco de dados MongoDB.
- <img src="https://webassets.mongodb.com/_com_assets/cms/mongodb_logo1-76twgcu2dm.png" width="50" height="50">: Banco de dados NoSQL utilizado para armazenar os dados da aplicação.
- <img src="https://jwt.io/img/pic_logo.svg" width="50" height="50">: Utilizado para autenticação e autorização de usuários.
- <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/4/4c/Typescript_logo_2020.svg/300px-Typescript_logo_2020.svg.png" width="50" height="50">: Linguagem de programação utilizada para escrever o código-fonte da API.

## Arquitetura

A API segue a arquitetura MVC (Model-View-Controller), com algumas adaptações:

- **Controller:** Responsável por receber as requisições HTTP, chamar os serviços apropriados e retornar as respostas adequadas.
- **Service:** Contém a lógica de negócio da aplicação, sendo responsável por manipular os dados e executar operações no banco de dados.
- **Repository:** Camada responsável por abstrair o acesso ao banco de dados.
- **Middleware:** Utilizado para interceptar e processar requisições HTTP antes de serem enviadas para as rotas.

Espero que este README forneça uma visão clara das funcionalidades da API e das tecnologias utilizadas em sua implementação. Em caso de dúvidas ou sugestões, não hesite em entrar em contato!
