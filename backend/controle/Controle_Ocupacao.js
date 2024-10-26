import Ocupacao from "../modelo/Ocupacao.js"
import { format } from 'date-fns';

export default class Controle_Ocupacao {
    gravarESP(req, res) {
        if (req.method.toUpperCase() == 'POST') {
            const dataLocal = new Date();
            const dtInicio = format(dataLocal, 'yyyy-MM-dd HH:mm:ss');
            const idSensor = req.params.sen_id;

            if (dtInicio &&
                idSensor && !isNaN(parseInt(idSensor)) && idSensor > 0) {
                const ocupacao = new Ocupacao(0, dtInicio, "", 0, idSensor);
                ocupacao.gravarESP()
                .then(() => {
                    res.status(200).send("OK:"+ocupacao.id.toString());
                })
                .catch((erro) => {
                    console.error(erro);
                    res.status(500).send(erro);
                });
            }
            else {
                res.status(400).send("Dados inválidos: 'id'="+id+" é obrigatório.");
            }
        }
        else {
            res.status(405).send("Método inválido! Apenas POST é permitido.");
        }
    }

    atualizarESP(req, res) {
        if (req.method.toUpperCase() === 'PUT') {
            const idOcupacao = req.params.ocp_id;
            if (idOcupacao && !isNaN(parseInt(idOcupacao)) && idOcupacao > 0) {
                fetch('http://192.168.177.229:5000/api/ocupacoes/' + idOcupacao, {
                    method: "GET",
                    headers: { "Content-Type": "application/json" }
                })
                .then((res) => {
                    return res.json();
                })
                .then((resJSON) => {
                    const dtInicio = resJSON.dtInicio;
                    if (!dtInicio)
                        res.status(500).send("Data de Início veio vazia!");
                    else {
                        const dataLocal = new Date();
                        const dtFim = format(dataLocal, 'yyyy-MM-dd HH:mm:ss');
                        if (dtFim) {
                            const inicio = new Date(dtInicio);
                            const fim = new Date(dtFim);

                            let tempo = fim - inicio;
                            tempo = Math.floor(tempo / (1000 * 60)); // Converte para minutos

                            const ocupacao = new Ocupacao(idOcupacao, "", dtFim, tempo, 0);
                            ocupacao.atualizarESP()
                            .then(() => {
                                res.status(200).send("Ocupacao Atualizada");
                            })
                            .catch((erro) => {
                                res.status(500).send(""+erro.message);
                            });
                        }
                        else {
                            res.status(400).send("Erro: Data Fim inválida!");
                        }
                    }
                })
                .catch((erro) => {
                    res.status(400).send(erro.message+"");
                });
            }
            else {
                res.status(400).send("Dados inválidos: 'id'="+idOcupacao+" é obrigatório.");
            }
        }
        else {
            res.status(405).send("Método inválido! Apenas PUT é permitido.");
        }
    }

    consultar(req, res) {
        res.type("application/json");
        if (req.method === "GET") {
            const termo = req.params.ocp_id;
            const ocupacao = new Ocupacao();
            ocupacao.consultar(termo)
            .then((resJSON) => {
                if (resJSON.dtInicio)
                    resJSON.dtInicio = format(new Date(resJSON.dtInicio), 'yyyy-MM-dd HH:mm:ss');
                res.status(200).json(resJSON);
            })
            .catch((erro) => {
                res.status(500).json({
                    "status": false,
                    "mensagem": "Erro ao consultar ocupacao: " + erro.message
                });
            });
        } else {
            res.status(400).json({
                "status": false,
                "mensagem": "Requisição inválida! Método não é GET"
            });
        }
    }
}