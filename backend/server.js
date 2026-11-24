const express = require("express");
const morgan = require("morgan");
const fs = require("fs");
const path = require("path");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(morgan("dev"));
app.use(express.json());

const ARQUIVO = path.join(__dirname, "data", "filmes.json");

const porta = process.env.PORT || 3000;

function gerarId(lista){
  const ids = lista.map((filme) => filme.id);
  return Math.max(0, ...ids) + 1;
}

function lerFilmes() {
  const dados = fs.readFileSync(ARQUIVO, "utf8");
  return JSON.parse(dados);
}

function salvarFilmes(lista) {
  fs.writeFileSync(ARQUIVO, JSON.stringify(lista, null, 2));
}

function validarFilme(filme) {
  const erros = [];

  if (typeof filme.titulo !== "string" || !filme.titulo.trim()) {
    erros.push("Título é obrigatório");
  }
  if (!Number.isFinite(filme.ano) || filme.ano < 1888 || filme.ano > 2030) {
    erros.push("Ano deve estar entre 1888 e 2030");
  }
  if (typeof filme.genero !== "string" || !filme.genero.trim()) {
    erros.push("Gênero é obrigatório");
  }
  if (!Number.isFinite(filme.nota) || filme.nota < 1 || filme.nota > 5) {
    erros.push("nota deve estar entre 1 e 5");
  }
  if (!["assistido", "assistindo", "quero"].includes(filme.status)) {
    erros.push("status deve ser assistido, assistindo ou quero");
  }

  return erros;
}

app.get("/", (req, res) => {
  res.json({ola: "Cinetrack!"});
});

app.get("/filmes", (req, res) => {
  let filmes = lerFilmes();

  if (req.query.q){
    filmes = filmes.filter((filme) => filme.titulo.toLowerCase().includes(req.query.q.toLowerCase()));
  }

  if (req.query.status) {
    filmes = filmes.filter((filme) => filme.status === req.query.status);
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

app.post("/filmes", (req, res) => {
  const dados = req.body || {};
  const erros = validarFilme(dados);
  if (erros.length) {
    return res.status(400).json({ erros });
  }
  const lista = lerFilmes();
  const novo = {id: gerarId(lista), ...dados};
  lista.push(novo);
  salvarFilmes(lista);
  return res.status(201).json(novo);
});


app.put("/filmes/:id", (req, res) => {
  const id  = Number(req.params.id);
  const lista = lerFilmes();
  const i = lista.findIndex((f) => f.id === id);
  if (i === -1) {
    return res.status(404).json({ erro: "Filme não encontrado" });
  }
  const atualizado = { ...lista[i], ...(req.body || {}), id };
  const erros = validarFilme(atualizado);
  if (erros.length) {
    return res.status(400).json({ erros });
  }
  lista[i] = atualizado;
  salvarFilmes(lista);
  res.json(lista[i]);
});


app.delete("/filmes/:id", (req,res) => {
  const id = Number(req.params.id);
  const lista = lerFilmes();
  if(!lista.some(f => f.id === id)){
    return res.status(404).json({ erro: "Filme não encontrado" });
  }
  salvarFilmes(lista.filter((f) => f.id !== id));
  res.sendStatus(204);
});


app.get("/stats", (req, res) => {
  const filmes = lerFilmes();
  const total = filmes.length;
  const porStatus = filmes.reduce((acc, filme) => {
    acc[filme.status] = (acc[filme.status] || 0) + 1;
    return acc;
  }, {});
  const somaNotas = filmes.reduce((acc, filme) => acc + (filme.nota || 0), 0);
  const mediaNotas = Number((somaNotas / total).toFixed(1));

  res.json({ total, porStatus, mediaNotas });
});

app.listen(porta, () => console.log(`API na porta ${porta}`));