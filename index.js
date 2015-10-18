"use strict";

const esprima = require('esprima');
const estraverse = require('estraverse');
const escodegen = require('escodegen');
const path = require('path');

module.exports = function (config) {

	const requirejs = require('./lib/requirejs')(config.mainjs);

	return {
		process: function (src, filename) {
			// deamdify the src if necessary
			let t = require('./lib/deamdify')(src, { file: filename });
			if (t === src) {
				// just return it, it wasn't a require module to begin with.
				return src;
			}
			const ast = esprima.parse(t, {
			});

			estraverse.replace(ast, {
				enter: function (node) {
				}
				, leave: function (node) {
					if (node.type === "CallExpression" &&
							node.callee.type === "Identifier" &&
							node.callee.name === "require") {
						if (node.arguments[0].type === "Literal") {
							// relative paths
							// we just convert them to absolute paths...
							if (/^\..*$/.test(node.arguments[0].value)) {
								node.arguments[0].value = path.resolve(path.dirname(filename),
									node.arguments[0].value);
								return node;
							}
						}
						if (node.arguments[0].value.indexOf("/") === -1 && (!/\.js$/.test(node.arguments[0].value))) {
							node.arguments[0].value = path.resolve(requirejs.dirname
								, requirejs.config.baseUrl
								, node.arguments[0].value
							);
							return node;
						}
					}
				}
			});

			return escodegen.generate(ast);
		}
	};
}
