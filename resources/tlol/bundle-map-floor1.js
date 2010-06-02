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
			property:"questdonetutorial",
			value:{ istutorial:true, font:"smalltut", skipkey:"a", esckey:"b", who: noface,
		  		scenes:[
		  			{ speed:1, who:"noone", audio:"beep", talk:["The <QUEST CLEAR> message indicates","that something nearby is changed.","Try to have a look around!"]}
		  		]
		  	}
		},{
			object:"dialogues",
			property:"oldman",
			value:{
				font:"small", skipkey:"a", esckey:"b", who: noface,
				scenes:[
					{ speed:1, who:"noone", audio:"beep", talk:["Oh no... no...","Not again!"]},
					{ speed:1, who:"noone", audio:"beep", talk:["They tricked you too!","There isn't any monster here...","70 years ago the villagers sent me","here saying that I was the hero","of the legend..."]},
					{ speed:1, who:"noone", audio:"beep", talk:["But all I've found here was a bunch","of bones...","I'm sure that was who was sent here","before me!"]},
					{ speed:1, who:"noone", audio:"beep", talk:["So now... is your turn! You'll get","old here all alone and die!","I'm really sorry but is true.","There isn't any way to go out...","Poor guy!"]},
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
					[  12,  11,  11,  11,  11,  11,  11,  11,  11,  11,  12,  12,  11,  11,  11,  12,  12,  11,  11,  11,  11,  11,  11,  12],
					[  12,  10,  10,  10,  10,  10,  10,  10,  10,  10,  12,  12,  13,  13,  13,  12,  12,  13,  13,  13,  13,  13,  13,  12],
					[  12,   6,   6,   6,   6,   6,   6,   6,   6,   6,  12,  12,  14,  14,  14,  12,  12,  14,  14,  14,  14,  14,  14,  12],
					[  12,   6,   6,   6,   6,   6,   6,   6,   6,   6,  12,  12,  14,  14,  14,  12,  12,  14,  14,  14,  14,  14,  14,  12],
					[  12,   6,   6,   6,   6,   6,   6,   6,   6,   6,  12,  12,  14,  14,  14,  12,  12,  14,  14,   0,   0,  14,  14,  12],
					[  12,   6,   6,   6,   6,   6,   6,   6,   6,   6,  12,  12,  14,  14,  14,  12,  12,  14,  14,   0,   0,  14,  14,  12],
					[  12,   6,   6,   6,   6,   6,   6,   6,   6,   6,  12,  12,  14,  14,  14,  12,  12,  14,  14,   0,   0,  14,  14,  12],
					[  12,   6,   6,   6,   6,   6,   6,   6,   6,   6,  12,  12,  14,  14,  14,  12,  12,  14,  14,   0,   0,  14,  14,  12],
					[  12,   6,   6,   6,   6,   6,   6,   6,   6,   6,  12,  12,  14,  14,  14,  12,  12,  14,  14,   0,   0,  14,  14,  12],
					[  12,   6,   6,   6,   6,   6,   6,   6,   6,   6,  12,  12,  14,  14,  14,  12,  12,  14,  14,   0,   0,  14,  14,  12],
					[  12,   6,   6,   6,   6,   6,   6,   6,   6,   6,  12,  12,  14,  14,  14,  12,  12,   0,   0,   0,   0,   0,   0,  12],
					[  12,  12,  12,  12,   6,   6,  12,  12,  12,  12,  12,  12,  12,  12,  12,  12,  12,  12,  12,   6,   6,  12,  12,  12],
					[  12,  11,  11,  11,   6,   6,  11,  11,  11,  11,  11,  12,  12,  11,  11,  11,  11,  11,  11,   6,   6,  11,  11,  12],
					[  12,  10,  10,  10,   6,   6,  10,  10,  10,  10,  10,  12,  12,  10,  10,  10,  10,  10,  10,   6,   6,  10,  10,  12],
					[  12,   6,   6,   6,   6,   6,   6,   6,   6,   6,   6,  11,  11,   6,   6,   6,   6,   6,   6,   6,   6,   6,   6,  12],
					[  12,   6,   6,   6,   6,   6,   6,   6,   6,   6,   6,  10,  10,   6,   6,   6,   6,   6,   6,   6,   6,   6,   6,  12],
					[  12,   6,   6,   6,   6,   6,   6,   6,   6,   6,   6,   6,   6,   6,   6,   6,   6,   6,   6,   6,   6,   6,   6,  12],
					[  12,   6,   6,   6,   6,   6,   6,   6,   6,   6,   6,  12,  12,   6,   6,   6,   6,   6,   6,   6,   6,   6,   6,  12],
					[  12,   6,   2,   6,   6,   6,   6,   6,   6,   6,   6,  12,  12,   6,   6,   6,   6,   6,   6,   6,   6,   6,   6,  12],
					[  12,   6,   6,   6,   6,   6,   6,   6,   6,   6,   6,  12,  12,   6,   6,   6,   6,   6,   6,   6,   6,   6,   6,  12],
					[  12,  12,  12,  12,  12,  12,  12,  12,  12,  12,  12,  12,  12,  12,  12,  12,  12,  12,  12,   5,   5,  12,  12,  12]							
				  ],
				 addObjects:function() {
					if (!tilemaps.queststatus["oldmanstory"]) gbox.playAudio("map-bgm");
					if (!tilemaps.queststatus["treasure1"]) maingame.addChest(1,11,"treasure1",false,"coin");
					if (!tilemaps.queststatus["treasure2"]) maingame.addChest(2,11,"treasure2",false,"coin");
					if (!tilemaps.queststatus["treasure3"]) maingame.addChest(8,11,"treasure3",false,"coin");
					if (!tilemaps.queststatus["treasure4"]) maingame.addChest(9,11,"treasure4",false,"coin");
					if (tilemaps.queststatus["trappedforever"]) maingame.addDoor("dungeondoor","door",19,21,false);
					maingame.addEnemy("floor1eyeswitch","eyeswitch",20,2).changeSwitch(tilemaps.queststatus["floor1eyeswitch"]); // Makes a switch and the switch on/off based on quest status
					if (!tilemaps.queststatus["floor1bossdoor"]) { // If not opened
						maingame.addDoor("floor1bossdoor","door",4,12,false,"BOSSKEY");
					}
					if (!tilemaps.queststatus["oldmanstory"]) maingame.addNpc(160,120,[2],"oldman","oldmanstory",[2,3],true);
					if (!tilemaps.queststatus["openfrontdoor"])
						if (!tilemaps.queststatus["floor1frontdoor"]) // If not opened
							maingame.addDoor("floor1frontdoor","door",19,12,false,"SMALLKEY");
					if (!tilemaps.queststatus["beatenfirst"]) {
						maingame.addDoor("sidedoor","doorv",12,15,false);
						maingame.addEnemy("first1","octo",15,15);
						maingame.addEnemy("first2","octo",20,15);
					}
					if (!tilemaps.queststatus["beatensecond"]) {
						maingame.setTileInMap(2,19,6,false); // Hide stairs
						maingame.addEnemy("second1","octo",4,15);
						maingame.addEnemy("second2","octo",8,15);
						maingame.addEnemy("second3","octo",10,15);
					}
					if (tilemaps.queststatus["floor2untrapped"]&&!tilemaps.queststatus["fl1smallkey"]) {
						maingame.addEnemy("four1","octo",4,15);
						maingame.addEnemy("four2","octo",8,15);
						maingame.addEnemy("four3","octo",10,15);
						maingame.addEnemy("four4","octo",10,17);
						tilemaps.queststatus["_tmpsmallkey"]=false;
					}
				 },
				 mapActions:function() {
					if (!tilemaps.queststatus["beatenfirst"]) { // if the first 2 enemies are around
						if (!gbox.getObject("foes","first1")&&!gbox.getObject("foes","first2")) { // check them. If beaten...
							gbox.getObject("walls","sidedoor").doOpen(); // Open the door...
							tilemaps.queststatus["beatenfirst"]=true; // Set the quest as done...
							maingame.startDialogue("questdonetutorial"); // Explain what [QUEST CLEAR] is
							maingame.addQuestClear(); // Arcade-ish message "QUEST CLEAR"!
						}
					}
					if (!tilemaps.queststatus["beatensecond"]) { // if the first 2 enemies are around
						if (!gbox.getObject("foes","second1")&&!gbox.getObject("foes","second2")&&!gbox.getObject("foes","second3")) { // check them. If beaten...
							maingame.setTileInMap(2,19,2,true); // open the stairs, with smoke
							tilemaps.queststatus["beatensecond"]=true; // Set the quest as done...
							maingame.addQuestClear(); // Arcade-ish message "QUEST CLEAR"!
						}
					}
					if (tilemaps.queststatus["floor2untrapped"]&&!tilemaps.queststatus["fl1smallkey"]&&!tilemaps.queststatus["_tmpsmallkey"]) { // With arrows
						if (!gbox.getObject("foes","four1")&&!gbox.getObject("foes","four2")&&!gbox.getObject("foes","four3")&&!gbox.getObject("foes","four4")) { // check them. If beaten...
							tilemaps.queststatus["_tmpsmallkey"]=true; // temporary the quest is done...
							maingame.addChest(7,15,null,true,"SMALLKEY","fl1smallkey",0);
							maingame.addQuestClear(); // Arcade-ish message "QUEST CLEAR"!
						}
					}
					if (!tilemaps.queststatus["trappedforever"]&&tilemaps.queststatus["floor1bossdoor"]) {
						maingame.addDoor("dungeondoor","door",19,21,false);
						tilemaps.queststatus["trappedforever"]=true; // The trap is on
					}
					
					var pl=gbox.getObject("player","player");
					var ontile=help.getTileInMap(pl.x+pl.colx+pl.colhw,pl.y+pl.coly+pl.colhh,tilemaps.map,tilemaps._defaultblock,"map");
					if (ontile==2) maingame.gotoLevel({level:"floor2",x:90,y:240,label:"Floor 2 entrance"});
					if (ontile==5) maingame.gotoLevel({level:"begin",x:330,y:90,label:"Kariko village's cave"});
				 },
				tileIsSolid:function(obj,t){ return (obj._bullet?(t!=13)&&(t!=14):true)&&(t>9) } // Bullets flies over the pits.
			}
		}
	]
}