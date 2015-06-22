System.register([], function (_export) {
	return {
		setters: [],
		execute: function () {
			"use strict";

			_export("default", function (app) {

				window.addEventListener("devicemotion", handler, false);

				var x = 0,
				    y = 0,
				    z = 0;

				app.acceleration = {};

				function handler(e) {
					var data = e.accelerationIncludingGravity;

					x = -data.x;
					y = data.y;
					z = data.z;

					//	window.orientation ned def!!
					//webkir browser doesn't change values by rotation device
					/*if(/WebKit/.test(navigator.userAgent)) {
     	var r = (+window.orientation / 90 + 4) % 4;
     	
     	while(r > 0) {
     		var hold = x;
     		x = y;
     		y = -hold;
     		r--;
     	};
     };*/
				};
			});
		}
	};
});