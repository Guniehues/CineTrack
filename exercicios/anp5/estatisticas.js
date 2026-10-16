export function mediaNotas(lista) {
    const total = lista.reduce((acumulador, filme) => acumulador + filme.nota, 0);
    return Math.round((total / lista.length) * 10) / 10;
}

export function contagemPorStatus(lista) {
    return lista.reduce((acumulador, valor) => {
        if (valor.status === "assistido") ++acumulador.assistido;
        if (valor.status === "assistindo") ++acumulador.assistindo;
        if (valor.status === "quero") ++acumulador.quero;
        return acumulador;
    }, { assistido: 0, assistindo: 0, quero: 0 });
}



export function ordenarPorNota(lista) {
    const listaOrdenada = [...lista];

    return listaOrdenada.sort((a, b) => b.nota - a.nota);
}