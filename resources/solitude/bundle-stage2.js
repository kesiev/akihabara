// This is just a stub stage.
{
	setObject:[
		{
			object:"stages",
			property:"stage2",
			value:{
			
				music:"default-music", // The background music.
			
				// The "movie reel" of the background.
				scroller: {
					maxwidth:460,
					stage:[
						{image:"beach"},
						{image:"beach"},
						{image:"beach"},
						{image:"beach"},
					]
				},
				
				// What happens during this stage?
				script:function(th,pos,bl) {
					if ((pos==0)&&(bl==0)) { // When starting and first repetition of the sea part. bl is 0 when pos is reached out from the loop. then bl is 1,2 etc.
						scroller.setSpeed(10); // Set speed to fast
						scroller.setLoop(0,320); // scrolls faster the sea.
					} else { // Same as stage 1
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
					}
				}
			}
		}
	]
}