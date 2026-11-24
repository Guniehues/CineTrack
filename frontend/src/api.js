const BASE = "http://localhost:3000";

async function pedir(caminho, opcoes = {}) {
    const r = await fetch(BASE + caminho, {headers: {"Content-Type": "application/json"}, ...opcoes});
    const dados = r.status === 204 ? null : await r.json();
    if (!r.ok) {
        const mensagem = Array.isArray(dados?.erros) && dados.erros.length
            ? dados.erros.join("; ")
            : dados?.erro || `HTTP ${r.status}`;
        throw new Error(mensagem);
    }
    return dados;
}

export const listar = () => pedir("/filmes");
export const criar = (f) => pedir('/filmes', {method: 'POST', body: JSON.stringify(f)});
export const atualizar = (id, f) => pedir(`/filmes/${id}`, {method: 'PUT', body: JSON.stringify(f)});
export const remover = (id) => pedir(`/filmes/${id}`, {method: 'DELETE'});