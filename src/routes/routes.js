const routes = require('./index');
const user = require('./user');
const login = require('./login');
const fasttrac = require('./fasttrac');

exports = module.exports = function(app) {
  	app.use('/', routes);
	app.use('/user', user);
	app.use('/fasttrac', fasttrac);
	app.use('/sso-login', login);
};