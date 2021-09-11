const mysql = require('mysql2');
require('dotenv').config();

const db = mysql.createConnection(
    {
        host: 'localhost',
        user: 'root',
        password: 'micky520',
        database: 'employees'
    },
    console.log('Welcome to Employee Tracker!')
);

module.exports = db;
