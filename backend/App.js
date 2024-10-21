import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import rotaRuas from './persistencia/Rota_Rua.js'
import rotaSensores from './persistencia/Rota_Sensor.js'

const host = "localhost";
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

//########## SERVIDOR ##########//
app.listen(porta, host, () => {
    console.log(`Servidor escutando em http://${host}:${porta}`)
});