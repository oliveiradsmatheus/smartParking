import { Container, Form, ListGroup, Row, Col, Card, Button, CardText } from 'react-bootstrap';
import React, { useState, useRef, useEffect } from 'react';
import { useSelector } from "react-redux";
import axios from "axios";

import Pagina from "../layouts/layout.Pagina";

export default function Relatorio(props) {
    const dataAtual = new Date().toISOString().split("T")[0];
    const listaRuasRedux = useSelector((state) => state.ruas.ruas); // Obtém as ruas do Redux
    const [opcoesFiltradas, setOpcoesFiltradas] = useState(listaRuasRedux);
    const [mostrarOpcoes, setMostrarOpcoes] = useState(false);
    const [formValidado, setFormValidado] = useState(false);
    const [buscado, setBuscado] = useState(true);
    const [inicioConsulta, setInicioConsulta] = useState(false);
    const [pesquisa, setPesquisa] = useState('');
    const listaRef = useRef(null); // Referência para a lista

    const [infoRua, setInfoRua] = useState({});
    const [tempInfoRua, setTempInfoRua] = useState({});
    const [idRua, setIdRua] = useState('');
    const [tempTipo, setTempTipo] = useState('');
    const [tipoRel, setTipoRel] = useState('');
    const [dtInicio, setDtInicio] = useState('');
    const [dtFim, setDtFim] = useState('');
    const [resposta, setResposta] = useState({});


    const lidarMudancaPesquisa = (e) => {
        const valor = e.target.value;
        setPesquisa(valor);
        setMostrarOpcoes(valor !== ''); // Mostra opções apenas se o campo não estiver vazio
        setOpcoesFiltradas( // Filtra as opções
            listaRuasRedux.filter(rua =>
                rua.nome.toLowerCase().includes(valor.toLowerCase()) // Filtra pelo nome da rua
            )
        );
    };
    const lidarOpcaoClick = (rua) => {
        setPesquisa(rua.nome); // Define o valor do campo de busca como o nome da rua selecionada
        setInfoRua(rua);
        setIdRua(rua.id);
        setMostrarOpcoes(false); // Fecha as opções ao selecionar uma
    };
    const lidarClickFora = (event) => {
        if (listaRef.current && !listaRef.current.contains(event.target)) // Verifica se o clique foi fora do input e da lista
            setMostrarOpcoes(false); // Fecha a lista
    };
    useEffect(() => {
        document.addEventListener('mousedown', lidarClickFora); // Adiciona o listener
        return () => {
            document.removeEventListener('mousedown', lidarClickFora); // Remove o listener ao desmontar
        };
    }, []);

    function decimalParaHorasMinutos(decimal) {
        let horas = Math.floor(decimal);
        let minutos = Math.round((decimal - horas) * 60);
        return { h: horas, m: minutos };
    }

    function manipularSubmissao(evento) {
        const form = evento.currentTarget;
        if (form.checkValidity()) {
            setBuscado(false); // Marca como não buscado antes da nova tentativa
            setTempTipo(tipoRel);
            setTempInfoRua(infoRua);
            const fetch = async () => {
                try {
                    const resposta = await axios.get(`http://localhost:5000/api/relatorios`, {
                        params: {
                            tipo: tipoRel,
                            rua: idRua,
                            dtInicio: dtInicio,
                            dtFim: dtFim
                        },
                    });
                    setResposta(resposta.data); // Acesse a resposta corretamente
                    setBuscado(true);
                } catch (erro) {
                    alert("Erro ao consultar relatorio: " + erro.response.data.mensagem);
                }
            };
            fetch();
        }
        else {
            setFormValidado(true);
        }
        evento.preventDefault();
        evento.stopPropagation();
    }

    return (
        <Pagina>
            <Container className="w-75" style={{ marginTop: "2em", height: "500px" }}>
                <Card className="mx-auto pt-3 pb-4 bg-body-tertiary">
                    <Form noValidate validated={formValidado} onSubmit={manipularSubmissao}>
                        <Row className="justify-content-md-center">
                            <Col xs={7} style={{ position: 'relative' }}>
                                <Form.Group controlId="exampleForm.SelectCustom">
                                    <Form.Label>Selecione uma Rua/Avenida</Form.Label>
                                    <Form.Control
                                        required
                                        type="text"
                                        placeholder="Digite para filtrar..."
                                        value={pesquisa}
                                        onChange={lidarMudancaPesquisa}
                                        onFocus={() => setMostrarOpcoes(true)} // Mostra opções ao focar no campo
                                        autoComplete="off"
                                    />
                                    {
                                        mostrarOpcoes && (
                                            <ListGroup
                                                ref={listaRef} // Adiciona a referência aqui
                                                style={{
                                                    position: 'absolute',
                                                    zIndex: 1,
                                                    marginTop: '0.5rem',
                                                    width: '94%', // Ajusta a largura
                                                    maxHeight: '150px', // Define uma altura máxima para a lista
                                                    overflowY: 'auto', // Permite rolagem vertical
                                                    padding: '0' // Remove o padding da lista
                                                }}
                                            >
                                                {opcoesFiltradas.slice(0, 10).map((rua) => ( // Limita a 10 itens
                                                    <ListGroup.Item
                                                        key={rua.id} // Usar um valor único como chave
                                                        action
                                                        onClick={() => lidarOpcaoClick(rua)}
                                                        style={{ padding: '0.5rem 1rem' }} // Adiciona padding aos itens da lista
                                                    >
                                                        {rua.uf} | {rua.nome}, {rua.bairro}, {rua.cidade} {/* Exibe as informações da rua */}
                                                    </ListGroup.Item>
                                                ))}
                                            </ListGroup>
                                        )
                                    }
                                    <Form.Control.Feedback type="invalid">
                                        Por favor, informe uma rua/avenida!
                                    </Form.Control.Feedback>
                                </Form.Group>
                            </Col>
                            <Col xs={3}>
                                <Form.Group>
                                    <Form.Label>Tipo Relatório</Form.Label>
                                    <Form.Select
                                        required
                                        value={tipoRel}
                                        onChange={(e) => {
                                            setTipoRel(e.target.value);
                                            // setBuscado(false);
                                        }}
                                    >
                                        <option value="">Selecionar</option>
                                        <option value="1">Pico Ocupação MAX</option>
                                        <option value="2">Pico Ocupação MIN</option>
                                        <option value="3">Tempo Médio Ocupação</option>
                                    </Form.Select>
                                    <Form.Control.Feedback type="invalid">
                                        Por favor, informe um tipo de relatório!
                                    </Form.Control.Feedback>
                                </Form.Group>
                            </Col>
                        </Row>
                        <Row className="pt-4 justify-content-md-center">
                            <Col xs={3}>
                                <Form.Group controlId="dataInicio">
                                    <Form.Label>Data de Início</Form.Label>
                                    <Form.Control
                                        required
                                        type="date"
                                        max={dataAtual}
                                        value={dtInicio}
                                        onChange={(e) => (setDtInicio(e.target.value))}
                                    />
                                    <Form.Control.Feedback type="invalid">
                                        Informe pelo menos uma Data de Inicio ou uma Data de Fim!
                                    </Form.Control.Feedback>
                                </Form.Group>
                            </Col>
                            <Col xs={3}>
                                <Form.Group controlId="dataFim">
                                    <Form.Label>Data de Fim</Form.Label>
                                    <Form.Control
                                        required
                                        type="date"
                                        max={dataAtual}
                                        value={dtFim}
                                        onChange={(e) => (setDtFim(e.target.value))}
                                    />
                                    <Form.Control.Feedback type="invalid">
                                        Informe pelo menos uma Data de Inicio ou uma Data de Fim!
                                    </Form.Control.Feedback>
                                </Form.Group>
                            </Col>
                            <Col xs={2} className="pt-4 mt-2">
                                <Button onClick={()=>{setInicioConsulta(true)}} type="submit" variant="primary">
                                    Confirmar
                                </Button>
                            </Col>
                        </Row>
                    </Form>
                </Card>
                <Card className="mx-auto mt-3 pt-5 pb-5 text-center">
                    {
                        inicioConsulta ? (
                            resposta.rua != null ? (
                                buscado && Object.keys(resposta).length > 0 && (
                                    <CardText>
                                        <h4>{tempInfoRua.nome} - {tempInfoRua.bairro}</h4>
                                        <h6 className="mb-5">{tempInfoRua.cidade} - {tempInfoRua.uf}</h6>
                                        {
                                            tempTipo === '1' ?
                                                <>
                                                    <h5>Pico de Ocupação MAXIMO</h5>
                                                    {
                                                        (() => {
                                                            const { h, m } = decimalParaHorasMinutos(resposta.picoMax);
                                                            return (
                                                                <h5>{h}H:{m}M</h5>
                                                            );
                                                        })()
                                                    }
                                                </>
                                                :
                                                tempTipo === '2' ?
                                                    <>
                                                        <h5>Pico de Ocupação MINIMO</h5>
                                                        {
                                                            (() => {
                                                                const { h, m } = decimalParaHorasMinutos(resposta.picoMin);
                                                                return (
                                                                    <h5>{h}H:{m}M</h5>
                                                                );
                                                            })()
                                                        }
                                                    </>
                                                    :
                                                    tempTipo === '3' && (
                                                        <>
                                                            <h5>Tempo Médio de Ocupação</h5>
                                                            <h5>{resposta.horas}H:{resposta.minutos}M</h5>
                                                        </>
                                                    )
                                        }
                                    </CardText>
                                )
                            ) : (
                                <h5>
                                    Sem Dados Disponíveis...
                                </h5>
                            )
                        ) : (
                            <h5>
                                Nenhuma Consulta Realizada...
                            </h5>
                        )
                    }
                </Card>
            </Container>
        </Pagina >
    );
}
