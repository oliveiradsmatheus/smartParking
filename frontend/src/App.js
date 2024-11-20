import { BrowserRouter, Route, Routes } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";

import { getRuas } from "./services/service.Fetch";

import DetalhaRua from "./components/pages/page.Detalha-Rua";
import BuscaVagas from "./components/pages/page.Busca-Vagas";
import Relatorio from "./components/pages/page.Relatorio";
import EstadoRua from "./components/pages/page.Estado-Rua";
import Home from "./components/pages/page.Home";

import Error404 from "./components/views/view.Error-404";
import Login from "./components/views/view.Login";
import Sobre from "./components/views/view.Sobre";

function App() {
    const dispatch = useDispatch();
    const token = localStorage.getItem("token");
    const adminLogado = useSelector((state) => state.login);

    useEffect(() => {
        getRuas()
            .then((resposta) => {
                if (resposta?.status)
                    dispatch({ type: "SET_RUAS", payload: resposta.data });
            });
        if (token) {
            const tokenData = JSON.parse(atob(token.split('.')[1])); // decodifica a parte do payload do JWT
            const tokenExpiracao = tokenData.exp * 1000; // Converte a expiração para milissegundos
            const tempoAtual = Date.now();

            if (tokenExpiracao < tempoAtual) { // Se o token já tiver expirado
                localStorage.removeItem("token");
                dispatch({ type: "DESLOGAR" });
            }
            else {
                dispatch({ type: "LOGAR", payload: tokenData.nick.toUpperCase() });
            }
        }
    }, [dispatch, token]);

    return (
        <BrowserRouter>
            <Routes>
                <Route path="/detalha-rua" element={<DetalhaRua />} />
                <Route path="/busca-vagas" element={<BuscaVagas />} />
                <Route path="/sobre" element={<Sobre />} />
                <Route path="/login" element={<Login />} />
                <Route path="/relatorio" element={<Relatorio />} />
                {adminLogado && <Route path="/estado-rua" element={<EstadoRua />} />}
                <Route path="/" element={<Home />} />
                <Route path="/PI1-SmartParking" element={<Home />} />
                <Route path="*" element={<Error404 />} />
            </Routes>
        </BrowserRouter>
    );
}

export default App;