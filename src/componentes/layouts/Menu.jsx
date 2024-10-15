import Container from 'react-bootstrap/Container';
import { Nav, Navbar, NavDropdown, Form, Row, Col, Button } from "react-bootstrap";
import { Link, useNavigate } from 'react-router-dom';
import { useState } from 'react';

export default function Menu(props) {
    const navegar = useNavigate();
    const [pesquisa, setPesquisa] = useState("");
    const [formValidado, setFormValidado] = useState(false);

    function manipularSubmissao(evento) {
        const form = evento.currentTarget;
        if (form.checkValidity()) {
            navegar("/busca");
            props.setPesquisa(pesquisa);
            setPesquisa("");
            setFormValidado(false);
        } else {
            setFormValidado(true);
        }
        evento.preventDefault();
        evento.stopPropagation();
    }

    function manipularMudanca(evento) {
        setPesquisa(evento.target.value);
        evento.preventDefault();
        evento.stopPropagation();
    }

    return (
        <Navbar expand="lg" className="bg-body-tertiary mt-2 mb-2 rounded">
            <Container>
                <Navbar.Brand>Menu</Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="me-auto">
                        <NavDropdown title="Relatórios" id="basic-nav-dropdown">
                            <NavDropdown.Item href="#action/3.1">Relatório 1</NavDropdown.Item>
                            <NavDropdown.Item href="#action/3.2">Relatório 2</NavDropdown.Item>
                            <NavDropdown.Item href="#action/3.3">Relatório 3</NavDropdown.Item>
                            <NavDropdown.Item href="#action/3.4">Relatório 4</NavDropdown.Item>
                        </NavDropdown>
                        <Nav.Link href="#" as={Link} to="/sobre">Sobre</Nav.Link>
                    </Nav>
                </Navbar.Collapse>
                <Form inline noValidate validated={formValidado} onSubmit={manipularSubmissao}>
                    <Row>
                        <Col xs="auto">
                            <Form.Control
                                type="text"
                                placeholder="Pesquise uma rua"
                                className=" mr-sm-2"
                                value={pesquisa}
                                onChange={(evento) => manipularMudanca(evento)}
                                required
                            />
                        </Col>
                        <Col xs="auto">
                            <Button type="submit" variant="warning">Procurar</Button>
                        </Col>
                    </Row>
                </Form>
            </Container>
        </Navbar >
    );
}