System.register([], function (_export) {
	return {
		setters: [],
		execute: function () {
			// läuft alles mit error?

			"use strict";

			_export("default", function (app, _ref) {
				var loader = _ref.loader;
				var _ref$behaviors = _ref.behaviors;
				var behaviors = _ref$behaviors === undefined ? [] : _ref$behaviors;

				var nodes = {};
				var nodesInProgress = [];

				if (typeof behaviors === "string") {
					behaviors = [behaviors];
				};

				for (var i = 0; i < behaviors.length; i++) {
					var _name = behaviors[i];

					loader.add();
					System["import"]("behaviors/" + _name).then(loader.ready, loader.error);
				};

				app.behavior = function (name, fn) {

					nodes[name] = fn;
				};

				function registerProgress(node) {
					var i = nodesInProgress.indexOf(undefined);

					if (i >= 0) {
						node._progressIndex = i;
						nodesInProgress[i] = node;
					} else {
						node._progressIndex = nodesInProgress.length;
						nodesInProgress.push(node);
					};
				};
				function removeProgress(node) {
					nodesInProgress[node._progressIndex] = undefined;
				};

				app.behavior.call = function (name) {
					for (var _len = arguments.length, args = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
						args[_key - 1] = arguments[_key];
					}

					var node = {};

					node._promise = new Promise(function (resolve, reject) {

						node.succeed = function () {
							var args = arguments[0] === undefined ? {} : arguments[0];

							removeProgress(this);
							resolve.call(null, args);
						};
						node.failed = function () {
							var args = arguments[0] === undefined ? {} : arguments[0];

							removeProgress(this);
							reject.call(null, args);
						};
					});
					//-----async function
					//nodes[name].apply(node, args);
					//-----generator
					var genObj = nodes[name].apply(node, args);
					run();

					function run(promiseResult) {
						var item = genObj.next(promiseResult);
						if (!item.done) {
							// A promise was yielded
							item.value.then(function (result) {
								return run(result);
							}, function (error) {
								return genObj["throw"](error);
							});
						}
					}
					//-----
					if (node.step) {
						registerProgress(node);
					};

					return node._promise;
				};

				//besser prestep?
				app.on("poststep", function () {

					for (var i = 0; i < nodesInProgress.length; i++) {
						if (nodesInProgress[i] !== undefined) {
							nodesInProgress[i].step();
						};
					};
				});
			});
		}
	};
});