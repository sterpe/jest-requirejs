"use strict";

const esprima = require('esprima');
const estraverse = require('estraverse');
const escodegen = require('escodegen');
const path = require('path');

function requirejsResolutionProcedure(requirejs, requireArgumentValue) {
	const paths = requirejs.config.paths;
	let segments = requireArgumentValue.split("/");

	let i, key;

	for (i =segments.length; i > 0; i--) {
		let moduleName = segments.slice(0, i).join('/');
		key = Object.keys(paths).filter(function (key) {
			return key === moduleName;
		}).pop();

		if (key) {
			break;
		}
	}
	console.log("KEY", key);
	return path.resolve(requirejs.dirname
		, requirejs.config.baseUrl
		, key ? requireArgumentValue.replace(key, paths[key]) :
			requireArgumentValue
	);

}
function evaluateNode(requirejs, filename, node, value) {
	let requireArgumentValue = node.arguments[0].value;

	// If the module ID includes a protocol, starts with `/` or ends in `.js`
	// the given require path is relative to the current webRoot.
	if (/\:/.test(requireArgumentValue) || /^\//.test(requireArgumentValue) || /\.js$/.test(requireArgumentValue)) {
		node.arguments[0].value = path.resolve(requirejs.webRoot
			, requireArgumentValue
		);
		return node;
	}
	// Ignoring some of the wackier resolution features of requirejs, 
	// relative paths should be relative to the current file,
	// though there are some caveats to this that should be implemented later
	if (/^\.(\.)?\/.*$/.test(node.arguments[0].value)) {
		node.arguments[0].value = path.resolve(path.dirname(filename),
			node.arguments[0].value);
		return node;
	}
	if (/\!/.test(requireArgumentValue)) {
		// This is a loader directive
		return node;
	}
	node.arguments[0].value = requirejsResolutionProcedure(requirejs, requireArgumentValue);
	return node;
}
module.exports = function (config) {

	const requirejs = require('./lib/requirejs')(config.mainjs, config.indexHtml);

	return {
		process: function (src, filename) {
			// deamdify the src if necessary
			let t = require('./lib/deamdify')(src, { file: filename });
			if (t === src && ! /__tests__\//.test(filename)) {
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
							return evaluateNode(requirejs, filename, node,
								node.arguments[0].value);
						}
					}
				}
			});

			return escodegen.generate(ast);
		}
	};
}
