'use strict';

var dbm;
var type;
var seed;

/**
  * We receive the dbmigrate dependency from dbmigrate initially.
  * This enables us to not have to rely on NODE_PATH.
  */
exports.setup = function(options,seedLink) {
  dbm = options.dbmigrate;
  type = dbm.dataType;
  seed = seedLink;
};

exports.up = function (db, callback) {
  db.createTable('fast_trac_drivers', {
    id: {type: 'int', primaryKey: true, autoIncrement: true},
    ref_id: {type: 'int', notNull: true},
    truck_id: 'int',
    terminal_id: 'int',
    fasttrac_driver_num: 'int',
    payment_rate: 'string',
    stop_payment: 'string',
    owner_operator: 'string',
    phone: 'int',
    reference_name: 'string',
    company_name: 'string',
    address_1: 'string',
    address_2: 'string',
    city: 'string',
    postal_code: 'int',
    fax: 'int',
    email: 'string',
    motor_carrier: 'string',
    notes: 'string',
    role: 'string',
    driver_status: 'string',
    payment_type: 'string',
    created_at: 'string'
  }, callback);
};

exports.down = function (db, callback) {
  db.dropTable('fast_trac_drivers', callback);
};

exports._meta = {
  "version": 1
};
