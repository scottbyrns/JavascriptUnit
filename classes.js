var Core = function () {};


var Assert = {
	/**
	 *  Assert that the input values are the same instances and values.
	 */
	assertEquals: function () {
		var lastArg = argument[0];
		for (var i = 0; i < arguments.length; i += 1) {
			if (lastArg !== arguments[i]) {
				throw new Assert.AssertionError(arguments);
			}
		}
	},
	/**
	 * Assert that the entries in two arrays are equal.
	 */
	assertArraysEqual: function () {
		
	},
	/**
	 * Assert that the entries in two arrays are the same.
	 */
	assertArraysSame: function () {
		
	},
	/**
	 * Assert that the entries in two arrays are not equal.
	 */
	assertArraysNotEqual: function () {
		
	},
	/**
	 * Assert that the entries in two arrays are not the same.
	 */
	assertArraysNotSame: function () {
		
	},
	/**
	 * Assert that the input objects are not the same in value.
	 */
	assertNotSame: function () {
		
	},
	/**
	 * Assert the input value is undefined.
	 */
	assertUndefined: function () {
		
	},
	/**
	 * Assert the input value is not undefined.
	 */
	assertNotUndefined: function () {
		for (var i = 0; i < arguments.length; i += 1) {
			if (arguments[i] === undefined) {
				throw new Assert.AssertionError(arguments);
			}
		}
	},
	AssertionError: function () {
		this.error = arguments;
	},
	/**
	 *	Assert that the input objects are the same in type and value.
	 */
	assertSame: function () {
		
	},
	/**
	 *	Fail checks automatically. An error condition was met.
	 */
	fail: function () {
		
	}
	
};


var ConfigurationError = function () {
	this.message = "The configuration you provided was incomplete or invalid.";
}

var TestSuite = function (configuration) {
	this.name = configuration.name || false;
	if (this.name === false) {
		throw new ConfigurationError();
	}
	
	this.setup = configuration.setup || function () { console.log("No setup required."); };
	this.teardown = configuration.teardown || function () { console.log("No teardown required."); };
	
	this.setup.bind(this);
	this.teardown.bind(this);
	
	this.testCases = [];
	
	if (configuration.testCases) {
		for (var i = 0; i < configuration.testCases.length; i += 1) {
			this.testCases.push(configuration.testCases[i]);
			
			// this.testCases[i]
		}
		console.log("TestSuite initial test cases loaded.", this);
		// TODO find reference to each constructor and prepare it for lifecycle management.
	}
};

TestSuite.prototype = {
	runTestSuite: function () {
		this.setup();
		for (var i = 0; i < this.testCases.length; i += 1) {
			try {
				this.testCases[i].runTests();
			}
			catch (e) {
				console.error(e);
			}
		}
		this.teardown();
	}
};



var TestCase = function (configuration) {
	this.name = configuration.name || false;
	this.unit = configuration.unit || false;
	
	this.setup = configuration.setup || function () { console.log("No setup required."); };
	this.teardown = configuration.teardown || function () { console.log("No teardown required."); };
	
	this.setup.bind(this);
	this.teardown.bind(this);
	
	if (this.name === false || this.unit === false) {
		throw new ConfigurationError();
	}
	
	this.tests = [];
	for (var test in configuration.tests) {

		if (configuration.tests.hasOwnProperty(test)) {

			var testMethod = configuration.tests[test];

			
				
			this.tests.push(function (test, testMethod) {
				console.log("Adding test method: " + test);
				return function () {
					
					Foundation.MessageController.sendMessage("test-executing", test);
					try {
						console.log("Test Will Run");
						Foundation.MessageController.sendMessage("test-results", testMethod.bind(this)());
						console.log("Test Did Run");
					}
					catch (e) {
						console.log("Test Did Fail");
						console.error(e);
						Foundation.MessageController.sendMessage("test-error", e);
					}
					
				}.bind(this);
			}.bind(this)(test, testMethod));
		}
		
	}
	
};

TestCase.prototype = {
	runTests : function () {
		this.setup();
		for (var i = 0; i < this.tests.length; i += 1) {
			try {
				console.log("Running test #" + (i + 1));
				this.tests[i]();
			}
			catch (e) {
				console.error(e);
			}
		}
		this.teardown();
	}
}

