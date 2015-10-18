define([
	"./messages"
	, "print"
], function (messages, print) {
	var x = 1;
	print(messages.getHello());
	return { x: x };
});
