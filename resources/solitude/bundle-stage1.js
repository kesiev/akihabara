{
	setObject:[
		{
			object:"stages",
			property:"stage1",
			value:{
				music:"ingame", // The background music.
				
				// The "movie reel" of the background.
				scroller: {
					maxwidth:460,
					stage:[
						{image:"sea"}, // Start
						{image:"sea"},
						{image:"sea"}, // After intro
						{image:"seaside"},
						{image:"beach"},
						{image:"beach"},
						{image:"beach"},
						{image:"beach"},
						{image:"beach2"},
						{image:"beach"},
						{image:"beach"},
						{image:"beach"},
						{image:"beach"},
						{image:"beach2"},
						{image:"beach2"},
						{image:"beach"},
						{image:"beach"},
						{image:"beach2"},
						{image:"seaside2"},
						{image:"sea"}, // Boss battle / Ending
						{image:"sea"},
						{image:"sea"},
						{image:"sea"}, // The end of stage
						{image:"sea"},
						{image:"sea"},
						{image:"seaside"}
					]
				},
				
				// What happens during this stage?
				script:function(th,pos,bl) {
					if ((pos==0)&&(bl==0)) { // When starting and first repetition of the sea part. bl is 0 when pos is reached out from the loop. then bl is 1,2 etc.
						scroller.setSpeed(10); // Set speed to fast
						scroller.setLoop(0,320); // scrolls faster the sea.
						toys.resetToy(this,"first-dialogue"); // prepare the intro dialogue						
						toys.resetToy(this,"once-finishlevel"); // prepare the finished level semaphore	
						toys.resetToy(this,"once-finishboss"); // prepare the finished boss semaphore
					} else if (pos<=320) { // During the 0,320 loop...
						if (toys.dialogue.render(this,"first-dialogue",dialogues.intro)) {
							scroller.quitLoop();
							scroller.panToSpeed(2,3);
						}
					} else if (pos<5440) { // Legthy level
						if (pos%1000==0) { // every 1000...
							// Enemy generators apply the model to the newly created structure. That structure is used as object definition.
							toys.shmup.generateEnemy("foes",null,{x:help.random(10,gbox.getScreenW()-60),y:-40},enemies.bigship);
						}
						if (pos%200==0) { // every 200...
							toys.shmup.generateEnemy("foes",null,{x:-20,y:help.random(20,20)},enemies.ship2);
							toys.shmup.generateEnemy("foes",null,{x:gbox.getScreenW()-20,y:help.random(20,20)},enemies.ship3);
						}
						if (pos%500==0) { // every 500...
							toys.shmup.generateEnemy("foes",null,{x:100,y:-20},enemies.ship1);
							toys.shmup.generateEnemy("foes",null,{x:200,y:-20},enemies.ship1);
						}
						if (pos%800==0) { // every 800...
							toys.shmup.generateEnemy("foes",null,{x:50,y:-20},enemies.ship1);
							toys.shmup.generateEnemy("foes",null,{x:150,y:-20},enemies.ship1);
						}
						
					} else if (toys.logic.once(th,"once-finishlevel",pos>5760)) { // At the end...
						toys.generate.audio.fadeOut(this,"background",null,{channel:"bgmusic"}); // Fade out background music
						scroller.panToSpeed(10,2); // Accellerate... prepare for the boss battle
						scroller.setLoop(5760,6080); // scrolls faster the sea.
						toys.shmup.generateEnemy("foes",null,{},enemies.boss); // Here comes the boss
					} else if (toys.logic.once(th,"once-finishboss",pos>6080)) {// If you're here, you've beaten the boss (the loop was quitted)
						scroller.panToSpeed(1,5); // Decellerate...
						maingame.myChangeLevel("stage2"); // Let's try to go to stage 2. The game will end if not exists.
					}
				}
			}
		}
	]
}