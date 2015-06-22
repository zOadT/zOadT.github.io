System.register([], function (_export) {
	return {
		setters: [],
		execute: function () {
			"use strict";

			app.scenes("hint", function () {

				var scale = 1;
				var offsetX = 0;
				var offsetY = 0;

				var counter = 0;

				this.enter = function () {
					counter++;
				};

				this.step = function () {};

				this.render = function () {
					app.ctx.clearRect(0, 0, app.width, app.height);

					if (counter >= 3) {
						scale = Math.min(app.width / app.ctx.images.hint2.width, app.height / app.ctx.images.hint2.height);
						offsetX = (app.width - app.ctx.images.hint2.width * scale) / 2;
						offsetY = (app.height - app.ctx.images.hint2.height * scale) / 2;

						app.ctx.setTransform(scale, 0, 0, scale, offsetX, offsetY);

						app.ctx.drawImage("hint2", 0, 0);
					} else {
						scale = Math.min(app.width / app.ctx.images.hint.width, app.height / app.ctx.images.hint.height);
						offsetX = (app.width - app.ctx.images.hint.width * scale) / 2;
						offsetY = (app.height - app.ctx.images.hint.height * scale) / 2;

						app.ctx.setTransform(scale, 0, 0, scale, offsetX, offsetY);

						app.ctx.drawImage("hint", 0, 0);
					}
				};

				this.onkeydown = function () {
					app.scenes.set("main");
				};
			});
		}
	};
});