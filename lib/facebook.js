var request;
var config = require('../lib/config');
var TIMEOUT = 60000; // TIMEOUT in ms, 0 = no timeout, 60000 = 1 min

async function _get(url) {
	console.log(new Date(), 'GET: ', url);
	let res = await request.get(url);
	return parse(res);
}

async function _post(url, body) {
	console.log(new Date(), 'POST: ', url, body);
	let res = await request.post(url, body);
	try {
		return parse(res);	
	}
	catch (e) {
		return res;	
	}
}

async function _delete(url) {
	console.log(new Date(), 'DELETE: ', url);
	let res = await request.delete(url);
	return parse(res);
}

module.exports = function(accessToken, options){
	let token = accessToken || config.facebook.token;
	request = require('./request')(options);

	function parseUrl(api) {
		api = api + '';
		var seperator;
		if (api[0] == '/') {
			api = api.substr(1);
		}
		seperator = (api.indexOf('?') > -1) ? '&' : '?';
		var url = 'https://graph.facebook.com/v2.5/' + api + seperator + 'access_token=' + token;
		return url;
	}

	function setToken(accessToken) {
		token = accessToken;
	}

	async function fbGet(api) {
		let url = parseUrl(api);
		let res = await _get(url);
		if (res.error) {
			throw res;
		}
		return res;
	}

	async function fbPost(api, body) {
		let url = parseUrl(api);
		console.log('POST: ', url, body);
		let res = await _post(url, body);
		console.log("----POST FB ----", body, res);
		if (res.error) {
			throw res;
		}
		return res;
	}

	async function fbDelete(api) {
		let url = parseUrl(api);
		let res = await _delete(url);
		if (res.error) {
			throw res;
		}
		return res;
	}

	async function fbFetch(api, num) {
		console.log('FETCH ', api);
		let url = parseUrl(api);
		var items, result = [];
		if (typeof num !== 'number') {
			num = Infinity;
		}
		var cont = true;
		var _time = 0;
		
		while (cont) {
			++_time;
			
			console.log('crawl #' + _time);
			items = await _get(url);
			if (items.error) {
				throw items;
			}
			console.log('crawl #' + _time +' items', items);
			
			if (items.data && items.data.length) {
				result = result.concat(items.data);
			}
			else {
				cont = false;
			}
			
			if (items.paging && items.paging.next) {
				url = items.paging.next;
			}
			else {
				cont = false;
			}
			
			if (result.length >= num) {
				cont = false;
			}
		}

		return result;
	}

	return {
		get: fbGet,
		post: fbPost,
		delete: fbDelete,
		fetch: fbFetch,
		setToken: setToken,
	};
};

function parse(data) {
	if (typeof data === "object") {
		return data;
	}
	if (typeof data === "string") {
		try {
			var json = JSON.parse(data);
			return json;
		} catch (e) {
		}
	}
	return data;
}