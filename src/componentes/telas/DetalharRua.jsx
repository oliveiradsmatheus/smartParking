import Pagina from "../layouts/Pagina";
import { Container, CardText, Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

export default function DetalharRua(props) {
    const navegar = useNavigate();
    return (
        <Pagina>
            <Container className="p-3">
                <CardText>
                    <p>{props.ruaSelecionada.id} - {props.ruaSelecionada.nome}, {props.ruaSelecionada.bairro} </p>
                    <p>{props.ruaSelecionada.cidade} - {props.ruaSelecionada.uf}</p>
                    <p>Quantidade de Vagas: {props.ruaSelecionada.qtVagas}</p>
                </CardText>
                <Button onClick={() => {
                    props.setDetalharRua(false);
                    props.setRuaSelecionada("");
                    navegar("/busca");
                }}>
                    Voltar
                </Button>
            </Container>
        </Pagina>
    )
}