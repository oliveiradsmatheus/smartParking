import Pagina from "../layouts/Pagina.jsx";
import Rua from "../telas/elementos/Rua.jsx"
import DetalharRua from "./elementos/DetalharRua.jsx";
import { Alert, Container, Card, CardText } from "react-bootstrap";
import { ruas } from "../../dados/mockMapas.js";
import { useEffect, useState } from "react";

export default function Busca(props) {
    const [listaRuas, setListaRuas] = useState(ruas);
    const [listaBusca, setListaBusca] = useState([]);
    const [ruaSelecionada, setRuaSelecionada] = useState("");
    const [detalharRua, setDetalharRua] = useState(false);
    const [pesquisa, setPesquisa] = useState("");

    useEffect(() => {
        console.log("teste");
    }, [pesquisa])

    return (
        <Pagina>
            <Container>
                <Alert className="mt-4 mb-4 pt-4 text-center" variant="secondary">
                    <h4>
                        {
                            detalharRua ?
                                ruaSelecionada.nome :
                                "Resultados da pesquisa" + pesquisa
                        }
                    </h4>
                </Alert>
                <Card style={{ width: "65rem" }} className="mx-auto">
                    <CardText className="p-4 text-center">
                        {
                            detalharRua ?
                                <DetalharRua
                                    ruaSelecionada={ruaSelecionada}
                                    setRuaSelecionada={setRuaSelecionada}
                                    setDetalharRua={setDetalharRua} /> :
                                listaRuas?.map((rua) => {
                                    return (
                                        <Rua
                                            setDetalharRua={setDetalharRua}
                                            setRuaSelecionada={setRuaSelecionada}
                                            rua={rua} />
                                    );
                                })
                        }
                    </CardText>
                </Card>
            </Container>
        </Pagina>
    );
}   