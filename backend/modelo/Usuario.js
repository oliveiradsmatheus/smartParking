import DAO_Usuario from "../persistencia/DAO_Usuario.js";

export default class Usuario {
    #nick; #nome; #email; #senha;
    constructor(nick="", nome="", email="", senha=""){
        this.#nick = nick;
        this.#nome = nome;
        this.#email = email;
        this.#senha = senha;
    }

    get nick() {return this.#nick;}
    get nome() {return this.#nome;}
    get email() {return this.#email;}
    get senha() {return this.#senha;}

    set nick(novoNick) {this.#nick = novoNick;}
    set nome(novoNome) {this.#nome = novoNome;}
    set email(novoEmail) {this.#email = novoEmail;}
    set senha(novaSenha) {this.#senha = novaSenha;}

    async consultar(termo) {
        const usuarioDAO = new DAO_Usuario();
        return await usuarioDAO.consultar(termo);
    }
}