import conectar from './Conexao.js';
import Rua from '../modelo/Rua.js';

export default class DAO_Rua {
    async consultar(termo) {
        const conexao = await conectar(); // Conecte-se ao banco de dados
        let sql = "SELECT * FROM rua";
        let parametros = [];
        if(termo){
            sql += " WHERE rua_id = ?";
            parametros=[termo];
        }
        const [dataBase, campos] = await conexao.execute(sql,parametros); // Execute a consulta
        await conexao.release();
        let listaRuas = []; // Inicialize a listaRuas corretamente
        for (const l of dataBase) {
            const rua = {
                id: l.rua_id,
                nome: l.rua_nome,
                bairro: l.rua_bairro,
                cidade: l.rua_cidade,
                uf: l.rua_uf,
                qtdVagas: l.rua_qtdVagas,
                estado: l.rua_estado
            };
            listaRuas.push(rua); // Adicione à listaRuas
        }
        return listaRuas; // Retorne a listaRuas como resposta
    }

    async atualizar(rua){
        if(rua instanceof Rua){
            const conexao = await conectar();
            const sql = "UPDATE rua SET rua_estado=? WHERE rua_id=?";
            const parametros = [rua.estado, rua.id];
            await conexao.execute(sql,parametros);
            await conexao.release();
        }
    }
}