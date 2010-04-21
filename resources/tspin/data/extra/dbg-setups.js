// Debug environments for many tests

block.gamemodes.debug={
	label:"DEBUG",
	year:"----",
	modes:[]
}

// ---

block.gamemodes.debug.modes.push({label:"DBG TGM3-TDS WORLD I-TETRIS2",id:"test-tgm3classicitetris2-debug"});  // http://www.arika.co.jp/product/tgm3/index.html
block.library["test-tgm3classicitetris2-debug"]=function(th,id) { 
		//block.loadlibrary(th,"sim-tgm3-world-master"); // Doable rotating counterwise (Z)
		block.loadlibrary(th,"sim-tds"); // NOT Doable rotating counterwise (Z)
}
block.tests["test-tgm3classicitetris2-debug"]=function(th,id) {  

	block.nextmodels[th.config.next.randomizer].poweron="0000000"; // Put this I for a tetris for GM rankings and test the recovery
	
	block.pushline(th,[0,0,0,0,0,0,null,0,0,null]);
	block.pushline(th,[0,0,0,0,0,0,null,0,0,null]);
	block.pushline(th,[0,0,0,0,0,0,0,0,0,null]);
	block.pushline(th,[0,0,0,0,0,0,0,0,0,null]);
	block.pushline(th,[0,0,0,0,0,0,0,0,0,null]);
	block.pushline(th,[0,0,0,0,0,0,0,0,0,null]);
}


// ---

block.gamemodes.debug.modes.push({label:"DBG TGM3-TDS WORLD I-TETRIS",id:"test-tgm3classicitetris-debug"});  // http://www.arika.co.jp/product/tgm3/index.html
block.library["test-tgm3classicitetris-debug"]=function(th,id) { 
		block.loadlibrary(th,"sim-tgm3-world-master"); // Doable
		// block.loadlibrary(th,"sim-tds"); // Doable
}
block.tests["test-tgm3classicitetris-debug"]=function(th,id) {  

	block.nextmodels[th.config.next.randomizer].poweron="0000000"; // Put this I for a tetris for GM rankings and test the recovery
	
	block.pushline(th,[null,0,0,null,0,0,0,0,0,0]);
	block.pushline(th,[null,0,0,null,0,0,0,0,0,0]);
	block.pushline(th,[null,0,0,0,0,0,0,0,0,0]);
	block.pushline(th,[null,0,0,0,0,0,0,0,0,0]);
	block.pushline(th,[null,0,0,0,0,0,0,0,0,0]);
	block.pushline(th,[null,0,0,0,0,0,0,0,0,0]);
}

// ---

block.gamemodes.debug.modes.push({label:"DBG TGM3 CLASSIC J-CLIMB",id:"test-tgm3classicjclimb-debug"});  // http://www.arika.co.jp/product/tgm3/index.html
block.library["test-tgm3classicjclimb-debug"]=function(th,id) { 
		block.loadlibrary(th,"sim-tgm3-classic-master");
}
block.tests["test-tgm3classicjclimb-debug"]=function(th,id) {  

	block.nextmodels[th.config.next.randomizer].poweron="333333"; // Put this I for a tetris for GM rankings and test the recovery
	
	block.pushline(th,[null,null,null,null,null,null,null,null,null,0]);
	block.pushline(th,[null,null,null,null,null,null,0,null,null,0]);
	block.pushline(th,[null,null,null,0,0,0,0,0,0,0]);
	block.pushline(th,[null,null,null,0,0,0,0,0,0,0]);
}

// ---

block.gamemodes.debug.modes.push({label:"DBG TGM3 WORLD J-CLIMB",id:"test-tgm3worldjclimb-debug"});  // http://www.arika.co.jp/product/tgm3/index.html
block.library["test-tgm3worldjclimb-debug"]=function(th,id) { 
		block.loadlibrary(th,"sim-tgm3-world-master");
}
block.tests["test-tgm3worldjclimb-debug"]=function(th,id) {  

	block.nextmodels[th.config.next.randomizer].poweron="333333"; // Put this I for a tetris for GM rankings and test the recovery
	
	block.pushline(th,[null,null,null,null,null,null,null,null,null,0]);
	block.pushline(th,[null,null,null,null,null,null,0,null,null,0]);
	block.pushline(th,[null,null,null,0,0,0,0,0,0,0]);
	block.pushline(th,[null,null,null,0,0,0,0,0,0,0]);
}

// ---

block.gamemodes.debug.modes.push({label:"DBG TGM3 CLASSIC SHIRASE",id:"test-tgm3shirase-debug"});  // Simplified tgm3  death mode for testing. 
block.library["test-tgm3shirase-debug"]=function(th,id) { 
		block.loadlibrary(th,"sim-tgm3-classic-shirase");
}
block.tests["test-tgm3shirase-debug"]=function(th,id) {  // Simplified grading/levels system for testing. End in 01:20 (use hard drops) and do at least 5 lines for GM grade. Wait a bit while blocks are falling to fail last GM check.
	th.config.score.gamemode="debugtgm3shirase";
	th.config.score.sectionmarks="debugtgm3shirase";
	th.config.score.torikan="debugtgm3shirase";
	
	block.nextmodels[th.config.next.randomizer].poweron="1101"; // Put this I for a tetris for GM rankings and test the recovery
	block.pushline(th,[0,0,0,0,0,0,0,null,null,null]);
	block.pushline(th,[0,0,0,0,0,0,0,0,null,0]);
	block.pushline(th,[0,0,0,0,0,0,0,null,null,null]);
	block.pushline(th,[0,0,0,0,0,0,0,0,null,0]);
	
	block.pushline(th,[0,0,null,0,0,0,0,0,0,0]);
	block.pushline(th,[0,0,null,0,0,0,0,0,0,0]);
	block.pushline(th,[0,0,null,0,0,0,0,0,0,0]);
	block.pushline(th,[0,0,null,0,0,0,0,0,0,0]);
	
	block.pushline(th,[0,0,0,0,0,0,0,null,null,null]);
	block.pushline(th,[0,0,0,0,0,0,0,0,null,0]);
}

// ---

block.gamemodes.debug.modes.push({label:"DBG TGM3 CLASSIC MASTER",id:"test-tgm3master-debug"});  // Simplified tgm3  death mode for testing. 
block.library["test-tgm3master-debug"]=function(th,id) { 
		block.loadlibrary(th,"sim-tgm3-classic-master");
}
block.tests["test-tgm3master-debug"]=function(th,id) {  // Simplified grading/levels system for testing. End in 01:20 (use hard drops) and do at least 5 lines for GM grade. Wait a bit while blocks are falling to fail last GM check.
	th.config.score.gamemode="debugtgm3master"; // Are about the same
	th.config.score.sectionmarks="debugtgm3master"; // With cool/regret
	th.config.score.torikan="debugtgm3master"; // With invisible rolls
	th.config.score.internalgrade="debugtgm3"; // With gradesboost
	//th.config.score.grading="debugtgm2death";
	//th.config.score.medals="debugtgm2";
	//th.config.score.torikan="debugtgm2death";
	
	block.nextmodels[th.config.next.randomizer].poweron="1101"; // Put this I for a tetris for GM rankings and test the recovery
	block.pushline(th,[0,0,0,0,0,0,0,null,null,null]);
	block.pushline(th,[0,0,0,0,0,0,0,0,null,0]);
	block.pushline(th,[0,0,0,0,0,0,0,null,null,null]);
	block.pushline(th,[0,0,0,0,0,0,0,0,null,0]);
	
	block.pushline(th,[0,0,null,0,0,0,0,0,0,0]);
	block.pushline(th,[0,0,null,0,0,0,0,0,0,0]);
	block.pushline(th,[0,0,null,0,0,0,0,0,0,0]);
	block.pushline(th,[0,0,null,0,0,0,0,0,0,0]);
	
	block.pushline(th,[0,0,0,0,0,0,0,null,null,null]);
	block.pushline(th,[0,0,0,0,0,0,0,0,null,0]);
}

// ---

block.gamemodes.debug.modes.push({label:"DBG TGM3 CLASSIC EASY",id:"test-tgm3easy-debug"});  // Simplified tgm3  death mode for testing. 
block.library["test-tgm3easy-debug"]=function(th,id) { 
		block.loadlibrary(th,"sim-tgm3-classic-easy");
}
block.tests["test-tgm3easy-debug"]=function(th,id) {  // Simplified grading/levels system for testing. End in 01:20 (use hard drops) and do at least 5 lines for GM grade. Wait a bit while blocks are falling to fail last GM check.
	th.config.score.gamemode="debugtgm3master"; // Are about the same
	th.config.score.torikan="debugtgm3easy"; // Limit to 20
	
	block.nextmodels[th.config.next.randomizer].poweron="1101"; // Put this I for a tetris for GM rankings and test the recovery
	block.pushline(th,[0,0,0,0,0,0,0,null,null,null]);
	block.pushline(th,[0,0,0,0,0,0,0,0,null,0]);
	block.pushline(th,[0,0,0,0,0,0,0,null,null,null]);
	block.pushline(th,[0,0,0,0,0,0,0,0,null,0]);
	
	block.pushline(th,[0,0,null,0,0,0,0,0,0,0]);
	block.pushline(th,[0,0,null,0,0,0,0,0,0,0]);
	block.pushline(th,[0,0,null,0,0,0,0,0,0,0]);
	block.pushline(th,[0,0,null,0,0,0,0,0,0,0]);
	
	block.pushline(th,[0,0,0,0,0,0,0,null,null,null]);
	block.pushline(th,[0,0,0,0,0,0,0,0,null,0]);
}


// ---

block.gamemodes.debug.modes.push({label:"DBG TGM2 MASTER",id:"test-tgm2master-debug"});
block.library["test-tgm2master-debug"]=function(th,id) { 
		block.loadlibrary(th,"sim-tgm2-normal");
}
block.tests["test-tgm2master-debug"]=function(th,id) {   // Simplified tgm2  master mode for testing. 
	th.config.score.gamemode="debugtgm2master";
	th.config.score.sectionmarks="debugtgm2master";
	th.config.score.internalgrade="debugtgm2";
	th.config.score.grading="debugtgm2";
	th.config.score.medals="debugtgm2";
	th.config.score.blocksforcritical=50; // Easy recovery medal
	th.config.score.blocksforrecovery=30;
	
	block.nextmodels[th.config.next.randomizer].poweron="1101"; // Put this I for a tetris for GM rankings and test the recovery
	block.pushline(th,[0,0,0,0,0,0,0,null,null,null]);
	block.pushline(th,[0,0,0,0,0,0,0,0,null,0]);
	block.pushline(th,[0,0,0,0,0,0,0,null,null,null]);
	block.pushline(th,[0,0,0,0,0,0,0,0,null,0]);
	
	block.pushline(th,[0,0,null,0,0,0,0,0,0,0]);
	block.pushline(th,[0,0,null,0,0,0,0,0,0,0]);
	block.pushline(th,[0,0,null,0,0,0,0,0,0,0]);
	block.pushline(th,[0,0,null,0,0,0,0,0,0,0]);
	
	block.pushline(th,[0,0,0,0,0,0,0,null,null,null]);
	block.pushline(th,[0,0,0,0,0,0,0,0,null,0]);
}

// ---

block.gamemodes.debug.modes.push({label:"DBG TGM2 DEATH",id:"test-tgm2death-debug"});  // Simplified tgm2  death mode for testing. 
block.library["test-tgm2death-debug"]=function(th,id) { 
		block.loadlibrary(th,"sim-tgm2-death");
}
block.tests["test-tgm2death-debug"]=function(th,id) {  // Simplified grading/levels system for testing. End in 01:20 (use hard drops) and do at least 5 lines for GM grade. Wait a bit while blocks are falling to fail last GM check.
	th.config.score.gamemode="debugtgm2death";
	th.config.score.sectionmarks="debugtgm2master";
	th.config.score.grading="debugtgm2death";
	th.config.score.medals="debugtgm2";
	th.config.score.torikan="debugtgm2death";
	block.nextmodels[th.config.next.randomizer].poweron="1101"; // Put this I for a tetris for GM rankings and test the recovery
	block.pushline(th,[0,0,0,0,0,0,0,null,null,null]);
	block.pushline(th,[0,0,0,0,0,0,0,0,null,0]);
	block.pushline(th,[0,0,0,0,0,0,0,null,null,null]);
	block.pushline(th,[0,0,0,0,0,0,0,0,null,0]);
	
	block.pushline(th,[0,0,null,0,0,0,0,0,0,0]);
	block.pushline(th,[0,0,null,0,0,0,0,0,0,0]);
	block.pushline(th,[0,0,null,0,0,0,0,0,0,0]);
	block.pushline(th,[0,0,null,0,0,0,0,0,0,0]);
	
	block.pushline(th,[0,0,0,0,0,0,0,null,null,null]);
	block.pushline(th,[0,0,0,0,0,0,0,0,null,0]);
}
// ---

block.gamemodes.debug.modes.push({label:"DBG ARSTGM3 T-KICKS",id:"test-arstgm3-tkicks"});
block.library["test-arstgm3-tkicks"]=function(th,id) { // T can escape holes
	block.loadlibrary(th,"sim-tgm3-classic-easy");
}
block.tests["test-arstgm3-tkicks"]=function(th,id) {
	block.pushline(th,[0,null,null,null,null,null,null,null,null,null]);
	block.pushline(th,[0,0,null,0,0,0,0,0,0,0]);
	th.config.control.spinevaluator="all";
	th.config.next.randomizer="debugt";
}

// ---

block.gamemodes.debug.modes.push({label:"DBG ARSTGM3 I-KICKS",id:"test-arstgm3-ikicks"});
block.library["test-arstgm3-ikicks"]=function(th,id) { // Kick horizontally by 2, vertically only once and only if locked
	block.loadlibrary(th,"sim-tgm3-classic-easy");
}
block.tests["test-arstgm3-ikicks"]=function(th,id) {
	block.pushline(th,[0,0,0,0,0,null,null,null,null,null]);
	block.pushline(th,[0,0,0,0,0,null,null,null,null,null]);
	block.pushline(th,[0,0,0,0,0,null,null,null,null,null]);
	block.pushline(th,[null,0,0,0,0,0,0,0,0,0]);
	block.pushline(th,[null,0,0,0,0,0,0,0,0,0]);
	block.pushline(th,[null,0,0,0,0,0,0,0,0,0]);
	th.config.control.spinevaluator="all";
	th.config.next.randomizer="debugi";
}


// ---

block.gamemodes.debug.modes.push({label:"DBG TGM",id:"test-tgm-debug"});
block.library["test-tgm-debug"]=function(th,id) { 
		block.loadlibrary(th,"sim-tgm");
}
block.tests["test-tgm-debug"]=function(th,id) {  // Simplified grading/levels system for testing. End in 01:20 (use hard drops) and do at least 5 lines for GM grade. Wait a bit while blocks are falling to fail last GM check.
	th.config.score.grading="debugtgm";
	th.config.score.gamemode="debugtgm";

	block.nextmodels[th.config.next.randomizer].poweron="1101"; // Put this I for a tetris for GM rankings and test the recovery
	block.pushline(th,[0,0,0,0,0,0,0,null,null,null]);
	block.pushline(th,[0,0,0,0,0,0,0,0,null,0]);
	block.pushline(th,[0,0,0,0,0,0,0,null,null,null]);
	block.pushline(th,[0,0,0,0,0,0,0,0,null,0]);
	
	block.pushline(th,[0,0,null,0,0,0,0,0,0,0]);
	block.pushline(th,[0,0,null,0,0,0,0,0,0,0]);
	block.pushline(th,[0,0,null,0,0,0,0,0,0,0]);
	block.pushline(th,[0,0,null,0,0,0,0,0,0,0]);
	
	block.pushline(th,[0,0,0,0,0,0,0,null,null,null]);
	block.pushline(th,[0,0,0,0,0,0,0,0,null,0]);


}

// ---

block.gamemodes.debug.modes.push({label:"DBG BACK-TO-BACK",id:"test-tds-b2b"});
block.library["test-tds-b2b"]=function(th,id) { // SRS TESTED - http://www.tetrisconcept.net/wiki/SRS
		block.loadlibrary(th,"sim-tds");
}
block.tests["test-tds-b2b"]=function(th,id) {
	for (var i=0;i<20;i++)
		block.pushline(th,[0,0,0,0,0,null,0,0,0,0]);
	th.config.next.randomizer="debugi";	
}

// ---

block.gamemodes.debug.modes.push({label:"DBG SRS IMMOBILE SPIN",id:"test-srs-immobleonlyspin"});
block.library["test-srs-immobleonlyspin"]=function(th,id) { // SRS TESTED (for tetris worlds) - http://www.tetrisconcept.net/wiki/SRS
	block.loadlibrary(th,"sim-tds");
}
block.tests["test-srs-immobleonlyspin"]=function(th,id) {
	block.pushline(th,[null,null,null,null,null,null,0,0,null,null]);
	block.pushline(th,[0,0,0,0,null,null,null,0,0,0]);
	block.pushline(th,[0,0,0,0,null,null,0,0,0,0]);
	th.config.control.spinevaluator="all";
	th.config.next.randomizer="debugt";
}

// ---

block.gamemodes.debug.modes.push({label:"DBG SRS TSPIN NOKICK",id:"test-srs-tspin-nokick"});
block.library["test-srs-tspin-nokick"]=function(th,id) { // SRS TESTED (also valid for sega rotation system) - http://www.tetrisconcept.net/wiki/SRS
	block.loadlibrary(th,"sim-tds");
}
block.tests["test-srs-tspin-nokick"]=function(th,id) {
	block.pushline(th,[null,null,null,null,null,null,0,0,null,null]);
	block.pushline(th,[0,0,0,0,null,null,null,0,0,0]);
	block.pushline(th,[0,0,0,0,0,null,0,0,0,0]);
	th.config.control.spinevaluator="all";
	th.config.next.randomizer="debugt";
}

// ---

block.gamemodes.debug.modes.push({label:"DBG SGA TSPIN NOKICK SEGA",id:"test-srs-tspin-nokick-sega"});
block.library["test-srs-tspin-nokick-sega"]=function(th,id) { // SRS TESTED (also valid for sega rotation system) - http://www.tetrisconcept.net/wiki/SRS
	block.loadlibrary(th,"sim-sega-easy");
}
block.tests["test-srs-tspin-nokick-sega"]=function(th,id) {
	block.tests["test-srs-tspin-nokick"](th,id);
}


// ---

block.gamemodes.debug.modes.push({label:"DBG SRS TRIPLE SPIN",id:"test-tripletspin"});
block.library["test-tripletspin"]=function(th,id) { // SRS TESTED - http://www.youtube.com/watch?v=7x7CLknMMMQ
		block.loadlibrary(th,"sim-tds");
}
block.tests["test-tripletspin"]=function(th,id) {
	block.pushline(th,[null,null,0,0,0,0,0,0,0,0]);
	block.pushline(th,[null,null,null,0,0,0,0,0,0,0]);
	block.pushline(th,[0,0,null,0,0,0,0,0,0,0]);
	block.pushline(th,[0,null,null,0,0,0,0,0,0,0]);
	block.pushline(th,[0,0,null,0,0,0,0,0,0,0]);
	block.pushline(th,[0,0,null,0,0,0,0,0,0,0]);
	th.config.control.spinevaluator="all";
	th.config.next.randomizer="debugt";
}

// ---

block.gamemodes.debug.modes.push({label:"DBG SRS J-SPIN",id:"test-srs-jspin"});
block.library["test-srs-jspin"]=function(th,id) { // SRS TESTED - http://www.tetrisconcept.net/wiki/SRS
		block.loadlibrary(th,"sim-tds");
}
block.tests["test-srs-jspin"]=function(th,id) {
	block.pushline(th,[null,null,null,null,0,0,0,null,null,null]);
	block.pushline(th,[null,null,null,null,null,0,0,0,null,null]);
	block.pushline(th,[null,null,null,null,null,null,0,0,0,0]);
	block.pushline(th,[null,0,0,0,null,null,null,0,0,0]);
	block.pushline(th,[0,0,null,null,null,null,0,0,0,0]);
	block.pushline(th,[0,0,0,0,null,null,0,0,0,0]);
	block.pushline(th,[0,0,0,0,0,null,0,0,0,0]);
	th.config.control.spinevaluator="all";
	th.config.next.randomizer="debugj";
}

// ---


block.gamemodes.debug.modes.push({label:"DBG SRS TDS DEPTH",id:"test-tds-depth"});
block.library["test-tds-depth"]=function(th,id) { // SRS TESTED - http://www.tetrisconcept.net/wiki/SRS
		block.loadlibrary(th,"sim-tds");
}
block.tests["test-tds-depth"]=function(th,id) {
	for (var i=0;i<30;i++)
		block.pushline(th,[0,null,null,null,null,null,null,null,null,0]);
	th.config.next.randomizer="debugi";	
}

// ---

block.gamemodes.debug.modes.push({label:"DBG SEGA TETRIS CEILING",id:"test-sega-ceiling"});
block.library["test-sega-ceiling"]=function(th,id) { // Sega tetris has ceiling
		block.loadlibrary(th,"sim-sega-easy");
}
block.tests["test-sega-ceiling"]=function(th,id) {
	th.config.next.randomizer="debugi";	
}

// ---

block.gamemodes.debug.modes.push({label:"DBG SEGA TETRIS I-TWIST",id:"test-sega-twist"});
block.library["test-sega-twist"]=function(th,id) {  // An I-Twist example. Turn the I before locking - http://www.tetrisconcept.net/wiki/Tetris_%28Sega%29_Techniques
		block.loadlibrary(th,"sim-sega-easy");
}
block.tests["test-sega-twist"]=function(th,id) {
	th.config.next.randomizer="debugi";	
	block.pushline(th,[0,0,0,0,0,null,0,0,0,0]);
	block.pushline(th,[0,0,0,null,null,null,null,0,0,0]);
	block.pushline(th,[0,0,0,0,0,null,0,0,0,0]);
	block.pushline(th,[0,0,0,0,0,null,0,0,0,0]);
}

// ---

block.gamemodes.debug.modes.push({label:"DBG ARS T-ESCAPE",id:"test-ars-tescape"});
block.library["test-ars-tescape"]=function(th,id) {  // The T escape tecnique is only applicable in TGM3 ARS - http://www.tetrisconcept.net/wiki/TGM_rotation
		block.loadlibrary(th,"sim-tgm");
}
block.tests["test-ars-tescape"]=function(th,id) {
	th.config.next.randomizer="debugt";	
	block.pushline(th,[0,null,null,null,null,null,null,null,null,null]);
	block.pushline(th,[0,null,null,null,null,null,null,null,null,null]);
	block.pushline(th,[0,0,null,0,0,0,0,0,0,0]);
}

// ---

block.gamemodes.debug.modes.push({label:"DBG ARS MIHARA CONSPIRACY L",id:"test-ars-mihara-l"});
block.library["test-ars-mihara-l"]=function(th,id) {  // The L rotation - http://www.tetrisconcept.net/wiki/TGM_rotation
		block.loadlibrary(th,"sim-tgm");
}
block.tests["test-ars-mihara-l"]=function(th,id) {
	th.config.next.randomizer="debugl";
	block.pushline(th,[0,null,null,null,0,0,0,null,null,null]);
	block.pushline(th,[0,null,null,null,0,0,0,null,null,null]);
	block.pushline(th,[0,null,null,null,null,null,0,null,null,null]);
	block.pushline(th,[0,null,0,null,0,0,0,0,null,null]);
	block.pushline(th,[0,0,0,0,0,0,0,0,0,null]);
	block.pushline(th,[0,0,0,0,0,0,0,0,0,null]);
}

// ---

block.gamemodes.debug.modes.push({label:"DBG ARS MIHARA CONSPIRACY J",id:"test-ars-mihara-j"});
block.library["test-ars-mihara-j"]=function(th,id) { 
		block.loadlibrary(th,"sim-tgm");
}
block.tests["test-ars-mihara-j"]=function(th,id) { // The failing J rotation - http://www.tetrisconcept.net/wiki/TGM_rotation
	th.config.next.randomizer="debugj";
	block.pushline(th,[null,null,null,0,0,0,null,null,null,0]);
	block.pushline(th,[null,null,null,0,0,0,null,null,null,0]);
	block.pushline(th,[null,null,null,0,null,null,null,null,null,0]);
	block.pushline(th,[null,null,0,0,0,0,null,0,null,0]);
	block.pushline(th,[null,0,0,0,0,0,0,0,0,0]);
	block.pushline(th,[null,0,0,0,0,0,0,0,0,0]);
}

// ---

block.gamemodes.debug.modes.push({label:"DBG BRAVO",id:"test-bravo"});
block.library["test-bravo"]=function(th,id) { 
		block.loadlibrary(th,"sim-tgm");
}
block.tests["test-bravo"]=function(th,id) { // Bravo detection (field clear) - http://www.tetrisconcept.net/wiki/Glossary#B
block.pushline(th,[0,0,0,0,null,null,null,0,0,0]);
	block.pushline(th,[0,0,0,0,0,null,0,0,0,0]);
	th.config.next.randomizer="debugt";
}

// ---

block.gamemodes.debug.modes.push({label:"DBG TGM COMBO",id:"test-tgm-combo"});
block.library["test-tgm-combo"]=function(th,id) { 
		block.loadlibrary(th,"sim-tgm");
}
block.tests["test-tgm-combo"]=function(th,id) {  // Combo score: 3, 7, 7 - http://www.tetrisconcept.net/wiki/Tetris_The_Grand_Master
	th.config.next.randomizer="debugi";
	block.pushline(th,[null,0,0,0,0,0,0,0,0,0]);
	block.pushline(th,[null,0,0,0,0,0,0,0,0,0]);				
	block.pushline(th,[0,0,0,0,0,0,0,0,0,null]);
	block.pushline(th,[0,0,0,0,0,0,0,0,0,null]);				
	block.pushline(th,[0,0,0,0,0,0,0,0,0,null]);
	block.pushline(th,[0,null,0,0,0,0,0,0,0,0]);				
	block.pushline(th,[0,0,0,0,0,null,0,0,0,0]);
	block.pushline(th,[0,0,0,0,0,null,0,0,0,0]);	
}

