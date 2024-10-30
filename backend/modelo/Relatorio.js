import DAO_Relatorio from "../persistencia/DAO_Relatorio.js";

export default class Relatorio{
    #rua;
    #dtInicio;
    #dtFim;
    
    constructor(rua="",dtInicio="",dtFim=""){
        this.#rua=rua;
        this.#dtInicio=dtInicio;
        this.#dtFim=dtFim;
    }
    
    get rua() { return this.#rua; }
    get dtInicio() { return this.#dtInicio; }
    get dtFim() { return this.#dtFim; }

    set rua(novoRua) { this.#rua = novoRua; }
    set dtInicio(novoDtInicio) { this.#dtInicio = novoDtInicio; }
    set dtFim(novoDtFim) { this.#dtFim = novoDtFim; }

    async picoMax(){
        const relatorioDAO = new DAO_Relatorio();
        return await relatorioDAO.picoMax(this);
    }

    async picoMin(){
        const relatorioDAO = new DAO_Relatorio();
        return await relatorioDAO.picoMin(this);
    }

    async tempoMedio(){
        const relatorioDAO = new DAO_Relatorio();
        return await relatorioDAO.tempoMedio(this);
    }
}