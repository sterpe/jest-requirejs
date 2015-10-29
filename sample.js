var tpl = require('tpl!foo.tpl');

var tpl = (function () {
	var tpl = require('/path/to/lib/tpl');
	var retval = null;
	tpl.load('path/to/foo.tpl',{ nameToUrl:function () { return "path/to/foo.tpl" } }, function (content) {
		retval = content;
	}, {});
	return retval;
}());
