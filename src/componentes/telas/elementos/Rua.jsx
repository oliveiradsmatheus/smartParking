import { Card } from "react-bootstrap";

export default function Busca(props) {
    return (
        <Card className="bg-light">
            <Card.Text>{props.rua.nome}</Card.Text>
            <Card.Text>{props.rua.bairro}</Card.Text>
            <Card.Text>{props.rua.cidade}</Card.Text>
            <Card.Text>{props.rua.uf}</Card.Text>
            <Card.Text>{props.rua.qtVagas}</Card.Text>
        </Card>
    );
}   