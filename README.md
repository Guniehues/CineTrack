GUSTAVO AMARO NIEHUES
RA 138894

## Requisitos

- Node.js 20.6 ou superior
- npm

## Executar o projeto do zero

Em um terminal, instale as dependências e inicie o backend:

```sh
cd backend
npm install
node seed.js
npm run dev
```

`node seed.js` recria `backend/data/filmes.json` com os seis filmes iniciais.

Em outro terminal, instale as dependências e inicie o frontend:

```sh
cd frontend
npm install
npm run dev
```

O Vite informa o endereço local do frontend no terminal.

Para executar a versão estática da Parte 1, instale a extensão Live Server no VS Code, abra `parte1/index.html` e escolha **Open with Live Server**.

## Documentação

- [Rotas da API](docs/api.md)
- [Teste ponta a ponta do Marco 2](docs/testes-parte2.md)

Para gerar o build de produção do frontend, execute em `frontend`:

```sh
npm run build
```