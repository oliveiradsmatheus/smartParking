import DAO_Rua from "../persistencia/DAO_Rua.js";

export default class Categoria{
    #id;
    #nome;
    #bairro;
    #cidade;
    #uf;
    #qtdVagas
    
    constructor(id="",nome="",bairro="",cidade="",uf="",qtdVagas=""){
        this.#id=id;
        this.#nome=nome;
        this.#bairro=bairro;
        this.#cidade=cidade;
        this.#uf=uf;
        this.#qtdVagas=qtdVagas;
    }
    
    get id() { return this.#id; }
    get nome() { return this.#nome; }
    get bairro() { return this.#bairro; }
    get cidade() { return this.#cidade; }
    get uf() { return this.#uf; }
    get qtdVagas() { return this.#qtdVagas; }

    set id(novoId) { this.#id = novoId; }
    set nome(novoNome) { this.#nome = novoNome; }
    set bairro(novoBairro) { this.#bairro = novoBairro; }
    set cidade(novoCidade) { this.#cidade = novoCidade; }
    set uf(novoUf) { this.#uf = novoUf; }
    set qtdVagas(novoQtdVagas) { this.#qtdVagas = novoQtdVagas; }

    async consultar(termo){
        const ruaDAO = new DAO_Rua();
        return await ruaDAO.consultar(termo);
    }

}