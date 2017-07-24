module.exports = {
	uniqueArray: function(arr) {
		var hash = {};
		var result = [];
		arr.forEach(item => hash[item] = 1);
		for(let i in hash) {
			if (hash.hasOwnProperty(i) && hash[i] === 1) {
				result.push(i);
			}
		}
		return result;
	},
	normalize: (str) => {
  		let VIETNAMESE_MAP = {'á':'a', 'à':'a', 'ả':'a', 'ã':'a', 'ạ':'a','ă':'a', 'ắ':'a', 'ằ':'a', 'ẵ':'a', 'ặ':'a', 'ẳ':'a','â':'a', 'ấ':'a', 'ầ':'a', 'ẫ':'a', 'ẩ':'a', 'ậ':'a','đ':'d','é':'e', 'è':'e', 'ẻ':'e', 'ẽ':'e', 'ẹ':'e','ê':'e', 'ế':'e', 'ề':'e', 'ể':'e', 'ễ':'e', 'ệ':'e','í':'i', 'ì':'i', 'ỉ':'i', 'ĩ':'i', 'ị':'i', 'ỏ':'o', 'ó':'o', 'õ':'o', 'ọ':'o', 'ò':'o', 'ô':'o', 'ố':'o', 'ồ':'o', 'ổ':'o', 'ỗ':'o', 'ộ':'o','ơ':'o', 'ớ':'o', 'ờ':'o', 'ở':'o', 'ỡ':'o', 'ợ':'o','ù':'u', 'ú':'u', 'ủ':'u', 'ũ':'u', 'ụ':'u','ư':'u', 'ứ':'u', 'ừ':'u', 'ữ':'u', 'ử':'u', 'ự':'u','ỳ':'y', 'ý':'y', 'ỷ':'y', 'ỹ':'y', 'ỵ':'y', 'Á':'A', 'À':'A', 'Ả':'A', 'Ã':'A', 'Ạ':'A','Ă':'A', 'Ắ':'A', 'Ằ':'A', 'Ẵ':'A', 'Ặ':'A', 'Ẳ':'A','Â':'A', 'Ấ':'A', 'Ầ':'A', 'Ẫ':'A', 'Ẩ':'A', 'Ậ':'A','Đ':'D','É':'E', 'È':'E', 'Ẻ':'E', 'Ẽ':'E', 'Ẹ':'E','Ê':'E', 'Ế':'E', 'Ề':'E', 'Ể':'E', 'Ễ':'E', 'Ệ':'E','Í':'I', 'Ì':'I', 'Ỉ':'I', 'Ĩ':'I', 'Ị':'I','Ô':'O', 'Ố':'O', 'Ồ':'O', 'Ổ':'O', 'Ỗ':'O', 'Ộ':'O','Ơ':'O', 'Ớ':'O', 'Ờ':'O', 'Ở':'O', 'Ỡ':'O', 'Ợ':'O','Ù':'U', 'Ú':'U', 'Ủ':'U', 'Ũ':'U', 'Ụ':'U','Ư':'U', 'Ứ':'U', 'Ừ':'U', 'Ữ':'U', 'Ử':'U', 'Ự':'U','Ỳ':'Y', 'Ý':'Y', 'Ỷ':'Y', 'Ỹ':'Y', 'Ỵ':'Y'};
  		return str.replace(/[^A-Za-z0-9\[\] ]/g, function(x) { return VIETNAMESE_MAP[x] || x; });
	},

	CookieParse: function(str) {
		var cookies = decodeURIComponent(str).split(';');
		console.log('cookies:', cookies);
		cookies = cookies.map(function(x) {
			return x.trim();
		});
		console.log('cookies:', cookies);
		var result = {};
		for (let cookie of cookies) {
			let parts = cookie.split('=');
			let index = parts[0];
			let val = parts.splice(1).join('=');
			let json = false;
			try {
				json = JSON.parse(val);
			} catch (e) {

			}
			if (json && typeof json === "object") {
				val = json;
			}
			result[index] = val;
		}
		return result;
	},
	removeBase64Prefix: function (str) {
		var prefix = 'base64,';
		var pos = str.indexOf(prefix);
		if (pos == -1) return str;

		return str.substr(pos + prefix.length);
	}
}