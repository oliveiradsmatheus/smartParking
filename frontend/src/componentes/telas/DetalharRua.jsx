import Pagina from "../layouts/Pagina";
import { Alert, Card, CardText, Container } from "react-bootstrap";
import { useState, useEffect } from "react";
import { useSelector } from "react-redux";

export default function DetalharRua() {
    const params = new URLSearchParams(window.location.search);
    const idFromUrl = params.get('id');

    const listaRuas = useSelector((state) => state.ruas.ruas);
    const [rua, setRua] = useState(null);

    useEffect(() => {
        if (listaRuas)
            setRua(listaRuas.find((rua) => rua.id === idFromUrl) || {});
    }, [listaRuas, idFromUrl]);

    return (
        <Pagina>
            <Container style={{ width: "65rem" }} className="mx-auto p-3 text-center">
                <Card>
                    <CardText className="p-4">
                        {rua ? (
                            <>
                                <p>{rua.nome || ""} - {rua.bairro || ""}</p>
                                <p>{rua.cidade || ""} - {rua.uf || ""}</p>
                                <p>Quantidade de Vagas: {rua.qtdVagas || ""}</p>
                            </>
                        ) : (
                            <p>Carregando dados da rua...</p>
                        )}
                    </CardText>
                    <Card className="mx-5 mb-5 p-4 bg-body-secondary">
                        <div>
                            <Alert variant="dark">Vagas</Alert>
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
                </Card>
            </Container>
        </Pagina>
    );
}
