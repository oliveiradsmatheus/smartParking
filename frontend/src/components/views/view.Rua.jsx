import { Button, Card, Container } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

export default function Rua(props) {
    const navegar = useNavigate();

    return (
        <Container className="w-50">
            <Card className="p-3 mb-3"
                style={{ borderWidth: "2px", borderStyle: "groove", borderColor: props.rua.estado === 'D' ? "green" : "red" }}
            >
                <Card.Body> {/* Substituindo CardText por Card.Body */}
                    <div><strong>{props.rua.nome} - {props.rua.bairro}</strong></div>
                    <div>{props.rua.cidade} - {props.rua.uf}</div>
                    <div>Quantidade de Vagas: {props.rua.qtdVagas}</div>
                    {
                        props.rua.estado === "D" ? 
                        <Button className="mt-3" onClick={() => {
                            navegar("/detalha-rua?id=" + props.rua.id);
                        }}>
                            Selecionar Rua
                        </Button>
                        :
                        <div>Em Manutenção</div>
                    }
                </Card.Body>
            </Card>
        </Container>
    );
}
