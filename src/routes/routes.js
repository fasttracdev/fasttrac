const routes = require('./index');
const user = require('./user');

exports = module.exports = function(app) {
  	app.use('/', routes);
	app.use('/user', user);
};