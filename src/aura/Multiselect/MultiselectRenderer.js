({
	afterRender: function(cmp, helper) {
		this.superAfterRender();

		// interact with the DOM here
		var onClick = (function(cmp, helper) {
			var globalId = cmp.getGlobalId();

			var handler = function(event) {
				var containingMulti = event.target ? event.target.closest('.cMultiselect') : null;
				var innerMulti = event.target ? event.target.querySelector('.cMultiselect') : null;
				var allMulti = Array.from(document.querySelectorAll('.cMultiselect'));
				var hasManyMulti = allMulti.length && allMulti.length > 1;

				if(cmp.isValid()) {

					if(!containingMulti && innerMulti && hasManyMulti
						|| containingMulti && containingMulti.dataset.globalId !== globalId
						|| !containingMulti && !innerMulti) {

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