import Pagina from "../layouts/Pagina";
import Login from "./formularios/Login";
import UsuarioLogado from "./UsuarioLogado";
import Cadastro from "./formularios/Cadastro";
import { useState } from "react";

export default function Usuario(props) {
    const [usuarioLogado, setUsuarioLogado] = useState(false);
    const [exibirLogin, setExibirLogin] = useState(true);

    return (
        <Pagina>
            {
                usuarioLogado ?
                    <UsuarioLogado /> :
                    exibirLogin ?
                        <Login setExibirLogin={setExibirLogin} /> :
                        <Cadastro setExibirLogin={setExibirLogin} />
            }
        </Pagina>
    );
}