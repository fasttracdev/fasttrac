module.exports.transformUserAndToken = function(data, userToken) {

	let loginData = {};
    loginData = {
    	token: userToken,
    	user: data
  	};
	
	return loginData;
}