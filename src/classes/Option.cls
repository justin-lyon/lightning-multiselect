public with sharing class Option {
	public String label {get;set;}
	public String value {get;set;}
	public Boolean selected {get;set;}

	public Option(String l, String v) {
		this(l, v, false);
	}

	public Option(String l, String v, Boolean s) {
		this.label = l;
		this.value = v;
		this.selected = s;
	}
}