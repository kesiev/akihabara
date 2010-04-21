// Classic Gameboy parameters - http://www.tetrisconcept.net/wiki/Tetris_%28Game_Boy%29

block.roads.gameboy=[ 
	block.defaults.readygo(),
	{setup:{gravity:fpc2g(53)},nextstage:[{condition:[["onlock","or","overall","lines",">=",null,10]]}]},
	{setup:{nextstagenumber:true,nextbackground:true,gravity:fpc2g(49)},nextstage:[{condition:[["onlock","or","overall","lines",">=",null,20]]}]},
	{setup:{nextstagenumber:true,nextbackground:true,gravity:fpc2g(45)},nextstage:[{condition:[["onlock","or","overall","lines",">=",null,30]]}]},
	{setup:{nextstagenumber:true,nextbackground:true,gravity:fpc2g(41)},nextstage:[{condition:[["onlock","or","overall","lines",">=",null,40]]}]},
	{setup:{nextstagenumber:true,nextbackground:true,gravity:fpc2g(37)},nextstage:[{condition:[["onlock","or","overall","lines",">=",null,50]]}]},
	{setup:{nextstagenumber:true,nextbackground:true,gravity:fpc2g(33)},nextstage:[{condition:[["onlock","or","overall","lines",">=",null,60]]}]},
	{setup:{nextstagenumber:true,nextbackground:true,gravity:fpc2g(28)},nextstage:[{condition:[["onlock","or","overall","lines",">=",null,70]]}]},
	{setup:{nextstagenumber:true,nextbackground:true,gravity:fpc2g(22)},nextstage:[{condition:[["onlock","or","overall","lines",">=",null,80]]}]},
	{setup:{nextstagenumber:true,nextbackground:true,gravity:fpc2g(17)},nextstage:[{condition:[["onlock","or","overall","lines",">=",null,90]]}]},
	{setup:{nextstagenumber:true,nextbackground:true,gravity:fpc2g(11)},nextstage:[{condition:[["onlock","or","overall","lines",">=",null,100]]}]},
	{setup:{nextstagenumber:true,nextbackground:true,gravity:fpc2g(10)},nextstage:[{condition:[["onlock","or","overall","lines",">=",null,110]]}]},
	{setup:{nextstagenumber:true,nextbackground:true,gravity:fpc2g(9)},nextstage:[{condition:[["onlock","or","overall","lines",">=",null,120]]}]},
	{setup:{nextstagenumber:true,nextbackground:true,gravity:fpc2g(8)},nextstage:[{condition:[["onlock","or","overall","lines",">=",null,130]]}]},
	{setup:{nextstagenumber:true,nextbackground:true,gravity:fpc2g(7)},nextstage:[{condition:[["onlock","or","overall","lines",">=",null,140]]}]},
	{setup:{nextstagenumber:true,nextbackground:true,gravity:fpc2g(6)},nextstage:[{condition:[["onlock","or","overall","lines",">=",null,150]]}]},
	{setup:{nextstagenumber:true,nextbackground:true,gravity:fpc2g(6)},nextstage:[{condition:[["onlock","or","overall","lines",">=",null,160]]}]},
	{setup:{nextstagenumber:true,nextbackground:true,gravity:fpc2g(5)},nextstage:[{condition:[["onlock","or","overall","lines",">=",null,170]]}]},
	{setup:{nextstagenumber:true,nextbackground:true,gravity:fpc2g(5)},nextstage:[{condition:[["onlock","or","overall","lines",">=",null,180]]}]},
	{setup:{nextstagenumber:true,nextbackground:true,gravity:fpc2g(4)},nextstage:[{condition:[["onlock","or","overall","lines",">=",null,190]]}]},
	{setup:{nextstagenumber:true,nextbackground:true,gravity:fpc2g(4)},nextstage:[{condition:[["onlock","or","overall","lines",">=",null,200]]}]},
	{setup:{nextstagenumber:true,nextbackground:true,gravity:fpc2g(3)},nextstage:[{condition:[["onlock","or","overall","lines",">=",null,210]]}]},
	block.defaults.playforever()
];


block.gamemodes.gb={
	label:"GAMEBOY TETRIS",
	year:"1989",
	notes:["MISSING HEART LEVELS."],
	modes:[]
}

block.gamemodes.gb.modes.push({label:"NORMAL",id:"sim-gb"});
block.library["sim-gb"]=function(th) {
  	  // CONFIRMED
  	  th.config.timing.fps=59.73;
	  th.config.field.hold=false;
	  th.config.control.harddrop=false; // up for dropping a piece to the bottom
	  th.config.field.height=19;
	  th.config.field.width=12;
	  th.config.control.softdropisdas=false; // Use das instrad of softdrop gravity
	  th.config.control.softdrop=1/3; // Gravity of soft drops
	  th.config.timing.are=block.convertframes(th,2); // frames to wait before spawning the next piece
	  th.config.control.keyhold=true;
	  th.config.control.das=block.convertframes(th,24); // frames of hold
	  th.config.score.style="nintendo";
	  th.config.score.gamemode="gameboy";
	  th.config.score.scorecap=999999;

	  block.loadlibrary(th,"rot-nin-left");
  	  
  	  // TO BE CONFIRMED
	  th.config.timing.linecleardelay=block.convertframes(th,93-2-2); // frames for new lines detection and removal - is wiki lineclear minus are?
  	  th.config.control.initialdas=th.config.control.das;

	  // TODO
	  // The "heart levels" (activated by holding Down+Start at the title screen) are as fast as the level plus 10, but unlike on the NES version, they don't improve the score.
	  
	  // GRAPHIC CHANGES
	  block.loadlibrary(th,"gfx-none");
	  th.config.gfx.blits[th.config.gfx.blitsfieldindex]={type:"blit",dx:-8,dy:0,tileset:"fields",tile:20};
  	  th.config.gfx.tileset="brick-gb";
  	  th.config.gfx.clearlineanimation="blink";
}
		  
			
			
