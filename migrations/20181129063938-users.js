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
  db.createTable('users', {
    id: { type: 'int', primaryKey: true, autoIncrement: true },
    user_id: { type: 'int', notNull: true },
    role_id: { type: 'int', notNull: true, default: 2 },
    first_name: 'string',
    last_name: 'string',
    email: { type: 'srting', notNull: true },
    profile_image: 'string',
    user_meta: 'string',
    driver_id: 'int',   
  }, callback);
};

exports.down = function (db, callback) {
  db.dropTable('users', callback);
};

exports._meta = {
  "version": 1
};
