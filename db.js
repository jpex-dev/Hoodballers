// db.js
const { Pool } = require('pg');

const pool = new Pool({
    user: 'postgres',
    host: 'localhost',
    database: 'Hoodballers',
    password: 'novasenha',
    port: 5432,
});

module.exports = pool;
