import Usuario from "../modelo/Usuario.js"
import jsonwebtoken from 'jsonwebtoken';

export default class Controle_Usuario {
    consultar(req, res) {
        res.type("application/json");
        if (req.method == "POST") {
            const { nick, senha } = req.body;
            if (nick && senha) {
                const usuario = new Usuario();
                usuario.consultar(nick)
                    .then((usuario) => {
                        if (usuario && usuario.usu_senha === senha) {
                            const token = jsonwebtoken.sign(
                                { id: usuario.usu_id, nick: usuario.usu_nick },
                                process.env.JWT_SECRET,
                                { expiresIn: '1h' }
                            );

                            // Responder com o token e dados do usuário
                            res.status(200).json({
                                status: true,
                                token: token,
                                mensagem: "Autenticação bem-sucedida!",
                            });
                        } else {
                            res.status(401).json({
                                status: false,
                                mensagem: "Usuário ou senha incorretos!"
                            });
                        }
                    })
                    .catch((erro) => {
                        res.status(500).json({
                            "status": false,
                            "mensagem": "Erro ao consultar usuario: " + erro.message
                        });
                    });
            }
            else {
                res.status(400).json({
                    "status": false,
                    "mensagem": "Consulta Invalida!, informe um nome valido!"
                });
            }
        }
        else {
            res.status(405).json({
                "status": false,
                "mensagem": "Requisição inválida!, Metodo não é GET"
            });
        }
    }
}