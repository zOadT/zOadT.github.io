System.register([], function (_export) {
	return {
		setters: [],
		execute: function () {
			// load fonts, only ttf D:
			"use strict";

			_export("default", function (app, _ref) {
				var loader = _ref.loader;
				var _ref$fonts = _ref.fonts;
				var fonts = _ref$fonts === undefined ? [] : _ref$fonts;

				// convert to array
				if (typeof fonts === "string") {
					fonts = [fonts];
				};
				// create Stylesheet to attach fonts
				var styleElement = document.createElement("style");

				styleElement.innerHTML = "";
				//for(var i = 0; i < fonts.length; i++) {
				//for(let name of fonts) {
				for (var i = 0; i < fonts.length; i++) {
					var _name = fonts[i];

					styleElement.innerHTML += "@font-face {\n\tfont-family: '" + _name + "';\n\tsrc:\n\t\turl(fonts/" + _name + ".ttf) format('truetype');\n\t//\turl(fonts/" + _name + ".woff) format('woff')\"\n};\n";
					//wegen var vllt bug bei mehreren?
					var element = document.createElement("div");
					document.body.appendChild(element);
					element.innerHTML = "#";
					element.style.fontFamily = "\"" + _name + "\"";
					// super hacky
					//window.setTimeout(function(){document.body.removeChild(element);}, 0);
					window.setTimeout(document.body.removeChild.bind(document.body, element), 0);

					if (document.fonts !== undefined) {
						loader.add();
						document.fonts.load("1em \"" + _name + "\"").then(loader.ready, loader.error);
					};
				};

				document.head.appendChild(styleElement);
			});
		}
	};
});