System.register([], function (_export) {
	return {
		setters: [],
		execute: function () {
			"use strict";

			_export("default", function (app, _ref) {
				var canvas = _ref.canvas;
				var width = _ref.width;
				var height = _ref.height;
				var loader = _ref.loader;
				var _ref$images = _ref.images;
				var images = _ref$images === undefined ? [] : _ref$images;

				app.ctx = canvas.getContext("2d", { alpha: false });

				if (!("imageSmoothingEnabled" in app.ctx)) {
					Object.defineProperty(app.ctx, "imageSmoothingEnabled", {
						set: function set(value) {
							app.ctx.mozImageSmoothingEnabled = value;
							app.ctx.webkitImageSmoothingEnabled = value;
							app.ctx.msImageSmoothingEnabled = value;
						},
						get: function get() {
							return app.ctx.mozImageSmoothingEnabled || app.ctx.webkitImageSmoothingEnabled || app.ctx.msImageSmoothingEnabled;
						} });
				};

				app.ctx.images = {};
				// load images and add references to ctx
				// convert to array
				if (typeof images === "string") {
					images = [images];
				};
				// loop through items and initialize them
				//for(let name of images) {
				for (var i = 0; i < images.length; i++) {
					var _name = images[i];

					loader.add();
					app.ctx.images[_name] = new Image();
					app.ctx.images[_name].src = "images/" + _name + ".png";
					app.ctx.images[_name].addEventListener("load", loader.ready);
					app.ctx.images[_name].addEventListener("error", loader.error);
				};

				var zoom;
				app.width = width;
				app.height = height;
				function fitToScreen() {

					if (width === undefined) {
						app.width = 0;
					};
					if (height === undefined) {
						app.height = 0;
					};

					zoom = Math.min(window.innerWidth / app.width, window.innerHeight / app.height);
					// if both dimensions are undefined
					if (zoom === Infinity) {
						zoom = 1;
					};

					if (app.width === 0) {
						app.width = window.innerWidth / zoom;
					}
					if (app.height === 0) {
						app.height = window.innerHeight / zoom;
					};

					// position canvas
					canvas.style.width = "" + Math.round(app.width * zoom) + "px";
					canvas.style.height = "" + Math.round(app.height * zoom) + "px";
					canvas.style.left = "" + ((window.innerWidth - app.width * zoom) / 2 | 0) + "px";
					canvas.style.top = "" + ((window.innerHeight - app.height * zoom) / 2 | 0) + "px";

					var devicePixelRatio = window.devicePixelRatio || 1;
					var backingStoreRatio = app.ctx.backingStorePixelRatio || app.ctx.mozBackingStorePixelRatio || app.ctx.webkitBackingStorePixelRatio || app.ctx.msBackingStorePixelRatio || app.ctx.oBackingStorePixelRatio || 1;

					var ratio = devicePixelRatio / backingStoreRatio;
					// prevent antializing in Firefox and IE
					if (!/WebKit/.test(navigator.userAgent)) {
						zoom = Math.ceil(zoom);
					};

					canvas.width = Math.round(app.width * zoom) * ratio;
					canvas.height = Math.round(app.height * zoom) * ratio;

					zoom *= ratio;
					app.ctx.imageSmoothingEnabled = false;

					app.width = Math.round(app.width);
					app.height = Math.round(app.height);
				};

				fitToScreen();
				window.addEventListener("resize", /*function(){window.setTimeout(*/fitToScreen /*, 0)}*/);

				// clear and reset all properties of ctx
				app.ctx.reset = function () {

					this.setTransform(1, 0, 0, 1, 0, 0);
					this.clearRect(0, 0, app.width, app.height);
				};

				app.on("preframe", function () {
					app.ctx.reset();
				});

				app.ctx.setTransform = function (a, b, c, d, e, f) {
					CanvasRenderingContext2D.prototype.setTransform.call(this, a * zoom, b, c, d * zoom, e * zoom, f * zoom);
				};

				app.ctx.drawImage = function (image) {
					var _CanvasRenderingContext2D$prototype$drawImage;

					for (var _len = arguments.length, args = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
						args[_key - 1] = arguments[_key];
					}

					(_CanvasRenderingContext2D$prototype$drawImage = CanvasRenderingContext2D.prototype.drawImage).call.apply(_CanvasRenderingContext2D$prototype$drawImage, [this, app.ctx.images[image]].concat(args));
				};

				app.ctx.createPattern = function (image) {
					var _CanvasRenderingContext2D$prototype$createPattern;

					for (var _len = arguments.length, args = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
						args[_key - 1] = arguments[_key];
					}

					(_CanvasRenderingContext2D$prototype$createPattern = CanvasRenderingContext2D.prototype.createPattern).call.apply(_CanvasRenderingContext2D$prototype$createPattern, [this, app.ctx.images[image]].concat(args));
				};

				//textalign berucksichtigen
				function TextBox(text, x, y, width, ctx, callback) {
					var lineHeight = parseFloat(ctx.font); //+/^\d+/.exec(ctx.font);

					var words = text.split(" ");
					var lineText = words[0];
					for (var i = 1; i < words.length; i++) {
						if (ctx.measureText(lineText + " " + words[i]).width > width) {
							callback(lineText, x, y);
							y += lineHeight;
							lineText = words[i];
						} else {
							lineText += " " + words[i];
						};
					};
					callback(lineText, x, y);
				};
				app.ctx.fillText = function (text, x, y, width, height) {
					if (arguments.length <= 3) {
						CanvasRenderingContext2D.prototype.fillText.apply(this, arguments);
					} else {
						TextBox(text, x, y, width, this, CanvasRenderingContext2D.prototype.fillText.bind(this));
					};
				};
				app.ctx.strokeText = function (text, x, y, width, height) {
					if (arguments.length <= 3) {
						CanvasRenderingContext2D.prototype.strokeText.apply(this, arguments);
					} else {
						TextBox(text, x, y, width, this, CanvasRenderingContext2D.prototype.strokeText.bind(this));
					};
				};

				app.ctx.isPointInPath = undefined;
				app.ctx.getImageData = undefined;

				//machs jetzt einfach mal unschön :D später vereinheitlichen
				app.ctx.createLayer = function (name, width, height) {

					var canvas = document.createElement("canvas");
					canvas.width = width;
					canvas.height = height;

					app.ctx.images[name] = canvas;

					var ctx = canvas.getContext("2d");

					if (!("imageSmoothingEnabled" in ctx)) {
						Object.defineProperty(ctx, "imageSmoothingEnabled", {
							set: function set(value) {
								ctx.mozImageSmoothingEnabled = value;
								ctx.webkitImageSmoothingEnabled = value;
								ctx.msImageSmoothingEnabled = value;
							},
							get: function get() {
								return ctx.mozImageSmoothingEnabled || ctx.webkitImageSmoothingEnabled || ctx.msImageSmoothingEnabled;
							} });
					};

					ctx.imageSmoothingEnabled = false;

					ctx.reset = app.ctx.reset;
					//	ctx.setTransform = app.ctx.setTransform;
					ctx.drawImage = app.ctx.drawImage;
					ctx.createPattern = app.ctx.createPattern;
					ctx.fillText = app.ctx.fillText;
					ctx.strokeText = app.ctx.strokeText;
					//	ctx.isPointInPath = app.ctx.isPointInPath;
					//	ctx.getImageData = app.ctx.getImageData;

					return ctx;
				};

				function getLayer() {}

				//	class Graphic {};
			});
		}
	};
});