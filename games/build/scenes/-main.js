System.register([], function (_export) {
	var _applyConstructor, _toConsumableArray;

	return {
		setters: [],
		execute: function () {
			"use strict";

			_applyConstructor = function (Constructor, args) { var instance = Object.create(Constructor.prototype); var result = Constructor.apply(instance, args); return result != null && (typeof result == "object" || typeof result == "function") ? result : instance; };

			_toConsumableArray = function (arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) arr2[i] = arr[i]; return arr2; } else { return Array.from(arr); } };

			app.scenes("main", function (app) {

				var level = null;
				var levelId = 1;

				var scale = 1;
				var offsetX = 0;
				var offsetY = 0;

				var arrow = false;

				var playerWatch = false;
				var countdownId = false;

				this.setLevel = function (id) {

					playerWatch = false;
					if (countdownId !== false) {
						window.clearTimeout(countdownId);
						countdownId = false;
					};

					arrow = false;

					var data = app.data.levels[id];
					levelId = 1;

					if (level) {
						app.entity.bite(level.player);
						for (var i = 0; i < level.guards.length; i++) {
							app.entity.bite(level.guards[i]);
						};
					} else {
						level = {};
					};

					level.bg = data.bg;
					level.size = _applyConstructor(app.geo.vec, _toConsumableArray(data.size));
					level.goal = data.goal;
					level.player = app.entity.get("player", level, data.entities[0], data.entities[1]);

					level.guards = [];
					for (var i = 2; i < data.entities.length; i += 2) {
						level.guards.push(app.entity.get("guard", level, data.entities[i], data.entities[i + 1]));
					};

					level.walls = data.walls;

					level.hit = false;
				};

				this.restartLevel = function () {
					this.setLevel(levelId);
				};

				this.nextLevel = function () {
					this.setLevel(levelId + 1);
				};

				this.oncreate = function () {};

				this.enter = function () {
					this.setLevel(1);
				};

				this.step = function () {

					level.player.move(app.keyboard.buttons.UP.pressed, app.keyboard.buttons.LEFT.pressed, app.keyboard.buttons.DOWN.pressed, app.keyboard.buttons.RIGHT.pressed);

					for (var i = 0; i < level.guards.length; i++) {
						level.guards[i].update();
					};

					if (level.goal && level.player.position.x > level.goal[0] && level.player.position.x < level.goal[0] + level.goal[2] && level.player.position.y > level.goal[1] && level.player.position.y < level.goal[1] + level.goal[3]) {
						this.nextLevel();
					};
				};

				this.render = function () {

					var ctx = app.ctx;

					ctx.clearRect(0, 0, app.width, app.height);

					scale = Math.min(app.width / level.size.x, app.height / level.size.y);
					offsetX = (app.width - level.size.x * scale) / 2;
					offsetY = (app.height - level.size.y * scale) / 2;

					ctx.scale(scale, scale);

					ctx.setTransform(scale, 0, 0, scale, offsetX, offsetY);

					ctx.fillStyle = "#DDDDDD";
					ctx.fillRect.apply(ctx, [0, 0].concat(_toConsumableArray(level.size)));
					app.ctx.lineWidth = 0.5;

					if (level.goal) {
						ctx.fillStyle = "#A3CE27";
						ctx.fillRect.apply(ctx, _toConsumableArray(level.goal));
					};

					ctx.strokeStyle = "black";
					for (var i = 0; i < level.walls.length; i += 4) {
						ctx.beginPath();
						ctx.moveTo(level.walls[i], level.walls[i + 1]);
						ctx.lineTo(level.walls[i + 2], level.walls[i + 3]);
						ctx.stroke();
						ctx.closePath();
					};

					if (level.bg) {
						ctx.drawImage(level.bg, 0, 0, ctx.images[level.bg].width, ctx.images[level.bg].height, 0, 0, level.size.x, level.size.y);
					};

					var playerWatchNow = false;
					for (var i = 0; i < level.guards.length; i++) {

						var watch = level.guards[i].isSeeing(level.player.position);
						if (watch) {
							playerWatchNow = true;
							ctx.strokeStyle = "#15C2A5";
							ctx.beginPath();
							ctx.moveTo(level.guards[i].position.x, level.guards[i].position.y);
							ctx.lineTo(level.player.position.x, level.player.position.y);
							ctx.stroke();
							ctx.closePath();
						}

						level.guards[i].render(ctx, watch);
					};

					if (playerWatchNow === true && playerWatch === false) {
						countdownId = window.setTimeout(function () {
							alert("Dummkopf");
						}, 300);
						console.log(countdownId);
					};
					if (playerWatchNow === false && playerWatch === true) {
						window.clearTimeout(countdownId);
						countdownId == false;
					};

					playerWatch = playerWatchNow;

					level.player.render(ctx, playerWatch);
				};

				this.onmousedown = function (mouse, button) {

					var mx = (mouse.x - offsetX) / scale;
					var my = (mouse.y - offsetY) / scale;

					//console.log(mx, my);

					for (var i = 0; i < level.guards.length; i++) {
						var guard = level.guards[i];

						if (mx > guard.position.x - guard.position.width / 2 && mx < guard.position.x + guard.position.width / 2 && my > guard.position.y - guard.position.height / 2 && my < guard.position.y + guard.position.height / 2) {

							if (guard.inLove === true) {
								guard.inLove = false;
								level.hit = false;
								break;
							}
							//nur einmal vberlieben, später kanns auch anders sein
							if (guard.inLove) break;
							/*	this.setArrow(guard);
       	break;*/
							if (level.hit) {
								guard.inLove = level.hit;
								level.hit.inLove = guard;
								level.hit = false;
								break;
							} else {
								level.hit = guard;
								guard.inLove = true;
								break;
							}
						};
					};
				};

				this.setArrow = function (target) {
					level.arrow = {
						duration: app.geo.distancePointPoint(level.player.position.x, level.player.position.y, target.position.x, target.position.y) * 10,
						startTime: app.time,
						//
						start: app.geo.vec(level.player.position.x, level.player.position.y),
						end: app.geo.vec(target.position.x, target.position.y) };

					window.setTimeout(function () {
						if (level.hit) {
							target.inLove = level.hit;
							level.hit.inLove = target;
							level.hit = false;
						} else {
							level.hit = target;
							target.inLove = true;
						}
					}, level.arrow.duration);
				};

				this.onkeydown = function (keyboard, button) {};
			});
		}
	};
});