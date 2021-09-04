const mysql = require('mysql2');

const db = mysql.createConnection(
    {
        host: 'localhost',
        user: 'root',
        password: 'micky520',
        database: 'employees'
    },
    console.log('Welcome to Eployee Tracker!')
);


module.exports = db;
