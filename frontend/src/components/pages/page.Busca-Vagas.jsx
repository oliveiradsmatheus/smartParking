import React, { useEffect, useState } from "react";
import { Card, CardBody, Container, Form, InputGroup } from "react-bootstrap";
import { useSelector } from "react-redux";

import Pagina from "../layouts/layout.Pagina";
import Rua from "../views/view.Rua";

export default function BuscaVagas() {
    const listaRuas = useSelector((state) => state.ruas.ruas); // Removido useState aqui
    const [pesquisa, setPesquisa] = useState("");
    const [busca, setBusca] = useState([]);

    // Filtrar as ruas com base na pesquisa
    useEffect(() => {
        if (pesquisa !== "") {
            const buscaFiltrada = listaRuas?.filter((rua) => {
                if (!rua) return false; // Garante que sempre retorna algo se o 'rua' estiver indefinido
                let nome = rua.nome;
                const ruaLC = nome.toLowerCase(); // Converte para minúsculas
                const pesquisaLC = pesquisa.toLowerCase(); // Coloca a pesquisa em minúsculas
                return ruaLC.includes(pesquisaLC); // Retorna booleano
            });
            setBusca(buscaFiltrada); // Atualiza o estado da busca
        } else {
            setBusca(listaRuas); // Mantém todas as ruas se a pesquisa estiver vazia
        }
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
                    <CardBody className="p-4 text-center">
                        {
                            busca.length > 0 ? (
                                busca.map((rua) => (
                                    <Rua key={rua.id} rua={rua} />
                                ))
                            ) : (
                                <p>Nenhum resultado encontrado.</p> // Usar um <p> aqui para manter a semântica
                            )
                        }
                    </CardBody>
                </Card>
            </Container>
        </Pagina>
    );
}
