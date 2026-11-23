import { useState, useEffect } from "react";
import Header from "./components/Header.jsx";
import Filtros from "./components/Filtros.jsx";
import ListaFilmes from "./components/ListaFilmes.jsx";
import ModalFilme from "./components/ModalFilme.jsx";
import { listar, criar, atualizar, remover} from "./api.js";

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

    useEffect(() => {
        listar().then(setFilmes).catch(() => setErro(true)).finally(() => setCarregando(false));
    }, []);

    async function salvar(filme) {
        if (filme.id) {
            const at = await atualizar(filme.id, filme);
            setFilmes(fs => fs.map((f) => f.id === at.id ? at : f));
        } else {
            const novo = await criar(filme);
            setFilmes(fs => [...fs, novo]);
        }
        setEditando(null);
    }

    async function removerFilme(id) {
        await remover(id);
        setFilmes((anteriores) => anteriores.filter((filme) => filme.id !== id));
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
                {conteudo}
            </main>
            {editando && (<ModalFilme filme={editando} aoSalvar={salvar} aoFechar={() => setEditando(null)} />)}
        </>
    );
}

export default App;
