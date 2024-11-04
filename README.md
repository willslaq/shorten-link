# Shorten Link API

**Shorten Link API** é um serviço que permite encurtar URLs, gerenciar URLs encurtadas e rastrear cliques. Construído usando Fastify, Prisma, e Postgresql, este projeto é ideal para aprender e implementar uma API robusta e escalável.

## 🚀 Instalação

### Pré-requisitos

- [Node.js](https://nodejs.org/) (versão 22.11.0)
- [Docker](https://www.docker.com/)
- [Docker Compose](https://docs.docker.com/compose/)

### Passos para Instalação

1. Clone o repositório:
   ```bash
   git clone https://github.com/seu-usuario/shorten-link.git
   cd shorten-link
   ```
2. Configure o ambiente:

- Crie um arquivo `.env` na raiz do projeto com as seguintes variáveis:
  ```bash
  DATABASE_URL="postgresql://postgres:postgres@localhost:5432/shorten_link?schema=public"
  JWT_SECRET="seu-segredo"
  PORT=3333
  ```

3. Instale as dependências
   ```bash
   npm install
   ```
4. Execte as migrations do banco de dados:
   ```bash
   npx prisma migrate deploy
   ```
5. Rode a aplicação em desenvolvimento:
   ```bash
   npm run start:dev
   ```

## 🐳 Usando Docker

Para rodar a aplicação usando Docker, siga os seguintes passos:

1. Certifique-se de que o Docker e Docker Compose estão instalados.
2. Execute o Docker Compose:
   ```bash
   docker-compose up -d
   ```

## 📜 Principais Scripts Disponíveis

- `start:dev`: Inicia a aplicação em modo de desenvolvimento com hot-reload
- `test:unit`: Roda os testes unitários
- `test:e2e`: Roda os testes E2E
- `test:coverage`: Verifica a cobertura dos testes e gera um relatório
- `lint`: Faz o linting automático do código

## 📚 Documentação

A documentação da API estará disponível na rota `/documentation` após iniciar o servidor.
Acesse em `http://localhost:3333/documentation`

## 🛠️ Tecnologias Utilizadas

- [Node.js](https://nodejs.org/)
- [Fastify](https://fastify.dev/)
- [Prisma](https://www.prisma.io/)
- [Postgresql](https://www.postgresql.org/)
- [Docker](https://www.docker.com/)
- [Zod](https://github.com/colinhacks/zod)
