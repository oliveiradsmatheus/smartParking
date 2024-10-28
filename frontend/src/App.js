import TelaRelatorio from "./component/telas/TelaRelatorio";
import DetalharRua from "./component/telas/DetalharRua";
import Busca from "./component/telas/Busca";
import Sobre from "./component/telas/Sobre";
import Usuario from "./component/telas/Usuario";
import Home from "./component/telas/Home";
import Erro404 from "./component/telas/Erro404";
import { BrowserRouter, Route, Routes } from "react-router-dom";

function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/rua" element={<DetalharRua />} />
                <Route path="/busca" element={<Busca />} />
                <Route path="/sobre" element={<Sobre />} />
                <Route path="/usuario" element={<Usuario />} />
                <Route path="/relatorio" element={<TelaRelatorio />} />
                <Route path="/" element={<Home />} />
                <Route path="*" element={<Erro404 />} />
            </Routes>
        </BrowserRouter>
    );
}

export default App;