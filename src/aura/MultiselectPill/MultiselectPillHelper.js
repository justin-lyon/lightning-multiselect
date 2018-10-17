({
	fireRemoveItem : function(cmp) {
		var remove = cmp.getEvent("remove");
		remove.setParams({
			label: cmp.get("v.label"),
			value: cmp.get("v.value"),
			selected: false
		});
		remove.fire();
	}
})