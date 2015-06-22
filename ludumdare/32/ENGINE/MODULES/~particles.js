System.register([], function (_export) {
  return {
    setters: [],
    execute: function () {
      //http://gamedevelopment.tutsplus.com/articles/mastering-the-gamemaker-studio-particle-system--cms-22782?WT.mc_id=Tuts+_email_WeeklyDigest-20141225&utm_content=buffer49c01&utm_medium=social&utm_source=twitter.com&utm_campaign=buffer

      "use strict";

      _export("default", function (app, args) {

        var pool = [];

        app.particle.Spawner = function (args, init, step, render) {};
      });

      /*
       *	particle: 
       *		init: fun(args);this=particle
       *		step: fun(args);this=particle
       *		?render: fun(args);this=particle
       *		?destroy: fun()
       *
       *	pos
       *	vel
       *	dir
       *	size
       *	rotation
       *	rotationspeed
       *	gravitation
       *	color
       *	?layer
       *	
       * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * */
    }
  };
});