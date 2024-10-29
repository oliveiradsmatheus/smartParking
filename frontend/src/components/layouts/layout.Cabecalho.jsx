import { Container, Navbar, Image } from "react-bootstrap";
import { Link } from "react-router-dom";

import logo from "../../assets/images/logo.png";
import Perfil from "../views/view.Perfil"

export default function Cabecalho(props) {
    return (
        <Navbar expand="lg" className="bg-body-primary">
            <Container>
                <Image src={logo} style={{ width: '64px', height: '64px', marginRight: '1em' }}></Image>
                <Navbar.Brand href="#" as={Link} to="/"><h3 style={{margin: '0'}}>{props.titulo || "Título não fornecido"}</h3></Navbar.Brand>
                <Navbar.Toggle />
                <Navbar.Collapse className="justify-content-end">
                    <Perfil/>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
}