import { Router } from "express";
import Controle_Usuario from "../controle/Controle_Usuario.js";

const usuarioControle = new Controle_Usuario();
const rota = Router();

rota.get("/:nick", usuarioControle.consultar)

export default rota;