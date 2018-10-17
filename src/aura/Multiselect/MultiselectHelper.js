({
	onDownArrow: function(cmp, helper) {
		var isExpanded = cmp.get("v.isExpanded");
		var activeItem = cmp.get("v.activeItem");
		var totalItems = cmp.get("v.totalItems");
		var nextItem = activeItem < totalItems - 1 ? activeItem + 1 : 0;

		isExpanded
			? helper.cycleItems(cmp, activeItem, nextItem)
			: helper.expandListbox(cmp);
	},

	onUpArrow: function(cmp, helper) {
		var isExpanded = cmp.get("v.isExpanded");
		var activeItem = cmp.get("v.activeItem");
		var totalItems = cmp.get("v.totalItems");
		var nextItem = activeItem > 0 ? activeItem - 1 : totalItems - 1;

		isExpanded
			? helper.cycleItems(cmp, activeItem, nextItem)
			: helper.expandListbox(cmp);
	},

	onEnterKey: function(cmp, helper) {
		var isExpanded = cmp.get("v.isExpanded");
		var activeItem = cmp.get("v.activeItem");

		isExpanded
			? helper.selectItem(cmp, activeItem)
			: helper.expandListbox(cmp);

		helper.syncSelections(cmp, helper);
	},

	onEscKey: function(cmp, helper) {
		if(cmp.get("v.isExpanded")) {
			helper.collapseListBox(cmp, helper);
		}
	},

	onTabKey: function(cmp, helper) {
		if(cmp.get("v.isExpanded")) {
			helper.collapseListBox(cmp, helper);
		}
	},

	expandListbox: function(cmp) {
		cmp.set("v.isExpanded", true);
		cmp.set("v.activeItem", 0);
		var options = cmp.get("v.options");
		var input = cmp.find("comboboxInput").getElement();
		input.value = options[0].label;
	},

	collapseListBox: function(cmp, helper) {
		cmp.set("v.isExpanded", false);
		helper.setInputValue(cmp);
	},

	setInputValue: function(cmp) {
		var input = cmp.find("comboboxInput").getElement();
		var selections = cmp.get("v.selections");

		input.value = selections.length
			? selections.length + ' Options Selected'
			: '';

		var options = cmp.get("v.options");
		if(options.length === 0) {
			input.value = 'N/A'
		}
	},

	setValue: function(cmp) {
		var selections = cmp.get("v.selections");
		var value;

		if(selections.length > 0) {
			value = selections.map(function(s) {
				return s.value;
			}).join(";");
		}

		cmp.set("v.value", value);
	},

	assignActiveItem: function(cmp, option) {
		var options = cmp.get("v.options");
		var newOptions = options
			.map(function(opt) {
				opt.focused = opt.value === option.value;
				return opt;
			});

		var activeIndex = newOptions.findIndex(function(opt) {
			return opt.value === option.value;
		});

		cmp.set("v.options", newOptions);
		cmp.set("v.activeItem", activeIndex);
	},

	cycleItems: function(cmp, previousIndex, nextIndex) {
		var options = cmp.get("v.options");

		options[previousIndex].focused = false;
		options[nextIndex].focused = true;

		var input = cmp.find("comboboxInput").getElement();
		input.value = options[nextIndex].label;

		cmp.set("v.options", options);
		cmp.set("v.activeItem", nextIndex);
	},

	mergeOptionSelection: function(cmp, newOption) {
		var options = cmp.get("v.options");
		var index = options.findIndex(function(opt) {
			return opt.value === newOption.value;
		});
		options[index].selected = newOption.selected;
		cmp.set("v.options", options);
	},

	selectItem: function(cmp, index) {
		var options = cmp.get("v.options");
		options[index].selected = !options[index].selected;
		cmp.set("v.options", options);
	},

	focusInput: function(cmp) {
		cmp.find('comboboxInput').getElement().focus();
	},

	syncOptions: function(cmp, helper) {
		var value = cmp.get("v.value");
		var values = value ? value.split(';') : [];
		var options = cmp.get("v.options")
			.map(function(opt) {
				opt.selected = values.includes(opt.value);
				return opt;
			});
		cmp.set("v.options", options);
		helper.syncSelections(cmp, helper);
	},

	syncSelections: function(cmp, helper) {
		var options = cmp.get("v.options");
		var selections = options.filter(function(opt) {
			return opt.selected;
		});

		cmp.set("v.selections", selections);

		helper.setInputValue(cmp);
		helper.setValue(cmp);
		helper.validate(cmp);
	},

	validate: function(cmp) {
		var selections = cmp.get("v.selections");
		var isRequired = cmp.get("v.required");

		var hasError = selections.length === 0 && isRequired
		cmp.set("v.hasError", hasError);
		cmp.set("v.validity", { valid: !hasError });
		console.log('multihelper', !hasError);
		return !hasError;
	},

	requestOptions: function(cmp, helper) {
		var getOptions = cmp.get("c.getPicklistOptions");
		var sObjectApiName = cmp.get("v.sObjectApiName");
		var fieldApiName = cmp.get("v.fieldApiName");

		getOptions.setParams({
			sObjectApiName: sObjectApiName,
			fieldApiName: fieldApiName
		});

		kit.promisify(getOptions)
			.then(helper.onSuccess(cmp))
			.catch(helper.onFailure(cmp));
	},

	onSuccess: function(cmp) {
		return function(result) {
			var options = JSON.parse(result.getReturnValue())
				.map(function(opt) {
					opt.focused = false;
					return opt;
				});

			if(options.length > 0) {
				options[0].focused = true;
			}

			cmp.set("v.options", options);
			cmp.set("v.totalItems", options.length);
		}
	},

	onFailure: function(cmp) {
		return function(result) {
			var errors = result.getError();
			console.error("Error(s) retrieving Picklist Values", JSON.parse(JSON.stringify(errors)));
			cmp.set("v.options", []);
		};
	}
})