({
	clickItem: function(cmp, event, helper) {
		helper.selectItem(cmp);
		helper.fireClicked(cmp);
	},

	onHover: function(cmp, event, helper) {
		helper.fireHovered(cmp);
	}
})