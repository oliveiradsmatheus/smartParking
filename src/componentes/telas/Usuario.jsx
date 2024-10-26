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

    //const adminLogado = useSelector((state) => state); // Estado do usuário
    const user = null
    function verifyAdmin() {
        fetch('http://localhost:4000/usuario/validar-token', {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${localStorage.getItem('token')}`,
                'Content-Type': 'application/json'
            }
        })
            .then(response => response.json())
            .then(data => {
                if (data.valid) {
                    user = data
                    console.log(data)
                    console.log('Token válido');
                } else {
                    console.log('Token inválido');
                    localStorage.removeItem('token');
                    window.location.href = '/login';
                }
            })
            .catch(error => console.error('Erro na validação do token:', error));
    }
    return (
        <Pagina>
            {
                user ?
                    <DadosUsuario
                        adminSelecionado={user}
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