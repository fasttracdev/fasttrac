const routes = require('./index');
const user = require('./user');
const login = require('./login');

exports = module.exports = function(app) {
  	app.use('/', routes);
	app.use('/user', user);
	app.use('/sso-login', login);
};