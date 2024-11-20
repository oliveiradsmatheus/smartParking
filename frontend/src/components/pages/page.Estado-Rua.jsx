import Pagina from "../layouts/layout.Pagina";
import { Container, Card, Button, Form, InputGroup } from "react-bootstrap";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import ModalConfirmacao from "../../services/service.Modal-Confirmacao";
import toast from "react-hot-toast";
import { getRuas, putRua } from "../../services/service.Fetch";

export default function EstadoRua() {
    const dispatch = useDispatch();
    const listaRuas = useSelector((state) => state.ruas.ruas);
    const [busca, setBusca] = useState([]);
    const [pesquisa, setPesquisa] = useState("");
    const [exibirModal, setExibirModal] = useState(false);
    const [idRua, setIdRua] = useState(null);
    const [estadoRua, setEstadoRua] = useState(null);


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
            setBusca(listaRuas); // Mantém todas as listaRuas se a pesquisa estiver vazia
        }
    }, [listaRuas, pesquisa]); // Executa sempre que listaRuas ou pesquisa mudarem

    function manipularMudanca(evento) {
        setPesquisa(evento.target.value); // Atualiza o estado da pesquisa
    }

    const lidarFecharModal = () => setExibirModal(false);
    const lidarExibirModal = (id, estado) => {
        setIdRua(id);
        setEstadoRua(estado);
        console.log(id, estado);
        setExibirModal(true);
    };
    const lidarConfirmar = async (novoEstado) => {
        console.log(idRua, novoEstado);
        toast.promise(
            putRua(idRua, novoEstado)
                .then((resposta) => {
                    if (resposta?.status) {
                        setBusca((prevSensores) =>
                            prevSensores.map(rua =>
                                rua.id === idRua ? { ...rua, estado: novoEstado } : rua
                            )
                        );
                        lidarFecharModal();
                        getRuas()
                            .then((resposta) => {
                                if (resposta?.status)
                                    dispatch({ type: "SET_RUAS", payload: resposta.data });
                            });
                        return true; // Isso será usado como mensagem de sucesso no toast
                    }
                    throw resposta; //lança um erro
                }),
            {
                loading: 'Salvando...',
                success: <b>Estado da Rua Atualizada com Sucesso!</b>,
                error: (erro) => <b>{erro.mensagem || "Erro ao Atualizar Sensor!"}</b>,
            }
        );
    };

    return (
        <>
            <Pagina>
                <Card style={{ width: "77%" }} className="mx-auto m-4 pt-4 text-center bg-body-tertiary">
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
                <Container className="d-grid" style={{
                    gridTemplateColumns: "repeat(auto-fill, minmax(20rem, 1fr))",
                    gap: "1rem",
                    justifyContent: "center"
                }}>
                    {
                        busca.length ?
                            busca.map((rua) => {
                                return (
                                    <Card
                                        key={rua.id}
                                        style={{
                                            borderWidth: "6px",
                                            borderStyle: "solid",
                                            width: '100%',
                                            height: '18rem',
                                            display: "flex",
                                            justifyContent: "center",
                                            alignItems: "center",
                                            textAlign: "center"
                                        }}
                                        border={rua.estado === "D" ? "success" : "danger"}

                                    >
                                        <Card.Body>
                                            <Card.Title>Rua: {rua.nome}</Card.Title>
                                            <Card.Subtitle className="mb-2 text-muted">Bairro: {rua.bairro}<br /> Cidade: {rua.cidade} - {rua.uf}</Card.Subtitle>
                                            <Card.Text>
                                                Descrição:
                                                <br />
                                                Quantidade de Vagas: {rua.qtdVagas}
                                                <br />
                                                <br />
                                                <strong>
                                                    Estado da Rua:
                                                    <span style={{ color: rua.estado === 'D' ? "#00F465" : "red" }}>
                                                        {rua.estado === 'D' ? "Disponível" : "Manutenção"}
                                                    </span>
                                                </strong>

                                            </Card.Text>
                                            <Button variant={rua.estado === 'D' ? "danger" : "success"}
                                                type="submit"
                                                onClick={() => { lidarExibirModal(rua.id, rua.estado) }}
                                            >
                                                {
                                                    rua.estado === 'D' ?
                                                        "Interditar"
                                                        :
                                                        "Liberar"
                                                }
                                            </Button>
                                        </Card.Body>
                                    </Card>
                                );
                            }) :
                            "Nenhum resultado encontrado."
                    }
                </Container>
                <ModalConfirmacao
                    quem={"Estado-Rua"}
                    exibir={exibirModal}
                    lidarFechar={lidarFecharModal}
                    lidarConfirmar={lidarConfirmar}
                    estadoNovo={estadoRua}
                />
            </Pagina>
        </>
    );
}
