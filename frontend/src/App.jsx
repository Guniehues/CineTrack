import { useState, useEffect } from "react";
import Header from "./components/Header.jsx";
import Filtros from "./components/Filtros.jsx";
import ListaFilmes from "./components/ListaFilmes.jsx";
import ModalFilme from "./components/ModalFilme.jsx";
import { listar, criar, atualizar, remover} from "./api.js";

function carregarFiltro(campo, padrao) {
    try {
        const filtros = JSON.parse(localStorage.getItem("cinetrack:filtros"));
        return filtros?.[campo] ?? padrao;
    } catch {
        return padrao;
    }
}

function App() {

    console.log("render");

    const [status, setStatus] = useState(() => carregarFiltro("status", "todos"));

    const [busca, setBusca] = useState(() => carregarFiltro("busca", ""));

    const [filmes, setFilmes] = useState([]);

    const [carregando, setCarregando] = useState(true);

    const [erro, setErro] = useState(null);

    const [erroSalvar, setErroSalvar] = useState(null);

    const [erroRemover, setErroRemover] = useState(null);

    const [editando, setEditando] = useState(null);

    const visiveis = filmes.filter((filme) => status === "todos" || filme.status === status).filter((filme) => filme.titulo.toLowerCase().includes(busca.toLowerCase()));

    useEffect(() => {
        localStorage.setItem("cinetrack:filtros", JSON.stringify({ busca, status }));
    }, [busca, status]);

    useEffect(() => {document.title = `CineTrack (${filmes.length})`}, [filmes.length]);

    useEffect(() => {
        listar()
            .then(setFilmes)
            .catch((erro) => setErro(erro instanceof Error ? erro.message : "Não foi possível carregar os filmes."))
            .finally(() => setCarregando(false));
    }, []);

    async function salvar(filme) {
        setErroSalvar(null);
        try {
            if (filme.id) {
                const at = await atualizar(filme.id, filme);
                setFilmes(fs => fs.map((f) => f.id === at.id ? at : f));
            } else {
                const novo = await criar(filme);
                setFilmes(fs => [...fs, novo]);
            }
            setEditando(null);
        } catch (erro) {
            setErroSalvar(erro instanceof Error ? erro.message : "Não foi possível salvar o filme.");
        }
    }

    async function removerFilme(id) {
        setErroRemover(null);
        try {
            await remover(id);
            setFilmes((anteriores) => anteriores.filter((filme) => filme.id !== id));
        } catch (erro) {
            setErroRemover(erro instanceof Error ? erro.message : "Não foi possível remover o filme.");
        }
    }

    let conteudo;

    if (carregando){
        conteudo = <p>Carregando...</p>;
    } else if (erro){
        conteudo = (<p className="erro">Erro: {erro}</p>);
    } else {
        conteudo = <ListaFilmes filmes={visiveis} aoEditar={setEditando} aoRemover={removerFilme} />;
    }

    return (
        <>
            <Header busca={busca} aoBuscar={setBusca} aoAdicionar={() => setEditando({})} />
            <Filtros ativo={status} aoMudar={setStatus} />
            <p>Exibindo {visiveis.length} de {filmes.length} filmes</p>
            <main>
                {erroRemover && <p className="erros" role="alert">Falha ao remover: {erroRemover}</p>}
                {conteudo}
            </main>
            {editando && (
                <ModalFilme
                    filme={editando}
                    erro={erroSalvar}
                    aoSalvar={salvar}
                    aoFechar={() => {
                        setErroSalvar(null);
                        setEditando(null);
                    }}
                />
            )}
        </>
    );
}

export default App;
