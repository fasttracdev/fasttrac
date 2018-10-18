// Frontend Routes
var indexRouter = require('./src/routes/index');
var usersRouter = require('./src/routes/users');

exports = module.exports = function(app) {
  	//front end
  	app.use('/', indexRouter);
	app.use('/users', usersRouter);
};