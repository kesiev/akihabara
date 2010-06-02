{
	setObject:[
		{
			object:"tilemaps",
			property:"stage2",
			value:help.finalizeTilemap({
				tileset:"tiles",
				map:[
					[0000,0000,0000,0000,0000,0000,0000,0000,0000,0000,0000,0000,0000,0000,0000,0000,0000,0000,0000,0000,0000,0000],
					[0000,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,0000],
					[0000,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,0000],
					[0000,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,0000],
					[0000,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,0000],
					[0000,null,null,null,null,null,null,null,null,0000,0000,0000,0000,null,null,null,null,null,null,null,null,0000],
					[0000,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,0000],
					[0000,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,0000],
					[0000,null,null,null,null,null,null,null,0000,null,null,null,null,0000,null,null,null,null,null,null,null,0000],
					[0000,null,null,0000,0000,0000,null,null,null,0000,0000,0000,0000,null,null,null,0000,0000,0000,null,null,0000],
					[0000,null,null,0000,0000,0000,null,null,null,null,null,null,null,null,null,null,0000,0000,0000,null,null,0000],
					[0000,0000,0000,0000,0000,0000,0000,0000,0000,0000,0000,0000,0000,0000,0000,0000,0000,0000,0000,0000,0000,0000]
				  ],
				 playerSpawnX:40,
				 playerSpawnY:40,
				 addObjects:function() {
					maingame.addEnemy("goo",{x:20*4,y:20*7,side:true});
					maingame.addEnemy("goo",{x:20*17,y:20*7,side:true});
					maingame.addEnemy("goo",{x:20*10,y:20*2,side:true});
					maingame.addEnemy("goo",{x:20*10,y:20*6,side:true});
					maingame.addEnemy("goo",{x:20*10,y:20*10,side:true});
				 },
				tileIsSolidCeil:function(obj,t){ return (obj.group=="foes"?false:t==0) }, // false for Bubble bobble style platforming
				tileIsSolidFloor:function(obj,t){ return t==0 },
				nextLevel:"stage3"
			})
		}
	]
}
