'use strict';

function Util() {

}

Util.prototype.sha256 = function (pwd) {
	var crypto = require('crypto');
	var hash = crypto.createHash('sha256').update(pwd).digest('base64');
	return hash;
};



module.exports = Util;