public with sharing class MultiselectAuraService {
	private static final String MULTISELECT_TYPE = 'MULTIPICKLIST';
	private static final String ERROR_MESSAGE = ' is not a multiselect picklist field.';

	@AuraEnabled
	public static String getPicklistOptions(String sObjectApiName, String fieldApiName) {
		List<Option> options = new List<Option>();
		List<Schema.PicklistEntry> entries = new List<Schema.PicklistEntry>();

		try {
			entries = describeMultiPicklistEntries(sObjectApiName, fieldApiName);

		} catch(Exception exc) {
			throw new AuraHandledException(exc.getMessage());
		}

		for(Schema.PicklistEntry ple : entries) {
			options.add(new Option(
				ple.getLabel(),
				ple.getValue()));
		}

		return JSON.serialize(options);
	}

	private static List<Schema.PicklistEntry> describeMultiPicklistEntries(String sObjectApiName, String fieldApiName) {
		Schema.SObjectType objType = Schema.getGlobalDescribe().get(sObjectApiName);
		Schema.SObjectField field = objType.getDescribe().fields.getMap().get(fieldApiName);

		if(String.valueOf(field.getDescribe().getType()) != MULTISELECT_TYPE) {
			throw new TypeException(sObjectApiName + '.' + fieldApiName + ERROR_MESSAGE);
		}

		return field.getDescribe().getPicklistValues();
	}
}