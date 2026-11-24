# Teste ponta a ponta do Marco 2

Data: 24/11/2026

## Preparação e inicialização

1. No diretório `backend`, executei `node seed.js`. Resultado: `6 filmes gravados`.
2. Iniciei a API com `node server.js` em `http://localhost:3000`.
3. Iniciei o frontend com o Vite em `http://localhost:5173`. As dependências já estavam instaladas no ambiente; o comando usado foi `node ./node_modules/vite/bin/vite.js --host 0.0.0.0`. Em uso normal, siga os comandos `npm install` e `npm run dev` descritos no [README](../README.md).
4. A listagem inicial mostrou os seis filmes do seed.

## Validação da API

- POST com `nota: 7` e `status: "invalido"` respondeu HTTP `400`:

  ```json
  {
    "erros": [
      "nota deve estar entre 1 e 5",
      "status deve ser assistido, assistindo ou quero"
    ]
  }
  ```

- PUT em `/filmes/1` com os mesmos valores inválidos respondeu HTTP `400` com os dois erros, sem alterar o filme.
- Ao provocar a rejeição pelo formulário do frontend, as duas mensagens foram exibidas no modal.

## CRUD e persistência

1. Pela interface, criei o filme `ANP10 Teste`, com ano 2025, gênero `Teste`, nota 4 e status `quero`.
2. Editei o título para `ANP10 Teste Atualizado`.
3. Encerrei e reiniciei a API. Após recarregar a página, o filme editado continuou na lista: sete filmes no total.
4. Removi o filme pela interface. A lista voltou a seis filmes e a API confirmou os IDs originais de 1 a 6.

## Rotas existentes

- `GET /filmes?q=du` retornou `Duna: Parte Dois`.
- `GET /filmes/99` retornou HTTP `404`.
- `GET /stats` retornou `total: 6`, `porStatus: { "assistido": 3, "assistindo": 1, "quero": 2 }` e `mediaNotas: 4.5`.
