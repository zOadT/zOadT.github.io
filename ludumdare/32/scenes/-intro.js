System.register([], function (_export) {
	return {
		setters: [],
		execute: function () {
			"use strict";

			app.scenes("intro", function () {

				var scale = 1;
				var offsetX = 0;
				var offsetY = 0;

				this.step = function () {};

				this.render = function () {

					scale = Math.min(app.width / app.ctx.images.Intro.width, app.height / app.ctx.images.Intro.height);
					offsetX = (app.width - app.ctx.images.Intro.width * scale) / 2;
					offsetY = (app.height - app.ctx.images.Intro.height * scale) / 2;

					app.ctx.setTransform(scale, 0, 0, scale, offsetX, offsetY);

					app.ctx.drawImage("Intro", 0, 0);
				};

				this.onkeydown = function () {
					app.scenes.set("main");
				};
			});
		}
	};
});