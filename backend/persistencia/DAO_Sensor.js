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
        const [dataBase, campos] = await conexao.execute(sql, parametros); // Execute a consulta
        await conexao.release();
        let listaSensores = [];
        for (const l of dataBase) {
            const sensor = {
                id: l.sen_id,
                estado: l.sen_estado,
                idRua: l.rua_id
            };
            listaSensores.push(sensor); // Adicione à listaSensores
        }
        return listaSensores; // Retorne a listaSensores como resposta
    }
}