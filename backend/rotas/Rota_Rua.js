import { Router } from 'express';
import Controle_Rua from "../controle/Controle_Rua.js";

const ruaControle = new Controle_Rua();
const rota = Router();

rota
.get("/", ruaControle.consultar)
.get("/:rua_id", ruaControle.consultar)
.put("/:rua_id/:rua_estado", ruaControle.atualizar);

export default rota;