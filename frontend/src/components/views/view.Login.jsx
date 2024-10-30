import { Button, Container, Form } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { useState } from "react";
import axios from "axios";

import Pagina from "../layouts/layout.Pagina";

export default function Usuario(props) {
    const [nick, setNick] = useState("");
    const [senha, setSenha] = useState("");

    const [formValidado, setFormValidado] = useState(false);
    const navegar = useNavigate();
    const dispatch = useDispatch();

    const Logar = (nick) => {
        dispatch({ type: "LOGAR", payload: nick });
    };

    const fetchLogin = async () => {
      try {
        const resposta = await axios.get("http://localhost:5000/api/usuarios/" + nick);
        if(resposta)
            if (resposta.data.usu_nick === nick && resposta.data.usu_senha === senha) {
                Logar(resposta.data.usu_nick.toUpperCase());
                navegar("/");
                return true; // Retorna true se o login e senha corresponderem
            }
        return false; // Caso contrário, retorna false
      } catch (erro) {
        if (erro.response != null)
          alert("Erro ao consultar usuario:  " + erro.response.data.mensagem);
        else
          alert("Erro ao consultar usuario: API Offline");
        return false;
      }
    };

    function manipularSubmissao(evento) {
        const form = evento.currentTarget;
        if (form.checkValidity()) {
            if (fetchLogin() === true) {
                setFormValidado(false);
            }
            else {
                setNick("");
                setSenha("");
                setFormValidado(false);
            }
        } else {
            setFormValidado(true);
        }
        evento.preventDefault();
        evento.stopPropagation();
    }

    return (
        <Pagina>
            <Container className="p-2 mt-2">
                <Form noValidate validated={formValidado} onSubmit={manipularSubmissao} className="p-3 mt-5 mx-auto rounded bg-body-tertiary" style={{ width: "50vw" }}>
                    <h3 className="mb-4 text-center">Login</h3>
                    <Form.Group className="mt-4 mb-3" controlId="formBasicEmail">
                        <Form.Label>Nome de usuário</Form.Label>
                        <Form.Control
                            type="text"
                            placeholder="Informe o nome de usuário"
                            value={nick}
                            onChange={(evento) => (setNick(evento.target.value))}
                            required />
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="formBasicPassword">
                        <Form.Label>Senha</Form.Label>
                        <Form.Control
                            type="password"
                            placeholder="Password"
                            value={senha}
                            onChange={(evento) => { setSenha(evento.target.value) }}
                            required />
                        <Form.Control.Feedback type="invalid" className="mt-3">
                            Usuario ou senha incorretos!
                        </Form.Control.Feedback>
                    </Form.Group>
                    <Button type="submit" variant="primary" className="text-center mb-2">
                        Entrar
                    </Button>
                </Form>
            </Container >
        </Pagina>
    );
}