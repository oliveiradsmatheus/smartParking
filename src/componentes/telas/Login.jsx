import Pagina from "../layouts/Pagina";
import { Container, Row, Form, Button } from "react-bootstrap"

export default function Login(props) {
    return (
        <Pagina>
            <Form className="p-3 mt-5 mx-auto rounded bg-body-tertiary" style={{ width: "45rem" }}>
                <h3 className="mt-3 mb-3">Faça Login</h3>
                <Form.Group className="mt-3 mb-3" controlId="formBasicEmail">
                    <Form.Label>Endereço de e-mail</Form.Label>
                    <Form.Control type="email" placeholder="Informe o seu e-mail" required />
                    <Form.Text className="text-muted">
                        Nós não compartilhamos seu e-mail com ninguém.
                    </Form.Text>
                </Form.Group>
                <Form.Group className="mb-3" controlId="formBasicPassword">
                    <Form.Label>Senha</Form.Label>
                    <Form.Control type="password" placeholder="Password" required />
                </Form.Group>
                <Button variant="primary" type="submit" className="text-center mb-2">
                    Entrar
                </Button>
                <br />
                <Button variant="primary">
                    Cadastre-se
                </Button>
            </Form>
        </Pagina>
    );
}