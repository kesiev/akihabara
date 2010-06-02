{
	// Map BGM
	addAudio:[
		["map-bgm",[audioserver+"tlol-cave.mp3",audioserver+"tlol-cave.ogg"],{channel:"bgmusic",loop:true}],	
	],
	// Map graphics
	addImage:[	
		["tiles","resources/tlol/gfx-cave.png"],
	],
	// Map Tileset
	addTiles:[
		{id:"tiles",image:"tiles",tileh:30,tilew:30,tilerow:10,gapx:0,gapy:0},	
	],
	setObject:[
		// Dialogues on this map
		{
			object:"dialogues",
			property:"arrowstutorial",
			value:{
				istutorial:true, font:"smalltut", skipkey:"a", esckey:"b", who: noface,
		  		scenes:[
		  			{ speed:1, who:"noone", audio:"beep", talk:["Use the B button to switch between","weapons. Now you can fire lighting","arrows! Try to hit the B button and","then fire with A!"]}
		  		]
		  	}
		},{
			object:"dialogues",
			property:"usebtutorial",
			value:{
				istutorial:true, font:"smalltut", skipkey:"a", esckey:"b", who: noface,
		  		scenes:[
		  			{ speed:1, who:"noone", audio:"beep", talk:["Use the B button to interact","with objects, that means that you can","open doors, tresaure chests, talk","with villagers etc."]}
		  		]
			}
		},{
			object:"dialogues",
			property:"soul",
			value:{
				endgame:true, font:"small", skipkey:"a", esckey:null, who: noface,
		  		scenes:[
		  			{ speed:1, who:"noone", audio:"beepbad", talk:["Your eyes... I know you, my little","guy..."]},
		  			{ speed:1, who:"noone", audio:"beepbad", talk:["I'm the guardian of all the souls","who died here, tricked by the evil","villagers of the Kariko village."]},
		  			{ speed:1, who:"noone", audio:"beepbad", talk:["I'll teach everything I know. A","day you'll be able to go out","and bring the rage of the tricked."]},
		  			{ speed:6, who:"noone", audio:"beepbad", talk:["You are the Hero of the Legend.","The Legend of Sadness."]},
		  		]
		  	}
			
		// Map data and actions
		},{
			object:"tilemaps",
			property:"map",
			value:{
				tileset:"tiles",
				map:[
					[  12,  12,  12,  12,  12,  12,  12,  12,  12,  12,  12,  12,  12,  12,  12,  12,  12,  12,  12,  12,  12,  12,  12,  12],
					[  12,  11,  11,  11,  11,  11,  11,  11,  11,  11,  12,  12,  11,  11,  11,  11,  11,  11,  11,  11,  11,  11,  11,  12],
					[  12,  10,  10,  10,  10,  10,  10,  10,  10,  10,  12,  12,   0,   0,  13,  13,  13,  13,  13,  13,  13,   0,   0,  12],
					[  12,   6,   6,   6,   6,   6,   6,   6,   6,   6,  12,  12,   0,   0,  14,  14,  14,  14,   6,   6,  14,   0,   0,  12],
					[  12,   6,   6,   6,   6,   6,   6,   6,   6,   6,  11,  11,  13,  13,  14,  14,  14,  14,   6,   6,  14,  13,  13,  12],
					[  12,   6,   6,   6,   6,   6,   6,   6,   6,   6,  10,  10,  14,  14,  14,  14,  14,  14,   6,   6,  14,  14,  14,  12],
					[  12,   6,   6,   6,   0,   0,   0,   6,   6,   6,   6,   6,   6,   6,   3,   6,   6,   6,   6,   6,  14,  14,  14,  12],
					[  12,   6,   6,   6,   0,   0,   0,   6,   6,   6,  12,  12,  13,  13,  13,  13,  13,  13,   6,   6,  14,  14,  14,  12],
					[  12,   6,   6,   6,   0,   0,   0,   6,   6,   6,  12,  12,  14,  14,  14,  14,  14,  14,   6,   6,  14,  14,  14,  12],
					[  12,   6,   6,   6,   6,   6,   6,   6,   6,   6,  12,  12,  14,  14,  14,  14,  14,  14,   6,   6,  14,  14,  14,  12],
					[  12,   6,   1,   6,   6,   6,   6,   6,   6,   6,  12,  12,   0,   0,  14,  14,  14,  14,   6,   6,  14,   0,   0,  12],
					[  12,   6,   6,   6,   6,   6,   6,   6,   6,   6,  12,  12,   0,   0,  14,  14,  14,  14,  13,  13,  14,   0,   0,  12],
					[  12,  12,  12,  12,  12,  12,  12,  12,  12,  12,  12,  12,  12,  12,  12,  12,  12,  12,  12,  12,  12,  12,  12,  12]
				  ],
				 addObjects:function() {
					if (!tilemaps.queststatus["oldmanstory"]) gbox.playAudio("map-bgm");
					if (tilemaps.queststatus["oldmanstory"]) // If you've heard the old man story...
						maingame.addNpc(555,180,[8,9],"soul"); // The soul of the tricked appears.
					if (!tilemaps.queststatus["floor2trapped"]) {
						maingame.setTileInMap(14,6,4,false);
					}
					if (!tilemaps.queststatus["floor2arrows"]) {
						maingame.addChest(19,6,null,false,"arrow",null,0);
					}
					if (tilemaps.queststatus["floor1eyeswitch"]&&!tilemaps.queststatus["bosskey"]) {
						maingame.addEnemy("fifth1","octo",3,4,true);
						maingame.addEnemy("fifth2","octo",5,4,true);
						maingame.addEnemy("fifth3","octo",6,4,true);
						maingame.addEnemy("fifth4","octo",7,4,true);
						tilemaps.queststatus["_tmpbosskey"]=false;
					}
				 },
				 mapActions:function() {
					var pl=gbox.getObject("player","player");
					var ontile=help.getTileInMap(pl.x+pl.colx+pl.colhw,pl.y+pl.coly+pl.colhh,tilemaps.map,tilemaps._defaultblock,"map");
					if (!tilemaps.queststatus["floor2trapped"]&&!tilemaps.queststatus["floor2untrapped"]) // the trap on floor 2
						if (ontile==4) {
							gbox.hitAudio("beep"); // Switch sound
							maingame.addDoor("sidedoor","doorv",10,4,true);
							maingame.addEnemy("third1","octo",13,2,true);
							maingame.addEnemy("third2","octo",21,2,true);
							maingame.addEnemy("third3","octo",13,10,true);
							maingame.addEnemy("third4","octo",21,10,true);
							tilemaps.queststatus["floor2trapped"]=true; // Trap on
							maingame.addQuestClear("TRAPPED!");
							maingame.startDialogue("usebtutorial"); // Explain how to open the first tresaure chest.
							maingame.setTileInMap(14,6,3,true);
						 }
					if (tilemaps.queststatus["floor2trapped"]&&!tilemaps.queststatus["floor2untrapped"]) {
						if (!gbox.getObject("foes","third1")&&!gbox.getObject("foes","third2")&&!gbox.getObject("foes","third3")&&!gbox.getObject("foes","third4")) { // check them. If beaten...
							gbox.getObject("walls","sidedoor").doOpen();
							tilemaps.queststatus["floor2untrapped"]=true; // Set the quest as done...
							maingame.addQuestClear(); // Arcade-ish message "QUEST CLEAR"!
						}
					}
					if (tilemaps.queststatus["floor1eyeswitch"]&&!tilemaps.queststatus["bosskey"]&&!tilemaps.queststatus["_tmpbosskey"]) {
						if (!gbox.getObject("foes","fifth1")&&!gbox.getObject("foes","fifth2")&&!gbox.getObject("foes","fifth3")&&!gbox.getObject("foes","fifth4")) { // check them. If beaten...
							maingame.addQuestClear(); // Quest clear
							maingame.addChest(5,7,null,true,"BOSSKEY","bosskey",0);
							tilemaps.queststatus["_tmpbosskey"]=true;
						}
					}
					var pl=gbox.getObject("player","player");
					var ontile=help.getTileInMap(pl.x+pl.colx+pl.colhw,pl.y+pl.coly+pl.colhh,tilemaps.map,tilemaps._defaultblock,"map");
					if (ontile==1) maingame.gotoLevel({level:"floor1",x:60,y:530,label:"Floor 1 stairs"});
					
				 },
				tileIsSolid:function(obj,t){ return (obj._bullet?(t!=13)&&(t!=14):true)&&(t>9) } // Bullets flies over the pits.
			}
		}
	]
}