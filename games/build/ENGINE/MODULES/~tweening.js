System.register([], function (_export) {
	return {
		setters: [],
		execute: function () {
			/*\
    *	
    *	Scenenzeit sollte eingebracht werden
    *	Überschneidungen verhindern
   \*/

			/*
   
   app.tween(obj, "prop").to(value, time, "linear")
   
   app.tween(obj, "prop", value, time, "linear")
   
   */

			"use strict";

			_export("default", function (app) {

				var tweens = [];

				// By Rezoner

				/* 
      A full list of simple easing equations inspired by GIST from greweb - https://gist.github.com/gre/1650294
      Equations source - http://gsgd.co.uk/sandbox/jquery/easing/
    */

				var t = {
					linear: function linear(t) {
						return t;
					},
					inQuad: function inQuad(t) {
						return t * t;
					},
					outQuad: function outQuad(t) {
						return t * (2 - t);
					},
					inOutQuad: function inOutQuad(t) {
						return t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t;
					},
					inCubic: function inCubic(t) {
						return t * t * t;
					},
					outCubic: function outCubic(t) {
						return --t * t * t + 1;
					},
					inOutCubic: function inOutCubic(t) {
						return t < 0.5 ? 4 * t * t * t : (t - 1) * (2 * t - 2) * (2 * t - 2) + 1;
					},
					inQuart: function inQuart(t) {
						return t * t * t * t;
					},
					outQuart: function outQuart(t) {
						return 1 - --t * t * t * t;
					},
					inOutQuart: function inOutQuart(t) {
						return t < 0.5 ? 8 * t * t * t * t : 1 - 8 * --t * t * t * t;
					},
					inQuint: function inQuint(t) {
						return t * t * t * t * t;
					},
					outQuint: function outQuint(t) {
						return 1 + --t * t * t * t * t;
					},
					inOutQuint: function inOutQuint(t) {
						return t < 0.5 ? 16 * t * t * t * t * t : 1 + 16 * --t * t * t * t * t;
					},
					inSine: function inSine(t) {
						return -1 * Math.cos(t / 1 * (Math.PI * 0.5)) + 1;
					},
					outSine: function outSine(t) {
						return Math.sin(t / 1 * (Math.PI * 0.5));
					},
					inOutSine: function inOutSine(t) {
						return -1 / 2 * (Math.cos(Math.PI * t) - 1);
					},
					inExpo: function inExpo(t) {
						return t === 0 ? 0 : Math.pow(2, 10 * (t - 1));
					},
					outExpo: function outExpo(t) {
						return t == 1 ? 1 : -Math.pow(2, -10 * t) + 1;
					},
					inOutExpo: function inOutExpo(t) {
						if (t === 0) {
							return 0;
						}if (t === 1) {
							return 1;
						}if ((t /= 1 / 2) < 1) {
							return 1 / 2 * Math.pow(2, 10 * (t - 1));
						}return 1 / 2 * (-Math.pow(2, -10 * --t) + 2);
					},
					inCirc: function inCirc(t) {
						return -1 * (Math.sqrt(1 - t * t) - 1);
					},
					outCirc: function outCirc(t) {
						return Math.sqrt(1 - (t = t - 1) * t);
					},
					inOutCirc: function inOutCirc(t) {
						if ((t /= 1 / 2) < 1) {
							return -1 / 2 * (Math.sqrt(1 - t * t) - 1);
						}return 1 / 2 * (Math.sqrt(1 - (t -= 2) * t) + 1);
					},
					inElastic: function inElastic(t) {
						var s = 1.70158;
						var p = 0;
						var a = 1;
						if (t === 0) {
							return 0;
						}if (t === 1) {
							return 1;
						}if (!p) p = 0.3;
						if (a < 1) {
							a = 1;
							var s = p / 4;
						} else var s = p / (2 * Math.PI) * Math.asin(1 / a);
						return -(a * Math.pow(2, 10 * (t -= 1)) * Math.sin((t - s) * (2 * Math.PI) / p));
					},
					outElastic: function outElastic(t) {
						var s = 1.70158;
						var p = 0;
						var a = 1;
						if (t === 0) {
							return 0;
						}if (t === 1) {
							return 1;
						}if (!p) p = 0.3;
						if (a < 1) {
							a = 1;
							var s = p / 4;
						} else var s = p / (2 * Math.PI) * Math.asin(1 / a);
						return a * Math.pow(2, -10 * t) * Math.sin((t - s) * (2 * Math.PI) / p) + 1;
					},
					inOutElastic: function inOutElastic(t) {
						var s = 1.70158;
						var p = 0;
						var a = 1;
						if (t === 0) {
							return 0;
						}if ((t /= 1 / 2) == 2) {
							return 1;
						}if (!p) p = 0.3 * 1.5;
						if (a < 1) {
							a = 1;
							var s = p / 4;
						} else var s = p / (2 * Math.PI) * Math.asin(1 / a);
						if (t < 1) {
							return -0.5 * (a * Math.pow(2, 10 * (t -= 1)) * Math.sin((t - s) * (2 * Math.PI) / p));
						}return a * Math.pow(2, -10 * (t -= 1)) * Math.sin((t - s) * (2 * Math.PI) / p) * 0.5 + 1;
					},
					inBack: function inBack(t) {
						var s = arguments[1] === undefined ? 1.70158 : arguments[1];

						return 1 * t * t * ((s + 1) * t - s);
					},
					outBack: function outBack(t) {
						var s = arguments[1] === undefined ? 1.70158 : arguments[1];

						return 1 * ((t = t / 1 - 1) * t * ((s + 1) * t + s) + 1);
					},
					inOutBack: function inOutBack(t) {
						var s = arguments[1] === undefined ? 1.70158 : arguments[1];

						if ((t /= 1 / 2) < 1) {
							return 1 / 2 * (t * t * (((s *= 1.525) + 1) * t - s));
						}return 1 / 2 * ((t -= 2) * t * (((s *= 1.525) + 1) * t + s) + 2);
					},
					inBounce: function inBounce(t) {
						return 1 - this.outBounce(1 - t);
					},
					outBounce: function outBounce(t) {
						if ((t /= 1) < 1 / 2.75) {
							return 7.5625 * t * t;
						} else if (t < 2 / 2.75) {
							return 7.5625 * (t -= 1.5 / 2.75) * t + 0.75;
						} else if (t < 2.5 / 2.75) {
							return 7.5625 * (t -= 2.25 / 2.75) * t + 0.9375;
						} else {
							return 7.5625 * (t -= 2.625 / 2.75) * t + 0.984375;
						}
					},
					inOutBounce: function inOutBounce(t) {
						if (t < 1 / 2) {
							return this.inBounce(t * 2) * 0.5;
						}return this.outBounce(t * 2 - 1) * 0.5 + 0.5;
					}

				};

				var easingFunctions = {
					linear: function linear(percent, elapsed, start, end, total) {
						return start + (end - start) * percent;
					},
					easeInQuad: function easeInQuad(x, t, b, c, d) {
						//	return start + (
						return (c - b) * (t / d) * (t / d) + b;
					},
					easeOutQuad: function easeOutQuad(x, t, b, c, d) {
						return -(c - b) * (t /= d) * (t - 2) + b;
					},
					easeInOutQuad: function easeInOutQuad(x, t, b, c, d) {
						if ((t /= d / 2) < 1) {
							return (c - b) / 2 * t * t + b;
						}return -(c - b) / 2 * (--t * (t - 2) - 1) + b;
					},
					easeInElastic: function easeInElastic(x, t, b, c, d) {
						var s = 1.70158;var p = 0;var a = c - b;
						if (t == 0) {
							return b;
						}if ((t /= d) == 1) {
							return b + (c - b);
						}if (!p) p = d * 0.3;
						if (a < Math.abs(c - b)) {
							a = c - b;var s = p / 4;
						} else var s = p / (2 * Math.PI) * Math.asin((c - b) / a);
						return -(a * Math.pow(2, 10 * (t -= 1)) * Math.sin((t * d - s) * (2 * Math.PI) / p)) + b;
					} };

				app.tween = function (object, endValue, args) {
					var propertys = [];
					var startValues = [];
					var endValues = [];

					for (var property in endValue) {
						if (endValue.hasOwnProperty(property)) {
							propertys.push(property);
							startValues.push(object[property]);
							endValues.push(endValue[property]);
						};
					};

					var tween = {
						object: object,
						propertys: propertys,

						startValues: startValues,
						endValues: endValues,

						startTime: app.time,
						endTime: app.time + (args.frames || 60),

						frames: args.frames || 60,
						easingFunction: easingFunctions[args.mode || "linear"] };

					var promise = new Promise(function (resolve, reject) {

						tween.finished = function () {
							resolve();
						};

						tween.stop = function () {
							reject();
						};
					});

					tweens.push(tween);

					return promise;

					//vllt setter def um tweening abzubrechen?
				};

				/*app.tween.end = function(id) {
    	console.log("HI");
    };*/
				//vllt frame?
				app.on("step", function () {

					for (var i = 0; i < tweens.length; i++) {
						var tween = tweens[i];

						for (var j = 0; j < tween.propertys.length; j++) {
							var property = tween.propertys[j];

							tween.object[tween.propertys[j]] = tween.easingFunction((app.time - tween.startTime) / tween.frames, app.time - tween.startTime, tween.startValues[j], tween.endValues[j], tween.frames);
						};
						// delete tween object once finished
						if (app.time >= tween.endTime) {
							tweens[i].finished();
							tweens.splice(i--, 1);
						};
					};
				});
			});
		}
	};
});