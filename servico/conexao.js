import mysql from 'mysql2/promise'

const pool = mysql.createPool({
    host: 'localhost',
    user: 'agenda',
    password: 'agenda454545',
    database: 'agenda'
});

export default pool;
