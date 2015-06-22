System.register([], function (_export) {
	return {
		setters: [],
		execute: function () {
			// TODO: number of connected touchs (Game.touches.connected?), force, radius, active replaces connected?
			// TODO: window oder canvas? vllt von länge(argumente) vom callback abhängig machen
			// TODO: bei touch end checken ob touchmove gecallt werden muss

			"use strict";

			_export("default", function (app, _ref) {
				var canvas = _ref.canvas;

				// public object to access touch states
				app.touches = [];
				// on iOS the native identifer property is a random number
				// we want the indexes to be stored like on most browsers:
				// first touch index 0, second touch index 1 ...
				var touchIndexes = [];

				canvas.addEventListener("touchstart", function (e) {

					e.preventDefault();
					// cache changed touches
					var touches = e.changedTouches;

					for (var i = 0; i < touches.length; i++) {

						var index = 0;
						while (index < app.touches.length && touchIndexes[index] !== false) {
							index++;
						};
						// create new object if app.touches is full
						if (index === app.touches.length) {
							app.touches.push({ index: index });
							//	touchIndexes.push(touches[i].identifier);
						};

						touchIndexes[index] = touches[i].identifier;

						// set position of touch
						app.touches[index].x = (touches[i].pageX - canvas.offsetLeft) * app.width / parseInt(canvas.style.width);
						app.touches[index].y = (touches[i].pageY - canvas.offsetTop) * app.height / parseInt(canvas.style.height);
						// save inital position of touch
						app.touches[index].startX = app.touches[index].x;
						app.touches[index].startY = app.touches[index].y;
						// movement is initially zero
						app.touches[index].movementX = 0;
						app.touches[index].movementY = 0;
						// set touch object active
						app.touches[index].connected = true;
						// emit event
						// second parameter ensures compatibility with mouseevents
						app.emit("touchdown", app.touches[index], 0);
					};
				});

				canvas.addEventListener("touchend", function (e) {
					e.preventDefault();
					// cache changed touches
					var touches = e.changedTouches;

					for (var i = 0; i < touches.length; i++) {

						var index = touchIndexes.indexOf(touches[i].identifier);
						touchIndexes[index] = false;
						// set touch object inactive
						// object does not get deleted
						// last state is still available
						app.touches[index].connected = false;
						// emit event
						app.emit("touchup", app.touches[index], 0);
					};
				});

				canvas.addEventListener("touchmove", function (e) {
					e.preventDefault();
					// cache changed touches
					var touches = e.changedTouches;

					for (var i = 0; i < touches.length; i++) {

						var index = touchIndexes.indexOf(touches[i].identifier);
						// cache new position
						var x = (touches[i].pageX - canvas.offsetLeft) * app.width / parseInt(canvas.style.width);
						var y = (touches[i].pageY - canvas.offsetTop) * app.height / parseInt(canvas.style.height);
						// calculate movement [new position - old position]
						// [+=] because mousemove can get invoked multiple times between two steps
						app.touches[index].movementX += x - app.touches[index].x;
						app.touches[index].movementY += y - app.touches[index].y;
						// set new position
						app.touches[index].x = x;
						app.touches[index].y = y;
					};
				});
				// set movement to zero after every step
				app.on("poststep", function () {
					for (var index = 0; index < app.touches.length; index++) {
						if (app.touches[index].movementX !== 0 || app.touches[index].movementY !== 0) {
							// emit touchmove here (invokes it only one time between steps);
							app.emit("touchmove", app.touches[index]);
							// set movement to zero after every step
							app.touches[index].movementX = 0;
							app.touches[index].movementY = 0;
						};
					};
				});
				// onblur BRINGT NICHTS :(
				window.addEventListener("blur", function () {

					app.keyboard.connected = false;

					for (var index = 0; index < app.touches.length; index++) {
						if (app.touches[index].connected === true) {

							app.touches[index].connected = false;

							app.emit("touchup", app.touches[index], 0);
						};
					};
				});

				app.touches[Symbol.iterator] = regeneratorRuntime.mark(function callee$1$0() {
					var i;
					return regeneratorRuntime.wrap(function callee$1$0$(context$2$0) {
						while (1) switch (context$2$0.prev = context$2$0.next) {
							case 0:
								i = 0;

							case 1:
								if (!(i < app.touches.length)) {
									context$2$0.next = 9;
									break;
								}

								if (!app.touches[i].connected) {
									context$2$0.next = 5;
									break;
								}

								context$2$0.next = 5;
								return app.touches[i];

							case 5:
								;

							case 6:
								i++;
								context$2$0.next = 1;
								break;

							case 9:
								;

							case 10:
							case "end":
								return context$2$0.stop();
						}
					}, callee$1$0, this);
				});
			});
		}
	};
});