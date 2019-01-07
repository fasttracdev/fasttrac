var axios = require('axios');
const management = require('../models/management');
/**
* GET Request
*
* @param [url] [string]
*/
exports.get = function(url){
  return new Promise(function (resolve, reject) {
    getManagementToken().then(function(success) {
      url = process.env.AUTH0_DOMAIN + url;

      var headers = {
        headers: {
            'Content-Type': 'application/json',
            Authorization: success
        }
      };

      axios.get(url, headers)
      .then(function (response) {
          resolve(response);
      })
      .catch(function (error) {
          return handleError(error, reject);
      });
    }, function() {
      return reject();
    });
  });
}

/**
* POST Request
*
* @param [url] [string]
* @param [params] [object] [Data that pass to url]
*/
exports.post = function(url, params){
  return new Promise(function (resolve, reject) {
    getManagementToken().then(function(success) {
      url = process.env.AUTH0_DOMAIN + url;      
      var headers = {
        headers: {
          'Content-Type': 'application/json',
          Authorization: success
        }
      };

      axios.post(url, params, headers)
      .then(function (response) {
          resolve(response);
      })
      .catch(function (error) {

        return handleError(error, reject);
      });
    }, function(eee) {
      return reject();
    });
  });
}

/**
* POST Request
*
* @param [url] [string]
* @param [params] [object] [Data that pass to url]
*/
exports.postForExternalRequest = function(url, params){
  url = process.env.AUTH0_DOMAIN + url;
  return new Promise(function (resolve, reject) {
    axios.post(url, params)
    .then(function (response) {
        resolve(response);
    })
    .catch(function (error) {
        return handleError(error, reject);
    });
  });
}


/**
* Get Request
*
* @param [url] [string]
* @param [params] [object] [Data that pass to url]
*/
exports.getForExternalRequest = function (url) {
  // url = process.env.AUTH0_DOMAIN + url;
  return new Promise(function (resolve, reject) {
    axios.get(url)
      .then(function (response) {
        resolve(response);
      })
      .catch(function (error) {
        return handleError(error, reject);
      });
  });
}



/**
* PATCH Request
*
* @param [url] [string]
* @param [params] [object] [Data that pass to url]
*/
exports.patch = function(url, params){
  return new Promise(function (resolve, reject) {
    getManagementToken().then(function(success) {
      url = process.env.AUTH0_DOMAIN + url;

      var headers = {
          headers: {
            'Content-Type': 'application/json',
            Authorization: success
          }
      };

      axios.patch(url, params, headers)
      .then(function (response) {
          resolve(response);
      })
      .catch(function (error) {
          return handleError(error, reject);
      });
    }, function() {
      return reject();
    });
  });
}

/**
* DELETE Request
*
* @param [url] [string]
* @param [params] [object] [Data that pass to url]
*/
exports.delete = function(url){
  return new Promise(function (resolve, reject) {
    getManagementToken().then(function(success) {
      url = process.env.AUTH0_DOMAIN + url;
      var headers = {
          headers: {
            Authorization: success
          }
      };
      
      axios.delete(url, headers)
      .then(function (response) {
          resolve(response);
      })
      .catch(function (error) {
          return handleError(error, reject);
      });
    }, function() {
      return reject();
    });
  });
}


/**
 * Handle Error Response
 *
 * @param error [Api Error]
 */
handleError = function(error, reject) {
  return reject(error);
}

/**
 * Return Management Token for Auth0 API request
 */
getManagementToken = function() {
  return new Promise(function (resolve, reject) {
    management.getTokenFromDB().then((success)=> {
      if(success.length > 0) {
        if(isManagementTokenValid(success[0])) {
          resolve("Bearer " + success[0].meta_value);
        }else {
            getManagementTokenAuth0().then(function(success) {
              var token = success.data.access_token;
              management.updateTokenInDB(token, new Date().toString()).then(function(success) {
                resolve("Bearer " + token);
              }, function(err) {
                reject(null);
              });
            }, function(err) {
              reject(null);
            });
          }
        }else {
          reject(null);
        }
    }, (err) => {
      reject(null);
    })
  });
}

isManagementTokenValid = function(data) {
  var startDateTime = new Date(data.meta_options);
  var currentDateTime = new Date();
  var seconds = (currentDateTime.getTime() - startDateTime.getTime()) / 1000;

  //Token valid for 24 hours only
  if(startDateTime && currentDateTime && Math.abs(Math.floor(seconds)) < 86400 - 1000) {
    return true
  }

  return false;
}

/**
 * Get new token from auth0 for global use
 */ 
getManagementTokenAuth0 = function() {
  var url = process.env.AUTH0_DOMAIN + '/oauth/token';
  var data = {
    client_id: process.env.API_CLIENT_ID,
    client_secret: process.env.API_CLIENT_SECRET,
    audience: process.env.AUTH0_DOMAIN + '/api/v2/',
    grant_type: 'client_credentials'
  };
  return new Promise(function (resolve, reject) {
    axios.post(url, data)
    .then(function (response) {
        resolve(response);
    })
    .catch(function (error) {
        return handleError(error, reject);
    });
  });
}