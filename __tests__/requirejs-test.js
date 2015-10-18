"use strict";

const FILE = "../lib/requirejs.js";

jest.autoMockOff();

describe([
	"requirejs.js"
].join(" ")
, function () {
	it([
		"should captcha and return the requirejs"
		, "and requirejs.config arguments from a"
		, "main.js"
	].join(" ")
	, function () {
		const ƒ = require(FILE);

		expect(ƒ("../__mocks__/main.js"))
			.toEqual({
				config: {
					baseUrl: "lib"
					, paths: {
						app: "../app"
					}
				}
				, arguments: [
					["app/main"]
				]
			});
	});
});
