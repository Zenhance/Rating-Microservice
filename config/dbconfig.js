const mysql = require('mysql');

const dbConnection = mysql.createConnection({
    host: 'localhost',
    port: '3307',
    user: 'root',
    password: '',
    database: 'rate_microservice'
});

dbConnection.connect((error) => {
    if(error)
        throw error;
    else
        console.log('Database Connection Successful');
});

module.exports = dbConnection;
