import { Container } from "react-bootstrap";

import Pagina from "../layouts/layout.Pagina";
import Imagem404 from "../../assets/images/Error404.jpg"

export default function Error404(props) {
    return (
        <Pagina>
            <Container className="mt-5 text-center">
                <img className="square bg-primary rounded" alt="Imagem 404" src={Imagem404} width="248" />
                <h2 className="mt-5 text-center">Página não encontrada!</h2>
            </Container>
        </Pagina>
    )
}