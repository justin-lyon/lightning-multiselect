({
	init: function(cmp, event, helper) {
		helper.requestOptions(cmp, helper);
	},

	onValidate: function(cmp, event, helper) {
		return helper.validate(cmp);
	},

	onKeydown: function(cmp, event, helper) {
		var keyboard = {
			40: helper.onDownArrow, // down,
			38: helper.onUpArrow, // up,
			13: helper.onEnterKey, // enter,
			27: helper.onEscKey, // esc
			9: helper.onTabKey, // tab
		};

		if(keyboard[event.keyCode]) {
			keyboard[event.keyCode](cmp, helper);
		}
	},

	onHover: function(cmp, event, helper) {
		var option = event.getParams();
		helper.assignActiveItem(cmp, option);
	},

	onFocusout: function(cmp, event, helper) {
		helper.validate(cmp);
	},

	onValueChange: function(cmp, event, helper) {
		helper.syncOptions(cmp, helper);
	},

	onInputClick: function(cmp, event, helper) {
		helper.expandListbox(cmp);
	},

	handleOptionEvent: function(cmp, event, helper) {
		var item = event.getParams();
		helper.mergeOptionSelection(cmp, item);
		helper.syncSelections(cmp, helper);

		if(event.getType() === 'c:E_Option') {
			helper.focusInput(cmp);
		}
	}
})