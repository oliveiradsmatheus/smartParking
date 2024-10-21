import { Router } from 'express';
import Controle_Rua from "../controle/Controle_Rua.js";

const ruaControle = new Controle_Rua();
const rota = Router();

rota.get("/", ruaControle.consultar)

export default rota;