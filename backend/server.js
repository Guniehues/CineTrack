const express = require("express");
const morgan = require("morgan");
const fs = require("fs");
const path = require("path");

const app = express();

app.use(morgan("dev"));
app.use(express.json());

const ARQUIVO = path.join(__dirname, "data", "filmes.json");

function lerFilmes() {
  const dados = fs.readFileSync(ARQUIVO, "utf8");
  return JSON.parse(dados);
}

app.get("/filmes", (req, res) => {
  const filmes = lerFilmes();

  if (req.query.status) {
    const filtrados = filmes.filter(
      (filme) => filme.status === req.query.status
    );
    return res.json(filtrados);
  }

  return res.json(filmes);
});

app.get("/filmes/:id", (req, res) => {
  const filmes = lerFilmes();
  const id = Number(req.params.id);
  const filme = filmes.find((item) => item.id === id);

  if (!filme) {
    return res.status(404).json({ erro: "Filme não encontrado" });
  }

  return res.json(filme);
});

app.listen(3000, () => {
  console.log("Servidor rodando em http://localhost:3000");
});
