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
                        <div>
                            <Alert variant="dark">Vagas</Alert>
                            {/* <Card.Img className="p-1" alt="nome da rua" src={ruaSelecionada.mapa} /> */}
                            <iframe
                                title="Mapa de Pres. Prudente - SP"
                                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d433548.4525695371!2d-51.68344683771798!3d-21.962548778575165!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x9493f5b311570c5b%3A0xda475801fc46afb9!2sPres.%20Prudente%20-%20SP!5e1!3m2!1spt-BR!2sbr!4v1729383054640!5m2!1spt-BR!2sbr"
                                width="850"
                                height="450"
                                style={{ border: '0' }}
                                allowFullScreen
                                loading="lazy"
                                referrerPolicy="no-referrer-when-downgrade"
                            ></iframe>
                        </div>
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
