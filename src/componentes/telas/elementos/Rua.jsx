import { Button, Container, CardText } from "react-bootstrap";

export default function Rua(props) {
    return (
        <Container className="p-3">
            <CardText>
                <p>{props.rua.id} - {props.rua.nome}, {props.rua.bairro} </p>
                <p>{props.rua.cidade} - {props.rua.uf}</p>
                <p>Quantidade de Vagas: {props.rua.qtVagas}</p>
            </CardText>
            <Button onClick={() => {
                props.setRuaSelecionada(props.rua);
                props.setDetalharRua(true);
            }}>
                Selecionar Rua
            </Button>
        </Container>
    );
}   