var jwt = require('jsonwebtoken');
var fs = require('fs');
var cert = fs.readFileSync('keys/ddx.pem');  // get public key
var jwtOptions = {
    algorithms: ['RS256']
};

exports.validateToken = function(token) {
	return new Promise(function (resolve, reject) {
		jwt.verify(token, cert, jwtOptions, function(err, decoded) {
		    if(err) {
		        reject(err);
		        return;
		    }
		    
		    resolve(decoded);
		});
	});
}