const { Pool } = require('pg');
var config = {
    user: 'postgres',
    database: 'fasttrac',
    password: 'root',
    host: 'localhost',
    port: 5432,
    max: 10,
    idleTimeoutMillis: 30000
};

exports.connectionDB = function(){
    // connect the database
    let  db = new Pool(config);
    console.log("Connected");
    return db;
};