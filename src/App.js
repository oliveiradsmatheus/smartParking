import Busca from "./componentes/telas/Busca";
import Sobre from "./componentes/telas/Sobre";
import Usuario from "./componentes/telas/Usuario";
import Home from "./componentes/telas/Home";
import Erro404 from "./componentes/telas/Erro404";
import { BrowserRouter, Route, Routes } from "react-router-dom";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/rua" element={<Busca />} />
        <Route path="/busca" element={<Busca />} />
        <Route path="/sobre" element={<Sobre />} />
        <Route path="/usuario" element={<Usuario />} />
        <Route path="/" element={<Home />} />
        <Route path="*" element={<Erro404 />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
