import Pagina from "../layouts/Pagina.jsx";
import Imagem404 from "../../assets/imagens/Erro404.jpg"
import { Container } from "react-bootstrap";

export default function Erro404(props) {
    return (
        <Pagina>
            <Container className="mt-5 text-center">
                <img className="square bg-primary rounded" alt="Imagem 404" src={Imagem404} width="248" />
                <h2 className="mt-5 text-center">Página não encontrada!</h2>
            </Container>
        </Pagina>
    )
}