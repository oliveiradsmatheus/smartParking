import { Button, Container, Navbar, Image, Dropdown } from "react-bootstrap";
import { Link } from "react-router-dom";
import logo from "../../assets/imagens/logo.png";
import usuarioImg from "../../assets/imagens/user.png"

export default function Cabecalho(props) {
    const token = localStorage.getItem('token')
    return (
        <Navbar expand="lg" className="bg-body-primary">
            <Container>
                <Image src={logo} style={{ width: '64px', height: '64px', marginRight: '1em' }}></Image>
                <Navbar.Brand href="#" as={Link} to="/"><h3 style={{margin: '0'}}>{props.titulo || "Título não fornecido"}</h3></Navbar.Brand>
                <Navbar.Toggle />
                <Navbar.Collapse className="justify-content-end">
                    {   
                        token ?
                        <Dropdown>
                            <Dropdown.Toggle as={Button} style={{border: 'none', backgroundColor: 'transparent', display: 'flex', alignItems: 'center' }} >
                                <Image 
                                    src={usuarioImg} 
                                    style={{ width: '32px', height: '32px', marginRight: '8px' }} 
                                />
                            </Dropdown.Toggle>
                            <Dropdown.Menu>
                                <Dropdown.Item as={Link} to="/usuario">Perfil</Dropdown.Item>
                                <Dropdown.Item as={Link} to="/" onClick={() => {
                                    //Deslogar();
                                }}>
                                    Sair
                                </Dropdown.Item>
                            </Dropdown.Menu>
                        </Dropdown>
                        :
                        <Button href="#" as={Link} to="/usuario" variant="primary">
                            Faça Login
                        </Button>
                    }
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
}