import { Router } from 'express';
import Controle_Sensor from "../controle/Controle_Sensor.js";

const sensorControle = new Controle_Sensor();
const rota = Router();

rota
.get("/", sensorControle.consultar)
.get("/:rua_id", sensorControle.consultar)
.put("/:sen_id/:sen_estado", sensorControle.atualizarESP)

export default rota;