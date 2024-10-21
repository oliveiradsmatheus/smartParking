import DAO_Sensor from "../persistencia/DAO_Sensor.js";

export default class Sensor{
    #id;
    #estado;
    #idRua
    
    constructor(id=0,estado="",idRua=""){
        this.#id=id;
        this.#estado=estado;
        this.#idRua=idRua;
    }
    
    get id() { return this.#id; }
    get estado() { return this.#estado; }
    get idRua() { return this.#idRua; }

    set id(novoId) { this.#id = novoId; }
    set estado(novoEstado) { this.#estado = novoEstado; }
    set idRua(novoIdRua) { this.#idRua = novoIdRua; }

    async consultar(termo){
        const sensorDAO = new DAO_Sensor();
        return await sensorDAO.consultar(termo);
    }

}