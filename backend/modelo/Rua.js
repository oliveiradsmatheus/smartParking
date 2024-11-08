import DAO_Rua from "../persistencia/DAO_Rua.js";

export default class Categoria{
    #id;
    #nome;
    #bairro;
    #cidade;
    #uf;
    #qtdVagas;
    #estado;
    
    constructor(id="",nome="",bairro="",cidade="",uf="",qtdVagas="",estado=""){
        this.#id=id;
        this.#nome=nome;
        this.#bairro=bairro;
        this.#cidade=cidade;
        this.#uf=uf;
        this.#qtdVagas=qtdVagas;
        this.#estado=estado;
    }
    
    get id() { return this.#id; }
    get nome() { return this.#nome; }
    get bairro() { return this.#bairro; }
    get cidade() { return this.#cidade; }
    get uf() { return this.#uf; }
    get qtdVagas() { return this.#qtdVagas; }
    get estado() { return this.#estado; }

    set id(novoId) { this.#id = novoId; }
    set nome(novoNome) { this.#nome = novoNome; }
    set bairro(novoBairro) { this.#bairro = novoBairro; }
    set cidade(novoCidade) { this.#cidade = novoCidade; }
    set uf(novoUf) { this.#uf = novoUf; }
    set qtdVagas(novoQtdVagas) { this.#qtdVagas = novoQtdVagas; }
    set estado(estado) { this.#estado = estado; }

    async consultar(termo){
        const ruaDAO = new DAO_Rua();
        return await ruaDAO.consultar(termo);
    }

    async atualizar(){
        const ruaDAO = new DAO_Rua();
        return await ruaDAO.atualizar(this);
    }

}