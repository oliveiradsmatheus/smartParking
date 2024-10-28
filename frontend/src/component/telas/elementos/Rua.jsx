import { Button, Card, CardBody, Container } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

export default function Rua(props) {
    const navegar = useNavigate();

    return (
        <Container className="w-50">
            <Card className="p-3 mb-3">
                <CardBody>
                    <div><strong>{props.rua.nome} - {props.rua.bairro}</strong></div>
                    <div>{props.rua.cidade} - {props.rua.uf}</div>
                    <div>Quantidade de Vagas: {props.rua.qtdVagas}</div>
                </CardBody>
                <Button onClick={() => {
                    navegar("/rua?id=" + props.rua.id);
                }}>
                    Selecionar Rua
                </Button>
            </Card>
        </Container>
    );
}
