import { Router } from 'express';
import Controle_Relatorio from "../controle/Controle_Relatorio.js";

const relatorioControle = new Controle_Relatorio();
const rota = Router();

rota
.get("/:tipo/:rua/:dtInicio/:dtFim", relatorioControle.consultar)
.get("/", relatorioControle.consultar);

export default rota;