System.register([], function (_export) {
	return {
		setters: [],
		execute: function () {
			// IE ist eig ned supportet

			"use strict";

			_export("default", function (app, _ref) {
				var canvas = _ref.canvas;

				if (!("requestFullscreen" in canvas)) {
					canvas.requestFullscreen = canvas.mozRequestFullScreen || canvas.webkitRequestFullscreen || canvas.msRequestFullscreen || function () {};

					document.exitFullscreen = document.mozCancelFullScreen || document.webkitExitFullscreen || document.msExitFullscreen || function () {};
				};

				Object.defineProperty(app, "fullscreen", {
					set: function set(value) {
						if (value) {
							canvas.requestFullscreen();
						} else {
							document.exitFullscreen();
						};
					},
					get: function get() {} });
			});
		}
	};
});

//todo, beachte, user kann mauell rein und abbrechen