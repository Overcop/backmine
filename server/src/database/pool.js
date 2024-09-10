import mysql from "mysql2/promise" ;

const { DATABASE, DATABASE_HOST, DATABASE_PORT, DATABASE_USER, DATABASE_PASSWORD } = process.env;

const pool = mysql.createPool({
    host: DATABASE_HOST,
    port: DATABASE_PORT,
    user: DATABASE_USER,
    password: DATABASE_PASSWORD,
    database: DATABASE,
})

export default pool;