import Pagina from "../layouts/Pagina";
import Login from "./formularios/Login";
import Cadastro from "./formularios/Cadastro";
import DadosUsuario from "./elementos/DadosUsuario";
import { useState } from "react";
import { usuarios } from "../../dados/mockUsuarios";
import { useSelector } from "react-redux";

export default function Usuario(props) {
    const [listaUsuarios, setListaUsuarios] = useState(usuarios);
    const [exibirLogin, setExibirLogin] = useState(true);

    const adminLogado = useSelector((state) => state.login); // Estado do usuário

    return (
        <Pagina>
            {
                adminLogado ?
                    <DadosUsuario
                        adminSelecionado={adminLogado}
                        setExibirLogin={setExibirLogin}
                    />
                :
                exibirLogin ?
                    <Login
                        listaUsuarios={listaUsuarios}
                        setExibirLogin={setExibirLogin}
                    />
                    :
                    <Cadastro
                        listaUsuarios={listaUsuarios}
                        setListaUsuarios={setListaUsuarios}
                        setExibirLogin={setExibirLogin}
                    />
            }
        </Pagina>
    );
}