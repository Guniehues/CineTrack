import { filmesIniciais } from "../data/filmes";

const STATUS = [{valor:"todos", rotulo: "Todos"}, {valor:"assistido", rotulo: "Assistido"}, {valor:"assistindo", rotulo: "Assistindo"}, {valor:"quero", rotulo: "Quero Assistir"}];

function Filtros({ativo, aoMudar}) {


    function mostrar(){
        console.log("clicou");
    }

    return (
        <nav>
            {STATUS.map((s) => (<button key={s.valor} className={
                ativo === s.valor ? "ativo" : ""
            } onClick={() => aoMudar(s.valor)}>{s.rotulo}</button>))}
        </nav>
    );
}

export default Filtros;
