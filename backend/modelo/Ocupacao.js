import DAO_Ocupacao from "../persistencia/DAO_Ocupacao.js";

export default class Ocupacao{
    #id;
    #dtInicio;
    #dtFim;
    #tempo;
    #idSensor;
    
    constructor(id=0,dtInicio="",dtFim="",tempo=0,idSensor=0){
        this.#id=id;
        this.#dtInicio=dtInicio;
        this.#dtFim=dtFim;
        this.#tempo=tempo;
        this.#idSensor=idSensor;
    }
    
    get id() { return this.#id; }
    get dtInicio() { return this.#dtInicio; }
    get dtFim() { return this.#dtFim; }
    get tempo() { return this.#tempo; }
    get idSensor() { return this.#idSensor; }

    set id(novoId) { this.#id = novoId; }
    set dtInicio(novoDtInicio) { this.#dtInicio = novoDtInicio; }
    set dtFim(novoDtFim) { this.#dtFim = novoDtFim; }
    set tempo(novoTempo) { this.#tempo = novoTempo; }
    set idSensor(novoIdSensor) { this.#idSensor = novoIdSensor; }

    async gravarESP(){
        const ruaDAO = new DAO_Ocupacao();
        await ruaDAO.gravarESP(this);
    }

    async atualizarESP(){
        const ruaDAO = new DAO_Ocupacao();
        await ruaDAO.atualizarESP(this);
    }

    async consultar(termo){
        const ruaDAO = new DAO_Ocupacao();
        return await ruaDAO.consultar(termo);
    }
}