var fs = require('fs');
var path = require('path');
var req = require('../lib/request')();

async function main(){
	try {
		var result = await req.get("https://www.google.com");
		fs.writeFileSync(
			path.join(__dirname, 'google.html'),
			result
		);
	} catch (e) {
		console.error(e.stack);
	}
		
}

module.exports = main;