import { Container, Col, Row, Form, Button } from "react-bootstrap";

export default function Login(props) {
    return (
        <Container className="p-2 mt-2">
            <Form className="p-3 mt-5 mx-auto rounded bg-body-tertiary" style={{ width: "45rem" }}>
                <h3 className="mb-4">Faça Login</h3>
                <Form.Group className="mt-4 mb-3" controlId="formBasicEmail">
                    <Form.Label>Endereço de e-mail ou nome de usuário</Form.Label>
                    <Form.Control type="email" placeholder="Informe o seu e-mail" required />
                </Form.Group>
                <Form.Group className="mb-3" controlId="formBasicPassword">
                    <Form.Label>Senha</Form.Label>
                    <Form.Control type="password" placeholder="Password" required />
                </Form.Group>
                <Row className="mx-auto">
                    <Button variant="primary" type="submit" className="text-center mb-2">
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