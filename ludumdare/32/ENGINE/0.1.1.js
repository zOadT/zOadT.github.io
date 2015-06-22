System.register([], function (_export) {
	return {
		setters: [],
		execute: function () {
			"use strict";

			_export("default", function (args) {

				var app = this;

				var events = {};
				app.on = function (event, callback) {
					if (!events.hasOwnProperty(event)) {
						events[event] = [];
					};
					events[event].push(callback);
				};
				app.emit = function (event) {
					for (var _len = arguments.length, args = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
						args[_key - 1] = arguments[_key];
					}

					if (failed === true) return;
					if (events.hasOwnProperty(event)) {
						for (var i = 0; i < events[event].length; i++) {
							var _events$event;

							(_events$event = events[event])[i].apply(_events$event, args);
						};
					};
				};

				var logo = document.createElement("canvas");
				logo.width = 20;
				logo.height = 20;
				var logoCtx = logo.getContext("2d");
				logoCtx.fillStyle = "#FFD800";
				logoCtx.fillRect(1, 5, 4, 2);
				logoCtx.fillStyle = "#007F0E";
				logoCtx.fillRect(5, 3, 4, 4);
				logoCtx.fillStyle = "#FFFFFF";
				logoCtx.fillRect(5, 7, 4, 2);
				logoCtx.fillStyle = "#404040";
				logoCtx.fillRect(5, 9, 4, 4);
				logoCtx.fillStyle = "#A0A0A0";
				logoCtx.fillRect(9, 9, 6, 2);
				logoCtx.fillStyle = "#808080";
				logoCtx.fillRect(15, 9, 4, 2);
				logoCtx.fillRect(9, 11, 8, 2);
				logoCtx.fillStyle = "#FF6A00";
				logoCtx.fillRect(11, 13, 2, 4);
				logoCtx.fillRect(9, 15, 2, 2);

				// store time in step calls
				app.time = 0;
				// canvas for loading- and errorscreen
				function initEngineCanvas() {
					canvas.width = window.innerWidth;
					canvas.height = window.innerHeight;

					ctx.imageSmoothingEnabled = false;
					ctx.mozImageSmoothingEnabled = false;
					ctx.webkitImageSmoothingEnabled = false;
					ctx.msImageSmoothingEnabled = false;
				};

				function shortenFilename(string) {
					var fullPath = string;

					var length = string.lastIndexOf("/");
					string = string.substring(0, length);

					length = string.lastIndexOf("/");
					string = string.substring(0, length);

					string = fullPath.substring(string.length + 1);

					return string;
				};

				var failed = false;
				app.error = function (err) {
					//delete currenscrene (to delete eventlisteners)

					//wirklich nötig?
					app.emit("error", err);

					if (failed) return;
					failed = true;

					// by loading error false
					if (args.canvas.parentElement !== null) {
						document.body.removeChild(args.canvas);
						document.body.appendChild(canvas);
					};

					var message = err.message.replace("Uncaught ", "");

					window.cancelAnimationFrame(animationFrameId);

					(function errorScreen() {
						//globalcomp setzten, sonst könnte es zu unterschiedl screens kommen;

						initEngineCanvas();

						ctx.font = "11px sans-serif";
						ctx.fillStyle = "#005784";
						ctx.fillRect(0, 0, canvas.width, canvas.height);

						ctx.translate(canvas.width / 2 | 0, canvas.height / 2 | 0);

						ctx.textAlign = "center";
						ctx.textBaseline = "top";
						ctx.fillStyle = "white";

						ctx.fillText(message, 0, 60);
						if (err.filename) ctx.fillText("File: " + shortenFilename(err.filename), 0, 75);
						if (err.lineno) ctx.fillText("Line: " + err.lineno, 0, 90);

						ctx.fillText("Sorry dude :(", 0, 110);

						ctx.scale(6, -6);

						ctx.drawImage(logo, -10, -10);

						window.requestAnimationFrame(errorScreen);
					})();
				};
				// show error-screen if error appears
				window.addEventListener("error", app.error);
				// canvas
				var canvas = document.querySelector(args.canvas);
				var ctx = canvas.getContext("2d");

				var loader = {
					total: 0,
					loaded: 0,

					add: function add() {
						loader.total++;
					},
					ready: function ready() {
						loader.loaded++;
					},
					error: function error(err) {
						var message;
						if (err.type === "error") {
							message = "loading error: unable to load " + shortenFilename(err.path[0].src);
						} else {
							//system.js returns String by error
							message = err;
						};
						app.error({
							message: message });
					} };

				args.canvas = document.createElement("canvas");
				args.loader = loader;

				(function () {
					// load all modules
					var _iteratorNormalCompletion = true;
					var _didIteratorError = false;
					var _iteratorError = undefined;

					try {
						for (var _iterator = args.modules[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
							var moduleName = _step.value;

							loader.add();
							System["import"]("ENGINE/MODULES/" + moduleName).then(function (module) {
								// initiate module
								module["default"](app, args);
								loader.ready();
							}, loader.error);
						}
					} catch (err) {
						_didIteratorError = true;
						_iteratorError = err;
					} finally {
						try {
							if (!_iteratorNormalCompletion && _iterator["return"]) {
								_iterator["return"]();
							}
						} finally {
							if (_didIteratorError) {
								throw _iteratorError;
							}
						}
					}

					;

					loadingLoop(loader);
				})();

				function loadingLoop(loader) {
					// WARNING: SUPER HACKY

					initEngineCanvas();

					var minimalDuration = 800;
					var startDuration = 600;
					var endDuration = 400;
					// no loading indev
					if (window.location.hostname === "localhost") minimalDuration = startDuration = endDuration = 0;
					// update
					if (loader.startTime === undefined && document.hidden === false) {
						loader.startTime = Date.now();
					};
					var startProgress = Math.min((Date.now() - loader.startTime) / startDuration, 1);

					var percent = Math.min(loader.loaded / loader.total, (Date.now() - loader.startTime - startDuration) / minimalDuration, 1);
					if (startProgress < 1) percent = 0;

					var endProgress = loader.endTime !== undefined ? Math.min((Date.now() - loader.endTime) / endDuration, 1) : 0;

					if (percent >= 1 && loader.endTime === undefined) {
						loader.endTime = Date.now();
					};

					//render
					function easeOutBack(percent) {
						var s = 2.5;
						return (percent - 1) * (percent - 1) * ((s + 1) * (percent - 1) + s) + 1;
					};
					function easeOutBounce(percent) {
						if (percent < 1 / 2.5) {
							return 6.25 * Math.pow(percent, 2);
						} else if (percent < 2 / 2.5) {
							return 6.25 * Math.pow(percent - 1.5 / 2.5, 2) + 0.75;
						} else {
							return 6.25 * Math.pow(percent - 2.25 / 2.5, 2) + 0.9375;
						};
					};
					function easeOutQuint(percent) {
						return Math.pow(percent - 1, 5) + 1;
					};
					var scaleProgress = startProgress < 1 ? easeOutBounce(startProgress) : easeOutBack(1 - endProgress);

					ctx.save();

					ctx.globalAlpha = easeOutQuint(Math.min(startProgress, 1 - endProgress));
					ctx.translate(canvas.width / 2 | 0, canvas.height / 2 | 0);

					ctx.scale(6, 6);

					ctx.clearRect(-40, -40, 80, 80);

					ctx.fillStyle = "#343434";
					ctx.fillRect(-11, 10, 22, 2);
					ctx.fillStyle = "#CCCCCC";

					ctx.fillRect(-11, 10, 22 * percent, 2);

					ctx.scale(scaleProgress, scaleProgress);

					ctx.drawImage(logo, -10, -10);

					ctx.restore();

					if (endProgress >= 1) {
						app.emit("load");
						startLoop();
					} else {
						animationFrameId = window.requestAnimationFrame(function () {
							loadingLoop(loader);
						});
					};
				};

				// loop
				// ensures step gets called 60 times per seconds
				var animationFrameId;
				function startLoop() {

					document.body.appendChild(args.canvas);
					document.body.removeChild(canvas);

					var FPS = 60;
					var lag = 0;
					var previous = Date.now() * FPS;

					(function loop() {

						animationFrameId = window.requestAnimationFrame(loop);

						var current = Date.now() * FPS;
						var elapsed = current - previous;
						// avoid time "jumps" caused by lags
						if (elapsed >= 250 * FPS) {
							elapsed = 0;
						};

						previous = current;
						lag += elapsed;

						while (lag >= 1000) {
							app.emit("step");
							app.emit("poststep");

							lag -= 1000;
							app.time++;
						};

						app.emit("preframe");
						app.emit("frame");
						app.emit("postframe");
					})();
				};
			});

			// TODO: time prop zu inputobjecten? redundantz mit events?
		}
	};
});