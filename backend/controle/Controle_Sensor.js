import Sensor from "../modelo/Sensor.js"

export default class Controle_Sensor{
    consultar(req, res){
        res.type("application/json");
        if (req.method == "GET") {
            const termo = req.params.rua_id;
            const sensor = new Sensor();
            sensor.consultar(termo)
            .then((listaSensores) => {
                res.status(200).json(listaSensores);
            })
            .catch((erro) => {
                res.status(500).json({
                    "status": false,
                    "mensagem": "Erro ao consultar sensores: " + erro.message
                });
            });
        }
        else {
            res.status(400).json({
                "status": false,
                "mensagem": "Requisição inválida!, Metodo não é GET"
            });
        }
    }

    atualizar(req, res) {
        if (req.method === "PATCH") {
            const id = req.params.sen_id;
            const estado = req.params.sen_estado;
            if (id && !isNaN(parseInt(id)) && estado) {
                const sensor = new Sensor(id, estado, "", "");
                sensor.atualizarESP()
                .then(() => {
                    req.io.emit("Estado Atualizado");
                    res.status(200).send("Estado Atualizado");
                })
                .catch((erro) => {
                    res.status(500).send(erro);
                });                    
            }
            else {
                res.status(400).send("Dados invalidos: 'id'="+id+" e 'estado'="+estado+" sao obrigatorios.");
            }
        } else {
            res.status(405).send("Metodo invalido, Apenas PUT e permitido.");
        }
    } 

    atualizarESP(req, res) {
        if (req.method.toUpperCase() === "PUT") {
            const id = req.params.sen_id;
            const estado = req.params.sen_estado;
            if (id && !isNaN(parseInt(id)) && estado) {
                const sensor = new Sensor(id, estado, "", "");
                sensor.buscarSensor()
                .then((resposta)=>{
                    if(resposta && resposta.estado!='M'){
                        sensor.atualizarESP()
                        .then(() => {
                            req.io.emit("Estado Atualizado");
                            res.status(200).send("Estado Atualizado");
                        })
                        .catch((erro) => {
                            res.status(500).send(erro);
                        });
                    }
                    else{
                        res.status(402).send("Sensor em Manutenção !!!, Req Invalida");        
                    }
                })
                .catch((erro) => {
                    res.status(500).send(erro);
                });
            }
            else {
                res.status(400).send("Dados invalidos: 'id'="+id+" e 'estado'="+estado+" sao obrigatorios.");
            }
        } else {
            res.status(405).send("Metodo invalido, Apenas PUT e permitido.");
        }
    } 
}