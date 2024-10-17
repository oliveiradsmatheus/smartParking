import Container from 'react-bootstrap/Container';
import { Button, Nav, Navbar, NavDropdown } from "react-bootstrap";
import { Link, useNavigate } from 'react-router-dom';

export default function Menu(props) {
    const navegar = useNavigate();

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
                    <Button variant="warning" type="submit" onClick={() => { navegar("/busca"); }}>Buscar Vagas</Button>
                </Navbar.Collapse>
            </Container>
        </Navbar >
    );
}