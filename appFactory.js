require('babel-core/register');
require("babel-polyfill");
require('app-module-path').addPath(__dirname);
var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var session = require('express-session');
var upload = require('multer')({ dest: 'public/uploads/' }).any();

var port;
/*
	options = {
		routePath,
		debug,
		port
	}
 */
module.exports = function(options) {
	var routes = require(options.routePath);
	var debugName = options.debug ||
		(__filename.split('/').pop().split('.').shift())
	var app = express();

	//cors
	app.use(acceptCors);

	// view engine setup
	app.set('views', path.join(__dirname, 'views'));
	app.set('view engine', 'jade');

	// uncomment after placing your favicon in /public
	//app.use(favicon(__dirname + '/public/favicon.ico'));
	app.use(logger('dev'));
	app.use(upload);
	app.use(bodyParser.json({limit: '50mb'}));
	app.use(bodyParser.urlencoded({ extended: true, limit: '50mb'}));
	app.use(cookieParser());
	app.use(session({ secret: 'guone@eyeteam.vn', cookie: { maxAge: 60 * 60000 }})); // min * 60000


	if (!options.staticFirst) {
		app.use('/', routes);
	}

	if (!options.publicDirs) {
		app.use(express.static(path.join(__dirname, 'public')));
	} else {
		for (var dir of options.publicDirs) {
			console.log('Server static:', dir.route, 'to', path.join(__dirname, dir.path))
			app.use(dir.route, express.static(path.join(__dirname, dir.path)));
		}
	}

	if (options.staticFirst) {
		app.use('/', routes);
	}

	// catch 404 and forward to error handler
	app.use(notFound);

	// development error  print stacktrace
	if (app.get('env') === 'development') {
	    app.use(errorDevelopment);
	} else {
		// production error  no stacktraces + has view
		app.use(errorProduction);
	}

	var debug = require('debug')(debugName);
	var http = require('http');

	port = normalizePort(options.port);
	app.set('port', port);

	var server = http.createServer(app);
	server.listen(port);
	console.log("Listening to port ", port);
	server.on('error', onError);
	server.on('listening', onListening(debug));
	app.server = server;

	return app;
}



function normalizePort(val) {
  var port = parseInt(val, 10);

  if (isNaN(port)) {
    // named pipe
    return val;
  }

  if (port >= 0) {
    // port number
    return port;
  }

  return false;
}

/*
 * Event listener for HTTP server "error" event.
 */

function onError(error) {
  if (error.syscall !== 'listen') {
    throw error;
  }

  var bind = ((typeof port) === 'string' ? 'Pipe ' + port : 'Port ' + port);

  // handle specific listen errors with friendly messages
  switch (error.code) {
    case 'EACCES':
      console.error(bind + ' requires elevated privileges');
      process.exit(1);
      break;
    case 'EADDRINUSE':
      console.error(bind + ' is already in use');
      process.exit(1);
      break;
    default:
      throw error;
  }
}

/**
 * Event listener for HTTP server "listening" event.
 */

function onListening(debug) {
	return function() {
		var server = this;
	  	var addr = server.address();
	  	var bind = typeof addr === 'string' ?
	  	'pipe ' + addr:
	  	'port ' + addr.port;
	  	debug('Listening on ' + bind);
	}
}



function notFound(req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
}

function errorDevelopment(err, req, res, next) {
        res.status(err.status || 500);
        res.render('error', {
            message: err.message,
            error: err
        });
    }

function errorProduction(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
        message: err.message,
        error: {}
    });
}

function acceptCors(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
}
