define(function (require) {
	var x = 1;

	var messages = require('./messages');
	
	var print = require('print');

	print(messages.getHello());

	return { x: x };
});
