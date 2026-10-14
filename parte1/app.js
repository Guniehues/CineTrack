function rotuloStatus(status) {
    if (status === "assistido") {
        return "Assistido";
    }
    if (status === "assistindo") {
        return "Assistindo";
    }
    if (status === "quero") {
        return "Quero assistir";
    }

    return status;
}

const gerarId = (lista) => Math.max(0, ...lista.map((f) => f.id)) + 1;

const estrelas = (nota) => {let nota_final = ''; for (let i = 1; i <= 5; i++) {nota_final += (i <= nota ? "★" : "☆");} return nota_final;};

const Filme = {id: Number, titulo: String, ano: Number, genero: String, poster: String, nota: Number, status: String}

const posterPadrao = "https://placehold.co/200x300?text=Sem+poster";

const filmesIniciais = [
    {id: 1, titulo: "A Origem", ano: 2010, genero: "Ficção científica", poster: "https://upload.wikimedia.org/wikipedia/pt/8/84/AOrigemPoster.jpg", nota: 5, status: "assistido", comentario: "Revejo sempre."},
    {id: 2, titulo: "Parasita", ano: 2019, genero: "Suspense", poster: "https://upload.wikimedia.org/wikipedia/pt/b/be/Parasite_poster.jpg", nota: 4, status: "assistido", comentario: ""},
    {id: 3, titulo: "O Auto da Compadecida", ano: 2000, genero: "Comédia", poster: "https://upload.wikimedia.org/wikipedia/pt/b/bf/O_auto_da_compadecida.jpg", nota: 5, status: "assistido", comentario: "Classico nacional."},
    {id: 4, titulo: "Duna: Parte Dois", ano: 2024, genero: "Ficção científica", poster: "https://upload.wikimedia.org/wikipedia/pt/5/52/Dune_Part_Two_poster.jpeg", nota: 4, status: "assistindo", comentario: ""},
    {id: 5, titulo: "Interestelar", ano: 2014, genero: "Ficção científica", poster: "https://upload.wikimedia.org/wikipedia/pt/3/3a/Interstellar_Filme.png", nota: 5, status: "quero", comentario: ""},
    {id: 6, titulo: "Cidade de Deus", ano: 2002, genero: "Drama", poster: "https://upload.wikimedia.org/wikipedia/pt/1/10/CidadedeDeus.jpg", nota: 4, status: "quero", comentario: ""}
]

const CHAVE = "cinetrack:filmes";

const salvar = () => localStorage.setItem(CHAVE, JSON.stringify(filmes));

function carregar() {
    const txt = localStorage.getItem(CHAVE);
    return txt ? JSON.parse(txt) : [...filmesIniciais];
}

let filmes = carregar();

function criarCard(f) {
    const card = document.createElement("article");
    card.className = "card";
    card.dataset.id = f.id;

    const poster = document.createElement("img");
    poster.src = f.poster || posterPadrao;
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
    badge.className = `badge ${f.status}`;
    badge.textContent = rotuloStatus(f.status);

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

let termoAtual = "";
let statusAtual = "todos";

function aplicarFiltros(lista, opcoes) {
    const termo = opcoes.termo.toLowerCase();
    return lista.filter((f) => f.titulo.toLowerCase().includes(termo)).filter((f)=> opcoes.status === "todos" || opcoes.status === f.status);
}

function atualizarContadores() {
    document.querySelectorAll("nav button").forEach((botao) => {
        const total = aplicarFiltros(filmes, { termo: "", status: botao.dataset.status }).length;
        botao.querySelector(".contador").textContent = `(${total})`;
    });
}

function atualizar(){
    const visiveis = aplicarFiltros(filmes, { termo: termoAtual, status: statusAtual});
    renderizarCards(visiveis);
    atualizarContadores();
}

atualizar();

function debounce(fn, ms = 300) {
    let timer;
    return (...args) => {
        clearTimeout(timer);
        timer = setTimeout(() => fn(...args), ms);
    };
}

const busca = document.querySelector("header input");

const aoDigitar = (e) => {
    termoAtual = e.target.value;
    atualizar();
};

busca.addEventListener("input", debounce(aoDigitar, 300));

lista.addEventListener("click", (e) => {
    const botao = e.target.closest(".btn-remover");
    if (!botao) return;
    if (!confirm("Remover este filme?")) return;

    const card = botao.closest(".card");
    const id = Number(card.dataset.id);
    filmes = filmes.filter((f) => f.id !== id);
    salvar();
    atualizar();
});


const nav = document.querySelector("nav");

nav.addEventListener("click", (e) => {
    const botao = e.target.closest("button");
    if (!botao) return;
    nav.querySelector(".ativo").classList.remove("ativo");

    botao.classList.add("ativo");
    statusAtual = botao.dataset.status;
    atualizar();
});


let editandoId = null;
const modal = document.querySelector("#modal");
const form = document.querySelector("#form-filme");
const tituloModal = document.querySelector("#titulo-modal");
const errosForm = document.querySelector("#erros-form");
const abrir = () => modal.hidden = false;
const fechar = () => modal.hidden = true;

function mostrarErros(erros) {
    errosForm.replaceChildren(...erros.map((mensagem) => {
        const item = document.createElement("p");
        item.textContent = mensagem;
        return item;
    }));
}

document.querySelector("header button").addEventListener("click", () => {
    editandoId = null;
    form.reset();
    tituloModal.textContent = "Adicionar filme";
    mostrarErros([]);
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
    if (!["assistido", "assistindo", "quero"].includes(filme.status)){
        erros.push("Selecione um status!");}
    if (filme.nota < 1 || filme.nota > 5){
        erros.push("Nota inválida!");}

    return { valido: erros.length === 0, erros};
};

form.addEventListener("submit", (e) => {
    e.preventDefault();

    const dados = Object.fromEntries(new FormData(form));
    dados.titulo = dados.titulo.trim();
    dados.genero = dados.genero.trim();
    dados.ano = Number(dados.ano);
    dados.nota = Number(dados.nota);

    const { valido, erros } = validarFilme(dados);
    if (!valido) { mostrarErros(erros); return;}

    if (editandoId !== null) {
        filmes = filmes.map((f) =>
            f.id === editandoId
                ? { ...f, ...dados } : f);
    } else {
        filmes = [...filmes,
            { id: gerarId(filmes), ...dados }];
    }

    salvar();
    atualizar();
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
    tituloModal.textContent = "Editar filme";
    mostrarErros([]);
    abrir();
});
