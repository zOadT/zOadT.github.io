System.register([], function (_export) {
	return {
		setters: [],
		execute: function () {
			"use strict";

			app.scenes("failed", function () {

				var scale = 1;
				var offsetX = 0;
				var offsetY = 0;

				this.step = function () {};

				this.render = function () {
					app.ctx.clearRect(0, 0, app.width, app.height);

					scale = Math.min(app.width / app.ctx.images.failed.width, app.height / app.ctx.images.failed.height);
					offsetX = (app.width - app.ctx.images.failed.width * scale) / 2;
					offsetY = (app.height - app.ctx.images.failed.height * scale) / 2;

					app.ctx.setTransform(scale, 0, 0, scale, offsetX, offsetY);

					app.ctx.drawImage("failed", 0, 0);
				};

				this.onkeydown = function () {
					app.scenes.set("main");
				};
			});
		}
	};
});