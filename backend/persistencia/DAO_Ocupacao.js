import Ocupacao from '../modelo/Ocupacao.js';
import conectar from './Conexao.js';

export default class DAO_Ocupacao {
    async gravarESP(ocupacao){
        if(ocupacao instanceof Ocupacao){
            const conexao = await conectar();
            const sql = `
                INSERT INTO ocupacao (ocp_dtInicio, sen_id)
                values(?,?)
            `;
            let parametros = [
                ocupacao.dtInicio,
                ocupacao.idSensor,
            ];
            const resultado = await conexao.execute(sql,parametros);
            ocupacao.id = resultado[0].insertId;
            await conexao.release();
        }
    }

    async atualizarESP(ocupacao){
        if(ocupacao instanceof Ocupacao){
            const conexao = await conectar();
            const sql = `
                UPDATE ocupacao SET ocp_dtFim=?, ocp_tempo=? 
                WHERE ocp_id = ?
            `;
            let parametros = [
                ocupacao.dtFim,
                ocupacao.tempo,
                ocupacao.id
            ];
            await conexao.execute(sql,parametros);
            await conexao.release();
        }
    }

    async consultar(termo) {
        const conexao = await conectar();
        let sql = "SELECT ocp_dtInicio FROM ocupacao WHERE ocp_id = ?";
        let parametros = [termo];
        const [dataBase, campos] = await conexao.execute(sql, parametros);
        return { dtInicio: dataBase[0].ocp_dtInicio };
    }   
}