{
	setObject:[
		{
			object:"enemies",
			property:"ship1",
			value:{ // Accelleration based enemy
		  		accx:0,accy:10,
		  		script:[
		  			{ forframes:10, everyframe:2, addaccy:-1 },
		  			{ afterframes:30,  doit: { every:20, action:function(th) { gbox.hitAudio("foefire"); toys.shmup.fireBullet("foesbullets",null,{collidegroup:"player",from:th,upper:false,tileset:"bulletsmall",spark:function(th){defaultSpark(th)},frames:{speed:3,frames:[0,1]},accx:0,accy:5}); } } },
		  			{ forframes:17, everyframe:5, addaccy:-1 }
		  		]
		  	}
		},{
			object:"enemies",
			property:"ship2",
			value: { // Angle based enemy
		  		angle:trigo.ANGLE_RIGHT,acc:10,
		  		script:[
		  			{ forframes:10, everyframe:2, addacc:-1 },
		  			{ afterframes:30,  doit: { every:20,action:function(th) { gbox.hitAudio("foefire"); toys.shmup.fireBullet("foesbullets",null,{collidegroup:"player",from:th,upper:false,tileset:"bulletsmall",spark:function(th){defaultSpark(th)},frames:{speed:3,frames:[0,1]},accx:8,accy:8}); } } },
		  			{ forframes:20, addangle:0.1, addacc:1 }
		  		]
		  	}
		 },{
			object:"enemies",
			property:"ship3",
			value: { // Angle based enemy (specular)
		  		angle:trigo.ANGLE_LEFT,acc:10,
		  		script:[
		  			{ forframes:10, everyframe:2, addacc:-1 },
		  			{ afterframes:30,  doit: { every:20,action:function(th) { gbox.hitAudio("foefire"); toys.shmup.fireBullet("foesbullets",null,{collidegroup:"player",from:th,upper:false,tileset:"bulletsmall",spark:function(th){defaultSpark(th)},frames:{speed:3,frames:[0,1]},accx:-8,accy:8}); } } },
		  			{ forframes:20, addangle:-0.1, addacc:1 }
		  		]
		  	}
		  },{
			object:"enemies",
			property:"bigship",
			value: {
		  		accx:0, accy:1,
		  		health:10,
		  		tileset:"enemy2",
		  		frames:{
		  			still:{speed:1,frames:[0,0,0,1,2,1]}, // glowing center
		  			hit:{speed:1,frames:[0,3]}
		  		},
		  		kill:function(by) {
		  			gbox.hitAudio("megaexplosion");
		  			toys.generate.sparks.simple(this,"sparks",null,{animspeed:2,tileset:"explosion",accx:help.random(-5,10),accy:help.random(-5,10)}); // ereditate the explosion direction
		  			toys.generate.sparks.simple(this,"sparks",null,{animspeed:2,tileset:"explosion",accx:help.random(-5,10),accy:help.random(-5,10)}); // ereditate the explosion direction
		  			toys.generate.sparks.popupText(this,"sparks","",{font:"bigred",jump:6,text:"3000pts",keep:10});
		  			maingame.hud.addValue("score","value",3000);
		  			gbox.trashObject(this);
		  		},
		  		script:[
		  			{ afterframes:5,  doit: { every:20,action:function(th) {
		  				gbox.hitAudio("foefire");
		  				toys.shmup.fireBullet("foesbullets",null,{collidegroup:"player",from:th,upper:false,tileset:"bulletbig",spark:function(th){defaultSpark(th)},frames:{speed:1,frames:[1]},accx:0,accy:5});
		  			} } }
		  		]
		  	}
		  },{
			object:"enemies",
			property:"powerup",
			value: {
		  		accx:0,accy:-5,
		  		invulnerable:true,
		  		tileset:"powerup",
		  		frames:{
		  			still:{speed:1,frames:[0,1]}
		  		},
		  		kill:function() {}, // Not killable
		  		hitByBullet:function(by) { return true; }, // Passthru bullet
				handler:function(th) {
					if (gbox.collides(th,gbox.getObject("player","player"))) {
						gbox.hitAudio("powerup");
						toys.generate.sparks.simple(th,"sparks",null,{animspeed:4,tileset:"spark",accy:-2}); // a moving up spark
						maingame.hud.addValue("score","value",500);
						gbox.getObject("player","player").powerUp(); // Power up ship
						gbox.trashObject(th); // Vanish
					}
				},
				script:[
					{forframes:15,addaccy:1} // go down
				]
		  	}
		  },{
			object:"enemies",
			property:"boss",
			value:{
		  		x:gbox.getScreenHW()-94,y:-100, // the middle of the screen...
		  		accx:0, accy:0, // starts still
		  		health:100,
		  		invulnerable:true, // Starts invulnerable. It become vulnerable after the dialogue
		  		tileset:"boss",
		  		frames:{
		  			still:{speed:1,frames:[0]},
		  			hit:{speed:1,frames:[0,1]}
		  		},
		  		kill:function(th,by) {
		  			th.invulnerable=true; // During the exploding sequence, the ship is invulnerable...
		  			th.goTo(23); // Goto the blowing sequence.
		  		},
		  		handler:function(th) {  }, // Never goes away
		  		initialize: function(th) { // initialize is the first thing called. prepare the boss dialogue
		  			toys.resetToy(th,"beforeboss-dialogue"); // prepare the dialogue before the boss
		  			toys.resetToy(th,"boss-dialogue"); 
		  			toys.resetToy(th,"bossend-dialogue"); 
		  		},
		  		script:[
		  		//
		  			{ waitfor:function(th) { return toys.getToyStatus(th,"beforeboss-dialogue") }, doit: { render:function(th) { toys.dialogue.render(th,"beforeboss-dialogue",dialogues.beforeboss); } } }, // Wait for the boss intro dialogue
		  			{ doit: { render:function(th) { gbox.hitAudio("boss"); toys.generate.audio.fadeOut(this,"background",null,{fadein:true,channel:"bgmusic"}); }} },  // Fade in boss music
		  			{ setaccy:1, doit: { } }, // Start going down...
		  			{ afterframes:100, setaccy:0 }, // It cames from the top
		  			{ waitfor:function(th) { return toys.getToyStatus(th,"boss-dialogue") }, doit: { render:function(th) { toys.dialogue.render(th,"boss-dialogue",dialogues.boss); } } }, // Wait for the boss intro dialogue
		  			{ doit: { } }, // Cancel the dialog scene
		  			// After stopped, became vulnerable and prepare the bullet pattern
		  			{ setinvulnerable:false, doit:{every:10,action:function(th,time){
		  				gbox.hitAudio("foefire");
		  				if (time%3==0) { // Sometime fires the diagonals bullets... (time is the counter of the calls of the action)
		  					toys.shmup.fireBullet("foesbullets",null,{collidegroup:"player",from:th,upper:false,tileset:"bulletsmall",spark:function(th){defaultSpark(th)},frames:{speed:3,frames:[0,1]},gapx:-20,gapy:20,accx:-2,accy:4});
		  					toys.shmup.fireBullet("foesbullets",null,{collidegroup:"player",from:th,upper:false,tileset:"bulletsmall",spark:function(th){defaultSpark(th)},frames:{speed:3,frames:[0,1]},gapx:20,gapy:20,accx:2,accy:4});
		  					toys.shmup.fireBullet("foesbullets",null,{collidegroup:"player",from:th,upper:false,tileset:"bulletsmall",spark:function(th){defaultSpark(th)},frames:{speed:3,frames:[0,1]},gapx:-20,gapy:20,accx:-4,accy:4});
		  					toys.shmup.fireBullet("foesbullets",null,{collidegroup:"player",from:th,upper:false,tileset:"bulletsmall",spark:function(th){defaultSpark(th)},frames:{speed:3,frames:[0,1]},gapx:20,gapy:20,accx:4,accy:4});
		  				}
		  				// Fires the vertical bullets every time. Speed is random
		  				toys.shmup.fireBullet("foesbullets",null,{collidegroup:"player",from:th,upper:false,tileset:"bulletbig",spark:function(th){defaultSpark(th)},frames:{speed:1,frames:[1]},accx:0,gapx:-10,accy:help.random(2,3)});
		  				toys.shmup.fireBullet("foesbullets",null,{collidegroup:"player",from:th,upper:false,tileset:"bulletbig",spark:function(th){defaultSpark(th)},frames:{speed:1,frames:[1]},accx:0,gapx:10,accy:help.random(2,3)});
		  				if (th.health<20) { // if low health, starting exploding! A classic!
		  					if (time%(th.health<10?1:2)==0) {// faster if very very low...
		  						gbox.hitAudio("explosion");
		  						toys.generate.sparks.simple(th,"sparks",null,{animspeed:2,tileset:"explosion",accx:help.random(-5,10),accy:help.random(-5,10)});
		  					}
		  				}
		  			} } },
		  			{ forframes:6, everyframe:2,addaccx:-1 }, // moves horizontally, changing sometime the acceleration
		  			{ afterframes:8, forframes:12, everyframe:2, addaccx:1 },
		  			{ afterframes:24, forframes:12, everyframe:2, addaccx:-1 },
		  			{ afterframes:24, forframes:12, everyframe:2, addaccx:1 },
		  			{ afterframes:24, forframes:12, everyframe:2, addaccx:-1 },
		  			{ afterframes:24, forframes:12, everyframe:2, addaccx:1 },
		  			{ afterframes:24, forframes:12, everyframe:2, addaccx:-1 },
		  			{ afterframes:24, forframes:12, everyframe:2, addaccx:1 },
		  			{ afterframes:12, forframes:6, everyframe:2, addaccx:-1 },
		  			{ afterframes:30, setaccy:10 }, // jump down...
		  			{ forframes:30, addaccy:-1 }, // Fly away..
		  			{ setaccy:0 }, // Stops... out of the screen
		  			{ afterframes:50, setx:gbox.getScreenHW()-94,sety:-100,setaccx:0,setaccy:0}, // go back on the top of the screen and...
		  			{ setaccy:1 }, // Restart going down... (without dialog)
		  			{ afterframes:100, setaccy:0 }, // It cames from the top
		  			{ "goto":8  }, // Restart moving horizontally
		  			
		  			// Line 23 : big explosion! (spaghetti code)
		  			{ setaccx:0,setaccy:1,doit:{every:5,action:function(th,time){ // Slowly go down and do explosions and hit animations
		  					th.hitAnimation();
		  					gbox.hitAudio("explosion");
		  					toys.generate.sparks.simple(th,"sparks",null,{animspeed:2,tileset:"explosion",accx:help.random(-5,10),accy:help.random(-5,10)});
		  					toys.generate.sparks.simple(th,"sparks",null,{animspeed:2,tileset:"explosion",accx:help.random(-5,10),accy:help.random(-5,10)});
		  			} } },
		  			{ afterframes:60, setaccy:0 }, // Stops after 60 frames
		  			{ waitfor:function(th) { return toys.getToyStatus(th,"bossend-dialogue") }, doit: { every:"keep", action:"keep", render:function(th) { toys.dialogue.render(th,"bossend-dialogue",dialogues.bossend); } } }, // Wait for the boss intro dialogue
		  			{ doit:{ action:function(th){ // An then explode...
		  				gbox.hitAudio("megaexplosion");
		  				for (var i=0;i<20;i++)
		  					toys.generate.sparks.simple(th,"sparks",null,{animspeed:2,tileset:"explosion",accx:help.random(-5,10),accy:help.random(-5,10)});
		  				toys.generate.sparks.popupText(th,"sparks","",{font:"bigred",jump:6,text:"10000pts",keep:60});
		  				maingame.hud.addValue("score","value",10000);
		  				scroller.quitLoop(); // Exit the boss battle
		  				gbox.trashObject(th); // Disappear
		  			} } }
		  		]
		  	}
		}
	],
	// onLoad is called by the resource loader after adding all objects, tiles etc.
	// you can use the "onLoad" method for "unpacking" stuff or apply default values to the loaded object.
	// we're going to this: apply a set to common behaviours to all enemies, if not defined.
	// the "load" argument is the object passed by the "resourceLoad" command that called this resource file, so the "loading"
	// command can pass parameters to the loaded resources. You can use this, for example, for switching tileset depending
	// on the floor you're, the hour of the (virtual) day, the level of your player etc.
	// Usually "load.file" contains the file name.
	// "res" is the loaded resouce object (i.e. the object defined into this file)
	onLoad:function(load,res){
	  var enemy_generical={ // All the enemies has these attributes as default. Are applied by the next for cycle
			health:2,
			tileset:"enemy1",
			frames:{
				still:{speed:1,frames:[0,1]},
				hit:{speed:1,frames:[0,2]}
			},
			handler:function(th) { if (!gbox.objectIsVisible(th)) gbox.trashObject(this); }, // If not visible, vanish
			hitanimationset:"hit",
			kill:function(by) {
				gbox.hitAudio("explosion");
				toys.generate.sparks.simple(this,"sparks",null,{animspeed:2,tileset:"explosion",accx:by.accx,accy:Math.floor(by.accy/2)}); // ereditate the explosion direction
				toys.generate.sparks.popupText(this,"sparks",null,{font:"bigred",jump:6,text:"1000pts",keep:10});
				maingame.hud.addValue("score","value",1000);
				if (help.random(0,3)==0) toys.shmup.generateEnemy("foes",null,{x:by.x,y:by.y},enemies.powerup);
				gbox.trashObject(this);
			}
	  };
	  
	  // Apply the generical enemy model to all the ships. If one or more fields are different from the model, the original one are kept.
	  for (var i in enemies)
		help.mergeWithModel(enemies[i],enemy_generical);
		
	}
}