import mysql from "mysql2";

export const connection = mysql.createConnection({
    host: process.env.MYSQL_DBHOST || 'localhost',
    database: process.env.MYSQL_DBNAME || 'mydb',
    port: process.env.MYSQL_PORT ? Number(process.env.MYSQL_PORT) : 3306,
    user: process.env.MYSQL_USER || 'root',
    password: process.env.MYSQL_PASSWORD || 'mynewpassword',
})
