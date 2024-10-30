import { Router } from 'express';
import Controle_Ocupacao from "../controle/Controle_Ocupacao.js";

const ocupacaoControle = new Controle_Ocupacao();
const rota = Router();

rota
.get("/:ocp_id", ocupacaoControle.consultar)
.post("/:sen_id", ocupacaoControle.gravarESP)
.put("/:ocp_id", ocupacaoControle.atualizarESP);

export default rota;