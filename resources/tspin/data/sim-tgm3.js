// TGM3  http://www.tetrisconcept.net/wiki/Tetris_The_Grand_Master_3_Terror-Instinct

// The [] shirase blocks
block.palettes.tgm3shirase=[8,8,8,8,8,8,8,8];

 // History based with starting history and roll count
block.nextmodels.tgm3={bag:"0123456",bagscount:0,history:4,starting:"4545",tries:6,first:"0321"};

block.roads.tgm3master=[
	block.defaults.readygo({forcedlinesevery:100,levelcap:999}), // Level is capped to 999, but - since we are checking boosted levels - we go more fare. A torikan will stop the game at 999
	{setup:{gravity:tgmg2g(4),are:25,das:14,initialdas:14,lockdelay:30,linecleardelay:25},nextstage:[{condition:[["onlock","or","global","boostedlevel",">=",null,30]]}]},
	{setup:{gravity:tgmg2g(6)},nextstage:[{condition:[["onlock","or","global","boostedlevel",">=",null,35]]}]},
	{setup:{gravity:tgmg2g(8)},nextstage:[{condition:[["onlock","or","global","boostedlevel",">=",null,40]]}]},
	{setup:{gravity:tgmg2g(10)},nextstage:[{condition:[["onlock","or","global","boostedlevel",">=",null,50]]}]},
	{setup:{gravity:tgmg2g(12)},nextstage:[{condition:[["onlock","or","global","boostedlevel",">=",null,60]]}]},
	{setup:{gravity:tgmg2g(16)},nextstage:[{condition:[["onlock","or","global","boostedlevel",">=",null,70]]}]},
	{setup:{gravity:tgmg2g(32)},nextstage:[{condition:[["onlock","or","global","boostedlevel",">=",null,80]]}]},
	{setup:{gravity:tgmg2g(48)},nextstage:[{condition:[["onlock","or","global","boostedlevel",">=",null,90]]}]},
	{setup:{gravity:tgmg2g(64)},nextstage:[{condition:[["onlock","or","global","boostedlevel",">=",null,100]]}]}, // In level based stages, 100th "boostedlevel" is reachable only with line clears.
	{setup:{nextstagenumber:true,nextbackground:true,gravity:tgmg2g(80)},nextstage:[{condition:[["onlock","or","global","boostedlevel",">=",null,120]]}]},
	{setup:{gravity:tgmg2g(96)},nextstage:[{condition:[["onlock","or","global","boostedlevel",">=",null,140]]}]},
	{setup:{gravity:tgmg2g(112)},nextstage:[{condition:[["onlock","or","global","boostedlevel",">=",null,160]]}]},
	{setup:{gravity:tgmg2g(128)},nextstage:[{condition:[["onlock","or","global","boostedlevel",">=",null,170]]}]},
	{setup:{gravity:tgmg2g(144)},nextstage:[{condition:[["onlock","or","global","boostedlevel",">=",null,200]]}]},
	{setup:{nextstagenumber:true,nextbackground:true,gravity:tgmg2g(4)},nextstage:[{condition:[["onlock","or","global","boostedlevel",">=",null,220]]}]},
	{setup:{gravity:tgmg2g(32)},nextstage:[{condition:[["onlock","or","global","boostedlevel",">=",null,230]]}]},
	{setup:{gravity:tgmg2g(64)},nextstage:[{condition:[["onlock","or","global","boostedlevel",">=",null,233]]}]},
	{setup:{gravity:tgmg2g(128)},nextstage:[{condition:[["onlock","or","global","boostedlevel",">=",null,236]]}]},
	{setup:{gravity:tgmg2g(160)},nextstage:[{condition:[["onlock","or","global","boostedlevel",">=",null,239]]}]},
	{setup:{gravity:tgmg2g(192)},nextstage:[{condition:[["onlock","or","global","boostedlevel",">=",null,243]]}]},
	{setup:{gravity:tgmg2g(224)},nextstage:[{condition:[["onlock","or","global","boostedlevel",">=",null,247]]}]},
	{setup:{gravity:1},nextstage:[{condition:[["onlock","or","global","boostedlevel",">=",null,251]]}]},
	{setup:{gravity:2},nextstage:[{condition:[["onlock","or","global","boostedlevel",">=",null,300]]}]},
	{setup:{nextstagenumber:true,nextbackground:true,gravity:3},nextstage:[{condition:[["onlock","or","global","boostedlevel",">=",null,360]]}]},
	{setup:{gravity:4},nextstage:[{condition:[["onlock","or","global","boostedlevel",">=",null,400]]}]},
	{setup:{nextstagenumber:true,nextbackground:true,gravity:5},nextstage:[{condition:[["onlock","or","global","boostedlevel",">=",null,420]]}]},
	{setup:{gravity:4},nextstage:[{condition:[["onlock","or","global","boostedlevel",">=",null,450]]}]},
	{setup:{gravity:3},nextstage:[{condition:[["onlock","or","global","boostedlevel",">=",null,500]]}]},
	
	{setup:{nextstagenumber:true,nextbackground:true,gravity:20,are:25,das:8,lockdelay:30,linecleardelay:0},nextstage:[{condition:[["onlock","or","global","boostedlevel",">=",null,600]]}]},	
	{setup:{nextstagenumber:true,nextbackground:true,are:25,das:8,initialdas:8,lockdelay:30,linecleardelay:0},nextstage:[{condition:[["onlock","or","global","boostedlevel",">=",null,700]]}]},
	{setup:{nextstagenumber:true,nextbackground:true,are:16,das:8,initialdas:8,lockdelay:30,linecleardelay:0},nextstage:[{condition:[["onlock","or","global","boostedlevel",">=",null,800]]}]},
	{setup:{nextstagenumber:true,nextbackground:true,are:12,das:8,initialdas:8,lockdelay:30,linecleardelay:0},nextstage:[{condition:[["onlock","or","global","boostedlevel",">=",null,900]]}]},
	{setup:{nextstagenumber:true,nextbackground:true,are:12,das:6,initialdas:6,lockdelay:17,linecleardelay:0},nextstage:[{condition:[["onlock","or","global","boostedlevel",">=",null,1000]]}]},
	{setup:{nextstagenumber:true,nextbackground:true,are:6,das:6,initialdas:6,lockdelay:17,linecleardelay:0},nextstage:[{condition:[["onlock","or","global","boostedlevel",">=",null,1100]]}]},
	{setup:{nextstagenumber:true,nextbackground:true,are:5,das:6,initialdas:6,lockdelay:15,linecleardelay:1},nextstage:[{condition:[["onlock","or","global","boostedlevel",">=",null,1200]]}]},
	{setup:{nextstagenumber:true,nextbackground:true,are:4,das:6,initialdas:6,lockdelay:15,linecleardelay:2},nextstage:[{condition:[["onlock","or","global","boostedlevel","<",null,0]]}]}, // Play forever, since is over the cap. Stopped by a torikan. 
	
	// Normal mode staffroll
	{label:"roll",setup:{nextstagenumber:true,nextbackground:true,gravity:20,startstaffroll:"classic"},nextstage:[{condition:[[null,"or","global","staffrolldone","==",null,1]]}]}, // Wait the ending of the staffroll
	block.defaults.gameclear(),
	// Master mode roll
	{label:"mroll",setup:{internalgrade:"tgm3mroll",initfield:true,vanishspeed:5,drawborder:"",startstaffroll:"classic"},nextstage:[{condition:[[null,"or","global","staffrolldone","==",null,1]]}]}, // Wait the ending of the staffroll
	block.defaults.gameclear({adddata:["rollgrade",0.5]}),
	// Invisible mode roll
	{label:"iroll",setup:{internalgrade:"tgm3iroll",initfield:true,vanishspeed:0,drawborder:"",startstaffroll:"mroll"},nextstage:[{condition:[[null,"or","global","staffrolldone","==",null,1]]}]}, // Wait the ending of the staffroll
	block.defaults.gameclear({adddata:["rollgrade",1.6]})
];

block.roads.debugtgm3master=[
	block.defaults.readygo({forcedlinesevery:10,levelcap:46}), // Level is capped to 999, but - since we are checking boosted levels - we go more fare. A torikan will stop the game at 999
	{setup:{gravity:tgmg2g(4),are:25,das:14,initialdas:14,lockdelay:30,linecleardelay:25},nextstage:[{condition:[["onlock","or","global","boostedlevel",">=",null,10]]}]},
	{setup:{gravity:tgmg2g(6)},nextstage:[{condition:[["onlock","or","global","boostedlevel",">=",null,20]]}]},
	{setup:{gravity:tgmg2g(8)},nextstage:[{condition:[["onlock","or","global","boostedlevel",">=",null,30]]}]},
	{setup:{gravity:tgmg2g(8)},nextstage:[{condition:[["onlock","or","global","boostedlevel",">=",null,40]]}]},
	{setup:{gravity:tgmg2g(8)},nextstage:[{condition:[["onlock","or","global","boostedlevel",">=",null,41]]}]},
	{setup:{gravity:tgmg2g(8)},nextstage:[{condition:[["onlock","or","global","boostedlevel",">=",null,42]]}]},
	{setup:{gravity:tgmg2g(8)},nextstage:[{condition:[["onlock","or","global","boostedlevel",">=",null,43]]}]},
	{setup:{gravity:tgmg2g(8)},nextstage:[{condition:[["onlock","or","global","boostedlevel",">=",null,44]]}]},
	{setup:{gravity:tgmg2g(8)},nextstage:[{condition:[["onlock","or","global","boostedlevel",">=",null,45]]}]},
	{setup:{gravity:tgmg2g(8)},nextstage:[{condition:[["onlock","or","global","boostedlevel",">=",null,46]]}]},
	{setup:{gravity:tgmg2g(8)},nextstage:[{condition:[["onlock","or","global","boostedlevel",">=",null,47]]}]},
	{setup:{gravity:tgmg2g(8)},nextstage:[{condition:[["onlock","or","global","boostedlevel",">=",null,48]]}]},
	{setup:{gravity:tgmg2g(8)},nextstage:[{condition:[["onlock","or","global","boostedlevel",">=",null,49]]}]},
	{setup:{gravity:tgmg2g(8)},nextstage:[{condition:[["onlock","or","global","boostedlevel",">=",null,50]]}]},
	{setup:{gravity:tgmg2g(8)},nextstage:[{condition:[["onlock","or","global","boostedlevel","<",null,0]]}]}, // Play forever, since is over the cap. Stopped by a torikan.
	
	{label:"roll",setup:{nextstagenumber:true,nextbackground:true,startstaffroll:"classic"},nextstage:[{condition:[[null,"or","global","staffrolldone","==",null,1]]}]}, // Wait the ending of the staffroll
	block.defaults.gameclear(),
	// Master mode roll
	{label:"mroll",setup:{internalgrade:"tgm3mroll",initfield:true,vanishspeed:50,drawborder:"",startstaffroll:"classic"},nextstage:[{condition:[[null,"or","global","staffrolldone","==",null,1]]}]}, // Wait the ending of the staffroll
	block.defaults.gameclear({adddata:["rollgrade",0.5]}),
	// Invisible mode roll
	{label:"iroll",setup:{internalgrade:"tgm3iroll",initfield:true,vanishspeed:30,drawborder:"",startstaffroll:"mroll"},nextstage:[{condition:[[null,"or","global","staffrolldone","==",null,1]]}]}, // Wait the ending of the staffroll
	block.defaults.gameclear({adddata:["rollgrade",1.6]})
];

block.roads.tgm3shirase=[
	block.defaults.readygo({forcedlinesevery:100,levelcap:1300}), // Level is capped to 1300, but - since we are checking boosted levels - we go more fare. A torikan will stop the game at 999
	{setup:{gravity:20,are:10,das:8,initialdas:8,lockdelay:18,linecleardelay:4},nextstage:[{condition:[["onlock","or","global","level",">=",null,100]]}]},
	{setup:{are:10,das:6,initialdas:6,lockdelay:18,linecleardelay:5},nextstage:[{condition:[["onlock","or","global","level",">=",null,200]]}]},
	{setup:{are:10,das:6,initialdas:6,lockdelay:17,linecleardelay:6},nextstage:[{condition:[["onlock","or","global","level",">=",null,300]]}]},
	{setup:{are:4,das:6,initialdas:6,lockdelay:15,linecleardelay:0},nextstage:[{condition:[["onlock","or","global","level",">=",null,500]]}]},
	{setup:{are:4,das:4,initialdas:4,lockdelay:13,linecleardelay:0},nextstage:[{condition:[["onlock","or","global","level",">=",null,600]]}]},
	{setup:{are:4,das:4,initialdas:4,lockdelay:12,linecleardelay:0},nextstage:[{condition:[["onlock","or","global","level",">=",null,1000]]}]},
	{setup:{palette:"tgm3shirase",drawborder:""},nextstage:[{condition:[["onlock","or","global","level",">=",null,1100]]}]}, // The [] blocks comes here!
	{setup:{are:4,das:4,initialdas:4,lockdelay:10,linecleardelay:0},nextstage:[{condition:[["onlock","or","global","level",">=",null,1200]]}]},
	{setup:{are:4,das:4,initialdas:4,lockdelay:8,linecleardelay:0},nextstage:[{condition:[["onlock","or","global","level",">=",null,1300]]}]},

	// BIG mode roll
	{label:"roll",setup:{are:4,das:4,initialdas:4,lockdelay:15,linecleardelay:0,initfield:true,nextstagenumber:true,nextbackground:true,big:2,startstaffroll:"mroll"},nextstage:[{condition:[[null,"or","global","staffrolldone","==",null,1]]}]}, // Wait the ending of the staffroll
	block.defaults.gameclear()
];



block.roads.debugtgm3shirase=[
	block.defaults.readygo({forcedlinesevery:10,levelcap:46}), // Level is capped to 999, but - since we are checking boosted levels - we go more fare. A torikan will stop the game at 999
	{setup:{gravity:tgmg2g(4),are:10,das:8,initialdas:8,lockdelay:18,linecleardelay:4},nextstage:[{condition:[["onlock","or","global","level",">=",null,5]]}]},
	{setup:{are:10,das:6,initialdas:6,lockdelay:18,linecleardelay:5},nextstage:[{condition:[["onlock","or","global","level",">=",null,10]]}]},
	{setup:{are:10,das:6,initialdas:6,lockdelay:17,linecleardelay:6},nextstage:[{condition:[["onlock","or","global","level",">=",null,15]]}]},
	{setup:{are:4,das:6,initialdas:6,lockdelay:15,linecleardelay:0},nextstage:[{condition:[["onlock","or","global","level",">=",null,20]]}]},
	{setup:{are:4,das:4,initialdas:4,lockdelay:13,linecleardelay:0},nextstage:[{condition:[["onlock","or","global","level",">=",null,21]]}]},
	{setup:{are:4,das:4,initialdas:4,lockdelay:12,linecleardelay:0},nextstage:[{condition:[["onlock","or","global","level",">=",null,22]]}]},
	{setup:{are:4,das:4,initialdas:4,lockdelay:10,linecleardelay:0},nextstage:[{condition:[["onlock","or","global","level",">=",null,23]]}]},
	{setup:{palette:"tgm3shirase",drawborder:""},nextstage:[{condition:[["onlock","or","global","level",">=",null,30]]}]}, // The [] blocks comes here!
	{setup:{are:4,das:4,initialdas:4,lockdelay:8,linecleardelay:0},nextstage:[{condition:[["onlock","or","global","level",">=",null,46]]}]},

	// BIG mode roll
	{label:"roll",setup:{are:4,das:4,initialdas:4,lockdelay:15,linecleardelay:0,initfield:true,nextstagenumber:true,nextbackground:true,big:2,startstaffroll:"mroll"},nextstage:[{condition:[[null,"or","global","staffrolldone","==",null,1]]}]}, // Wait the ending of the staffroll
	block.defaults.gameclear(),
];


block.sectionmarks.tgm3master=[
	{condition:[["onlock","or","global","level",">=",null,70]],onend:[{condition:[[null,"or","section","time","<=",null,strtime2secs("00:52:00")]],setup:{setdata:["sectioncool",1],log:"Section cool reached"}},{setup:{setdata:["sectioncool",0],log:"Section cool missed"}}]}, // COOL 0-70
	{condition:[["onlock","or","global","level",">=",null,100]],onend:[{condition:[[null,"or","sumsection",[null,"time",0,1],">=",null,strtime2secs("01:30:00")]],setup:{adddata:["regret",1],setdata:["sectioncool",0],message:"SECTION REGRET"}},{condition:[[null,"or","data","sectioncool","==",null,1]],setup:{boostlevel:100,adddata:["cool",1],message:"SECTION COOL!"}}]}, // REGRET 0-99
	
	{condition:[["onlock","or","global","level",">=",null,170]],onend:[{condition:[[null,"or","data","sectioncool","==",null,1],["onlock","and","diffsection",[null,"time",0],"<=",null,2]],setup:{setdata:["sectioncool",1],log:"Relative section cool reached"}},{condition:[[null,"or","data","sectioncool","!=",null,1],[null,"and","section","time","<=",null,strtime2secs("00:52:00")]],setup:{setdata:["sectioncool",1],log:"Section cool reached"}},{setup:{setdata:["sectioncool",0],log:"Section cool missed"}}]}, // COOL	100-170
	{condition:[["onlock","or","global","level",">=",null,200]],onend:[{condition:[[null,"or","sumsection",[null,"time",2,3],">=",null,strtime2secs("01:15:00")]],setup:{adddata:["regret",1],setdata:["sectioncool",0],message:"SECTION REGRET"}},{condition:[[null,"or","data","sectioncool","==",null,1]],setup:{boostlevel:100,adddata:["cool",1],message:"SECTION COOL!"}}]}, // REGRET 100-199
	
	{condition:[["onlock","or","global","level",">=",null,270]],onend:[{condition:[[null,"or","data","sectioncool","==",null,1],["onlock","and","diffsection",[null,"time",2],"<=",null,2]],setup:{setdata:["sectioncool",1],log:"Relative section cool reached"}},{condition:[[null,"or","data","sectioncool","!=",null,1],[null,"and","section","time","<=",null,strtime2secs("00:49:00")]],setup:{setdata:["sectioncool",1],log:"Section cool reached"}},{setup:{setdata:["sectioncool",0],log:"Section cool missed"}}]}, // COOL	200-270	
	{condition:[["onlock","or","global","level",">=",null,300]],onend:[{condition:[[null,"or","sumsection",[null,"time",4,5],">=",null,strtime2secs("01:15:00")]],setup:{adddata:["regret",1],setdata:["sectioncool",0],message:"SECTION REGRET"}},{condition:[[null,"or","data","sectioncool","==",null,1]],setup:{boostlevel:100,adddata:["cool",1],message:"SECTION COOL!"}}]}, // REGRET 200-299
	

	{condition:[["onlock","or","global","level",">=",null,370]],onend:[{condition:[[null,"or","data","sectioncool","==",null,1],["onlock","and","diffsection",[null,"time",4],"<=",null,2]],setup:{setdata:["sectioncool",1],log:"Relative section cool reached"}},{condition:[[null,"or","data","sectioncool","!=",null,1],[null,"and","section","time","<=",null,strtime2secs("00:45:00")]],setup:{setdata:["sectioncool",1],log:"Section cool reached"}},{setup:{setdata:["sectioncool",0],log:"Section cool missed"}}]}, // COOL	300-370	
	{condition:[["onlock","or","global","level",">=",null,400]],onend:[{condition:[[null,"or","sumsection",[null,"time",6,7],">=",null,strtime2secs("01:08:00")]],setup:{adddata:["regret",1],setdata:["sectioncool",0],message:"SECTION REGRET"}},{condition:[[null,"or","data","sectioncool","==",null,1]],setup:{boostlevel:100,adddata:["cool",1],message:"SECTION COOL!"}}]}, // REGRET 300-399

	{condition:[["onlock","or","global","level",">=",null,470]],onend:[{condition:[[null,"or","data","sectioncool","==",null,1],["onlock","and","diffsection",[null,"time",6],"<=",null,2]],setup:{setdata:["sectioncool",1],log:"Relative section cool reached"}},{condition:[[null,"or","data","sectioncool","!=",null,1],[null,"and","section","time","<=",null,strtime2secs("00:45:00")]],setup:{setdata:["sectioncool",1],log:"Section cool reached"}},{setup:{setdata:["sectioncool",0],log:"Section cool missed"}}]}, // COOL	400-470	
	{condition:[["onlock","or","global","level",">=",null,500]],onend:[{condition:[[null,"or","sumsection",[null,"time",8,9],">=",null,strtime2secs("01:00:00")]],setup:{adddata:["regret",1],setdata:["sectioncool",0],message:"SECTION REGRET"}},{condition:[[null,"or","data","sectioncool","==",null,1]],setup:{boostlevel:100,adddata:["cool",1],message:"SECTION COOL!"}}]}, // REGRET 400-599


	{condition:[["onlock","or","global","level",">=",null,570]],onend:[{condition:[[null,"or","data","sectioncool","==",null,1],["onlock","and","diffsection",[null,"time",8],"<=",null,2]],setup:{setdata:["sectioncool",1],log:"Relative section cool reached"}},{condition:[[null,"or","data","sectioncool","!=",null,1],[null,"and","section","time","<=",null,strtime2secs("00:42:00")]],setup:{setdata:["sectioncool",1],log:"Section cool reached"}},{setup:{setdata:["sectioncool",0],log:"Section cool missed"}}]}, // COOL	500-570	
	{condition:[["onlock","or","global","level",">=",null,600]],onend:[{condition:[[null,"or","sumsection",[null,"time",10,11],">=",null,strtime2secs("01:00:00")]],setup:{adddata:["regret",1],setdata:["sectioncool",0],message:"SECTION REGRET"}},{condition:[[null,"or","data","sectioncool","==",null,1]],setup:{boostlevel:100,adddata:["cool",1],message:"SECTION COOL!"}}]}, // REGRET 500-599
	
	{condition:[["onlock","or","global","level",">=",null,670]],onend:[{condition:[[null,"or","data","sectioncool","==",null,1],["onlock","and","diffsection",[null,"time",10],"<=",null,2]],setup:{setdata:["sectioncool",1],log:"Relative section cool reached"}},{condition:[[null,"or","data","sectioncool","!=",null,1],[null,"and","section","time","<=",null,strtime2secs("00:42:00")]],setup:{setdata:["sectioncool",1],log:"Section cool reached"}},{setup:{setdata:["sectioncool",0],log:"Section cool missed"}}]}, // COOL	600-670
	{condition:[["onlock","or","global","level",">=",null,700]],onend:[{condition:[[null,"or","sumsection",[null,"time",10,11],">=",null,strtime2secs("00:50:00")]],setup:{adddata:["regret",1],setdata:["sectioncool",0],message:"SECTION REGRET"}},{condition:[[null,"or","data","sectioncool","==",null,1]],setup:{boostlevel:100,adddata:["cool",1],message:"SECTION COOL!"}}]}, // REGRET 500-599
	
	{condition:[["onlock","or","global","level",">=",null,770]],onend:[{condition:[[null,"or","data","sectioncool","==",null,1],["onlock","and","diffsection",[null,"time",12],"<=",null,2]],setup:{setdata:["sectioncool",1],log:"Relative section cool reached"}},{condition:[[null,"or","data","sectioncool","!=",null,1],[null,"and","section","time","<=",null,strtime2secs("00:38:00")]],setup:{setdata:["sectioncool",1],log:"Section cool reached"}},{setup:{setdata:["sectioncool",0],log:"Section cool missed"}}]}, // COOL	700-770
	{condition:[["onlock","or","global","level",">=",null,800]],onend:[{condition:[[null,"or","sumsection",[null,"time",12,13],">=",null,strtime2secs("00:50:00")]],setup:{adddata:["regret",1],setdata:["sectioncool",0],message:"SECTION REGRET"}},{condition:[[null,"or","data","sectioncool","==",null,1]],setup:{boostlevel:100,adddata:["cool",1],message:"SECTION COOL!"}}]}, // REGRET 700-799
	
	{condition:[["onlock","or","global","level",">=",null,870]],onend:[{condition:[[null,"or","data","sectioncool","==",null,1],["onlock","and","diffsection",[null,"time",14],"<=",null,2]],setup:{setdata:["sectioncool",1],log:"Relative section cool reached"}},{condition:[[null,"or","data","sectioncool","!=",null,1],[null,"and","section","time","<=",null,strtime2secs("00:38:00")]],setup:{setdata:["sectioncool",1],log:"Section cool reached"}},{setup:{setdata:["sectioncool",0],log:"Section cool missed"}}]}, // COOL	800-870
	{condition:[["onlock","or","global","level",">=",null,900]],onend:[{condition:[[null,"or","sumsection",[null,"time",14,15],">=",null,strtime2secs("00:50:00")]],setup:{adddata:["regret",1],setdata:["sectioncool",0],message:"SECTION REGRET"}},{condition:[[null,"or","data","sectioncool","==",null,1]],setup:{boostlevel:100,adddata:["cool",1],message:"SECTION COOL!"}}]}, // REGRET 800-899

	{condition:[["onlock","or","global","level",">=",null,999]],onend:[{condition:[[null,"or","section","time",">=",null,strtime2secs("00:50:00")]],setup:{adddata:["regret",1],setdata:["sectioncool",0],message:"SECTION REGRET"}}]}, // REGRET 900-999
	
];

block.sectionmarks.debugtgm3master=[
	{condition:[["onlock","or","global","level",">=",null,2]],onend:[{condition:[[null,"or","section","time","<=",null,strtime2secs("00:10:00")]],setup:{setdata:["sectioncool",1],log:"Section cool reached"}},{setup:{setdata:["sectioncool",0],log:"Section cool missed"}}]}, // COOL 0-70
	{condition:[["onlock","or","global","level",">=",null,4]],onend:[{condition:[[null,"or","sumsection",[null,"time",0,1],">=",null,strtime2secs("00:20:00")]],setup:{adddata:["regret",1],setdata:["sectioncool",0],message:"SECTION REGRET"}},{condition:[[null,"or","data","sectioncool","==",null,1]],setup:{boostlevel:2,adddata:["cool",1],message:"SECTION COOL!"}}]}, // REGRET 0-99
	
	{condition:[["onlock","or","global","level",">=",null,6]],onend:[{condition:[[null,"or","data","sectioncool","==",null,1],["onlock","and","diffsection",[null,"time",0],"<=",null,5]],setup:{setdata:["sectioncool",1],log:"Relative section cool reached"}},{condition:[[null,"or","data","sectioncool","!=",null,1],[null,"and","section","time","<=",null,strtime2secs("00:10:00")]],setup:{setdata:["sectioncool",1],log:"Section cool reached"}},{setup:{setdata:["sectioncool",0],log:"Section cool missed"}}]}, // COOL	100-170
	{condition:[["onlock","or","global","level",">=",null,8]],onend:[{condition:[[null,"or","sumsection",[null,"time",2,3],">=",null,strtime2secs("00:20:00")]],setup:{adddata:["regret",1],setdata:["sectioncool",0],message:"SECTION REGRET"}},{condition:[[null,"or","data","sectioncool","==",null,1]],setup:{boostlevel:2,adddata:["cool",1],message:"SECTION COOL!"}}]}, // REGRET 100-199
	
	{condition:[["onlock","or","global","level",">=",null,10]],onend:[{condition:[[null,"or","data","sectioncool","==",null,1],["onlock","and","diffsection",[null,"time",2],"<=",null,5]],setup:{setdata:["sectioncool",1],log:"Relative section cool reached"}},{condition:[[null,"or","data","sectioncool","!=",null,1],[null,"and","section","time","<=",null,strtime2secs("01:40:00")]],setup:{setdata:["sectioncool",1],log:"Section cool reached"}},{setup:{setdata:["sectioncool",0],log:"Section cool missed"}}]}, // COOL	200-270	
	{condition:[["onlock","or","global","level",">=",null,11]],onend:[{condition:[[null,"or","sumsection",[null,"time",4,5],">=",null,strtime2secs("01:60:00")]],setup:{adddata:["regret",1],setdata:["sectioncool",0],message:"SECTION REGRET"}},{condition:[[null,"or","data","sectioncool","==",null,1]],setup:{boostlevel:2,adddata:["cool",1],message:"SECTION COOL!"}}]}, // REGRET 200-299
	

	{condition:[["onlock","or","global","level",">=",null,12]],onend:[{condition:[[null,"or","data","sectioncool","==",null,1],["onlock","and","diffsection",[null,"time",4],"<=",null,5]],setup:{setdata:["sectioncool",1],log:"Relative section cool reached"}},{condition:[[null,"or","data","sectioncool","!=",null,1],[null,"and","section","time","<=",null,strtime2secs("01:40:00")]],setup:{setdata:["sectioncool",1],log:"Section cool reached"}},{setup:{setdata:["sectioncool",0],log:"Section cool missed"}}]}, // COOL	300-370	
	{condition:[["onlock","or","global","level",">=",null,13]],onend:[{condition:[[null,"or","sumsection",[null,"time",6,7],">=",null,strtime2secs("01:60:00")]],setup:{adddata:["regret",1],setdata:["sectioncool",0],message:"SECTION REGRET"}},{condition:[[null,"or","data","sectioncool","==",null,1]],setup:{boostlevel:2,adddata:["cool",1],message:"SECTION COOL!"}}]}, // REGRET 300-399

	{condition:[["onlock","or","global","level",">=",null,14]],onend:[{condition:[[null,"or","data","sectioncool","==",null,1],["onlock","and","diffsection",[null,"time",6],"<=",null,5]],setup:{setdata:["sectioncool",1],log:"Relative section cool reached"}},{condition:[[null,"or","data","sectioncool","!=",null,1],[null,"and","section","time","<=",null,strtime2secs("01:40:00")]],setup:{setdata:["sectioncool",1],log:"Section cool reached"}},{setup:{setdata:["sectioncool",0],log:"Section cool missed"}}]}, // COOL	400-470	
	{condition:[["onlock","or","global","level",">=",null,15]],onend:[{condition:[[null,"or","sumsection",[null,"time",8,9],">=",null,strtime2secs("01:60:00")]],setup:{adddata:["regret",1],setdata:["sectioncool",0],message:"SECTION REGRET"}},{condition:[[null,"or","data","sectioncool","==",null,1]],setup:{boostlevel:2,adddata:["cool",1],message:"SECTION COOL!"}}]}, // REGRET 400-599


	{condition:[["onlock","or","global","level",">=",null,16]],onend:[{condition:[[null,"or","data","sectioncool","==",null,1],["onlock","and","diffsection",[null,"time",8],"<=",null,5]],setup:{setdata:["sectioncool",1],log:"Relative section cool reached"}},{condition:[[null,"or","data","sectioncool","!=",null,1],[null,"and","section","time","<=",null,strtime2secs("01:40:00")]],setup:{setdata:["sectioncool",1],log:"Section cool reached"}},{setup:{setdata:["sectioncool",0],log:"Section cool missed"}}]}, // COOL	500-570	
	{condition:[["onlock","or","global","level",">=",null,17]],onend:[{condition:[[null,"or","sumsection",[null,"time",10,11],">=",null,strtime2secs("01:60:00")]],setup:{adddata:["regret",1],setdata:["sectioncool",0],message:"SECTION REGRET"}},{condition:[[null,"or","data","sectioncool","==",null,1]],setup:{boostlevel:2,adddata:["cool",1],message:"SECTION COOL!"}}]}, // REGRET 500-599
	
	{condition:[["onlock","or","global","level",">=",null,18]],onend:[{condition:[[null,"or","data","sectioncool","==",null,1],["onlock","and","diffsection",[null,"time",10],"<=",null,5]],setup:{setdata:["sectioncool",1],log:"Relative section cool reached"}},{condition:[[null,"or","data","sectioncool","!=",null,1],[null,"and","section","time","<=",null,strtime2secs("01:40:00")]],setup:{setdata:["sectioncool",1],log:"Section cool reached"}},{setup:{setdata:["sectioncool",0],log:"Section cool missed"}}]}, // COOL	600-670
	{condition:[["onlock","or","global","level",">=",null,19]],onend:[{condition:[[null,"or","sumsection",[null,"time",10,11],">=",null,strtime2secs("01:60:00")]],setup:{adddata:["regret",1],setdata:["sectioncool",0],message:"SECTION REGRET"}},{condition:[[null,"or","data","sectioncool","==",null,1]],setup:{boostlevel:2,adddata:["cool",1],message:"SECTION COOL!"}}]}, // REGRET 500-599
	
	{condition:[["onlock","or","global","level",">=",null,20]],onend:[{condition:[[null,"or","data","sectioncool","==",null,1],["onlock","and","diffsection",[null,"time",12],"<=",null,5]],setup:{setdata:["sectioncool",1],log:"Relative section cool reached"}},{condition:[[null,"or","data","sectioncool","!=",null,1],[null,"and","section","time","<=",null,strtime2secs("01:40:00")]],setup:{setdata:["sectioncool",1],log:"Section cool reached"}},{setup:{setdata:["sectioncool",0],log:"Section cool missed"}}]}, // COOL	700-770
	{condition:[["onlock","or","global","level",">=",null,21]],onend:[{condition:[[null,"or","sumsection",[null,"time",12,13],">=",null,strtime2secs("01:60:00")]],setup:{adddata:["regret",1],setdata:["sectioncool",0],message:"SECTION REGRET"}},{condition:[[null,"or","data","sectioncool","==",null,1]],setup:{boostlevel:2,adddata:["cool",1],message:"SECTION COOL!"}}]}, // REGRET 700-799
	
	{condition:[["onlock","or","global","level",">=",null,22]],onend:[{condition:[[null,"or","data","sectioncool","==",null,1],["onlock","and","diffsection",[null,"time",14],"<=",null,5]],setup:{setdata:["sectioncool",1],log:"Relative section cool reached"}},{condition:[[null,"or","data","sectioncool","!=",null,1],[null,"and","section","time","<=",null,strtime2secs("01:40:00")]],setup:{setdata:["sectioncool",1],log:"Section cool reached"}},{setup:{setdata:["sectioncool",0],log:"Section cool missed"}}]}, // COOL	800-870
	{condition:[["onlock","or","global","level",">=",null,23]],onend:[{condition:[[null,"or","sumsection",[null,"time",14,15],">=",null,strtime2secs("01:60:00")]],setup:{adddata:["regret",1],setdata:["sectioncool",0],message:"SECTION REGRET"}},{condition:[[null,"or","data","sectioncool","==",null,1]],setup:{boostlevel:2,adddata:["cool",1],message:"SECTION COOL!"}}]}, // REGRET 800-899

	{condition:[["onlock","or","global","level",">=",null,24]],onend:[{condition:[[null,"or","section","time",">=",null,strtime2secs("01:60:00")]],setup:{adddata:["regret",1],setdata:["sectioncool",0],message:"SECTION REGRET"}}]}, // REGRET 900-999
	
];


block.sectionmarks.tgm3shirase=[
	{condition:[["onlock","or","global","level",">=",null,100]],onend:[{condition:[[null,"or","section","time",">=",null,strtime2secs("01:00:00")]],setup:{setdata:["regret",1],message:"SECTION REGRET"}},{setup:{adddata:["cool",1]}}]},
	{condition:[["onlock","or","global","level",">=",null,200]],onend:[{condition:[[null,"or","section","time",">=",null,strtime2secs("01:00:00")]],setup:{setdata:["regret",1],message:"SECTION REGRET"}},{setup:{adddata:["cool",1]}}]},
	{condition:[["onlock","or","global","level",">=",null,300]],onend:[{condition:[[null,"or","section","time",">=",null,strtime2secs("01:00:00")]],setup:{setdata:["regret",1],message:"SECTION REGRET"}},{setup:{adddata:["cool",1]}}]},
	{condition:[["onlock","or","global","level",">=",null,400]],onend:[{condition:[[null,"or","section","time",">=",null,strtime2secs("01:00:00")]],setup:{setdata:["regret",1],message:"SECTION REGRET"}},{setup:{adddata:["cool",1]}}]},
	{condition:[["onlock","or","global","level",">=",null,500]],onend:[{condition:[[null,"or","section","time",">=",null,strtime2secs("01:00:00")]],setup:{setdata:["regret",1],message:"SECTION REGRET"}},{setup:{adddata:["cool",1]}}]},
	{condition:[["onlock","or","global","level",">=",null,600]],onend:[{condition:[[null,"or","section","time",">=",null,strtime2secs("01:00:00")]],setup:{setdata:["regret",1],message:"SECTION REGRET"}},{setup:{adddata:["cool",1]}}]},
	{condition:[["onlock","or","global","level",">=",null,700]],onend:[{condition:[[null,"or","section","time",">=",null,strtime2secs("01:00:00")]],setup:{setdata:["regret",1],message:"SECTION REGRET"}},{setup:{adddata:["cool",1]}}]},
	{condition:[["onlock","or","global","level",">=",null,800]],onend:[{condition:[[null,"or","section","time",">=",null,strtime2secs("01:00:00")]],setup:{setdata:["regret",1],message:"SECTION REGRET"}},{setup:{adddata:["cool",1]}}]},
	{condition:[["onlock","or","global","level",">=",null,900]],onend:[{condition:[[null,"or","section","time",">=",null,strtime2secs("01:00:00")]],setup:{setdata:["regret",1],message:"SECTION REGRET"}},{setup:{adddata:["cool",1]}}]},
	{condition:[["onlock","or","global","level",">=",null,1000]],onend:[{condition:[[null,"or","section","time",">=",null,strtime2secs("01:00:00")]],setup:{setdata:["regret",1],message:"SECTION REGRET"}},{setup:{adddata:["cool",1]}}]},
	{condition:[["onlock","or","global","level",">=",null,1100]],onend:[{condition:[[null,"or","section","time",">=",null,strtime2secs("01:00:00")]],setup:{setdata:["regret",1],message:"SECTION REGRET"}},{setup:{adddata:["cool",1]}}]},
	{condition:[["onlock","or","global","level",">=",null,1200]],onend:[{condition:[[null,"or","section","time",">=",null,strtime2secs("01:00:00")]],setup:{setdata:["regret",1],message:"SECTION REGRET"}},{setup:{adddata:["cool",1]}}]},
	{condition:[["onlock","or","global","level",">=",null,1300]],onend:[{condition:[[null,"or","section","time",">=",null,strtime2secs("01:00:00")]],setup:{setdata:["regret",1],message:"SECTION REGRET"}},{setup:{adddata:["cool",1]}}]},
];

block.sectionmarks.debugtgm3shirase=[
	{condition:[["onlock","or","global","level",">=",null,5]],onend:[{condition:[[null,"or","section","time",">=",null,strtime2secs("01:00:00")]],setup:{setdata:["regret",1],message:"SECTION REGRET"}},{setup:{adddata:["cool",1]}}]},
	{condition:[["onlock","or","global","level",">=",null,10]],onend:[{condition:[[null,"or","section","time",">=",null,strtime2secs("01:00:00")]],setup:{setdata:["regret",1],message:"SECTION REGRET"}},{setup:{adddata:["cool",1]}}]},
	{condition:[["onlock","or","global","level",">=",null,15]],onend:[{condition:[[null,"or","section","time",">=",null,strtime2secs("01:00:00")]],setup:{setdata:["regret",1],message:"SECTION REGRET"}},{setup:{adddata:["cool",1]}}]},
	{condition:[["onlock","or","global","level",">=",null,20]],onend:[{condition:[[null,"or","section","time",">=",null,strtime2secs("01:00:00")]],setup:{setdata:["regret",1],message:"SECTION REGRET"}},{setup:{adddata:["cool",1]}}]},
	{condition:[["onlock","or","global","level",">=",null,21]],onend:[{condition:[[null,"or","section","time",">=",null,strtime2secs("01:00:00")]],setup:{setdata:["regret",1],message:"SECTION REGRET"}},{setup:{adddata:["cool",1]}}]},
	{condition:[["onlock","or","global","level",">=",null,22]],onend:[{condition:[[null,"or","section","time",">=",null,strtime2secs("01:00:00")]],setup:{setdata:["regret",1],message:"SECTION REGRET"}},{setup:{adddata:["cool",1]}}]},
	{condition:[["onlock","or","global","level",">=",null,23]],onend:[{condition:[[null,"or","section","time",">=",null,strtime2secs("01:00:00")]],setup:{setdata:["regret",1],message:"SECTION REGRET"}},{setup:{adddata:["cool",1]}}]},
	{condition:[["onlock","or","global","level",">=",null,24]],onend:[{condition:[[null,"or","section","time",">=",null,strtime2secs("01:00:00")]],setup:{setdata:["regret",1],message:"SECTION REGRET"}},{setup:{adddata:["cool",1]}}]},
	{condition:[["onlock","or","global","level",">=",null,25]],onend:[{condition:[[null,"or","section","time",">=",null,strtime2secs("01:00:00")]],setup:{setdata:["regret",1],message:"SECTION REGRET"}},{setup:{adddata:["cool",1]}}]},
	{condition:[["onlock","or","global","level",">=",null,26]],onend:[{condition:[[null,"or","section","time",">=",null,strtime2secs("01:00:00")]],setup:{setdata:["regret",1],message:"SECTION REGRET"}},{setup:{adddata:["cool",1]}}]},
	{condition:[["onlock","or","global","level",">=",null,27]],onend:[{condition:[[null,"or","section","time",">=",null,strtime2secs("01:00:00")]],setup:{setdata:["regret",1],message:"SECTION REGRET"}},{setup:{adddata:["cool",1]}}]},
	{condition:[["onlock","or","global","level",">=",null,28]],onend:[{condition:[[null,"or","section","time",">=",null,strtime2secs("01:00:00")]],setup:{setdata:["regret",1],message:"SECTION REGRET"}},{setup:{adddata:["cool",1]}}]},
	{condition:[["onlock","or","global","level",">=",null,29]],onend:[{condition:[[null,"or","section","time",">=",null,strtime2secs("01:00:00")]],setup:{setdata:["regret",1],message:"SECTION REGRET"}},{setup:{adddata:["cool",1]}}]},
];

// Simple torikan. Easy is like master but ends at 200. 
block.torikans.tgm3easy={ // TGM3 easy mode torikan (200 -> staffroll) - http://www.tetrisconcept.net/wiki/Tetris_The_Grand_Master_3_Terror-Instinct
	starting:["main","main"],
	torikans:[
		{
			main:{apply:[{fail:true,setup:{levelcap:200}}]}
		},
		{ 
			// The timed torikan is respected here. The player will be kicked to the roll
			main:{condition:[["onlock","or","global","level",">=",null,200]],apply:[{fail:true,setup:{gotostagelabel:"roll"}}]},
		}
	]
};

// Simple torikan. Easy is like master but ends at 200. 
block.torikans.debugtgm3easy={ // TGM3 easy mode torikan (20 -> staffroll) - http://www.tetrisconcept.net/wiki/Tetris_The_Grand_Master_3_Terror-Instinct
	starting:["main","main"],
	torikans:[
		{
			main:{apply:[{fail:true,setup:{levelcap:20}}]}
		},
		{ 
			// The timed torikan is respected here. The player will be kicked to the roll
			main:{condition:[["onlock","or","global","level",">=",null,20]],apply:[{fail:true,setup:{gotostagelabel:"roll"}}]},
		}
	]
};


// This torikan is a bit complex: jumps to the staffroll at level 999, ignoring the boosted level. Is also verified the timed torikan.
block.torikans.tgm3master={ // TGM3 master mode torikan - http://www.tetrisconcept.net/wiki/Tetris_The_Grand_Master_3_Terror-Instinct
	starting:["main","main"], // the first one is the time limit.  The second one is the 999-cap torikan. 
	torikans:[
		{ // The time limit torikan. If triggered, the cap is set to 500.
			main:{condition:[[null,"or","overall","time",">",null,strtime2secs("07:00:00")]],apply:[{fail:true,setup:{levelcap:500,setdata:["torikan",1]},condition:[[null,"or","global","level","<",null,500]]},{fail:true}]}
		},
		{ 
			// The timed torikan is respected here. If triggered, the game is cleared @ 500 but without roll
			main:{condition:[["onlock","or","global","level",">=",null,500]],apply:[{condition:[[null,"or","data","torikan","==",null,1]],fail:true,setup:{gameclear:true}},{totorikan:"ninetorikan"}]},
		  // If all cool sections were triggered and internal grade is at least 27, the invisible roll is triggered. Else the normal master roll.
			ninetorikan:{condition:[["onlock","or","global","level",">=",null,999]],apply:[{condition:[[null,"or","global","coolcount",">=",null,9],[null,"and","global","internalgrade",">=",null,27]],fail:true,setup:{gotostagelabel:"iroll"}},{fail:true,setup:{gotostagelabel:"mroll"}}]}
		}
	]
};

// This torikan is a bit complex: jumps to the staffroll at level 999, ignoring the boosted level. Is also verified the timed torikan.
block.torikans.debugtgm3master={ // TGM3 master mode torikan - http://www.tetrisconcept.net/wiki/Tetris_The_Grand_Master_3_Terror-Instinct
	starting:["main","main"], // the first one is the time limit.  The second one is the 999-cap torikan. 
	torikans:[
		{ // The time limit torikan. If triggered, the cap is set to 500.
			main:{condition:[[null,"or","overall","time",">",null,strtime2secs("00:30:00")]],apply:[{fail:true,setup:{levelcap:15,setdata:["torikan",1]},condition:[[null,"or","global","level","<",null,15]]},{fail:true}]}
		},
		{ 
			// The timed torikan is respected here. The player will be kicked to the roll
			main:{condition:[["onlock","or","global","level",">=",null,15]],apply:[{condition:[[null,"or","data","torikan","==",null,1]],fail:true,setup:{gameclear:true}},{totorikan:"ninetorikan"}]},
		  // If all cool sections were triggered and internal grade is at least 27, the invisible roll is triggered. Else the normal master roll.
			ninetorikan:{condition:[["onlock","or","global","level",">=",null,46]],apply:[{condition:[[null,"or","global","coolcount",">=",null,9],[null,"and","global","internalgrade",">=",null,27]],fail:true,setup:{gotostagelabel:"iroll"}},{fail:true,setup:{gotostagelabel:"mroll"}}]}
		}
	]
};

block.torikans.tgm3shirase={ // TGM3 master mode torikan - http://www.tetrisconcept.net/wiki/Tetris_The_Grand_Master_3_Terror-Instinct
	starting:["fivetorikan","fivetorikan"], // the first one is the time limit.  The second one is the 999-cap torikan. 
	torikans:[
		{ // The time limit torikan. If triggered, the cap is set to 500.
			fivetorikan:{condition:[[null,"or","overall","time",">",null,strtime2secs("02:28:00")]],apply:[{fail:true,setup:{levelcap:500,setdata:["torikan",1]},condition:[[null,"or","global","level","<",null,500]]},{totorikan:"tentorikan"}]},
			tentorikan:{condition:[[null,"or","overall","time",">",null,strtime2secs("04:56:00")]],apply:[{fail:true,setup:{levelcap:1000,setdata:["torikan",2]},condition:[[null,"or","global","level","<",null,1000]]},{fail:true}]},
			
		},
		{ 
			fivetorikan:{condition:[["onlock","or","global","level",">=",null,500]],apply:[{condition:[[null,"or","data","torikan","==",null,1]],fail:true,setup:{gameclear:true}},{totorikan:"tentorikan"}]},
			tentorikan:{condition:[["onlock","or","global","level",">=",null,1000]],apply:[{condition:[[null,"or","data","torikan","==",null,2]],fail:true,setup:{gameclear:true}},{totorikan:"ending"}]},
			ending:{condition:[["onlock","or","global","level",">=",null,1300]],apply:[{fail:true,setup:{gotostagelabel:"roll"}}]},
		}
	]
};

block.torikans.tgm3shiraseworld={ // TGM3 master mode torikan for world SRS mode - http://www.tetrisconcept.net/wiki/Tetris_The_Grand_Master_3_Terror-Instinct
	starting:["fivetorikan","fivetorikan"], // the first one is the time limit.  The second one is the 999-cap torikan. 
	torikans:[
		{ // The time limit torikan. If triggered, the cap is set to 500.
			fivetorikan:{condition:[[null,"or","overall","time",">",null,strtime2secs("03:03:00")]],apply:[{fail:true,setup:{levelcap:500,setdata:["torikan",1]},condition:[[null,"or","global","level","<",null,500]]},{totorikan:"tentorikan"}]},
			tentorikan:{condition:[[null,"or","overall","time",">",null,strtime2secs("06:06:00")]],apply:[{fail:true,setup:{levelcap:1000,setdata:["torikan",2]},condition:[[null,"or","global","level","<",null,1000]]},{fail:true}]},
			
		},
		{ 
			fivetorikan:{condition:[["onlock","or","global","level",">=",null,500]],apply:[{condition:[[null,"or","data","torikan","==",null,1]],fail:true,setup:{gameclear:true}},{totorikan:"tentorikan"}]},
			tentorikan:{condition:[["onlock","or","global","level",">=",null,1000]],apply:[{condition:[[null,"or","data","torikan","==",null,2]],fail:true,setup:{gameclear:true}},{totorikan:"ending"}]},
			ending:{condition:[["onlock","or","global","level",">=",null,1300]],apply:[{fail:true,setup:{gotostagelabel:"roll"}}]},
		}
	]
};


block.torikans.debugtgm3shirase={ // TGM3 master mode torikan - http://www.tetrisconcept.net/wiki/Tetris_The_Grand_Master_3_Terror-Instinct
	starting:["fivetorikan","fivetorikan"], // the first one is the time limit.  The second one is the 999-cap torikan. 
	torikans:[
		{ // The time limit torikan. If triggered, the cap is set to 500.
			fivetorikan:{condition:[[null,"or","overall","time",">",null,strtime2secs("01:00:00")]],apply:[{fail:true,setup:{levelcap:10,setdata:["torikan",1]},condition:[[null,"or","global","level","<",null,10]]},{totorikan:"tentorikan"}]},
			tentorikan:{condition:[[null,"or","overall","time",">",null,strtime2secs("02:00:00")]],apply:[{fail:true,setup:{levelcap:20,setdata:["torikan",2]},condition:[[null,"or","global","level","<",null,20]]},{fail:true}]},
			
		},
		{ 
			fivetorikan:{condition:[["onlock","or","global","level",">=",null,10]],apply:[{condition:[[null,"or","data","torikan","==",null,1]],fail:true,setup:{gameclear:true}},{totorikan:"tentorikan"}]},
			tentorikan:{condition:[["onlock","or","global","level",">=",null,20]],apply:[{condition:[[null,"or","data","torikan","==",null,2]],fail:true,setup:{gameclear:true}},{totorikan:"ending"}]},
			ending:{condition:[["onlock","or","global","level",">=",null,46]],apply:[{fail:true,setup:{gotostagelabel:"roll"}}]},
		}
	]
};

block.internalgrades.tgm3={
	internalgradevariable:"internalgrade",
	gradesboostvariable:"gradesboost",
	internalgradepointsvariable:"internalgradespoints",
	internalgradedecayvariable:"internalgradedecay",
	nextgradeevery:100, // Nextr grade is reached every 100 Internal grade points.
	gradesboost:[ // Can replace the grade value
		0, 1, 2, 3, 4, 5, 5, 6, 6, 7, 7, 7, 8, 8, 8, 9,
		9, 9, 10, 11, 12, 12, 12, 13, 13, 14, 14, 15, 15,
		16, 16, 17
	],
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
		[1.0, 1.0,  1.0,  1.0],
		[1.0, 1.2,  1.4,  1.5],					
		[1.0, 1.2,  1.5,  1.8],
		[1.0, 1.4,  1.6,  2.0],
		[1.0, 1.4,  1.7,  2.2],
		[1.0, 1.4,  1.8,  2.3],
		[1.0, 1.4,  1.9,  2.4],
		[1.0, 1.5,  2.0,  2.5],
		[1.0, 1.5,  2.1,  2.6],
		[1.0, 2.0,  2.5,  3.0] // And so on...
	],
	level:[ // Level multipliers
		{level:249,mul:1},
		{level:499,mul:2},
		{level:749,mul:3},
		{level:999,mul:4} // And so on...
	]
};

block.internalgrades.debugtgm3={
	internalgradevariable:"internalgrade",
	gradesboostvariable:"gradesboost",
	internalgradepointsvariable:"internalgradespoints",
	internalgradedecayvariable:"internalgradedecay",
	nextgradeevery:100, // Nextr grade is reached every 100 Internal grade points.
	gradesboost:[ // Can replace the grade value
		0, 1, 2, 3, 4, 5, 5, 6, 6, 7, 7, 7, 8, 8, 8, 9,
		9, 9, 10, 11, 12, 12, 12, 13, 13, 14, 14, 15, 15,
		16, 16, 17
	],
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


block.internalgrades.tgm3mroll={
	internalgradepointsvariable:"rollgrade",
	// any "next grade every", grades boost and decays. Is a single absolute value
	//gradesboost:[ ],
	//decay:[ ],
	score:[ // Score of single, double, triple and Tetris
		[ 0.04, 0.08, 0.12, 0.26 ]
	],
	// No combo multipliers
	combo:[ [ 1 ] ],
	// No level multipliers
	level:[ {mul:1} ]
};


block.internalgrades.tgm3iroll={
	internalgradepointsvariable:"rollgrade",
	// any "next grade every", grades boost and decays. Is a single absolute value
	//gradesboost:[ ],
	//decay:[ ],
	score:[ // Score of single, double, triple and Tetris
		[ 0.1, 0.2, 0.3, 1.0 ]
	],
	// No combo multipliers
	combo:[ [ 1 ] ],
	// No level multipliers
	level:[ {mul:1} ]
};

// floor(Internal Grade Boosts + Section COOL!! + Staff Roll Grade - Section REGRET!)
var __tgm3mastergradeforumla=[{op:"+",value:["data","gradesboost"]},{op:"+",value:["data","cool"]},{op:"+",value:["data","rollgrade"]},{op:"-",value:["data","regret"]},{op:"floor"}];
block.grades.tgm3master={ // TGM3 grading. Can move up and down, regarding the composed grade formula - http://www.tetrisconcept.net/wiki/Tetris_The_Grand_Master_3_Terror-Instinct
	starting:["gr9"],
	grades:[
		{ // Base series of grades
			gr9:{label:"9",promote:[{tograde:"gr8",condition:[["onlock","or","calc",__tgm3mastergradeforumla,">",null,0]]}]},
			gr8:{label:"8",promote:[{tograde:"gr7",condition:[["onlock","or","calc",__tgm3mastergradeforumla,">",null,1]]},{tograde:"gr9",condition:[["onlock","or","calc",__tgm3mastergradeforumla,"<",null,1]]}]},
			gr7:{label:"7",promote:[{tograde:"gr6",condition:[["onlock","or","calc",__tgm3mastergradeforumla,">",null,2]]},{tograde:"gr8",condition:[["onlock","or","calc",__tgm3mastergradeforumla,"<",null,2]]}]},
			gr6:{label:"6",promote:[{tograde:"gr5",condition:[["onlock","or","calc",__tgm3mastergradeforumla,">",null,3]]},{tograde:"gr7",condition:[["onlock","or","calc",__tgm3mastergradeforumla,"<",null,3]]}]},
			gr5:{label:"5",promote:[{tograde:"gr4",condition:[["onlock","or","calc",__tgm3mastergradeforumla,">",null,4]]},{tograde:"gr6",condition:[["onlock","or","calc",__tgm3mastergradeforumla,"<",null,4]]}]},
			gr4:{label:"4",promote:[{tograde:"gr3",condition:[["onlock","or","calc",__tgm3mastergradeforumla,">",null,5]]},{tograde:"gr5",condition:[["onlock","or","calc",__tgm3mastergradeforumla,"<",null,5]]}]},
			gr3:{label:"3",promote:[{tograde:"gr2",condition:[["onlock","or","calc",__tgm3mastergradeforumla,">",null,6]]},{tograde:"gr4",condition:[["onlock","or","calc",__tgm3mastergradeforumla,"<",null,6]]}]},
			gr2:{label:"2",promote:[{tograde:"gr1",condition:[["onlock","or","calc",__tgm3mastergradeforumla,">",null,7]]},{tograde:"gr3",condition:[["onlock","or","calc",__tgm3mastergradeforumla,"<",null,7]]}]},
			gr1:{label:"1",promote:[{tograde:"grS1",condition:[["onlock","or","calc",__tgm3mastergradeforumla,">",null,8]]},{tograde:"gr2",condition:[["onlock","or","calc",__tgm3mastergradeforumla,"<",null,8]]}]},
			grS1:{label:"S1",promote:[{tograde:"grS2",condition:[["onlock","or","calc",__tgm3mastergradeforumla,">",null,9]]},{tograde:"gr1",condition:[["onlock","or","calc",__tgm3mastergradeforumla,"<",null,9]]}]},
			grS2:{label:"S2",promote:[{tograde:"grS3",condition:[["onlock","or","calc",__tgm3mastergradeforumla,">",null,10]]},{tograde:"grS1",condition:[["onlock","or","calc",__tgm3mastergradeforumla,"<",null,10]]}]},
			grS3:{label:"S3",promote:[{tograde:"grS4",condition:[["onlock","or","calc",__tgm3mastergradeforumla,">",null,11]]},{tograde:"grS2",condition:[["onlock","or","calc",__tgm3mastergradeforumla,"<",null,11]]}]},
			grS4:{label:"S4",promote:[{tograde:"grS5",condition:[["onlock","or","calc",__tgm3mastergradeforumla,">",null,12]]},{tograde:"grS3",condition:[["onlock","or","calc",__tgm3mastergradeforumla,"<",null,12]]}]},
			grS5:{label:"S5",promote:[{tograde:"grS6",condition:[["onlock","or","calc",__tgm3mastergradeforumla,">",null,13]]},{tograde:"grS4",condition:[["onlock","or","calc",__tgm3mastergradeforumla,"<",null,13]]}]},
			grS6:{label:"S6",promote:[{tograde:"grS7",condition:[["onlock","or","calc",__tgm3mastergradeforumla,">",null,14]]},{tograde:"grS5",condition:[["onlock","or","calc",__tgm3mastergradeforumla,"<",null,14]]}]},
			grS7:{label:"S7",promote:[{tograde:"grS8",condition:[["onlock","or","calc",__tgm3mastergradeforumla,">",null,15]]},{tograde:"grS6",condition:[["onlock","or","calc",__tgm3mastergradeforumla,"<",null,15]]}]},
			grS8:{label:"S8",promote:[{tograde:"grS9",condition:[["onlock","or","calc",__tgm3mastergradeforumla,">",null,16]]},{tograde:"grS7",condition:[["onlock","or","calc",__tgm3mastergradeforumla,"<",null,16]]}]},
			grS9:{label:"S9",promote:[{tograde:"grM1",condition:[["onlock","or","calc",__tgm3mastergradeforumla,">",null,17]]},{tograde:"grM8",condition:[["onlock","or","calc",__tgm3mastergradeforumla,"<",null,17]]}]},
			grM1:{label:"M1",promote:[{tograde:"grM2",condition:[["onlock","or","calc",__tgm3mastergradeforumla,">",null,18]]},{tograde:"grM9",condition:[["onlock","or","calc",__tgm3mastergradeforumla,"<",null,18]]}]},
			grM2:{label:"M2",promote:[{tograde:"grM3",condition:[["onlock","or","calc",__tgm3mastergradeforumla,">",null,19]]},{tograde:"grM1",condition:[["onlock","or","calc",__tgm3mastergradeforumla,"<",null,19]]}]},
			grM3:{label:"M3",promote:[{tograde:"grM4",condition:[["onlock","or","calc",__tgm3mastergradeforumla,">",null,20]]},{tograde:"grM2",condition:[["onlock","or","calc",__tgm3mastergradeforumla,"<",null,20]]}]},
			grM4:{label:"M4",promote:[{tograde:"grM5",condition:[["onlock","or","calc",__tgm3mastergradeforumla,">",null,21]]},{tograde:"grM3",condition:[["onlock","or","calc",__tgm3mastergradeforumla,"<",null,21]]}]},
			grM5:{label:"M5",promote:[{tograde:"grM6",condition:[["onlock","or","calc",__tgm3mastergradeforumla,">",null,22]]},{tograde:"grM4",condition:[["onlock","or","calc",__tgm3mastergradeforumla,"<",null,22]]}]},
			grM6:{label:"M6",promote:[{tograde:"grM7",condition:[["onlock","or","calc",__tgm3mastergradeforumla,">",null,23]]},{tograde:"grM5",condition:[["onlock","or","calc",__tgm3mastergradeforumla,"<",null,23]]}]},
			grM7:{label:"M7",promote:[{tograde:"grM8",condition:[["onlock","or","calc",__tgm3mastergradeforumla,">",null,24]]},{tograde:"grM6",condition:[["onlock","or","calc",__tgm3mastergradeforumla,"<",null,24]]}]},
			grM8:{label:"M8",promote:[{tograde:"grM9",condition:[["onlock","or","calc",__tgm3mastergradeforumla,">",null,25]]},{tograde:"grM7",condition:[["onlock","or","calc",__tgm3mastergradeforumla,"<",null,25]]}]},
			grM9:{label:"M9",promote:[{tograde:"grM",condition:[["onlock","or","calc",__tgm3mastergradeforumla,">",null,26]]},{tograde:"grM8",condition:[["onlock","or","calc",__tgm3mastergradeforumla,"<",null,26]]}]},
			
			grM:{label:"M",promote:[{tograde:"grMK",condition:[["onlock","or","calc",__tgm3mastergradeforumla,">",null,27]]},{tograde:"gr9",condition:[["onlock","or","calc",__tgm3mastergradeforumla,"<",null,27]]}]},
			grMK:{label:"MK",promote:[{tograde:"grMV",condition:[["onlock","or","calc",__tgm3mastergradeforumla,">",null,28]]},{tograde:"grM",condition:[["onlock","or","calc",__tgm3mastergradeforumla,"<",null,28]]}]},
			grMV:{label:"MV",promote:[{tograde:"grMO",condition:[["onlock","or","calc",__tgm3mastergradeforumla,">",null,29]]},{tograde:"grMK",condition:[["onlock","or","calc",__tgm3mastergradeforumla,"<",null,29]]}]},
			grMO:{label:"MO",promote:[{tograde:"grMMM",condition:[["onlock","or","calc",__tgm3mastergradeforumla,">",null,30]]},{tograde:"grMV",condition:[["onlock","or","calc",__tgm3mastergradeforumla,"<",null,30]]}]},
			grMMM:{label:"MMM",promote:[{tograde:"grGm",condition:[["onlock","or","calc",__tgm3mastergradeforumla,">",null,31]]},{tograde:"grMO",condition:[["onlock","or","calc",__tgm3mastergradeforumla,"<",null,31]]}]},
			grGm:{label:"Gm",promote:[{tograde:"grMMM",condition:[["onlock","or","calc",__tgm3mastergradeforumla,"<",null,32]]}]},
			
		}
	]
};


// Number of section completed under a minute -1 if a section is regret (under the minute)
var __tgm3shirasegradeforumla=[{op:"+",value:["data","cool"]},{op:"-",value:["data","regret"]}];
block.grades.tgm3shirase={ // TGM3 shirase grading. Can move up and down, regarding the composed grade formula - http://www.tetrisconcept.net/wiki/Tetris_The_Grand_Master_3_Terror-Instinct
	starting:["grS1"],
	grades:[
		{ // Base series of grades
			grS1:{label:"S1",promote:[{tograde:"grS2",condition:[["onlock","or","calc",__tgm3shirasegradeforumla,">",null,0]]}]},
			grS2:{label:"S2",promote:[{tograde:"grS3",condition:[["onlock","or","calc",__tgm3shirasegradeforumla,">",null,1]]},{tograde:"grS1",condition:[["onlock","or","calc",__tgm3shirasegradeforumla,"<",null,1]]}]},
			grS3:{label:"S3",promote:[{tograde:"grS4",condition:[["onlock","or","calc",__tgm3shirasegradeforumla,">",null,2]]},{tograde:"grS2",condition:[["onlock","or","calc",__tgm3shirasegradeforumla,"<",null,2]]}]},
			grS4:{label:"S4",promote:[{tograde:"grS5",condition:[["onlock","or","calc",__tgm3shirasegradeforumla,">",null,3]]},{tograde:"grS3",condition:[["onlock","or","calc",__tgm3shirasegradeforumla,"<",null,3]]}]},
			grS5:{label:"S5",promote:[{tograde:"grS6",condition:[["onlock","or","calc",__tgm3shirasegradeforumla,">",null,4]]},{tograde:"grS4",condition:[["onlock","or","calc",__tgm3shirasegradeforumla,"<",null,4]]}]},
			grS6:{label:"S6",promote:[{tograde:"grS7",condition:[["onlock","or","calc",__tgm3shirasegradeforumla,">",null,5]]},{tograde:"grS5",condition:[["onlock","or","calc",__tgm3shirasegradeforumla,"<",null,5]]}]},
			grS7:{label:"S7",promote:[{tograde:"grS8",condition:[["onlock","or","calc",__tgm3shirasegradeforumla,">",null,6]]},{tograde:"grS6",condition:[["onlock","or","calc",__tgm3shirasegradeforumla,"<",null,6]]}]},
			grS8:{label:"S8",promote:[{tograde:"grS9",condition:[["onlock","or","calc",__tgm3shirasegradeforumla,">",null,7]]},{tograde:"grS7",condition:[["onlock","or","calc",__tgm3shirasegradeforumla,"<",null,7]]}]},
			grS9:{label:"S9",promote:[{tograde:"grM1",condition:[["onlock","or","calc",__tgm3shirasegradeforumla,">",null,8]]},{tograde:"grS8",condition:[["onlock","or","calc",__tgm3shirasegradeforumla,"<",null,8]]}]},
			grM1:{label:"M1",promote:[{tograde:"grM2",condition:[["onlock","or","calc",__tgm3shirasegradeforumla,">",null,9]]},{tograde:"grS9",condition:[["onlock","or","calc",__tgm3shirasegradeforumla,"<",null,9]]}]},
			grM2:{label:"M2",promote:[{tograde:"grM3",condition:[["onlock","or","calc",__tgm3shirasegradeforumla,">",null,10]]},{tograde:"grM1",condition:[["onlock","or","calc",__tgm3shirasegradeforumla,"<",null,10]]}]},
			grM3:{label:"M3",promote:[{tograde:"grM4",condition:[["onlock","or","calc",__tgm3shirasegradeforumla,">",null,11]]},{tograde:"grM2",condition:[["onlock","or","calc",__tgm3shirasegradeforumla,"<",null,11]]}]},
			grM4:{label:"M4",promote:[{tograde:"grM3",condition:[["onlock","or","calc",__tgm3shirasegradeforumla,"<",null,12]]}]}
			
		}
	]
};

block.extraactions.tgm3shirase=function(th,phase,done) { // Rising garbage in shirase mode
	if (th.data._tgm3shirase==null) {
		th.data._tgm3shirase=[{level:599,cap:20},{level:699,cap:18},{level:799,cap:10},{level:899,cap:9},{level:999,cap:8}];
		th.data.mycounter=0;
	}
	if (phase=="onlock") {
		if (done&&done.cnt) {
			th.data.mycounter-=done.cnt;
			if (th.data.mycounter<=0) th.data.mycounter=0;
		} else th.data.mycounter++;
		if ((th.level<=999)&&(th.data.mycounter>=help.getArrayIndexed(th.data._tgm3shirase,th.level,"level").cap)) {
			block.pushline(th,block.randomgarbage(th,0,1));
			th.data.mycounter=0;
		}
	}
};

block.extraactions.tgm3easy=function(th,phase,done) { // Hanabi
	if (th.data.hanabi==null) {
		th.data.hanabi=0;
		th.data.hanaframes=help.seq(0,48,block.getframeskip(th));
		
		th.config.gfx.blits.push({type:"blit",dx:90,dy:145,tileset:"small-lbl",tile:5});
		th.config.gfx.blits.push({type:"label",subj:"data",label:"hanabi",dx:120,dy:143,font:"small-digitgray"});

	}
	if (phase=="onlock") {
		var hanabi=0;
		if (done.cnt) hanabi+=done.cnt+th.falling.tspins+(th.stagelabel=="roll"?1:0);
		if (th.combo.length>1) hanabi+=th.combo.length-1;
		if (th.falling.spins) hanabi++;
		for (var x=0;x<hanabi;x++)
			toys.generate.sparks.simple({x:th.gfx.x+help.random(0,th.gfx.fieldw),y:th.gfx.y+help.random(0,th.gfx.fieldhh),hw:1,hh:1},"sparks",null,{delay:x*block.convertmsec(th,200),tileset:"hanabi"+help.random(0,7),frames:{speed:1,frames:th.data.hanaframes}});
		
		th.data.hanabi+=hanabi;
		if (th.debugging&&hanabi) block.debug(th,"Added "+hanabi+" hanabi (tot:"+th.data.hanabi+")");
	}
};


block.lines["tgm3"]=function(th,linedata) {
   if (linedata.cnt) {
	var combo=1;
	for (var i=0;i<th.combo.length;i++) // Calculates combo
		combo+=(th.combo[i]*2)-2;
	if (th.debugging) block.debug(th,"Score: (CEIL("+((th.level+linedata.cnt)/4)+"+"+th.falling.softdrop+"+"+th.falling.harddrop+")*"+linedata.cnt+"*"+combo+"+CEIL("+block.getcappedlevel(th,th.level+linedata.cnt)+"/2)+("+(th.falling.activetime-th.config.timing.lockdelay)+")");
	block.addscore(th,((Math.ceil((th.level+linedata.cnt)/4)+th.falling.softdrop+th.falling.harddrop)*linedata.cnt*combo)+Math.ceil(block.getcappedlevel(th,th.level+linedata.cnt)/2)+(th.falling.activetime-th.config.timing.lockdelay));
  }
};

block.gamemodes.tgm3={
	label:"TETRIS THE GRANDMASTER 3",
	year:"2005",
	notes:["MISSING SAKURA MODE.","MISSING MEDALS.","EASY HANABI COUNT IS NOT ORIGINAL."],
	modes:[]
}


block.gamemodes.tgm3.modes.push({label:"CLASSIC EASY",id:"sim-tgm3-classic-easy"});	 
block.library["sim-tgm3-classic-easy"]=function(th) {
		  
	// CONFIRMED
	th.config.field.height=21;
	th.config.field.width=12;
	th.config.field.hold=true;
	th.config.field.holdcount=1;
	th.config.next.randomizer="tgm3";
	th.config.next.count=3;
	th.config.timing.are=block.convertframes(th,25);
	th.config.control.das=block.convertframes(th,14); // frames of hold
	th.config.timing.lockdelay=block.convertframes(th,30);
	th.config.timing.linecleardelay=block.convertframes(th,40-25); // Is the wiki lineclear - are?
	th.config.control.keyhold=true;
	th.config.field.ghost=true;
	th.config.score.levelscores=[1,2,4,6];
	th.config.score.gamemode="tgm3master"; 
	th.config.field.extraactions="tgm3easy"; // With garbage growing
	th.config.score.torikan="tgm3easy";
	block.loadlibrary(th,"rot-ars-tgm3");
	th.config.score.style="tgm3";
	th.config.control.ihs=true;  // Initial Hold System
	th.config.control.irs=true; // Initial Rotation System

	// TO BE CONFIRMED
	th.config.control.irs180=true; // Initial Rotation System 180 degrees (rotleft+rotright)
	th.config.control.ims=true; // Initial Movement System
 	th.config.timing.stickstoppable=true;
	
	// GRAPHICS
	th.config.gfx.tileset="brick-tgm";
	th.config.gfx.drawborder="rgb(255,255,255)";
	th.config.gfx.lockanimation={type:"flash",duration:2,onharddrop:true};
	th.config.gfx.blits[th.config.gfx.blitsfieldindex]={type:"blit",dx:-8,dy:-8,tileset:"fields",tile:5};
	th.config.gfx.clearlineanimation="void";
	th.config.gfx.breaksparks={type:"bricks",accy:-5};
}

block.gamemodes.tgm3.modes.push({label:"CLASSIC MASTER",id:"sim-tgm3-classic-master"});	 
block.library["sim-tgm3-classic-master"]=function(th) {
	block.loadlibrary(th,"sim-tgm3-classic-easy");
	th.config.score.gamemode="tgm3master";
	th.config.score.sectionmarks="tgm3master";
	th.config.score.torikan="tgm3master";
	th.config.score.internalgrade="tgm3";
	th.config.score.grading="tgm3master";
	th.config.field.extraactions=null;
}

block.gamemodes.tgm3.modes.push({label:"CLASSIC SHIRASE",id:"sim-tgm3-classic-shirase"});
block.library["sim-tgm3-classic-shirase"]=function(th) {
	block.loadlibrary(th,"sim-tgm3-classic-easy");
	th.config.score.gamemode="tgm3shirase";
	th.config.score.sectionmarks="tgm3shirase";
	th.config.score.torikan="tgm3shirase";
	th.config.score.internalgrade=null;
	th.config.score.grading="tgm3shirase";
	th.config.field.extraactions="tgm3shirase"; // With garbage growing
}

// WORLD MODES (with SRS rotation)

block.gamemodes.tgm3.modes.push({label:"WORLD EASY",id:"sim-tgm3-world-easy"});
block.library["sim-tgm3-world-easy"]=function(th) {
	block.loadlibrary(th,"sim-tgm3-classic-easy");
	block.loadlibrary(th,"rot-arikasrs");
	th.config.gfx.tileset="brick-world";
}

block.gamemodes.tgm3.modes.push({label:"WORLD MASTER",id:"sim-tgm3-world-master"});	 
block.library["sim-tgm3-world-master"]=function(th) {
	block.loadlibrary(th,"sim-tgm3-classic-master");
	block.loadlibrary(th,"rot-arikasrs");
	th.config.gfx.tileset="brick-world";
}


block.gamemodes.tgm3.modes.push({label:"WORLD SHIRASE",id:"sim-tgm3-world-shirase"});	 
block.library["sim-tgm3-world-shirase"]=function(th) {
	block.loadlibrary(th,"sim-tgm3-classic-shirase");
	block.loadlibrary(th,"rot-arikasrs");
	th.config.gfx.tileset="brick-world";
	th.config.score.torikan="tgm3shiraseworld";
}

