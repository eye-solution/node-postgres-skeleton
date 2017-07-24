var r = require('rethinkdb');
var connect = require('connect');
var hash = {};
var config = require('./config');
var DBNAME = config.rethinkdb.db;

async function watch() {
	try {
		var cursor = r.db(DBNAME).table('page_token').run(connection);
		cursor.each(function(feed) {
			if (feed.new_val && feed.new_val.id && feed.new_val.token) {
				hash[feed.new_val.id] = feed.new_val;
			}
		})
	} catch (e) {
		setTimeout(watch, 3000);
	}
		
}

async function init() {
	var connection = await connect(config.rethinkdb);
	var tokens = await r.db(DBNAME).table('page_token').coerceTo('array').run(connection);
	if (!tokens) {
		return;
	}
	for (let token of tokens) {
		hash[token.id] = token;
	}
	await watch();
}

function getToken(id) {
	if (hash[id] &&  hash[id].token) {
		return hash[id].token;
	}
	return false;
}

module.exports = init;