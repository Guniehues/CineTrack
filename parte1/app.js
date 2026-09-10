

function rotuloStatus(status) {
    if (status === "Assistido") {
        return "assistido";
    }
    if (status === "Assistindo") {
        return "assistindo";
    }
    if (status === "Quero Assistir") {
        return "quero";
    }

    return status;
}


const estrelas = (nota) => {let nota_final = ''; for (let i = 1; i <= 5; i++) {nota_final += (i <= nota ? "★" : "☆");} return nota_final;};