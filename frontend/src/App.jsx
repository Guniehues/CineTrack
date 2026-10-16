import Titulo from "./components/Titulo.jsx";

export default function App() {
  const ano = new Date().getFullYear();

  return (
    <main>
      <Titulo />
      <p>&copy; {ano} CineTrack</p>
    </main>
  );
}
