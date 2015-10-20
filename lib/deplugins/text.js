"use strict";

const sprintf = require('sprintf-js').sprintf;

module.exports = function(requirejs, filename, node, value, resolvedFilePath) {

	node = {
//"type": "CallExpression",
//                "callee": {
//                    "type": "MemberExpression",
//                    "computed": false,
//                    "object": {
//                        "type": "CallExpression",
//                        "callee": {
//                            "type": "MemberExpression",
//                            "computed": false,
//                            "object": {
//                                "type": "CallExpression",
//                                "callee": {
//                                    "type": "MemberExpression",
//                                    "computed": false,
//                                    "object": {
//                                        "type": "CallExpression",
//                                        "callee": {
//                                            "type": "Identifier",
//                                            "name": "require"
//                                        },
//                                        "arguments": [
//                                            {
//                                                "type": "Literal",
//                                                "value": "fs",
//                                                "raw": "'fs'"
//                                            }
//                                        ]
//                                    },
//                                    "property": {
//                                        "type": "Identifier",
//                                        "name": "readFileSync"
//                                    }
//                                },
//                                "arguments": [
//                                    {
//                                        "type": "Literal",
//                                        "value": resolvedFilePath,
//                                "raw": sprintf("'%s'", resolvedFilePath)
//                                    }
//                                ]
//                            },
//                            "property": {
//                                "type": "Identifier",
//                                "name": "toString"
//                            }
//                        },
//                        "arguments": []
//                    },
//                    "property": {
//                        "type": "Identifier",
//                        "name": "slice"
//                    }
//                },
//                "arguments": [
//                    {
//                        "type": "Literal",
//                        "value": 0,
//                        "raw": "0"
//                    },
//                    {
//                        "type": "UnaryExpression",
//                        "operator": "-",
//                        "argument": {
//                            "type": "Literal",
//                            "value": 1,
//                            "raw": "1"
//                        },
//                        "prefix": true
//                    }
//                ]
//            }
                "type": "CallExpression",
                "callee": {
                    "type": "MemberExpression",
                    "computed": false,
                    "object": {
                        "type": "CallExpression",
                        "callee": {
                            "type": "MemberExpression",
                            "computed": false,
                            "object": {
                                "type": "CallExpression",
                                "callee": {
                                    "type": "Identifier",
                                    "name": "require"
                                },
                                "arguments": [
                                    {
                                        "type": "Literal",
                                        "value": "fs",
                                        "raw": "'fs'"
                                    }
                                ]
                            },
                            "property": {
                                "type": "Identifier",
                                "name": "readFileSync"
                            }
                        },
                        "arguments": [
                            {
                                "type": "Literal",
                                "value": resolvedFilePath,
                            }
                        ]
                    },
                    "property": {
                        "type": "Identifier",
                        "name": "toString"
                    }
                },
                "arguments": []
            }
	return node;
};
