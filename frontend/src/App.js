import { BrowserRouter, Route, Routes } from "react-router-dom";
import { useDispatch } from "react-redux";
import { useEffect } from "react";

import { getRuas } from "./services/service.Fetch";

import DetalhaRua from "./components/pages/page.Detalha-Rua";
import BuscaVagas from "./components/pages/page.Busca-Vagas";
import Relatorio from "./components/pages/page.Relatorio";
import Home from "./components/pages/page.Home";

import Error404 from "./components/views/view.Error-404";
import Login from "./components/views/view.Login";
import Sobre from "./components/views/view.Sobre";

function App() {
    const dispatch = useDispatch();

    useEffect(() => {
        getRuas()
            .then((resposta) => {
                if(resposta?.status)
                    dispatch({ type: "SET_RUAS", payload: resposta.data });
            });
    }, [dispatch]);

    return (
        <BrowserRouter>
            <Routes>
                <Route path="/detalha-rua" element={<DetalhaRua />} />
                <Route path="/busca-vagas" element={<BuscaVagas />} />
                <Route path="/sobre" element={<Sobre />} />
                <Route path="/login" element={<Login />} />
                <Route path="/relatorio" element={<Relatorio />} />
                <Route path="/" element={<Home />} />
                <Route path="*" element={<Error404 />} />
            </Routes>
        </BrowserRouter>
    );
}

export default App;