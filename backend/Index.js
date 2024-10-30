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

const host = "localhost"; //192.168.177.229
const porta = 5000;
const app = express();
dotenv.config();

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
app.use('/api/ruas', rotaRuas);
app.use('/api/sensores', rotaSensores);
app.use('/api/ocupacoes', rotaOcupacoes);
app.use('/api/relatorios', rotaRelatorios);
app.use('/api/usuarios', rotaUsuarios);
app.get('/api', (req, res) => {
    res.send("Servidor Escutando !!!");
})

//########## SERVIDOR ##########//
const server = http.createServer(app);
const io = new Server(server, {
    cors: {
        origin: "http://localhost:3000",
        methods: ["GET", "PUT", "POST"],
    },
});

io.on('connection', () => {
    console.log('Novo cliente conectado!');

})
server.listen(porta, host, () => {
    console.log(`Servidor escutando em http://${host}:${porta}`)
});