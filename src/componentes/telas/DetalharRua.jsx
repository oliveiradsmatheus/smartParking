import Pagina from "../layouts/Pagina";
import { Alert, Card, CardText, Container } from "react-bootstrap";
import { useEffect, useState } from "react";
import { ruas } from "../../dados/mockMapas";

export default function DetalharRua(props) {
    const [id, setId] = useState();
    const [ruaSelecionada, setRuaSelecionada] = useState(0);
    const [sensores, setSensores] = useState([]);

    useEffect(() => {
        const params = new URLSearchParams(window.location.search);
        const idFromUrl = params.get('cod');
        setId(parseInt(idFromUrl));
    }, []);

    useEffect(() => {
        if (id !== undefined) {
            const sensoresFiltrados = ruas.filter((rua) => {
                if (rua.id === id) {
                    setRuaSelecionada(rua);
                    return rua;
                }
            });
            setSensores(sensoresFiltrados[0].vagas);
        }
    }, [id]);

    return (
        <Pagina>
            <Container style={{ width: "65rem" }} className="mx-auto p-3 text-center">
                <Card>
                    <CardText className="p-4">
                        <p>{ruaSelecionada.id} - {ruaSelecionada.nome}, {ruaSelecionada.bairro} </p>
                        <p>{ruaSelecionada.cidade} - {ruaSelecionada.uf}</p>
                        <p>Quantidade de Vagas: {ruaSelecionada.qtVagas}</p>
                    </CardText>
                    <Card className="mx-5 mb-5 p-4 bg-body-secondary">
                        <Alert variant="dark">Vagas</Alert>
                        <Card.Img className="p-1" alt="nome da rua" src={ruaSelecionada.mapa} />
                    </Card>
                    <Card className="mx-5 mb-5 p-4 bg-body-tertiary">

                        {sensores.length > 0 ? (
                            sensores.map((sensor) => (
                                <p key={sensor.id} style={{ color: sensor.cor }}>{sensor.cor}</p>
                            ))
                        ) : (
                            <p>Nenhum sensor encontrado.</p>
                        )}
                    </Card>
                </Card>
            </Container>
        </Pagina>
    )
}
