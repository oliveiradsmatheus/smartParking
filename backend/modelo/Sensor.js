import DAO_Sensor from "../persistencia/DAO_Sensor.js";

export default class Sensor{
    #id;
    #estado;
    #ladoPos;
    #idRua
    
    constructor(id=0,estado="",ladoPos="",idRua=""){
        this.#id=id;
        this.#estado=estado;
        this.#ladoPos=ladoPos;
        this.#idRua=idRua;
    }
    
    get id() { return this.#id; }
    get estado() { return this.#estado; }
    get ladoPos() { return this.#ladoPos; }
    get idRua() { return this.#idRua; }

    set id(novoId) { this.#id = novoId; }
    set estado(novoEstado) { this.#estado = novoEstado; }
    set ladoPos(novoLadoPos) { this.#ladoPos = novoLadoPos; }
    set idRua(novoIdRua) { this.#idRua = novoIdRua; }

    async consultar(termo){
        const sensorDAO = new DAO_Sensor();
        return await sensorDAO.consultar(termo);
    }

    async atualizarESP(){
        const sensorDAO = new DAO_Sensor();
        await sensorDAO.atualizarESP(this);
    }
}