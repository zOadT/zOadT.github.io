System.register([], function (_export) {
	return {
		setters: [],
		execute: function () {
			//http://www.sitepoint.com/screen-orientation-api-reloaded/

			// nur auf mobile einsetzen
			// wenn width und height undefined
			// fullscreen required
			// ie ist btw mom gar ned supportet
			"use strict";

			_export("default", function (app, _ref) {
				var canvas = _ref.canvas;
				var width = _ref.width;
				var height = _ref.height;

				var orientation = height > width ? "portrait" : "landscape";

				if (!("orientation" in screen)) {
					// don't use screen.mozOrientation, it's too buggy!
					screen.lockOrientation = screen.msLockOrientation;
				};

				app.on("touchdown", function () {

					if (screen.orientation !== undefined) {

						app.fullscreen = true;
						if (screen.orientation.lock !== undefined) {
							// new API
							// blink
							screen.orientation.lock(orientation).then(function () {}, function () {});
						} else {
							// old API
							// IE
							setTimeout(function () {
								screen.lockOrientation(orientation);
							}, 0);
						};
					};
				});
			});
		}
	};
});

//app.fullscreen = false;