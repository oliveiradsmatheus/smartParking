import React, { useEffect, useState } from "react";
import Pagina from "../layouts/Pagina.jsx";
import Rua from "../telas/elementos/Rua.jsx";
import { Card, CardText, Container, Form, InputGroup } from "react-bootstrap";
import { useSelector } from "react-redux";

export default function Busca() {
    const [listaRuas] = useState(useSelector((state) => state.ruas.ruas));
    const [pesquisa, setPesquisa] = useState("");
    const [busca, setBusca] = useState([]);

    // Filtrar as ruas com base na pesquisa
    useEffect(() => {
        if (pesquisa !== "") {
            const buscaFiltrada = listaRuas?.filter((rua) => {
                if (!rua) return false; // Garante que sempre retorna algo se o 'rua' estiver indefinido
                let nome = rua.nome;
                let pesq = pesquisa;
                const ruaLC = nome.toLowerCase(); // Converte para minúsculas
                const pesquisaLC = pesq.toLowerCase(); // Coloca a pesquisa em minúsculas
                return ruaLC.includes(pesquisaLC); // Retorna booleano
            });
            if (buscaFiltrada !== "")
                setBusca([...buscaFiltrada]); // Atualiza o estado da busca
        }
        else
            setBusca([...listaRuas]);
    }, [listaRuas, pesquisa]); // Executa sempre que listaRuas ou pesquisa mudarem

    function manipularMudanca(evento) {
        setPesquisa(evento.target.value); // Atualiza o estado da pesquisa
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
                            onChange={manipularMudanca} // Usando a função diretamente
                        />
                    </InputGroup>
                </Card>
                <Card style={{ width: "65rem" }} className="mx-auto">
                    <CardText className="p-4 text-center">
                        {
                            busca.length ? (
                                busca.map((rua) => (
                                    <Rua rua={rua} />
                                ))
                            )
                            :
                            ("Nenhum resultado encontrado.")
                        }
                    </CardText>
                </Card>
            </Container>
        </Pagina>
    );
}
