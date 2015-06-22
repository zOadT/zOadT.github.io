System.register([], function (_export) {
	var _createClass, _classCallCheck;

	return {
		setters: [],
		execute: function () {
			"use strict";

			_createClass = (function () { function defineProperties(target, props) { for (var key in props) { var prop = props[key]; prop.configurable = true; if (prop.value) prop.writable = true; } Object.defineProperties(target, props); } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

			_classCallCheck = function (instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } };

			app.entity("player", (function () {
				var _class = function (level, x, y) {
					_classCallCheck(this, _class);

					this.level = level;

					this.width = 2;
					this.height = 6; //6;

					app.component.bind("position", this, x, y, this.width, this.width);
				};

				_createClass(_class, {
					move: {
						value: function move(up, left, down, right) {
							if (!up && !left && !down && !right) {
								this.position.start = false;
								this.position.step = false;
							}

							if (up) this.position.tryUp(this.level);
							if (left) this.position.tryLeft(this.level);
							if (down) this.position.tryDown(this.level);
							if (right) this.position.tryRight(this.level);
						}
					},
					render: {
						value: function render(ctx, watch) {
							/*	ctx.fillStyle = "green";
       	ctx.fillRect(this.position.x - this.width / 2, this.position.y - this.height + this.width / 2, this.width, this.height);*/
							ctx.translate(this.position.x, this.position.y);
							if (this.position.flip) ctx.scale(-1, 1);

							var offsetX = this.position.step ? app.ctx.images.player.width / 2 : 0;

							if (this.level.ownLove === true) {
								ctx.drawImage("playerlove", offsetX, 0, app.ctx.images.player.width / 2, app.ctx.images.player.height, -this.width /* / 2*/, -this.height + this.width / 2, this.width * 2, this.height);
								if (this.position.flip) ctx.scale(-1, 1);
								ctx.translate(-this.position.x, -this.position.y);
								return;
							};

							if (watch) {
								ctx.drawImage("playerwatching", offsetX, 0, app.ctx.images.player.width / 2, app.ctx.images.player.height, -this.width /* / 2*/, -this.height + this.width / 2, this.width * 2, this.height);
								if (this.position.flip) ctx.scale(-1, 1);
								ctx.translate(-this.position.x, -this.position.y);
								return;
							};

							ctx.drawImage("player", offsetX, 0, app.ctx.images.player.width / 2, app.ctx.images.player.height, -this.width /* / 2*/, -this.height + this.width / 2, this.width * 2, this.height);
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