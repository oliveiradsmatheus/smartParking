import { Button, Container, Navbar, Image, Dropdown } from "react-bootstrap";
import { Link } from "react-router-dom";
import logo from "../../assets/imagens/logo.png";
import { useDispatch, useSelector } from "react-redux";
import usuarioImg from "../../assets/imagens/user.png"

export default function Cabecalho(props) {
    const adminLogado = useSelector((state) => state.login); // Estado do usuário
    const index = adminLogado.indexOf(' '); // só pra exibir o 1 nome
    const dispatch = useDispatch();
    const Deslogar = () => {
        dispatch({ type: "DESLOGAR"});
    };
    return (
        <Navbar expand="lg" className="bg-body-primary">
            <Container>
                <Image src={logo} style={{ width: '64px', height: '64px', marginRight: '1em' }}></Image>
                <Navbar.Brand href="#" as={Link} to="/"><h3 style={{margin: '0'}}>{props.titulo || "Título não fornecido"}</h3></Navbar.Brand>
                <Navbar.Toggle />
                <Navbar.Collapse className="justify-content-end">
                    {   
                        adminLogado ?
                        <Dropdown>
                            <Dropdown.Toggle as={Button} style={{border: 'none', backgroundColor: 'transparent', display: 'flex', alignItems: 'center' }} >
                                <Image 
                                    src={usuarioImg} 
                                    style={{ width: '32px', height: '32px', marginRight: '8px' }} 
                                />
                                <span>
                                    { index === -1 ? adminLogado : adminLogado.substring(0, index) }
                                </span>
                            </Dropdown.Toggle>
                            <Dropdown.Menu>
                                <Dropdown.Item as={Link} to="/usuario">Perfil</Dropdown.Item>
                                <Dropdown.Item as={Link} to="/" onClick={() => {
                                    Deslogar();
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