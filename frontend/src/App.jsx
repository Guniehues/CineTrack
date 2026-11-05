import { useState } from "react";
import { filmesIniciais, gerarId } from "./data/filmes.js";
import Header from "./components/Header.jsx";
import Filtros from "./components/Filtros.jsx";
import ListaFilmes from "./components/ListaFilmes.jsx";
import ModalFilme from "./components/ModalFilme.jsx";

function App() {

    const [status, setStatus] = useState("todos");

    const [busca, setBusca] = useState("");

    const [filmes, setFilmes] = useState(filmesIniciais);

    const [editando, setEditando] = useState(null);

    const visiveis = filmes.filter((filme) => status === "todos" || filme.status === status).filter((filme) => filme.titulo.toLowerCase().includes(busca.toLowerCase()));

    function adicionar(novoFilme) {
        setFilmes((anteriores) => [...anteriores, { ...novoFilme, id: gerarId(anteriores) },]);
    }

    function remover(id) {
        setFilmes((anteriores) => anteriores.filter((filme) => filme.id !== id));
    }

    function editar(id, alteracoes) {
        setFilmes((anteriores) => anteriores.map((filme) => filme.id === id ? { ...filme, ...alteracoes } : filme));
    }

    function salvar(dados) {
        if (editando.id) {
            editar(editando.id, dados);
        } else {
            adicionar(dados);
        }

        setEditando(null);
    }

    return (
        <>
            <Header busca={busca} aoBuscar={setBusca} aoAdicionar={() => setEditando({})} />
            <Filtros ativo={status} aoMudar={setStatus} />
            <main>
                <ListaFilmes filmes={visiveis} aoEditar={setEditando} aoRemover={remover} />
                {editando !== null && (<ModalFilme filme={editando} aoSalvar={salvar} aoFechar={() => setEditando(null)} />)}
            </main>
        </>
    );
}

export default App;
