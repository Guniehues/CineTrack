function Header({busca, aoBuscar, aoAdicionar}) {
    return (
        <header>
            <h1>CineTrack</h1>
            <input value={busca} onChange={(e) => aoBuscar(e.target.value)} placeholder="Buscar filme..." />
            <button onClick={aoAdicionar}>+ Adicionar</button>
        </header>
    );
}

export default Header;
