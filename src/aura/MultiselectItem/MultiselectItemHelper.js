({
	selectItem: function(cmp) {
		cmp.set("v.isSelected", !cmp.get("v.isSelected"));
	},

	fireClicked: function(cmp) {
		var selectItem = cmp.getEvent("click");

		selectItem.setParams({
			label: cmp.get("v.label"),
			value: cmp.get("v.value"),
			selected: cmp.get("v.isSelected")
		});

		selectItem.fire();
	},

	fireHovered: function(cmp) {
		var hoveredItem = cmp.getEvent("hover");

		hoveredItem.setParams({
			label: cmp.get("v.label"),
			value: cmp.get("v.value"),
			selected: cmp.get("v.isSelected")
		});

		hoveredItem.fire();
	}
})