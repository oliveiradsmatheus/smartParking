import Pagina from "../layouts/Pagina";
import Login from "./formularios/Login";
import Cadastro from "./formularios/Cadastro";
import DadosUsuario from "./elementos/DadosUsuario";
import { useState } from "react";
import { usuarios } from "../../dados/mockUsuarios";

export default function Usuario(props) {
    const [listaUsuarios, setListaUsuarios] = useState(usuarios);
    const [exibirLogin, setExibirLogin] = useState(true);
    const [usuarioSelecionado, setUsuarioSelecionado] = useState("");

    return (
        <Pagina>
            {
                usuarioSelecionado ?
                    <DadosUsuario
                        usuarioSelecionado={usuarioSelecionado}
                        setUsuarioSelecionado={setUsuarioSelecionado}
                        setExibirLogin={setExibirLogin} /> :
                    exibirLogin ?
                        <Login
                            listaUsuarios={listaUsuarios}
                            setUsuarioSelecionado={setUsuarioSelecionado}
                            setExibirLogin={setExibirLogin} /> :
                        <Cadastro
                            listaUsuarios={listaUsuarios}
                            setListaUsuarios={setListaUsuarios}
                            setExibirLogin={setExibirLogin} />
            }
        </Pagina>
    );
}