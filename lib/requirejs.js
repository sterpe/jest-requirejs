"use strict";

module.exports = function (filePath) {
	let requirejsArgs
	, requirejsConfig
	;

	const requirejs = global.requirejs = function () {
		requirejsArgs = Array.prototype.slice.call(arguments);
	};
	requirejs.config = function () {
		requirejsConfig = Array.prototype.slice.call(arguments);
	};

	require(filePath);

	return {
		config: requirejsConfig.shift()
		, arguments: requirejsArgs
	};
};
