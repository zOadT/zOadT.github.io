System.register([], function (_export) {
	return {
		setters: [],
		execute: function () {
			//proto fehlt, nur functionnen in proto!

			"use strict";

			_export("default", function (app, _ref) {
				var loader = _ref.loader;
				var _ref$entities = _ref.entities;
				var entities = _ref$entities === undefined ? [] : _ref$entities;

				var types = {};

				if (typeof entities === "string") {
					entities = [entities];
				};

				for (var i = 0; i < entities.length; i++) {
					var _name = entities[i];

					loader.add();
					System["import"]("entities/" + _name).then(loader.ready, loader.error);
				};

				app.entity = function (name, entClass) {
					types[name] = {
						entClass: entClass,
						zombies: [] };
				};

				app.entity.get = function (name) {
					var _type$entClass;

					for (var _len = arguments.length, args = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
						args[_key - 1] = arguments[_key];
					}

					var type = types[name];
					var entity;

					if (type.zombies.length > 0) {
						entity = type.zombies.pop();
					} else {
						entity = Object.create(type.entClass.prototype);

						/*	entity = Object.create(type.constructor.prototype);
      	entity.constructor = type.constructor;*/
						entity.__type = name; //enumerable false, in prototype?
					};

					//	console.log(type.entClass);

					(_type$entClass = type.entClass).call.apply(_type$entClass, [entity].concat(args));

					return entity;
				};

				app.entity.bite = function (entity) {
					var type = types[entity.__type];

					type.zombies.push(entity);
				};
			});
		}
	};
});