import { CardText, Container } from "react-bootstrap";

export default function DadosUsuario(props) {
    return (
        <Container className="p-3">
            <CardText>
                {props.adminSelecionado}
            </CardText>
        </Container>
    )
}