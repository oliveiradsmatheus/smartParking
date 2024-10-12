import Pagina from "../layouts/Pagina.jsx";
import Rua from "../telas/elementos/Rua.jsx";
import { Alert, Container, Card, CardText } from "react-bootstrap";
import { ruas } from "../../dados/mockMapas.js";
import { useState } from "react";

export default function Busca(props) {
    const [listaRuas, setListaRuas] = useState(ruas);
    const [pesquisa, setPesquisa] = useState("");
    const [listaBusca, setListaBusca] = useState([]);

    return (
        <Pagina>

            <Container>
                <Alert className="mt-4 mb-4 pt-4 text-center" variant="secondary">
                    <h4>
                        Resultados da pesquisa:
                    </h4>
                </Alert>
                <Card style={{ width: "65rem" }} className="mx-auto">
                    <CardText className="p-4 text-center">
                        <p>{listaRuas.length}</p>
                        <p>
                            {
                                listaRuas.filter((rua) => {
                                    <div>
                                        <p>{rua.nome}</p>
                                        <Rua rua={rua} />
                                    </div>
                                })
                            }
                        </p>
                    </CardText>
                </Card>
            </Container>
        </Pagina>
    );
}   