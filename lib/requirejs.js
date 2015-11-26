"use strict";

const path = require('path');

module.exports = function (filename, indexHtml) {
	let requirejsArgs
	, requirejsConfig
	;

	const requirejs = global.requirejs = function () {
		requirejsArgs = Array.prototype.slice.call(arguments);
	};

	requirejs.config = function () {
		requirejsConfig = Array.prototype.slice.call(arguments);
	};

	require.nodeRequire = function (module) {
		return require(module);
	};

	filename = path.resolve(process.cwd(), filename);
	indexHtml = path.resolve(process.cwd(), indexHtml);
	require(filename);

	return {
		config: requirejsConfig.shift()
		, arguments: requirejsArgs
		, filename: filename
		, dirname: path.dirname(filename)
		, indexHtml: indexHtml
		, webRoot: path.dirname(indexHtml)
	};
};
