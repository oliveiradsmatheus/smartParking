import { Button, Container, Navbar } from "react-bootstrap";
import { Link } from "react-router-dom";

export default function Cabecalho(props) {
    return (
        <Navbar expand="lg" className="bg-body-primary">
            <Container>
                <Navbar.Brand href="#" as={Link} to="/"><h3>{props.titulo || "Título não fornecido"}</h3></Navbar.Brand>
                <Navbar.Toggle />
                <Navbar.Collapse className="justify-content-end">
                    <Button href="#" as={Link} to="/usuario" variant="primary">
                        Faça Login
                    </Button>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
}