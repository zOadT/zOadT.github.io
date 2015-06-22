System.register([], function (_export) {
	return {
		setters: [],
		execute: function () {
			// BUG: beim rendern ist movement immer 0!
			// ist es aber ohnehin wenn mehrere step gecallt werden! trotzdem fixen?
			// iterator per generator muss inzw funken

			"use strict";

			_export("default", function (app) {
				// einbinden
				var keyCodes = {
					0: "A",
					1: "B",
					2: "X",
					3: "Y",
					4: "LB",
					5: "RB",
					6: "LT",
					7: "RT",
					8: "SELECT",
					9: "START",
					10: "left stick",
					11: "right stick",
					12: "UP",
					13: "DOWN",
					14: "LEFT",
					15: "RIGHT" };

				if (!("getGamepads" in navigator)) {
					navigator.getGamepads = navigator.webkitGetGamepads || function () {
						return [];
					};
				};

				function Gamepad(index) {
					this.index = index;
					this.buttons = [];
					// initialize buttons
					for (var key = 0; key < 16; key++) {
						this.buttons[key] = { pressed: false, value: 0, movement: 0 };
						this.buttons[keyCodes[key]] = this.buttons[key];
					};

					this.axes = [];
					// initialize axes
					for (var axe = 0; axe < 4; axe++) {
						this.axes[axe] = { value: 0, movement: 0 };
					};

					this.connected = false;
				};

				app.gamepads = [];
				for (var i = 0; i < 4; i++) {
					app.gamepads[i] = new Gamepad(i);
				};

				var disconnectedGamepad = new Gamepad();

				// some browser does not update gamepads automatically
				app.on("postframe", function () {
					var updatedGamepads = navigator.getGamepads();

					for (var i = 0; i < updatedGamepads.length; i++) {

						var gamepad = updatedGamepads[i];

						if (gamepad === undefined) gamepad = disconnectedGamepad;

						if (app.gamepads[i].connected !== gamepad.connected) {
							app.gamepads[i].connected = gamepad.connected;
							if (app.gamepads[i].connected) {
								app.emit("gamepadconnect", app.gamepads[i], i); //raus oder für keyboard auch?
							} else {
								app.emit("gamepaddisconnect", app.gamepads[i], i);
							};
						};

						for (var j = 0; j < Math.min(16, gamepad.buttons.length); j++) {
							if (app.gamepads[i].buttons[j].value !== gamepad.buttons[j].value) {

								app.gamepads[i].buttons[j].pressed = gamepad.buttons[j].pressed;
								app.gamepads[i].buttons[j].movement = gamepad.buttons[j].value - app.gamepads[i].buttons[j].value;
								app.gamepads[i].buttons[j].value = gamepad.buttons[j].value;

								if (app.gamepads[i].buttons[j].movement > 0) {
									app.emit("gamepaddown", app.gamepads[i], keyCodes[j]);
								} else {
									app.emit("gamepadup", app.gamepads[i], keyCodes[j]);
								};
							};
						};

						for (var j = 0; j < Math.min(4, gamepad.axes.length); j++) {
							if (app.gamepads[i].axes[j].value !== gamepad.axes[j]) {

								app.gamepads[i].axes[j].movement = gamepad.axes[j] - app.gamepads[i].axes[j].value;
								app.gamepads[i].axes[j].value = gamepad.axes[j];

								app.emit("gamepadmove", app.gamepads[i], keyCodes[j]);
							};
						};
					};
				});

				app.on("poststep", function () {

					for (var _i = 0; _i < 4; _i++) {
						for (var j = 0; j < 16; j++) {
							app.gamepads[_i].buttons[j].movement = 0;
						};

						for (var j = 0; j < 4; j++) {
							app.gamepads[_i].axes[j].movement = 0;
						};
					};
				});

				app.gamepads[Symbol.iterator] = regeneratorRuntime.mark(function callee$1$0() {
					var i;
					return regeneratorRuntime.wrap(function callee$1$0$(context$2$0) {
						while (1) switch (context$2$0.prev = context$2$0.next) {
							case 0:
								i = 0;

							case 1:
								if (!(i < app.gamepads.length)) {
									context$2$0.next = 9;
									break;
								}

								if (!app.gamepads[i].connected) {
									context$2$0.next = 5;
									break;
								}

								context$2$0.next = 5;
								return app.gamepads[i];

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