import conectar from "./Conexao.js";
import Relatorio from "../modelo/Relatorio.js"

export default class DAO_Relatorio{
    async picoMax(relatorio) {
        if(relatorio instanceof Relatorio){
            const conexao = await conectar();
            let sql = `
                SELECT 
                    rua_nome AS rua,
                    SUM(hora_pico * total_ocupacoes) / SUM(total_ocupacoes) AS picoMax
                FROM (
                    SELECT 
                        r.rua_nome,
                        HOUR(o.ocp_dtInicio) AS hora_pico,
                        COUNT(o.ocp_id) AS total_ocupacoes
                    FROM 
                        ocupacao o
                    JOIN 
                        sensor s ON o.sen_id = s.sen_id
                    JOIN 
                        rua r ON s.rua_id = r.rua_id
                    WHERE 
                        r.rua_id = ?
            `;
            let parametros = [relatorio.rua];
            if(relatorio.dtInicio){
                sql += " AND o.ocp_dtInicio >= ?";
                parametros.push(relatorio.dtInicio);
            }
            if(relatorio.dtFim){
                sql += " AND o.ocp_dtInicio <= ?";
                parametros.push(relatorio.dtFim);
            }
            sql+= `
                    GROUP BY
                        r.rua_nome, HOUR(o.ocp_dtInicio)
                ) AS ocupacoes_por_hora
            `
            const [dataBase, campos] = await conexao.execute(sql, parametros);
            await conexao.release();
            return dataBase[0];
        }
    }
    
    async picoMin(relatorio) {
        if(relatorio instanceof Relatorio){
            const conexao = await conectar();
            let parametros = [relatorio.rua];
            let sql = `
                SELECT 
                    rua_nome AS rua,
                    SUM(hora_pico * total_ocupacoes) / NULLIF(SUM(total_ocupacoes), 0) AS picoMin
                FROM (
                    SELECT 
                        r.rua_nome,
                        HOUR(o.ocp_dtInicio) AS hora_pico,
                        COUNT(o.ocp_id) AS total_ocupacoes
                    FROM 
                        ocupacao o
                    JOIN 
                        sensor s ON o.sen_id = s.sen_id
                    JOIN 
                        rua r ON s.rua_id = r.rua_id
                    WHERE 
                        r.rua_id = ?
            `;
            if(relatorio.dtInicio){
                sql += " AND o.ocp_dtInicio >= ?";
                parametros.push(relatorio.dtInicio);
            }
            if(relatorio.dtFim){
                sql += " AND o.ocp_dtInicio <= ?";
                parametros.push(relatorio.dtFim);
            }
            sql+= `
                    GROUP BY 
                        r.rua_nome, HOUR(o.ocp_dtInicio)
                ) AS ocupacoes_por_hora
                WHERE total_ocupacoes = (
                    SELECT MIN(total_ocupacoes)
                    FROM (
                        SELECT 
                            HOUR(o.ocp_dtInicio) AS hora_pico,
                            COUNT(o.ocp_id) AS total_ocupacoes
                        FROM 
                            ocupacao o
                        JOIN 
                            sensor s ON o.sen_id = s.sen_id
                        JOIN 
                            rua r ON s.rua_id = r.rua_id
                        WHERE 
                            r.rua_id = ?
            `
            parametros.push(relatorio.rua);
            if(relatorio.dtInicio){
                sql += " AND o.ocp_dtInicio >= ?";
                parametros.push(relatorio.dtInicio);
            }
            if(relatorio.dtFim){
                sql += " AND o.ocp_dtInicio <= ?";
                parametros.push(relatorio.dtFim);
            }
            sql+=`
                        GROUP BY 
                            HOUR(o.ocp_dtInicio)
                    ) AS sub_query
                )
            `;
            const [dataBase, campos] = await conexao.execute(sql, parametros);
            await conexao.release();
            return dataBase[0];
        }
    }

    async tempoMedio(relatorio) {
        if(relatorio instanceof Relatorio){
            const conexao = await conectar();
            let sql = `
                SELECT 
                    r.rua_nome AS rua,
                    FLOOR(AVG(o.ocp_tempo) / 3600) AS horas,
                    FLOOR((AVG(o.ocp_tempo) % 3600) / 60) AS minutos
                FROM 
                    ocupacao o
                JOIN 
                    sensor s ON o.sen_id = s.sen_id
                JOIN 
                    rua r ON s.rua_id = r.rua_id
                WHERE 
                    r.rua_id=?
            `;
            let parametros = [relatorio.rua];
            if(relatorio.dtInicio){
                sql += " AND o.ocp_dtInicio>=?";
                parametros.push(relatorio.dtInicio);
            }
            if(relatorio.dtFim){
                sql += " AND o.ocp_dtFim <= ?";
                parametros.push(relatorio.dtFim);
            }
            const [dataBase, campos] = await conexao.execute(sql, parametros);
            await conexao.release();
            return dataBase[0];
        }
    }   
}