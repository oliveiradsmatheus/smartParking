import Rua from "../modelo/Rua.js"

export default class Controle_Rua{
    consultar(req, res)
    {
        res.type("application/json");
        if (req.method == "GET") {
            const rua = new Rua();
            rua.consultar()
            .then((listaRuas) => {
                res.status(200).json(listaRuas);
            })
            .catch((erro) => {
                res.status(500).json({
                    "status": false,
                    "mensagem": "Erro ao consultar ruas: " + erro.message
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