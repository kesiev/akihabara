// Sega Tetris - http://www.tetrisconcept.net/wiki/Tetris_%28Sega%29

block.deadkeys.sega=[  true,true,true,true,   false,   true, true];  // Only counterclockwise

block.roads.segaeasy=[ // Sega tetris Easy - http://www.tetrisconcept.net/wiki/Tetris_%28Sega%29
	block.defaults.readygo(),
	{setup:{resettimers:true,gravity:fpc2g(48)},nextstage:[{condition:[["onlock","or","global","stagetimer",">=",null,14],["onlock","or","overall","tetris","!=","last","tetris"]]}]},
	{setup:{nextstagenumber:true,nextbackground:true,resettimers:true,gravity:fpc2g(32)},nextstage:[{condition:[["onlock","or","global","stagetimer",">=",null,9],["onlock","or","overall","tetris","!=","last","tetris"]]}]},
	{setup:{nextstagenumber:true,nextbackground:true,resettimers:true,gravity:fpc2g(24)},nextstage:[{condition:[["onlock","or","global","stagetimer",">=",null,9],["onlock","or","overall","tetris","!=","last","tetris"]]}]},
	{setup:{nextstagenumber:true,nextbackground:true,resettimers:true,gravity:fpc2g(18)},nextstage:[{condition:[["onlock","or","global","stagetimer",">=",null,9],["onlock","or","overall","tetris","!=","last","tetris"]]}]},
	{setup:{nextstagenumber:true,nextbackground:true,resettimers:true,gravity:fpc2g(14)},nextstage:[{condition:[["onlock","or","global","stagetimer",">=",null,9],["onlock","or","overall","tetris","!=","last","tetris"]]}]},
	{setup:{nextstagenumber:true,nextbackground:true,resettimers:true,gravity:fpc2g(12)},nextstage:[{condition:[["onlock","or","global","stagetimer",">=",null,9],["onlock","or","overall","tetris","!=","last","tetris"]]}]},
	{setup:{nextstagenumber:true,nextbackground:true,resettimers:true,gravity:fpc2g(10)},nextstage:[{condition:[["onlock","or","global","stagetimer",">=",null,9],["onlock","or","overall","tetris","!=","last","tetris"]]}]},
	{setup:{nextstagenumber:true,nextbackground:true,resettimers:true,gravity:fpc2g(8)},nextstage:[{condition:[["onlock","or","global","stagetimer",">=",null,9],["onlock","or","overall","tetris","!=","last","tetris"]]}]},
	{setup:{nextstagenumber:true,nextbackground:true,resettimers:true,gravity:fpc2g(6)},nextstage:[{condition:[["onlock","or","global","stagetimer",">=",null,9],["onlock","or","overall","tetris","!=","last","tetris"]]}]},
	{setup:{nextstagenumber:true,nextbackground:true,resettimers:true,gravity:fpc2g(4)},nextstage:[{condition:[["onlock","or","global","stagetimer",">=",null,14],["onlock","or","overall","tetris","!=","last","tetris"]]}]},
	{setup:{nextstagenumber:true,nextbackground:true,resettimers:true,gravity:fpc2g(12)},nextstage:[{condition:[["onlock","or","global","stagetimer",">=",null,14],["onlock","or","overall","tetris","!=","last","tetris"]]}]},
	{setup:{nextstagenumber:true,nextbackground:true,resettimers:true,gravity:fpc2g(10)},nextstage:[{condition:[["onlock","or","global","stagetimer",">=",null,9],["onlock","or","overall","tetris","!=","last","tetris"]]}]},
	{setup:{nextstagenumber:true,nextbackground:true,resettimers:true,gravity:fpc2g(8)},nextstage:[{condition:[["onlock","or","global","stagetimer",">=",null,9],["onlock","or","overall","tetris","!=","last","tetris"]]}]},
	{setup:{nextstagenumber:true,nextbackground:true,resettimers:true,gravity:fpc2g(6)},nextstage:[{condition:[["onlock","or","global","stagetimer",">=",null,9],["onlock","or","overall","tetris","!=","last","tetris"]]}]},
	{setup:{nextstagenumber:true,nextbackground:true,resettimers:true,gravity:fpc2g(4)},nextstage:[{condition:[["onlock","or","global","stagetimer",">=",null,9],["onlock","or","overall","tetris","!=","last","tetris"]]}]},
	{setup:{nextstagenumber:true,nextbackground:true,resettimers:true,gravity:fpc2g(2)},nextstage:[{condition:[["onlock","or","global","stagetimer",">=",null,14],["onlock","or","overall","tetris","!=","last","tetris"]]}]},
	block.defaults.playforever()
];

block.roads.seganormal=[ // Sega tetris Normal - http://www.tetrisconcept.net/wiki/Tetris_%28Sega%29
	block.defaults.readygo(),
	{setup:{resettimers:true,gravity:fpc2g(48)},nextstage:[{condition:[["onlock","or","global","stagetimer",">=",null,14],["onlock","or","overall","tetris","!=","last","tetris"]]}]},
	{setup:{nextstagenumber:true,nextbackground:true,resettimers:true,gravity:fpc2g(24)},nextstage:[{condition:[["onlock","or","global","stagetimer",">=",null,9],["onlock","or","overall","tetris","!=","last","tetris"]]}]},
	{setup:{nextstagenumber:true,nextbackground:true,resettimers:true,gravity:fpc2g(18)},nextstage:[{condition:[["onlock","or","global","stagetimer",">=",null,9],["onlock","or","overall","tetris","!=","last","tetris"]]}]},
	{setup:{nextstagenumber:true,nextbackground:true,resettimers:true,gravity:fpc2g(15)},nextstage:[{condition:[["onlock","or","global","stagetimer",">=",null,9],["onlock","or","overall","tetris","!=","last","tetris"]]}]},
	{setup:{nextstagenumber:true,nextbackground:true,resettimers:true,gravity:fpc2g(12)},nextstage:[{condition:[["onlock","or","global","stagetimer",">=",null,9],["onlock","or","overall","tetris","!=","last","tetris"]]}]},
	{setup:{nextstagenumber:true,nextbackground:true,resettimers:true,gravity:fpc2g(10)},nextstage:[{condition:[["onlock","or","global","stagetimer",">=",null,9],["onlock","or","overall","tetris","!=","last","tetris"]]}]},
	{setup:{nextstagenumber:true,nextbackground:true,resettimers:true,gravity:fpc2g(8)},nextstage:[{condition:[["onlock","or","global","stagetimer",">=",null,9],["onlock","or","overall","tetris","!=","last","tetris"]]}]},
	{setup:{nextstagenumber:true,nextbackground:true,resettimers:true,gravity:fpc2g(6)},nextstage:[{condition:[["onlock","or","global","stagetimer",">=",null,9],["onlock","or","overall","tetris","!=","last","tetris"]]}]},
	{setup:{nextstagenumber:true,nextbackground:true,resettimers:true,gravity:fpc2g(4)},nextstage:[{condition:[["onlock","or","global","stagetimer",">=",null,9],["onlock","or","overall","tetris","!=","last","tetris"]]}]},
	{setup:{nextstagenumber:true,nextbackground:true,resettimers:true,gravity:fpc2g(2)},nextstage:[{condition:[["onlock","or","global","stagetimer",">=",null,14],["onlock","or","overall","tetris","!=","last","tetris"]]}]},
	{setup:{nextstagenumber:true,nextbackground:true,resettimers:true,gravity:fpc2g(10)},nextstage:[{condition:[["onlock","or","global","stagetimer",">=",null,14],["onlock","or","overall","tetris","!=","last","tetris"]]}]},
	{setup:{nextstagenumber:true,nextbackground:true,resettimers:true,gravity:fpc2g(8)},nextstage:[{condition:[["onlock","or","global","stagetimer",">=",null,9],["onlock","or","overall","tetris","!=","last","tetris"]]}]},
	{setup:{nextstagenumber:true,nextbackground:true,resettimers:true,gravity:fpc2g(6)},nextstage:[{condition:[["onlock","or","global","stagetimer",">=",null,9],["onlock","or","overall","tetris","!=","last","tetris"]]}]},
	{setup:{nextstagenumber:true,nextbackground:true,resettimers:true,gravity:fpc2g(4)},nextstage:[{condition:[["onlock","or","global","stagetimer",">=",null,9],["onlock","or","overall","tetris","!=","last","tetris"]]}]},
	{setup:{nextstagenumber:true,nextbackground:true,resettimers:true,gravity:fpc2g(2)},nextstage:[{condition:[["onlock","or","global","stagetimer",">=",null,9],["onlock","or","overall","tetris","!=","last","tetris"]]}]},
	{setup:{nextstagenumber:true,nextbackground:true,resettimers:true,gravity:fpc2g(1)},nextstage:[{condition:[["onlock","or","global","stagetimer",">=",null,14],["onlock","or","overall","tetris","!=","last","tetris"]]}]},
	block.defaults.playforever()
];



block.roads.segahard=[
	block.defaults.readygo(),
	{setup:{resettimers:true,gravity:fpc2g(40)},nextstage:[{condition:[["onlock","or","global","stagetimer",">=",null,14],["onlock","or","overall","tetris","!=","last","tetris"]]}]},
	{setup:{nextstagenumber:true,nextbackground:true,resettimers:true,gravity:fpc2g(20)},nextstage:[{condition:[["onlock","or","global","stagetimer",">=",null,9],["onlock","or","overall","tetris","!=","last","tetris"]]}]},
	{setup:{nextstagenumber:true,nextbackground:true,resettimers:true,gravity:fpc2g(16)},nextstage:[{condition:[["onlock","or","global","stagetimer",">=",null,9],["onlock","or","overall","tetris","!=","last","tetris"]]}]},
	{setup:{nextstagenumber:true,nextbackground:true,resettimers:true,gravity:fpc2g(12)},nextstage:[{condition:[["onlock","or","global","stagetimer",">=",null,9],["onlock","or","overall","tetris","!=","last","tetris"]]}]},
	{setup:{nextstagenumber:true,nextbackground:true,resettimers:true,gravity:fpc2g(10)},nextstage:[{condition:[["onlock","or","global","stagetimer",">=",null,9],["onlock","or","overall","tetris","!=","last","tetris"]]}]},
	{setup:{nextstagenumber:true,nextbackground:true,resettimers:true,gravity:fpc2g(8)},nextstage:[{condition:[["onlock","or","global","stagetimer",">=",null,9],["onlock","or","overall","tetris","!=","last","tetris"]]}]},
	{setup:{nextstagenumber:true,nextbackground:true,resettimers:true,gravity:fpc2g(6)},nextstage:[{condition:[["onlock","or","global","stagetimer",">=",null,9],["onlock","or","overall","tetris","!=","last","tetris"]]}]},
	{setup:{nextstagenumber:true,nextbackground:true,resettimers:true,gravity:fpc2g(4)},nextstage:[{condition:[["onlock","or","global","stagetimer",">=",null,9],["onlock","or","overall","tetris","!=","last","tetris"]]}]},
	{setup:{nextstagenumber:true,nextbackground:true,resettimers:true,gravity:fpc2g(2)},nextstage:[{condition:[["onlock","or","global","stagetimer",">=",null,9],["onlock","or","overall","tetris","!=","last","tetris"]]}]},
	{setup:{nextstagenumber:true,nextbackground:true,resettimers:true,gravity:fpc2g(1)},nextstage:[{condition:[["onlock","or","global","stagetimer",">=",null,14],["onlock","or","overall","tetris","!=","last","tetris"]]}]},
	{setup:{nextstagenumber:true,nextbackground:true,resettimers:true,gravity:fpc2g(10)},nextstage:[{condition:[["onlock","or","global","stagetimer",">=",null,14],["onlock","or","overall","tetris","!=","last","tetris"]]}]},
	{setup:{nextstagenumber:true,nextbackground:true,resettimers:true,gravity:fpc2g(8)},nextstage:[{condition:[["onlock","or","global","stagetimer",">=",null,9],["onlock","or","overall","tetris","!=","last","tetris"]]}]},
	{setup:{nextstagenumber:true,nextbackground:true,resettimers:true,gravity:fpc2g(6)},nextstage:[{condition:[["onlock","or","global","stagetimer",">=",null,9],["onlock","or","overall","tetris","!=","last","tetris"]]}]},
	{setup:{nextstagenumber:true,nextbackground:true,resettimers:true,gravity:fpc2g(4)},nextstage:[{condition:[["onlock","or","global","stagetimer",">=",null,9],["onlock","or","overall","tetris","!=","last","tetris"]]}]},
	{setup:{nextstagenumber:true,nextbackground:true,resettimers:true,gravity:fpc2g(2)},nextstage:[{condition:[["onlock","or","global","stagetimer",">=",null,9],["onlock","or","overall","tetris","!=","last","tetris"]]}]},
	{setup:{nextstagenumber:true,nextbackground:true,resettimers:true,gravity:fpc2g(1)},nextstage:[{condition:[["onlock","or","global","stagetimer",">=",null,14],["onlock","or","overall","tetris","!=","last","tetris"]]}]},
	block.defaults.playforever()
];
			
			
block.roads.segahardest=[
	block.defaults.readygo(),
	{setup:{resettimers:true,gravity:fpc2g(30)},nextstage:[{condition:[["onlock","or","global","stagetimer",">=",null,14],["onlock","or","overall","tetris","!=","last","tetris"]]}]},
	{setup:{nextstagenumber:true,nextbackground:true,resettimers:true,gravity:fpc2g(15)},nextstage:[{condition:[["onlock","or","global","stagetimer",">=",null,9],["onlock","or","overall","tetris","!=","last","tetris"]]}]},
	{setup:{nextstagenumber:true,nextbackground:true,resettimers:true,gravity:fpc2g(12)},nextstage:[{condition:[["onlock","or","global","stagetimer",">=",null,9],["onlock","or","overall","tetris","!=","last","tetris"]]}]},
	{setup:{nextstagenumber:true,nextbackground:true,resettimers:true,gravity:fpc2g(10)},nextstage:[{condition:[["onlock","or","global","stagetimer",">=",null,9],["onlock","or","overall","tetris","!=","last","tetris"]]}]},
	{setup:{nextstagenumber:true,nextbackground:true,resettimers:true,gravity:fpc2g(8)},nextstage:[{condition:[["onlock","or","global","stagetimer",">=",null,9],["onlock","or","overall","tetris","!=","last","tetris"]]}]},
	{setup:{nextstagenumber:true,nextbackground:true,resettimers:true,gravity:fpc2g(6)},nextstage:[{condition:[["onlock","or","global","stagetimer",">=",null,9],["onlock","or","overall","tetris","!=","last","tetris"]]}]},
	{setup:{nextstagenumber:true,nextbackground:true,resettimers:true,gravity:fpc2g(4)},nextstage:[{condition:[["onlock","or","global","stagetimer",">=",null,9],["onlock","or","overall","tetris","!=","last","tetris"]]}]},
	{setup:{nextstagenumber:true,nextbackground:true,resettimers:true,gravity:fpc2g(2)},nextstage:[{condition:[["onlock","or","global","stagetimer",">=",null,9],["onlock","or","overall","tetris","!=","last","tetris"]]}]},
	{setup:{nextstagenumber:true,nextbackground:true,resettimers:true,gravity:fpc2g(1)},nextstage:[{condition:[["onlock","or","global","stagetimer",">=",null,9],["onlock","or","overall","tetris","!=","last","tetris"]]}]},
	{setup:{nextstagenumber:true,nextbackground:true,resettimers:true,gravity:fpc2g(1)},nextstage:[{condition:[["onlock","or","global","stagetimer",">=",null,14],["onlock","or","overall","tetris","!=","last","tetris"]]}]},
	{setup:{nextstagenumber:true,nextbackground:true,resettimers:true,gravity:fpc2g(8)},nextstage:[{condition:[["onlock","or","global","stagetimer",">=",null,14],["onlock","or","overall","tetris","!=","last","tetris"]]}]},
	{setup:{nextstagenumber:true,nextbackground:true,resettimers:true,gravity:fpc2g(6)},nextstage:[{condition:[["onlock","or","global","stagetimer",">=",null,9],["onlock","or","overall","tetris","!=","last","tetris"]]}]},
	{setup:{nextstagenumber:true,nextbackground:true,resettimers:true,gravity:fpc2g(4)},nextstage:[{condition:[["onlock","or","global","stagetimer",">=",null,9],["onlock","or","overall","tetris","!=","last","tetris"]]}]},
	{setup:{nextstagenumber:true,nextbackground:true,resettimers:true,gravity:fpc2g(2)},nextstage:[{condition:[["onlock","or","global","stagetimer",">=",null,9],["onlock","or","overall","tetris","!=","last","tetris"]]}]},
	{setup:{nextstagenumber:true,nextbackground:true,resettimers:true,gravity:fpc2g(1)},nextstage:[{condition:[["onlock","or","global","stagetimer",">=",null,9],["onlock","or","overall","tetris","!=","last","tetris"]]}]},
	{setup:{nextstagenumber:true,nextbackground:true,resettimers:true,gravity:fpc2g(1)},nextstage:[{condition:[["onlock","or","global","stagetimer",">=",null,14],["onlock","or","overall","tetris","!=","last","tetris"]]}]},
	block.defaults.playforever()
];


block.gamemodes.sega={
	label:"SEGA TETRIS",
	year:"1988",
	notes:["MISSING SCORING LOGIC."],
	modes:[]
}

block.gamemodes.sega.modes.push({label:"EASY",id:"sim-sega-easy"});		
block.library["sim-sega-easy"]=function(th){
  	// CONFIRMED
	th.config.next.count=1;
	th.config.field.height=21;
	th.config.field.width=12;
	th.config.control.harddrop=false;
	th.config.control.deadkeys="sega"; // Only counterclockwise rotation
	th.config.field.ceiling=true; // Sega tetris has ceiling (i.e. under vanishing lines is wall)
	th.config.control.softdrop=1; // Gravity of soft drops
	th.config.control.softdropisdas=false; // Use das instrad of softdrop gravity
	th.config.timing.lockdelay=block.convertframes(th,30);
	th.config.timing.linecleardelay=block.convertframes(th,42);
	th.config.control.keyhold=true; // Handle hold keys
	th.config.control.das=block.convertframes(th,5); // frames of hold
	th.config.control.initialdas=block.convertframes(th,20);
  	th.config.score.gamemode="segaeasy";
	th.config.score.stagetimermax=20; // Capped by checked conditions
	th.config.score.stagetimerframes=256;
  	th.config.next.randomizer="memorylesspoweron";		  	
  	block.loadlibrary(th,"rot-sega");
  	
  	// TO BE CONFIRMED
	th.config.timing.linecleardelay=block.convertframes(th,42); // Since ARE is missing, probably 42 is lineclear+ARE. Are have to be decreased
  	
  	// GRAPHIC CHANGES (TO BE CONFIRMED)
  	block.loadlibrary(th,"gfx-none");
  	th.config.gfx.tileset="brick-sega";
  	th.config.gfx.blits[th.config.gfx.blitsfieldindex]={type:"blit",dx:-8,dy:-8,tileset:"fields",tile:21};
  	th.config.gfx.clearlineanimation="fade";
}

block.gamemodes.sega.modes.push({label:"NORMAL",id:"sim-sega-normal"});	
block.library["sim-sega-normal"]=function(th){
  	// CONFIRMED
  	block.loadlibrary(th,"sim-sega-easy");
  	th.config.score.gamemode="seganormal";
}

block.gamemodes.sega.modes.push({label:"HARD",id:"sim-sega-hard"});	
block.library["sim-sega-hard"]=function(th){
	// CONFIRMED
	block.loadlibrary(th,"sim-sega-easy");
	th.config.score.gamemode="segahard";
}
		  
block.gamemodes.sega.modes.push({label:"HARDEST",id:"sim-sega-hardest"});	
block.library["sim-sega-hardest"]=function(th){
  	// CONFIRMED
  	block.loadlibrary(th,"sim-sega-easy");
  	th.config.score.gamemode="segahardest";
}	
			
/* GARBAGE

			segaonl:[
				block.defaults.readygo(),
				{setup:{gravity:fpc2g(30)},nextstage:[{condition:[["onlock","or","overall","lines",">=",null,10]]}]},
				{setup:{nextstagenumber:true,nextbackground:true,gravity:fpc2g(15)},nextstage:[{condition:[["onlock","or","overall","lines",">=",null,20]]}]},
				{setup:{nextstagenumber:true,nextbackground:true,gravity:fpc2g(12)},nextstage:[{condition:[["onlock","or","overall","lines",">=",null,30]]}]},
				{setup:{nextstagenumber:true,nextbackground:true,gravity:fpc2g(10)},nextstage:[{condition:[["onlock","or","overall","lines",">=",null,40]]}]},
				{setup:{nextstagenumber:true,nextbackground:true,gravity:fpc2g(8)},nextstage:[{condition:[["onlock","or","overall","lines",">=",null,50]]}]},
				{setup:{nextstagenumber:true,nextbackground:true,gravity:fpc2g(6)},nextstage:[{condition:[["onlock","or","overall","lines",">=",null,60]]}]},
				{setup:{nextstagenumber:true,nextbackground:true,gravity:fpc2g(4)},nextstage:[{condition:[["onlock","or","overall","lines",">=",null,70]]}]},
				{setup:{nextstagenumber:true,nextbackground:true,gravity:fpc2g(2)},nextstage:[{condition:[["onlock","or","overall","lines",">=",null,80]]}]},
				{setup:{nextstagenumber:true,nextbackground:true,gravity:fpc2g(1)},nextstage:[{condition:[["onlock","or","overall","lines",">=",null,90]]}]},
				{setup:{nextstagenumber:true,nextbackground:true,gravity:fpc2g(1)},nextstage:[{condition:[["onlock","or","overall","lines",">=",null,100]]}]},
				{setup:{nextstagenumber:true,nextbackground:true,gravity:fpc2g(8)},nextstage:[{condition:[["onlock","or","overall","lines",">=",null,110]]}]},
				{setup:{nextstagenumber:true,nextbackground:true,gravity:fpc2g(6)},nextstage:[{condition:[["onlock","or","overall","lines",">=",null,120]]}]},
				{setup:{nextstagenumber:true,nextbackground:true,gravity:fpc2g(4)},nextstage:[{condition:[["onlock","or","overall","lines",">=",null,130]]}]},
				{setup:{nextstagenumber:true,nextbackground:true,gravity:fpc2g(2)},nextstage:[{condition:[["onlock","or","overall","lines",">=",null,140]]}]},
				{setup:{nextstagenumber:true,nextbackground:true,gravity:fpc2g(1)},nextstage:[{condition:[["onlock","or","overall","lines",">=",null,150]]}]},
				{setup:{nextstagenumber:true,nextbackground:true},nextstage:[{condition:[]} // Play forever
			],
			
*/