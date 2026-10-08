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

const gerarId = (lista) => Math.max(0, ...lista.map((f) => f.id)) + 1;

const estrelas = (nota) => {let nota_final = ''; for (let i = 1; i <= 5; i++) {nota_final += (i <= nota ? "★" : "☆");} return nota_final;};

const Filme = {id: Number, titulo: String, ano: Number, genero: String, poster: String, nota: Number, status: String}

const filmesIniciais = [
    {id: gera_id(), titulo: "A Origem", ano: 2010, genero: "Ficção Científica", poster: "https://upload.wikimedia.org/wikipedia/pt/8/84/AOrigemPoster.jpg", nota: 5, status: "Assistido"},
    {id: gera_id(), titulo: "Parasita", ano: 2019, genero: "Suspense", poster: "https://upload.wikimedia.org/wikipedia/pt/b/be/Parasite_poster.jpg", nota: 4, status: "Assistido"},
    {id: gera_id(), titulo: "O Auto da Compadecida", ano: 2000, genero: "Comédia", poster: "https://upload.wikimedia.org/wikipedia/pt/b/bf/O_auto_da_compadecida.jpg", nota: 5, status: "Assistido"},
    {id: gera_id(), titulo: "Duna: Parte Dois", ano: 2024, genero: "Ficção Científica", poster: "https://upload.wikimedia.org/wikipedia/pt/5/52/Dune_Part_Two_poster.jpeg", nota: 4, status: "Assistido"},
    {id: gera_id(), titulo: "Interestelar", ano: 2014, genero: "Ficção Científica", poster: "https://upload.wikimedia.org/wikipedia/pt/3/3a/Interstellar_Filme.png", nota: 5, status: "Assistido"},
    {id: gera_id(), titulo: "Cidade de Deus", ano: 2002, genero: "Drama", poster: "https://upload.wikimedia.org/wikipedia/pt/1/10/CidadedeDeus.jpg", nota: 4, status: "Assistido"}
]

let filmes = [...filmesIniciais];

function criarCard(f) {
    const card = document.createElement("article");
    card.className = "card";
    card.dataset.id = f.id;

    const poster = document.createElement("img");
    poster.src = f.poster;
    poster.alt = `Poster ${f.titulo}`;
    poster.width = 200;
    poster.height = 300;

    const titulo = document.createElement("h2");
    const negrito = document.createElement("strong");
    negrito.textContent = f.titulo;
    titulo.append(negrito);

    const anoGenero = document.createElement("p");
    anoGenero.textContent = `${f.ano} - ${f.genero}`;

    const nota = document.createElement("p");
    nota.textContent = `Nota: ${estrelas(f.nota)}`;

    const badge = document.createElement("span");
    badge.className = `badge ${rotuloStatus(f.status)}`;
    badge.textContent = f.status;

    const acoes = document.createElement("div");
    acoes.className = "acoes";

    const btnEditar = document.createElement("button");
    btnEditar.type = "button";
    btnEditar.className = "btn-editar";
    btnEditar.textContent = "Editar";

    const btnRemover = document.createElement("button");
    btnRemover.type = "button";
    btnRemover.className = "btn-remover";
    btnRemover.textContent = "Remover";

    acoes.append(btnEditar, btnRemover);
    card.append(poster, document.createElement("br"), titulo, anoGenero, nota, badge, acoes);
    return card;
}

function renderizarCards(filmes) {
    const frag = document.createDocumentFragment();
    filmes.forEach((f) =>
        frag.appendChild(criarCard(f)));
    lista.replaceChildren(frag);
}


renderizarCards(filmes);


lista.addEventListener("click", (e) => {
    const botao = e.target.closest(".btn-remover");
    if (!botao) return;
    if (!confirm("Remover este filme?")) return;

    const card = botao.closest(".card");
    const id = Number(card.dataset.id);
    filmes = filmes.filter((f) => f.id !== id);
    renderizarCards(filmes);
});


const nav = document.querySelector("nav");

nav.addEventListener("click", (e) => {
    const botao = e.target.closest("button");
    if (!botao) return;
    nav.querySelector(".ativo").classList.remove("ativo");

    botao.classList.add("ativo");
    const status = botao.dataset.status;
    renderizarCards(filmes.filter((f) => status === "todos" || rotuloStatus(f.status) === status));
});


let editandoId = null;
const modal = document.querySelector("#modal");
const form = document.querySelector("#form-filme");
const abrir = () => modal.hidden = false;
const fechar = () => modal.hidden = true;

document.querySelector("header button").addEventListener("click", () => {
    editandoId = null;
    form.reset();
    abrir();
});

form.querySelector("button").addEventListener("click", fechar);

document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && !modal.hidden) {
        fechar();
    }
});

function validarFilme(filme) {
    const erros = [];
    if (!filme.titulo){
        erros.push("Título Obrigatório!");}
    if (filme.ano < 1888 || filme.ano > 2030){
        erros.push("Ano inválido!");}
    if (!filme.genero){
        erros.push("Forneça um gênero!");}
    if (!filme.status){
        erros.push("Forneça um status!");}
    if (filme.nota < 0 || filme.nota > 5){
        erros.push("Nota inválida!");}
    if (!filme.poster){
        erros.push("Poster Obrigatório!");}

    return { valido: erros.length === 0, erros};
};

form.addEventListener("submit", (e) => {
    e.preventDefault();

    const dados = Object.fromEntries(new FormData(form));
    dados.ano = Number(dados.ano);
    dados.nota = Number(dados.nota);

    const { valido, erros } = validarFilme(dados);
    if (!valido) { alert(erros.join("\n")); return;}

    if (editandoId !== null) {
        filmes = filmes.map((f) =>
            f.id === editandoId
                ? { ...f, ...dados } : f);
    } else {
        filmes = [...filmes,
            { id: gerarId(filmes), ...dados }];
    }

    renderizarCards(filmes);
    fechar();
});

lista.addEventListener("click", (e) => {
    const botao = e.target.closest(".btn-editar");
    if (!botao) return;
    const card = botao.closest(".card");
    editandoId = Number(card.dataset.id);
    const f = filmes.find(
        (x) => x.id === editandoId);
    form.elements.titulo.value = f.titulo;
    form.elements.ano.value = f.ano;
    form.elements.genero.value = f.genero;
    form.elements.poster.value = f.poster;
    form.elements.status.value = f.status;
    form.elements.nota.value = f.nota;
    form.elements.comentario.value = f.comentario ?? "";
    abrir();
});
