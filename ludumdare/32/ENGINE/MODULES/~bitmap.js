System.register([], function (_export) {
	return {
		setters: [],
		execute: function () {
			"use strict";

			_export("default", function (app, _ref) {
				var loader = _ref.loader;
				var _ref$bitmaps = _ref.bitmaps;
				var bitmaps = _ref$bitmaps === undefined ? [] : _ref$bitmaps;

				var bitmapsName = {};

				//	if(bitmaps !== undefined) {
				// convert to array
				if (typeof bitmaps === "string") {
					bitmaps = [bitmaps];
				};
				// loop through items and initialize them
				for (var i = 0; i < bitmaps.length; i++) {
					loader.add();
					var name = bitmaps[i];
					bitmapsName[name] = new Image();
					bitmapsName[name].src = "bitmaps/" + name + ".png";
					bitmapsName[name].addEventListener("load", loader.ready);
					bitmapsName[name].addEventListener("error", loader.error);
				};

				//	};

				var canvas = document.createElement("canvas");
				var ctx = canvas.getContext("2d");

				app.map = function (bitmapName, colors) {
					var bitmap = bitmapsName[bitmapName];
					canvas.width = bitmap.width;
					canvas.height = bitmap.height;
					ctx.drawImage(bitmap, 0, 0);

					var array = new Array(bitmap.width);
					for (var i = 0; i < array.length; i++) {
						array[i] = new Array(bitmap.height);
					};

					function colorToArray(string) {
						var rgb = string.match(/[^#]./g);
						for (var i = 0; i < 3; i++) {
							rgb[i] = parseInt(rgb[i], 16);
						};
						return rgb;
					};
					for (var i = 0; i < colors.length; i++) {
						colors[i] = colorToArray(colors[i]);
					};

					var data = ctx.getImageData(0, 0, canvas.width, canvas.height);

					for (var i = 0; i < data.data.length; i++) {
						for (var j = 0; j < colors.length; j++) {
							if (data.data[i * 4] === colors[j][0] && data.data[i * 4 + 1] === colors[j][1] && data.data[i * 4 + 2] === colors[j][2]) {
								array[i % bitmap.width][i / bitmap.height | 0] = j;
							};
						};
					};

					return array;
				};
			});
		}
	};
});