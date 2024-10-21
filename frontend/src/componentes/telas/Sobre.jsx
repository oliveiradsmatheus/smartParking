import Pagina from "../layouts/Pagina.jsx";
import { Alert, Card, CardText, Container } from "react-bootstrap";

export default function Home(props) {
    return (
        <Pagina>
            <Container>
                <Alert className="mt-4 mb-4 text-center" variant="secondary">
                    <h2>
                        SMART PARKING
                    </h2>
                </Alert>
                <Card style={{ width: "65rem" }} className="mx-auto">
                    <CardText className="p-4 text-center">
                        <h4>
                            Sobre o Smart Parking
                        </h4>
                        <br />
                        <p>
                            O projeto visa desenvolver um sistema de monitoramento de vagas de estacionamento utilizando sensores ultrassônicos, controlados por um Arduino Mega. A ideia é criar uma simulação de um ambiente urbano onde a ocupação das vagas de estacionamento é monitorada em tempo real, oferecendo uma solução eficiente para a gestão de estacionamento em espaços públicos.
                        </p>
                        <br />
                        <h4>Desenvolvedores</h4>
                        <br />
                        <p>Arcesti Giglio Ricci</p>
                        <p>Cauã Pereira Domingues</p>
                        <p>Eduardo Pereira de Almeida</p>
                        <p>João Manuel Oliveira Pereira</p>
                        <p>João Paulo Saccomani de Freitas Bortolocce</p>
                        <p>Leandro Marcos Cassemiro Rodrigues</p>
                        <p>Luiz Gustavo Renner Scatalon</p>
                        <p>Matheus Oliveira da Silva</p>
                        <p>Victor Hugo Donaire de Oliveira</p>
                    </CardText>
                </Card>
            </Container>
        </Pagina>
    );
}   