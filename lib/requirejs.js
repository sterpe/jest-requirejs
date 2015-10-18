"use strict";

const path = require('path');

module.exports = function (filename) {
	let requirejsArgs
	, requirejsConfig
	;

	const requirejs = global.requirejs = function () {
		requirejsArgs = Array.prototype.slice.call(arguments);
	};
	requirejs.config = function () {
		requirejsConfig = Array.prototype.slice.call(arguments);
	};

	filename = path.resolve(process.cwd(), filename);
	require(filename);

	return {
		config: requirejsConfig.shift()
		, arguments: requirejsArgs
		, filename: filename
		, dirname: path.dirname(filename)
	};
};
