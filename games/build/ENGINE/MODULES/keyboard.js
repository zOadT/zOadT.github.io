System.register([], function (_export) {
	return {
		setters: [],
		execute: function () {
			//TODO: keys als string statt zahl
			"use strict";

			_export("default", function (app) {

				var keyCodes = {
					37: "LEFT",
					38: "UP",
					39: "RIGHT",
					40: "DOWN",
					13: "ENTER",
					16: "SHIFT",
					17: "CTRL",
					18: "ALT",
					27: "ESC",
					32: "SPACE" };

				// public object to access key states
				app.keyboard = {
					buttons: [],
					connected: true };
				// initialize buttons
				for (var key = 0; key < 227; key++) {
					app.keyboard.buttons[key] = { pressed: false, value: 0 };
					app.keyboard.buttons[getKeyName(key)] = app.keyboard.buttons[key];
				};

				function getKeyName(keyCode) {
					if (keyCode >= 48 && keyCode <= 90) {
						return String.fromCharCode(keyCode);
					} else if (keyCodes[keyCode]) {
						return keyCodes[keyCode];
					} else {
						return keyCode;
					};
				};

				window.addEventListener("keydown", function (e) {
					var key = e.keyCode;
					// keep functionality for F## buttons!
					if (!(112 <= key && key <= 123)) {
						e.preventDefault();
					} else {
						return;
					};
					// prevent browser to call keydown multiple times
					if (app.keyboard.buttons[key].pressed === false) {
						app.keyboard.buttons[key].pressed = true;
						app.keyboard.buttons[key].value = 1;

						app.emit("keydown", app.keyboard, getKeyName(key));
					};
				});
				window.addEventListener("keyup", function (e) {
					var key = e.keyCode;

					if (!(112 <= key && key <= 123)) {
						e.preventDefault();
					} else {
						return;
					};
					// can already be false if window had lost focus//wirklich?, key wird bei focus wieder aktiviert
					if (app.keyboard.buttons[key].pressed === true) {
						app.keyboard.buttons[key].pressed = false;
						app.keyboard.buttons[key].value = 0;

						app.emit("keyup", app.keyboard, getKeyName(key));
					};
				});
				window.addEventListener("blur", function () {

					app.keyboard.connected = false;

					for (var key = 0; key < 222; key++) {
						if (app.keyboard.buttons[key].pressed === true) {

							app.keyboard.buttons[key].pressed = false;
							app.keyboard.buttons[key].value = 0;

							app.emit("keyup", app.keyboard, getKeyName(key));
						};
					};
				});
				window.addEventListener("focus", function () {

					app.keyboard.connected = true;
				});
			});
		}
	};
});