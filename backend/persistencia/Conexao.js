import mysql from 'mysql2/promise';

export default async function conectar(){
    
    if (global.poolConexoes){
        return await global.poolConexoes.getConnection();
    }
    else{
        global.poolConexoes = mysql.createPool({
            "host": "localhost",
            "port": "3306",
            "database": "smart_parking",
            "user": "root",
            "password": "",
            "connectionLimit": "10",
            "connectTimeout": "60000",
            "waitForConnections": "true",
            "queueLimit": "20"
        });
        return await global.poolConexoes.getConnection();
    }
}