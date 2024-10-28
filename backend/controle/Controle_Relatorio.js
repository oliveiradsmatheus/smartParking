import Relatorio from "../modelo/Relatorio.js";

export default class Controle_Relatorio {
    consultar(req, res) {
        res.type("application/json");
        if (req.method === 'GET') {
            const tipo = req.query.tipo;  // query para o axios e params para o fetch normal
            if (tipo === '1' || tipo === '2' || tipo === '3') {
                const rua = req.query.rua;
                const dtInicio = req.query.dtInicio;
                const dtFim = req.query.dtFim;
                if (rua) {
                    if ((dtInicio && dtFim) || (dtInicio && !dtFim) || (!dtInicio && dtFim)) {
                        const relatorio = new Relatorio(rua, dtInicio, dtFim);
                        switch(tipo){
                            case '1':
                                relatorio.picoMax()
                                .then((resposta) => {
                                    return res.status(200).json(resposta);
                                })
                                .catch((erro) => {
                                    return res.status(500).json({
                                        "status": false,
                                        "mensagem": "Erro ao consultar relatório: " + erro.message
                                    });
                                });
                                break;
                            
                            case '2':
                                relatorio.picoMin()
                                .then((resposta) => {
                                    return res.status(200).json(resposta);
                                })
                                .catch((erro) => {
                                    return res.status(500).json({
                                        "status": false,
                                        "mensagem": "Erro ao consultar relatório: " + erro.message
                                    });
                                });
                                break;

                            case '3':
                                relatorio.tempoMedio()
                                .then((resposta) => {
                                    return res.status(200).json(resposta);
                                })
                                .catch((erro) => {
                                    return res.status(500).json({
                                        "status": false,
                                        "mensagem": "Erro ao consultar relatório: " + erro.message
                                    });
                                });
                                break;
                        }
                    }
                    else {
                        return res.status(400).json({
                            "status": false,
                            "mensagem": `Dados inválidos: 'dtInicio'=${dtInicio} 'dtFim'=${dtFim}`
                        });
                    }
                }
                else {
                    return res.status(400).json({
                        "status": false,
                        "mensagem": `Dados inválidos: 'rua'=${rua}`
                    });
                }
            }
            else {
                return res.status(400).json({
                    "status": false,
                    "mensagem": "Nenhum método de relatório selecionado!",
                });
            }
        }
        else {
            return res.status(405).json({
                "status": false,
                "mensagem": "Método inválido! Apenas GET é permitido."
            });
        }
    }
}