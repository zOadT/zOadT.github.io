System.register([], function (_export) {
	return {
		setters: [],
		execute: function () {
			// load sounds and add methods to play them on the app-object
			// ohne AudioContext wenigstens normales audio machen
			"use strict";

			_export("default", function (app, _ref) {
				var loader = _ref.loader;
				var _ref$sounds = _ref.sounds;
				var sounds = _ref$sounds === undefined ? [] : _ref$sounds;

				if (!("AudioContext" in window)) {
					window.AudioContext = window.webkitAudioContext;
				};

				if (AudioContext === undefined) {
					//if still not supported simply do nothing
					//geht besser, es muss eig auch object returnt werden
					//		if(!("Audio" in window)) {
					app.audio = {
						play: function play(src, _ref2) {
							var _ref2$loop = _ref2.loop;
							var loop = _ref2$loop === undefined ? false : _ref2$loop;
							var _ref2$volume = _ref2.volume;
							var volume = _ref2$volume === undefined ? 1 : _ref2$volume;
							var _ref2$x = _ref2.x;
							var x = _ref2$x === undefined ? app.width / 2 : _ref2$x;
							var _ref2$y = _ref2.y;
							var y = _ref2$y === undefined ? app.height / 2 : _ref2$y;

							return {
								loop: loop,
								volume: volume,
								x: x,
								y: y,
								stop: function stop() {} };
						} };
					return;
					/*		};
     		//unschön
     		var canPlayOgg = new Audio().canPlayType('audio/ogg; codecs="vorbis"');
     		var canPlayMp3 = new Audio().canPlayType('audio/mp3');
     		
     		var audioFormat = canPlayOgg ? 'ogg' : 'mp3';
     		
     		var audios = [];
     		
     		for(var i = 0; i < sounds.length; i++) {
     			
     			loader.add();
     			let name = sounds[i];
     			
     			audios[name] = new Audio();
     			audios[name].src = `sounds/${name}.png`;
     			audios[name].addEventListener("load", loader.ready);
     			audios[name].addEventListener("error", loader.error);
     			
     		};
     		//geht besser, es muss eig auch object returnt werden
     		app.audio = {
     			play(name) {
     				audios[name].play();
     			},
     		};*/
				};

				var canPlayOgg = new Audio().canPlayType("audio/ogg; codecs=\"vorbis\"");
				var canPlayMp3 = new Audio().canPlayType("audio/mp3");

				var audioFormat = canPlayOgg ? "ogg" : "mp3";

				var context = new AudioContext();

				var masterNode = context.createDynamicsCompressor();
				masterNode.connect(context.destination);

				var buffers = {};
				//var pool = [];
				// convert to array
				if (typeof sounds === "string") {
					sounds = [sounds];
				};
				// loop through items and initialize them
				for (var i = 0; i < sounds.length; i++) {
					var request;

					(function () {

						loader.add();
						var name = sounds[i];

						request = new XMLHttpRequest();

						request.open("GET", "sounds/" + name + "." + audioFormat, true);
						request.responseType = "arraybuffer";

						request.onload = function () {
							if (this.status === 200) {
								var arrayBuffer = this.response;

								context.decodeAudioData(arrayBuffer, function (buffer) {
									buffers[name] = buffer;
									loader.ready();
									//					console.log(buffer);
								}, loader.error);
							} else {
								loader.error();
							};
						};
						//	request.onerror = loader.error.call(loader);

						request.send();
					})();
				};
				//loader.add();
				//loader.add();
				// cool name for object pool
				var zombiePaths = [];

				function getNodePath() {

					if (zombiePaths.length > 0) {
						return zombiePaths.pop();
					};

					var path = {};
					//		path.sourceNode = context.createBufferSource();
					path.gainNode = context.createGain();
					path.pannerNode = context.createPanner();
					//path.pannerNode.panningModel = "HRTF";
					path.pannerNode.distanceModel = "linear";
					// source -> gain -> panner -> master -> destination
					//		path.sourceNode.connect(path.gainNode);
					path.gainNode.connect(path.pannerNode);
					path.pannerNode.connect(masterNode);

					return path;
				};

				function Sound(src, args) {

					this._path = getNodePath();

					this.sourceNode = context.createBufferSource();

					this.sourceNode.buffer = buffers[src];
					this.sourceNode.loop = args.loop || false;
					this.sourceNode.onended = this.stop.bind(this);

					this.sourceNode.connect(this._path.gainNode);

					//	this._active = true;
					// source
					//		this._path.sourceNode.buffer = buffers[src];
					//		this._path.sourceNode.loop = args.loop || false;

					// volume
					//this._volume = args.volume !== undefined ? args.volume : 1;
					this.volume = args.volume !== undefined ? args.volume : 1;
					//this._path.gainNode.gain.value = this._volume;
					// pan
					this._x = app.width / 2;
					this._y = app.height / 2;
					this.x = args.x !== undefined ? args.x : this._x;
					this.y = args.y !== undefined ? args.y : this._y;
					//this._path.pannerNode.setPosition(this._x / app.width * 2 - 1, this._y / app.height * 2 - 1, -0.05);

					//		this._path.sourceNode.start(0);//source.noteOn(0);
					this.sourceNode.start(0); //source.noteOn(0);
				};
				Sound.prototype = Object.defineProperties({
					/*_deletePath: function() {
     	zombiePaths.push(this._path);
     	delete(this._path);
     	console.log(zombiePaths);
     },*/
					stop: function stop() {
						//bei 2 stops error
						if (!this.sourceNode) {
							return;
						} //			this._path.sourceNode.stop(0);
						this.sourceNode.stop(0);
						this.sourceNode.disconnect();
						delete this.sourceNode;
						//this._path.pannerNode.disconnect();

						//	this._active = false;
						//	this._deletePath();
						zombiePaths.push(this._path);
						delete this._path;
						//			console.log(zombiePaths);
					} }, {
					volume: {
						set: function (value) {
							this._volume = value;
							if (this.sourceNode) {
								this._path.gainNode.gain.value = this._volume;
							};
						},
						get: function () {
							return this._value;
						},
						configurable: true,
						enumerable: true
					},
					x: {
						set: function (value) {
							this._x = value;
							if (this.sourceNode) {
								this._path.pannerNode.setPosition(this._x / app.width * 2 - 1, this._y / app.height * 2 - 1, -0.05);
							};
						},
						get: function () {
							return this._x;
						},
						configurable: true,
						enumerable: true
					},
					y: {
						set: function (value) {
							this._y = value;
							if (this.sourceNode) {
								this._path.pannerNode.setPosition(this._x / app.width * 2 - 1, this._y / app.height * 2 - 1, -0.05);
							};
						},
						get: function () {
							return this._y;
						},
						configurable: true,
						enumerable: true
					}
				});

				// sound methods
				app.audio = {};

				app.audio.play = function (name, args) {
					args = args || {};

					return new Sound(name, args);
					/*var volume = args.volume || 1;
     var loop = args.loop || false;
     var x = args.x || app.width / 2;
     var y = args.y || app.height / 2;
     
     // source
     var source = context.createBufferSource();
     source.buffer = buffers[name];
     source.loop = loop;
     // volume
     var gainNode = context.createGain();
     gainNode.gain.value = volume;
     // pan
     var pannerNode = context.createPanner();
     pannerNode.setPosition(x / app.width * 2 - 1, y / app.height * 2 - 1, -0.05);
     // source -> gain -> panner -> master -> destination
     source.connect(gainNode);
     gainNode.connect(pannerNode);
     pannerNode.connect(masterNode);
     
     source.start(0);
     
     return {
     	stop: function() {//bei 2 stops error
     		source.stop(0);
     		source = undefined;
     		gainNode = undefined;
     		pannerNode = undefined;
     	//	pannerNode.disconnect();
     	},
     	// volume
     	set volume(value) {
     		gainNode.gain.value = value;
     	},
     	get volume() {
     		return gainNode.gain.value;
     	},
     	// pan
     	set x(value) {
     		x = value;
     		pannerNode.setPosition(x / app.width * 2 - 1, y / app.height * 2 - 1, -0.05);
     	},
     	get x() {
     		return x;
     	},
     	set y(value) {
     		y = value;
     		pannerNode.setPosition(x / app.width * 2 - 1, y / app.height * 2 - 1, -0.05);
     	},
     	get y() {
     		return y;
     	},
     };*/
				};

				// mute sounds if page is hidden
				function muteSounds() {
					masterNode.disconnect();
				};
				function unmuteSounds() {
					masterNode.connect(context.destination);
				};
				if (typeof document.hidden !== undefined) {
					document.addEventListener("visibilitychange", function () {
						if (document.hidden === true) {
							muteSounds();
						} else {
							unmuteSounds();
						};
					});
				} else {
					window.addEventListener("blur", function () {
						muteSounds();
					});
					window.addEventListener("focus", function () {
						unmuteSounds();
					});
				};
			});
		}
	};
});

// volume

// pan