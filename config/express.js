'use strict';

/**
 * Module dependencies.
 */
var fs = require('fs'), 
	http = require('http'), 
	express = require('express'), 
	logger = require('express-logger'), 
	bodyParser = require('body-parser'), 
	session = require('express-session'), 
	compression = require('compression'), 
	methodOverride = require('method-override'), 
	cookieParser = require('cookie-parser'), 
	helmet = require('helmet'), 
	path = require('path'), 
	expressHbs = require('express-handlebars'), 
	request = require("request"), 
	sync = require('async'), 
	useragent = require('express-useragent');

var config = require('./config');
var host = config.get('protocol') + "://" + config.get('webserviceHostIP')
		+ ":" + config.get('webservicePort');
var url = require("url");

module.exports = function() {

	// Initialize express app
	var app = express();

	// Passing the request url to environment locals
	app.use(function(req, res, next) {
		res.locals.url = req.protocol + '://' + req.headers.host + req.url;
		next();
	});

	// Should be placed before express.static
	app.use(compression({
		// only compress files for the following content types
		filter : function(req, res) {
			return (/json|text|javascript|css/).test(res
					.getHeader('Content-Type'));
		},
		// zlib option for compression level
		level : 3
	}));

	// Showing stack errors
	app.set('showStackError', true);

	//handlebar configuration
	app.set('views', path.resolve('./app/views'));
	
	app.engine('.hbs', expressHbs({
		extname : '.hbs',
		defaultLayout : path.resolve('./app/views/layouts/main.hbs'),
		partialsDir : path.resolve('./app/views/partials')
	}));
	app.set('view engine', '.hbs');

	// Enable logger 
	app.use(logger({
		path : "fui.log"
	}));

	// Environment dependent middleware
	if (app.get('env') === 'development') {
		app.use(function(err, req, res, next) {
			res.status(err.status || 500);
			res.render('error', {
				message : err.message,
				error : err
			});
		});
		// Disable views cache
		app.set('view cache', false);
	} else if (app.get('env') === 'production') {
		app.use(function(err, req, res, next) {
			res.status(err.status || 500);
			res.render('error', {
				message : err.message,
				error : {}
			});
		});
		app.locals.cache = 'memory';
		app.enable('view cache');
		process.on('uncaughtException', function(err) {
			console.log("/*....uncaughtException......*/");
			console.error(err);
		});
	}

	// Request body parsing middleware should be above methodOverride
	app.use(bodyParser.urlencoded({
		extended : true
	}));

	app.use(bodyParser.json());
	app.use(methodOverride());

	// Use helmet to secure Express headers
	app.use(helmet.xframe());
	app.use(helmet.xssFilter());
	app.use(helmet.nosniff());
	app.use(helmet.ienoopen());
	app.disable('x-powered-by');

	// Setting the app router and static folder
	app.use(express.static(path.resolve('./public')));

	// CookieParser should be above session
	app.use(cookieParser());

	//Setting user agent
	app.use(useragent.express());

	// Globbing routing files
	fs.readdirSync("./app/routes").forEach(function(file) {
		require('../app/routes/' + file)(app);
	});

	// catch 404 and forward to error handler
	app.use(function (req, res, next) {
	   res.render('404');
	});
	
	var routes = require('../app/routes/index');
	var users = require('../app/routes/user');
	
	app.use('/', routes);
	app.use('/users', users);
	
	// Return Express server instance
	return app;
};
