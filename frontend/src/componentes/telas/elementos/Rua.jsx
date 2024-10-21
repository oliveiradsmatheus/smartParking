import { Button, CardText, Container } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

export default function Rua(props) {
    const navegar = useNavigate();
    return (
        <Container className="p-3">
            <CardText>
                <p>{props.rua.nome} </p>
                <p>Presidente Prudente</p>
                <p>Quantidade de Vagas: {props.rua.qtdVagas}</p>
            </CardText>
            <Button onClick={() => {
                navegar("/rua?cod=" + props.rua.id);
            }}>
                Selecionar Rua
            </Button>
        </Container>
    );
}   