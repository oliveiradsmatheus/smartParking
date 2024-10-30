import conectar from "./Conexao.js"

export default class DAO_Usuario{
    async consultar(termo){
        const conexao = await conectar();
        const sql = `SELECT * FROM usuario WHERE usu_nick = ?`;
        const parametros = [termo];
        const [dataBase, campos] = await conexao.execute(sql,parametros);
        await conexao.release();

        return dataBase[0];
    }
}
