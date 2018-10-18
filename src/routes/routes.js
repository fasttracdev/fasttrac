// Frontend Routes
var indexRouter = require('./index');
var usersRouter = require('./user');

//API'S
var loginRouter = require('./login');
exports = module.exports = function(app, passport) {
  	//front end
  	app.use('/', indexRouter);
	app.use('/users', usersRouter);

	//API'S
	app.use('/login', loginRouter);

	// you can use this section to keep a smaller payload
	passport.serializeUser(function(user, done) {
	  done(null, usersRouter);
	});

	passport.deserializeUser(function(user, done) {
	  done(null, usersRouter);
	});
};