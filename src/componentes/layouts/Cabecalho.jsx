import { Navbar, Button, Container } from "react-bootstrap";
import { useState } from "react";

export default function Cabecalho(props) {
    const [exibirLogin, setExibirLogin] = useState(false);

    return (
        <Navbar expand="lg" className="bg-body-primary">
            <Container>
                <Navbar.Brand><h3>{props.titulo || "Título não fornecido"}</h3></Navbar.Brand>
                <Navbar.Toggle />
                <Navbar.Collapse className="justify-content-end">
                <Button type="submit" variant="primary">Faça Login</Button>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
}