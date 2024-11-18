import Sensor from '../modelo/Sensor.js';
import conectar from './Conexao.js';

export default class DAO_Sensor {
    async consultar(termo) {
        const conexao = await conectar(); // Conecte-se ao banco de dados
        let sql = "SELECT * FROM sensor";
        let parametros = [];
        if(termo){
            sql += " WHERE rua_id LIKE ?";
            parametros.push(`%${termo}%`);
        }
        sql += " ORDER BY sen_ladoPos";
        const [dataBase, campos] = await conexao.execute(sql, parametros); // Execute a consulta
        await conexao.release();
        let listaSensores = [];
        for (const l of dataBase) {
            const sensor = {
                id: l.sen_id,
                estado: l.sen_estado,
                ladoPos: l.sen_ladoPos
            };
            listaSensores.push(sensor); // Adicione à listaSensores
        }
        return listaSensores; // Retorne a listaSensores como resposta
    }
    
    async buscarSensor(sensor) {
        if(sensor instanceof Sensor){
            const conexao = await conectar(); // Conecte-se ao banco de dados
            let sql = "SELECT * FROM sensor WHERE sen_id=?";
            let parametros = [sensor.id];
            const [dataBase, campos] = await conexao.execute(sql, parametros); // Execute a consulta
            await conexao.release();
            return { estado: dataBase[0].sen_estado }
        }
        return null;
    }

    async atualizarESP(sensor){
        if(sensor instanceof Sensor){
            const conexao = await conectar();
            const sql = `UPDATE sensor SET sen_estado=? WHERE sen_id=?`;
            const parametros = [sensor.estado, sensor.id];
            await conexao.execute(sql,parametros);
            await conexao.release();
        }
    }
}