import { useState } from "react";
import Pagina from "../layouts/Pagina";
import { Container, CardText, Button } from "react-bootstrap";
import { useEffect } from "react";
import { ruas } from "../../dados/mockMapas"

export default function DetalharRua(props) {
    const [id, setId] = useState(0);
    const [sensores, setSensores] = useState([]);

    function selecionaSensores() {
        setSensores(ruas.filter((rua) => {
            return rua.id === id;
        }));
    }

    useEffect(() => {
        const params = new URLSearchParams(window.location.search);
        const idFromUrl = params.get("cod");
        setId(idFromUrl);
        selecionaSensores(idFromUrl);
    }, []);

    useEffect(() => {
        if(id != undefined) {

        }
    },[id])

    return (
        <Pagina>
            <Container className="p-3">
                <p>
                    {sensores.nome};
                </p>
                {/*
                <CardText>
                    <p>{props.ruaSelecionada.id} - {props.ruaSelecionada.nome}, {props.ruaSelecionada.bairro} </p>
                    <p>{props.ruaSelecionada.cidade} - {props.ruaSelecionada.uf}</p>
                    <p>Quantidade de Vagas: {props.ruaSelecionada.qtVagas}</p>
                </CardText>
                <Button onClick={() => {
                    props.setDetalharRua(false);
                    props.setRuaSelecionada("");
                    navegar("/busca");
                }}>
                    Voltar
                </Button>*/
                }
            </Container>
        </Pagina>
    )
}