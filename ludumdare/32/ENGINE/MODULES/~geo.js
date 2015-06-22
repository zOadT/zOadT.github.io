System.register([], function (_export) {
	var _toConsumableArray, _defineProperty;

	return {
		setters: [],
		execute: function () {
			"use strict";

			_toConsumableArray = function (arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) arr2[i] = arr[i]; return arr2; } else { return Array.from(arr); } };

			_defineProperty = function (obj, key, value) { return Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); };

			_export("default", function (app) {

				app.geo = {};

				var vectorPool = [];
				app.geo.vec = function (x, y) {
					var vec = vectorPool.length > 0 ? vectorPool.pop() : Object.create(app.geo.vec.prototype);

					vec.x = x;
					vec.y = y;

					return vec;
				};
				app.geo.vec.prototype = (function () {
					var _app$geo$vec$prototype = {};
					_app$geo$vec$prototype[Symbol.iterator] = regeneratorRuntime.mark(function callee$2$0() {
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
								case "end":
									return context$3$0.stop();
							}
						}, callee$2$0, this);
					});

					_defineProperty(_app$geo$vec$prototype, "toString", function toString() {
						return "x: " + this.x + ", y: " + this.y;
					});

					_defineProperty(_app$geo$vec$prototype, "copy", function copy() {
						var _app$geo;

						return (_app$geo = app.geo).vec.apply(_app$geo, _toConsumableArray(this));
					});

					_defineProperty(_app$geo$vec$prototype, "length", function length() {
						return Math.hypot(this.x, this.y);
					});

					_defineProperty(_app$geo$vec$prototype, "setX", function setX(x) {
						this.x = x;
						return this;
					});

					_defineProperty(_app$geo$vec$prototype, "setY", function setY(y) {
						this.y = y;
						return this;
					});

					_defineProperty(_app$geo$vec$prototype, "add", function add(x, y) {
						this.x += x;
						this.y += y;
						return this;
					});

					_defineProperty(_app$geo$vec$prototype, "substract", function substract(x, y) {
						this.x -= x;
						this.y -= y;
						return this;
					});

					_defineProperty(_app$geo$vec$prototype, "muliply", function muliply(x, y) {
						this.x *= x;
						this.y *= y;
						return this;
					});

					_defineProperty(_app$geo$vec$prototype, "divide", function divide(x, y) {
						this.x /= x;
						this.y /= y;
						return this;
					});

					_defineProperty(_app$geo$vec$prototype, "scale", function scale(k) {
						this.x *= k;
						this.y *= k;
						return this;
					});

					_defineProperty(_app$geo$vec$prototype, "mix", function mix(x, y, amout) {
						this.x = this.x * (1 - amout) + x * amout;
						this.y = this.y * (1 - amout) + y * amout;
						return this;
					});

					_defineProperty(_app$geo$vec$prototype, "normalize", function normalize() {
						this.scale(1 / this.length());
						return this;
					});

					_defineProperty(_app$geo$vec$prototype, "dot", function dot(x, y) {
						return this.x * x + this.y * y;
					});

					_defineProperty(_app$geo$vec$prototype, "cross", function cross(x, y) {
						return this.x * y - this.y * x;
					});

					_defineProperty(_app$geo$vec$prototype, "delete", function _delete() {
						vectorPool.push(this);
					});

					return _app$geo$vec$prototype;
				})();

				app.geo.line = function () {
					for (var _len = arguments.length, points = Array(_len), _key = 0; _key < _len; _key++) {
						points[_key] = arguments[_key];
					}

					this.points = [];
					for (var i = 0; i < points.length; i++) {
						if (points[i] instanceof app.geo.vec) {
							this.points.push(points[i]);
						} else {
							this.points.push(app.geo.vec(points[i], points[++i]));
						};
					};
				};
				app.geo.line.prototype = (function () {
					var _app$geo$line$prototype = {};
					_app$geo$line$prototype[Symbol.iterator] = regeneratorRuntime.mark(function callee$2$0() {
						var _this = this;

						var i;
						return regeneratorRuntime.wrap(function callee$2$0$(context$3$0) {
							while (1) switch (context$3$0.prev = context$3$0.next) {
								case 0:
									i = 0;

								case 1:
									if (!(i < _this.points.length)) {
										context$3$0.next = 9;
										break;
									}

									context$3$0.next = 4;
									return _this.points[i].x;

								case 4:
									context$3$0.next = 6;
									return _this.points[i].y;

								case 6:
									i++;
									context$3$0.next = 1;
									break;

								case 9:
									;

								case 10:
								case "end":
									return context$3$0.stop();
							}
						}, callee$2$0, this);
					});
					return _app$geo$line$prototype;
				})();

				app.geo.polygon = function () {
					for (var _len = arguments.length, points = Array(_len), _key = 0; _key < _len; _key++) {
						points[_key] = arguments[_key];
					}

					this.points = [];
					for (var i = 0; i < points.length; i++) {
						if (points[i] instanceof app.geo.vec) {
							this.points.push(points[i]);
						} else {
							this.points.push(app.geo.vec(points[i], points[++i]));
						};
					};
					this.lines = [];
					for (var i = 0; i < this.points.length; i++) {
						this.lines.push(new app.geo.line(this.points[i], this.points[(i + 1) % this.points.length]));
					};
				};
				app.geo.polygon.prototype = (function () {
					var _app$geo$polygon$prototype = {};
					_app$geo$polygon$prototype[Symbol.iterator] = regeneratorRuntime.mark(function callee$2$0() {
						var _this = this;

						var i;
						return regeneratorRuntime.wrap(function callee$2$0$(context$3$0) {
							while (1) switch (context$3$0.prev = context$3$0.next) {
								case 0:
									i = 0;

								case 1:
									if (!(i < _this.lines.length)) {
										context$3$0.next = 7;
										break;
									}

									context$3$0.next = 4;
									return _this.lines[i];

								case 4:
									i++;
									context$3$0.next = 1;
									break;

								case 7:
									;

								case 8:
								case "end":
									return context$3$0.stop();
							}
						}, callee$2$0, this);
					});
					return _app$geo$polygon$prototype;
				})();

				app.geo.circle = function () {
					if (arguments[0] instanceof app.geo.vec) {
						this.point = arguments[0];
						this.radius = arguments[1];
					} else {
						this.point = app.geo.vec(arguments[0], arguments[1]);
						this.radius = arguments[2];
					};
				};
				app.geo.circle.prototype = (function () {
					var _app$geo$circle$prototype = {};
					_app$geo$circle$prototype[Symbol.iterator] = regeneratorRuntime.mark(function callee$2$0() {
						var _this = this;

						return regeneratorRuntime.wrap(function callee$2$0$(context$3$0) {
							while (1) switch (context$3$0.prev = context$3$0.next) {
								case 0:
									context$3$0.next = 2;
									return _this.point.x;

								case 2:
									context$3$0.next = 4;
									return _this.point.y;

								case 4:
									context$3$0.next = 6;
									return _this.radius;

								case 6:
								case "end":
									return context$3$0.stop();
							}
						}, callee$2$0, this);
					});
					return _app$geo$circle$prototype;
				})();

				app.geo.distancePointPoint = function (x1, y1, x2, y2) {
					return Math.hypot(x1 - x2, y1 - y2);
				};
				app.geo.isPointEqualPoint = function (x1, y1, x2, y2) {
					return x1 === x2 && y1 === y2;
				};

				app.geo.footPointLine = function (pointX, pointY, lineStartX, lineStartY, lineEndX, lineEndY) {
					var A = pointX - lineStartX;
					var B = pointY - lineStartY;
					var C = lineEndX - lineStartX;
					var D = lineEndY - lineStartY;

					var dot = A * C + B * D;
					var len_sq = C * C + D * D;
					var param = dot / len_sq;

					if (param < 0 || lineStartX == lineEndX && lineStartY == lineEndY) {
						// ???
						console.log("hioH", param);
						return app.geo.vec(lineStartX, lineStartY);
					} else {
						return app.geo.vec(lineStartX + param * C, lineStartY + param * D);
					};
				};

				app.geo.intersectionLineLine = function (line1StartX, line1StartY, line1EndX, line1EndY, line2StartX, line2StartY, line2EndX, line2EndY) {
					var denominator = (line2EndY - line2StartY) * (line1EndX - line1StartX) - (line2EndX - line2StartX) * (line1EndY - line1StartY);
					if (denominator === 0) {
						return null;
					}
					var a = line1StartY - line2StartY;
					var b = line1StartX - line2StartX;
					var numerator1 = (line2EndX - line2StartX) * a - (line2EndY - line2StartY) * b;
					var numerator2 = (line1EndX - line1StartX) * a - (line1EndY - line1StartY) * b;
					a = numerator1 / denominator;
					b = numerator2 / denominator;

					return app.geo.vec(line1StartX + a * (line1EndX - line1StartX), line1StartY + a * (line1EndY - line1StartY));
				};
				//FOR LD
				app.geo.isIntersectionLineLine = function (line1StartX, line1StartY, line1EndX, line1EndY, line2StartX, line2StartY, line2EndX, line2EndY) {
					var denominator = (line2EndY - line2StartY) * (line1EndX - line1StartX) - (line2EndX - line2StartX) * (line1EndY - line1StartY);
					if (denominator === 0) {
						return false;
					}
					var a = line1StartY - line2StartY;
					var b = line1StartX - line2StartX;
					var numerator1 = (line2EndX - line2StartX) * a - (line2EndY - line2StartY) * b;
					var numerator2 = (line1EndX - line1StartX) * a - (line1EndY - line1StartY) * b;
					a = numerator1 / denominator;
					b = numerator2 / denominator;

					//console.log(a, b);

					return a >= 0 && a <= 1 && b >= 0 && b <= 1;
				};

				app.geo.intersectionLineCircle = function (lineStartX, lineStartY, lineEndX, lineEndY, circleX, circleY, circleRadius) {
					var _app$geo;

					var foot = app.geo.footPointLine(circleX, circleY, lineStartX, lineStartY, lineEndX, lineEndY);

					var distance = (_app$geo = app.geo).distancePointPoint.apply(_app$geo, [circleX, circleY].concat(_toConsumableArray(foot))); //squared ist besser
					if (distance > circleRadius) {
						return [];
					} else if (distance === circleRadius) {
						return [foot];
					} else {
						var _foot$copy;

						var distanceToGo = Math.sqrt(Math.pow(circleRadius, 2) - Math.pow(distance, 2));
						var direction = app.geo.vec(lineStartX - lineEndX, lineStartY - lineEndY).normalize().scale(distanceToGo);

						var intersection1 = (_foot$copy = foot.copy()).add.apply(_foot$copy, _toConsumableArray(direction));
						var intersection2 = foot.substract.apply(foot, _toConsumableArray(direction));

						direction["delete"]();

						return [intersection1, intersection2];
					};
				};

				app.geo.lineCircleCircle = function (circle1X, circle1Y, circle1Radius, circle2X, circle2Y, circle2Radius) {
					//TODO
					//from http://stackoverflow.com/questions/12219802/a-javascript-function-that-returns-the-x-y-points-of-intersection-between-two-ci
					// dx and dy are the vertical and horizontal distances between the circle centers.
					var dx = circle2X - circle1X;
					var dy = circle2Y - circle1Y;

					// Determine the straight-line distance between the centers.
					var distance = Math.sqrt(dy * dy + dx * dx);

					if (distance > circle1Radius + circle2Radius) {
						// no solution. circles do not intersect.
						return [];
					}
					if (distance < Math.abs(circle1Radius - circle2Radius)) {
						// no solution. one circle is contained in the other
						return [];
					}

					// 'point 2' is the point where the line through the circle
					// intersection points crosses the line between the circle
					// centers.

					// Determine the distance from point 0 to point 2.
					var a = (circle1Radius * circle1Radius - circle2Radius * circle2Radius + distance * distance) / (2 * distance);

					// Determine the coordinates of point 2.
					var x2 = circle1X + dx * a / distance;
					var y2 = circle1Y + dy * a / distance;

					// Determine the distance from point 2 to either of the intersection points.
					var h = Math.sqrt(circle1Radius * circle1Radius - a * a);

					// Now determine the offsets of the intersection points from point 2.
					var rx = -dy * h / distance;
					var ry = dx * h / distance;

					// Determine the absolute intersection points.
					var xi = x2 + rx;
					var xi_prime = x2 - rx;
					var yi = y2 + ry;
					var yi_prime = y2 - ry;

					return [xi, xi_prime, yi, yi_prime];
				};

				app.geo.isPointOnLine = function (pointX, pointY, lineStartX, lineStartY, lineEndX, lineEndY) {
					//man kann auch footPointLine mitbenutzen
					var dx = pointX - lineStartX;
					var dy = pointY - lineStartY;
					var dx2 = lineEndX - lineStartX;
					var dy2 = lineEndY - lineStartY;
					//Y muss dabei sein, später bei der richtigen engine fixen!
					return dx / dy === dx2 / dy2 && pointX <= Math.max(lineStartX, lineEndX) && pointX >= Math.min(lineStartX, lineEndX) && pointY <= Math.max(lineStartY, lineEndY) && pointY >= Math.min(lineStartY, lineEndY);
				};

				app.geo.isPointInLine = function (x, y, lineStartX, lineStartY, lineEndX, lineEndY) {
					var _app$geo;

					var foot = app.geo.footPointLine(x, y, lineStartX, lineStartY, lineEndX, lineEndY);

					return (_app$geo = app.geo).isPointEqualPoint.apply(_app$geo, [x, y].concat(_toConsumableArray(foot))) && false; //TODO
				};

				app.geo.isPointInPolygon = function (x, y) {
					for (var _len = arguments.length, args = Array(_len > 2 ? _len - 2 : 0), _key = 2; _key < _len; _key++) {
						args[_key - 2] = arguments[_key];
					}

					//bssl hacky
					var c = false;
					for (var i = 0, j = args.length - 1; i < args.length; j = i, i += 2) {
						if (args[j + 1] > y != args[i + 1] > y && x < (args[i] - args[j]) * (y - args[j + 1]) / (args[i + 1] - args[j + 1]) + args[j]) {
							c = !c;
						};
					};
					return c;
				};
			});
		}
	};
});

/*rotate() {
	
}*/
//bssl blöd :D