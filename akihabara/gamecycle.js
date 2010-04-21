// ---
// Copyright (c) 2010 Francesco Cottone, http://www.kesiev.com/
// ---
	
	var gamecycle={
		createMaingame:function(id,group) {
		return gbox.addObject({
		  	id:id,
		  	group:group,
		  	counter:0,
		  	difficulty:0,
		  	
		  	step:100,
		  	isready:false,
		  	
		  	hud:{},
		  	
		  	// OVERRIDABLE
		  	
		  	changeLevel:function() { },
		  	newLife:function() { },
		  	
		  	// Level intro animation
		  	
		  	gameIntroAnimation:function(reset) {
		  		if (reset) {
		  			toys.resetToy(this,"default-blinker");
		  		} else {
		  			gbox.blitFade(gbox.getBufferContext(),{alpha:1});
		  			return toys.text.blink(this,"default-blinker",gbox.getBufferContext(),{font:"small",text:"LETS BEGIN!",valign:gbox.ALIGN_MIDDLE,halign:gbox.ALIGN_CENTER,dx:0,dy:0,dw:gbox.getScreenW(),dh:gbox.getScreenH(),blinkspeed:5,times:6});
		  		}
		 	 },
		 	 
			levelIntroAnimation:function(reset) {
		  		if (reset) {
		  			toys.resetToy(this,"default-blinker");
		  		} else {
		  			gbox.blitFade(gbox.getBufferContext(),{alpha:1});
		  			return toys.text.blink(this,"default-blinker",gbox.getBufferContext(),{font:"small",text:"GET READY!",valign:gbox.ALIGN_MIDDLE,halign:gbox.ALIGN_CENTER,dx:0,dy:0,dw:gbox.getScreenW(),dh:gbox.getScreenH(),blinkspeed:5,times:6});
		  		}
		 	 },
		  
		  	 // Life intro animation
		  	 newlifeIntroAnimation:function(reset) {
		 		 if (reset) {
		  			toys.resetToy(this,"default-blinker");
		  		} else {
		  			gbox.blitFade(gbox.getBufferContext(),{alpha:1});
		  			return toys.text.fixed(this,"default-blinker",gbox.getBufferContext(),{font:"small",text:"GET READY!",valign:gbox.ALIGN_MIDDLE,halign:gbox.ALIGN_CENTER,dx:0,dy:0,dw:gbox.getScreenW(),dh:gbox.getScreenH(),time:30});
		  		}
		  	},
		  	
		  	// gameover animation
		  	gameoverIntroAnimation:function(reset) {
		 		 if (reset) {
		  			toys.resetToy(this,"default-blinker");
		  		} else {
		  			gbox.blitFade(gbox.getBufferContext(),{alpha:1});
		  			return toys.text.fixed(this,"default-blinker",gbox.getBufferContext(),{font:"small",text:"GAME OVER",valign:gbox.ALIGN_MIDDLE,halign:gbox.ALIGN_CENTER,dx:0,dy:0,dw:gbox.getScreenW(),dh:gbox.getScreenH(),time:50});
		  		}
		  	},
		  	
		  	// game title animation
		  	gameTitleIntroAnimation:function(reset) {
			  	if (!reset) {
		  			gbox.blitFade(gbox.getBufferContext(),{alpha:1});
		  			gbox.blitText(gbox.getBufferContext(),{font:"small",text:"GAME TITLE",valign:gbox.ALIGN_MIDDLE,halign:gbox.ALIGN_CENTER,dx:0,dy:0,dw:gbox.getScreenW(),dh:gbox.getScreenH()-100});
		  		}
		  	},
		  	
		  	// End level animation
		  	endlevelIntroAnimation:function(reset) {
		  		 if (reset) {
		  			 toys.resetToy(this,"default-blinker");
		  		} else {
		  			return toys.text.blink(this,"default-blinker",gbox.getBufferContext(),{font:"small",text:"WELL DONE!",valign:gbox.ALIGN_MIDDLE,halign:gbox.ALIGN_CENTER,dx:0,dy:0,dw:gbox.getScreenW(),dh:gbox.getScreenH(),blinkspeed:5,times:10});
		  		}
		  	},
		  	
		  	// Game ending
		  	gameEndingIntroAnimation:function(reset) {
		  		if (reset) {
		  			toys.resetToy(this,"default-blinker");
		  		} else {
		  		 	gbox.blitFade(gbox.getBufferContext(),{alpha:1});
		  			return toys.text.blink(this,"default-blinker",gbox.getBufferContext(),{font:"small",text:"CONGRATULATIONS!",valign:gbox.ALIGN_MIDDLE,halign:gbox.ALIGN_CENTER,dx:0,dy:0,dw:gbox.getScreenW(),dh:gbox.getScreenH(),blinkspeed:5,times:10});
		  		}		  	
		  	},
		  	
		  	// PRESS START
		  	pressStartIntroAnimation:function(reset) {
		  		if (reset) {
		  			toys.resetToy(this,"default-blinker");
		  		} else {
		  			toys.text.blink(this,"default-blinker",gbox.getBufferContext(),{font:"small",text:"PRESS A TO START",valign:gbox.ALIGN_MIDDLE,halign:gbox.ALIGN_CENTER,dx:0,dy:Math.floor(gbox.getScreenH()/3),dw:gbox.getScreenW(),dh:Math.floor(gbox.getScreenH()/3)*2,blinkspeed:10});
		  			return gbox.keyIsHit("a");
		  		}
		  	},
			
			// Decides if the game is over
			gameIsOver:function() { return true; },
		  	
		  	// Actions done during the game (i.e. stage is clear or other ending conditions)
		  	gameEvents:function() {
		  	
		  	},
		  	
		  	gameMenu:function(reset) {
		  		if (reset) {
		  			toys.resetToy(this,"difficulty");
		  		} else {
		  			gbox.blitFade(gbox.getBufferContext(),{alpha:0.5});
		  			if (toys.ui.menu(this,"difficulty",{font:"small",keys:{up:"up",down:"down",ok:"a",cancel:"b"},selector:">",items:["EASY","NORMAL","HARD"],x:10,y:10})) {
		  				if (toys.getToyValue(this,"difficulty","ok") == -1) return -1;
		  				else {
		  					this.difficulty=toys.getToyValue(this,"difficulty","selected");
		  					return true;
		  				}
		  			}
		  			return false;
		  		}
		  	},
		  
		  	// CHECK
		  	
		  	gameIsHold:function() { // Use this clause to check collision and kill player: if true the level is changing
		  		return (this.step==400)||(this.step==401);
		  	},
		  	
		  	isCompleted:function() {
		  		return (this.step==800);
		  	},
		  	
		  	// GAME CYCLE
		  	
		  	getNextLevel:function() {
		  		return this._nextlevel;
		  	},
		  	
		  	gotoLevel:function(level) {
		  		this._nextlevel=level;
		  		this.setStep(400);
		  	},
		  	
		  	playerDied:function(data) {
		  		this._loselife=data;
		  		this.setStep(500);
		  	},
		  	
		  	gameIsCompleted:function() {
		  		this.setStep(800);
		  	},
		  	
		  	// PRIVATES
		  	
		  	setStep:function(st) {
		  		this.step=st;
		  		this.isready=false;
		  	},
		  	
		  	_resetGroups:function() {
		  		var g=gbox.getGroups();
		  		for (var i=0;i<g.length;i++)
		  			if (g[i]!=this.group) gbox.clearGroup(g[i]);
				gbox.soloGroup(this.group);
		  	},

		  	stepIsReady:function() { this.isready=true; },
		  	blit:function() {
		  		var ok=false;
		  		switch (this.step) {
		  			case 100:
		  			case 101:
		  			case 102: { // Press Start / Menu
		  				if (!this.isready&&(this.step==100)) {
		  					this._resetGroups();
							this.gameTitleIntroAnimation(true);
		  				}
		  				this.gameTitleIntroAnimation(false);
		  				switch (this.step) {
		  					case 100: { // Press to start
		  						if (!this.isready) {
		  							this.pressStartIntroAnimation(true);
		  							this.stepIsReady();
		  						}
		  						if (this.pressStartIntroAnimation(false)) this.setStep(101);
		  						break;
		  					}
		  					case 101: { // Game menu
		  						if (!this.isready) {
		  							this.gameMenu(true);
		  							this.stepIsReady();
		  						}
		  						
	  							var menu=this.gameMenu(false);
	  							if (menu)
	  								if (menu == -1) this.setStep(100); else this.setStep(102);
		  						break;
		  					}
		  					case 102: { // Fader
		  						if (!this.isready) {
		  							this._resetGroups();
		  							toys.resetToy(this,"fadeout");
		  							this.stepIsReady();
		  						}
		  						if (toys.fullscreen.fadeout(this,"fadeout",gbox.getBufferContext(),{fadespeed:0.05}))
		  							this.setStep(200);
		  						break;
		  					}
		  					break;
		  				}
		  				break;
		  			}
		  			case 200:// Game intro animation
		  			
		  			case 300:// Start game
		  			case 301:// Game is going
		  			
		  			case 400:// Fade out to change level
		  			case 401:// Level animation (levelIntroAnimation)
		  			case 402:// Fade in to next level
		  			
		  			case 500:// Wait after dead
		  			case 501:// Dead fadeout
		  			
		  			case 600:// Next life intro
		  			case 601:// New life fadein
		  			
		  			case 700:// Gameover animation

		  			case 800:// Fade out game ending
		  			case 801:// Game ending

		  			{ // Game playing
		  				if (!this.isready) {
		  					switch (this.step) {
		  						case 200: { // Game intro
		  							toys.resetToy(this,"fadein");
		  							this.level=null;
		  							this._nextlevel=null;
		  							this.hud=toys.ui.hud("maingamehud");
		  							
		  							this.initializeGame();
		  							this.gameIntroAnimation(true);
		  							
		  							break;
		  						}
		  						case 300: {
		  							// Game start
		  							this.level=this._nextlevel;
		  							gbox.playAllGroups();
		  							this.changeLevel(this._nextlevel);
		  						}
		  						case 800:
		  						case 400:{
		  							this.endlevelIntroAnimation(true);
		  							toys.resetToy(this,"fadeout");
		  							break;
		  						}
		  						case 501: {
		  							toys.resetToy(this,"fadeout");
		  							break;
		  						}
		  						case 401: {
		  							gbox.soloGroup(this.group);
		  							this.levelIntroAnimation(true);
		  							break;
		  						}
		  						case 402: {
		  							toys.resetToy(this,"fadein");
		  							this.level=this._nextlevel;
		  							gbox.playAllGroups();
		  							this.changeLevel(this._nextlevel);
		  							break;
		  						}
		  						case 600: {
		  							gbox.soloGroup(this.group);
		  							this.newlifeIntroAnimation(true);
		  							break;
		  						}
		  						case 500: {
		  							this._loselife.counter=0;
		  							break;
		  						}
		  						case 601: {
		  							toys.resetToy(this,"fadein");
		  							this.newLife();
		  							gbox.playAllGroups();
		  							break;
		  						}
		  						case 700: {
		  							gbox.soloGroup(this.group);
		  							this.gameoverIntroAnimation(true);
		  							break;
		  						}
		  						case 801: {
		  							gbox.soloGroup(this.group);
		  							this.gameEndingIntroAnimation(true);
		  							break;
		  						}
		  					}
		  					this.stepIsReady();
		  				}
		  				
		  				switch (this.step) {
		  					case 200: { // Game intro
		  						if (this.gameIntroAnimation(false)) this.setStep(300);
		  						break;
		  					}
		  					case 601: // Fade in with new life
		  					case 402: // Fade in after level change
		  					case 300: { // Fade in at the beginning of the game
		  						if (toys.fullscreen.fadein(this,"fadein",gbox.getBufferContext(),{fadespeed:0.05})) this.setStep(301);
		  						break;
		  					}
		  					case 301: { // Ingame stuff
		  						this.gameEvents();
		  						break;
		  					}
		  					case 400: { // Fade out before changing the level
		  						if (this.endlevelIntroAnimation(false))
		  							if (toys.fullscreen.fadeout(this,"fadeout",gbox.getBufferContext(),{fadespeed:0.05})) this.setStep(401);
		  						break;
		  					}
		  					case 800: { // Fade out before game ending
		  						if (this.endlevelIntroAnimation(false))
		  							if (toys.fullscreen.fadeout(this,"fadeout",gbox.getBufferContext(),{fadespeed:0.05})) this.setStep(801);
		  						break;
		  					}
		  					case 501: { // Fade out after dead
		  						if (toys.fullscreen.fadeout(this,"fadeout",gbox.getBufferContext(),{fadespeed:0.05})) 
		  							if (this.gameIsOver())
		  								this.setStep(700); // GAME OVER
		  							else
		  								this.setStep(600);
		  						break;
		  					}
		  					case 401:{ // Level intro animation
		  						if (this.levelIntroAnimation(false)) this.setStep(402);
		  						break;
		  					}
		  					case 500: { // Wait after dead
		  						this._loselife.counter++;
		  						if (this._loselife.counter==this._loselife.wait) this.setStep(501);
		  						break;
		  					}
		  					case 600:{ // New life intro
		  						if (this.newlifeIntroAnimation(false)) this.setStep(601);
		  						break;
		  					}
		  					case 700:{ // gameover
		  						if (this.gameoverIntroAnimation(false)) this.setStep(100); // Restart game
		  						break;
		  					}
		  					case 801:{ // Game ending
		  						if (this.gameEndingIntroAnimation(false)) {
		  							this._loselife={ending:true};
		  							this.setStep(700); // Game over
		  						}
		  						break;
		  					}
		  				}
		  				
		  				this.hud.blit();
		  				break;
		  			}
		  		}
		  	}
		  });
		 }
		}