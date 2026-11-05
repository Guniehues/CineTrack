import { useState } from "react";

const VAZIO = {titulo: "", ano: "", genero: "", poster: "", status: "quero", nota: 3, comentario: ""};

function ModalFilme({filme, aoSalvar, aoFechar}) {
    const [dados, setDados] = useState({...VAZIO, ...filme});

    function atualizar(campo, valor) {
        setDados((anteriores) => ({...anteriores, [campo]: valor}));
    }

    function submeter(evento) {
        evento.preventDefault();
        aoSalvar({...dados, ano: Number(dados.ano), nota: Number(dados.nota)});
    }

    return (
        <div id="modal">
            <div className="modal-conteudo">
                <h2>{filme.id ? "Editar filme" : "Adicionar filme"}</h2>
                <form onSubmit={submeter}>
                    <label>Título
                        <input value={dados.titulo} onChange={(e) => atualizar("titulo", e.target.value)} required />
                    </label>
                    <label>Ano
                        <input type="number" min="1888" max="2030" value={dados.ano} onChange={(e) => atualizar("ano", e.target.value)} required />
                    </label>
                    <label>Gênero
                        <input value={dados.genero} onChange={(e) => atualizar("genero", e.target.value)} required />
                    </label>
                    <label>URL do pôster (opcional)
                        <input type="url" value={dados.poster} onChange={(e) => atualizar("poster", e.target.value)} />
                    </label>
                    <label>Status
                        <select value={dados.status} onChange={(e) => atualizar("status", e.target.value)}>
                            <option value="quero">Quero assistir</option>
                            <option value="assistindo">Assistindo</option>
                            <option value="assistido">Assistido</option>
                        </select>
                    </label>
                    <label>Nota (1 a 5)
                        <input type="number" min="1" max="5" value={dados.nota} onChange={(e) => atualizar("nota", e.target.value)} required />
                    </label>
                    <label>Comentário (opcional)
                        <textarea value={dados.comentario} onChange={(e) => atualizar("comentario", e.target.value)} />
                    </label>
                    <button type="button" onClick={aoFechar}>Cancelar</button>
                    <button type="submit">Salvar</button>
                </form>
            </div>
        </div>
    );
}

export default ModalFilme;
