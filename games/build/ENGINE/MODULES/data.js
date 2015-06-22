System.register([], function (_export) {
	return {
		setters: [],
		execute: function () {
			"use strict";

			_export("default", function (app, _ref) {
				var loader = _ref.loader;
				var _ref$data = _ref.data;
				var data = _ref$data === undefined ? [] : _ref$data;

				app.data = {};

				if (typeof data === "string") {
					data = [data];
				};
				// loop through items and initialize them
				for (var i = 0; i < data.length; i++) {
					var request;

					(function () {

						loader.add();
						var name = data[i];

						request = new XMLHttpRequest();

						request.open("GET", "data/" + name + ".json", true);

						request.onload = function () {
							if (this.status === 200) {
								try {
									app.data[name] = JSON.parse(this.response);
									loader.ready();
								} catch (e) {
									//loader error nehmen?
									app.error({
										message: "SyntaxError: " + e.message,
										filename: "/data/" + name + ".json" });
								};
							} else {
								loader.error( //{
								//	type: "error",
								//	message:
								"loading error: unable to load data/" + name + ".json" //,
								//	filename: `/data/${name}.json`,
								//}
								);
							};
						};

						//	request.onerror = loader.error;
						//	request.onerror = loader.error.call(loader);

						request.send();
					})();
				};
			});
		}
	};
});