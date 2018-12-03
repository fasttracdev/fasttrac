'use strict';

var dbm;
var type;
var seed;

/**
  * We receive the dbmigrate dependency from dbmigrate initially.
  * This enables us to not have to rely on NODE_PATH.
  */
exports.setup = function(options, seedLink) {
  dbm = options.dbmigrate;
  type = dbm.dataType;
  seed = seedLink;
};

exports.up = function (db, callback) {
  db.createTable('fast_trac_driver_report', {
    id: { type: 'int', primaryKey: true, autoIncrement: true },
    driver_id: { type: 'int', notNull: true },
    drivername: 'string',
    week: 'string',
    del_date: 'string',
    selling_terminal: 'int',
    cntrl: 'int',
    fsu: 'string',
    acct: 'int',
    customer: 'string',
    ref: 'string',
    inv_date: 'string',
    inv: 'string',
    hauling_terminal: 'string',
    chg_code: 'string',
    driverterminal: 'string',
    amount_billed: 'string',
    dr: 'string',
    cust_type: 'string',
    line_haul: 'string',
    line_haul_pay: 'string',
    imputted_fuel: 'string',
    imputted_insurance: 'string',
    total_pay: 'int',
    selling_terminal_pay: 'int',
    shipper: 'string',
    pu_city: 'string',
    pu_state: 'string',
    consignee: 'string',
    de_city: 'string',
    de_state: 'string'
  }, callback);
};

exports.down = function (db, callback) {
  db.dropTable('fast_trac_driver_report', callback);
};

exports._meta = {
  "version": 1
};
