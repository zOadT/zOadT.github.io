System.register([], function (_export) {
	return {
		setters: [],
		execute: function () {
			// mouse(lock, wheel, click)
			// TODO: mouseleave etc rein, bei button checken ob zustand richtig(wie bei keyboard
			// startX/Y muss irgendwie rein
			"use strict";

			_export("default", function (app, _ref) {
				var canvas = _ref.canvas;

				canvas.requestPointerLock = canvas.requestPointerLock || canvas.mozRequestPointerLock || function () {};
				document.exitPointerLock = document.exitPointerLock || document.mozExitPointerLock || function () {};

				var isLocked = false;

				app.mouse = Object.defineProperties({
					x: undefined,
					y: undefined,
					movementX: 0,
					movementY: 0,

					buttons: [],
					wheel: 0,
					// set connected false as long as position is not defined
					connected: false }, {
					locked: {
						set: function (value) {
							if (value) {
								canvas.requestPointerLock();
							} else {
								document.exitPointerLock();
							};
							isLocked = value;
						},
						get: function () {
							return isLocked;
						},
						configurable: true,
						enumerable: true
					}
				});

				for (var i = 0; i < 3; i++) {
					app.mouse.buttons[i] = { pressed: false, value: 0 };
				};
				// events
				canvas.addEventListener("mousedown", function (e) {

					if (app.mouse.x === undefined && app.mouse.y === undefined) {
						// wirklich drin lassen? move wird nach up gecallt
						app.mouse.x = (e.pageX - canvas.offsetLeft) * app.width / parseInt(canvas.style.width);
						app.mouse.y = (e.pageY - canvas.offsetTop) * app.height / parseInt(canvas.style.height);
					};

					app.mouse.buttons[e.which - 1].pressed = true;
					app.mouse.buttons[e.which - 1].value = 1;
					// lock mouse if locked
					if (app.mouse.locked === true) {
						canvas.requestPointerLock();
					};
					// emit event
					app.emit("mousedown", app.mouse, e.which - 1);
				});
				window.addEventListener("mouseup", function (e) {

					if (app.mouse.buttons[e.which - 1].pressed === true) {
						app.mouse.buttons[e.which - 1].pressed = false;
						app.mouse.buttons[e.which - 1].value = 0;
						// emit event
						app.emit("mouseup", app.mouse, e.which - 1);
					};
				});
				window.addEventListener("mousemove", function (e) {

					//unschön mit args
					var x = (e.pageX - canvas.offsetLeft) * app.width / parseInt(canvas.style.width);
					var y = (e.pageY - canvas.offsetTop) * app.height / parseInt(canvas.style.height);

					if (app.mouse.connected === true) {
						//noch falsch
						// [+=] because this eventhandler can get invoked multiple times between two steps
						// last case [|| 0] just if app.mouse.x/y are still undefined
						app.mouse.movementX += (e.movementX || e.mozMovementX || e.webkitMovementX) * app.width / parseInt(canvas.style.width) || x - app.mouse.x || 0;
						app.mouse.movementY += (e.movementY || e.mozMovementY || e.webkitMovementY) * app.height / parseInt(canvas.style.height) || y - app.mouse.y || 0;
					} else {
						//müssen wird das zeug auf 0 setzten?
						app.mouse.movementX = 0;
						app.mouse.movementY = 0;
					};
					app.mouse.x = x;
					app.mouse.y = y;

					app.mouse.connected = true;
					// we call scene.onmousemove by stepSubsciber function to make sure it only gets called once between steps
				});
				// given function gets called after scene.step
				app.on("poststep", function () {
					if (app.mouse.movementX !== 0 || app.mouse.movementY !== 0) {
						// emit mousemove here (invokes it only one time between steps);
						app.emit("mousemove", app.mouse);
						// set movement to zero after every step
						app.mouse.movementX = 0;
						app.mouse.movementY = 0;
					};
				});

				// mousewheel
				function wheelHandler(e) {

					var delta = Math.max(-1, Math.min(1, e.wheelDelta || -e.detail));

					app.mouse.wheel += delta;
					app.emit("mousewheel", app.mouse, delta);
				};
				if (window.onmousewheel) {
					canvas.addEventListener("mousewheel", wheelHandler, false);
				}
				// support for Firefox:
				else {
					canvas.addEventListener("DOMMouseScroll", wheelHandler, false);
				};

				// if window lose focus set all buttons to false
				window.addEventListener("blur", function () {

					app.mouse.connected = false;

					for (var i = 0; i < 3; i++) {
						if (app.mouse.buttons[i].pressed) {
							app.emit("mouseup", app.mouse, i);

							app.mouse.buttons[i].pressed = false;
							app.mouse.buttons[i].value = 0;
						};
					};
				});
				window.addEventListener("focus", function () {
					app.mouse.connected = true;
				});
				// deactivate contextmenu
				document.addEventListener("contextmenu", function (e) {
					e.preventDefault();
				});
			});
		}
	};
});