import { Router } from 'express';
import Controle_Ocupacao from "../controle/Controle_Ocupacao.js";

const ocupacaoControle = new Controle_Ocupacao();
const rota = Router();

rota.get("/", ocupacaoControle.consultar)

export default rota;