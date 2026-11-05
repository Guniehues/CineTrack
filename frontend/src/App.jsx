import { filmesIniciais } from "./data/filmes.js";
import Header from "./components/Header.jsx";
import Filtros from "./components/Filtros.jsx";
import ListaFilmes from "./components/ListaFilmes.jsx";
import { use, useState } from "react";

function App() {

    const [status, setStatus] = useState("todos");

    const [busca, setBusca] = useState("");

    const visiveis = filmesIniciais.filter((filme) => status === "todos" || filme.status === status).filter((filme) => filme.titulo.toLocaleLowerCase().includes(busca.toLocaleLowerCase()));


    return (
        <>
            <Header busca = {busca} aoBuscar={setBusca}/>
            <Filtros ativo = {status} aoMudar = {setStatus}/>
            <main>
                <ListaFilmes filmes={visiveis} />
            </main>
        </>
    );
}

export default App;
