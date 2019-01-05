const con = require('../../../connection');

/* Get drivers listing from fasttrac db  */
exports.getDriversFromDB = function(params, dataType){
    return new Promise(function (resolve, reject) {
        let db = con.connectionDB();
        let query = "";
        if(dataType === 'string') {
          query = "select * from fast_trac_drivers where reference_name LIKE '%" + params.toUpperCase() + "%'";
        }else if(dataType === 'number') {
          query = "select * from fast_trac_drivers where fasttrac_driver_num like '%" + params + "%'";
        }else {
          query = "select * from fast_trac_drivers";
        }
        db.query(query, function (err, res) {
          if (err) {
            reject(err);
            return;
          }
          resolve(res.rows);
        });
    });
};

/* Insert drivers data */
exports.insertDriverintoDB = function (data) {
  return new Promise(function (resolve, reject) {
    let db = con.connectionDB();
    try {
      if (data.length > 0) {
        data.forEach((value, index) => {
          let query = "INSERT INTO fast_trac_drivers (ref_id,truck_id,terminal_id,fasttrac_driver_num,payment_rate,stop_payment,owner_operator,phone,reference_name,company_name,address_1,address_2,city,postal_code,fax,email,motor_carrier,notes,role,driver_status,payment_type,created_at)VALUES('"+value.id+"', '"+value.truck_id+"', '"+value.terminal_id+"', '"+value.fasttrac_driver_num+"', '"+value.payment_rate+"', '"+value.stop_payment+"', '"+value.owner_operator+"', '"+value.phone+"', '"+value.reference_name+"', '"+value.company_name+"', '"+value.address_1+"', '"+value.address_2+"', '"+value.city+"', '"+value.postal_code+"', '"+value.fax+"', '"+value.email+"', '"+value.motor_carrier+"', '"+value.notes+"', '"+value.role+"', '"+value.driver_status+"', '"+value.payment_type+"', '"+value.created_a+"')";
          db.query(query, function (err, res) {
            if (err) {
              reject(err);
              return;
            }
            resolve();
          });
        });
      }else {}
    }catch(e) {

    }
  });
};

/* Insert drivers data */
exports.insertDriverReportintoDB = function (data) {
  return new Promise(function (resolve, reject) {
    let db = con.connectionDB();
    try {
      if (data.length > 0) {
        data.forEach((value, index) => {
          let query = "INSERT INTO fast_trac_driver_report (driver_id,drivername,week,del_date,selling_terminal,cntrl,fsu,acct,customer,ref,inv_date,inv,hauling_terminal,chg_code,driverterminal,amount_billed,dr,cust_type,line_haul,line_haul_pay,imputted_fuel,imputted_insurance,total_pay,selling_terminal_pay,shipper,pu_city,pu_state,consignee,de_city,de_state)VALUES('"+value.drivernumber+"','"+value.drivername+"','"+value.week+"','"+value.del_date+"','"+value.selling_terminal+"','"+value.cntrl+"','"+value.fsu+"','"+value.acct+"','"+value.customer+"','"+value.ref+"','"+value.inv_date+"','"+value.inv+"','"+value.hauling_terminal+"','"+value.chg_code+"','"+value.driverterminal+"','"+value.amount_billed+"','"+value.dr+"','"+value.cust_type+"','"+value.line_haul+"','"+value.line_haul_pay+"','"+value.imputted_fuel+"','"+value.imputted_insurance+"','"+value.total_pay+"','"+value.selling_terminal_pay+"','"+value.shipper+"','"+value.pu_city+"','"+value.pu_state+"','"+value.consignee+"','"+value.de_city+"','"+value.de_state+"')";
          db.query(query, function (err, res) {
            if (err) {
              reject(err);
              return;
            }
            resolve();
          });
        });
      } else { }
    } catch (e) {}
  });
};


exports.getAllDriversReportFromDB = function (data) {
  return new Promise(function (resolve, reject) {
    let db = con.connectionDB();
    let orderField = ("order_field" in data) ? data.order_field : "id";
    let orderDir = ("order_dir" in data) ? data.order_dir : "desc";
    let query = 'select * from fast_trac_driver_report WHERE 1=1';
    if ("driver_id" in data) {
      query += " AND driver_id like '%" + data.driver_id + "%'";
    }
    if ("chg_code" in data) {
      query += " AND chg_code like '%" + data.chg_code + "%'";
    }
    if ("driver_name" in data) {
      query += " AND drivername like '%" + data.driver_name + "%'";
    }
    if ("customer" in data) {
      query += " AND customer like '%" + data.customer + "%'";
    }
    query += " ORDER BY "+ orderField + " " + orderDir;
    db.query(query, function (err, res) {
      if (err) {
        reject(err);
        return;
      }
      resolve(res.rows);
    });
  });
};

exports.getDriverReportFromDB = function (id, data) {
  return new Promise(function (resolve, reject) {
    let db = con.connectionDB();
    let sql = `SELECT driver_id FROM users WHERE 1=1`;
    sql += " AND user_id='" + id + "'";
    db.query(sql, function (err, res) {
      if (err) {
        reject(err);
        return
      }
      let orderField = ("order_field" in data) ? data.order_field : "id";
      let orderDir = ("order_dir" in data) ? data.order_dir : "desc";
      let query = 'SELECT * FROM fast_trac_driver_report WHERE 1=1';
      query += " AND driver_id='" + res.rows[0].driver_id + "'";
      if ("chg_code" in data) {
        query += " AND chg_code like '%" + data.chg_code + "%'";
      }
      if ("customer" in data) {
        query += " AND customer like '%" + data.customer + "%'";
      }
      query += " ORDER BY " + orderField + " " + orderDir;
      db.query(query, function (err, res) {
        if (err) {
          reject(err);
          return;
        }
        resolve(res.rows);
      });
    });
  });
};

exports.getSettlementReportsFromDB = function (data) {
  return new Promise(function (resolve, reject) {
    let db = con.connectionDB();
    let orderField = ("order_field" in data) ? data.order_field : "id";
    let orderDir = ("order_dir" in data) ? data.order_dir : "desc";
    let query = 'select * from fast_trac_driver_report WHERE 1=1';
    if ("driver_id" in data) {
      query += " AND driver_id='" + data.driver_id + "'";
    }
    if ("terminal" in data) {
      query += " AND driverterminal='" + data.terminal + "'";
    }
    if ("end_del_date" in data) {
      query += " AND del_date>='" + data.start_del_date + "'";
      query += " AND del_date<='" + data.end_del_date + "'";
    }
    query += " ORDER BY " + orderField + " " + orderDir;
    db.query(query, function (err, res) {
      if (err) {
        reject(err);
        return;
      }
      resolve(res.rows);
    });
  });
};

exports.getSettlementDriverReportsFromDB = function (id, data) {
  return new Promise(function (resolve, reject) {
    let db = con.connectionDB();
    let sql = `SELECT driver_id FROM users WHERE 1=1`;
    sql += " AND user_id='" + id + "'";

    db.query(sql, function (err, res) {
      if (err) {
        reject(err);
        return
      }
      let orderField = ("order_field" in data) ? data.order_field : "id";
      let orderDir = ("order_dir" in data) ? data.order_dir : "desc";
      let query = 'SELECT * FROM fast_trac_driver_report WHERE 1=1';
      query += " AND driver_id='" + res.rows[0].driver_id + "'";
      
      if ("end_del_date" in data) {
        query += " AND del_date>='" + data.start_del_date + "'";
        query += " AND del_date<='" + data.end_del_date + "'";
      }

      db.query(query, function (err, res) {
        if (err) {
          reject(err);
          return;
        }
        resolve(res.rows);
      });
    });
  });
};

