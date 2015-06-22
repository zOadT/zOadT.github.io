System.register([], function (_export) {
	return {
		setters: [],
		execute: function () {
			//man kann in der function einer scene nicht direkt app.scenes.set aufrufen, fixen?
			"use strict";

			_export("default", function (app, _ref) {
				var loader = _ref.loader;
				var scenes = _ref.scenes;

				var scenesName = {};
				//falsch
				/*if(scenes === undefined) return;*/
				var initScene; // = "main";

				if (typeof scenes === "string") {
					scenes = [scenes];
				};

				for (var i = 0; i < scenes.length; i++) {
					var _name = scenes[i];

					/*let match = name.match(/\[(.*?)\]/);
     if(match) {
     	initScene = match[1];
     };*/

					var match = _name.match(/^-/);
					if (match) {
						initScene = match.input.substring(1);
					};

					loader.add();
					System["import"]("scenes/" + _name).then(loader.ready, loader.error);
				};

				var currentScene = {};

				app.on("load", function () {

					for (var _name2 in scenesName) {
						var scene = {};
						scenesName[_name2].call(scene, app);
						scenesName[_name2] = scene;
					};

					app.scenes.set(initScene);

					for (var _name3 in scenesName) {
						var scene = scenesName[_name3];
						if (scene.oncreate) scene.oncreate();
					};
				});

				/*app.on("error", function() {
    	currentScene = {};
    });*/

				app.scenes = function (name, constructor) {
					scenesName[name] = constructor;

					/*	scenesName[name] = {};
     	constructor.call(scenesName[name], app);*/
				};

				app.scenes.set = function (name) {
					for (var _len = arguments.length, args = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
						args[_key - 1] = arguments[_key];
					}

					if (currentScene.leave) currentScene.leave.apply(currentScene, args);

					currentScene = scenesName[name];
					//nen bssl scheiße, vorallem wird falscher renderer benutzt
					if (currentScene.enter) currentScene.enter.apply(currentScene, args);
				};

				app.on("step", function () {
					for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
						args[_key] = arguments[_key];
					}

					currentScene.step.apply(currentScene, args);
				});
				app.on("frame", function () {
					for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
						args[_key] = arguments[_key];
					}

					currentScene.render.apply(currentScene, args);
				});

				app.on("keydown", function () {
					for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
						args[_key] = arguments[_key];
					}

					if (currentScene.onkeydown !== undefined) {
						currentScene.onkeydown.apply(currentScene, args);
					};
				});
				app.on("keyup", function () {
					for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
						args[_key] = arguments[_key];
					}

					if (currentScene.onkeyup !== undefined) {
						currentScene.onkeyup.apply(currentScene, args);
					};
				});

				app.on("gamepadconnect", function () {
					for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
						args[_key] = arguments[_key];
					}

					if (currentScene.ongamepadconnect !== undefined) {
						currentScene.ongamepadconnect.apply(currentScene, args);
					};
				});
				app.on("gamepaddisconnect", function () {
					for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
						args[_key] = arguments[_key];
					}

					if (currentScene.ongamepaddisconnect !== undefined) {
						currentScene.ongamepaddisconnect.apply(currentScene, args);
					};
				});
				app.on("gamepaddown", function () {
					for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
						args[_key] = arguments[_key];
					}

					if (currentScene.ongamepaddown !== undefined) {
						currentScene.ongamepaddown.apply(currentScene, args);
					};
				});
				app.on("gamepadup", function () {
					for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
						args[_key] = arguments[_key];
					}

					if (currentScene.ongamepadup !== undefined) {
						currentScene.ongamepadup.apply(currentScene, args);
					};
				});
				app.on("gamepadmove", function () {
					for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
						args[_key] = arguments[_key];
					}

					if (currentScene.ongamepadmove !== undefined) {
						currentScene.ongamepadmove.apply(currentScene, args);
					};
				});

				app.on("mousedown", function () {
					for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
						args[_key] = arguments[_key];
					}

					if (currentScene.onmousedown !== undefined) {
						currentScene.onmousedown.apply(currentScene, args);
					};
				});
				app.on("mouseup", function () {
					for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
						args[_key] = arguments[_key];
					}

					if (currentScene.onmouseup !== undefined) {
						currentScene.onmouseup.apply(currentScene, args);
					};
				});
				app.on("mousemove", function () {
					for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
						args[_key] = arguments[_key];
					}

					if (currentScene.onmousemove !== undefined) {
						currentScene.onmousemove.apply(currentScene, args);
					};
				});
				app.on("mousewheel", function () {
					for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
						args[_key] = arguments[_key];
					}

					if (currentScene.onmousewheel !== undefined) {
						currentScene.onmousewheel.apply(currentScene, args);
					};
				});

				app.on("touchdown", function () {
					for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
						args[_key] = arguments[_key];
					}

					if (currentScene.ontouchdown !== undefined) {
						currentScene.ontouchdown.apply(currentScene, args);
					};
				});
				app.on("touchup", function () {
					for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
						args[_key] = arguments[_key];
					}

					if (currentScene.ontouchup !== undefined) {
						currentScene.ontouchup.apply(currentScene, args);
					};
				});
				app.on("touchmove", function () {
					for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
						args[_key] = arguments[_key];
					}

					if (currentScene.ontouchmove !== undefined) {
						currentScene.ontouchmove.apply(currentScene, args);
					};
				});
			});
		}
	};
});