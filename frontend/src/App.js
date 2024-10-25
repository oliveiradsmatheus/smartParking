import DetalharRua from "./component/telas/DetalharRua";
import Busca from "./component/telas/Busca";
import Sobre from "./component/telas/Sobre";
import Usuario from "./component/telas/Usuario";
import Home from "./component/telas/Home";
import Erro404 from "./component/telas/Erro404";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";

function App() {
    const dispatch = useDispatch();
    const [loading, setLoading] = useState(true);
    
    // Buscar as ruas do backend
    useEffect(() => {
        const fetchRuas = async () => {
            try {
                const resposta = await axios.get("http://192.168.177.229:5000/api/ruas");
                dispatch({ type: "SET_RUAS", payload: resposta.data });
            } catch (error) {
                console.error("Erro ao buscar ruas:", error);
            } finally {
                setLoading(false);
            }
        };
        fetchRuas();
    }, [dispatch]);

    if (!loading) {
        return (
            <BrowserRouter>
                <Routes>
                    <Route path="/rua" element={<DetalharRua />} />
                    <Route path="/busca" element={<Busca />} />
                    <Route path="/sobre" element={<Sobre />} />
                    <Route path="/usuario" element={<Usuario />} />
                    <Route path="/" element={<Home />} />
                    <Route path="*" element={<Erro404 />} />
                </Routes>
            </BrowserRouter>
        );
    }

}

export default App;
