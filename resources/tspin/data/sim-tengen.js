// Tengen Tetris - http://www.tetrisconcept.net/wiki/Tetris_(NES,_Tengen)
// DEPENDS ON rot-tengen
 
block.gamemodes.tengen={
	label:"TENGEN TETRIS",
	year:"1989",
	notes:["SCORE LOGIC UNPRECISE","MISSING GRAVITY TABLE (TETRISWORLDS)","SOFTDROP UNCONFIRMED","LINECLEAR UNCONFIRMED"],
	modes:[]
}

block.lines["tengen"]=function(th,linedata) {
  block.addscore(th,th.falling.softdrop+(th.config.field.height-th.falling.y));
};

// HACK - the score changes are in the extraactions structure, with different arguments
block.extraactions.tengen_score=function(m,th) { block.addscore(th,m.mul); } // Is called every count of score
block.extraactions.tengen=function(th,phase,done) { // Bonuses are awarded every 30 lines
	if (th.data._tengenlines==null) {
		th.data._tengenlines=0;
		th.data._tengenscores=[0,0,0,0];
		th.data._tengenbonus=null;
	}
	if (phase=="onlock") {
		if (done.cnt) {
			th.data._tengenlines+=done.cnt;
			th.data._tengenscores[done.cnt-1]++;
			if (th.data._tengenlines>=30) {
				toys.resetToy(th.data,"tengenbonus");
				th.paused=true;
				th.data._tengenbonus={
			  		skipkey:"a",
			  		esckey:null,
					font:"small-red",
					scenes:[
						{
						speed:block.convertmsec(th,500),dx:th.gfx.x+1,dy:th.gfx.y,spacing:1,
						bonus:[
							{text:saveme("SINGLE")},
							{text:" "+th.data._tengenscores[0]+" e 100"},
							{mul:100,mulvalue:th.data._tengenscores[0],mask:"= %TOT%",speed:block.convertmsec(th,100),callback:block.extraactions.tengen_score,arg:th},
							{text:""},
							{text:saveme("DOUBLE")},
							{text:" "+th.data._tengenscores[1]+" e 400"},
							{mul:400,mulvalue:th.data._tengenscores[1],mask:"= %TOT%",speed:block.convertmsec(th,100),callback:block.extraactions.tengen_score,arg:th},
							{text:""},
							{text:saveme("TRIPLE")},
							{text:" "+th.data._tengenscores[2]+" e 900"},
							{mul:900,mulvalue:th.data._tengenscores[2],mask:"= %TOT%",speed:block.convertmsec(th,100),callback:block.extraactions.tengen_score,arg:th},
							{text:""},
							{text:saveme("TETRIS")},
							{text:" "+th.data._tengenscores[3]+" e 2600"},
							{mul:2600,mulvalue:th.data._tengenscores[3],mask:"= %TOT%",speed:block.convertmsec(th,100),callback:block.extraactions.tengen_score,arg:th},
						]
						}
					]
				};
			}
		}
	} else if ((phase=="blit")&&(th.data._tengenbonus!=null)) {
		if (toys.dialogue.render(th.data,"tengenbonus",th.data._tengenbonus)) {
			th.data._tengenlines=0;
			th.data._tengenbonus=null;
			th.data._tengenscores=[0,0,0,0];				
			th.paused=false;
		}
	}
};


block.gamemodes.tengen.modes.push({label:"TENGEN",id:"sim-tengen"});
block.library["sim-tengen"]=function(th){
  
	// CONFIRMED
	th.config.field.height=21;
	th.config.field.width=12;
	th.config.field.hold=false;
	th.config.control.harddrop=false; // up for dropping a piece to the bottom
	th.config.field.extraactions="tengen";
	
	block.loadlibrary(th,"rot-tengen");
	
	// TO BE CONFIRMED
	th.config.control.softdropisdas=false; // Use das instrad of softdrop gravity
	 th.config.control.softdrop=1; // Gravity of soft drops (seems fast)
	 th.config.timing.linecleardelay=block.convertframes(th,20); 
	 th.config.score.style="tengen";
	
	// TODO
	// Graphics.
	// ARE/DAS etc.
	// The game gives line clearing bonuses only after completing each 30 lines. 
	// All tetrominoes become the same color when they lock, due to limitations of the NES picture memory. This color varies from level to level. 
	
	// GRAPHICS CHANGES (TO BE CONFIRMED)
	block.loadlibrary(th,"gfx-none");
	th.config.gfx.blits[th.config.gfx.blitsfieldindex]={type:"blit",dx:-8,dy:0,tileset:"fields",tile:22};
	th.config.gfx.tileset="brick-tengen";
	th.config.gfx.coloronpaste=0;
	th.config.gfx.clearlineanimation="progress";

}