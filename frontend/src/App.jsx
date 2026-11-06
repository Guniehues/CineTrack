import { useState, useEffect } from "react";
import { gerarId } from "./data/filmes.js";
import Header from "./components/Header.jsx";
import Filtros from "./components/Filtros.jsx";
import ListaFilmes from "./components/ListaFilmes.jsx";
import ModalFilme from "./components/ModalFilme.jsx";
import { listar } from "./api.js";

function App() {

    console.log("render");

    const [status, setStatus] = useState("todos");

    const [busca, setBusca] = useState("");

    const [filmes, setFilmes] = useState([]);

    const [carregando, setCarregando] = useState(true);

    const [erro, setErro] = useState(null);

    const [editando, setEditando] = useState(null);

    const visiveis = filmes.filter((filme) => status === "todos" || filme.status === status).filter((filme) => filme.titulo.toLowerCase().includes(busca.toLowerCase()));

    useEffect(() => {document.title = `CineTrack (${filmes.length})`}, [filmes.length]);

    useEffect(() => {listar().then((dados) => setFilmes(dados)).catch((erro) => setErro(erro.message)).finally(() => setCarregando(false)); }, []);

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

    let conteudo;

    if (carregando){
        conteudo = <p>Carregando...</p>;
    } else if (erro){
        conteudo = (<p className="erro">Erro: {erro}</p>);
    } else {
        conteudo = <ListaFilmes filmes={visiveis} aoEditar={setEditando} aoRemover={remover} />;
    }

    return (
        <>
            <Header busca={busca} aoBuscar={setBusca} aoAdicionar={() => setEditando({})} />
            <Filtros ativo={status} aoMudar={setStatus} />
            <main>
                {conteudo}
            </main>
            {editando && (<ModalFilme filme={editando} aoSalvar={salvar} aoFechar={() => setEditando(null)} />)}
        </>
    );
}

export default App;
