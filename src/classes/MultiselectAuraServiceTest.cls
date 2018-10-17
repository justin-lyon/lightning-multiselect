@isTest
private class MultiselectAuraServiceTest {

	static TestMethod void getPicklistOptions_givenValidField_shouldGetList() {
		String sObjectApiName = 'QuickText';
		String fieldApiName = 'Channel';
		Boolean isSuccess = false;
		Test.startTest();

			String response = MultiselectAuraService.getPicklistOptions(sObjectApiName, fieldApiName);

		Test.stopTest();

		List<Option> options = (List<Option>) JSON.deserialize(response, List<Option>.class);

		System.assert(String.isNotBlank(response));
		System.assertNotEquals(null, options);
	}

	static TestMethod void getPicklistOptions_givenInvalidField_shouldThrowAuraHandledException() {
		String sObjectApiName = 'Contact';
		String fieldApiName = 'FirstName';
		Boolean isSuccess = false;
		Test.startTest();

			try {
				MultiselectAuraService.getPicklistOptions(sObjectApiName, fieldApiName);
			} catch(AuraHandledException ahe) {
				isSuccess = true;
			}

		Test.stopTest();

		System.assert(isSuccess, 'Invalid field should throw AuraHandledException.');
	}
}