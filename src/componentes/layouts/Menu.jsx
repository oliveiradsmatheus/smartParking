import Container from 'react-bootstrap/Container';
import { Button, Nav, Navbar, NavDropdown } from "react-bootstrap";
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';

export default function Menu(props) {
    //const adminLogado = useSelector((state) => state)

    return (
        <Navbar expand="lg" className="bg-body-tertiary mt-2 mb-2 rounded">
            <Container>
                <Navbar.Brand>Menu</Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav" className='justify-content-end'>
                    <Nav className="me-auto">
                        <NavDropdown title="Relatórios" id="basic-nav-dropdown">
                            <NavDropdown.Item href="#action/3.1">Pico De Ocupação</NavDropdown.Item>
                            <NavDropdown.Item href="#action/3.2">Tempo Médio Ocupação</NavDropdown.Item>
                            {/* Adicionando o dropdown para Filtros */}
                            <NavDropdown title="Filtros" id="filtros-dropdown">
                                <NavDropdown.Item href="#action/4.1">Data</NavDropdown.Item>
                                <NavDropdown.Item href="#action/4.2">Semana</NavDropdown.Item>
                                <NavDropdown.Item href="#action/4.3">Hora</NavDropdown.Item>
                            </NavDropdown>
                        </NavDropdown>
                        <Nav.Link href="#" as={Link} to="/sobre">Sobre</Nav.Link>
                    </Nav>
                    <Button variant="warning" type="submit" as={Link} to="/busca">
                        Buscar Vagas
                    </Button>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
}