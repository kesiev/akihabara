// Tetris DS parameters - http://www.tetrisconcept.net/wiki/Tetris_DS

block.deadkeys.tdsnorotation=[  true,true,true,true,   false,   false, true];  // DIsable all rotations (for zelda mode)


// TO BE CONFIRMED sicuramente sbagliato. Va a 20G alla fine
block.nextmodels.zeldarandom={bag:"0123456",bagscount:7,randomrotate:true};
block.nextmodels.zeldacustom={bagscount:7,bagscount:0,history:0,starting:"",tries:"unlimited",first:""}; // Bag is randomized by mission

block.roads.tetrisworlds=[ // Classic Tetris Worlds parameters - http://www.tetrisconcept.net/wiki/Tetris_Worlds
	block.defaults.readygo(),
	{setup:{gravity:0.01667},nextstage:[{condition:[["onlock","or","overall","lines",">=",null,10]]}]},
	{setup:{nextstagenumber:true,nextbackground:true,gravity:0.021017},nextstage:[{condition:[["onlock","or","overall","lines",">=",null,20]]}]},
	{setup:{nextstagenumber:true,nextbackground:true,gravity:0.026977},nextstage:[{condition:[["onlock","or","overall","lines",">=",null,30]]}]},
	{setup:{nextstagenumber:true,nextbackground:true,gravity:0.035256},nextstage:[{condition:[["onlock","or","overall","lines",">=",null,40]]}]},
	{setup:{nextstagenumber:true,nextbackground:true,gravity:0.04693},nextstage:[{condition:[["onlock","or","overall","lines",">=",null,50]]}]},
	{setup:{nextstagenumber:true,nextbackground:true,gravity:0.06361},nextstage:[{condition:[["onlock","or","overall","lines",">=",null,60]]}]},
	{setup:{nextstagenumber:true,nextbackground:true,gravity:0.0879},nextstage:[{condition:[["onlock","or","overall","lines",">=",null,70]]}]},
	{setup:{nextstagenumber:true,nextbackground:true,gravity:0.1236},nextstage:[{condition:[["onlock","or","overall","lines",">=",null,80]]}]},
	{setup:{nextstagenumber:true,nextbackground:true,gravity:0.1775},nextstage:[{condition:[["onlock","or","overall","lines",">=",null,90]]}]},
	{setup:{nextstagenumber:true,nextbackground:true,gravity:0.2598},nextstage:[{condition:[["onlock","or","overall","lines",">=",null,100]]}]},
	{setup:{nextstagenumber:true,nextbackground:true,gravity:0.388},nextstage:[{condition:[["onlock","or","overall","lines",">=",null,110]]}]},
	{setup:{nextstagenumber:true,nextbackground:true,gravity:0.59},nextstage:[{condition:[["onlock","or","overall","lines",">=",null,120]]}]},
	{setup:{nextstagenumber:true,nextbackground:true,gravity:0.92},nextstage:[{condition:[["onlock","or","overall","lines",">=",null,130]]}]},
	{setup:{nextstagenumber:true,nextbackground:true,gravity:1.46},nextstage:[{condition:[["onlock","or","overall","lines",">=",null,140]]}]},
	{setup:{nextstagenumber:true,nextbackground:true,gravity:2.36},nextstage:[{condition:[["onlock","or","overall","lines",">=",null,150]]}]},
	block.defaults.playforever()
];

block.lines["tds"]=function(th,linedata) {
	var m=0;
	var base=th.stage+linedata.height;
	switch (linedata.cnt) {
		case 0:{
			if (th.falling.spins)
				if (th.falling.kicked) m=100; else m=400;
			break;
		}
		case 1:{
			if (th.falling.spins)
				if (th.falling.kicked) m=200; else m=800;
			else m=100;
			break;
		}
		case 2:{
			if (th.falling.spins) m=1200;
			else m=300;
			break;
		}
		case 3:{
			if (th.falling.spins) m=1600;
			else m=500;
			break;
		}
		default:{
			m=800;
			break;
		}
	}
	if (m) block.addscore(th,(base*m*(th.backtoback>1?3/2:1))+(th.falling.softdrop)+(th.falling.harddrop*2));
}

block.extraactions.zeldamode=function(th,phase,done) { // Zelda mode
	if (th.data._zeldamode==null) {
		th.config.gfx.blits.push({type:"blit",dx:90,dy:145,tileset:"small-lbl",tile:8});
		th.config.gfx.blits.push({type:"label",subj:"data",label:"strtimer",dx:120,dy:143,font:"small-digitgray"});
		th.data.nextmission="first";
		th.data.missioncount=0;
		th.data.strtimer="";
		phase="onspawn"; // Set the first mission
	}
	if (th.data.nextmission&&(phase=="onspawn")) { // If next mission and gravity is available (i.e. stage started)
		if (th.data.nextmission=="award") for (var i=0;i<4;i++) block.clearline(th,th.config.field.height-2); // Award the player with 4 lines less
		if (th.data.nextmission=="fail") for (var i=0;i<5;i++) block.pushline(th,block.randomgarbage(th,0,1)); // Punish the player with rising garbage
		th.data.missioncount++;
		if (th.data.fixgravity) {
			th.config.timing.gravity=th.data.backupgravity;
			th.data.fixgravity=null;
		}
		if (th.data.oldkeymap) {
			th.config.control.deadkeys=th.data.oldkeymap;
			th.data.oldkeymap=null;
		}
		if (th.data.oldrandomizer) {
			th.config.next.randomizer=th.data.oldrandomizer;
			th.data.oldrandomizer=null;
		}


		th.data.nextmission=false;
		th.data._zeldamode=help.random(0,8); // Select the next mission
		th.data.timer=block.convertmsec(th,60000);
		// Setup the mission
		switch (th.data._zeldamode) {
			case 0: { // Clear a line
				th.data.linetoclear=help.random(1,th.config.field.height-th.config.field.vanishinglines-5);
				break;
			}
			case 1: { // Clear N lines using M piece (if M is -1, is any piece)
				th.data.piecetouse=help.random(-1,block.nextmodels[th.config.next.randomizer].bag.length+1);
				th.data.linetoclear=help.random(1,5);
				break;
			}
			case 2: { // Clear N lines using M piece (if M is -1, is any piece) AT ONCE
				th.data.piecetouse=help.random(-1,block.nextmodels[th.config.next.randomizer].bag.length+1);
				if (th.data.piecetouse==-1) // ANY
					th.data.linetoclear=help.random(1,4);
				else if (th.data.piecetouse==0) // I
					th.data.linetoclear=help.random(1,4); // T, Z, S, O
				else if ((th.data.piecetouse==1)||(th.data.piecetouse==4)||(th.data.piecetouse==5)||(th.data.piecetouse==6))
					th.data.linetoclear=help.random(1,2);
				else // J, L
					th.data.linetoclear=help.random(1,3);
				break;
			}
			case 3: { // Clear 2 lines skipping N
				th.data.linetoclear=help.random(2,2);
				if (th.data.linetoclear==3) th.data.linespacing=1; // TO clear 3 lines at once with a hurdle, you need the I piece with 1 space (3+1=4)
				else th.data.linespacing=help.random(1,2); // To clear 2 lines at once with a hurdle, you can leave 2 space (using an I) or 1 space (all the other pieces)
				break;
			}
			case 4: { // Clear N lines [FAST]
				th.data.linetoclear=help.random(1,5);
				th.data.piecetouse=-1;
				th.data.fixgravity=th.config.timing.gravity+0.8;
				break;
			}
			case 5: { // Clear a line without rotation
				th.data.oldkeymap=th.config.control.deadkeys;
				th.data.oldrandomizer=th.config.next.randomizer;
				th.config.control.deadkeys="tdsnorotation"; // Disable rotations
				th.config.next.randomizer="zeldarandom"; // Random rotation pieces
				break;
			}
			case 6: { // Clear N lines  [limited tetrominos]
				th.data.linetoclear=help.random(1,5);
				block.nextmodels.zeldacustom.bag=help.random(0,7)+""+help.random(0,7);
				th.data.oldrandomizer=th.config.next.randomizer;
				th.config.next.randomizer="zeldacustom";
				th.data.piecetouse=-1;
				block.resetnextqueue(th); // Reset the next queue, so the pieces follows the new sequence
				block.nextpiece(th,null); // the falling piece is replaced with the next one
				break;
			}
			case 7: { // Go for a back to back
				break;
			}
		}
	}
	if (th.data.fixgravity&&th.config.timing.gravity&&(th.config.timing.gravity!=th.data.fixgravity)) { // Keep the gravity fixed, for fast mode
		th.data.backupgravity=th.config.timing.gravity;
		th.config.timing.gravity=th.data.fixgravity;
	}
	if (phase=="onlock") {
		if (th.data.timer<=0) { // If time is up...			
			th.data.nextmission="fail"; // Reset the zelda mode
		} else {
			// Check for mission complete
			switch (th.data._zeldamode) {
				case 0: { // Clear a line
					if (done&&done.cnt)
						for (var i=0;i<done.heights.length;i++) {
							if (done.heights[i]==th.data.linetoclear) {
								// TODO mission clear animation
								th.data.nextmission="award"; // Reset the zelda mode
								break;
							}
						}
					break;
				}
				case 6:
				case 4: // Clear N lines [FAST]
				case 1: { // Clear N lines using M piece
					if (done&&done.cnt&&((th.data.piecetouse==-1)||(th.falling.piece==th.data.piecetouse))) {
						th.data.linetoclear-=done.cnt;
						if (th.data.linetoclear<=0)
							th.data.nextmission="award"; // Reset the zelda mode
					}
					break;
				}
				case 2: { // Clear N lines using M piece at once

					if (done&&done.cnt&&((th.data.piecetouse==-1)||(th.falling.piece==th.data.piecetouse))&&(done.cnt>=th.data.linetoclear))
						th.data.nextmission="award"; // Reset the zelda mode
					break;
				}
				case 3: { // Clear X lines skipping N
					if (done&&done.cnt&&(done.cnt==th.data.linetoclear)) {
						for (var i=0;i<done.heights.length-1;i++) {
							if ((done.heights[i+1]-done.heights[i]-1)==th.data.linespacing) {
								th.data.nextmission="award"; // Reset the zelda mode
								break;
							}
						}
					}
					break;
				}
				case 5: { // Clear a line without rotation
					if (done&&done.cnt)  th.data.nextmission="award"; // Reset the zelda mode
					break;
				}
				case 7: { // Go for a back to back
					if (th.backtoback>1) th.data.nextmission="award"; // Reset the zelda mode
					break;
				}
			}
		}
	} else if ((phase=="blit")) {
		if ((th.data.timer>0)&&block.isgameactive(th)&&!th.data.nextmission) {
			th.data.timer--; // Decreased once per frame
			th.data.strtimer=help.framestotime(th.data.timer);
		}
		// Draw mission data
		gbox.blitText(gbox.getBufferContext(),{font:"small-red",text:"MISSION "+th.data.missioncount+":",dx:th.gfx.x-115,dy:th.gfx.y});
		switch (th.data._zeldamode) {
			case 0: { // Clear a line
				gbox.blitText(gbox.getBufferContext(),{font:"small-gray",text:"CLEAR THIS",dx:th.gfx.x-115,dy:th.gfx.y+10});
				gbox.blitText(gbox.getBufferContext(),{font:"small-gray",text:"LINE!",dx:th.gfx.x-115,dy:th.gfx.y+20});
				gbox.blitText(gbox.getBufferContext(),{font:"small-red",text:"llllllllll",dx:th.gfx.x,dy:th.gfx.y+((th.config.field.height-th.config.field.vanishinglines-th.data.linetoclear-1)*th.gfx.ts.tileh)});
				break;
			}
			case 6: // Limited tetrominos
			case 4: // At once
			case 2: // At once
			case 1: { // Clear N lines using M piece
				gbox.blitText(gbox.getBufferContext(),{font:"small-gray",text:"CLEAR "+th.data.linetoclear+" LINE"+(th.data.linetoclear>1?"S":""),dx:th.gfx.x-115,dy:th.gfx.y+10});
				gbox.blitText(gbox.getBufferContext(),{font:"small-gray",text:(th.data._zeldamode==2?"AT ONCE ":"")+(th.data.fixgravity?"FASTER ":"")+"WITH",dx:th.gfx.x-115,dy:th.gfx.y+20});
				gbox.blitText(gbox.getBufferContext(),{font:"small-gray",text:(th.data._zeldamode==6?"SOME":(th.data.piecetouse==-1?"ANY":"THIS"))+" PIECE!",dx:th.gfx.x-115,dy:th.gfx.y+30});
				if (th.data.piecetouse!=-1) block.rawrenderpiece(th,th.config.field.piecemodel,gbox.getTiles(th.config.gfx.tileset),th.data.piecetouse,0,th.data.piecetouse,0,th.gfx.x-80,th.gfx.y+50,0,false);
				break;
			}
			case 3: { // Clear X lines skipping N
				gbox.blitText(gbox.getBufferContext(),{font:"small-gray",text:"CLEAR "+th.data.linetoclear+" LINE"+(th.data.linetoclear>1?"S":""),dx:th.gfx.x-115,dy:th.gfx.y+10});
				gbox.blitText(gbox.getBufferContext(),{font:"small-gray",text:"SKIP "+th.data.linespacing+" ROWS!",dx:th.gfx.x-115,dy:th.gfx.y+20});
				break;
			}
			case 5: { // Clear a line without rotation
				gbox.blitText(gbox.getBufferContext(),{font:"small-gray",text:"CLEAR A LINE"+(th.data.linetoclear>1?"S":""),dx:th.gfx.x-115,dy:th.gfx.y+10});
				gbox.blitText(gbox.getBufferContext(),{font:"small-gray",text:"WITHOUT",dx:th.gfx.x-115,dy:th.gfx.y+20});
				gbox.blitText(gbox.getBufferContext(),{font:"small-gray",text:"ROTATION!",dx:th.gfx.x-115,dy:th.gfx.y+30});
				break;
			}
			case 7: { // go for a back-to-back
				gbox.blitText(gbox.getBufferContext(),{font:"small-gray",text:"GO FOR A"+(th.data.linetoclear>1?"S":""),dx:th.gfx.x-115,dy:th.gfx.y+10});
				gbox.blitText(gbox.getBufferContext(),{font:"small-gray",text:"BACK-TO-BACK!",dx:th.gfx.x-115,dy:th.gfx.y+20});
				break;
			}
		}
		if (th.data.nextmission=="award") {
			gbox.blitTile(gbox.getBufferContext(),{dx:th.gfx.x-105,dy:th.gfx.y+10,tileset:"clear",tile:0});
		}
	}
};


block.gamemodes.tds={
	label:"TETRIS DS",
	year:"2006",
	notes:["MISSING GRAVITY TABLE.","USING TETRISWORLDS STAGES (NO 20G).","MISSING LINE ANIMATIONS.","ZELDA MODE NEEDS WORK."],
	modes:[]
}

block.gamemodes.tds.modes.push({label:"MARATHON",id:"sim-tds"});
block.library["sim-tds"]=function(th){
	// CONFIRMED
	th.config.next.count=6;
	th.config.field.height=21;
	th.config.field.width=12;
	th.config.field.vanishinglines=23;
	th.config.field.hold=true;
	th.config.field.holdcount=1;
	th.config.control.harddrop=true;
	th.config.timing.harddrop=true; 
	th.config.field.blockout=true;
	th.config.field.lockout=true;
	th.config.field.partiallockout=false;
	th.config.timing.movereset=true;
	th.config.timing.spinreset=true;
	th.config.timing.are=0;
	th.config.control.keyhold=true; // Handle hold keys
	th.config.control.initialdas=block.convertframes(th,11); // frames of hold when key is pressed
	th.config.control.das=block.convertframes(th,5); // frames of hold
	th.config.timing.lockdelay=block.convertframes(th,30);
	th.config.timing.linecleardelay=block.convertframes(th,40);
	th.config.field.ghost=true;
	th.config.score.style="tds";
	block.loadlibrary(th,"rot-srs");

	// TO BE CONFIRMED
	th.config.timing.stickstoppable=true;
	th.config.score.gamemode="tetrisworlds";
	th.config.next.randomizer="randomgenerator";

	// GRAPHICS CHANGES
	block.loadlibrary(th,"gfx-none");
	th.config.gfx.tileset="brick-tds";
	th.config.gfx.darkenlight=0;
	th.config.gfx.dropanimation={type:"trail",accx:0,accy:0,tileset:"drop-tds",animspeed:3};
	th.config.gfx.lockanimation={type:"spark",onharddrop:false,accx:0,accy:0,tileset:"lock-tds",frames:{speed:1,frames:help.seq(0,60,block.getframeskip(th)*3)}};
	th.config.gfx.blits[th.config.gfx.blitsfieldindex]={type:"blit",dx:-11,dy:0,tileset:"field-tds",tile:0};
	th.config.gfx.breaksparks={type:"normal",spacing:15,valign:"top",accx:0,accy:0,tileset:"break-tgm",frames:{speed:1,frames:help.seq(0,36,block.getframeskip(th))}};
}

block.gamemodes.tds.modes.push({label:"MULTIPLAYER RULES",id:"sim-tds-multi"});
block.library["sim-tds-multi"]=function(th) {
	// TO BE CONFIRMED
	block.loadlibrary(th,"sim-tds");
	th.config.timing.floorkickcount=5;
}
		 
block.gamemodes.tds.modes.push({label:"ZELDA MODE",id:"sim-tds-zelda"});
block.library["sim-tds-zelda"]=function(th) {
	// TO BE CONFIRMED
	block.loadlibrary(th,"sim-tds");
	th.config.field.extraactions="zeldamode";
}	 

