System.register([], function (_export) {
	return {
		setters: [],
		execute: function () {
			/*\
    *	
    *	Scenenzeit sollte eingebracht werden
    *	
   \*/

			"use strict";

			_export("default", function (app) {

				var timeouts = [];
				var timeoutId = 0;

				app.setTimeout = function (callback, frames) {
					timeouts.push({
						callback: callback,
						callTime: app.time + frames,
						id: timeoutId });

					return timeoutId++;
				};

				app.clearTimeout = function (id) {
					for (var i = 0; i < timeouts.length; i++) {
						if (timeouts[i].id === id) {
							timeouts.splice(i, 1);
							break;
						};
					};
				};

				app.on("poststep", function () {
					for (var i = 0; i < timeouts.length; i++) {
						if (timeouts[i].callTime <= app.time) {
							timeouts[i].callback.call(app /*, timeouts[i].args*/);
							timeouts.splice(i--, 1);
						};
					};
				});
			});
		}
	};
});