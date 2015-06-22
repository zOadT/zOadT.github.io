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
				var sscale = 1;
				var offsetX = 0;
				var offsetY = 0;

				var arrow = false;

				var playerWatch = false;
				var countdownId = false;

				var lines = [];

				var ctx = app.ctx.createLayer("main", app.width, app.height);
				ctx.scale(4, 4);
				ctx.translate(0, 3);

				//var countTries = 0;

				this.setLevel = function (id) {

					playerWatch = false;
					if (countdownId !== false) {
						window.clearTimeout(countdownId);
						countdownId = false;
					};

					arrow = false;

					var data = app.data.levels[id];
					levelId = id;

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
					level.tiles = data.tiles;

					level.guards = [];
					for (var i = 2; i < data.entities.length; i++) {
						level.guards.push(app.entity.get("guard", level, data.entities[i]));
					};

					level.walls = data.walls;

					level.hit = false;

					level.ownLove = false;

					if (levelId === 5) {

						level.ownLove = true;

						level.hit = level.guards[0];
						level.hit.inLove = level.player;

						//	app.audio.play("geil");
						ctx.translate(0, -3);
					};
				};

				this.restartLevel = function () {
					this.setLevel(levelId);
				};

				this.nextLevel = function () {
					app.audio.play("next");
					this.setLevel(levelId + 1);
				};

				this.oncreate = function () {};

				this.enter = function () {
					this.restartLevel();
				};

				this.step = function () {

					if (level.arrow) level.arrow.update();

					level.player.move(app.keyboard.buttons.UP.pressed || app.keyboard.buttons.W.pressed, app.keyboard.buttons.LEFT.pressed || app.keyboard.buttons.A.pressed, app.keyboard.buttons.DOWN.pressed || app.keyboard.buttons.S.pressed, app.keyboard.buttons.RIGHT.pressed || app.keyboard.buttons.D.pressed);

					for (var i = 0; i < level.guards.length; i++) {
						level.guards[i].update();
					};

					if (level.goal && level.player.position.x > level.goal[0] && level.player.position.x < level.goal[0] + level.goal[2] && level.player.position.y > level.goal[1] && level.player.position.y < level.goal[1] + level.goal[3]) {
						this.nextLevel();
					};
				};

				this.render = function () {

					//	var ctx = app.ctx;
					ctx.clearRect(0, -3, app.width, app.height + 3);

					sscale = scale = Math.min(app.width / level.size.x / 4, app.height / ((level.size.y + (levelId !== 5 ? 3 : 0)) * 4 /* + 12/*+ 3 / 4*/));

					sscale *= 4;
					offsetX = (app.width - level.size.x * 4 * scale) / 2;
					offsetY = (app.height - (level.size.y * 4 + (levelId !== 5 ? 12 : 0)) * scale) / 2;

					//	ctx.scale(scale, scale);
					/*scale=4;
     offsetX = 0;
     offsetY = 0;*/
					//	scale = 4.5;
					//		console.log(scale);
					//	scale = 1;
					app.ctx.save();
					app.ctx.transform(scale, 0, 0, scale, offsetX, offsetY);

					//	scale = 1;

					//	scale = 2;

					ctx.fillStyle = "#DDDDDD";
					ctx.fillRect.apply(ctx, [0, 0].concat(_toConsumableArray(level.size)));
					app.ctx.lineWidth = 0.5;

					if (!level.tiles) {
						ctx.strokeStyle = "black";
						for (var i = 0; i < level.walls.length; i += 4) {
							ctx.beginPath();
							ctx.moveTo(level.walls[i], level.walls[i + 1]);
							ctx.lineTo(level.walls[i + 2], level.walls[i + 3]);
							ctx.stroke();
							ctx.closePath();
						};
					};
					var playerWatchNow = false;
					lines.length = 0;
					for (var i = 0; i < level.guards.length; i++) {
						var watch = level.guards[i].isSeeing(level.player.position) && (level.ownLove === false || level.hit === false);
						if (watch) {
							playerWatchNow = true;
							/*ctx.strokeStyle = "#15C2A5";
       ctx.beginPath();
       ctx.moveTo(level.guards[i].position.x, level.guards[i].position.y);
       ctx.lineTo(level.player.position.x, level.player.position.y);
       ctx.stroke();
       ctx.closePath();*/

							lines.push(level.guards[i].position.x, level.guards[i].position.y, level.player.position.x, level.player.position.y);
						}
					};

					//draw tiles

					//var playerWatchNow = false;
					if (level.tiles) {

						for (var line = 0; line < level.size.y / 4; line++) {

							for (var j = 0; j < level.size.x / 4; j++) {

								var id = level.tiles[line * level.size.x / 4 + j];

								ctx.drawImage("tiles", id % 12 * 16, (id / 12 | 0) * 28, 16, 28, j * 4, line * 4 - 3, 4, 7);
							};

							/*if(level.goal && level.goal[1] <= (line + 1) * 4) {
       	
       	var g = Math.min(level.goal[1] + level.goal[3] - line * 4);
       	
       	if(g > 0) {
       		ctx.globalAlpha = 0.2;
       		ctx.fillStyle = "#44891A";
       		ctx.fillRect(level.goal[0], Math.max(level.goal[1], line * 4), level.goal[2], Math.min(level.goal[1] + level.goal[3] - line * 4, 4));
       		ctx.globalAlpha = 1;
       	};
       };*/

							if (level.bg) {

								var s = app.ctx.images[level.bg].width / level.size.x;

								ctx.drawImage(level.bg, 0, line * 4 * s, app.ctx.images[level.bg].width, 4 * s, 0, 4 * line, level.size.x, 4);
							};

							for (var i = 0; i < level.guards.length; i++) {

								if (level.guards[i].position.y + 2 > line * 4 && level.guards[i].position.y < (line + 1) * 4) {
									var watch = level.guards[i].isSeeing(level.player.position) && (level.ownLove === false || level.hit === false);
									/*	if(watch) {
         		playerWatchNow = true;
         		ctx.strokeStyle = "#15C2A5";
         		ctx.beginPath();
         		ctx.moveTo(level.guards[i].position.x, level.guards[i].position.y);
         		ctx.lineTo(level.player.position.x, level.player.position.y);
         		ctx.stroke();
         		ctx.closePath();
         	}*/

									level.guards[i].render(ctx, watch);
								};
							};

							if (level.player.position.y + 1 > line * 4 && level.player.position.y < (line + 1) * 4) level.player.render(ctx, playerWatch);
						};
					};

					for (var i = 0; i < lines.length; i += 4) {
						ctx.strokeStyle = "#15C2A5";
						ctx.beginPath();
						ctx.moveTo(lines[i], lines[i + 1]);
						ctx.lineTo(lines[i + 2], lines[i + 3]);
						ctx.stroke();
						ctx.closePath();
					};

					/*	var playerWatchNow = false;
     	for(var i = 0; i < level.guards.length; i++) {
     		
     		var watch = level.guards[i].isSeeing(level.player.position)
     		if(watch) {
     			playerWatchNow = true;
     			ctx.strokeStyle = "#15C2A5";
     			ctx.beginPath();
     			ctx.moveTo(level.guards[i].position.x, level.guards[i].position.y);
     			ctx.lineTo(level.player.position.x, level.player.position.y);
     			ctx.stroke();
     			ctx.closePath();
     		}
     		
     		level.guards[i].render(ctx, watch);
     	};*/

					if (playerWatchNow === true && playerWatch === false) {
						countdownId = window.setTimeout(function () {
							//alert("Dummkopf");
							if (levelId === 4) {
								//	countTries++;
								//	if(countTries >= 3) alert("HINT: Click on yourself");
								app.scenes.set("hint");
							} else {
								app.scenes.set("failed");
							};
						}, 300);
						app.audio.play("alert");
					};
					if (playerWatchNow === false && playerWatch === true) {
						window.clearTimeout(countdownId);
						countdownId == false;
					};

					playerWatch = playerWatchNow;

					//	level.player.render(ctx, playerWatch);

					if (level.arrow) level.arrow.render(ctx);

					app.ctx.drawImage("main", 0, 0);

					/*	if(level.goal) {
     		ctx.fillStyle = "#A3CE27";
     		ctx.fillRect(...level.goal);
     	};*/

					/*	if(level.bg) {
     		ctx.drawImage(level.bg, 0, 0, app.ctx.images[level.bg].width, app.ctx.images[level.bg].height, 0, 0, level.size.x, level.size.y);
     	};*/
					/*ctx.strokeStyle = "black";
     for(var i = 0; i < level.walls.length; i += 4) {
     	ctx.beginPath();
     	ctx.moveTo(level.walls[i], level.walls[i + 1]);
     	ctx.lineTo(level.walls[i + 2], level.walls[i + 3]);
     	ctx.stroke();
     	ctx.closePath();
     };*/
				};

				this.onmousedown = function (mouse, button) {

					if (level.hit && level.ownLove) return;

					var mx = (mouse.x - offsetX) / sscale;
					var my = (mouse.y - offsetY) / sscale;

					//console.log(mx, my);

					if (level.arrow) return;

					for (var i = 0; i < level.guards.length; i++) {
						var guard = level.guards[i];

						if (mx > guard.position.x - guard.position.width / 2 && mx < guard.position.x + guard.position.width / 2 && my > guard.position.y - guard.position.height /* / 2*/ && my < guard.position.y + guard.position.height /* / 2*/) {

							if (guard.inLove === true) {
								guard.inLove = false;
								level.hit = false;
								break;
							}
							//nur einmal vberlieben, später kanns auch anders sein
							if (guard.inLove) break;
							app.audio.play("shoot");
							app.entity.get("arrow", guard, level);
							break;
							/*	app.audio.play("shoot");
       	if(level.hit) {
       		guard.inLove = level.hit;
       		level.hit.inLove = guard;
       		level.hit = false;
       		break;
       	}
       	else {
       		level.hit = guard;
       		guard.inLove = true;
       		break;
       	}*/
						};
					};

					if (levelId === 4) {

						if (mx > level.player.position.x - level.player.position.width / 2 && mx < level.player.position.x + level.player.position.width / 2 && my > level.player.position.y - level.player.position.height * 2 /* / 2*/ && my < level.player.position.y + level.player.position.height * 2 /*/ 2*/) {

							level.ownLove = true;

							if (level.hit) {
								level.hit.inLove = level.player;
							};
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