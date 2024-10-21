import Sensor from "../modelo/Sensor.js"

export default class Controle_Sensor{
    consultar(req, res)
    {
        res.type("application/json");
        if (req.method == "GET") {
            const termo = req.params.cod_rua;
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
}