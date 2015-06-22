System.register([], function (_export) {
	var _createClass, _classCallCheck;

	return {
		setters: [],
		execute: function () {
			"use strict";

			_createClass = (function () { function defineProperties(target, props) { for (var key in props) { var prop = props[key]; prop.configurable = true; if (prop.value) prop.writable = true; } Object.defineProperties(target, props); } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

			_classCallCheck = function (instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } };

			app.entity("arrow", (function () {
				var _class = function (target, level) {
					_classCallCheck(this, _class);

					level.arrow = this;

					this.level = level;
					this.goal = target;
					this.player = level.player;

					this.x = this.player.position.x;
					this.y = this.player.position.y;
					this.angle = Math.atan2(this.goal.position.x - this.x, this.goal.position.y - this.y);

					this.speed = 2.5;
				};

				_createClass(_class, {
					update: {
						value: function update() {

							var dir = new app.geo.vec(this.goal.position.x - this.x, this.goal.position.y - this.y);

							//console.log(dir.length);
							if (dir.length() < this.speed) {
								//	console.log("HIHO");
								if (this.level.hit) {
									this.goal.inLove = this.level.hit;
									this.level.hit.inLove = this.goal;
									this.level.hit = false;
									//break;
								} else {
									this.level.hit = this.goal;
									this.goal.inLove = true;
									//break;
								}

								dir["delete"]();
								this.level.arrow = false;
								app.entity.bite(this);

								if (this.level.ownLove) {
									this.level.hit.inLove = this.level.player;
								};

								return;
							};

							dir.normalize().scale(this.speed);

							this.x += dir.x;
							this.y += dir.y;

							dir["delete"]();
						}
					},
					render: {
						value: function render(ctx) {
							ctx.save();

							ctx.translate(this.x, this.y);

							ctx.rotate(-this.angle - Math.PI / 4 - Math.PI);

							ctx.scale(0.1, 0.1);

							ctx.drawImage("arrow", -app.ctx.images.arrow.width / 2, -app.ctx.images.arrow.height / 2);

							ctx.restore();
						}
					}
				});

				return _class;
			})());
		}
	};
});