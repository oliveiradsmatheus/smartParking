import Pagina from "../layouts/Pagina";
import { Container, CardText, Card } from "react-bootstrap";
import { useEffect, useState } from "react";
import { ruas } from "../../dados/mockMapas";
import styles from "../../style/detalharRua.module.css";


export default function DetalharRua(props) {
    const [id, setId] = useState();
    const [rua, setRua] = useState(0);
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
                    return rua;
                }
            });
            setSensores(sensoresFiltrados[0].vagas);
            setRua(sensoresFiltrados[0])
        }
    }, [id]);

    return (
        <Pagina>
            <Container className="p-3">
                    <CardText>
                        <p>{rua.id} - {rua.nome}, {rua.bairro} </p>
                        <p>{rua.cidade} - {rua.uf}</p>
                        <p>Quantidade de Vagas: {rua.qtVagas}</p>
                    </CardText>
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
            <Container className="p-3" style={{display:"flex", justifyContent:"center"}}>

                <div className={styles.mapaRua} style={{ height: sensores.length * 25 + "vh" }}>
                    {/* <img src={ruaImage} alt="" /> */}
                {sensores.length > 0 ? (
                    sensores.map((sensor) => (
                        <div className={styles.vaga} style={{ borderColor: sensor.cor }}> </div>
                    ))
                ) : (
                    <p>Nenhum sensor encontrado.</p>
                )}
                </div>
            </Container>
        </Pagina>
    )
}
