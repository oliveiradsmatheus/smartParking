import DAO_Rua from "../persistencia/DAO_Rua.js";

export default class Categoria{
    #id;
    #nome;
    #qtdVagas
    
    constructor(id="",nome="",qtdVagas=""){
        this.#id=id;
        this.#nome=nome;
        this.#qtdVagas=qtdVagas;
    }
    
    get id() { return this.#id; }
    get nome() { return this.#nome; }
    get qtdVagas() { return this.#qtdVagas; }

    set id(novoId) { this.#id = novoId; }
    set nome(novoNome) { this.#nome = novoNome; }
    set qtdVagas(novoQtdVagas) { this.#qtdVagas = novoQtdVagas; }

    async consultar(){
        const ruaDAO = new DAO_Rua();
        return await ruaDAO.consultar();
    }

}