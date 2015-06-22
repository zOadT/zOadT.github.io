System.register([], function (_export) {
	var _createClass, _classCallCheck;

	return {
		setters: [],
		execute: function () {
			"use strict";

			_createClass = (function () { function defineProperties(target, props) { for (var key in props) { var prop = props[key]; prop.configurable = true; if (prop.value) prop.writable = true; } Object.defineProperties(target, props); } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

			_classCallCheck = function (instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } };

			app.component("position", (function () {
				var _class = function (x, y, width, height) {
					_classCallCheck(this, _class);

					this.x = x;
					this.y = y;

					this.width = width;
					this.height = height;

					this.flip = false;

					this.start = false;
				};

				_createClass(_class, {
					set: {
						value: function set(x, y) {
							this.x = x;
							this.y = y;
						}
					},
					log: {
						value: function log() {
							console.log("I am at: (" + this.x + ", " + this.y + ")");
						}
					},
					isTooClose: {
						value: function isTooClose(level) {
							if (this.start === false) {
								this.start = app.time;
							};

							for (var i = 0; i < level.guards.length; i++) {

								if (this == level.guards[i].position) continue;

								this.start = false;
								this.step = false;
								if (app.geo.distancePointPoint(this.x, this.y, level.guards[i].position.x, level.guards[i].position.y) < 2.5) {
									return true;
								}
							};

							if (this !== level.player.position) if (app.geo.distancePointPoint(this.x, this.y, level.player.position.x, level.player.position.y) < 5) {
								return true;
							}this.step = (app.time - this.start) % 30 < 15;
							return false;
						}
					},
					tryUp: {
						value: function tryUp(level) {

							if (this.y - this.height / 2 <= 0) {
								return;
							}var p1x = this.x - this.width / 2 + 0.25;
							var p1y = this.y - this.height / 2;
							var p2x = this.x + this.width / 2 - 0.25;
							var p2y = this.y - this.height / 2;

							for (var i = 0; i < level.walls.length; i += 4) {
								if (app.geo.isIntersectionLineLine(p1x, p1y, p2x, p2y, level.walls[i], level.walls[i + 1], level.walls[i + 2], level.walls[i + 3])) {
									return;
								}if (app.geo.isPointOnLine(p1x, p1y, level.walls[i], level.walls[i + 1], level.walls[i + 2], level.walls[i + 3])) {
									return;
								}if (app.geo.isPointOnLine(p2x, p2y, level.walls[i], level.walls[i + 1], level.walls[i + 2], level.walls[i + 3])) {
									return;
								}
							};

							this.y -= 0.25;
							if (this.isTooClose(level)) this.y += 0.25;
						}
					},
					tryLeft: {
						value: function tryLeft(level) {
							if (this.x - this.width / 2 <= 0) {
								return;
							}var p1x = this.x - this.width / 2;
							var p1y = this.y - this.height / 2 + 0.25;
							var p2x = this.x - this.width / 2;
							var p2y = this.y + this.height / 2 - 0.25;

							for (var i = 0; i < level.walls.length; i += 4) {
								if (app.geo.isIntersectionLineLine(p1x, p1y, p2x, p2y, level.walls[i], level.walls[i + 1], level.walls[i + 2], level.walls[i + 3])) {
									return;
								}if (app.geo.isPointOnLine(p1x, p1y, level.walls[i], level.walls[i + 1], level.walls[i + 2], level.walls[i + 3])) {
									return;
								}if (app.geo.isPointOnLine(p2x, p2y, level.walls[i], level.walls[i + 1], level.walls[i + 2], level.walls[i + 3])) {
									return;
								}
							};

							this.x -= 0.25;
							if (this.isTooClose(level)) {
								this.x += 0.25;
							} else {
								this.flip = true;
							};
						}
					},
					tryDown: {
						value: function tryDown(level) {
							if (this.y + this.height / 2 >= level.size.y) {
								return;
							}var p1x = this.x - this.width / 2 + 0.25;
							var p1y = this.y + this.height / 2;
							var p2x = this.x + this.width / 2 - 0.25;
							var p2y = this.y + this.height / 2;

							for (var i = 0; i < level.walls.length; i += 4) {
								if (app.geo.isIntersectionLineLine(p1x, p1y, p2x, p2y, level.walls[i], level.walls[i + 1], level.walls[i + 2], level.walls[i + 3])) {
									return;
								}if (app.geo.isPointOnLine(p1x, p1y, level.walls[i], level.walls[i + 1], level.walls[i + 2], level.walls[i + 3])) {
									return;
								}if (app.geo.isPointOnLine(p2x, p2y, level.walls[i], level.walls[i + 1], level.walls[i + 2], level.walls[i + 3])) {
									return;
								}
							};

							this.y += 0.25;
							if (this.isTooClose(level)) this.y -= 0.25;
						}
					},
					tryRight: {
						value: function tryRight(level) {
							if (this.x + this.width / 2 >= level.size.x) {
								return;
							}var p1x = this.x + this.width / 2;
							var p1y = this.y - this.height / 2 + 0.25;
							var p2x = this.x + this.width / 2;
							var p2y = this.y + this.height / 2 - 0.25;

							for (var i = 0; i < level.walls.length; i += 4) {
								if (app.geo.isIntersectionLineLine(p1x, p1y, p2x, p2y, level.walls[i], level.walls[i + 1], level.walls[i + 2], level.walls[i + 3])) {
									return;
								}if (app.geo.isPointOnLine(p1x, p1y, level.walls[i], level.walls[i + 1], level.walls[i + 2], level.walls[i + 3])) {
									return;
								}if (app.geo.isPointOnLine(p2x, p2y, level.walls[i], level.walls[i + 1], level.walls[i + 2], level.walls[i + 3])) {
									return;
								}
							};

							this.x += 0.25;
							if (this.isTooClose(level)) {
								this.x -= 0.25;
							} else {
								this.flip = false;
							};
						}
					}
				});

				return _class;
			})());
		}
	};
});