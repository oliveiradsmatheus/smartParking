import { Button, CardText, Container } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

export default function Rua(props) {
    const navegar = useNavigate();
    return (
        <Container className="p-3">
            <CardText>
                <p>{props.rua.nome} - {props.rua.bairro}</p>
                <p>{props.rua.cidade} - {props.rua.uf}</p>
                <p>Quantidade de Vagas: {props.rua.qtdVagas}</p>
            </CardText>
            <Button onClick={() => {
                navegar("/rua?id=" + props.rua.id);
            }}>
                Selecionar Rua
            </Button>
        </Container>
    );
}   