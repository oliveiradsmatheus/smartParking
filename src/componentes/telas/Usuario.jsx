import Pagina from "../layouts/Pagina";
import Login from "./formularios/Login";
import Cadastro from "./formularios/Cadastro";
import { useState } from "react";

export default function Usuario(props) {
    const [exibirLogin, setExibirLogin] = useState(true);
    return (
        <Pagina>
            {
                exibirLogin ?
                    <Login setExibirLogin={setExibirLogin} /> :
                    <Cadastro setExibirLogin={setExibirLogin} />
            }
        </Pagina>
    );
}