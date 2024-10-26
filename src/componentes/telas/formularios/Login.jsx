import { Button, Col, Container, Form, Row } from "react-bootstrap";
import { useState } from "react";
import { useDispatch } from "react-redux";

export default function Login(props) {
    const [formValidado, setFormValidado] = useState(false);
    const [usuario, setUsuario] = useState("");
    const [senha, setSenha] = useState("");

    const dispatch = useDispatch();
    const Logar = (nome) => {
        dispatch({ type: "LOGAR", payload: nome});
    };

    function validarLogin() {
        props.listaUsuarios.some((item) => { // A função some verifica se pelo menos um elemento do array satisfaz a condição.
            if (item.login === usuario && item.senha === senha){
                Logar(item.nome);
                return true; // Retorna true se o login e senha corresponderem
            }
            return false; // Caso contrário, retorna false
        });    
    }

    function manipularSubmissao(evento) {
        const form = evento.currentTarget;
        const res = fetch('http://localhost:4000/usuario/user', {
            'method':"POST",
            'body':{form},
            'headers':{
                'Content-Type':"application/json"
            }
        })
        console.log(res)
        /*if (form.checkValidity()) {
            if (validarLogin() === true) {
                setFormValidado(false);
            }
            else {
                setSenha("");
                setUsuario("");
            }
        } else {
            setFormValidado(true);
        }*/
        evento.preventDefault();
        evento.stopPropagation();
    }

    return (
        <Container className="p-2 mt-2">
            <Form noValidate validated={formValidado} onSubmit={manipularSubmissao} className="p-3 mt-5 mx-auto rounded bg-body-tertiary" style={{ width: "50vw" }}>
                <h3 className="mb-4 text-center">Login</h3>
                <Form.Group className="mt-4 mb-3" controlId="formBasicEmail">
                    <Form.Label>Nome de usuário</Form.Label>
                    <Form.Control
                        type="text"
                        placeholder="Informe o nome de usuário"
                        value={usuario}
                        onChange={(evento) => (setUsuario(evento.target.value))}
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
                <Row className="mx-auto">
                    <Button type="submit" variant="primary" className="text-center mb-2">
                        Entrar
                    </Button>
                </Row>
                <br />
                <Row className="mx-auto">
                    <Col xs={6}>
                        <p>Ainda não possui uma conta?</p>
                    </Col>
                    <Col>
                    </Col>
                    <Col>
                        <Button variant="warning" onClick={() => {
                            props.setExibirLogin(false);
                        }}>
                            Cadastre-se
                        </Button>
                    </Col>
                </Row>
            </Form>
        </Container >
    );
}