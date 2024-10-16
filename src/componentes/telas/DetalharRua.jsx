import { Container, CardText, Button } from "react-bootstrap";

export default function DetalharRua(props) {
    return (
        <Container className="p-3">
            <CardText>
                <p>{props.ruaSelecionada.id} - {props.ruaSelecionada.nome}, {props.ruaSelecionada.bairro} </p>
                <p>{props.ruaSelecionada.cidade} - {props.ruaSelecionada.uf}</p>
                <p>Quantidade de Vagas: {props.ruaSelecionada.qtVagas}</p>
            </CardText>
            <Button onClick={() => {
                props.setDetalharRua(false);
                props.setRuaSelecionada("");
                
            }}>
                Voltar
            </Button>
        </Container>
    )
}