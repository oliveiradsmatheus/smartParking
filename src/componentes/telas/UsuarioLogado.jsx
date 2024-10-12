import Pagina from "../layouts/Pagina.jsx";
import Imagem404 from "../../assets/imagens/Erro404.jpg"
import { Container } from "react-bootstrap";

export default function UsuarioLogado(props) {
    return (
        <Pagina>
            <Container className="mt-5 text-center">
                USUARIO LOGADO
            </Container>
        </Pagina>
    )
}