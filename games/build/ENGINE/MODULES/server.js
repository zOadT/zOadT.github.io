System.register([], function (_export) {
	return {
		setters: [],
		execute: function () {
			// da lags verhindert werden, könnte es zu problemen kommen!s

			"use strict";

			_export("default", function (app, _ref) {
				var id = _ref.id;

				var socket = io();

				app.evil = function () {
					socket.emit.apply(socket, arguments);
				};

				socket.on("join", function (id) {
					if (app.currentScene.onjoin) app.currentScene.onjoin(id);
				});

				socket.on("message", function (id, string) {
					// JSON.parse can throw error
					try {
						if (app.currentScene.onmessage) app.currentScene.onmessage(id, JSON.parse(string));
					} catch (e) {
						console.log("HACK");
					};
				});

				socket.on("leave", function (id) {
					if (app.currentScene.onleave) app.currentScene.onleave(id);
				});

				app.join = function (min, max) {
					socket.emit("join", JSON.stringify({
						id: id,
						min: min,
						max: max || min }));
				};

				app.send = function (obj) {
					socket.emit("message", JSON.stringify(obj));
				};

				app.leave = function () {
					socket.emit("leave");
				};
			});
		}
	};
});