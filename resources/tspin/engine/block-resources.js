// ---
// Copyright (c) 2010 Francesco Cottone, http://www.kesiev.com/
// ---

// Staffrolls
block.staffrolls={
	classic:{ font:"small-blue", speed:2, spacing:2,
		text:[
			"T-SPIN",
			"THE FAST",
			"PUZZLE",
			"","","",
			"JS-CODE","BY",
			"KESIEV",
			"",
			"GRAPHICS","BY",
			"KESIEV",
			"HEBO",
			"FUBBYO",
			"GIMAGES",
			"","","",
			"CREATED","USING THE",
			"AKIHABARA","ENGINE",
			"BY KESIEV","a2010",
			"KESIEV.COM",
			"","","","","","","","","","","",
			"THANK YOU",
			"FOR","PLAYING!",
			"","",
			"NO BLOCK","CAN",
			"STOP YOU!",
			"","","","","","","","","","","",
			"THE END"
		]
	},
	mroll:{ font:"small-red", speed:2, spacing:2,
		text:[
			"T-SPIN",
			"THE FAST",
			"PUZZLE",
			"","","",
			"JS-CODE","BY",
			"KESIEV",
			"",
			"GRAPHICS","BY",
			"KESIEV",
			"HEBO",
			"FUBBYO",
			"GIMAGES",
			"","","",
			"CREATED","USING THE",
			"AKIHABARA","ENGINE",
			"BY KESIEV","a2010",
			"KESIEV.COM",
			"","","","","","","","","","","",
			"THANK YOU",
			"FOR","PLAYING!",
			"","",
			"NO BLOCK","CAN",
			"STOP YOU!",
			"","","","","","","","","","","",
			"THE END"
		]
	}
};

// Default setups to use in roads etc.
block.defaults={
	readygo:function(f) { // Default ready/go at start. Can initialize some parameters as argument.
		return {setup:help.mergeWithModel({setstagenumber:1,animation:{pause:true,type:"readygo",tileset:"text1",tiles:[2,5],times:[1,1]}},f)}
	},
	playforever:function(f) { // The play forever sequence for legacy games. Play until topping!
		return {setup:help.mergeWithModel({nextstagenumber:true,nextbackground:true},f),nextstage:[]}
	},
	gameclear:function(f) { // The game clear step. Some changes can be applied at the end (i.e. Grades boost etc.)
		return {setup:help.mergeWithModel({gameclear:true},f),nextstage:[]};
	}
}

// Game modes
block.gamemodes={};

// Tests
block.tests={};

// X and Y spawnpoints
block.yspawnpoints={};
block.xspawnpoints={};

// Spot maps for t-spin calculators
block.tspins={};

// Colors: 0-gray, 1-red, 2-orange, 3-yellow, 4-green, 5-cyan, 6-Blue, 7-violet
// Color palettes
block.palettes={};

// Disables keys for games without some features
block.deadkeys={
	//      left right  up down rotright rotleft  hold
	none:[  true,true,true,true,    true,   true, true], // All keys available
};

// Pieces set and rotations
block.pieces={};
		
// Garbage rolls for garbage generator. Is just a storage and actually is not used by the BLOCK engine
block.garbagerolls={};

// Data slots for special game modes that needs more JS code
block.data={};

// Extra actions repository (pure js code)
block.extraactions={};

// Rotation locks are like kicksets, as definition. Are to evaluate rotations.
// If operator is true means that, if the map is correct, rotation is applied. If operator is false, the rotation fails if map matches.
// Maps are like this: 0: unvaluate, 1: must be filled, 2: must be empty
// { operator:true, logic:"and", map:[[0,0,0,0],[0,0,1,0],[0,2,0...]] }
// "r0":[ // Every time the L is rotated to 0 state
//					{
//						setrotation:false, // The rotation is cancelled if...
//						logic:"or", // ...one or more of these map points are verified.
//						map:[[0,1,0,0],[0,0,0,0],[0,1,0,0],[0,0,0,0]]
//					}
//				],
block.rotationlocks={};

// Kickset definitions
// 0 - spawn rotation
// 1 - R
// 2 - 2
// 3 - L
block.kicksets={};
		
// Medals math for medal based games
block.medals={};

// Grades math for grade-based games
block.grades={};
		
// Internal grades math for internal grade-based games (i.e. TGM2+)
block.internalgrades={};
		
// The stages sequences
block.roads={};
		
		
// name: 0: bag | 1: bag count | 2: history size | 3: starting history | 4: history tries
// The next piece policies. There are some default models.
block.nextmodels={
  debugi:{bag:"0",bagscount:0,history:0,starting:"",tries:"unlimited",first:""}, // ever I
  debugt:{bag:"1",bagscount:0,history:0,starting:"",tries:"unlimited",first:""}, // ever T
  debugl:{bag:"2",bagscount:0,history:0,starting:"",tries:"unlimited",first:""}, // ever L
  debugj:{bag:"3",bagscount:0,history:0,starting:"",tries:"unlimited",first:""}, // ever I
  
  // Random based
  memoryless:{bag:"0123456",bagscount:0,history:0,starting:"",tries:"unlimited",first:""},
  memorylessdifficult:{bag:"00333222666555111444",bagscount:0,history:0,starting:"",tries:"unlimited",first:""},
  zs:{bag:"45",bagscount:0,history:0,starting:"",tries:"unlimited",first:""},
  memorylesspoweron:{bag:"0123456",bagscount:0,history:0,starting:"",tries:"unlimited",poweron:"0326514"},
  
  // History based
  movetoback:{bag:"0123456",bagscount:0,history:4,starting:"",tries:"unlimited",first:""},
  zsalternating:{bag:"45",bagscount:0,history:1,starting:"",tries:"unlimited",first:""},
  
  // bags based
  lardarse:{bag:"01332266555444",bagscount:5},
  randomgenerator:{bag:"0123456",bagscount:7},
  m14piece:{bag:"00112233445566",bagscount:14},
  m14piecehalf:{bag:"00112233445566",bagscount:7}
};
		
		
// CUSTOM: SCORE (also check for backtoback and combo and falling.immobilespins value)
block.lines={},
	

// Section markers (for grade calculatings)		
block.sectionmarks={};

// Torikan - the game is limited in certain conditions
block.torikans={};
	
// Libraries - included to create a simulation
block.library={}
block.library["default"]=function(th) { // Default parameters - A plain tetris without any extra. All possibile game parameters are defined here

	// ALL GAME PARAMETERS
	th.config.timing.fps=60; // frames per sec
	th.config.control.ihs=false;  // Initial Hold System
	th.config.control.irs=false; // Initial Rotation System
	th.config.control.irs180=false; // Initial Rotation System 180 degrees (rotleft+rotright)
	th.config.control.ims=false; // Initial Movement System
	th.config.control.holdkeeprotation=false; // Held piece is held rotated
	th.config.control.das=block.convertframes(th,24);
	th.config.control.harddrop=false;
	th.config.control.initialdas=block.convertframes(th,48);
	th.config.control.keyhold=false;
	th.config.control.softdrop=0;
	th.config.control.softdropisdas=true;
	th.config.control.spinevaluator=null;
	th.config.control.deadkeys="none";
	th.config.control.rotationlock=null;
	th.config.control.lockingsoftdrop=false;
	th.config.field.blockout=true;
	th.config.field.partiallockout=true;
	th.config.field.lockout=true;
	th.config.field.ghost=false;
	th.config.field.height=21;
	th.config.field.hold=false;
	th.config.field.holdcount=0;
	th.config.field.piecemodel="classic";
	th.config.field.vanishinglines=0;
	th.config.field.width=12;
	th.config.field.ceiling=false;
	th.config.field.extraactions=null;		
	th.config.field.big=1;
	th.config.field.vanishspeed=null;
	th.config.next.count=1;
	th.config.next.randomizer="memoryless";
	th.config.next.spawnpoint="classic";
	th.config.score.gamemode="tetrisworlds";
	th.config.score.style=null;
	th.config.score.tspinwithwalls=false;
	th.config.score.scorecap=null;
	th.config.score.stagetimermax=0;
	th.config.score.stagetimerframes=0;
	th.config.score.grading=null;
	th.config.score.sectionmarks=null;
	th.config.score.internalgrade=null;
	th.config.score.forcedlinesevery=null;
	th.config.score.levelcap=null;
	th.config.score.medals=null;
	th.config.score.blocksforcritical=null;
	th.config.score.blocksforrecovery=null;
	th.config.score.torikan=null;
	th.config.score.harddropscore="longest"; // Can be "sum"
	th.config.score.levelscores=[1,2,3,4]; // Levels added for single, double, triple and tetris
	th.config.timing.are=0;
	th.config.timing.harddrop=true;
	th.config.timing.floorkickcount=0;
	th.config.timing.fps=60;
	th.config.timing.movereset=false;
	th.config.timing.spinreset=false;
	th.config.timing.kickset=[];
	th.config.timing.linecleardelay=0;
	th.config.timing.lockdelay=0;
	th.config.timing.pushkicks=false;
	th.config.timing.stickstoppable=false;
	th.config.timing.gravity=0;

	// GRAPHIC PARAMETERS
	th.config.gfx.tileset="brick-tgm";
	th.config.gfx.drawborder="rgb(255,255,255)";
	th.config.gfx.thd=7;
	th.config.gfx.fallingthd=7;
	th.config.gfx.breaksparks={type:"normal",spacing:15,valign:"top",accx:0,accy:0,tileset:"break-tgm",frames:{speed:1,frames:help.seq(0,36,block.getframeskip(th))}};
	th.config.gfx.dropanimation={type:"tgm"};
	th.config.gfx.blinkprefix="bl";
	th.config.gfx.blitsfieldindex=1; // The index of the border blits. For changing in other modules.
	th.config.gfx.blits=[
		{type:"background"},
		{type:"blit",dx:-8,dy:-8,tileset:"fields",tile:0},
		{type:"staffroll"},
		{type:"blit",dx:-8,dy:-41,tileset:"head-tgm",tile:0},
		{type:"blit",dx:28,dy:-37,tileset:"small-lbl",tile:0},
		{type:"blit",dx:-8,dy:-37,tileset:"small-lbl",tile:6},
	
	
	
		{type:"blit",dx:90,dy:-8,tileset:"small-lbl",tile:4},
		{type:"label",label:"stagenumber",dx:90,dy:-1,font:"small-digitgray"},
	
		{ifconfig:["score","style"],type:"blit",dx:90,dy:20,tileset:"small-lbl",tile:1},
		{ifconfig:["score","style"],type:"label",subj:"overall",label:"score",dx:90,dy:27,font:"small-digitgray"},
		{ifcondition:"score",type:"blit",dx:90,dy:37,tileset:"bar",tile:0},
		{ifcondition:"score",type:"label",caplabel:"score",dx:90,dy:41,font:"small-digitgray"},
	
		{type:"blit",dx:90,dy:58,tileset:"small-lbl",tile:7},
		{type:"label",subj:"overall",label:"lines",dx:90,dy:66,font:"small-digitgray"},
		{ifcondition:"lines",type:"blit",dx:90,dy:76,tileset:"bar",tile:0},
		{ifcondition:"lines",type:"label",caplabel:"lines",dx:90,dy:81,font:"small-digitgray"},
	
		{ifcondition:"level",type:"blit",dx:90,dy:96,tileset:"small-lbl",tile:2},
		{ifcondition:"level",type:"label",label:"level",dx:90,dy:104,font:"small-digitgray"},
		{ifcondition:"level",type:"blit",dx:90,dy:114,tileset:"bar",tile:0},
		{ifcondition:"level",type:"label",label:"nextlevelat",dx:90,dy:118,font:"small-digitgray"},

		// For tgm3 like games, with shown level != real level
		{ifcondition:"boostedlevel",type:"blit",dx:90,dy:96,tileset:"small-lbl",tile:2},
		{ifcondition:"boostedlevel",type:"label",label:"level",dx:90,dy:104,font:"small-digitgray"},
		{ifcondition:"boostedlevel",type:"blit",dx:90,dy:114,tileset:"bar",tile:0},
		{ifcondition:"boostedlevel",type:"label",label:"nextlevelat",dx:90,dy:118,font:"small-digitgray"},

	
		{ifgrading:true,type:"blit",dx:-40,dy:-8,tileset:"small-lbl",tile:10},
		{ifgrading:true,blink:true,type:"labelmap",label:"gradelabel",prefix:"gr",dx:-70,dy:0,map:{
			gr9:{tileset:"grade",tile:0},  grS1:{tileset:"grade",tile:1},  grM1:{tileset:"grade",tile:2},  grMa:{tileset:"grade",tile: 3},  grS10:{tileset:"grade",tile:4},   grM:{tileset:"grade",tile:5},
			gr8:{tileset:"grade",tile:6},  grS2:{tileset:"grade",tile:7},  grM2:{tileset:"grade",tile:8},  grMaK:{tileset:"grade",tile:9},  grS11:{tileset:"grade",tile:10},  grMM:{tileset:"grade",tile:11},
			gr7:{tileset:"grade",tile:12}, grS3:{tileset:"grade",tile:13}, grM3:{tileset:"grade",tile:14}, grMaV:{tileset:"grade",tile:15}, grS12:{tileset:"grade",tile:16},  grMK:{tileset:"grade",tile:17},
			gr6:{tileset:"grade",tile:18}, grS4:{tileset:"grade",tile:19}, grM4:{tileset:"grade",tile:20}, grMaO:{tileset:"grade",tile:21}, grS13:{tileset:"grade",tile:22},  grMV:{tileset:"grade",tile:23},
			gr5:{tileset:"grade",tile:24}, grS5:{tileset:"grade",tile:25}, grM5:{tileset:"grade",tile:26}, grMaM:{tileset:"grade",tile:27},           						  grMO:{tileset:"grade",tile:29},
			gr4:{tileset:"grade",tile:30}, grS6:{tileset:"grade",tile:31}, grM6:{tileset:"grade",tile:32}, grMas:{tileset:"grade",tile:33},           						  grMMM:{tileset:"grade",tile:35},
			gr3:{tileset:"grade",tile:36}, grS7:{tileset:"grade",tile:37}, grM7:{tileset:"grade",tile:38}, 																	  grGm:{tileset:"grade-gm",tile:1}, 
			gr2:{tileset:"grade",tile:42}, grS8:{tileset:"grade",tile:43}, grM8:{tileset:"grade",tile:44},
			gr1:{tileset:"grade",tile:48}, grS9:{tileset:"grade",tile:49}, grM9:{tileset:"grade",tile:50}
		}},
		{ifmedals:true,type:"medalsmap",dx:-30,dy:50,map:{
			acplatinum:{tileset:"medal",tile:0}, stplatinum:{tileset:"medal",tile:1}, skplatinum:{tileset:"medal",tile:2}, replatinum:{tileset:"medal",tile:3}, roplatinum:{tileset:"medal",tile:4}, coplatinum:{tileset:"medal",tile:5}, tsplatinum:{tileset:"medal",tile:6},
			acgold:{tileset:"medal",tile:7}, stgold:{tileset:"medal",tile:8}, skgold:{tileset:"medal",tile:9}, regold:{tileset:"medal",tile:10}, rogold:{tileset:"medal",tile:11}, cogold:{tileset:"medal",tile:12}, tsgold:{tileset:"medal",tile:13},
			acsilver:{tileset:"medal",tile:14}, stsilver:{tileset:"medal",tile:15}, sksilver:{tileset:"medal",tile:16}, resilver:{tileset:"medal",tile:17}, rosilver:{tileset:"medal",tile:18}, cosilver:{tileset:"medal",tile:19}, tssilver:{tileset:"medal",tile:20},
			acbronze:{tileset:"medal",tile:21}, stbronze:{tileset:"medal",tile:22}, skbronze:{tileset:"medal",tile:23}, rebronze:{tileset:"medal",tile:24}, robronze:{tileset:"medal",tile:25}, cobronze:{tileset:"medal",tile:26}, tsbronze:{tileset:"medal",tile:27},
			acnone:{tileset:"medal",tile:28}, stnone:{tileset:"medal",tile:29}, sknone:{tileset:"medal",tile:30}, renone:{tileset:"medal",tile:31}, ronone:{tileset:"medal",tile:32}, conone:{tileset:"medal",tile:33}, tsnone:{tileset:"medal",tile:34},
		}},

		{ifcondition:"stagetimer",type:"blit",dx:90,dy:145,tileset:"small-lbl",tile:8},
		{ifcondition:"stagetimer",type:"label",caponlabel:"stagetimer",dx:115,dy:143,font:"small-gray"},
	

	
		{type:"label",blink:true,subj:"overall",label:"timerstring",dx:-8,dy:175,font:"big-digitgray"},
		{type:"piece",dx:25,dy:-28,tileset:null,piece:block.cons.piece.next,nextid:0,dark:0,thd:null},
		{type:"piece",dx:60,dy:-20,tileset:"smbrick-tgm",piece:block.cons.piece.next,nextid:1,dark:0,thd:null},
		{type:"piece",dx:80,dy:-20,tileset:"smbrick-tgm",piece:block.cons.piece.next,nextid:2,dark:0,thd:null},
		{type:"piece",dx:100,dy:-20,tileset:"smbrick-tgm",piece:block.cons.piece.next,nextid:3,dark:0,thd:null},
		{type:"piece",dx:120,dy:-20,tileset:"smbrick-tgm",piece:block.cons.piece.next,nextid:4,dark:0,thd:null},
		{type:"piece",dx:140,dy:-20,tileset:"smbrick-tgm",piece:block.cons.piece.next,nextid:5,dark:0,thd:null},
		{type:"piece",dx:160,dy:-20,tileset:"smbrick-tgm",piece:block.cons.piece.next,nextid:6,dark:0,thd:null},
		{type:"piece",dx:-4,dy:-28,tileset:"smbrick-tgm",piece:block.cons.piece.hold,dark:0,thd:null},
		{type:"field"},
		{type:"falling"},
	
		{type:"message",dx:-115,dy:165,font:"small-gray"},
		{type:"extraactions"}
	];

	th.config.gfx.backgrounds=[ // 320x280, posterized 10, luminosita' -127
		{image:"back-01",scroll:20,speed:block.convertframes(th,400)},
		{image:"back-03",scroll:20,speed:block.convertframes(th,400)},
		{image:"back-02",scroll:20,speed:block.convertframes(th,400)}
	];
	th.config.gfx.ghostlight=0.5;
	th.config.gfx.darkenlight=1;
	th.config.gfx.vanishingcolors=1;
	th.config.gfx.clearlineanimation="fade";
	th.config.gfx.lockanimation={type:"flash",duration:2,onharddrop:true};
	th.config.gfx.palette="classic";
	th.config.gfx.messagetime=3; // in seconds
	th.config.gfx.coloronpaste=null; // The color of the blocks after pasting (for tengen tetris lookalikes)
	
	// Follows the "road" style of definition

	th.config.gfx.gameoveranimation=[
		{setup:{animation:{type:"shake",tileset:"text1",tile:0,duration:10,still:100}}}
	];

	th.config.gfx.gameclearanimation=[
		{setup:{animation:{type:"shake",tileset:"clear",tile:0,duration:10,still:100}}}
	];

}

block.library["gfx-none"]=function(th) { // Any gfx effect
	th.config.gfx.drawborder=null;
	th.config.gfx.thd=null;
	th.config.gfx.fallingthd=null;
	th.config.gfx.breaksparks=null;
	th.config.gfx.dropanimation=null;
	th.config.gfx.clearlineanimation="void";
	th.config.gfx.lockanimation=null;
	th.config.gfx.darkenlight=0;
}

