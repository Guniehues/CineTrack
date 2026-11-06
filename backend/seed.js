const fs = require("fs");
const path = require("path");

const filmesIniciais = [
    { id: 1, titulo: "A Origem", ano: 2010, genero: "Ficção científica", nota: 5, status: "assistido", comentario: "Revejo sempre.", poster: "https://upload.wikimedia.org/wikipedia/pt/8/84/AOrigemPoster.jpg" },
    { id: 2, titulo: "Parasita", ano: 2019, genero: "Suspense", nota: 4, status: "assistido", comentario: "", poster: "https://upload.wikimedia.org/wikipedia/pt/b/be/Parasite_poster.jpg" },
    { id: 3, titulo: "O Auto da Compadecida", ano: 2000, genero: "Comédia", nota: 5, status: "assistido", comentario: "Classico nacional.", poster: "https://upload.wikimedia.org/wikipedia/pt/b/bf/O_auto_da_compadecida.jpg" },
    { id: 4, titulo: "Duna: Parte Dois", ano: 2024, genero: "Ficção científica", nota: 4, status: "assistindo", comentario: "", poster: "https://upload.wikimedia.org/wikipedia/pt/5/52/Dune_Part_Two_poster.jpeg" },
    { id: 5, titulo: "Interestelar", ano: 2014, genero: "Ficção científica", nota: 5, status: "quero", comentario: "", poster: "https://upload.wikimedia.org/wikipedia/pt/3/3a/Interstellar_Filme.png" },
    { id: 6, titulo: "Cidade de Deus", ano: 2002, genero: "Drama", nota: 4, status: "quero", comentario: "", poster: "https://upload.wikimedia.org/wikipedia/pt/1/10/CidadedeDeus.jpg" },
];

const ARQUIVO = path.join(__dirname, "data", "filmes.json");

fs.mkdirSync(path.dirname(ARQUIVO), { recursive: true });
fs.writeFileSync(ARQUIVO, JSON.stringify(filmesIniciais, null, 2));

console.log(`${filmesIniciais.length} filmes gravados`);
