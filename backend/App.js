import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import rotaRuas from './rotas/Rota_Rua.js'
import rotaSensores from './rotas/Rota_Sensor.js'
import rotaOcupacoes from './rotas/Rota_Ocupacao.js'

const host = "192.168.177.229"; //192.168.177.229
const porta = 5000;
const app = express();
dotenv.config();

//########## MIDDLEWARE e CORS ##########//
app.use(express.json());
app.use(cors({
    origin:"*",
    "Access-Control-Allow-Origin":"*"
}));
    
//########## ROTAS ##########//
app.use('/api/ruas', rotaRuas);
app.use('/api/sensores', rotaSensores);
app.use('/api/ocupacoes', rotaOcupacoes);

//########## SERVIDOR ##########//
app.get('/api', (req, res) =>{
    res.send("Servidor Escutando !!!");
})
app.listen(porta, host, () => {
    console.log(`Servidor escutando em http://${host}:${porta}`)
});