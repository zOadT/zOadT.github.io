System.register([], function (_export) {
	var _createClass, _classCallCheck;

	return {
		setters: [],
		execute: function () {
			"use strict";

			_createClass = (function () { function defineProperties(target, props) { for (var key in props) { var prop = props[key]; prop.configurable = true; if (prop.value) prop.writable = true; } Object.defineProperties(target, props); } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

			_classCallCheck = function (instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } };

			app.entity("guard", (function () {
				var _class = function (level, pats) {
					_classCallCheck(this, _class);

					this.level = level;

					this.width = 4;
					this.height = 6; //6;

					this.pats = pats;

					app.component.bind("position", this, pats[0], pats[1], this.width, this.width);

					this.inLove = false;

					this.goingTo = 1;
					this.goingTo = this.goingTo % (this.pats.length / 2);
				};

				_createClass(_class, {
					isSeeing: {
						value: function isSeeing(position) {

							for (var i = 0; i < this.level.walls.length; i += 4) {
								if (app.geo.isIntersectionLineLine(position.x, position.y, this.position.x, this.position.y, this.level.walls[i], this.level.walls[i + 1], this.level.walls[i + 2], this.level.walls[i + 3])) {
									return false;
								}
							};
							return true;
						}
					},
					update: {
						value: function update() {

							if (this.inLove && this.inLove !== true) {
								if (this.inLove.position.y < this.position.y) this.position.tryUp(this.level);
								if (this.inLove.position.x < this.position.x) this.position.tryLeft(this.level);
								if (this.inLove.position.y > this.position.y) this.position.tryDown(this.level);
								if (this.inLove.position.x > this.position.x) this.position.tryRight(this.level);
							} else if (this.pats.length > 2) {
								var goalX = this.pats[this.goingTo * 2];
								var goalY = this.pats[this.goingTo * 2 + 1];

								if (goalY < this.position.y) this.position.tryUp(this.level);
								if (goalX < this.position.x) this.position.tryLeft(this.level);
								if (goalY > this.position.y) this.position.tryDown(this.level);
								if (goalX > this.position.x) this.position.tryRight(this.level);

								if (goalX == this.position.x && goalY == this.position.y) {
									this.goingTo++;
									this.goingTo = this.goingTo % (this.pats.length / 2);
								};
							}
						}
					},
					move: {
						value: function move(up, left, down, right) {
							if (up) this.position.tryUp(this.level);
							if (left) this.position.tryLeft(this.level);
							if (down) this.position.tryDown(this.level);
							if (right) this.position.tryRight(this.level);
						}
					},
					render: {
						value: function render(ctx, watch) {
							//	ctx.fillStyle = "red";
							ctx.translate(this.position.x, this.position.y);
							if (this.position.flip) ctx.scale(-1, 1);

							var offsetX = this.position.step ? app.ctx.images.guard.width / 2 : 0;

							if (watch) {
								ctx.drawImage("guardwatching", offsetX, 0, app.ctx.images.guard.width / 2, app.ctx.images.guard.height, -this.width / 2, -this.height + this.width / 2, this.width, this.height);
								if (this.position.flip) ctx.scale(-1, 1);
								ctx.translate(-this.position.x, -this.position.y);
								return;
							};

							if (this.inLove) {
								//	ctx.drawImage("selection", this.position.x - 3, this.position.y - 2);
								ctx.drawImage("selection2", offsetX, 0, app.ctx.images.guard.width / 2, app.ctx.images.guard.height, -this.width / 2, -this.height + this.width / 2, this.width, this.height);
								//	ctx.fillStyle = "#E06F8B";
							};

							ctx.drawImage("guard", offsetX, 0, app.ctx.images.guard.width / 2, app.ctx.images.guard.height, -this.width / 2, -this.height + this.width / 2, this.width, this.height);
							if (this.position.flip) ctx.scale(-1, 1);
							ctx.translate(-this.position.x, -this.position.y);
						}
					}
				});

				return _class;
			})());
		}
	};
});