import conectar from './Conexao.js';

export default class DAO_Rua {
    async consultar() {
        const conexao = await conectar(); // Conecte-se ao banco de dados
        const sql = "SELECT * FROM rua";
        const [dataBase, campos] = await conexao.execute(sql); // Execute a consulta
        await conexao.release();
        let listaRuas = []; // Inicialize a listaRuas corretamente
        for (const l of dataBase) {
            const rua = {
                id: l.rua_id,
                nome: l.rua_nome,
                qtdVagas: l.rua_qtdVagas
            };
            listaRuas.push(rua); // Adicione à listaRuas
        }
        return listaRuas; // Retorne a listaRuas como resposta
    }
}