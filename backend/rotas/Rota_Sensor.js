import { Router } from 'express';
import Controle_Sensor from "../controle/Controle_Sensor.js";

const sensorControle = new Controle_Sensor();
const rota = Router();

rota
.get("/", (req, res) => sensorControle.consultar(req, res))
.get("/:rua_id", (req, res) => sensorControle.consultar(req, res))
.patch("/:sen_id/:sen_estado", (req, res) => sensorControle.atualizar(req, res))
.put("/:sen_id/:sen_estado", (req, res) => sensorControle.atualizarESP(req, res));

export default rota;
