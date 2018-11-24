const con = require('../../../connection');

/* Get drivers listing from fasttrac db */ 
exports.getDriversFromDB = function(query, dataType){
    return new Promise(function (resolve, reject) {
        let db = con.connectionDB();
        let sql = "";
        let params = [];
        if(dataType === 'string') {
          sql = "select * from fast_trac_drivers where reference_name like ?";
          params = [
            '%'+ query +'%'
          ];
        }else if(dataType === 'number') {
          sql = "select * from fast_trac_drivers where fasttrac_driver_num like ?";
          params = [
            '%'+ query +'%'
          ];
        }else {
          sql = "select * from fast_trac_drivers";  
        }
        db.all(sql, params, function(err, row) {
            if (err) {
                console.log(err);
                reject(err);
                return
            }
            resolve(row);
        });
        db.close();
    });
};

/* Insert drivers data */
exports.insertDriverintoDB = function (data) {
  return new Promise(function (resolve, reject) {
    let db = con.connectionDB();
    try {
      if (data.length > 0) {
        data.forEach((value, index) => {
          db.run(`INSERT INTO fast_trac_drivers (
            ref_id,
            truck_id,
            terminal_id,
            fasttrac_driver_num,
            payment_rate,
            stop_payment,
            owner_operator,
            phone,
            reference_name,
            company_name,
            address_1,
            address_2,
            city,
            postal_code,
            fax,
            email,
            motor_carrier,
            notes,
            role,
            driver_status,
            payment_type,
            created_at) 
            VALUES(?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)`, 
            [
              value.id,
              value.truck_id,
              value.terminal_id,
              value.fasttrac_driver_num,
              value.payment_rate,
              value.stop_payment,
              value.owner_operator,
              value.phone,
              value.reference_name,
              value.company_name,
              value.address_1,
              value.address_2,
              value.city,
              value.postal_code,
              value.fax,
              value.email,
              value.motor_carrier,
              value.notes,
              value.role,
              value.driver_status,
              value.payment_type,
              value.created_at
            ], function (err) {
            if (err) {
              reject(err);
              return;
            }

          // console.log((Number(index / data.length)*100) + "% Completed");
          // console.log(`A row has been inserted with rowid ${this.lastID}`);
        });
        });
        resolve();
      }else {}
    }catch(e) {

    }

    // insert one row into the langs table

    // close the database connection
    db.close();
  });
};