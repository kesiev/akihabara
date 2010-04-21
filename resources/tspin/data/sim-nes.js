// Classic NES parameters - http://www.tetrisconcept.net/wiki/Tetris_%28NES,_Nintendo%29
// DEPENDS ON rot-nintendo

block.roads.nes=[ 
	block.defaults.readygo(),
	{setup:{gravity:fpc2g(48)},nextstage:[{condition:[["onlock","or","overall","lines",">=",null,10]]}]},
	{setup:{nextstagenumber:true,nextbackground:true,gravity:fpc2g(43)},nextstage:[{condition:[["onlock","or","overall","lines",">=",null,20]]}]},
	{setup:{nextstagenumber:true,nextbackground:true,gravity:fpc2g(38)},nextstage:[{condition:[["onlock","or","overall","lines",">=",null,30]]}]},
	{setup:{nextstagenumber:true,nextbackground:true,gravity:fpc2g(33)},nextstage:[{condition:[["onlock","or","overall","lines",">=",null,40]]}]},
	{setup:{nextstagenumber:true,nextbackground:true,gravity:fpc2g(28)},nextstage:[{condition:[["onlock","or","overall","lines",">=",null,50]]}]},
	{setup:{nextstagenumber:true,nextbackground:true,gravity:fpc2g(23)},nextstage:[{condition:[["onlock","or","overall","lines",">=",null,60]]}]},
	{setup:{nextstagenumber:true,nextbackground:true,gravity:fpc2g(18)},nextstage:[{condition:[["onlock","or","overall","lines",">=",null,70]]}]},
	{setup:{nextstagenumber:true,nextbackground:true,gravity:fpc2g(13)},nextstage:[{condition:[["onlock","or","overall","lines",">=",null,80]]}]},
	{setup:{nextstagenumber:true,nextbackground:true,gravity:fpc2g(8)},nextstage:[{condition:[["onlock","or","overall","lines",">=",null,90]]}]},
	{setup:{nextstagenumber:true,nextbackground:true,gravity:fpc2g(6)},nextstage:[{condition:[["onlock","or","overall","lines",">=",null,100]]}]},
	{setup:{nextstagenumber:true,nextbackground:true,gravity:fpc2g(5)},nextstage:[{condition:[["onlock","or","overall","lines",">=",null,110]]}]},
	{setup:{nextstagenumber:true,nextbackground:true,gravity:fpc2g(5)},nextstage:[{condition:[["onlock","or","overall","lines",">=",null,120]]}]},
	{setup:{nextstagenumber:true,nextbackground:true,gravity:fpc2g(5)},nextstage:[{condition:[["onlock","or","overall","lines",">=",null,130]]}]},
	{setup:{nextstagenumber:true,nextbackground:true,gravity:fpc2g(4)},nextstage:[{condition:[["onlock","or","overall","lines",">=",null,140]]}]},
	{setup:{nextstagenumber:true,nextbackground:true,gravity:fpc2g(4)},nextstage:[{condition:[["onlock","or","overall","lines",">=",null,150]]}]},
	{setup:{nextstagenumber:true,nextbackground:true,gravity:fpc2g(4)},nextstage:[{condition:[["onlock","or","overall","lines",">=",null,160]]}]},
	{setup:{nextstagenumber:true,nextbackground:true,gravity:fpc2g(3)},nextstage:[{condition:[["onlock","or","overall","lines",">=",null,170]]}]},
	{setup:{nextstagenumber:true,nextbackground:true,gravity:fpc2g(3)},nextstage:[{condition:[["onlock","or","overall","lines",">=",null,180]]}]},
	{setup:{nextstagenumber:true,nextbackground:true,gravity:fpc2g(3)},nextstage:[{condition:[["onlock","or","overall","lines",">=",null,190]]}]},
	{setup:{nextstagenumber:true,nextbackground:true,gravity:fpc2g(2)},nextstage:[{condition:[["onlock","or","overall","lines",">=",null,200]]}]},
	{setup:{nextstagenumber:true,nextbackground:true,gravity:fpc2g(2)},nextstage:[{condition:[["onlock","or","overall","lines",">=",null,210]]}]},
	{setup:{nextstagenumber:true,nextbackground:true,gravity:fpc2g(2)},nextstage:[{condition:[["onlock","or","overall","lines",">=",null,220]]}]},
	{setup:{nextstagenumber:true,nextbackground:true,gravity:fpc2g(2)},nextstage:[{condition:[["onlock","or","overall","lines",">=",null,230]]}]},
	{setup:{nextstagenumber:true,nextbackground:true,gravity:fpc2g(2)},nextstage:[{condition:[["onlock","or","overall","lines",">=",null,240]]}]},
	{setup:{nextstagenumber:true,nextbackground:true,gravity:fpc2g(2)},nextstage:[{condition:[["onlock","or","overall","lines",">=",null,250]]}]},
	{setup:{nextstagenumber:true,nextbackground:true,gravity:fpc2g(2)},nextstage:[{condition:[["onlock","or","overall","lines",">=",null,260]]}]},
	{setup:{nextstagenumber:true,nextbackground:true,gravity:fpc2g(2)},nextstage:[{condition:[["onlock","or","overall","lines",">=",null,270]]}]},
	{setup:{nextstagenumber:true,nextbackground:true,gravity:fpc2g(2)},nextstage:[{condition:[["onlock","or","overall","lines",">=",null,280]]}]},
	{setup:{nextstagenumber:true,nextbackground:true,gravity:fpc2g(2)},nextstage:[{condition:[["onlock","or","overall","lines",">=",null,290]]}]},
	{setup:{nextstagenumber:true,nextbackground:true,gravity:fpc2g(1)},nextstage:[{condition:[["onlock","or","overall","lines",">=",null,300]]}]},
	block.defaults.playforever()
];

block.gamemodes.nes={
	label:"NES TETRIS",
	year:"1989",
	modes:[]
}

block.gamemodes.nes.modes.push({label:"NORMAL",id:"sim-nes"});
block.library["sim-nes"]=function(th) {
	
	// CONFIRMED
	th.config.timing.fps=60.0988; // frames per sec
	th.config.field.height=21; // field height (including borders)
	th.config.field.width=12; // field width (including borders)
	th.config.score.gamemode="nes"; // leveling criteria
	th.config.next.count=1; // Number of shown incoming blocks
	th.config.control.keyhold=true; // Handle hold keys
	th.config.control.initialdas=block.convertframes(th,16); // frames of hold when key is pressed
	th.config.control.das=block.convertframes(th,6); // frames of hold
	th.config.timing.are=block.convertframes(th,10); // frames to wait before spawning the next piece
	th.config.score.style="nintendo"; // Scoring type for lines
	th.config.control.softdrop=0.5; // Gravity of soft drops
	th.config.control.softdropisdas=false; // Use das instrad of softdrop gravity
	block.loadlibrary(th,"rot-nin-right");

	// TO BE CONFIRMED
	th.config.timing.linecleardelay=block.convertframes(th,20-10); // is wiki lineclear - das?

	// TODO
	// Tenendo premuto giu' il primo pezzo rispetta la gravita' e non il softdrop
	// In Marathon (called A-TYPE), when the player line clear (startLevel * 10 + 10) or 100 lines, whatever comes first, the level advances by 1. After this, the level advances by 1 for every 10 lines.
	// * Start at level 5, advance to level 6 at 60 lines, advance to level 7 at 70 lines.
	// * Start at level 12, advance to level 13 at 100 lines, advance to level 14 at 110 lines. 
				
	// GRAPHICS CHANGES
	block.loadlibrary(th,"gfx-none");
	th.config.gfx.blits[th.config.gfx.blitsfieldindex]={type:"blit",dx:-8,dy:-8,tileset:"fields",tile:23};
	th.config.gfx.tileset="brick-nes";
	th.config.gfx.clearlineanimation="open";
 }
