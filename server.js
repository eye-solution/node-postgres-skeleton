var Factory = require('./appFactory');
var config = require('./lib/config');

var app = Factory({
  routePath: './routes/server',
  debug: 'coupon',
  port: config.server.port,
  publicDirs: [{
  	route: '/assets',
  	path: '../client/dist/assets'
  }, {
  	route: '/',
  	path: 'public'
  }]
})

module.exports = app;


/**
 * socket.io routes
 */

var io = require('socket.io')(app.server);
var socketRoute = require('./routes/serverSocket');
io.of('/').on('connection', socketRoute);
