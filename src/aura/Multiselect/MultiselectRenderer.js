({
	afterRender: function(cmp, helper) {
		this.superAfterRender();

		// interact with the DOM here
		var onClick = (function(cmp, helper) {
			var globalId = cmp.getGlobalId();

			var handler = function(event) {
				var containingMulti = event.target ? event.target.closest('.cMultiselect') : null;
				var innerMulti = event.target ? event.target.querySelector('.cMultiselect') : null;

				if(cmp.isValid()) {
					if(!containingMulti && innerMulti
						|| containingMulti && containingMulti.dataset.globalId !== globalId) {

						helper.collapseListBox(cmp, helper);
					}
				} else {
					window.removeEventListener('click', handler);
				}
			};
			return handler;
		})(cmp, helper);

		window.addEventListener('click', onClick);
	}
})