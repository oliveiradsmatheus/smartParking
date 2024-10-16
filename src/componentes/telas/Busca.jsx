import Pagina from "../layouts/Pagina.jsx";
import Rua from "../telas/elementos/Rua.jsx"
import DetalharRua from "./DetalharRua.jsx";
import { Card, CardText, Container, Form, InputGroup } from "react-bootstrap";
import { ruas } from "../../dados/mockMapas.js";
import { useState } from "react";

export default function Busca(props) {
    const [listaRuas, setListaRuas] = useState(ruas);
    const [ruaSelecionada, setRuaSelecionada] = useState("");
    const [detalharRua, setDetalharRua] = useState(false);
    const [pesquisa, setPesquisa] = useState("");

    const busca = listaRuas.filter((rua) => {
        const ruaLC = rua.nome.toLowerCase();
        const pesquisaLC = pesquisa.toLowerCase();
        if (ruaLC.includes(pesquisaLC))
            return rua;
    });

    function manipularMudanca(evento) {
        setPesquisa(evento.target.value);
    }

    return (
        <Pagina>
            <Container>
                <Card style={{ width: "65rem" }} className="mx-auto m-4 pt-4 text-center bg-body-tertiary">
                    <InputGroup className="ps-4 pe-4 pb-4 pt-1">
                        <Form.Control
                            type="text"
                            id="pesquisa"
                            placeholder="Nome da rua"
                            value={pesquisa}
                            onChange={(evento) => { manipularMudanca(evento) }}
                        />
                    </InputGroup>
                </Card>
                <Card style={{ width: "65rem" }} className="mx-auto">
                    <CardText className="p-4 text-center">
                        {
                            detalharRua ?
                                <DetalharRua
                                    ruaSelecionada={ruaSelecionada}
                                    setRuaSelecionada={setRuaSelecionada}
                                    setDetalharRua={setDetalharRua} /> :
                                busca.length ?
                                    busca.map((rua) => {
                                        return (
                                            <Rua
                                                setDetalharRua={setDetalharRua}
                                                setRuaSelecionada={setRuaSelecionada}
                                                rua={rua} />
                                        );
                                    }) :
                                    "Nenhum resultado encontrado."
                        }
                    </CardText>
                </Card>
            </Container>
        </Pagina>
    );
}   