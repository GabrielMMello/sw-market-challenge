<h1 align="center">
   <a href="#"> Star Wars Market Challenge </a>
</h1>

<h3 align="center">
    Simulador de plataforma de vendas com tema Star Wars
</h3>

<p align="center">
   <img alt="License" src="https://img.shields.io/badge/license-MIT-brightgreen">
</p>


<h4 align="center"> 
	 Status: Unfinished
</h4>

<p align="center">
 <a href="#sobre">Sobre</a> •
 <a href="#recursos">Recursos</a> •
 <a href="#como-funciona">Como funciona</a> • 
 <a href="#tecnologias-utilizadas">Tecnologias utilizadas</a> • 
 <a href="#autor">Autor</a> • 
 <a href="#licença">Licença</a> •
</p>


## Sobre

Este é o projeto de um simulador de e-commerce onde é possível escolher um de cinco usuários pré-cadastrados e realizar pedidos. Além disso, é possível consultar os pedidos já realizados.

![sw-market](https://user-images.githubusercontent.com/66647120/111573710-ccbade00-8789-11eb-92ad-abbd3a77f3c1.png)

---

## Recursos

- [x] Frontend da plataforma de vendas
   - [x] Página de seleção de clientes
   - [x] Página de emissão de pedido
    - [x] O usuário escolhe o preço do produto
    - [x] Bloqueio de ação do usuário quando o preço escolhido for inferior a 90% do valor sugerido
   - [x] Página de lista de pedidos
   - [ ] Responsividade
   - [ ] Testes
   - [ ] Deploy

- [x] Backend do e-commerse
   - [x] Rota de acesso à lista de usuários
   - [x] Rota de acesso à lista de produtos
   - [x] Rota de acesso à lista de pedidos exigindo autenticação
   - [x] Configurado CORS
   - [ ] Banco de dados
   - [ ] Testes
   - [ ] Deploy

---

## Como funciona

Este projeto é dividido em duas partes:
1. Front-end em React ([pasta frontend](https://github.com/GabrielMMello/sw-market-challenge/tree/main/frontend))
2. Back-end em Node.js ([pasta server](https://github.com/GabrielMMello/sw-market-challenge/tree/main/server))

### Pré-requisitos

Antes de começar, você precisará ter as seguintes ferramentas instaladas na sua máquina:
[Git] (https://git-scm.com) e [Node.js] (https://nodejs.org/en/) na versão 14.15.5
Além disso, é bom ter um editor para trabalhar com o código como o [VSCode] (https://code.visualstudio.com/)

#### Rodando o Backend (servidor)

```bash

# Clone this repository
$ git clone https://github.com/GabrielMMello/sw-market-challenge.git

# Access the project folder cmd/terminal
$ cd sw-market-challenge

# go to the server folder
$ cd server

# install the dependencies
$ npm install

# Run the application
$ npm start

# The server will start at port: 8080 - go to http://localhost:8080

```


#### Running the web application (Frontend)

```bash

# Clone this repository (Skip this if the Backend is done)
$ git clone https://github.com/GabrielMMello/sw-market-challenge.git

# Access the project folder in your terminal
$ cd sw-market-challenge

# Go to the Front End application folder
$ cd frontend

# Install the dependencies
$ npm install

# Run the application
$ npm start

# The application will open on the port: 3000 - go to http://localhost:3000

```

---

## Tecnologias utilizadas

As seguintes ferramentas foram utilizadas na construção do projeto:

#### **Website**  ([React](https://reactjs.org/))

-   **[React Router Dom](https://github.com/ReactTraining/react-router/tree/master/packages/react-router-dom)**
-   **[Axios](https://github.com/axios/axios)**
-   **[Bootstrap](https://getbootstrap.com/docs/5.0/getting-started/introduction/)**

> See the file  [package.json](https://github.com/GabrielMMello/sw-market-challenge/blob/main/frontend/package.json)

#### **Server**  ([Node.js](https://nodejs.org/en/))

-   **[CORS](https://expressjs.com/en/resources/middleware/cors.html)**

> See the file  [package.json](https://github.com/GabrielMMello/sw-market-challenge/blob/main/server/package.json)

#### **Linguagem**  ([Javascript](https://developer.mozilla.org/pt-BR/docs/Web/JavaScript))

#### **Utilidades**

-   Editor:  **[Visual Studio Code](https://code.visualstudio.com/)**


---

## Autor

<a href="https://www.linkedin.com/in/gabriel-mendes-mello/">
 <sub><b>Gabriel Mendes Mello</b></sub>
 <br />

[![Linkedin Badge](https://img.shields.io/badge/-Gabriel-blue?style=flat-square&logo=Linkedin&logoColor=white&link=https://www.linkedin.com/in/gabriel-mendes-mello/)](https://www.linkedin.com/in/gabriel-mendes-mello/) 
[![Gmail Badge](https://img.shields.io/badge/-gabrielmendesmello@gmail.com-c14438?style=flat-square&logo=Gmail&logoColor=white&link=mailto:gabrielmendesmello@gmail.com)](mailto:gabrielmendesmello@gmail.com)
[![FreeCodeCamp Badge](https://img.shields.io/badge/-Gabriel-black?style=flat-square&logo=freecodecamp&logoColor=white&link=https://www.freecodecamp.org/gabrielmmello)](https://www.freecodecamp.org/gabrielmmello)

---

## Licença

Este projeto está sob a licença [MIT](./LICENSE).

Feito com carinho por Gabriel Mello
[Me contate a qualquer momento!](https://www.linkedin.com/in/gabriel-mendes-mello/)
