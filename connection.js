/*SqlLite DB*/
const sqlite3 = require('sqlite3').verbose();

exports.connectionDB = function(){
    // connect the database
    let db = new sqlite3.Database('./db/fasttrac.sqlite3', sqlite3.OPEN_READWRITE, (err) => {
        if (err) {
            console.error("DB Connection not build");
        }
    });
    return db;
};