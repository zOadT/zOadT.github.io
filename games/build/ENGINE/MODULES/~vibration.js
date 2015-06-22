System.register([], function (_export) {
	return {
		setters: [],
		execute: function () {
			// TODO: batterie berücksichtigen
			// TODO: zeit in frames

			"use strict";

			_export("default", function (app) {

				if (!("vibrate" in navigator)) {
					navigator.vibrate = navigator.webkitVibrate || navigator.mozVibrate || navigator.msVibrate || function () {};
				};

				app.vibrate = function (duration) {
					navigator.vibrate(duration * 1000 / 60);
				};
			});
		}
	};
});