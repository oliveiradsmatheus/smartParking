import { Button, Nav, Navbar, Container } from "react-bootstrap";
import { useSelector } from "react-redux";
import { Link } from 'react-router-dom';

export default function BarraNavegacao(props) {
    const adminLogado = useSelector((state)=> state.login);
    
    return (
        <Navbar expand="lg" className="bg-body-tertiary mt-2 mb-2 rounded">
            <Container>
                <Navbar.Brand>Home</Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav" className='justify-content-end'>
                    <Nav className="me-auto">
                        <Nav.Link href="#" as={Link} to="/relatorio">Relatórios</Nav.Link>                        
                        {adminLogado && <Nav.Link href="#" as={Link} to="/estado-rua">Manutenção</Nav.Link>}
                        <Nav.Link href="#" as={Link} to="/sobre">Sobre</Nav.Link>
                    </Nav>
                    <Button variant="warning" type="submit" as={Link} to="/busca-vagas">
                        Buscar Vagas
                    </Button>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
}