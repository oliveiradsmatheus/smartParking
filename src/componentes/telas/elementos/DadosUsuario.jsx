import { Button, CardText, Container } from "react-bootstrap";

export default function DadosUsuario(props) {
    return (
        <Container className="p-3">
            <CardText>
                {props.usuarioSelecionado.nome}
            </CardText>
            <Button onClick={() => {
                props.setUsuarioSelecionado("");
                props.setExibirLogin(true);
            }}>
                Sair
            </Button>
        </Container>
    )
}