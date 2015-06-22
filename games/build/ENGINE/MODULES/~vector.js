System.register([], function (_export) {
	var _toConsumableArray, _defineProperty;

	return {
		setters: [],
		execute: function () {
			"use strict";

			_toConsumableArray = function (arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) arr2[i] = arr[i]; return arr2; } else { return Array.from(arr); } };

			_defineProperty = function (obj, key, value) { return Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); };

			_export("default", function (app) {

				app.vec = function (x, y, z) {
					this.x = x;
					this.y = y;
					if (z !== undefined) {
						this.z = z;
					};

					this.length = Math.hypot(x, y, z !== undefined ? z : 0);
				};

				app.vec.prototype = (function () {
					var _app$vec$prototype = {};
					_app$vec$prototype[Symbol.iterator] = regeneratorRuntime.mark(function callee$2$0() {
						var _this = this;

						return regeneratorRuntime.wrap(function callee$2$0$(context$3$0) {
							while (1) switch (context$3$0.prev = context$3$0.next) {
								case 0:
									context$3$0.next = 2;
									return _this.x;

								case 2:
									context$3$0.next = 4;
									return _this.y;

								case 4:
									if (!(_this.z !== undefined)) {
										context$3$0.next = 7;
										break;
									}

									context$3$0.next = 7;
									return _this.z;

								case 7:
									;

								case 8:
								case "end":
									return context$3$0.stop();
							}
						}, callee$2$0, this);
					});

					_defineProperty(_app$vec$prototype, "toString", function toString() {
						if (this.z === undefined) {
							return "(" + this.x + ", " + this.y + ")";
						} else {
							return "(" + this.x + ", " + this.y + ", " + this.z + ")";
						};
					});

					_defineProperty(_app$vec$prototype, "add", function add(x, y, z) {
						this.x += x;
						this.y += y;
						if (z !== undefined) {
							this.z = (this.z || 0) + z;
						};
					});

					_defineProperty(_app$vec$prototype, "scale", function scale(k) {
						this.x *= k;
						this.y *= k;
						if (this.z !== undefined) {
							this.z *= k;
						};
					});

					_defineProperty(_app$vec$prototype, "muliply", function muliply(x, y, z) {
						if (this.z === undefined) {
							return;
						}
					});

					return _app$vec$prototype;
				})();

				/*app.vec.length = function(vec) {
    	return Math.hypot(vec.x, vec.y, vec.z||0);
    };*/

				/*app.vec.sum = function(vec1, vec2) {
    	return new app.vec(
    		vec1.x + vec2.x,
    		vec1.y + vec2.y,
    		(vec1.z !== undefined || vec2.z !== undefined) ? vec1.z || vec2.z || 0 : undefined
    	);
    	/*return {
    		x: vec1.x + vec2.x,
    		y: vec1.y + vec2.y,
    		z: vec1.z||0 + vec2.z||0,
    	};*/ /*
          };
          app.vec.muliply = function() {
          };*/

				var test = new app.vec(20, 50);
				console.log.apply(console, _toConsumableArray(test));
			});
		}
	};
});