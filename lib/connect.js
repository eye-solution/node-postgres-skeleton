var config = require('./config');
var r = require('rethinkdb');

var _conns = {};

async function connect(obj) {
  let id = Math.floor(Math.random()*50);
  let connection = _conns[id];
  if (connection && connection.open) {
    return connection;
  }

  connection = await r.connect(obj || config.rethinkdb);
  _conns[id] = connection;
  return connection;
};

module.exports = connect;
