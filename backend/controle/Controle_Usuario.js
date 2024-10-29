import Usuario from "../modelo/Usuario.js"

export default class Controle_Usuario{
    consultar(req, res)
    {
        res.type("application/json");
        if (req.method=="GET")
        {
            const nick = req.params.nick;
            if (nick)
            {
                const usuario = new Usuario();
                usuario.consultar(nick)
                .then((usuario) =>{
                    res.status(200).json(usuario);
                })
                .catch((erro) => {
                    res.status(500).json({
                        "status":false,
                        "mensagem":"Erro ao consultar usuario: " + erro.message    
                    });
                });
            }
            else {
                res.status(400).json({
                    "status":false,
                    "mensagem":"Consulta Invalida!, informe um nome valido!"
                });
            }
        }
        else {
            res.status(405).json({
                "status":false,
                "mensagem":"Requisição inválida!, Metodo não é GET"
            });
        }    
    }
}