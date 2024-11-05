import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import http from 'http';
import { Server } from 'socket.io';
import rotaRuas from './rotas/Rota_Rua.js'
import rotaSensores from './rotas/Rota_Sensor.js'
import rotaOcupacoes from './rotas/Rota_Ocupacao.js'
import rotaRelatorios from './rotas/Rota_Relatorio.js'
import rotaUsuarios from './rotas/Rota_Usuario.js'
import conectar from './persistencia/Conexao.js';

const app = express();
dotenv.config();
const host = process.env.IP;
const porta = 5000;

//########## MIDDLEWARE e CORS ##########//
app.use(express.json());
app.use(cors({
    origin: "*",
    "Access-Control-Allow-Origin": "*"
}));

//########## ROTAS ##########//
app.use((req, res, next) => {
    req.io = io;
    next();
})
app.use('/ruas', rotaRuas);
app.use('/sensores', rotaSensores);
app.use('/ocupacoes', rotaOcupacoes);
app.use('/relatorios', rotaRelatorios);
app.use('/usuarios', rotaUsuarios);
app.get('/', (req, res) => {
    res.send("Servidor Escutando !!!");
})

//########## SERVIDOR ##########//
const server = http.createServer(app);
const io = new Server(server, {
    cors: {
        origin: "http://localhost:3000",
        methods: ["PUT"],
    },
});

io.on('connection', () => {
    io.emit("Servidor Escutando !!!");
})
server.listen(porta, host, () => {
    console.log(`Servidor escutando em http://${host}:${porta}`)
});

//########## BANCO DE DADOS ##########//
(async () => {
    try {
        const conexao = await conectar();
        let sql = `
            CREATE TABLE IF NOT EXISTS rua (
                rua_id VARCHAR(50) NOT NULL,
                rua_nome VARCHAR(100) NOT NULL,
                rua_bairro VARCHAR(50) NOT NULL,
                rua_cidade VARCHAR(50) NOT NULL,
                rua_uf CHAR(2) NOT NULL,
                rua_qtdVagas INT NULL,
                CONSTRAINT pk_rua PRIMARY KEY (rua_id)
            )
        `;
        await conexao.execute(sql);
        sql = `
            CREATE TABLE IF NOT EXISTS sensor (
                sen_id INT NOT NULL AUTO_INCREMENT,
                sen_estado ENUM("D", "A", "O", "M") NOT NULL,
                sen_ladoPos CHAR(2) NOT NULL,
                rua_id VARCHAR(50) NOT NULL,
                CONSTRAINT pk_sensor PRIMARY KEY (sen_id),
                CONSTRAINT fk_sensor_rua
                    FOREIGN KEY (rua_id) REFERENCES rua (rua_id)
                        ON DELETE NO ACTION ON UPDATE NO ACTION
            )
        `;
        await conexao.execute(sql);
        sql = `
            CREATE TABLE IF NOT EXISTS ocupacao (
                ocp_id INT NOT NULL AUTO_INCREMENT,
                ocp_dtInicio DATETIME NOT NULL,
                ocp_dtFim DATETIME NULL,
                ocp_tempo INT NULL,
                sen_id INT NOT NULL,
                CONSTRAINT pk_ocupacao PRIMARY KEY (ocp_id, sen_id),
                CONSTRAINT fk_ocupacao_sensor
                    FOREIGN KEY (sen_id) REFERENCES sensor (sen_id)
                        ON DELETE NO ACTION ON UPDATE NO ACTION
            )
        `;
        await conexao.execute(sql);
        sql = `
            CREATE TABLE IF NOT EXISTS usuario (
                usu_id INT NOT NULL AUTO_INCREMENT,
                usu_nick VARCHAR(45) NOT NULL,
                usu_nome VARCHAR(100) NOT NULL,
                usu_email VARCHAR(100) NOT NULL,
                usu_senha VARCHAR(100) NOT NULL,
                CONSTRAINT pk_usuario PRIMARY KEY (usu_id),
                CONSTRAINT uk_usuario UNIQUE (usu_email, usu_nome)
            )
        `;
        await conexao.execute(sql);
        await conexao.release();
        console.log("Tabelas Criadas com Sucesso !!!");
    }
    catch (erro) {
        console.error('Erro ao Criar Tabelas:  ', erro);
    }
})();