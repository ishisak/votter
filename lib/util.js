'use strict';

function Util() {

}

Util.prototype.sha256 = function (pwd) {
	var crypto = require('crypto');
	var hash = crypto.createHash('sha256').update(pwd).digest('base64');
	return hash;
};

Util.prototype.md5 = function (pwd) {
	var crypto = require('crypto');
	var hash = crypto.createHash('md5').update(pwd).digest('hex');
	return hash;
};


module.exports = Util;