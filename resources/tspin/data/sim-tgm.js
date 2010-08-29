// Tetris The Grand Master parameters - http://www.tetrisconcept.net/wiki/Tetris_The_Grand_Master
// DEPENDS ON rot-ars

// History based with starting history and roll count
block.nextmodels.tgm1={bag:"0123456",bagscount:0,history:4,starting:"4444",tries:4,first:"0321"};

block.grades.tgm={ 
	starting:["gr9","gm0"],
	grades:[
		{ // Base series of grades
			gr9:{label:"9",promote:[{tograde:"gr8",condition:[["onlock","or","overall","score",">=",null,400]]}]},
			gr8:{label:"8",promote:[{tograde:"gr7",condition:[["onlock","or","overall","score",">=",null,800]]}]},
			gr7:{label:"7",promote:[{tograde:"gr6",condition:[["onlock","or","overall","score",">=",null,1400]]}]},
			gr6:{label:"6",promote:[{tograde:"gr5",condition:[["onlock","or","overall","score",">=",null,2000]]}]},
			gr5:{label:"5",promote:[{tograde:"gr4",condition:[["onlock","or","overall","score",">=",null,3500]]}]},
			gr4:{label:"4",promote:[{tograde:"gr3",condition:[["onlock","or","overall","score",">=",null,5500]]}]},
			gr3:{label:"3",promote:[{tograde:"gr2",condition:[["onlock","or","overall","score",">=",null,8000]]}]},
			gr2:{label:"2",promote:[{tograde:"gr1",condition:[["onlock","or","overall","score",">=",null,12000]]}]},
			gr1:{label:"1",promote:[{tograde:"grS1",condition:[["onlock","or","overall","score",">=",null,16000]]}]},
			grS1:{label:"S1",promote:[{tograde:"grS2",condition:[["onlock","or","overall","score",">=",null,22000]]}]},
			grS2:{label:"S2",promote:[{tograde:"grS3",condition:[["onlock","or","overall","score",">=",null,30000]]}]},
			grS3:{label:"S3",promote:[{tograde:"grS4",condition:[["onlock","or","overall","score",">=",null,40000]]}]},
			grS4:{label:"S4",promote:[{tograde:"grS5",condition:[["onlock","or","overall","score",">=",null,52000]]}]},
			grS5:{label:"S5",promote:[{tograde:"grS6",condition:[["onlock","or","overall","score",">=",null,66000]]}]},
			grS6:{label:"S6",promote:[{tograde:"grS7",condition:[["onlock","or","overall","score",">=",null,82000]]}]},
			grS7:{label:"S7",promote:[{tograde:"grS8",condition:[["onlock","or","overall","score",">=",null,100000]]}]},
			grS8:{label:"S8",promote:[{tograde:"grS9",condition:[["onlock","or","overall","score",">=",null,120000]]}]},
			grS9:{label:"S9"}
		},
		{
			// Grandmaster grades -  Grades without labels are not shown, is shown the first available.
			gm0:{condition:[["onlock","or","global","level",">=",null,300]],promote:[{tograde:"gm1",condition:[["onlock","or","overall","score",">=",null,12000],["onlock","and","overall","time","<=",null,strtime2secs("04:15:00")]]},{fail:true}]},
			gm1:{condition:[["onlock","or","global","level",">=",null,500]],promote:[{tograde:"gm2",condition:[["onlock","or","overall","score",">=",null,40000],["onlock","and","overall","time","<=",null,strtime2secs("07:30:00")]]},{fail:true}]},
			gm2:{condition:[["onlock","or","global","level",">=",null,960]],promote:[{tograde:"gm3",condition:[["onlock","or","overall","score",">=",null,120000]]},{fail:true}]},
			gm3:{condition:[[null,"or","global","staffrolldone","==",null,1]],promote:[{tograde:"grGm", condition:[[null,"or","overall","time","<=",null,strtime2secs("13:30:00")]]},{fail:true}]},
			grGm:{label:"Gm"}
		}
	]
};

block.grades.debugtgm={ // An Easier TGM grading system - for debug
	starting:["gr9","gm0"],
	grades:[
		{ // Base series of grades
			gr9:{label:"9",promote:[{tograde:"gr8",condition:[["onlock","or","overall","score",">=",null,1]]}]},
			gr8:{label:"8",promote:[{tograde:"gr7",condition:[["onlock","or","overall","score",">=",null,2]]}]},
			gr7:{label:"7",promote:[{tograde:"gr6",condition:[["onlock","or","overall","score",">=",null,3]]}]},
			gr6:{label:"6",promote:[{tograde:"gr5",condition:[["onlock","or","overall","score",">=",null,4]]}]},
			gr5:{label:"5",promote:[{tograde:"gr4",condition:[["onlock","or","overall","score",">=",null,5]]}]},
			gr4:{label:"4",promote:[{tograde:"gr3",condition:[["onlock","or","overall","score",">=",null,6]]}]},
			gr3:{label:"3",promote:[{tograde:"gr2",condition:[["onlock","or","overall","score",">=",null,7]]}]},
			gr2:{label:"2",promote:[{tograde:"gr1",condition:[["onlock","or","overall","score",">=",null,8]]}]},
			gr1:{label:"1",promote:[{tograde:"grS1",condition:[["onlock","or","overall","score",">=",null,9]]}]},
			grS1:{label:"S1",promote:[{tograde:"grS2",condition:[["onlock","or","overall","score",">=",null,10]]}]},
			grS2:{label:"S2",promote:[{tograde:"grS3",condition:[["onlock","or","overall","score",">=",null,11]]}]},
			grS3:{label:"S3",promote:[{tograde:"grS4",condition:[["onlock","or","overall","score",">=",null,12]]}]},
			grS4:{label:"S4",promote:[{tograde:"grS5",condition:[["onlock","or","overall","score",">=",null,13]]}]},
			grS5:{label:"S5",promote:[{tograde:"grS6",condition:[["onlock","or","overall","score",">=",null,14]]}]},
			grS6:{label:"S6",promote:[{tograde:"grS7",condition:[["onlock","or","overall","score",">=",null,15]]}]},
			grS7:{label:"S7",promote:[{tograde:"grS8",condition:[["onlock","or","overall","score",">=",null,16]]}]},
			grS8:{label:"S8",promote:[{tograde:"grS9",condition:[["onlock","or","overall","score",">=",null,17]]}]},
			grS9:{label:"S9"}
		},
		{
			// Grandmaster grades -  Grades without labels are not shown, is shown the first available.
			gm0:{condition:[["onlock","or","global","level",">=",null,5]],promote:[{tograde:"gm1",condition:[["onlock","or","overall","score",">=",null,0],["onlock","and","overall","time","<=",null,strtime2secs("00:10:00")]]},{fail:true}]},
			gm1:{condition:[["onlock","or","global","level",">=",null,10]],promote:[{tograde:"gm2",condition:[["onlock","or","overall","score",">=",null,1],["onlock","and","overall","time","<=",null,strtime2secs("07:30:00")]]},{fail:true}]},
			gm2:{condition:[["onlock","or","global","level",">=",null,15]],promote:[{tograde:"gm3",condition:[["onlock","or","overall","score",">=",null,2]]},{fail:true}]},
			gm3:{condition:[[null,"or","global","staffrolldone","==",null,1]],promote:[{tograde:"grGm", condition:[[null,"or","overall","time","<=",null,strtime2secs("01:20:00")]]},{fail:true}]},
			grGm:{label:"Gm"}
		}
	]
};

			
block.roads.tgm=[
	block.defaults.readygo({forcedlinesevery:100,levelcap:999}),
	{setup:{gravity:tgmg2g(4)},nextstage:[{condition:[["onlock","or","global","level",">=",null,30]]}]},
	{setup:{gravity:tgmg2g(6)},nextstage:[{condition:[["onlock","or","global","level",">=",null,35]]}]},
	{setup:{gravity:tgmg2g(8)},nextstage:[{condition:[["onlock","or","global","level",">=",null,40]]}]},
	{setup:{gravity:tgmg2g(10)},nextstage:[{condition:[["onlock","or","global","level",">=",null,50]]}]},
	{setup:{gravity:tgmg2g(12)},nextstage:[{condition:[["onlock","or","global","level",">=",null,60]]}]},
	{setup:{gravity:tgmg2g(16)},nextstage:[{condition:[["onlock","or","global","level",">=",null,70]]}]},
	{setup:{gravity:tgmg2g(32)},nextstage:[{condition:[["onlock","or","global","level",">=",null,80]]}]},
	{setup:{gravity:tgmg2g(48)},nextstage:[{condition:[["onlock","or","global","level",">=",null,90]]}]},
	{setup:{gravity:tgmg2g(64)},nextstage:[{condition:[["onlock","or","global","level",">=",null,100]]}]}, // In level based stages, 100th "level" is reachable only with line clears.
	{setup:{nextstagenumber:true,nextbackground:true,gravity:tgmg2g(80)},nextstage:[{condition:[["onlock","or","global","level",">=",null,120]]}]},
	{setup:{gravity:tgmg2g(96)},nextstage:[{condition:[["onlock","or","global","level",">=",null,140]]}]},
	{setup:{gravity:tgmg2g(112)},nextstage:[{condition:[["onlock","or","global","level",">=",null,160]]}]},
	{setup:{gravity:tgmg2g(128)},nextstage:[{condition:[["onlock","or","global","level",">=",null,170]]}]},
	{setup:{gravity:tgmg2g(144)},nextstage:[{condition:[["onlock","or","global","level",">=",null,200]]}]},
	{setup:{nextstagenumber:true,nextbackground:true,gravity:tgmg2g(4)},nextstage:[{condition:[["onlock","or","global","level",">=",null,220]]}]},
	{setup:{gravity:tgmg2g(32)},nextstage:[{condition:[["onlock","or","global","level",">=",null,230]]}]},
	{setup:{gravity:tgmg2g(64)},nextstage:[{condition:[["onlock","or","global","level",">=",null,233]]}]},
	{setup:{gravity:tgmg2g(128)},nextstage:[{condition:[["onlock","or","global","level",">=",null,236]]}]},
	{setup:{gravity:tgmg2g(160)},nextstage:[{condition:[["onlock","or","global","level",">=",null,239]]}]},
	{setup:{gravity:tgmg2g(192)},nextstage:[{condition:[["onlock","or","global","level",">=",null,243]]}]},
	{setup:{gravity:tgmg2g(224)},nextstage:[{condition:[["onlock","or","global","level",">=",null,247]]}]},
	{setup:{gravity:1},nextstage:[{condition:[["onlock","or","global","level",">=",null,251]]}]},
	{setup:{gravity:2},nextstage:[{condition:[["onlock","or","global","level",">=",null,300]]}]},
	{setup:{nextstagenumber:true,nextbackground:true,gravity:3},nextstage:[{condition:[["onlock","or","global","level",">=",null,360]]}]},
	{setup:{gravity:4},nextstage:[{condition:[["onlock","or","global","level",">=",null,400]]}]},
	{setup:{nextstagenumber:true,nextbackground:true,gravity:5},nextstage:[{condition:[["onlock","or","global","level",">=",null,420]]}]},
	{setup:{gravity:4},nextstage:[{condition:[["onlock","or","global","level",">=",null,450]]}]},
	{setup:{gravity:3},nextstage:[{condition:[["onlock","or","global","level",">=",null,500]]}]},

	{setup:{nextstagenumber:true,nextbackground:true},nextstage:[{condition:[["onlock","or","global","level",">=",null,600]]}]},
	{setup:{nextstagenumber:true,nextbackground:true},nextstage:[{condition:[["onlock","or","global","level",">=",null,700]]}]},
	{setup:{nextstagenumber:true,nextbackground:true},nextstage:[{condition:[["onlock","or","global","level",">=",null,800]]}]},
	{setup:{nextstagenumber:true,nextbackground:true},nextstage:[{condition:[["onlock","or","global","level",">=",null,900]]}]},
	
	{setup:{nextstagenumber:true,nextbackground:true,gravity:20},nextstage:[{condition:[["onlock","or","global","level",">=",null,999]]}]},
	{label:"roll",setup:{nextstagenumber:true,nextbackground:true,startstaffroll:"classic"},nextstage:[{condition:[[null,"or","global","staffrolldone","==",null,1]]}]}, // Wait the ending of the staffroll
	block.defaults.gameclear()
];

block.roads.debugtgm=[ // TGM - short version for debugging
	block.defaults.readygo({forcedlinesevery:10,levelcap:46}),,
	{setup:{gravity:tgmg2g(4)},nextstage:[{condition:[["onlock","or","global","level",">=",null,10]]}]},
	{setup:{nextstagenumber:true,nextbackground:true,gravity:tgmg2g(6)},nextstage:[{condition:[["onlock","or","global","level",">=",null,20]]}]},
	{setup:{nextstagenumber:true,nextbackground:true,gravity:tgmg2g(8)},nextstage:[{condition:[["onlock","or","global","level",">=",null,30]]}]},
	{setup:{nextstagenumber:true,nextbackground:true,gravity:tgmg2g(10)},nextstage:[{condition:[["onlock","or","global","level",">=",null,46]]}]},
	{label:"roll",setup:{startstaffroll:"classic"},nextstage:[{condition:[[null,"or","global","staffrolldone","==",null,1]]}]}, // Wait the ending of the staffroll
	block.defaults.gameclear()
];

block.lines["tgm"]=function(th,linedata) {
  if (linedata.cnt) {
	var combo=1;
	for (var i=0;i<th.combo.length;i++) // Calculates combo
		combo+=(th.combo[i]*2)-2;
	if (th.debugging) block.debug(th,"(CEIL("+((th.level+linedata.cnt)/4)+"+"+th.falling.softdrop+")*"+linedata.cnt+"*"+combo+"*"+(linedata.bravo?4:1));
	block.addscore(th,(Math.ceil((th.level+linedata.cnt)/4)+th.falling.softdrop)*linedata.cnt*combo*(linedata.bravo?4:1));
  }
};

block.gamemodes.tgm={
	label:"TETRIS THE GRANDMASTER",
	year:"1998",
	modes:[]
}

block.gamemodes.tgm.modes.push({label:"NORMAL",id:"sim-tgm"});
block.library["sim-tgm"]=function(th){ 
	// CONFIRMED
	th.config.field.height=21;
	th.config.field.width=12;
	th.config.field.hold=false;
	th.config.score.gamemode="tgm";
	th.config.timing.are=block.convertframes(th,30);
	th.config.control.keyhold=true;
	th.config.control.das=block.convertframes(th,14); // frames of hold
	th.config.timing.lockdelay=block.convertframes(th,30);
	th.config.field.ghost=true;
	th.config.score.grading="tgm";
	th.config.score.style="tgm";
	th.config.next.randomizer="tgm1";
	block.loadlibrary(th,"rot-ars");
	th.config.control.irs=true; // Initial Rotation System
	th.config.control.ihs=false;  // Initial Hold System
	
	// TO BE CONFIRMED
	th.config.control.irs180=true; // Initial Rotation System 180 degrees (rotleft+rotright)
	th.config.control.ims=true; // Initial Movement System	
 	th.config.timing.stickstoppable=true;
	th.config.timing.linecleardelay=block.convertframes(th,41-30); // Is the wiki lineclear minus das?
	th.config.control.initialdas=th.config.control.das;
	
	// GRAPHICS
	block.loadlibrary(th,"gfx-none");
	th.config.gfx.tileset="brick-tgm";
	th.config.gfx.drawborder="rgb(255,255,255)";
	th.config.gfx.lockanimation={type:"flash",duration:2,onharddrop:true};
	th.config.gfx.blits[th.config.gfx.blitsfieldindex]={type:"blit",dx:-8,dy:-8,tileset:"fields",tile:5};
	th.config.gfx.breaksparks={type:"color",accx:0,accy:0,tileset:"spark"};
	
  }