const insertDrivers = require('../../models/sync/drivers');
const syncUrl = 'https://fasttrac.tracxtms.com/api/fasttrack/available-drivers?basicauth=BHiCqj0qctCYFeXtZWlUZdzrNFbIWZCK';
const https = require('../../../services/https');

exports.syncDrivers = function () {
  https.getForExternalRequest(syncUrl).then((success) => {
    if (success.data.length > 0) {
      insertDrivers.insertDriverintoDB(success.data).then((res) => {
      }, (err) => {
      })
    }else {
      console.log("no records to insert");
    }
  }, (err) => { })
}