'use strict';
var fs = require('fs'),
    http = require('http'),
    https = require('https'),
    path = require('path');
/**
 * Module dependencies.
 */
var config = require('./config/config')

/**
 * Main application entry file.
 * Please note that the order of loading is important.
 */


// Init the express application
var app = require('./config/express')();

var credentials = {
  key: fs.readFileSync(path.resolve('./config/keys/famstack.key'), 'utf8'),
  cert: fs.readFileSync(path.resolve('./config/keys/famstack.crt'), 'utf8')
};

var httpServer = http.createServer(app);
var httpsServer = https.createServer(credentials, app);

httpServer.listen(config.get('nodePort'),function(){
	console.log("FUI App started listening HTTP at port "+config.get('nodePort'));
});
httpsServer.listen(config.get('nodeSecurePort'),function(){
	console.log("FUI App started listening HTTPS at port "+config.get('nodeSecurePort'));
});

// Expose app
exports = module.exports = app;