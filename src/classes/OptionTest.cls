@isTest
private class OptionTest {

	static TestMethod void constructor_givenLabelValuePair_shouldConstruct() {
		String label = 'l';
		String value = 'v';
		Option opt;

		Test.startTest();

			opt = new Option(label, value);

		Test.stopTest();

		System.assertNotEquals(null, opt, 'Option should have constructed');
	}
}