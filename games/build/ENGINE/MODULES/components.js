System.register([], function (_export) {
	return {
		setters: [],
		execute: function () {
			/*\
    *	sowas wie type einfügen? für zb verschiedene input sachen (controller/AI)
    app.component["position"].bind(entity, 34, 53);
    app.entity["robot"].get();
    app.component["position"].has(entity) //gut für filter
   \*/
			"use strict";

			_export("default", function (app, _ref) {
				var loader = _ref.loader;
				var _ref$components = _ref.components;
				var components = _ref$components === undefined ? [] : _ref$components;

				var componentsName = {};

				if (typeof components === "string") {
					components = [components];
				};

				for (var i = 0; i < components.length; i++) {
					var _name = components[i];

					loader.add();
					System["import"]("components/" + _name).then(loader.ready, loader.error);
				};

				app.component = function (name, compClass) {
					componentsName[name] = {
						compClass: compClass,
						zombies: [] };
				};

				app.component.bind = function (name, entity) {
					var _component$compClass;

					for (var _len = arguments.length, args = Array(_len > 2 ? _len - 2 : 0), _key = 2; _key < _len; _key++) {
						args[_key - 2] = arguments[_key];
					}

					var component = componentsName[name];
					// just create new component object if not already avaiable
					if (!app.component.has(name, entity)) {

						if (component.zombies.length > 0) {
							entity[name] = component.zombies.pop();
						} else {
							entity[name] = Object.create(component.compClass.prototype);
						};
						// add reference to the entity object
						entity[name].entity = entity;
					};
					// init already attached components too
					(_component$compClass = component.compClass).call.apply(_component$compClass, [entity[name]].concat(args));
				};

				app.component.unbind = function (name, entity) {

					if (!app.component.has(name, entity)) return;
					// add instance to zombie pool
					componentsName[name].zombies.push(entity[name]);
					// remove reference to entity for GC
					entity[name].entity = null;
					entity[name] = undefined;
				};

				app.component.has = function (name, entity) {
					return entity[name] instanceof componentsName[name].compClass;
				};
			});
		}
	};
});