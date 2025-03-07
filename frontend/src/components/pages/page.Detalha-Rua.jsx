import { Alert, Card, CardBody, Container, Image } from "react-bootstrap";
import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import toast from "react-hot-toast";
import Pagina from "../layouts/layout.Pagina";
import ModalConfirmacao from "../../services/service.Modal-Confirmacao";
import { getSensores, putSensor } from "../../services/service.Fetch";
import io from "socket.io-client";  // Importa o socket.io-client

import { ToastContainer, toast as toastify } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import vagaD from "../../assets/images/vagaD.png";
import vagaA from "../../assets/images/vagaA.png";
import vagaO from "../../assets/images/vagaO.png";
import vagaM from "../../assets/images/vagaM.png";
import bolaD from "../../assets/images/bolaD.png";
import bolaO from "../../assets/images/bolaO.png";
import bolaM from "../../assets/images/bolaM.png";
import bolaA from "../../assets/images/bolaA.png";

import style from "../../style/detalheRua.module.css";
// Configura a conexão do socket
const socket = io("http://localhost:5000/");

export default function DetalhaRua() {
    const adminLogado = useSelector((state) => state.login);

    const params = new URLSearchParams(window.location.search);
    const idFromUrl = params.get('id');

    const listaRuas = useSelector((state) => state.ruas.ruas);
    const [rua, setRua] = useState(null);
    const [sensores, setSensores] = useState([]);
    const [exibirModal, setExibirModal] = useState(false);
    const [idSensor, setIdSensor] = useState(null);
    const [estadoSensor, setEstadoSensor] = useState(null);
    const[quemAtt, setQuemAtt] = useState(false);

    useEffect(() => {
        const atualizarSensores = () => {
            if(!quemAtt){
                getSensores(idFromUrl)
                    .then((resposta) => {
                        if (resposta?.status){
                                toastify.success('Atualização de Vaga !');
                            setSensores(resposta.data);
                        }
                    });
            }
            else
                setQuemAtt(false);
        };

        // Configura o socket para escutar atualizações de sensores
        socket.on("Estado Atualizado", atualizarSensores);

        // Remove o listener ao desmontar o componente
        return () => {
            socket.off("Estado Atualizado", atualizarSensores);
        };
    }, [idFromUrl, quemAtt]);

    useEffect(() => {
        getSensores(idFromUrl)
            .then((resposta) => {
                if (resposta?.status)
                    setSensores(resposta.data);
            });
        if (listaRuas)
            setRua(listaRuas.find((rua) => rua.id === idFromUrl) || {});
    }, [listaRuas, idFromUrl]);

    const lidarFecharModal = () => setExibirModal(false);
    const lidarExibirModal = (id, estado) => {
        setIdSensor(id);
        setEstadoSensor(estado);
        setExibirModal(true);
    };
    const lidarConfirmar = async (novoEstado) => {
        setQuemAtt(true);
        toast.promise(
            putSensor(idSensor, novoEstado)
                .then((resposta) => {
                    if (resposta?.status) {
                        setSensores((prevSensores) =>
                            prevSensores.map(sensor =>
                                sensor.id === idSensor ? { ...sensor, estado: novoEstado } : sensor
                            )
                        );
                        lidarFecharModal();
                        return true; // Isso será usado como mensagem de sucesso no toast
                    }
                    throw resposta; //lança um erro
                }),
            {
                loading: 'Salvando...',
                success: <b>Sensor Atualizado com Sucesso!</b>,
                error: (erro) => <b>{erro.mensagem || "Erro ao Atualizar Sensor!"}</b>,
            }
        );
    };

    return (
        <Pagina>
            <Container style={{ width: "65rem" }} className="mx-auto p-3 text-center">
                <Card>
                    <CardBody className="p-4">
                        {rua ? (
                            <>
                                <div><strong>{rua.nome || ""} - {rua.bairro || ""}</strong></div>
                                <div>{rua.cidade || ""} - {rua.uf || ""}</div>
                                <div>Quantidade de Vagas: {rua.qtdVagas || ""}</div>
                            </>
                        ) : (
                            <p>Carregando dados da rua...</p>
                        )}
                    </CardBody>
                    <Container className="w-75 position-relative">
                        <Card className="mx-5 mb-5 p-4 bg-body-secondary">
                            <div>
                                <Alert variant="dark">
                                    <h5>Vagas</h5>
                                    <div className="d-flex justify-content-between mt-4">
                                        <div className="d-flex align-items-center">
                                            <Image src={bolaD} style={{ width: '20px' }} roundedCircle />
                                            <p className="mb-0 ms-2">Disponível</p>
                                        </div>
                                        <div className="d-flex align-items-center">
                                            <Image src={bolaA} style={{ width: '18px' }} roundedCircle />
                                            <p className="mb-0 ms-2">Em Análise</p>
                                        </div>
                                        <div className="d-flex align-items-center">
                                            <Image src={bolaO} style={{ width: '18px' }} roundedCircle />
                                            <p className="mb-0 ms-2">Ocupado</p>
                                        </div>
                                        <div className="d-flex align-items-center">
                                            <Image src={bolaM} style={{ width: '18px' }} roundedCircle />
                                            <p className="mb-0 ms-2">Manutenção</p>
                                        </div>
                                    </div>
                                </Alert>
                            </div>
                            <strong className="pb-3">1º Quadra</strong>
                            <div className={style.rua} style={{ height: sensores.length * 30 + 'vh' }}>

                                {
                                    sensores.map((s) => (
                                        (
                                            adminLogado ? (
                                                <Image
                                                    type="Button"
                                                    onClick={() => lidarExibirModal(s.id, s.estado)}
                                                    key={s.id}
                                                    src={
                                                        s.estado === 'D' ? vagaD :
                                                            s.estado === 'A' ? vagaA :
                                                                s.estado === 'O' ? vagaO :
                                                                    s.estado === 'M' ? vagaM : null
                                                    }
                                                    className={style.vaga}
                                                />
                                            ) : (
                                                <Image
                                                    key={s.id}
                                                    src={
                                                        s.estado === 'D' ? vagaD :
                                                            s.estado === 'A' ? vagaA :
                                                                s.estado === 'O' ? vagaO :
                                                                    s.estado === 'M' ? vagaM : null
                                                    }
                                                    className={style.vaga}
                                                />
                                            )
                                        )
                                    ))}
                            </div>
                        </Card>
                    </Container>
                </Card>
            </Container>
            <ToastContainer
                position="bottom-right"
                autoClose={2000}
                hideProgressBar={true}
            />
            <ModalConfirmacao
                quem={"Detalha-Rua"}
                exibir={exibirModal}
                lidarFechar={lidarFecharModal}
                lidarConfirmar={lidarConfirmar}
                estadoNovo={estadoSensor}
            />
        </Pagina>
    );
}