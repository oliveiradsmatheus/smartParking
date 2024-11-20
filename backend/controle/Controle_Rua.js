import Rua from "../modelo/Rua.js"

export default class Controle_Rua{
    consultar(req, res)
    {
        res.type("application/json");
        if (req.method == "GET") {
            const termo = req.params.rua_id;
            const rua = new Rua();
            rua.consultar(termo)
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

    atualizar(req, res)
    {
        res.type("application/json");
        if ((req.method == 'PUT' || req.method == 'PATCH')){
            const id = req.params.rua_id;
            const estado = req.params.rua_estado;
            if (id && estado)
            {
                const rua = new Rua();
                rua.id = id;
                rua.estado = estado;
                rua.atualizar()
                .then(()=>{
                    res.status(200).json({
                        "status":true,
                        "mensagem":"Rua atualizada com sucesso!",
                    });
                })
                .catch((erro)=>{
                    res.status(500).json({
                        "status":false,
                        "mensagem":"Erro ao atualizar o rua: " + erro.message
                    });
                });
            }
            else {
                res.status(400).json({
                    "status":false,
                    "mensagem":"Erro: informações invalidas!"
                });
            }
        }
        else {
            res.status(400).json({
                "status":false,
                "mensagem":"Requisição inválida!, Metodo não é PUT ou PATCH"
            });
        }
    };
}