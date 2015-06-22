System.register([], function (_export) {
	return {
		setters: [],
		execute: function () {
			"use strict";

			_export("default", function (app, _ref) {
				var id = _ref.id;

				window.addEventListener("beforeunload", function () {
					localStorage.setItem(id, JSON.stringify(app.storage));
				});

				if (localStorage) {
					app.storage = JSON.parse(localStorage.getItem(id)) || {};
				};
			});
		}
	};
});