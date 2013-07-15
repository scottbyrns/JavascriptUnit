

var testCore = new TestCase({
	name: "Test Core",
	// The unit is the module or unit of software being tested. Provide a direct reference to a class or an instance.
	// This will be provided to each test.
	unit: Core,
	tests: {
		// Just keep adding tests here. All tests are scope bound to the test case so the unit can be referenced by this.unit.
		"test that the core exists": function () {
			Assert.assertNotUndefined("Asserting that the Core of the test framework is not undefined.", this.unit);
		}
	},
	// Setup the test.
	setup: function () {
		
	},
	// Tear any resources down that are no longer needed.
	teardown: function () {
		
	}
});

var myTestSuite = new TestSuite({
	name: "My Test Suite",
	// Keep appending your test cases to the array.
	testCases: [testCore],
	setup: function () {
		
	},
	teardown: function () {
		
	}
});
