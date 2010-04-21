// TGM2  http://www.tetrisconcept.net/wiki/Tetris_The_Absolute_The_Grand_Master_2_PLUS

 // History based with starting history and roll count
block.nextmodels.tgm2={bag:"0123456",bagscount:0,history:4,starting:"4545",tries:6,first:"0321"};

block.garbagerolls.tgm2plus=[ // The TGM2+ mode garbage roll
	[null,7,7,7,7,7,7,7,7,7],
	[null,7,7,7,7,7,7,7,7,7],
	[null,7,7,7,7,7,7,7,7,7],
	[null,7,7,7,7,7,7,7,7,7],
	[7,7,7,7,7,7,7,7,7,null],
	[7,7,7,7,7,7,7,7,7,null],
	[7,7,7,7,7,7,7,7,7,null],
	[7,7,7,7,7,7,7,7,7,null],
	[null,null,7,7,7,7,7,7,7,7],
	[null,7,7,7,7,7,7,7,7,7],
	[null,7,7,7,7,7,7,7,7,7],
	[7,7,7,7,7,7,7,7,null,null],
	[7,7,7,7,7,7,7,7,7,null],
	[7,7,7,7,7,7,7,7,7,null],
	[7,7,null,7,7,7,7,7,7,7],
	[7,null,null,7,7,7,7,7,7,7],
	[7,null,7,7,7,7,7,7,7,7],
	[7,7,7,7,7,7,7,null,7,7],
	[7,7,7,7,7,7,7,null,null,7],
	[7,7,7,7,7,7,7,7,null,7],
	[7,7,7,7,null,null,7,7,7,7],
	[7,7,7,7,null,null,7,7,7,7],
	[7,7,7,7,null,7,7,7,7,7],
	[7,7,7,null,null,null,7,7,7,7]
];
	
block.extraactions.tgm2plus=function(th,phase,done) { // The TGM2+ plus mode
	if (th.data._tgm2roller==null) {
		th.data._tgm2roller=0;
		th.data.lastidle=th.overall.idlepieces;
		th.data.mycounter=0;
	}
	if (phase=="onlock") {
		th.data.mycounter+=th.overall.idlepieces-th.data.lastidle; // Keep a personal counter for idle pieces
		th.data.lastidle=th.overall.idlepieces;
		if (th.debugging) block.debug(th,th.data.mycounter+">="+(13-Math.floor(th.level/100)));
		if (th.data.mycounter>=13-Math.floor(th.level/100)) {
			th.data.mycounter=0;
			block.pushline(th,block.garbagerolls.tgm2plus[th.data._tgm2roller]);
			th.data._tgm2roller=(th.data._tgm2roller+1)%block.garbagerolls.tgm2plus.length;
		}
	}
};

block.medals.tgm2master={
	starting:["none","none","none","none","none"], // ST
	medals:[
		{ // Base series of grades
			none:{label:"acnone",promote:[{tomedal:"acbronze",condition:[["onlock","or","overall","bravo",">=",null,1]]}]},
			acbronze:{label:"acbronze",promote:[{tomedal:"acsilver",condition:[["onlock","or","overall","bravo",">=",null,2]]}]},
			acsilver:{label:"acsilver",promote:[{tomedal:"acgold",condition:[["onlock","or","overall","bravo",">=",null,3]]}]},
			acgold:{label:"acgold"}
		},
		{
			none:{label:"ronone",condition:[[null,"or","global","currentsection",">=",null,3]],promote:[{tomedal:"robronze",condition:[[null,"or","avgsection",[null,"rotperpiece",0,1,2],"<=",null,6/5]]},{fail:true}]},
			robronze:{label:"robronze",condition:[[null,"or","global","currentsection",">=",null,7]],promote:[{tomedal:"rosilver",condition:[[null,"or","avgsection",[null,"rotperpiece",3,4,5,6],"<=",null,6/5]]},{fail:true}]},
			rosilver:{label:"rosilver",condition:[[null,"or","global","currentsection",">=",null,10]],promote:[{tomedal:"rogold",condition:[[null,"or","avgsection",[null,"rotperpiece",7,8,9],"<=",null,6/5]]},{fail:true}]},
			rogold:{label:"rogold"}
		},
		{
			none:{label:"sknone",promote:[{tomedal:"skbronze",condition:[["onlock","or","overall","tetris",">=",null,10]]}]},
			skbronze:{label:"skbronze",promote:[{tomedal:"sksilver",condition:[["onlock","or","overall","tetris",">=",null,20]]}]},
			sksilver:{label:"sksilver",promote:[{tomedal:"skgold",condition:[["onlock","or","overall","tetris",">=",null,35]]}]},
			skgold:{label:"skgold"}
		
		},
		{
			none:{label:"renone",promote:[{tomedal:"rebronze",condition:[["onlock","or","overall","recovery",">=",null,1]]}]},
			rebronze:{label:"rebronze",promote:[{tomedal:"resilver",condition:[["onlock","or","overall","recovery",">=",null,2]]}]},
			resilver:{label:"resilver",promote:[{tomedal:"regold",condition:[["onlock","or","overall","recovery",">=",null,4]]}]},
			regold:{label:"regold"}
		},
		{
			none:{label:"conone",promote:[{tomedal:"cobronze",condition:[["onlock","or","overall","combo",">=",null,4]]}]},
			cobronze:{label:"cobronze",promote:[{tomedal:"cosilver",condition:[["onlock","or","overall","combo",">=",null,5]]}]},
			cosilver:{label:"cosilver",promote:[{tomedal:"cogold",condition:[["onlock","or","overall","combo",">=",null,7]]}]},
			cogold:{label:"cogold"}			
		}
	]
};

block.medals.tgm2big={ // TGM2+ big mode medals system (like master but with different sk/co)
	starting:["none","none","none","none","none"], // ST
	medals:[
		{ // Base series of grades
			none:{label:"acnone",promote:[{tomedal:"acbronze",condition:[["onlock","or","overall","bravo",">=",null,1]]}]},
			acbronze:{label:"acbronze",promote:[{tomedal:"acsilver",condition:[["onlock","or","overall","bravo",">=",null,2]]}]},
			acsilver:{label:"acsilver",promote:[{tomedal:"acgold",condition:[["onlock","or","overall","bravo",">=",null,3]]}]},
			acgold:{label:"acgold"}
		},
		{
			none:{label:"ronone",condition:[[null,"or","global","currentsection",">=",null,3]],promote:[{tomedal:"robronze",condition:[[null,"or","avgsection",[null,"rotperpiece",0,1,2],"<=",null,6/5]]},{fail:true}]},
			robronze:{label:"robronze",condition:[[null,"or","global","currentsection",">=",null,7]],promote:[{tomedal:"rosilver",condition:[[null,"or","avgsection",[null,"rotperpiece",3,4,5,6],"<=",null,6/5]]},{fail:true}]},
			rosilver:{label:"rosilver",condition:[[null,"or","global","currentsection",">=",null,10]],promote:[{tomedal:"rogold",condition:[[null,"or","avgsection",[null,"rotperpiece",7,8,9],"<=",null,6/5]]},{fail:true}]},
			rogold:{label:"rogold"}
		},
		{
			none:{label:"sknone",promote:[{tomedal:"skbronze",condition:[["onlock","or","overall","tetris",">=",null,1]]}]},
			skbronze:{label:"skbronze",promote:[{tomedal:"sksilver",condition:[["onlock","or","overall","tetris",">=",null,2]]}]},
			sksilver:{label:"sksilver",promote:[{tomedal:"skgold",condition:[["onlock","or","overall","tetris",">=",null,4]]}]},
			skgold:{label:"skgold"}
		
		},
		{
			none:{label:"renone",promote:[{tomedal:"rebronze",condition:[["onlock","or","overall","recovery",">=",null,1]]}]},
			rebronze:{label:"rebronze",promote:[{tomedal:"resilver",condition:[["onlock","or","overall","recovery",">=",null,2]]}]},
			resilver:{label:"resilver",promote:[{tomedal:"regold",condition:[["onlock","or","overall","recovery",">=",null,4]]}]},
			regold:{label:"regold"}
		},
		{
			none:{label:"conone",promote:[{tomedal:"cobronze",condition:[["onlock","or","overall","combo",">=",null,2]]}]},
			cobronze:{label:"cobronze",promote:[{tomedal:"cosilver",condition:[["onlock","or","overall","combo",">=",null,3]]}]},
			cosilver:{label:"cosilver",promote:[{tomedal:"cogold",condition:[["onlock","or","overall","combo",">=",null,4]]}]},
			cogold:{label:"cogold"}			
		}
	]
};



block.medals.tgm2death={ // TGM2+ death medals system (changes the SK medal only)
	starting:["none","none","none","none","none"], // ST
	medals:[
		{ // Base series of grades
			none:{label:"acnone",promote:[{tomedal:"acbronze",condition:[["onlock","or","overall","bravo",">=",null,1]]}]},
			acbronze:{label:"acbronze",promote:[{tomedal:"acsilver",condition:[["onlock","or","overall","bravo",">=",null,2]]}]},
			acsilver:{label:"acsilver",promote:[{tomedal:"acgold",condition:[["onlock","or","overall","bravo",">=",null,3]]}]},
			acgold:{label:"acgold"}
		},
		{
			none:{label:"ronone",condition:[[null,"or","global","currentsection",">=",null,3]],promote:[{tomedal:"robronze",condition:[[null,"or","avgsection",[null,"rotperpiece",0,1,2],"<=",null,6/5]]},{fail:true}]},
			robronze:{label:"robronze",condition:[[null,"or","global","currentsection",">=",null,7]],promote:[{tomedal:"rosilver",condition:[[null,"or","avgsection",[null,"rotperpiece",3,4,5,6],"<=",null,6/5]]},{fail:true}]},
			rosilver:{label:"rosilver",condition:[[null,"or","global","currentsection",">=",null,10]],promote:[{tomedal:"rogold",condition:[[null,"or","avgsection",[null,"rotperpiece",7,8,9],"<=",null,6/5]]},{fail:true}]},
			rogold:{label:"rogold"}
		},
		{
			none:{label:"sknone",promote:[{tomedal:"skbronze",condition:[["onlock","or","overall","tetris",">=",null,5]]}]},
			skbronze:{label:"skbronze",promote:[{tomedal:"sksilver",condition:[["onlock","or","overall","tetris",">=",null,10]]}]},
			sksilver:{label:"sksilver",promote:[{tomedal:"skgold",condition:[["onlock","or","overall","tetris",">=",null,17]]}]},
			skgold:{label:"skgold"}
		
		},
		{
			none:{label:"renone",promote:[{tomedal:"rebronze",condition:[["onlock","or","overall","recovery",">=",null,1]]}]},
			rebronze:{label:"rebronze",promote:[{tomedal:"resilver",condition:[["onlock","or","overall","recovery",">=",null,2]]}]},
			resilver:{label:"resilver",promote:[{tomedal:"regold",condition:[["onlock","or","overall","recovery",">=",null,4]]}]},
			regold:{label:"regold"}
		},
		{
			none:{label:"conone",promote:[{tomedal:"cobronze",condition:[["onlock","or","overall","combo",">=",null,4]]}]},
			cobronze:{label:"cobronze",promote:[{tomedal:"cosilver",condition:[["onlock","or","overall","combo",">=",null,5]]}]},
			cosilver:{label:"cosilver",promote:[{tomedal:"cogold",condition:[["onlock","or","overall","combo",">=",null,7]]}]},
			cogold:{label:"cogold"}			
		}
	]
};
	
block.medals.debugtgm2={
	starting:["none","none","none","none","none"], // ST
		medals:[
		{ // Base series of grades
			none:{label:"acnone",promote:[{tomedal:"acbronze",condition:[["onlock","or","overall","bravo",">=",null,1]]}]},
			acbronze:{label:"acbronze",promote:[{tomedal:"acsilver",condition:[["onlock","or","overall","bravo",">=",null,1]]}]},
			acsilver:{label:"acsilver",promote:[{tomedal:"acgold",condition:[["onlock","or","overall","bravo",">=",null,1]]}]},
			acgold:{label:"acgold"}
		},
		{
			none:{label:"ronone",condition:[[null,"or","global","currentsection",">=",null,3]],promote:[{tomedal:"robronze",condition:[[null,"or","avgsection",[null,"rotperpiece",0,1,2],"<=",null,100]]},{fail:true}]},
			robronze:{label:"robronze",condition:[[null,"or","global","currentsection",">=",null,7]],promote:[{tomedal:"rosilver",condition:[[null,"or","avgsection",[null,"rotperpiece",3,4,5,6],"<=",null,100]]},{fail:true}]},
			rosilver:{label:"rosilver",condition:[[null,"or","global","currentsection",">=",null,10]],promote:[{tomedal:"rogold",condition:[[null,"or","avgsection",[null,"rotperpiece",7,8,9],"<=",null,100]]},{fail:true}]},
			rogold:{label:"rogold"}
		},
		{
			none:{label:"sknone",promote:[{tomedal:"skbronze",condition:[["onlock","or","overall","tetris",">=",null,1]]}]},
			skbronze:{label:"skbronze",promote:[{tomedal:"sksilver",condition:[["onlock","or","overall","tetris",">=",null,1]]}]},
			sksilver:{label:"sksilver",promote:[{tomedal:"skgold",condition:[["onlock","or","overall","tetris",">=",null,1]]}]},
			skgold:{label:"skgold"}
		
		},
		{
			none:{label:"renone",promote:[{tomedal:"rebronze",condition:[["onlock","or","overall","recovery",">=",null,1]]}]},
			rebronze:{label:"rebronze",promote:[{tomedal:"resilver",condition:[["onlock","or","overall","recovery",">=",null,1]]}]},
			resilver:{label:"resilver",promote:[{tomedal:"regold",condition:[["onlock","or","overall","recovery",">=",null,1]]}]},
			regold:{label:"regold"}
		},
		{
			none:{label:"conone",promote:[{tomedal:"cobronze",condition:[["onlock","or","overall","combo",">=",null,1]]}]},
			cobronze:{label:"cobronze",promote:[{tomedal:"cosilver",condition:[["onlock","or","overall","combo",">=",null,2]]}]},
			cosilver:{label:"cosilver",promote:[{tomedal:"cogold",condition:[["onlock","or","overall","combo",">=",null,3]]}]},
			cogold:{label:"cogold"}			
		}
	]
};
	
block.grades.tgm2={ // TGM2+ grading system
	starting:["gr9","gm0"],
	grades:[
		{ // Base series of grades
			gr9:{label:"9",promote:[{tograde:"gr8",condition:[["onlock","or","data","internalgrade",">=",null,1]]}]},
			gr8:{label:"8",promote:[{tograde:"gr7",condition:[["onlock","or","data","internalgrade",">=",null,2]]}]},
			gr7:{label:"7",promote:[{tograde:"gr6",condition:[["onlock","or","data","internalgrade",">=",null,3]]}]},
			gr6:{label:"6",promote:[{tograde:"gr5",condition:[["onlock","or","data","internalgrade",">=",null,4]]}]},
			gr5:{label:"5",promote:[{tograde:"gr4",condition:[["onlock","or","data","internalgrade",">=",null,5]]}]},
			gr4:{label:"4",promote:[{tograde:"gr4p",condition:[["onlock","or","data","internalgrade",">=",null,6]]}]},
			gr4p:{label:"4",promote:[{tograde:"gr3",condition:[["onlock","or","data","internalgrade",">=",null,7]]}]},
			gr3:{label:"3",promote:[{tograde:"gr3p",condition:[["onlock","or","data","internalgrade",">=",null,8]]}]},
			gr3p:{label:"3",promote:[{tograde:"gr2",condition:[["onlock","or","data","internalgrade",">=",null,9]]}]},
			gr2:{label:"2",promote:[{tograde:"gr2p",condition:[["onlock","or","data","internalgrade",">=",null,10]]}]},
			gr2p:{label:"2",promote:[{tograde:"gr2pp",condition:[["onlock","or","data","internalgrade",">=",null,11]]}]},
			gr2pp:{label:"2",promote:[{tograde:"gr1",condition:[["onlock","or","data","internalgrade",">=",null,12]]}]},
			gr1:{label:"1",promote:[{tograde:"gr1p",condition:[["onlock","or","data","internalgrade",">=",null,13]]}]},
			gr1p:{label:"1",promote:[{tograde:"gr1pp",condition:[["onlock","or","data","internalgrade",">=",null,14]]}]},
			gr1pp:{label:"1",promote:[{tograde:"grS1",condition:[["onlock","or","data","internalgrade",">=",null,15]]}]},
			grS1:{label:"S1",promote:[{tograde:"grS1p",condition:[["onlock","or","data","internalgrade",">=",null,16]]}]},
			grS1p:{label:"S1",promote:[{tograde:"grS1pp",condition:[["onlock","or","data","internalgrade",">=",null,17]]}]},
			grS1pp:{label:"S1",promote:[{tograde:"grS2",condition:[["onlock","or","data","internalgrade",">=",null,18]]}]},
			grS2:{label:"S2",promote:[{tograde:"grS3",condition:[["onlock","or","data","internalgrade",">=",null,19]]}]},
			grS3:{label:"S3",promote:[{tograde:"grS4",condition:[["onlock","or","data","internalgrade",">=",null,20]]}]},
			grS4:{label:"S4",promote:[{tograde:"grS4p",condition:[["onlock","or","data","internalgrade",">=",null,21]]}]},
			grS4p:{label:"S4",promote:[{tograde:"grS4pp",condition:[["onlock","or","data","internalgrade",">=",null,22]]}]},
			grS4pp:{label:"S4",promote:[{tograde:"grS5",condition:[["onlock","or","data","internalgrade",">=",null,23]]}]},
			grS5:{label:"S5",promote:[{tograde:"grS5p",condition:[["onlock","or","data","internalgrade",">=",null,24]]}]},
			grS5p:{label:"S5",promote:[{tograde:"grS6",condition:[["onlock","or","data","internalgrade",">=",null,25]]}]},
			grS6:{label:"S6",promote:[{tograde:"grS6p",condition:[["onlock","or","data","internalgrade",">=",null,26]]}]},
			grS6p:{label:"S6",promote:[{tograde:"grS7",condition:[["onlock","or","data","internalgrade",">=",null,27]]}]},
			grS7:{label:"S7",promote:[{tograde:"grS7p",condition:[["onlock","or","data","internalgrade",">=",null,28]]}]},
			grS7p:{label:"S7",promote:[{tograde:"grS8",condition:[["onlock","or","data","internalgrade",">=",null,29]]}]},
			grS8:{label:"S8",promote:[{tograde:"grS8p",condition:[["onlock","or","data","internalgrade",">=",null,30]]}]},
			grS8p:{label:"S8",promote:[{tograde:"grS9",condition:[["onlock","or","data","internalgrade",">=",null,31]]}]},
			grS9:{label:"S9"}
		},
		{
			// Grandmaster grades -  Grades without labels are not shown, is shown the first available.
			gm0:{condition:[["onlock","or","global","level",">=",null,100]],promote:[{tograde:"gm1",condition:[["onlock","or","section","time","<=",null,65],["onlock","and","section","tetris",">=",null,2]]},{fail:true}]},
			gm1:{condition:[["onlock","or","global","level",">=",null,200]],promote:[{tograde:"gm2",condition:[["onlock","or","section","time","<=",null,65],["onlock","and","section","tetris",">=",null,2]]},{fail:true}]},
			gm2:{condition:[["onlock","or","global","level",">=",null,300]],promote:[{tograde:"gm3",condition:[["onlock","or","section","time","<=",null,65],["onlock","and","section","tetris",">=",null,2]]},{fail:true}]},
			gm3:{condition:[["onlock","or","global","level",">=",null,400]],promote:[{tograde:"gm4",condition:[["onlock","or","section","time","<=",null,65],["onlock","and","section","tetris",">=",null,2]]},{fail:true}]},
			gm4:{condition:[["onlock","or","global","level",">=",null,500]],promote:[{tograde:"gm5",condition:[["onlock","or","section","time","<=",null,65],["onlock","and","section","tetris",">=",null,2]]},{fail:true}]},
			
			gm5:{condition:[["onlock","or","global","level",">=",null,600]],promote:[{tograde:"gm6",condition:[["onlock","or","diffavgsection",["floor","time",0,1,2,3,4],"<=",null,2],["onlock","and","section","tetris",">=",null,1]]},{fail:true}]},
			gm6:{condition:[["onlock","or","global","level",">=",null,700]],promote:[{tograde:"gm7",condition:[["onlock","or","diffsection",[null,"time",5],"<=",null,2],["onlock","and","section","tetris",">=",null,1]]},{fail:true}]},
			gm7:{condition:[["onlock","or","global","level",">=",null,800]],promote:[{tograde:"gm8",condition:[["onlock","or","diffsection",[null,"time",6],"<=",null,2],["onlock","and","section","tetris",">=",null,1]]},{fail:true}]},
			gm8:{condition:[["onlock","or","global","level",">=",null,900]],promote:[{tograde:"gm9",condition:[["onlock","or","diffsection",[null,"time",7],"<=",null,2],["onlock","and","section","tetris",">=",null,1]]},{fail:true}]},
			gm9:{condition:[["onlock","or","global","stagelabel","==",null,"roll"]],promote:[{tograde:"gmMroll",condition:[["onlock","or","diffsection",[null,"time",8],"<=",null,2],[null,"and","overall","time","<=",null,strtime2secs("08:45:00")],[null,"and","global","gradelabel","==",null,"S9"]]},{fail:true}]},
			
			gmMroll:{gotostagelabel:"mroll",promote:[{tograde:"grMM",condition:[[null,"or","global","match","==",null,"fail"]]},{tograde:"grMV",condition:[[null,"or","global","match","==",null,"success"],[null,"and","section","lines","<",null,32]]},{tograde:"grMO",condition:[[null,"or","global","match","==",null,"success"],[null,"and","section","lines",">=",null,32]]}]},
			grMM:{label:"MM"},
			grMV:{label:"MV"},
			grMO:{label:"MO"}
		}
	]
};


block.grades.debugtgm2={ // Easier tgm2 grading for debug.
	starting:["gr9","gm0"],
	grades:[
		{ // Base series of grades
			gr9:{label:"9",promote:[{tograde:"gr8",condition:[["onlock","or","data","internalgrade",">=",null,1]]}]},
			gr8:{label:"8",promote:[{tograde:"gr7",condition:[["onlock","or","data","internalgrade",">=",null,1]]}]},
			gr7:{label:"7",promote:[{tograde:"gr6",condition:[["onlock","or","data","internalgrade",">=",null,1]]}]},
			gr6:{label:"6",promote:[{tograde:"gr5",condition:[["onlock","or","data","internalgrade",">=",null,1]]}]},
			gr5:{label:"5",promote:[{tograde:"gr4",condition:[["onlock","or","data","internalgrade",">=",null,1]]}]},
			gr4:{label:"4",promote:[{tograde:"gr4p",condition:[["onlock","or","data","internalgrade",">=",null,1]]}]},
			gr4p:{label:"4",promote:[{tograde:"gr3",condition:[["onlock","or","data","internalgrade",">=",null,1]]}]},
			gr3:{label:"3",promote:[{tograde:"gr3p",condition:[["onlock","or","data","internalgrade",">=",null,1]]}]},
			gr3p:{label:"3",promote:[{tograde:"gr2",condition:[["onlock","or","data","internalgrade",">=",null,1]]}]},
			gr2:{label:"2",promote:[{tograde:"gr2p",condition:[["onlock","or","data","internalgrade",">=",null,1]]}]},
			gr2p:{label:"2",promote:[{tograde:"gr2pp",condition:[["onlock","or","data","internalgrade",">=",null,1]]}]},
			gr2pp:{label:"2",promote:[{tograde:"gr1",condition:[["onlock","or","data","internalgrade",">=",null,1]]}]},
			gr1:{label:"1",promote:[{tograde:"gr1p",condition:[["onlock","or","data","internalgrade",">=",null,1]]}]},
			gr1p:{label:"1",promote:[{tograde:"gr1pp",condition:[["onlock","or","data","internalgrade",">=",null,1]]}]},
			gr1pp:{label:"1",promote:[{tograde:"grS1",condition:[["onlock","or","data","internalgrade",">=",null,1]]}]},
			grS1:{label:"S1",promote:[{tograde:"grS1p",condition:[["onlock","or","data","internalgrade",">=",null,1]]}]},
			grS1p:{label:"S1",promote:[{tograde:"grS1pp",condition:[["onlock","or","data","internalgrade",">=",null,1]]}]},
			grS1pp:{label:"S1",promote:[{tograde:"grS2",condition:[["onlock","or","data","internalgrade",">=",null,1]]}]},
			grS2:{label:"S2",promote:[{tograde:"grS3",condition:[["onlock","or","data","internalgrade",">=",null,1]]}]},
			grS3:{label:"S3",promote:[{tograde:"grS4",condition:[["onlock","or","data","internalgrade",">=",null,1]]}]},
			grS4:{label:"S4",promote:[{tograde:"grS4p",condition:[["onlock","or","data","internalgrade",">=",null,1]]}]},
			grS4p:{label:"S4",promote:[{tograde:"grS4pp",condition:[["onlock","or","data","internalgrade",">=",null,1]]}]},
			grS4pp:{label:"S4",promote:[{tograde:"grS5",condition:[["onlock","or","data","internalgrade",">=",null,1]]}]},
			grS5:{label:"S5",promote:[{tograde:"grS5p",condition:[["onlock","or","data","internalgrade",">=",null,1]]}]},
			grS5p:{label:"S5",promote:[{tograde:"grS6",condition:[["onlock","or","data","internalgrade",">=",null,1]]}]},
			grS6:{label:"S6",promote:[{tograde:"grS6p",condition:[["onlock","or","data","internalgrade",">=",null,1]]}]},
			grS6p:{label:"S6",promote:[{tograde:"grS7",condition:[["onlock","or","data","internalgrade",">=",null,1]]}]},
			grS7:{label:"S7",promote:[{tograde:"grS7p",condition:[["onlock","or","data","internalgrade",">=",null,1]]}]},
			grS7p:{label:"S7",promote:[{tograde:"grS8",condition:[["onlock","or","data","internalgrade",">=",null,1]]}]},
			grS8:{label:"S8",promote:[{tograde:"grS8p",condition:[["onlock","or","data","internalgrade",">=",null,1]]}]},
			grS8p:{label:"S8",promote:[{tograde:"grS9",condition:[["onlock","or","data","internalgrade",">=",null,1]]}]},
			grS9:{label:"S9"}
		},
		{
			// Grandmaster grades -  Grades without labels are not shown, is shown the first available.
			gm0:{condition:[["onlock","or","global","level",">=",null,10]],promote:[{tograde:"gm1",condition:[["onlock","or","section","time","<=",null,65],["onlock","and","section","tetris",">=",null,1]]},{fail:true}]},
			gm1:{condition:[["onlock","or","global","level",">=",null,20]],promote:[{tograde:"gm2",condition:[["onlock","or","section","time","<=",null,65],["onlock","and","section","tetris",">=",null,0]]},{fail:true}]},
			gm2:{condition:[["onlock","or","global","level",">=",null,30]],promote:[{tograde:"gm3",condition:[["onlock","or","section","time","<=",null,65],["onlock","and","section","tetris",">=",null,0]]},{fail:true}]},
			gm3:{condition:[["onlock","or","global","level",">=",null,40]],promote:[{tograde:"gm4",condition:[["onlock","or","section","time","<=",null,65],["onlock","and","section","tetris",">=",null,0]]},{fail:true}]},
			gm4:{condition:[["onlock","or","global","level",">=",null,41]],promote:[{tograde:"gm5",condition:[["onlock","or","section","time","<=",null,65],["onlock","and","section","tetris",">=",null,0]]},{fail:true}]},
			
			gm5:{condition:[["onlock","or","global","level",">=",null,42]],promote:[{tograde:"gm6",condition:[["onlock","or","diffavgsection",["floor","time",0,1,2,3,4],"<=",null,20],["onlock","and","section","tetris",">=",null,0]]},{fail:true}]},
			gm6:{condition:[["onlock","or","global","level",">=",null,43]],promote:[{tograde:"gm7",condition:[["onlock","or","diffsection",[null,"time",5],"<=",null,4],["onlock","and","section","tetris",">=",null,0]]},{fail:true}]},
			gm7:{condition:[["onlock","or","global","level",">=",null,44]],promote:[{tograde:"gm8",condition:[["onlock","or","diffsection",[null,"time",6],"<=",null,4],["onlock","and","section","tetris",">=",null,0]]},{fail:true}]},
			gm8:{condition:[["onlock","or","global","level",">=",null,45]],promote:[{tograde:"gm9",condition:[["onlock","or","diffsection",[null,"time",7],"<=",null,4],["onlock","and","section","tetris",">=",null,0]]},{fail:true}]},
			gm9:{condition:[["onlock","or","global","stagelabel","==",null,"roll"]],promote:[{tograde:"gmMroll",condition:[["onlock","or","diffsection",[null,"time",8],"<=",null,10],[null,"and","overall","time","<=",null,strtime2secs("08:45:00")],[null,"and","global","gradelabel","==",null,"S9"]]},{fail:true}]},
			
			gmMroll:{gotostagelabel:"mroll",promote:[{tograde:"grMM",condition:[[null,"or","global","match","==",null,"fail"]]},{tograde:"grMV",condition:[[null,"or","global","match","==",null,"success"],[null,"and","section","lines","<",null,5]]},{tograde:"grMO",condition:[[null,"or","global","match","==",null,"success"],[null,"and","section","lines",">=",null,5]]}]},
			grMM:{label:"MM"},
			grMV:{label:"MV"},
			grMO:{label:"MO"}
			
		}
	]
};


block.grades.tgm2death={
	starting:["none"],
	grades:[
		{ // Base series of grades
			none:{condition:[["onlock","or","global","level",">=",null,300]],promote:[{tograde:"grMM",condition:[["onlock","or","overall","time","<=",null,strtime2secs("03:25:00")]]},{fail:true}]},
			grMM:{label:"MM",promote:[{tograde:"grGm",condition:[["onlock","or","global","level",">=",null,999]]}]},
			grGm:{label:"Gm"}
		}
	]
};

block.grades.debugtgm2death={ 
	starting:["none"],
	grades:[
		{ // Base series of grades
			none:{condition:[["onlock","or","global","level",">=",null,10]],promote:[{tograde:"grMM",condition:[["onlock","or","overall","time","<=",null,strtime2secs("00:30:00")]]},{fail:true}]},
			grMM:{label:"MM",promote:[{tograde:"grGm",condition:[["onlock","or","global","level",">=",null,46]]}]},
			grGm:{label:"Gm"}
		}
	]
};

block.internalgrades.tgm2={
	internalgradevariable:"internalgrade",
	internalgradepointsvariable:"internalgradespoints",
	internalgradedecayvariable:"internalgradedecay",
	approx:"ceil", // combo*scoew is ceil-ed before being multiplied by the level multiplier
	nextgradeevery:100, // Nextr grade is reached every 100 Internal grade points.
	decay:[ // Decay rate of internal grade points (after these frames, if combo array is empty, internal grade points are decreased)
		125, 80, 80, 50, 45, 45, 45, 40, 40, 40,
		40, 40, 30, 30, 30, 20, 20, 20, 20, 20,
		15, 15, 15, 15, 15, 15, 15, 15, 15, 15,
		10, 10
	],
	score:[ // Score of single, double, triple and Tetris
		[ 10, 20, 40, 50 ],
		[ 10, 20, 30, 40 ],
		[ 10, 20, 30, 40 ],
		[ 10, 15, 30, 40 ],
		[ 10, 15, 20, 40 ],
		[  5, 15, 20, 30 ],
		[  5, 10, 20, 30 ],
		[  5, 10, 15, 30 ],
		[  5, 10, 15, 30 ],
		[  5, 10, 15, 30 ],
		[  2, 12, 13, 30 ] // and so on...	
	],
	combo:[ // Combo multipliers
		[1.0, 1.0,  1.0,  1],
		[1.2, 1.4,  1.5,  1],					
		[1.2, 1.5,  1.8,  1],
		[1.4, 1.6,  2.0,  1],
		[1.4, 1.7,  2.2,  1],
		[1.4, 1.8,  2.3,  1],
		[1.4, 1.9,  2.4,  1],
		[1.5, 2.0,  2.5,  1],
		[1.5, 2.1,  2.6,  1],
		[2.0, 2.5,  3.0,  1] // And so on...
	],
	level:[ // Level multipliers
		{level:249,mul:1},
		{level:499,mul:2},
		{level:749,mul:3},
		{level:999,mul:4} // And so on...
	]
};

block.internalgrades.debugtgm2={
	internalgradevariable:"internalgrade",
	internalgradepointsvariable:"internalgradespoints",
	internalgradedecayvariable:"internalgradedecay",
	approx:"ceil", // combo*scoew is ceil-ed before being multiplied by the level multiplier
	nextgradeevery:20, // Nextr grade is reached every 20 Internal grade points.
	decay:[ // Decay rate of internal grade points (after these frames, if combo array is empty, internal grade points are decreased)
		125, 80, 80, 50, 45, 45, 45, 40, 40, 40,
		40, 40, 30, 30, 30, 20, 20, 20, 20, 20,
		15, 15, 15, 15, 15, 15, 15, 15, 15, 15,
		10, 10
	],
	score:[ // Score of single, double, triple and Tetris
		[ 10, 20, 40, 50 ],
		[ 10, 20, 30, 40 ],
		[ 10, 20, 30, 40 ],
		[ 10, 15, 30, 40 ],
		[ 10, 15, 20, 40 ],
		[  5, 15, 20, 30 ],
		[  5, 10, 20, 30 ],
		[  5, 10, 15, 30 ],
		[  5, 10, 15, 30 ],
		[  5, 10, 15, 30 ],
		[  2, 12, 13, 30 ] // and so on...	
	],
	combo:[ // Combo multipliers
		[1.0, 1.0,  1.0,  1],
		[1.2, 1.4,  1.5,  1],					
		[1.2, 1.5,  1.8,  1],
		[1.4, 1.6,  2.0,  1],
		[1.4, 1.7,  2.2,  1],
		[1.4, 1.8,  2.3,  1],
		[1.4, 1.9,  2.4,  1],
		[1.5, 2.0,  2.5,  1],
		[1.5, 2.1,  2.6,  1],
		[2.0, 2.5,  3.0,  1] // And so on...
	],
	level:[ // Level multipliers
		{level:249,mul:1},
		{level:499,mul:2},
		{level:749,mul:3},
		{level:999,mul:4} // And so on...
	]
};


block.roads.tgm2normal=[ // Normal mode of TGM2+ - http://www.tetrisconcept.net/wiki/Tetris_The_Absolute_The_Grand_Master_2_PLUS
	block.defaults.readygo({forcedlinesevery:100,levelcap:999}),
	{setup:{gravity:tgmg2g(4)},nextstage:[{condition:[["onlock","or","global","level",">=",null,8]]}]},
	{setup:{gravity:tgmg2g(5)},nextstage:[{condition:[["onlock","or","global","level",">=",null,19]]}]},
	{setup:{gravity:tgmg2g(6)},nextstage:[{condition:[["onlock","or","global","level",">=",null,35]]}]},
	{setup:{gravity:tgmg2g(8)},nextstage:[{condition:[["onlock","or","global","level",">=",null,40]]}]},
	{setup:{gravity:tgmg2g(10)},nextstage:[{condition:[["onlock","or","global","level",">=",null,50]]}]},
	{setup:{gravity:tgmg2g(12)},nextstage:[{condition:[["onlock","or","global","level",">=",null,60]]}]},
	{setup:{gravity:tgmg2g(16)},nextstage:[{condition:[["onlock","or","global","level",">=",null,70]]}]},
	{setup:{gravity:tgmg2g(32)},nextstage:[{condition:[["onlock","or","global","level",">=",null,80]]}]},
	{setup:{gravity:tgmg2g(48)},nextstage:[{condition:[["onlock","or","global","level",">=",null,90]]}]},
	{setup:{gravity:tgmg2g(64)},nextstage:[{condition:[["onlock","or","global","level",">=",null,100]]}]}, // In level based stages, 100th "level" is reachable only with line clears.
	{setup:{nextstagenumber:true,nextbackground:true,gravity:tgmg2g(4)},nextstage:[{condition:[["onlock","or","global","level",">=",null,108]]}]},
	{setup:{gravity:tgmg2g(5)},nextstage:[{condition:[["onlock","or","global","level",">=",null,119]]}]},
	{setup:{gravity:tgmg2g(6)},nextstage:[{condition:[["onlock","or","global","level",">=",null,125]]}]},
	{setup:{gravity:tgmg2g(8)},nextstage:[{condition:[["onlock","or","global","level",">=",null,131]]}]},
	{setup:{gravity:tgmg2g(12)},nextstage:[{condition:[["onlock","or","global","level",">=",null,139]]}]},
	{setup:{gravity:tgmg2g(32)},nextstage:[{condition:[["onlock","or","global","level",">=",null,149]]}]},			
	{setup:{gravity:tgmg2g(48)},nextstage:[{condition:[["onlock","or","global","level",">=",null,156]]}]},
	{setup:{gravity:tgmg2g(80)},nextstage:[{condition:[["onlock","or","global","level",">=",null,164]]}]},
	{setup:{gravity:tgmg2g(112)},nextstage:[{condition:[["onlock","or","global","level",">=",null,174]]}]},
	{setup:{gravity:tgmg2g(128)},nextstage:[{condition:[["onlock","or","global","level",">=",null,180]]}]},
	{setup:{gravity:tgmg2g(144)},nextstage:[{condition:[["onlock","or","global","level",">=",null,200]]}]},
	{setup:{nextstagenumber:true,nextbackground:true,gravity:tgmg2g(16)},nextstage:[{condition:[["onlock","or","global","level",">=",null,212]]}]},
	{setup:{gravity:tgmg2g(48)},nextstage:[{condition:[["onlock","or","global","level",">=",null,221]]}]},
	{setup:{gravity:tgmg2g(80)},nextstage:[{condition:[["onlock","or","global","level",">=",null,232]]}]},
	{setup:{gravity:tgmg2g(112)},nextstage:[{condition:[["onlock","or","global","level",">=",null,244]]}]},
	{setup:{gravity:tgmg2g(144)},nextstage:[{condition:[["onlock","or","global","level",">=",null,256]]}]},
	{setup:{gravity:tgmg2g(176)},nextstage:[{condition:[["onlock","or","global","level",">=",null,267]]}]},
	{setup:{gravity:tgmg2g(192)},nextstage:[{condition:[["onlock","or","global","level",">=",null,277]]}]},
	{setup:{gravity:tgmg2g(208)},nextstage:[{condition:[["onlock","or","global","level",">=",null,287]]}]},
	{setup:{gravity:tgmg2g(224)},nextstage:[{condition:[["onlock","or","global","level",">=",null,295]]}]},
	{setup:{gravity:tgmg2g(240)},nextstage:[{condition:[["onlock","or","global","level",">=",null,300]]}]},
	{label:"roll",setup:{nextstagenumber:true,nextbackground:true,gravity:20,startstaffroll:"classic",clearongameover:true},condition:[[null,"or","global","staffrolldone","==",null,1]]},
	block.defaults.gameclear()
];

block.roads.tgm2master=[
	block.defaults.readygo({forcedlinesevery:100,levelcap:999}),
	{setup:{gravity:tgmg2g(4),are:25,das:14,initialdas:14,lockdelay:30,linecleardelay:25},nextstage:[{condition:[["onlock","or","global","level",">=",null,30]]}]},
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
	{setup:{nextstagenumber:true,nextbackground:true,gravity:20,are:25,das:8,lockdelay:30,linecleardelay:0},nextstage:[{condition:[["onlock","or","global","level",">=",null,600]]}]},	
	{setup:{nextstagenumber:true,nextbackground:true,are:25,das:8,initialdas:8,lockdelay:30,linecleardelay:0},nextstage:[{condition:[["onlock","or","global","level",">=",null,700]]}]},
	{setup:{nextstagenumber:true,nextbackground:true,are:16,das:8,initialdas:8,lockdelay:30,linecleardelay:0},nextstage:[{condition:[["onlock","or","global","level",">=",null,800]]}]},
	{setup:{nextstagenumber:true,nextbackground:true,are:12,das:8,initialdas:8,lockdelay:30,linecleardelay:0},nextstage:[{condition:[["onlock","or","global","level",">=",null,900]]}]},
	{setup:{nextstagenumber:true,nextbackground:true,are:12,das:6,initialdas:6,lockdelay:30,linecleardelay:0},nextstage:[{condition:[["onlock","or","global","level",">=",null,901]]}]},
	{setup:{are:12,das:6,initialdas:6,lockdelay:17,linecleardelay:0},nextstage:[{condition:[["onlock","or","global","level",">=",null,999]]}]},
	{label:"roll",setup:{stopleveling:true,nextstagenumber:true,nextbackground:true,startstaffroll:"classic"},nextstage:[{condition:[[null,"or","global","staffrolldone","==",null,1]]}]}, // Wait the ending of the staffroll
	block.defaults.gameclear(),
	{label:"mroll",setup:{stopleveling:true,initfield:true,vanishspeed:5,drawborder:"",startstaffroll:"mroll"},nextstage:[{condition:[[null,"or","global","staffrolldone","==",null,1]]}]}, // Wait the ending of the staffroll
	block.defaults.gameclear()
];

	
block.roads.debugtgm2master=[
	block.defaults.readygo({forcedlinesevery:10,levelcap:46}),
	{setup:{gravity:tgmg2g(4),are:25,das:14,initialdas:14,lockdelay:30,linecleardelay:25},nextstage:[{condition:[["onlock","or","global","level",">=",null,10]]}]},
	{setup:{nextstagenumber:true,nextbackground:true,gravity:tgmg2g(6)},nextstage:[{condition:[["onlock","or","global","level",">=",null,20]]}]},
	{setup:{nextstagenumber:true,nextbackground:true,gravity:tgmg2g(8)},nextstage:[{condition:[["onlock","or","global","level",">=",null,30]]}]},
	{setup:{nextstagenumber:true,nextbackground:true,gravity:tgmg2g(11),are:25,das:8,lockdelay:30,linecleardelay:0},nextstage:[{condition:[["onlock","or","global","level",">=",null,40]]}]},	
	{setup:{nextstagenumber:true,nextbackground:true,are:12,das:6,initialdas:6,lockdelay:17,linecleardelay:0},nextstage:[{condition:[["onlock","or","global","level",">=",null,46]]}]},
	{label:"roll",setup:{stopleveling:true,nextstagenumber:true,nextbackground:true,startstaffroll:"classic"},nextstage:[{condition:[[null,"or","global","staffrolldone","==",null,1]]}]}, // Wait the ending of the staffroll
	block.defaults.gameclear(),
	{label:"mroll",setup:{stopleveling:true,initfield:true,vanishspeed:10,drawborder:"",startstaffroll:"mroll"},nextstage:[{condition:[[null,"or","global","staffrolldone","==",null,1]]}]}, // Wait the ending of the staffroll
	block.defaults.gameclear()
];

block.roads.tgm2death=[
	block.defaults.readygo({forcedlinesevery:100,levelcap:999}),
	{setup:{gravity:20,are:16,das:10,initialdas:10,lockdelay:30,linecleardelay:0},nextstage:[{condition:[["onlock","or","global","level",">=",null,100]]}]},
	{setup:{nextstagenumber:true,nextbackground:true,are:12,das:10,initialdas:10,lockdelay:26},nextstage:[{condition:[["onlock","or","global","level",">=",null,200]]}]},
	{setup:{nextstagenumber:true,nextbackground:true,are:12,das:9,initialdas:9,lockdelay:26},nextstage:[{condition:[["onlock","or","global","level",">=",null,201]]}]},
	{setup:{are:12,das:9,initialdas:9,lockdelay:22},nextstage:[{condition:[["onlock","or","global","level",">=",null,300]]}]},
	{setup:{nextstagenumber:true,nextbackground:true,are:12,das:8,initialdas:8,lockdelay:22},nextstage:[{condition:[["onlock","or","global","level",">=",null,301]]}]},
	{setup:{are:6,das:8,initialdas:8,lockdelay:18},nextstage:[{condition:[["onlock","or","global","level",">=",null,400]]}]},
	{setup:{nextstagenumber:true,nextbackground:true,are:5,das:6,initialdas:6,lockdelay:18},nextstage:[{condition:[["onlock","or","global","level",">=",null,401]]}]},
	{setup:{are:5,das:6,initialdas:6,lockdelay:15},nextstage:[{condition:[["onlock","or","global","level",">=",null,500]]}]}, // The torikan will stop the game here, if needed
	
	{setup:{nextstagenumber:true,nextbackground:true},nextstage:[{condition:[["onlock","or","global","level",">=",null,600]]}]},
	{setup:{nextstagenumber:true,nextbackground:true},nextstage:[{condition:[["onlock","or","global","level",">=",null,700]]}]},
	{setup:{nextstagenumber:true,nextbackground:true},nextstage:[{condition:[["onlock","or","global","level",">=",null,800]]}]},
	{setup:{nextstagenumber:true,nextbackground:true},nextstage:[{condition:[["onlock","or","global","level",">=",null,900]]}]},
	
	{setup:{nextstagenumber:true,nextbackground:true,are:4,das:6,initialdas:6,lockdelay:15},nextstage:[{condition:[["onlock","or","global","level",">=",null,999]]}]},
	{label:"roll",setup:{nextstagenumber:true,nextbackground:true,startstaffroll:"classic"},nextstage:[{condition:[[null,"or","global","staffrolldone","==",null,1]]}]}, // Wait the ending of the staffroll
	block.defaults.gameclear()
];

block.roads.debugtgm2death=[
	block.defaults.readygo({forcedlinesevery:10,levelcap:46}),
	{setup:{gravity:0.001,are:16,das:10,initialdas:10,lockdelay:30,linecleardelay:0},nextstage:[{condition:[["onlock","or","global","level",">=",null,10]]}]},
	{setup:{nextstagenumber:true,nextbackground:true,are:12,das:10,initialdas:10,lockdelay:26},nextstage:[{condition:[["onlock","or","global","level",">=",null,20]]}]},
	{setup:{nextstagenumber:true,nextbackground:true,are:12,das:9,initialdas:9,lockdelay:26},nextstage:[{condition:[["onlock","or","global","level",">=",null,21]]}]},
	
	{setup:{are:12,das:9,initialdas:9,lockdelay:22},nextstage:[{condition:[["onlock","or","global","level",">=",null,30]]}]}, // Will be stopped by the torikan, if needed
	
	{setup:{nextstagenumber:true,nextbackground:true,are:12,das:8,initialdas:8,lockdelay:22},nextstage:[{condition:[["onlock","or","global","level",">=",null,31]]}]},

	{setup:{nextstagenumber:true,nextbackground:true,are:4,das:6,initialdas:6,lockdelay:15},nextstage:[{condition:[["onlock","or","global","level",">=",null,46]]}]},
	{label:"roll",setup:{nextstagenumber:true,nextbackground:true,startstaffroll:"classic"},nextstage:[{condition:[[null,"or","global","staffrolldone","==",null,1]]}]}, // Wait the ending of the staffroll
	block.defaults.gameclear()
];

block.lines["tgm2"]=function(th,linedata) {
   if (linedata.cnt) {
	var combo=1;
	for (var i=0;i<th.combo.length;i++) // Calculates combo
		combo+=(th.combo[i]*2)-2;
	if (th.debugging) block.debug(th,"Score: (CEIL("+((th.level+linedata.cnt)/4)+"+"+th.falling.softdrop+")*"+linedata.cnt+"*"+combo+"*"+(linedata.bravo?4:1)+"+CEIL("+block.getcappedlevel(th,th.level+linedata.cnt)+"/2)+("+(th.falling.activetime-th.config.timing.lockdelay)+"*7)");
	block.addscore(th,((Math.ceil((th.level+linedata.cnt)/4)+th.falling.softdrop)*linedata.cnt*combo*(linedata.bravo?4:1))+Math.ceil(block.getcappedlevel(th,th.level+linedata.cnt)/2)+((th.falling.activetime-th.config.timing.lockdelay)*7));
  }
};

block.sectionmarks.tgm2master=[
	{condition:[["onlock","or","global","level",">=",null,100]]},
	{condition:[["onlock","or","global","level",">=",null,200]]},
	{condition:[["onlock","or","global","level",">=",null,300]]},
	{condition:[["onlock","or","global","level",">=",null,400]]},
	{condition:[["onlock","or","global","level",">=",null,500]]},
	{condition:[["onlock","or","global","level",">=",null,600]]},
	{condition:[["onlock","or","global","level",">=",null,700]]},
	{condition:[["onlock","or","global","level",">=",null,800]]},
	{condition:[["onlock","or","global","level",">=",null,900]]},
	{condition:[["onlock","or","global","stagelabel","==",null,"roll"]]}  // The M-Roll section
];

block.sectionmarks.debugtgm2master=[ // Simplified tgm2 master mode sections
	{condition:[["onlock","or","global","level",">=",null,10]]},
	{condition:[["onlock","or","global","level",">=",null,20]]},
	{condition:[["onlock","or","global","level",">=",null,30]]},
	{condition:[["onlock","or","global","level",">=",null,40]]},
	{condition:[["onlock","or","global","level",">=",null,41]]},
	{condition:[["onlock","or","global","level",">=",null,42]]},
	{condition:[["onlock","or","global","level",">=",null,43]]},
	{condition:[["onlock","or","global","level",">=",null,44]]},
	{condition:[["onlock","or","global","level",">=",null,45]]},
	{condition:[["onlock","or","global","stagelabel","==",null,"roll"]]}  // The M-Roll section
];


block.torikans.tgm2death={ // TGM2+ death mode torikan - http://www.tetrisconcept.net/wiki/Tetris_The_Grand_Master_3_Terror-Instinct
	starting:["main","main"], // the first one is the time limit.  The second one is the 500-cap torikan. 
	torikans:[
		{ // The time limit torikan. If triggered, the cap is set to 500.
			main:{condition:[[null,"or","overall","time",">",null,strtime2secs("03:25:00")]],apply:[{setup:{fail:true,levelcap:500,setdata:["torikan",1]},condition:[[null,"or","global","level","<",null,500]]},{fail:true}]}
		},
		{ // The timed torikan is respected here. If triggered, the game is cleared @ 500 but without roll
			main:{condition:[["onlock","or","global","level",">=",null,500]],apply:[{condition:[[null,"or","data","torikan","==",null,1]],fail:true,setup:{gotostagelabel:"roll"}},{fail:true}]},
		}
	]
};

block.torikans.debugtgm2death={ // TGM2+ death mode torikan - http://www.tetrisconcept.net/wiki/Tetris_The_Grand_Master_3_Terror-Instinct
	starting:["main","main"], // the first one is the time limit.  The second one is the 30-cap torikan. 
	torikans:[
		{ // The time limit torikan. If triggered, the cap is set to 30.
			main:{condition:[[null,"or","overall","time",">",null,strtime2secs("01:00:00")]],apply:[{fail:true,setup:{levelcap:30,setdata:["torikan",1]},condition:[[null,"or","global","level","<",null,30]]},{fail:true}]}
		},
		{ // The timed torikan is respected here. If triggered, the game is cleared @ 30 but without roll
			main:{condition:[["onlock","or","global","level",">=",null,30]],apply:[{condition:[[null,"or","data","torikan","==",null,1]],fail:true,setup:{gotostagelabel:"roll"}},{fail:true}]},
		}
	]
};

/*

block.torikans.tgm2death={ // TGM2+ death mode torikan system - http://www.tetrisconcept.net/wiki/Tetris_The_Absolute_The_Grand_Master_2_PLUS
	starting:["main"], // A single main torikan
	torikans:[
		{ // Base torikan. Change the level cap and set the torikan to 1. Will be checked by torikan enabled stages. The levelcap is set here to best match the level_after_clear scoring in tgm2+
			main:{condition:[[null,"or","overall","time",">",null,strtime2secs("03:25:00")]],apply:[{setup:{levelcap:500,setdata:["torikan",1]},condition:[[null,"or","global","level","<",null,500]]},{fail:true}]}
		}
	]
};

block.torikans.debugtgm2death={ // TGM2+ death mode torikan system - http://www.tetrisconcept.net/wiki/Tetris_The_Absolute_The_Grand_Master_2_PLUS
	starting:["main"], // A single main torikan
	torikans:[
		{ // Base torikan. Change the level cap and set the torikan to 1. Will be checked by torikan enabled stages. The levelcap is set here to best match the level_after_clear scoring in tgm2+
			main:{condition:[[null,"or","overall","time",">",null,strtime2secs("01:00:00")]],apply:[{fail:true,setup:{levelcap:30,setdata:["torikan",1]},condition:[[null,"or","global","level","<",null,30]]},{fail:true}]}
		}
	]
};

*/


block.gamemodes.tgm2={
	label:"TETRIS THE GRANDMASTER 2 PLUS",
	year:"2000",
	modes:[]
}


block.gamemodes.tgm2.modes.push({label:"NORMAL",id:"sim-tgm2-normal"});	 
block.library["sim-tgm2-normal"]=function(th) {
		  
	// CONFIRMED
	th.config.field.height=21;
	th.config.field.width=12;
	th.config.field.hold=false;
	th.config.timing.are=block.convertframes(th,25);
	th.config.control.keyhold=true;
	th.config.control.das=block.convertframes(th,14); // frames of hold
	th.config.timing.lockdelay=block.convertframes(th,30);
	th.config.field.ghost=true;
	th.config.score.gamemode="tgm2normal";
	th.config.score.style="tgm2";
	th.config.next.randomizer="tgm2";
	block.loadlibrary(th,"rot-ars");
	th.config.control.irs=true; // Initial Rotation System
	th.config.control.ihs=false; // Initial Rotation System

	// TO BE CONFIRMED
	th.config.control.irs180=true; // Initial Rotation System 180 degrees (rotleft+rotright)
	th.config.control.ims=true; // Initial Movement System	
	th.config.timing.harddrop=false; // In all modes?
	th.config.timing.linecleardelay=block.convertframes(th,40-25); // Is the wiki lineclear - are?
	th.config.timing.stickstoppable=true;
	
	// GRAPHICS
	block.loadlibrary(th,"gfx-none");
	th.config.gfx.tileset="brick-tgm";
	th.config.gfx.drawborder="rgb(255,255,255)";
	th.config.gfx.lockanimation={type:"flash",duration:2,onharddrop:true};
	th.config.gfx.blits[th.config.gfx.blitsfieldindex]={type:"blit",dx:-8,dy:-8,tileset:"fields",tile:5};
	th.config.gfx.breaksparks={type:"color",accx:0,accy:0,tileset:"spark"};
}

block.gamemodes.tgm2.modes.push({label:"MASTER",id:"sim-tgm2-master"});	
block.library["sim-tgm2-master"]=function(th) {
	block.loadlibrary(th,"sim-tgm2-normal");
	th.config.score.grading="tgm2";
	th.config.score.internalgrade="tgm2";
	th.config.score.medals="tgm2master";
	th.config.score.blocksforcritical=150;
	th.config.score.blocksforrecovery=70;
	th.config.score.sectionmarks="tgm2master";
	th.config.score.gamemode="tgm2master";
}

block.gamemodes.tgm2.modes.push({label:"PLUS",id:"sim-tgm2-plus"});
block.library["sim-tgm2-plus"]=function(th) {
	// CONFIRMED
	block.loadlibrary(th,"sim-tgm2-normal");
	th.config.score.gamemode="tgm2master"; // Like the master mode but without medals
	th.config.field.extraactions="tgm2plus"; // With garbage growing
	
	// TO BE CONFIRMED
	// ARE, DAS, LOCK, LINECLEAR are the same of normal/master mode but ARE is different on wiki. Keeping the normal timings.
}

block.gamemodes.tgm2.modes.push({label:"DEATH",id:"sim-tgm2-death"});
block.library["sim-tgm2-death"]=function(th) {
	// CONFIRMED
	block.loadlibrary(th,"sim-tgm2-master");
	th.config.score.gamemode="tgm2death";
	th.config.score.grading="tgm2death";
	th.config.score.medals="tgm2death";
	th.config.score.internalgrade=null;
	th.config.score.torikan="tgm2death";
	
	// TO BE CONFIRMED
	// ARE, DAS, LOCK, LINECLEAR are the same of normal/master mode but ARE is different on wiki. Keeping the normal timings.	
}

block.gamemodes.tgm2.modes.push({label:"BIG",id:"sim-tgm2-big"});
block.library["sim-tgm2-big"]=function(th) {
	// CONFIRMED
	block.loadlibrary(th,"sim-tgm2-master");
	th.config.score.medals="tgm2big";
	
	th.config.field.big=2;
	
	// TO BE CONFIRMED
	// ARE, DAS, LOCK, LINECLEAR are the same of normal/master mode but ARE is different on wiki. Keeping the normal timings.
}
