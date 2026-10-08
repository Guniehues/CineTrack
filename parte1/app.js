var id = 0

function rotuloStatus(status) {
    if (status === "Assistido") {
        return "assistido";
    }
    if (status === "Assistindo") {
        return "assistindo";
    }
    if (status === "Quero Assistir") {
        return "quero";
    }

    return status;
}

const gera_id = () => {return ++id}

const estrelas = (nota) => {let nota_final = ''; for (let i = 1; i <= 5; i++) {nota_final += (i <= nota ? "★" : "☆");} return nota_final;};

const Filmes = {id: Number, titulo: String, ano: Number, genero: String, poster: String, nota: Number, status: String}

const filmesIniciais = [
    {id: gera_id(), titulo: "A Origem", ano: 2010, genero: "Ficção Científica", poster: "https://upload.wikimedia.org/wikipedia/pt/8/84/AOrigemPoster.jpg", nota: 5, status: "Assistido"},
    {id: gera_id(), titulo: "Parasita", ano: 2019, genero: "Suspense", poster: "https://upload.wikimedia.org/wikipedia/pt/b/be/Parasite_poster.jpg", nota: 4, status: "Assistido"},
    {id: gera_id(), titulo: "O Auto da Compadecida", ano: 2000, genero: "Comédia", poster: "https://upload.wikimedia.org/wikipedia/pt/b/bf/O_auto_da_compadecida.jpg", nota: 5, status: "Assistido"},
    {id: gera_id(), titulo: "Duna: Parte Dois", ano: 2024, genero: "Ficção Científica", poster: "https://upload.wikimedia.org/wikipedia/pt/5/52/Dune_Part_Two_poster.jpeg", nota: 4, status: "Assistido"},
    {id: gera_id(), titulo: "Interestelar", ano: 2014, genero: "Ficção Científica", poster: "https://upload.wikimedia.org/wikipedia/pt/3/3a/Interstellar_Filme.png", nota: 5, status: "Assistido"},
    {id: gera_id(), titulo: "Cidade de Deus", ano: 2002, genero: "Drama", poster: "https://upload.wikimedia.org/wikipedia/pt/1/10/CidadedeDeus.jpg", nota: 4, status: "Assistido"}
]

function renderizarCards(filmes) {
    const cards = filmes.map((f) => `<article class="card" data-id="${f.id}">
                <img src="${f.poster}" alt="Poster ${f.titulo}" width="200" height="300">

                <br>
                <h2><strong>${f.titulo}</strong></h2>
                <p>${f.ano} - ${f.genero}</p>
                <p>Nota: ${estrelas(f.nota)}</p>
                <span class="badge ${rotuloStatus(f.status)}">${f.status}</span> <div class = "acoes"><button type="button">Editar</button><button type="button">Remover</button></div>

            </article>`).join("");

        lista.innerHTML = cards;
}


renderizarCards(filmesIniciais);