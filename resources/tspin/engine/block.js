// ---
// Copyright (c) 2010 Francesco Cottone, http://www.kesiev.com/
// ---

function fpc2g(v) { return 1/v; } // frames per cell -> cell per frame (G)
function tgmg2g(v) { return 1/256*v; } // 1/256 G -> G
function strtime2secs(v) { var p=v.split(":"); return (p[0]*60)+(p[1]*1)+((p[2]*1)/100); } // converts 03:00:00 to secs/csecs
function sec2frames(th,v) { return th.config.timing.fps*v; }
function saveme(s) { return s.replace(/tetris/i,"TETRA").replace(/sega/i,"MEGA").replace(/nintendo/i,"TENDO").replace(/tengen/i,"GENGEN").replace(/gameboy/i,"PLAYKID").replace(/grandmaster/i,"MASTER").replace(/zelda/i,"HERULE"); }

var block={
	
	// --- CONSTANTS
	
	// TODO pare che il partiallockout non funziona piu'. Prova a togliere le vanishinglines e a generarlo
	// TODO il pushkick resetta il timer?! (??)
	// TODO il calcolo degli Hanabi e' inventato
	// TODO il zelda mode di tds e' molto approssimativo... ma va :)
	// TODO l'ARE/line ARE/line clear ARE in SHIRASE e' un caos
	// TODO ho creato "stopleveling" per bloccare la crescita dei livelli/boostedlevels. Durante il roll dovrebbe bloccare le sezioni, in caso di torikan (che comunque non sarebbe cresciuto ;) - non usato )
	// TODO verifica harddrop e pushkicks su tutti i tetris
	// TODO T-Spin count misterioso
	// TODO configurabili anche gli small bricks nella GUI
	// TODO items block per TGM2 normal mode (http://www.youtube.com/watch?v=57fd3zFuv78)
	
	piecesnames:"ITLJZSO",
	controls:{
		left:0,
		right:1,
		up:2,
		down:3,
		rotateright:4,
		rotateleft:5,
		store:6
	},
	statstemplate:{
		idlepieces:0,
		tetris:0,
		score:0,
		lines:0,
		pieces:0,
		rotations:0,
		rotperpiece:0,
		bravo:0,
		combo:0,
		recovery:0,
		// Clock
		secs:0, // Section time in seconds
		time:0, // Section time in seconds with csecs
		csec:0,
		m:0,
		s:0,
		fr:0,
		timerstring:""
	},
	
	keymap:["left","right","up","down","a","b","c"], // Map physical keys to controls
	
	cons:{
		block:{
			floor:10 // The block ID of floor/walls
		},
		piece:{
			next:0,
			hold:1
		},
		fulldirty:1,
		vdrop:{
			none:0,
			ok:1,
			wait:2
		},
		vpaste:{
			ok:0,
			blockout:1,
			lockout:2,
			partiallockout:3
		}
	},

	// --- CONSTRUCTOR

	createNew:function(modes) {
		var th= {
			running:true,
			beforequitting:0,
			endinganimation:null,
			endinganimationstep:0,
			animation:null,
			cango:false,
			paused:false,
			
			// debugging
			debugging:false,
			debug:[],
			
			// plugins data
			data:{},
			
			// Torikan
			torikan:null,
			
			// Messages
			message:[],
			messagetimer:0,
			
			// EXTRA actions data storage
			extraactions:{},

			// Ending handler
			staffroll:null,
			staffrolldone:0,
			match:"running",
			clearongameover:false,
			
			// Recovery detection
			fieldiscritical:false,

			// Current game status
			firstpiece:true,
			holdcount:0,
			stage:0,
			stagenumber:0,
			stagelabel:null,
			level:0,
			stopleveling:false,
			boostedlevel:0,
			shownlevel:0,
			nextlevelat:0,
			occupiedblocks:0,
			lineisfull:[],
			background:0,
			
			// Combos counters
			backtoback:0,
			combo:[], // The list of consecutive combos
			
			
			// Grading
			grading:null,
			gradelabels:null,
			gradelabel:null,
			gradeid:null,
						
			// Medals
			medals:null,
			medalslabels:null,
			
			// Stats
			overall:{},
			currentsection:-1,
			sectionstats:[],

			// Logic
			checkedconditions:{}, // For gui
			last:{}, // Last values - for level changing -
			
			// GFX
			blink:0,
			gfx: {},

			falling:{ 
				piece:-1
			},
			config:{
				field:{},
				timing:{},
				next:{},
				score:{},
				control:{},
				gfx:{}
			},
			timing:{ 
				lockdelay:0,
				droptime:0,
				are:0,
				linecleardelay:-1,
				nextissoft:false,
				nextisharddrop:false
			},
			keyboard:[0,0,0,0,0,0,0],
			bags:{ },
			nextpile:[],
			rules:{ }
		};
		
		for (var i=0;i<modes.length;i++)
			this.loadlibrary(th,modes[i]);
			
		th.config.field.height+=th.config.field.vanishinglines;
		this.initfield(th);
		
		var debugged=false;
		for (var i=0;i<modes.length;i++)
			if (modes[i].substr(0,5)=="test-") {
				if (!debugged) {
					th.debugging=true;
					th.config.gfx.blits.push({type:"label",text:modes[i],dx:-8,dy:-40,font:"small"});
					th.config.gfx.blits.push({type:"debug",dx:-105,dy:150,font:"_dbf"});
					th.config.gfx.blits.push({type:"allstats",dx:-105,dy:-40,font:"_dbf"});		
					th.config.gfx.blits.push({type:"sectionstats",dx:100,dy:0,font:"_dbf"});
					debugged=true;									
				}
				this.tests[modes[i]](th,modes[i]);
			}
		
		return th;
	},
	
	loadlibrary:function(th,name) {
		if (this.library[name])
			this.library[name](th,name);
		else
			alert("Library "+name+" not found.");
	},


	resetnextqueue:function(th) {
		th.bags={ };
		th.nextpile=[];
		while (th.nextpile.length<th.config.next.count) th.nextpile.push(this.next(th));
	},

	begin:function(th) { // START HERE

		if (th.debugging) this.debug(th,"Game start.");
		th.gfx.dirty=this.cons.fulldirty;
		th.gfx.ts=gbox.getTiles(th.config.gfx.tileset);
		th.gfx.fieldw=th.gfx.ts.tilew*(th.config.field.width-2);
		th.gfx.fieldh=th.gfx.ts.tileh*(th.config.field.height-th.config.field.vanishinglines-1);
		th.gfx.fieldhh=Math.floor(th.gfx.fieldh/2);
		th.gfx.fieldhw=Math.floor(th.gfx.fieldw/2);
		gbox.createCanvas(th.gfx.surfaceid,th.gfx.fieldw,th.gfx.fieldh);
		th.gfx.previewset=th.config.field.piecemodel; // Backup the original piece set (for big mode changes)

		if (th.config.field.big>1) this.makebigset(th,th.config.field.big);

		th.stagetimer=0;
		th.stagetimerframes=th.config.score.stagetimerframes;
		this.changehold(th,null);
		this.setstage(th,0);
		this.addlevel(th,0);
		this.resetstats(th,th.overall);
		this.resetnextqueue(th);

		if (th.config.score.sectionmarks) this.startnextsection(th);

	},
	
	
	
	// SETTERS

	
	next:function(th) {
		  var pc;var bid;
		  if (this.nextmodels[th.config.next.randomizer].poweron&&(!th.bags.powerid||(th.bags.powerid<this.nextmodels[th.config.next.randomizer].poweron.length))) {
		  	pc=this.nextmodels[th.config.next.randomizer].poweron.charAt(th.bags.powerid);
		  	th.bags.powerid=(th.bags.powerid?th.bags.powerid:0)+1;
		  } else if (this.nextmodels[th.config.next.randomizer].bagscount) { // bags system
			if (!th.bags.bagscount) { th.bags.content=this.nextmodels[th.config.next.randomizer].bag; th.bags.bagscount=this.nextmodels[th.config.next.randomizer].bagscount; }
			//document.getElementById('logs').innerHTML+="["+th.config.next.randomizer+"] prebag:"+th.bags.content+" precount:"+th.bags.bagscount;
			bid=Math.random()*th.bags.content.length;
			  pc=th.bags.content.charAt(bid);
			  th.bags.bagscount--;
			  th.bags.content=th.bags.content.substr(0,bid)+th.bags.content.substr(bid+1);
			//document.getElementById('logs').innerHTML+=" piece:"+pc+" bag:"+th.bags.content+" precount:"+th.bags.bagscount+"<br>";
		  } else { // random system
			var tries=0;var curbag=this.nextmodels[th.config.next.randomizer].bag; var curtries=this.nextmodels[th.config.next.randomizer].tries;
			if (!th.bags.history) {
			  th.bags.history=this.nextmodels[th.config.next.randomizer].starting;
			  if (this.nextmodels[th.config.next.randomizer].first) {
				curbag=this.nextmodels[th.config.next.randomizer].first;
				curtries="unlimited";
			  }
			}
			//document.getElementById('logs').innerHTML+="["+th.config.next.randomizer+"] bag:"+curbag+" tries:"+curtries+" prehistory:"+th.bags.history+" trying:";
			do {
			 bid=Math.random()*curbag.length;
			 pc=curbag.charAt(bid);
			 if (curtries!="") tries++;
			 //document.getElementById('logs').innerHTML+=pc;
			} while ((th.bags.history.indexOf(pc)!=-1)&&(tries!=curtries));
			//document.getElementById('logs').innerHTML+=((th.bags.history.indexOf(pc)==-1)?" new!":" old... ")+((tries==curtries)?" finetent ":" tent ");
			if (this.nextmodels[th.config.next.randomizer].history)
			  th.bags.history=(th.bags.history.length==this.nextmodels[th.config.next.randomizer].history?th.bags.history.substr(1,this.nextmodels[th.config.next.randomizer].history):th.bags.history)+pc;
			//document.getElementById('logs').innerHTML+=" history: "+th.bags.history+" piece: "+pc+" tries: "+tries+"<br>";
		  }
			return {piece:pc*1,rotate:(this.nextmodels[th.config.next.randomizer].randomrotate?help.random(0,this.pieces[th.config.field.piecemodel][pc*1].length):0)};
		},
	
	changebackground:function(th,level) { // Rotates background
		var nbg=level%th.config.gfx.backgrounds.length;
		if (th.background!=nbg) {
			th.background=nbg;
			th.backgroundscroller=0;
			th.backgroundscrollertime=0;
			if (th.debugging) this.debug(th,"LEVEL START!");
		}
	},
	
	// Returns the value of the capped level (i.e. torikan-stopped Level_After_Clear evaluating
	getcappedlevel:function(th,level) {
		return (th.config.score.levelcap&&(level>th.config.score.levelcap)?th.config.score.levelcap:level);
		
	},
	
	addlevel:function(th,ad) {
		th.level=this.getcappedlevel(th,th.level+ad);
		th.boostedlevel+=ad;
		if (th.config.score.forcedlinesevery)
			th.nextlevelat=this.getcappedlevel(th,Math.ceil((th.level+1)/th.config.score.forcedlinesevery)*th.config.score.forcedlinesevery);
	},
	
	gotostagelabel:function(th,label) {
		for (var i=0;i<this.roads[th.config.score.gamemode].length;i++)
			if (this.roads[th.config.score.gamemode][i].label==label) {
				this.setstage(th,i);
			}
	},
	
	applysetup:function(th,setup) { // The plugin way of changing the game
		if (setup.resettimers!=null) {
			th.stagetimer=0;
			th.stagetimerframes=th.config.score.stagetimerframes;
		}
		if (setup.palette!=null) th.config.gfx.palette=setup.palette;
		if (setup.internalgrade!=null) th.config.score.internalgrade=setup.internalgrade;
		if (setup.setdata!=null) th.data[setup.setdata[0]]=setup.setdata[1];
		if (setup.adddata!=null) if (th.data[setup.adddata[0]]==null) th.data[setup.adddata[0]]=setup.adddata[1]; else th.data[setup.adddata[0]]+=setup.adddata[1];
		if (setup.gotostagelabel!=null) this.gotostagelabel(th,setup.gotostagelabel);
		if (setup.log!=null) if (th.debugging) this.debug(th,"STP: "+setup.log);
		if (setup.message!=null) this.message(th,setup.message);
		if ((setup.boostlevel!=null)&&(!th.stopleveling)) th.boostedlevel+=setup.boostlevel;
		if (setup.stopleveling!=null) th.stopleveling=setup.stopleveling;
		if (setup.nextstage!=null) th.stage++;
		if (setup.nextstagenumber!=null) th.stagenumber++;
		if (setup.setstagenumber!=null) th.stagenumber=setup.setstagenumber;
		if (setup.nextbackground!=null) this.changebackground(th,th.background+1);
		if (setup.animation!=null) th.animation=help.cloneObject(setup.animation);
		if (setup.vanishspeed!=null) th.config.field.vanishspeed=this.convertframes(th,sec2frames(th,setup.vanishspeed));
		if (setup.drawborder!=null) th.config.gfx.drawborder=setup.drawborder;
		if (setup.initfield!=null) this.initfield(th);
		if (setup.startstaffroll!=null) this.startstaffroll(th,setup.startstaffroll);
		if (setup.clearongameover!=null) th.clearongameover=true;
		if (setup.are!=null) th.config.timing.are=this.convertframes(th,setup.are);
		if (setup.das!=null) th.config.control.das=this.convertframes(th,setup.das);
		if (setup.initialdas!=null) th.config.control.initialdas=this.convertframes(th,setup.initialdas);
		if (setup.lockdelay!=null) th.config.timing.lockdelay=this.convertframes(th,setup.lockdelay);
		if (setup.linecleardelay!=null) th.config.timing.linecleardelay=this.convertframes(th,setup.linecleardelay);
		if (setup.forcedlinesevery!=null) th.config.score.forcedlinesevery=setup.forcedlinesevery;
		if (setup.levelcap!=null) th.config.score.levelcap=setup.levelcap;
		if (setup.big!=null) {
			th.config.field.big=setup.big;
			this.makebigset(th,th.config.field.big);
		}
		if (setup.gravity!=null) {
			th.config.timing.gravity=setup.gravity;
			th.timing.droptime=this.convertframes(th,this.convertgravity(th,th.config.timing.gravity));
		}
		if (setup.gameclear!=null) this.gameclear(th);
	},
	
	setstage:function(th,level) {
		th.stage=level;
		th.stagelabel=this.roads[th.config.score.gamemode][level].label;
		if (th.debugging) this.debug(th,"Set stage: "+th.stage+" ("+th.stagelabel+")");
		this.applysetup(th,this.roads[th.config.score.gamemode][level].setup);
		if (th.running) { // If the game is already on (not cleared/failed)
			// Copy conditions
			th.checkedconditions={}; // Distinct of checked conditions, for hud
			help.copyModel(th.last,th.overall); // Copy last stats to the cache (for conditionals)
			if (this.roads[th.config.score.gamemode][th.stage].nextstage)
			for (var j=0;j<this.roads[th.config.score.gamemode][th.stage].nextstage.length;j++)
				for (var i=0;i<this.roads[th.config.score.gamemode][th.stage].nextstage[j].condition.length;i++) {
					if ((this.roads[th.config.score.gamemode][th.stage].nextstage[j].condition[i][2]=="overall")||(this.roads[th.config.score.gamemode][th.stage].nextstage[j].condition[i][2]=="global")) // Backup values if "overall" or "global" is used
						th.checkedconditions[this.roads[th.config.score.gamemode][th.stage].nextstage[j].condition[i][3]]=this.simplelogicgetvar(th,this.roads[th.config.score.gamemode][th.stage].nextstage[j].condition[i],5);
				}
		}
	},
	
	
	// CUSTOM: DROP POLICIES
	drop:function(th) {
	  var touch=false;
	  var ret;
	  for (var steps=0;steps<Math.ceil(th.config.timing.gravity);steps++) 
	   { th.falling.y++; if (!this.fits(th,th.falling)) {touch=true;break;} }
	  if (touch) {
	   th.falling.y--;
	   if (th.timing.nextissoft&&th.config.control.lockingsoftdrop) th.timing.lockdelay=0;
	   var wait=false;
	   if (th.timing.lockdelay==0)   {
		   if (!th.timing.nextisharddrop) th.gfx.lockanimation={piece:this.copypiece(th.falling),cnt:0};
		   var lockresult=this.paste(th,th.falling);
		   if (th.debugging&&(lockresult[this.cons.vpaste.blockout]||lockresult[this.cons.vpaste.lockout]||lockresult[this.cons.vpaste.partiallockout])) this.debug(th,"BLOCKOUT"+(th.config.field.blockout?"*":"")+":"+lockresult[this.cons.vpaste.blockout]+" LOCKOUT"+(th.config.field.lockout?"*":"")+":"+lockresult[this.cons.vpaste.lockout]+" PLOCKOUT"+(th.config.field.partiallockout?"*":"")+":"+lockresult[this.cons.vpaste.partiallockout]);
		   if (
			(lockresult[this.cons.vpaste.blockout]&&th.config.field.blockout)||
			(lockresult[this.cons.vpaste.lockout]&&th.config.field.lockout)||
			(lockresult[this.cons.vpaste.partiallockout]&&th.config.field.partiallockout)
			  ) this.gameover(th); else ret=this.cons.vdrop.ok;
	   } else ret=this.cons.vdrop.wait;
	  } else {
	  	if (th.timing.nextissoft) // Flag as true if next vertical motion is a softdrop (if caused by das)
			th.falling.softdrop++;
		 this.resetfalling(th); // Gravity movments reset spins counter, stick time and kicks - http://www.tetrisconcept.net/wiki/T-Spin
		 ret=this.cons.none;
	  }
	  th.timing.nextisharddrop=false;
	  th.timing.nextissoft=false;
	  return ret;
	},
	
	
	getnext:function(th) {
	  var nxt=th.nextpile[0];
	  for (var i=0;i<th.config.next.count-1;i++) th.nextpile[i]=th.nextpile[i+1];
	  th.nextpile[th.config.next.count-1]=this.next(th);
	  return nxt;
	},
	
	droplines:function(th,mark,gradient) {
	  var y=th.config.field.height-2;
	  var x;var py;
	  var ts;
	  var ret={cnt:0,height:0,heights:[],occupiedblocks:th.occupiedblocks,recovery:false}; // Recovery is set outside
	  var s=0;
	  var d=0;
	  while (y-d>=0) {
		if (th.lineisfull[y-d]) {
		  ret.occupiedblocks-=th.config.field.width-2;
		  ret.height=th.config.field.height-y-d-1;
		  ret.heights.push(ret.height);
		  ret.cnt++;
		  if ((mark==3)||(mark==4)) {
		  	if (th.config.gfx.breaksparks) {
		  		switch (th.config.gfx.breaksparks.type) {
		  			case "normal": {
		  				s=0;
						while (s<th.gfx.fieldw) {
							toys.generate.sparks.simple({x:s+th.gfx.x,y:th.gfx.y+((y-th.config.field.vanishinglines)*th.gfx.ts.tileh),hw:th.gfx.ts.tilehw,hh:th.gfx.ts.tilehh},"sparks",null,{valign:th.config.gfx.breaksparks.valign,frames:th.config.gfx.breaksparks.frames,animspeed:th.config.gfx.breaksparks.animspeed,accy:th.config.gfx.breaksparks.accy,accx:th.config.gfx.breaksparks.accx,tileset:th.config.gfx.breaksparks.tileset});
							s+=th.config.gfx.breaksparks.spacing;
						}
		  				break;
		  			}
		  			case "bricks": {
		  				for (s=1;s<th.config.field.width-1;s++) 
		  					if (this.getcolorinfield(th,s,y)!=null)  
		  						toys.generate.sparks.simple({x:((s-1)*th.gfx.ts.tilew)+th.gfx.x,y:th.gfx.y+((y-th.config.field.vanishinglines)*th.gfx.ts.tileh),hw:th.gfx.ts.tilehw,hh:th.gfx.ts.tilehh},"sparks",null,{frames:{frames:[this.getcolorinfield(th,s,y)],speed:99999},accx:((s/(th.config.field.width-1))*th.gfx.ts.tilehw)-(th.gfx.ts.tilehw/2),accy:th.config.gfx.breaksparks.accy,gravity:true,tileset:th.config.gfx.tileset});
		  				break;
		  			}
		  			case "color": {
		  				for (s=1;s<th.config.field.width-1;s++) 
		  					if (this.getcolorinfield(th,s,y)!=null) {
		  						ts=th.config.gfx.breaksparks.tileset+this.getcolorinfield(th,s,y);
		  						if (!gbox.getTiles(ts)) ts=th.config.gfx.breaksparks.tileset+"0";
		  						toys.generate.sparks.simple({x:((s-1)*th.gfx.ts.tilew)+th.gfx.x,y:th.gfx.y+((y-th.config.field.vanishinglines)*th.gfx.ts.tileh),hw:th.gfx.ts.tilehw,hh:th.gfx.ts.tilehh},"sparks",null,{valign:th.config.gfx.breaksparks.valign,frames:th.config.gfx.breaksparks.frames,animspeed:th.config.gfx.breaksparks.animspeed,accy:th.config.gfx.breaksparks.accy,accx:th.config.gfx.breaksparks.accx,tileset:ts});
		  					}
		  				break;
		  			}
		  		}

		  	}
		  }
		  if ((mark==1)||(mark==3)) {
		  	switch (th.config.gfx.clearlineanimation) {
		  		case "fade": {
					for (x=1;x<th.config.field.width-1;x++)
						this.blitfieldcell(th,x,y,gradient);
					break;		  		
		  		}
		  		case "blink": {
		  			for (x=1;x<th.config.field.width-1;x++)
		  				this.blitfieldcell(th,x,y,1,{forceclear:Math.floor(gradient*10)%2});
		  			break;	
		  		}
		  		case "progress": {
		  			ts=th.config.field.width*(1-gradient);
		  			for (x=1;x<th.config.field.width-1;x++) {
		  				this.blitfieldcell(th,x,y,(x<=ts?((ts-x)>=3?0:(3-(ts-x))/3):1),{forceclear:(ts-x)>=3});
		  			}
		  			break;
		  		}
		  		case "open": {
		  			for (x=1;x<th.config.field.width-1;x++) {
		  				this.blitfieldcell(th,x,y,1,{forceclear:Math.abs(x-(th.config.field.width/2))<((th.config.field.width/2)*(1-gradient))});
		  			}
		  			break;
		  		}
		  		case "void": {
		  			for (x=1;x<th.config.field.width-1;x++)
		  				this.blitfieldcell(th,x,y,1,{forceclear:true});
		  			break;	
		  		}
		  	}
			y--;
		  } else if ((mark==2)||(mark==4)) {
		    for (py=y;py>1;py--)
			  for (x=1;x<th.config.field.width-1;x++)
			  	this.copyinfield(th,x,py-1,x,py);
			for (var x=1;x<th.config.field.width-1;x++) this.setinfield(th,x,0,null);
			d++;
		  } else y--;
		} else y--;
	  }
	  if ((mark==2)||(mark==4)) th.lineisfull=[]; // reset the lineisfull array
	  if (ret.cnt&&th.config.field.big) ret.cnt=ret.cnt/th.config.field.big;
	  return ret;
	},
	
	fits:function(th,piece) {
	  for (var y=0;y<this.pieces[th.config.field.piecemodel][piece.piece][piece.rotate].length;y++)
		for (var x=0;x<this.pieces[th.config.field.piecemodel][piece.piece][piece.rotate][y].length;x++) {
		  if (this.pieces[th.config.field.piecemodel][piece.piece][piece.rotate][y][x]==1) 
		  	if (th.config.field.ceiling&&(piece.y+y<th.config.field.vanishinglines)) return false; else
		 		 if ((piece.x+x==0)||(piece.x+x==th.config.field.width-1)) return false; else
		 			 if (piece.y+y>=0)
			  			if (this.getinfield(th,piece.x+x,piece.y+y)!==null) return false;
		}
	  return true;
	},
	
	counttspins:function(th,piece) {
	  var cnt=0;
	  if (this.tspins[th.config.field.piecemodel]&&this.tspins[th.config.field.piecemodel][piece.piece]) {
		  for (var y=0;y<this.tspins[th.config.field.piecemodel][piece.piece][piece.rotate].length;y++)
			for (var x=0;x<this.tspins[th.config.field.piecemodel][piece.piece][piece.rotate][y].length;x++) {
			  if ((piece.y+y>th.config.field.vanishinglines)&&(this.tspins[th.config.field.piecemodel][piece.piece][piece.rotate][y][x]==1)) // Search the t-spin spots
			  if (
					((th.config.score.tspinwithwalls)&&(this.getinfield(th,piece.x+x,piece.y+y)!==null)) || // T-spin calculates walls in Tetris Worlds for GBA - http://www.tetrisconcept.net/wiki/T-Spin
					((this.getinfield(th,piece.x+x,piece.y+y)!=null)&&(this.getinfield(th,piece.x+x,piece.y+y).type!=this.cons.block.floor)) // Usually SRS doesn't count walls for t-spins - http://www.tetrisconcept.net/wiki/T-Spin
				) cnt++;
			}
		}
	  return cnt;
	},
	
	checkendinganimation:function(th) {

		var done=false;
		var __delme=0;
		var ev;
		while (!done) {
			ev=th.config.gfx[th.endinganimation][th.endinganimationstep];
			if (!ev) {
				th.endinganimationstep=null;
				break;
			} else 
			if (!ev.condition||this.simplelogicevaluator(th,ev.condition,null)) {
				__delme++;
				if (ev.unchainlogic) done=true; else done=false;
				if (ev.setup) this.applysetup(th,ev.setup);
				th.endinganimationstep++;
				break;
			} else done=true;
		}
		if (th.debugging&&__delme>1) this.debug(th,"checkendinganimation chained "+__delme+" operations");
		
	},
	

	
	checknextlevel:function(th,phase) {
		var done;
		
		if (!this.roads[th.config.score.gamemode][th.stage].nextstage)
			this.setstage(th,th.stage+1);
		else
		for (var i=0;i<this.roads[th.config.score.gamemode][th.stage].nextstage.length;i++) {
			done=false;
			var __delme=0;
			while (!done) {
				if (this.simplelogicevaluator(th,this.roads[th.config.score.gamemode][th.stage].nextstage[i].condition,phase)) {
					__delme++;
					if (this.roads[th.config.score.gamemode][th.stage].nextstage[i].unchainlogic) done=true; else done=false;
					if (this.roads[th.config.score.gamemode][th.stage].nextstage[i].gotostagelabel)
						this.gotostagelabel(th,this.roads[th.config.score.gamemode][th.stage].nextstage[i].gotostagelabel);
					else
						this.setstage(th,th.stage+1);
					break;
				} else done=true;
			}
			if (th.debugging&&__delme>1) this.debug(th,"checknextlevel chained "+__delme+" operations");
		}
		
	},
	
	isgameactive:function(th) {
		return (th.running&&!th.paused&&(!th.animation||!th.animation.pause));
	},
	
	
	game:function(th) { 
			
	  	var levelphase="onmain";
	  	var done;
	  	
	  	if (this.isgameactive(th)) {
			
			// UPDATE STAGE TIMER
			if (th.config.score.stagetimermax&&(th.stagetimer<th.config.score.stagetimermax)) {
				th.stagetimerframes--;
				if (th.stagetimerframes==0) {
					th.stagetimer++;
					th.stagetimerframes=th.config.score.stagetimerframes;
				}
			}
			
		}
			
		// PROCESS LINE REMOVAL (usually during are)
		if (th.timing.linecleardelay>-1) {
		  if (th.timing.linecleardelay==0)
			this.droplines(th,(th.timing.firstremovelines?4:2),0);
		  else
		  	this.droplines(th,(th.timing.firstremovelines?3:1),Math.floor(th.config.gfx.vanishingcolors*th.timing.linecleardelay)/th.config.timing.linecleardelay);
		  th.timing.firstremovelines=false;
		  th.timing.linecleardelay--;
		}
		
		if (this.isgameactive(th)) {
			
			// PROCESS KEY HOLDING AND NEXT
			if (th.timing.are==0) { 
			  if (th.config.score.forcedlinesevery&&!th.stopleveling&&!th.firstpiece&&(!th.config.score.levelcap||(th.level!=th.config.score.levelcap-1))&&((th.level+1)%th.config.score.forcedlinesevery!=0)) this.addlevel(th,1); // Change level value for TGM like games
			  levelphase="onspawn";
			  this.nextpiece(th,null);
			  th.holdcount=th.config.field.holdcount;
			  th.timing.are=-1;

				if (th.config.control.ihs&&th.keyboard[this.controls.store]>0) {
					this.docontrols(th,this.controls.store,true);
					this.vkbd(th,-1,this.controls.store);
				}
			
				if (th.config.control.irs) {
					if (th.config.control.irs180&&(th.keyboard[this.controls.rotateright]>0)&&(th.keyboard[this.controls.rotateleft]>0)) {
						this.docontrols(th,this.controls.rotateright,true);
						this.docontrols(th,this.controls.rotateright,true);
						this.vkbd(th,-1,this.controls.rotateright);
						this.vkbd(th,-1,this.controls.rotateleft);
					} else
					if (th.keyboard[this.controls.rotateright]>0) { this.docontrols(th,this.controls.rotateright,true); this.vkbd(th,-1,this.controls.rotateright); } else
					if (th.keyboard[this.controls.rotateleft]>0) { this.docontrols(th,this.controls.rotateleft,true); this.vkbd(th,-1,this.controls.rotateleft); }
				}
				
				if (th.config.control.ims) {
					var m=0;
					if (th.keyboard[this.controls.left]>0) m=-1; else
					if (th.keyboard[this.controls.right]>0) m=1;
					if (m) {
					  do { th.falling.x+=m; } while (this.fits(th,th.falling));
					  th.falling.x-=m;
					}
				}
				
			}
			
			 // PROCESS KEYBOARD
			//document.title="";
			if (th.timing.are==-1) {
			for (var cid in this.controls ) {
				//document.title+=th.keyboard[this.controls[cid]]+" - ";
				if (this.deadkeys[th.config.control.deadkeys][this.controls[cid]]) // Handle dead keys - disabled buttons
				  if (th.keyboard[this.controls[cid]]>0) {
						if (th.keyboard[this.controls[cid]]==th.config.control.initialdas)
							this.docontrols(th,this.controls[cid],true);
						else if (th.keyboard[this.controls[cid]]==1)
							this.docontrols(th,this.controls[cid],false);
						if (th.config.control.keyhold&&(th.keyboard[this.controls[cid]]==1)) th.keyboard[this.controls[cid]]=th.config.control.das;
						th.keyboard[this.controls[cid]]--;
						} 
					}
			}
			
			// PROCESS GRAVITY
			if (th.timing.are>-1) th.timing.are--; else {
			if (th.timing.droptime>0) th.timing.droptime--;
			if (th.timing.droptime==0) {
				  var rt=this.cons.vdrop.ok;
				  if (th.falling.piece!=-1) rt=this.drop(th);
				switch (rt) {
					case this.cons.vdrop.wait: { 
						th.falling.activetime++;
						if (th.timing.lockdelay>0) th.timing.lockdelay--;
						break
					}
					case this.cons.vdrop.ok: {
						levelphase="onlock";
						
						done=this.droplines(th,0,0); // Check field
						
						if (!th.fieldiscritical&&th.config.score.blocksforcritical&&(done.occupiedblocks>=th.config.score.blocksforcritical)) th.fieldiscritical=true;
						if (th.fieldiscritical&&(done.occupiedblocks<=(th.config.score.blocksforrecovery?th.config.score.blocksforrecovery:th.config.score.blocksforcritical))) {
							this.addstat(th,"recovery",1);
							th.fieldiscritical=false;
							done.recovery=true;
						}
						
						if (done.cnt) {
							th.combo.push(done.cnt); // Add to combo counter
							this.addlinesgroup(th,done.cnt,1); // Add to the single/double/tripe/tetris counter
						} else th.combo=[]; // Reset combo counter
						if (done.cnt>=3) {
							this.addstat(th,"tetris",1); // Change tetris counter
							th.backtoback++; // Change backtoback counter
						} else th.backtoback=0; // Change backtoback counter
						this.addstat(th,"lines",done.cnt); // Change lines counter
						if (done.occupiedblocks==0) this.addstat(th,"bravo",1);
						if (th.combo.length>1) this.setcombo(th,th.combo.length-1);
						
						
						if (th.config.score.style) this.lines[th.config.score.style](th,done); // Update score (have to be done before the level change)
						if (th.config.score.levelscores&&!th.stopleveling&&done.cnt) this.addlevel(th,th.config.score.levelscores[done.cnt-1]); // Update level
						
						th.timing.are=th.config.timing.are;
						// TODO messages
						if ((th.falling.immobilespins>0)&&((th.config.control.spinevaluator=="immobile")||(th.config.control.spinevaluator=="all")))
							this.message(th,this.piecesnames.charAt(th.falling.piece)+"-IM-SPIN"+(th.falling.kicked?" KICK":"")+(th.falling.immobilespins>1?"e"+th.falling.immobilespins:""));
						if ((th.falling.tspins>0)&&((th.config.control.spinevaluator=="tspins")||(th.config.control.spinevaluator=="all")))
							this.message(th,this.piecesnames.charAt(th.falling.piece)+"-T-SPIN"+(th.falling.kicked?" KICK":"")+(th.falling.tspins>1?"e"+th.falling.tspins:""));
						if (done.cnt) {
							 
							  if (done.cnt==4) { 
									if (th.backtoback>1) this.message(th,"BACK-TO-BACK"+(th.backtoback>2?"e"+(th.backtoback-1):""));
									else this.message(th,"TETRIS!"); 
							   } else if (th.combo.length>1) this.message(th,"COMBOe"+th.combo.length);
							   
							if (done.occupiedblocks==0) this.message(th,"BRAVO!"); 
								th.timing.firstremovelines=true;
								th.timing.linecleardelay=th.config.timing.linecleardelay;
								th.timing.are+=th.config.timing.linecleardelay;
						} 
						if (done.recovery) this.message(th,"RECOVERY!");
						
						if (done.cnt==0) this.addstat(th,"idlepieces",1);
					  
						break;
					}
				}
				if (rt!=this.cons.vdrop.wait) {
					//document.title=th.keyboard[this.controls.down];
					if (!th.config.control.softdropisdas&&th.keyboard[this.controls.down]&&(th.config.control.softdrop>th.config.timing.gravity)) {
						th.falling.softdrop++;
						th.timing.droptime=this.convertframes(th,this.convertgravity(th,th.config.control.softdrop));
					} else
						th.timing.droptime=this.convertframes(th,this.convertgravity(th,th.config.timing.gravity));
				}	
			} else th.falling.activetime++;
		  }
	  }
	  
	  // CHECKS
	  if (th.config.score.sectionmarks) this.checknextsection(th,levelphase);
	  if (th.config.score.internalgrade) this.setinternalgrade(th,levelphase,done);
	  if (th.config.score.grading) this.checkgrading(th,levelphase);
	  if (th.config.score.medals) this.checkmedals(th,levelphase);
	  if (th.config.score.torikan) this.checktorikan(th,levelphase);
	  if (th.config.field.vanishspeed) this.fullfieldeffect(th);
 	  if (th.config.field.extraactions) this.extraactions[th.config.field.extraactions](th,levelphase,done);
	  this.checknextlevel(th,levelphase);
	  
	  if (levelphase=="onlock") {  // Reset the falling piece after calling the extraactions, so stats can be done.
		  th.falling.piece=-1;
		  th.firstpiece=false;
	 }

	  if (this.isgameactive(th)) {
		  // CALCULATE TIMER
		  this.ticktimer(th);
		 }
	
	  // QUIT GAME COUNTERS
	  if (!th.running&&!th.paused) {
		if (th.endinganimationstep!==null)
			this.checkendinganimation(th);
		else
		  	if (th.beforequitting) th.beforequitting--; else
		  		if (gbox.keyIsHit("a")) return true;
	  } else return false;
	
	},

	setinternalgrade:function(th,phase,linesdata) { // TGM2 style grading - http://www.tetrisconcept.net/wiki/Tetris_The_Absolute_The_Grand_Master_2_PLUS
		if (th.data[this.internalgrades[th.config.score.internalgrade].internalgradepointsvariable]==null) {
			if (this.internalgrades[th.config.score.internalgrade].internalgradevariable) th.data[this.internalgrades[th.config.score.internalgrade].internalgradevariable]=0;
			if (this.internalgrades[th.config.score.internalgrade].gradesboostvariable) th.data[this.internalgrades[th.config.score.internalgrade].gradesboostvariable]=0;
			if (this.internalgrades[th.config.score.internalgrade].internalgradepointsvariable) th.data[this.internalgrades[th.config.score.internalgrade].internalgradepointsvariable]=0;
			if (this.internalgrades[th.config.score.internalgrade].internalgradedecayvariable) th.data[this.internalgrades[th.config.score.internalgrade].internalgradedecayvariable]=0;
		}
	
		if (linesdata&&linesdata.cnt) {
			
			var sum=help.getArrayCapped(help.getArrayCapped(this.internalgrades[th.config.score.internalgrade].score,(th.data[this.internalgrades[th.config.score.internalgrade].internalgradevariable]?th.data[this.internalgrades[th.config.score.internalgrade].internalgradevariable]:0)),linesdata.cnt-1)*
				help.getArrayCapped(help.getArrayCapped(this.internalgrades[th.config.score.internalgrade].combo,(th.data[this.internalgrades[th.config.score.internalgrade].internalgradevariable]?th.data[this.internalgrades[th.config.score.internalgrade].internalgradevariable]:0)),th.combo.length-1);
				if (this.internalgrades[th.config.score.internalgrade].approx=="ceil") sum=Math.ceil(sum);
			if (th.debugging) this.debug(th,"setting "+this.internalgrades[th.config.score.internalgrade].internalgradepointsvariable+":"+this.internalgrades[th.config.score.internalgrade].approx+"("+help.getArrayCapped(help.getArrayCapped(this.internalgrades[th.config.score.internalgrade].score,(th.data[this.internalgrades[th.config.score.internalgrade].internalgradevariable]?th.data[this.internalgrades[th.config.score.internalgrade].internalgradevariable]:0)),linesdata.cnt-1)+"*"+help.getArrayCapped(help.getArrayCapped(this.internalgrades[th.config.score.internalgrade].combo,(th.data[this.internalgrades[th.config.score.internalgrade].internalgradevariable]?th.data[this.internalgrades[th.config.score.internalgrade].internalgradevariable]:0)),th.combo.length-1)+")*"+help.getArrayIndexed(this.internalgrades[th.config.score.internalgrade].level,th.overall.level,"level").mul+"="+sum);
			
			
			th.data[this.internalgrades[th.config.score.internalgrade].internalgradepointsvariable]+=sum*help.getArrayIndexed(this.internalgrades[th.config.score.internalgrade].level,th.overall.level,"level").mul;
			
			if (this.internalgrades[th.config.score.internalgrade].nextgradeevery&&(th.data[this.internalgrades[th.config.score.internalgrade].internalgradepointsvariable]>=this.internalgrades[th.config.score.internalgrade].nextgradeevery)) {
				if (this.internalgrades[th.config.score.internalgrade].internalgradevariable) th.data[this.internalgrades[th.config.score.internalgrade].internalgradevariable]+=Math.floor(th.data[this.internalgrades[th.config.score.internalgrade].internalgradepointsvariable]/this.internalgrades[th.config.score.internalgrade].nextgradeevery);
				if (this.internalgrades[th.config.score.internalgrade].gradesboostvariable) th.data[this.internalgrades[th.config.score.internalgrade].gradesboostvariable]=help.getArrayCapped(this.internalgrades[th.config.score.internalgrade].gradesboost,th.data[this.internalgrades[th.config.score.internalgrade].internalgradevariable]);
				if (this.internalgrades[th.config.score.internalgrade].internalgradepointsvariable) th.data[this.internalgrades[th.config.score.internalgrade].internalgradepointsvariable]=0;
				if (this.internalgrades[th.config.score.internalgrade].internalgradedecayvariable) th.data[this.internalgrades[th.config.score.internalgrade].internalgradedecayvariable]=help.getArrayCapped(this.internalgrades[th.config.score.internalgrade].decay,th.data[this.internalgrades[th.config.score.internalgrade].internalgradevariable]);
			}
		} else if (this.internalgrades[th.config.score.internalgrade].internalgradedecayvariable&&th.data[this.internalgrades[th.config.score.internalgrade].internalgradepointsvariable]&&(th.combo.length==0)) {
			th.data[this.internalgrades[th.config.score.internalgrade].internalgradedecayvariable]--;
			if (th.data[this.internalgrades[th.config.score.internalgrade].internalgradedecayvariable]<=0) {
				if (th.data[this.internalgrades[th.config.score.internalgrade].internalgradepointsvariable]) th.data[this.internalgrades[th.config.score.internalgrade].internalgradepointsvariable]--;
				th.data[this.internalgrades[th.config.score.internalgrade].internalgradedecayvariable]=help.getArrayCapped(this.internalgrades[th.config.score.internalgrade].decay,th.data[this.internalgrades[th.config.score.internalgrade].internalgradevariable]);
			}
		}
	},
	
	nextpiece:function(th,suggestion) {
		this.addstat(th,"piece",1);
		if (suggestion===null) suggestion=this.getnext(th);
		th.falling={
			floorkicked:false,
			kicked:false,
			piece:suggestion.piece,
			y:this.yspawnpoints[th.config.next.spawnpoint][suggestion.piece]+th.config.field.vanishinglines,
			floorkicks:th.config.timing.floorkickcount,
			rotate:suggestion.rotate,
			immobilespins:0,
			tspins:0,
			tspincorners:0,
			rotatebeforelock:0, // The rotation of the piece before the locking state
			harddrop:0, //Spaces covered in harddrop
			softdrop:0, // Spaces covered in softdrop
			spins:0, // The spins that are evaluated in the current configuration (tspin/immobile)
			activetime:0, // Frames that the falling piece is active
			x:(
				this.xspawnpoints[th.config.next.spawnpoint]!=null?
				this.xspawnpoints[th.config.next.spawnpoint][suggestion.piece]:
				(Math.ceil(Math.floor((th.config.field.width-2-(4*th.config.field.big))/2)/th.config.field.big)*th.config.field.big)+1
			)
		};
		
		th.timing.droptime=this.convertframes(th,this.convertgravity(th,th.config.timing.gravity));
		th.timing.lockdelay=th.config.timing.lockdelay;
		if (th.config.field.blockout)
			if (!this.fits(th,th.falling)) this.gameover(th);
	},
	
	paste:function(th,piece) {
	  var plo=new Array();
	   plo[this.cons.vpaste.blockout]=false;
	  var fulllockout=true;
	  var full=false;
	  var partial=false;
	  var linedirty=false;
	  for (var y=0;y<this.pieces[th.config.field.piecemodel][piece.piece][piece.rotate].length;y++) {
	  	linedirty=false;
		for (var x=0;x<this.pieces[th.config.field.piecemodel][piece.piece][piece.rotate][y].length;x++) {
			if (this.pieces[th.config.field.piecemodel][piece.piece][piece.rotate][y][x]==1)
			  if (piece.y+y>=0) {
			  	if (piece.y+y<th.config.field.vanishinglines) plo[this.cons.vpaste.partiallockout]=true; else fulllockout=false;				
				if (this.getinfield(th,piece.x+x,piece.y+y)!==null) plo[this.cons.vpaste.blockout]=true;
				this.setinfield(th,piece.x+x,piece.y+y,{color:(th.config.gfx.coloronpaste==null?this.palettes[th.config.gfx.palette][piece.piece]:th.config.gfx.coloronpaste),vanishtime:th.config.field.vanishspeed,vanishmax:th.config.field.vanishspeed});
				linedirty=true;
			  }
		}
		if (linedirty) {
			full=true;
			for (var x=1;x<th.config.field.width-1;x++)
				full=full&&(this.getinfield(th,x,piece.y+y)!==null);
			th.lineisfull[piece.y+y]=full;
		}
		
	  }
	  plo[this.cons.vpaste.lockout]=fulllockout;
	  return plo;
	},
	
	copypiece:function(frm) {
	  var tox={};
	  for (var id in frm ) tox[id]=frm[id];
	  return tox;
	},
	
	// -- SETTERS TRIGGERS

	changehold:function(th,p) {
		th.hold=p;
	},
	
	startstaffroll:function(th,ver) {
		th.staffrolldone=0;
		th.staffroll={
			font:this.staffrolls[ver].font, skipkey:null, esckey:null,scenes:[
			{
				dx:th.gfx.x,dy:th.gfx.y,dh:th.gfx.fieldh,dw:th.gfx.fieldw,
				speed:this.staffrolls[ver].speed,
				spacing:this.staffrolls[ver].spacing,
				push:Math.floor(th.gfx.fieldh/2),
				scroller:this.staffrolls[ver].text
			}]
		}
		toys.resetToy(th,"staffroll");
	},

	resetspins:function(th) {
		th.falling.immobilespins=0;
		th.falling.tspins=0;
		th.falling.tspincorners=0;
		th.falling.spins=0;
		// Kicks flags are kept - if kicked once, the kick was done for this piece.
		// Floorkick counter is kept - the absolute number of kicks is ever the same for piece
	},
	
	resetfalling:function(th) { // reset completely the counters of a falling piece, including kicks flags, lock time and entry rotation
		this.resetspins(th);
		th.falling.floorkicked=false;
		th.falling.kicked=false;
		th.falling.rotatebeforelock=th.falling.rotate;
		th.timing.lockdelay=th.config.timing.lockdelay;
	},
		
	// CUSTOM: CONTROLS
	docontrols:function(th,move,firsthit) {
	  var bk=this.copypiece(th.falling);
	  var checki=false; // check infinity
	  var checkb=false; // rotation-related checks (spins/kicks)
	  var checks=false;
	  var resetspins=false;
	  var cancelmove=false;
	  var bbk;
	  var curkick;
	  var ks;
	var pks;
	var rks;
	var currot;
	var curblock;	  
	
		switch (move) {
		  case this.controls.right: { th.falling.x+=th.config.field.big; resetspins=true; checki=th.config.timing.movereset;break;}
		  case this.controls.left: { th.falling.x-=th.config.field.big; resetspins=true; checki=th.config.timing.movereset;break;}
		  case this.controls.down: { 
		  if (th.config.control.softdropisdas||firsthit) {
		  	resetspins=true;
		  	th.timing.nextissoft=true;
			th.timing.droptime=0; // Will be resetted by gravity
		  }
		
		break;
		  }
		  case this.controls.up: {
		if (firsthit&&th.config.control.harddrop) {
		  
			var steps=0; 
			do { steps++;th.falling.y++; } while (this.fits(th,th.falling));
			steps--;th.falling.y--;
		
			th.timing.droptime=0; // Will be resetted by gravity (is done regardless the hard drop size)
			if (steps>0) {
				th.gfx.dropanimation={steps:steps,piece:this.copypiece(th.falling)};
				if (th.config.score.harddropscore=="sum") th.falling.harddrop+=steps; else
				if (steps>=th.falling.harddrop)th.falling.harddrop=steps;
				checks=true;	
				resetspins=true;
				if (th.config.timing.harddrop) {
					th.timing.lockdelay=0;
					if (th.config.gfx.lockanimation&&!th.config.gfx.lockanimation.onharddrop) th.timing.nextisharddrop=true;
				}
			} else if ((steps==0)&&(th.config.timing.stickstoppable)) th.timing.lockdelay=0;
		}
		break;
		  }
		  case this.controls.rotateright: {if (this.pieces[th.config.field.piecemodel][th.falling.piece].length>1) { th.falling.rotate=(th.falling.rotate+1)%this.pieces[th.config.field.piecemodel][th.falling.piece].length; checki=th.config.timing.spinreset;checkb=true; }break;}
		  case this.controls.rotateleft:  {if (this.pieces[th.config.field.piecemodel][th.falling.piece].length>1) { th.falling.rotate=(th.falling.rotate==0?this.pieces[th.config.field.piecemodel][th.falling.piece].length-1:th.falling.rotate-1); checki=th.config.timing.spinreset;checkb=true; } break;}
		  case this.controls.store: {
		if (th.config.field.hold&&(th.holdcount>0)) {
			th.holdcount--;
			var newhold={piece:th.falling.piece,rotate:th.falling.rotate};
			if (!th.config.control.holdkeeprotation) newhold.rotate=0;
			this.nextpiece(th,th.hold);
			this.changehold(th,newhold);
			
		}
			  break;
		  }
		}
		//document.title="rotation: "+th.falling.rotate+" | ";
		// Rotation locks (like in ARS)
		
		if (checkb&&th.config.control.rotationlock) {
		  var done=false;
		  if (th.debugging) var logline="Rot: ";
		  for (var i=0;i<th.config.control.rotationlock.length;i++ ) {
		  	  // current rotation lock
		  	  curkick=th.config.control.rotationlock[i];
		  	  // Get the rotation lock
			  ks=this.rotationlocks[curkick];
			  // Get the piece rotation lock (fallback to the "p" kickset)
			  pks="p"+th.falling.piece;
			  if (th.debugging) logline+=(ks[pks]?pks:"p")+" - ";
			  ks=(ks[pks]?ks[pks]:ks["p"]);
			  // Get the rotation kickset (fallback to the "r" kickset)
			  rks="r"+bk.rotate+th.falling.rotate;
			  if (th.debugging) logline+=(ks[rks]?rks:"r")+" - ";
			  ks=(ks[rks]?ks[rks]:ks["r"]);
			 if (th.debugging)  if (ks) logline+=ks.length;
			  
			  if (ks) 
			  	for (var w=0;w<ks.length;w++) {
			  		currot=false;
			  		for (var y=0;y<ks[w].map.length;y++) {
			  			for (var x=0;x<ks[w].map[y].length;x++) 
			  				if ((x+th.falling.x>=0)&&(x+th.falling.x<=th.config.field.width)&&(y+th.falling.y>=0)&&(y+th.falling.y<th.config.field.height)) {
		 			 		curblock=null;
			  				switch (ks[w].map[y][x]) {
			  					case 1:{ curblock=this.getinfield(th,x+th.falling.x,y+th.falling.y)!=null; break; }
			  					case 2:{ curblock=this.getinfield(th,x+th.falling.x,y+th.falling.y)==null; break; }
			  				}
			  				if (curblock!==null)
			  					if (ks[w].logic=="or") currot|=curblock; else currot&=curblock;
			  			}
			  		}
			  		if (currot) {
			  			done=true;
			  			cancelmove=!ks[w].setrotation;
			  			break;
			  		}
			  	}
			  	if (done) break;
		  	}
		  	if (th.debugging) this.debug(th,logline);
		
		}
		
		if (!cancelmove&&checkb&&!this.fits(th,th.falling)) {
			
		  var done=false;
		  bbk=this.copypiece(th.falling);
		  bk.y++; // Temporary use the BK piece for floating check
		  var notfloating=!this.fits(th,bk);
		  bk.y--;
		  
		   
		  // Piece kicks (SRS, ARS, Tengen etc.)
		   if (th.debugging) var logline="Lok: "+(notfloating?"notf":"flot")+" ";
		  for (var i=0;i<th.config.timing.kickset.length;i++ ) {     
			  // current kickset
			  curkick=th.config.timing.kickset[i];
			  // Get the kickset
			  ks=this.kicksets[curkick];
			  // Get the piece kickset (fallback to the "p" kickset)
			  pks="p"+th.falling.piece;
			   if (th.debugging) logline+=(ks[pks]?pks:"p")+" - ";
			  ks=(ks[pks]?ks[pks]:ks["p"]);
			  // Get the rotation kickset (fallback to the "r" kickset)
			  rks="r"+bk.rotate+th.falling.rotate;
			  if (th.debugging) logline+=(ks[rks]?rks:"r")+" - ";
			  ks=(ks[rks]?ks[rks]:ks["r"]);
			   if (th.debugging) if (ks) logline+=ks.length;
			  
			  if (ks) 
				for (var y=0;y<ks.length;y++) {
				  if ((!ks[y].notfloating||notfloating)&&(!th.config.timing.floorkickcount)||(!ks[y].kicks)||(th.falling.floorkicks+ks[y].kicks>=0)) {
					th.falling=this.copypiece(bbk);
					if (ks[y].x) th.falling.x+=ks[y].x;
					if (ks[y].y) th.falling.y-=ks[y].y;
					if (ks[y].rotate) th.falling.rotate=(ks[y].rotate+ks[y].rotate)%this.pieces[th.config.field.piecemodel][th.falling.piece].length;
					if (this.fits(th,th.falling)) { 
					  done=true;
					   if (th.debugging) logline+=" - applied kick "+y+" (x:"+ks[y].x+",y:"+ks[y].y+") floorkick:"+ks[y].floorkick;
					  if (th.config.timing.floorkickcount&&ks[y].kicks) th.falling.floorkicks+=ks[y].kicks;
					  if (th.falling.floorkicks<0) th.falling.floorkicks=0;
					  if (th.config.timing.pushkicks&&ks[y].floorkick) th.falling.floorkicked=true;
					  th.falling.kicked=true;
					  break;
					}
				  }
				}
			if (done) break;
		  }
		  
		  if (th.debugging) this.debug(th,logline);
		  
		}
		
		// Push block, if floorkicked
		if (th.falling.floorkicked&&checkb) {
		  do { th.falling.y++; } while (this.fits(th,th.falling)); th.falling.y--;
		}
	
		if (!this.fits(th,th.falling)) {
		
		  th.falling=this.copypiece(bk);
		  return false;
		  
		} else {

		  if (resetspins) this.resetspins(th); // Horizontal/vertical movments resets spins counter - http://www.tetrisconcept.net/wiki/T-Spin
		  else { // Spins handlers
			  
			 
			  if (checkb) {
			  
			  	// Update rotations counter
			  	this.addstat(th,"rotations",1);
		   
			  
			  	 // Check immobile spins (used by Tetris Worlds) - http://www.tetrisconcept.net/wiki/T-Spin
				bbk=this.copypiece(th.falling);
				bbk.x++; //right
				if (!this.fits(th,bbk)) {
				  bbk.x-=2;//left
				  if (!this.fits(th,bbk)) {
					bbk.x++;bbk.y--;//up
					if (!this.fits(th,bbk)) th.falling.immobilespins++;
				  }
				}
			  
				  // Check t-spins - http://www.tetrisconcept.net/wiki/T-Spin
				  // Check spots for t-spins are marked with "2" in the piece definition sets.
				  if (checkb) {
					th.falling.tspincorners=this.counttspins(th,th.falling);
					if (th.falling.tspincorners>2) th.falling.tspins++;
				  }
				  
				  // Since the tetromino doesn't even have to end up in a different orientation than it was dropped in, we reset rotations if turning back to
				  // the entry rotation
				 // document.title=th.falling.rotatebeforelock+" vs "+th.falling.rotate;
				  if (th.falling.rotate==th.falling.rotatebeforelock)
				  	this.resetspins(th);
				  
				  
				  // Apply to the game mode spins the configured one.
				  if (checkb) {
					switch (th.config.control.spinevaluator) {
						case "tspin": { th.falling.spins = th.falling.tspins; break}
						case "immobile": { th.falling.spins = th.falling.immobilespins;  break; }
					}
				  }
				  
			  }
		  }
		  
		  // Handle infinity - http://www.tetrisconcept.net/wiki/Infinity
		  if (th.config.timing.lockdelay&&checki) th.timing.lockdelay=th.config.timing.lockdelay;
		  return true;
		}  
	},
	
	
	// -- AKIHABARA MADE
	
	convertgravity:function(th,g) {
  		return 1/g; // cell/frames -> frame per cell
	},
	
	convertmsec:function(th,msec) {
		return Math.ceil(gbox.getFps()*msec/1000);
	},
	
	// 3 cell/frames
	

	convertframes:function(th,frames) {
		return Math.ceil(frames*gbox.getFps()/th.config.timing.fps);
	},
	
	getframeskip:function(th) {
		return Math.ceil(th.config.timing.fps/gbox.getFps());
	},
	
	setgraphics:function(th,data) {
		th.gfx=data;
	},
	
	blockistransparent:function(th,x,y) { // Returns if the block of the field is visible or not
		return (this.getinfield(th,x,y)==null)||(this.getcolorinfield(th,x,y)==null)||(this.getinfield(th,x,y).vanishtime===0);
	},
	
	blitblockborder:function(th,x,y,color) {
		if (th.config.gfx.thd&&(x>1)&&!this.blockistransparent(th,x-1,y))
			gbox.blitTile(gbox.getCanvasContext(th.gfx.surfaceid),{dx:(x-1)*th.gfx.ts.tilew,dy:(y-th.config.field.vanishinglines)*th.gfx.ts.tileh,w:th.gfx.ts.tilehw,tileset:th.config.gfx.tileset,tile:this.getcolorinfield(th,x-1,y)+(th.config.gfx.thd*th.gfx.ts.tilerow)}); 
		if ((x<th.config.field.width-2)&&!this.blockistransparent(th,x+1,y))
			gbox.blitRect(gbox.getCanvasContext(th.gfx.surfaceid),{x:(x*th.gfx.ts.tilew)-1,y:(y-th.config.field.vanishinglines)*th.gfx.ts.tileh,w:1,h:th.gfx.ts.tileh,color:color});
		if ((x>1)&&!this.blockistransparent(th,x-1,y))
			gbox.blitRect(gbox.getCanvasContext(th.gfx.surfaceid),{x:((x-1)*th.gfx.ts.tilew),y:(y-th.config.field.vanishinglines)*th.gfx.ts.tileh,w:1,h:th.gfx.ts.tileh,color:color});
		if ((y>th.config.field.vanishinglines)&&!this.blockistransparent(th,x,y-1))
			gbox.blitRect(gbox.getCanvasContext(th.gfx.surfaceid),{x:((x-1)*th.gfx.ts.tilew),y:(y-th.config.field.vanishinglines)*th.gfx.ts.tileh,w:th.gfx.ts.tilew,h:1,color:color});
		if ((y<th.config.field.height-2)&&!this.blockistransparent(th,x,y+1))
			gbox.blitRect(gbox.getCanvasContext(th.gfx.surfaceid),{x:((x-1)*th.gfx.ts.tilew),y:(((y+1)-th.config.field.vanishinglines)*th.gfx.ts.tileh)-1,w:th.gfx.ts.tilew,h:1,color:color});
	},
	
	blitfieldcell:function(th,x,y,dark,data) {
		if ((data&&data.forceclear)||this.blockistransparent(th,x,y)) {
			gbox.blitClear(gbox.getCanvasContext(th.gfx.surfaceid),{x:(x-1)*th.gfx.ts.tilew,y:(y-th.config.field.vanishinglines)*th.gfx.ts.tileh,h:th.gfx.ts.tileh,w:th.gfx.ts.tilew}); 
			if (th.config.gfx.drawborder&&(!data||!data.forceclear)) this.blitblockborder(th,x,y,th.config.gfx.drawborder);
		}  else
			gbox.blitTile(gbox.getCanvasContext(th.gfx.surfaceid),{dx:(x-1)*th.gfx.ts.tilew,dy:(y-th.config.field.vanishinglines)*th.gfx.ts.tileh,tileset:th.config.gfx.tileset,tile:this.getcolorinfield(th,x,y)+((9-Math.floor(9*dark*(this.getinfield(th,x,y).vanishmax?this.getinfield(th,x,y).vanishtime/this.getinfield(th,x,y).vanishmax:1)))*th.gfx.ts.tilerow)}); 
	},
	
	redrawcell:function(th,x,y) {
		this.blitfieldcell(th,x,y,1);
		if (th.config.gfx.drawborder) {
			if (x<th.config.field.width-2) this.blitfieldcell(th,x+1,y,1);
			if (x>1) this.blitfieldcell(th,x-1,y,1);
			if (y>th.config.field.vanishinglines) this.blitfieldcell(th,x,y-1,1);
			if (y<th.config.field.height-2) this.blitfieldcell(th,x,y+1,1);
		}
	},
	
	blitfield:function(th) {
		if (th.gfx.dirty==this.cons.fulldirty)
			for (var y=th.config.field.vanishinglines;y<th.config.field.height-1;y++)
				for (var x=1;x<th.config.field.width-1;x++)
					this.redrawcell(th,x,y);
		else 
			for (var y in th.gfx.dirty)
				for (var x in th.gfx.dirty[y])
					this.redrawcell(th,x*1,y*1);	
	},
	
	rawrenderpiece:function(th,pieceset,tileset,piece,rot,color,dark,dx,dy,thd,opt) {
		var skrow;
		var skip=0;
		for (var y=0;y<this.pieces[pieceset][piece][rot].length;y++) {
			skrow=true;
			for (var x=0;x<this.pieces[pieceset][piece][rot][y].length;x++)
		 		if (this.pieces[pieceset][piece][rot][y][x]==1) {
		 			skrow=false;
		 			if (color==null)  {
		 				//document.title="x:"+(dx+(x*tileset.tilew))+",y:"+dy+",h:"+(th.gfx.ts.tileh)+",w:"+th.gfx.ts.tilew;
		 				gbox.blitRect(gbox.getBufferContext(),{x:dx+(x*tileset.tilew),y:dy+((y-skip)*tileset.tileh),h:th.gfx.ts.tileh,w:th.gfx.ts.tilew,color:"rgb(255,255,255)"});
					} else {
						gbox.blitTile(gbox.getBufferContext(),{dx:dx+(x*tileset.tilew),dy:dy+((y-skip)*tileset.tileh),tileset:tileset.id,tile:this.palettes[th.config.gfx.palette][color]+(dark*th.gfx.ts.tilerow)});
						if (thd&&(!this.pieces[pieceset][piece][rot][y][x+1]))
							gbox.blitTile(gbox.getBufferContext(),{dx:dx+((x+1)*tileset.tilew),dy:dy+((y-skip)*tileset.tileh),tileset:tileset.id,w:tileset.tilehw,tile:this.palettes[th.config.gfx.palette][color]+(thd*th.gfx.ts.tilerow)});
					}
				}
			if (opt&&skrow) skip++;
		}
	},
	
	renderblock:function(th,piece,color,dark,thd) { // renders a piece
	 var cl;
	 for (y=0;y<this.pieces[th.config.field.piecemodel][piece.piece][piece.rotate].length;y++)
		for (x=0;x<this.pieces[th.config.field.piecemodel][piece.piece][piece.rotate][y].length;x++)
		  if (piece.y+y-th.config.field.vanishinglines>=0)
			if (this.pieces[th.config.field.piecemodel][piece.piece][piece.rotate][y][x]==1) {
				gbox.blitTile(gbox.getBufferContext(),{dx:th.gfx.x+(x-1+piece.x)*th.gfx.ts.tilew,dy:th.gfx.y+((y+piece.y-th.config.field.vanishinglines)*th.gfx.ts.tileh),tileset:th.config.gfx.tileset,tile:this.palettes[th.config.gfx.palette][color]+(Math.floor(10*dark)*th.gfx.ts.tilerow)});
			if (thd&&(this.getinfield(th,piece.x+x+1,piece.y+y)===null)&&(!this.pieces[th.config.field.piecemodel][piece.piece][piece.rotate][y][x+1]))
				gbox.blitTile(gbox.getBufferContext(),{dx:th.gfx.x+(x+piece.x)*th.gfx.ts.tilew,dy:th.gfx.y+(y-th.config.field.vanishinglines+piece.y)*th.gfx.ts.tileh,tileset:th.config.gfx.tileset,w:th.gfx.ts.tilehw,tile:this.palettes[th.config.gfx.palette][color]+((thd+Math.floor((10-thd)*dark))*th.gfx.ts.tilerow)});
		   }
	},
	
	pickdarkening:function(th) {
		return (th.timing.lockdelay>0?((th.config.timing.lockdelay-th.timing.lockdelay)*th.config.gfx.darkenlight)/(th.config.timing.lockdelay?th.config.timing.lockdelay:1):0);
	},
	
	renderpiece:function(th) {
		if (th.falling.piece!=-1)  { 
			 if (th.config.field.ghost) {
				var oldghost=this.copypiece(th.falling);
				do {oldghost.y++;} while (this.fits(th,oldghost)); oldghost.y--;
				if (oldghost.y!=th.falling.y) 
					this.renderblock(th,oldghost,oldghost.piece,th.config.gfx.ghostlight);
				else oldghost=0;
			}
			this.renderblock(th,th.falling,th.falling.piece,this.pickdarkening(th),th.config.gfx.fallingthd); 		
		}
	},
	
	applyfieldmods:function(th,parms,value) {
		if (parms.prefix)
			value=parms.prefix+value;
		if (parms.suffix)
			value=value+parms.suffix;
		return value;
	},
	
	fieldtoscreen:function(th) {
		var piece;
		var piecerot;
		var subj;
		var isok;
		th.blink=(th.blink+1)%2;
		if (th.gfx.dirty) { // If the map is dirty, redraw the field's surface
			this.blitfield(th,th.gfx.dirty);
			th.gfx.dirty=null;
		}
		for (var i=0;i<th.config.gfx.blits.length;i++) {
			isok=(!th.config.gfx.blits[i].ifcondition)||(th.checkedconditions[th.config.gfx.blits[i].ifcondition]!=null);
			isok&=(!th.config.gfx.blits[i].ifgrading)||(th.config.score.grading!=null);
			isok&=(!th.config.gfx.blits[i].ifmedals)||(th.config.score.medals!=null);
			isok&=(!th.config.gfx.blits[i].ifconfig)||(th.config[th.config.gfx.blits[i].ifconfig[0]][th.config.gfx.blits[i].ifconfig[1]]!=null);
				if (
					isok
				) {
				if (th.config.gfx.blits[i].subj) subj=th[th.config.gfx.blits[i].subj]; else subj=th;
				if (th.config.gfx.blits[i].caplabel)
					piece=th.checkedconditions[th.config.gfx.blits[i].caplabel];
				else if (th.config.gfx.blits[i].caponlabel)
					piece=(th[th.config.gfx.blits[i].caponlabel]>th.checkedconditions[th.config.gfx.blits[i].caponlabel]?th.checkedconditions[th.config.gfx.blits[i].caponlabel]:th[th.config.gfx.blits[i].caponlabel])+"/"+th.checkedconditions[th.config.gfx.blits[i].caponlabel];
				else if (th.config.gfx.blits[i].label)
					piece=subj[th.config.gfx.blits[i].label];
				else piece=th.config.gfx.blits[i].text;
				if (piece) piece=this.applyfieldmods(th,th.config.gfx.blits[i],piece);
				
				switch (th.config.gfx.blits[i].type) {
					case "labelmap":{
						if (piece) gbox.blitTile(gbox.getBufferContext(),{dx:th.gfx.x+th.config.gfx.blits[i].dx,dy:th.gfx.y+th.config.gfx.blits[i].dy,tileset:(th.config.gfx.blits[i].blink?(th.blink?th.config.gfx.blinkprefix:""):"")+th.config.gfx.blits[i].map[piece].tileset,tile:th.config.gfx.blits[i].map[piece].tile});
						break;
					}
					case "medalsmap":{
						if (th.medalslabels) {
							var py=0;
							for (var j=0;j<th.medalslabels.length;j++) {
								if (th.medalslabels[j]) {
									piece=this.applyfieldmods(th,th.config.gfx.blits[i],th.medalslabels[j]);
									gbox.blitTile(gbox.getBufferContext(),{dx:th.gfx.x+th.config.gfx.blits[i].dx,dy:th.gfx.y+th.config.gfx.blits[i].dy+py,tileset:(th.config.gfx.blits[i].blink?(th.blink?th.config.gfx.blinkprefix:""):"")+th.config.gfx.blits[i].map[piece].tileset,tile:th.config.gfx.blits[i].map[piece].tile});
									py+=gbox.getTiles(th.config.gfx.blits[i].map[piece].tileset).tileh+1;
								}
							}
						}
						break;
					}
					case "background":{
						if (th.backgroundscroller<th.config.gfx.backgrounds[th.background].scroll) {
							th.backgroundscrollertime++;
							if (th.backgroundscrollertime>th.config.gfx.backgrounds[th.background].speed) {
								th.backgroundscroller++;
								th.backgroundscrollertime=0;
							}
						}
						gbox.blit(gbox.getBufferContext(),gbox.getImage(th.config.gfx.backgrounds[th.background].image),{dx:0,dy:0,y:th.backgroundscroller,dh:gbox.getScreenH(),dw:gbox.getScreenW()});
						break;
					}
					case "dump": {
						var ts=gbox.getFont(th.config.gfx.blits[i].font);
						var py=0;
						for (var x in piece) {
							gbox.blitText(gbox.getBufferContext(),{
								font:th.config.gfx.blits[i].font,
								dx:th.gfx.x+th.config.gfx.blits[i].dx,
								dy:th.gfx.y+th.config.gfx.blits[i].dy+(py*ts.tileh),
								dw:th.config.gfx.blits[i].dw,
								halign:th.config.gfx.blits[i].align,
								text:x+": "+(piece[x]?piece[x]:"---")
							});
							py++;
						}
						break;
					}
					case "staffroll":{
						if (th.staffroll&&th.running&&!th.paused) {
							toys.dialogue.render(th,"staffroll",th.staffroll);
							th.staffrolldone=(toys.getToyValue(th,"staffroll","wait",false)?1:0)
						}
						break;
					}
					case "label": {
						
						if (piece!==null) gbox.blitText(gbox.getBufferContext(),{
												font:(th.gfx.x+th.config.gfx.blits[i].blink?(th.blink?th.config.gfx.blinkprefix:""):"")+th.config.gfx.blits[i].font,
												dx:th.gfx.x+th.config.gfx.blits[i].dx,
												dy:th.gfx.y+th.config.gfx.blits[i].dy,
												dw:th.config.gfx.blits[i].dw,
												halign:th.config.gfx.blits[i].align,
												text:""+piece
											});
						break;
					}
					case "debug":{
						var ft=gbox.getFont(th.config.gfx.blits[i].font);
						for (var l=0;l<th.debug.length;l++)
							gbox.blitText(gbox.getBufferContext(),{ font:th.config.gfx.blits[i].font, dx:th.gfx.x+th.config.gfx.blits[i].dx, dy:th.gfx.y+th.config.gfx.blits[i].dy+(l*ft.tileh),text:th.debug[l]}); gl++;
		
						break;
					}
					case "allstats": {
						var gl=0;
						var ft=gbox.getFont(th.config.gfx.blits[i].font);
						gbox.blitText(gbox.getBufferContext(),{ font:th.config.gfx.blits[i].font, dx:th.gfx.x+th.config.gfx.blits[i].dx, dy:th.gfx.y+th.config.gfx.blits[i].dy+(gl*ft.tileh),text:"   ST:"+th.match+" RT:"+th.config.timing.kickset}); gl++;
						gbox.blitText(gbox.getBufferContext(),{ font:th.config.gfx.blits[i].font, dx:th.gfx.x+th.config.gfx.blits[i].dx, dy:th.gfx.y+th.config.gfx.blits[i].dy+(gl*ft.tileh),text:" FALL: a:"+th.falling.activetime+" FIR:"+(th.firstpiece?"Y":"N")+" HD:"+th.falling.harddrop+" F:"+th.falling.floorkicks}); gl++;
						gbox.blitText(gbox.getBufferContext(),{ font:th.config.gfx.blits[i].font, dx:th.gfx.x+th.config.gfx.blits[i].dx, dy:th.gfx.y+th.config.gfx.blits[i].dy+(gl*ft.tileh),text:"  B2B:"+th.backtoback}); gl++;
						gbox.blitText(gbox.getBufferContext(),{ font:th.config.gfx.blits[i].font, dx:th.gfx.x+th.config.gfx.blits[i].dx, dy:th.gfx.y+th.config.gfx.blits[i].dy+(gl*ft.tileh),text:"-MODE:"+th.config.score.gamemode}); gl++;
						gbox.blitText(gbox.getBufferContext(),{ font:th.config.gfx.blits[i].font, dx:th.gfx.x+th.config.gfx.blits[i].dx, dy:th.gfx.y+th.config.gfx.blits[i].dy+(gl*ft.tileh),text:"  ARE: "+th.config.timing.are}); gl++;
						gbox.blitText(gbox.getBufferContext(),{ font:th.config.gfx.blits[i].font, dx:th.gfx.x+th.config.gfx.blits[i].dx, dy:th.gfx.y+th.config.gfx.blits[i].dy+(gl*ft.tileh),text:"  DAS: "+th.config.control.das+"/"+th.config.control.initialdas}); gl++;
						gbox.blitText(gbox.getBufferContext(),{ font:th.config.gfx.blits[i].font, dx:th.gfx.x+th.config.gfx.blits[i].dx, dy:th.gfx.y+th.config.gfx.blits[i].dy+(gl*ft.tileh),text:" LOCK: "+th.timing.lockdelay+"/"+th.config.timing.lockdelay+" G:"+th.config.timing.gravity+" DT:"+th.timing.droptime}); gl++;
						gbox.blitText(gbox.getBufferContext(),{ font:th.config.gfx.blits[i].font, dx:th.gfx.x+th.config.gfx.blits[i].dx, dy:th.gfx.y+th.config.gfx.blits[i].dy+(gl*ft.tileh),text:"LINEC: "+th.config.timing.linecleardelay}); gl++;
						gbox.blitText(gbox.getBufferContext(),{ font:th.config.gfx.blits[i].font, dx:th.gfx.x+th.config.gfx.blits[i].dx, dy:th.gfx.y+th.config.gfx.blits[i].dy+(gl*ft.tileh),text:"LEVEL: "+th.level+"/"+th.boostedlevel+" (F:"+th.config.score.forcedlinesevery+" C:"+th.config.score.levelcap+")"}); gl++;
						var tmp=0;
						for (var y=0;y<th.config.field.height-1;y++)
						for (var x=1;x<th.config.field.width-1;x++) if (this.getinfield(th,x,y)!=null) tmp++;
						gbox.blitText(gbox.getBufferContext(),{ font:th.config.gfx.blits[i].font, dx:th.gfx.x+th.config.gfx.blits[i].dx, dy:th.gfx.y+th.config.gfx.blits[i].dy+(gl*ft.tileh),text:" SECT: "+th.currentsection+" ("+(th.fieldiscritical?"YES":"NO ")+":"+th.occupiedblocks+"("+tmp+")^"+th.config.score.blocksforcritical+"v"+th.config.score.blocksforrecovery+")"}); gl++;					
						gbox.blitText(gbox.getBufferContext(),{ font:th.config.gfx.blits[i].font, dx:th.gfx.x+th.config.gfx.blits[i].dx, dy:th.gfx.y+th.config.gfx.blits[i].dy+(gl*ft.tileh),text:"STAGE: "+th.stage+"("+th.stagelabel+")"}); gl++;
	
						gbox.blitText(gbox.getBufferContext(),{ font:th.config.gfx.blits[i].font, dx:th.gfx.x+th.config.gfx.blits[i].dx, dy:th.gfx.y+th.config.gfx.blits[i].dy+(gl*ft.tileh),text:"COMBO: "+th.combo}); gl++;
						if (th.config.score.internalgrade) 
							gbox.blitText(gbox.getBufferContext(),{ font:th.config.gfx.blits[i].font, dx:th.gfx.x+th.config.gfx.blits[i].dx, dy:th.gfx.y+th.config.gfx.blits[i].dy+(gl*ft.tileh),text:"-IGR:"+th.config.score.internalgrade}); gl++;
						if (th.config.score.grading) {
							gbox.blitText(gbox.getBufferContext(),{ font:th.config.gfx.blits[i].font, dx:th.gfx.x+th.config.gfx.blits[i].dx, dy:th.gfx.y+th.config.gfx.blits[i].dy+(gl*ft.tileh),text:"-GRD:"+th.config.score.grading}); gl++;
							gbox.blitText(gbox.getBufferContext(),{ font:th.config.gfx.blits[i].font, dx:th.gfx.x+th.config.gfx.blits[i].dx, dy:th.gfx.y+th.config.gfx.blits[i].dy+(gl*ft.tileh),text:"GRDIN: "+th.grading}); gl++;
							gbox.blitText(gbox.getBufferContext(),{ font:th.config.gfx.blits[i].font, dx:th.gfx.x+th.config.gfx.blits[i].dx, dy:th.gfx.y+th.config.gfx.blits[i].dy+(gl*ft.tileh),text:"GLBLS: "+th.gradelabels}); gl++;
							gbox.blitText(gbox.getBufferContext(),{ font:th.config.gfx.blits[i].font, dx:th.gfx.x+th.config.gfx.blits[i].dx, dy:th.gfx.y+th.config.gfx.blits[i].dy+(gl*ft.tileh),text:"GRLBL: "+th.gradelabel+"("+th.gradeid+")"}); gl++;
						}
						if (th.config.score.medals) {
							gbox.blitText(gbox.getBufferContext(),{ font:th.config.gfx.blits[i].font, dx:th.gfx.x+th.config.gfx.blits[i].dx, dy:th.gfx.y+th.config.gfx.blits[i].dy+(gl*ft.tileh),text:"-MED:"+th.config.score.medals}); gl++;
							gbox.blitText(gbox.getBufferContext(),{ font:th.config.gfx.blits[i].font, dx:th.gfx.x+th.config.gfx.blits[i].dx, dy:th.gfx.y+th.config.gfx.blits[i].dy+(gl*ft.tileh),text:"MEDAL: "+th.medals}); gl++;
							gbox.blitText(gbox.getBufferContext(),{ font:th.config.gfx.blits[i].font, dx:th.gfx.x+th.config.gfx.blits[i].dx, dy:th.gfx.y+th.config.gfx.blits[i].dy+(gl*ft.tileh),text:"MELBL: "+th.medalslabels}); gl++;
						}
						if (th.config.score.torikan) {
							gbox.blitText(gbox.getBufferContext(),{ font:th.config.gfx.blits[i].font, dx:th.gfx.x+th.config.gfx.blits[i].dx, dy:th.gfx.y+th.config.gfx.blits[i].dy+(gl*ft.tileh),text:"-TOR:"+th.config.score.torikan}); gl++;
							gbox.blitText(gbox.getBufferContext(),{ font:th.config.gfx.blits[i].font, dx:th.gfx.x+th.config.gfx.blits[i].dx, dy:th.gfx.y+th.config.gfx.blits[i].dy+(gl*ft.tileh),text:"TORIK: "+th.torikan}); gl++;
						}
						gl++;
						gbox.blitText(gbox.getBufferContext(),{ font:th.config.gfx.blits[i].font, dx:th.gfx.x+th.config.gfx.blits[i].dx, dy:th.gfx.y+th.config.gfx.blits[i].dy+(gl*ft.tileh),text:"T:"+th.overall.tetris+" L:"+th.overall.lines+" B:"+th.overall.bravo+" C:"+th.overall.combo+" R:"+th.overall.recovery+" S:"+th.overall.score}); gl++;
						gbox.blitText(gbox.getBufferContext(),{ font:th.config.gfx.blits[i].font, dx:th.gfx.x+th.config.gfx.blits[i].dx, dy:th.gfx.y+th.config.gfx.blits[i].dy+(gl*ft.tileh),text:"I:"+th.overall.idlepieces+ " T:"+th.overall.timerstring+" "+th.overall.time}); gl++;
						gl++;
						gbox.blitText(gbox.getBufferContext(),{ font:th.config.gfx.blits[i].font, dx:th.gfx.x+th.config.gfx.blits[i].dx, dy:th.gfx.y+th.config.gfx.blits[i].dy+(gl*ft.tileh),text:"--DATA"}); gl++;
						for (var va in th.data) {
							gbox.blitText(gbox.getBufferContext(),{ font:th.config.gfx.blits[i].font, dx:th.gfx.x+th.config.gfx.blits[i].dx, dy:th.gfx.y+th.config.gfx.blits[i].dy+(gl*ft.tileh),text:va+":"+th.data[va]}); gl++;
						}
						break;
					}
					case "sectionstats":{
						var gl=0;
						var ft=gbox.getFont(th.config.gfx.blits[i].font);
						gbox.blitText(gbox.getBufferContext(),{ font:th.config.gfx.blits[i].font, dx:th.gfx.x+th.config.gfx.blits[i].dx, dy:th.gfx.y+th.config.gfx.blits[i].dy+(gl*ft.tileh),text:"SECTIONS"}); gl++;
						for (var j=(th.sectionstats.length>6?th.sectionstats.length-6:0);j<th.sectionstats.length;j++) {
							gbox.blitText(gbox.getBufferContext(),{ font:th.config.gfx.blits[i].font, dx:th.gfx.x+th.config.gfx.blits[i].dx, dy:th.gfx.y+th.config.gfx.blits[i].dy+(gl*ft.tileh),text:j+")T:"+th.sectionstats[j].tetris+" L:"+th.sectionstats[j].lines+" B:"+th.sectionstats[j].bravo+" C:"+th.sectionstats[j].combo+" R:"+th.sectionstats[j].recovery+" S:"+th.sectionstats[j].score}); gl++;
							gbox.blitText(gbox.getBufferContext(),{ font:th.config.gfx.blits[i].font, dx:th.gfx.x+th.config.gfx.blits[i].dx, dy:th.gfx.y+th.config.gfx.blits[i].dy+(gl*ft.tileh),text:"I:"+th.sectionstats[j].idlepieces+ " T:"+th.sectionstats[j].timerstring+" "+th.sectionstats[j].time}); gl++;
							gbox.blitText(gbox.getBufferContext(),{ font:th.config.gfx.blits[i].font, dx:th.gfx.x+th.config.gfx.blits[i].dx, dy:th.gfx.y+th.config.gfx.blits[i].dy+(gl*ft.tileh),text:"P:"+th.sectionstats[j].pieces+" R:"+th.sectionstats[j].rotations+" /:"+th.sectionstats[j].rotperpiece}); gl++;
						}
						break;
					}
					case "field": {
						gbox.blitAll(gbox.getBufferContext(),gbox.getCanvas(th.gfx.surfaceid),{dx:th.gfx.x,dy:th.gfx.y});
						break;
					}
					case "message": {
						if (th.messagetimer) {
							var blh=gbox.getFont(th.config.gfx.blits[i].font).tileh*th.message.length;
							for (var j=0;j<th.message.length;j++)
								gbox.blitText(gbox.getBufferContext(),{ font:th.config.gfx.blits[i].font, dx:th.gfx.x+th.config.gfx.blits[i].dx, dy:th.gfx.y+th.config.gfx.blits[i].dy+(j*gbox.getFont(th.config.gfx.blits[i].font).tileh)-blh,text:th.message[j]}); gl++;
							th.messagetimer--;
							if (!th.messagetimer) th.message=[];
						}						
						break;
					}
					case "falling": {
						if (th.config.gfx.dropanimation&&th.gfx.dropanimation) {
							switch (th.config.gfx.dropanimation.type) {
								case "tgm": {
									for (var s=0;s<th.gfx.dropanimation.steps;s++)
										this.rawrenderpiece(th,th.config.field.piecemodel,gbox.getTiles(th.config.gfx.tileset),th.gfx.dropanimation.piece.piece,th.gfx.dropanimation.piece.rotate,th.gfx.dropanimation.piece.piece,0,th.gfx.x+((th.gfx.dropanimation.piece.x-1)*th.gfx.ts.tilew),th.gfx.y+((th.gfx.dropanimation.piece.y-th.config.field.vanishinglines-s-1)*th.gfx.ts.tileh),0,false)				
									th.gfx.dropanimation=null; // Single frame
									break;
								}
								case "trail": {
									for (var s=0;s<th.gfx.dropanimation.steps;s++)
										toys.generate.sparks.simple({x:help.random(0,th.gfx.ts.tilew*3)+th.gfx.x+((th.gfx.dropanimation.piece.x-1)*th.gfx.ts.tilew),y:th.gfx.y+((th.gfx.dropanimation.piece.y-th.config.field.vanishinglines-s-1)*th.gfx.ts.tileh),hw:th.gfx.ts.tilehw,hh:th.gfx.ts.tilehh},"sparks",null,{accx:th.config.gfx.dropanimation.accx,accy:th.config.gfx.dropanimation.accy,frames:th.config.gfx.dropanimation.frames,animspeed:th.config.gfx.dropanimation.animspeed,tileset:th.config.gfx.dropanimation.tileset});
									th.gfx.dropanimation=null; // Single frame
									break;
								}
								default: {
									th.gfx.dropanimation=null;
									break;
								}
							}
						}
						
						this.renderpiece(th);
						
						if (th.config.gfx.lockanimation&&th.gfx.lockanimation) {
							switch (th.config.gfx.lockanimation.type) {
								case "flash": {
									this.rawrenderpiece(th,th.config.field.piecemodel,gbox.getTiles(th.config.gfx.tileset),th.gfx.lockanimation.piece.piece,th.gfx.lockanimation.piece.rotate,null,0,th.gfx.x+((th.gfx.lockanimation.piece.x-1)*th.gfx.ts.tilew),th.gfx.y+((th.gfx.lockanimation.piece.y-th.config.field.vanishinglines)*th.gfx.ts.tileh),0,false)				
									th.gfx.lockanimation.cnt++;
									if ((!th.config.gfx.lockanimation.duration)||(th.gfx.lockanimation.cnt>=th.config.gfx.lockanimation.duration)) th.gfx.lockanimation=null;
									break;
								}
								case "spark": {
									toys.generate.sparks.simple({x:th.gfx.x+((th.gfx.lockanimation.piece.x-1)*th.gfx.ts.tilew),y:th.gfx.y+((th.gfx.lockanimation.piece.y-th.config.field.vanishinglines)*th.gfx.ts.tileh),hw:th.gfx.ts.tilehw*4*th.config.field.big,hh:th.gfx.ts.tilehh*4*th.config.field.big},"sparks",null,{accx:th.config.gfx.lockanimation.accx,accy:th.config.gfx.lockanimation.accy,frames:th.config.gfx.lockanimation.frames,animspeed:th.config.gfx.lockanimation.animspeed,tileset:th.config.gfx.lockanimation.tileset});
									th.gfx.lockanimation=null; // Single frame
									break;
								}
								default: {
									th.gfx.lockanimation=null;
								}
							}
						}
						
						
						
						break;
					}
					case "blit":{
						gbox.blitTile(gbox.getBufferContext(),{dx:th.gfx.x+th.config.gfx.blits[i].dx,dy:th.gfx.y+th.config.gfx.blits[i].dy,tileset:th.config.gfx.blits[i].tileset,tile:th.config.gfx.blits[i].tile});
						break;
					}
					case "piece":{
						piece=null;
						switch (th.config.gfx.blits[i].piece) {
							case this.cons.piece.next: {
								if (th.config.gfx.blits[i].nextid<th.nextpile.length) piece=th.nextpile[th.config.gfx.blits[i].nextid];
								break;
							}
							case this.cons.piece.hold: {
								piece=th.hold;
								break;
							}
						}
						if ((piece!=null)&&(piece.piece!=-1)) this.rawrenderpiece(th,th.gfx.previewset,gbox.getTiles((th.config.gfx.blits[i].tileset==null?th.config.gfx.tileset:th.config.gfx.blits[i].tileset)),piece.piece,piece.rotate,piece.piece,th.config.gfx.blits[i].dark,th.gfx.x+th.config.gfx.blits[i].dx,th.gfx.y+th.config.gfx.blits[i].dy,(th.config.gfx.blits[i].thd==null?th.config.gfx.thd:th.config.gfx.blits[i].thd),true)
						break;
					}
					case "extraactions":{
						if (th.config.field.extraactions) this.extraactions[th.config.field.extraactions](th,"blit",null);
						break;
					}
				}
			}
		}

			
		if (th.animation) {
			switch (th.animation.type) {
				case "shake":{
					if (th.animation.time==null) {
						th.animation.time=th.animation.duration+th.animation.still;
						th.animation.ts=gbox.getTiles(th.animation.tileset);
					} else th.animation.time--;
					gbox.blitTile(gbox.getBufferContext(),{dx:th.gfx.x+th.gfx.fieldhw-th.animation.ts.tilehw+(th.animation.time>th.animation.still?th.animation.time%2:0),dy:th.gfx.y+th.gfx.fieldhh-th.animation.ts.tilehh,tileset:th.animation.tileset,tile:th.animation.tile});
					break;
				}
				case "readygo": {
					if (th.animation.time==null) {
						th.animation.frame=-1;
						th.animation.time=0;
						th.animation.ts=gbox.getTiles(th.animation.tileset);
					} else th.animation.time--;
					if (!th.animation.time) {
						th.animation.frame++;
						if (th.animation.frame>=th.animation.tiles.length) {
							th.animation=null;
							break;
						} else th.animation.time=this.convertframes(th,sec2frames(th,th.animation.times[th.animation.frame]));
					}
					gbox.blitTile(gbox.getBufferContext(),{dx:th.gfx.x+th.gfx.fieldhw-th.animation.ts.tilehw,dy:th.gfx.y+th.gfx.fieldhh-th.animation.ts.tilehh,tileset:th.animation.tileset,tile:th.animation.tiles[th.animation.frame]});
					break;
				}
			}
		}
	},
	
	vkbd:function(th,v,fr) {
  
		if ((!th.keyboard[fr])&&(v==1)) th.keyboard[fr]=th.config.control.initialdas;
		else if (v==0) th.keyboard[fr]=0; else if (v==-1) th.keyboard[fr]=-1;
		
	},
	
	// Map the gbox keyboard to the block virtual keyboard
	kgboxtovkbd:function(th) {
		for (var fr=0;fr<this.keymap.length;fr++) {
			if (gbox.keyIsHit(this.keymap[fr])) this.vkbd(th,1,fr); else
			if (gbox.keyIsReleased(this.keymap[fr])) this.vkbd(th,0,fr);
		}
	},

	message:function(th,text) {
		th.message.push(saveme(text));
		if (th.debugging) this.debug(th,"---"+saveme(text));
		th.messagetimer=this.convertframes(th,sec2frames(th,th.config.gfx.messagetime));
	},


	pushline:function(th,line) { // Adds a line in garbage style
		var lastline=th.config.field.height-2;
		for (var y=0;y<lastline;y++)
			for (x=1;x<th.config.field.width-1;x++)
				this.copyinfield(th,x,y+1,x,y);
		for (var x=1;x<th.config.field.width-1;x++) 
			this.setinfield(th,x,lastline,(line[x-1]==null?null:{color:line[x-1]}));
	},

	clearline:function(th,line) { // Remove a line from the bottom of the field. Used usually for award to the player
		var lastline=line;
		for (var y=lastline;y>0;y--)
			for (x=1;x<th.config.field.width-1;x++)
				this.copyinfield(th,x,y-1,x,y);
		for (var x=1;x<th.config.field.width-1;x++) 
			this.setinfield(th,x,0,null);
	},

	
	randomgarbage:function(th,color,holes) { // creates a random garbage line
		var gar=[];
		var h;
		for (x=0;x<th.config.field.width-2;x++)
				gar.push(color);
		while (holes>0) {
			h=help.random(0,th.config.field.width-2);
			if (gar[h]!=null) {
				gar[h]=null;
				holes--;
			}
		}
		return gar;
	},
	
	// --- GAME ENDING
	
	stopgame:function(th,withanimation) {
		th.running=false;
		th.beforequitting=block.convertmsec(th,1000);
		if (th.beforequitting<10) th.beforequitting=10;
		th.endinganimation=withanimation;
		th.endinganimationstep=0;
	},

	gameover:function(th) {
		if (th.clearongameover)
			this.gameclear(th);
		else {
			if (th.debugging) this.debug(th,"GAME OVER");
			th.match="fail";
			this.stopgame(th,"gameoveranimation");
		}
	},
	
	gameclear:function(th) {
		if (th.debugging) this.debug(th,"GAME CLEAR");
		th.match="success";
		this.stopgame(th,"gameclearanimation");
	},
	
	
	// --- FULL FIELD EFFECTS
	
	fullfieldeffect:function(th) {
		for (var y=th.config.field.vanishinglines;y<th.config.field.height-1;y++)
			for (var x=1;x<th.config.field.width-1;x++)
				if (th.field[y][x])
					if (th.field[y][x].vanishtime) {
						th.field[y][x].vanishtime--;
						this.setfielddirty(th,x,y);
					}
	},
	
	// --- FIELD HANDLING
	
	getinfield:function(th,x,y) {
		return th.field[y][x];
	},
	
	setfielddirty:function(th,x,y) {
		if (th.gfx.dirty!=this.cons.fulldirty) {
			if (!th.gfx.dirty) th.gfx.dirty={};
			if (!th.gfx.dirty[y]) th.gfx.dirty[y]={};
			
			th.gfx.dirty[y][x]=true;
		}
	},
	
	getcolorinfield:function(th,x,y) {
		return (th.field[y][x]?th.field[y][x].color:null);
	},
	
	setinfield:function(th,x,y,data) {
		if ((data==null)||(data.color==null)) {
			if (this.getcolorinfield(th,x,y)!=null) th.occupiedblocks--;
		} else {
			if (this.getcolorinfield(th,x,y)==null) th.occupiedblocks++;
		}
		th.field[y][x]=help.cloneObject(data);
		this.setfielddirty(th,x,y);
	},
	
	copyinfield:function(th,x,y,tx,ty) {
		this.setinfield(th,tx,ty,th.field[y][x]);
	},

	
	initfield:function(th) {
		th.field=Array(th.config.field.height);
		th.buffer=Array(th.config.field.height);
		for (var i=0;i<th.config.field.height;i++) {
			th.field[i]=Array(th.config.field.width);
			th.buffer[i]=Array(th.config.field.width);
			for (var x=0;x<th.config.field.width;x++)
				th.field[i][x]=null;
			th.field[i][0]={type:this.cons.block.floor};
			th.field[i][th.config.field.width-1]={type:this.cons.block.floor};
		}
		for (i=0;i<th.config.field.width;i++)
		th.field[th.config.field.height-1][i]=this.cons.block.floor;
		th.fieldiscritical=false; // Reset critical to avoid Recovery
		th.gfx.dirty=this.cons.fulldirty;
		th.occupiedblocks=0;
	},
	
	// --- TGM MEDALS HANDLING


	applymedal:function(th,id,medal) {
		th.medals[id]=medal;
		th.medalslabels[id]=this.medals[th.config.score.medals].medals[id][medal].label;
		if (th.debugging) this.debug(th,"New medal: "+th.medals[id]+" ("+th.medalslabels[id]+")");
	},
	
	cancelmedal:function(th,id) {
		if (th.debugging) this.debug(th,"Failed medal: "+th.medalslabels[id]);
		th.medals[id]=null;
	},
	
	
	checkmedals:function(th,phase) {
		var ev;
		var done;
		
		if (!th.medals) {
			th.medals=[];
			th.medalslabels=[];
			for (var i=0;i<this.medals[th.config.score.medals].starting.length;i++)
				this.applymedal(th,i,this.medals[th.config.score.medals].starting[i]);
		}
		for (var i=0;i<th.medals.length;i++) {
			done=true;
			var __delme=0;
			while (!done) {
				
				if ((th.medals[i])&&(this.medals[th.config.score.medals].medals[i][th.medals[i]])) { // If medal is available and his checks...
					ev=this.medals[th.config.score.medals].medals[i][th.medals[i]]; // Get medal conditions
					if (ev.promote&&(!ev.condition||this.simplelogicevaluator(th,ev.condition,phase))) { // if there is a conditional check...
						done=true;
						for (var x=0;x<ev.promote.length;x++) // Fetch promotions set
							if (!ev.promote[x].condition||this.simplelogicevaluator(th,ev.promote[x].condition,phase)) { // If promotion conditions are met...
								__delme++;
								if (ev.promote[x].unchainlogic) done=true; else done=false;
								if (ev.promote[x].tomedal) this.applymedal(th,i,ev.promote[x].tomedal); // Go to the specified medal.
								if (ev.promote[x].fail) this.cancelmedal(th,i); // Cancel the medal. Is kept the last label
								break;
							}
					} else done=true;	 
				} else done=true;
			}
			if (th.debugging&&__delme>1) this.debug(th,"checkmedals chained "+__delme+" operations");
		}
		
	},
	
	// --- TGM TORIKAN HANDLING

	checktorikan:function(th,phase) {
		var cond;
		var ev;
		var done;
		
		if (!th.torikan) {
			th.torikan=[];
			for (var i=0;i<this.torikans[th.config.score.torikan].starting.length;i++)
				th.torikan[i]=this.torikans[th.config.score.torikan].starting[i];
		}
		for (var i=0;i<th.torikan.length;i++)  {
			done=false;
			var __delme=0;
			while (!done) {
				
				if ((th.torikan[i])&&(this.torikans[th.config.score.torikan].torikans[i][th.torikan[i]])) { // If torikan is available and his checks...
					ev=this.torikans[th.config.score.torikan].torikans[i][th.torikan[i]]; // Get torikan conditions
					if (ev.apply&&(!ev.condition||this.simplelogicevaluator(th,ev.condition,phase))) { // if there is a conditional check...
						done=true;
						for (var x=0;x<ev.apply.length;x++) // Fetch conditions set
							if (!ev.apply[x].condition||this.simplelogicevaluator(th,ev.apply[x].condition,phase)) { // If condition is met
								__delme++;
								if (ev.apply[x].unchainlogic) done=true; else done=false;
								if (ev.apply[x].setup) this.applysetup(th,ev.apply[x].setup); // Apply the defined torikan behaviour
								if (ev.apply[x].totorikan) th.torikan[i]=ev.apply[x].totorikan; // Check another torikan. (for casacade)
								if (ev.apply[x].fail) th.torikan[i]=null; // Cancel the torikan. Is no longer evalued
								break;
							}
						} else done=true;
				} else done=true;
			}
			if (th.debugging&&__delme>1) this.debug(th,"checktorikan chained "+__delme+" operations");

		}
	},	
	
	
	// --- TGM GRADES HANDLING

	applygrade:function(th,id,grade) {
		th.grading[id]=grade;
		th.gradelabels[id]=this.grades[th.config.score.grading].grades[id][grade].label;
		if (th.debugging) this.debug(th,"New grade: "+th.grading[id]+" ("+th.gradelabels[id]+")");
		if (this.grades[th.config.score.grading].grades[id][grade].gotostagelabel) this.gotostagelabel(th,this.grades[th.config.score.grading].grades[id][grade].gotostagelabel);
		this.calculategradelabel(th);
	},
	
	cancelgrade:function(th,id) {
		th.grading[id]=null;
		th.gradelabels[id]=null;
		this.calculategradelabel(th);
	},
	
	calculategradelabel:function(th) {
		th.gradelabel=null;
		th.gradeid=null;
		for (var i=0;i<th.gradelabels.length;i++)
			if (th.gradelabels[i]) {
				th.gradelabel=th.gradelabels[i];
				th.gradeid=th.grading[i];
			}
	},
	
	checkgrading:function(th,phase) {
		var ev;
		var done;
		
		if (!th.grading) {
			th.grading=[];
			th.gradelabels=[];
			for (var i=0;i<this.grades[th.config.score.grading].starting.length;i++)
				this.applygrade(th,i,this.grades[th.config.score.grading].starting[i]);
		}
		for (var i=0;i<th.grading.length;i++) {
			done=false;
			var __delme=0;
			while (!done) {
				
				if ((th.grading[i])&&(this.grades[th.config.score.grading].grades[i][th.grading[i]])) { // If grade is available and his checks...
					ev=this.grades[th.config.score.grading].grades[i][th.grading[i]]; // Get grade conditions
					if (ev.promote&&(!ev.condition||this.simplelogicevaluator(th,ev.condition,phase))) { // if there is a conditional check...
						done=true;
						for (var x=0;x<ev.promote.length;x++) // Fetch promotions set
							if (!ev.promote[x].condition||this.simplelogicevaluator(th,ev.promote[x].condition,phase)) { // If condition is met
								__delme++;
								if (ev.promote[x].tograde) this.applygrade(th,i,ev.promote[x].tograde); // Go to the specified grade.
								if (ev.promote[x].fail) this.cancelgrade(th,i); // Cancel the grade. Is no longer evalued
								if (ev.promote[x].unchainlogic) done=true; else done=false; // Abort the logic chain (i.e. all "onlock" are triggered, if chained conditions are valid)
								break;
							}
					} else done=true;
				} else done=true;
			}
			if (th.debugging&&__delme>1) this.debug(th,"checkgrading chained "+__delme+" operations");
		}
		
	},
	
	// --- SMALL LOGIC INTERPRETER
	
	simplelogicgetvar:function(th,phrase,pos) {
		if (!phrase[pos])
			return phrase[pos+1];
		else if (phrase[pos]=="data") return th.data[phrase[pos+1]];
		else if (phrase[pos]=="global") return th[phrase[pos+1]];
		else if (phrase[pos]=="section") return th.sectionstats[th.currentsection][phrase[pos+1]];
		else if (phrase[pos]=="diffsection") {
			if (th.debugging) this.debug(th,"("+phrase[pos+1][1]+") "+th.sectionstats[th.currentsection][phrase[pos+1][1]]+"-"+th.sectionstats[phrase[pos+1][2]][phrase[pos+1][1]]+"="+( th.sectionstats[th.currentsection][phrase[pos+1][1]]-th.sectionstats[phrase[pos+1][2]][phrase[pos+1][1]]));
			return th.sectionstats[th.currentsection][phrase[pos+1][1]]-th.sectionstats[phrase[pos+1][2]][phrase[pos+1][1]];
		} else if ((phrase[pos]=="diffavgsection")||(phrase[pos]=="avgsection")||(phrase[pos]=="sumsection")) {
			var sum=0;
			if (th.debugging) var sumlog="";
			for (i=2;i<phrase[pos+1].length;i++) {
				if (th.debugging) sumlog+=th.sectionstats[phrase[pos+1][i]][phrase[pos+1][1]]+"+";
				sum+=th.sectionstats[phrase[pos+1][i]][phrase[pos+1][1]];
			}
			switch (phrase[pos]) {
				case "diffavgsection": {
					if (th.debugging) sumlog=th.sectionstats[th.currentsection][phrase[pos+1][1]]+"-(("+sumlog+")/"+(phrase[pos+1].length-2)+")";
					sum=th.sectionstats[th.currentsection][phrase[pos+1][1]]-(sum/(phrase[pos+1].length-2));
					break;
				}
				case "avgsection": {
					if (th.debugging) sumlog="("+sumlog+")/"+(phrase[pos+1].length-2);
					sum=sum/(phrase[pos+1].length-2);
					break;
				}
			}
			switch (phrase[pos+1][0]) {
				case "floor": { sum=Math.floor(sum); break }
				case "ceil": { sum=Math.ceil(sum); break }
			}
			if (th.debugging) this.debug(th,phrase[pos]+":("+phrase[pos+1][0]+") "+sumlog+"="+sum);
			return sum;
		} else if (phrase[pos]=="calc") {
			var sum=0;
			var value;
			if (th.debugging) var sumlog="";
			for (var i=0;i<phrase[pos+1].length;i++) {
				if (phrase[pos+1][i].value) value=this.simplelogicgetvar(th,phrase[pos+1][i].value,0);
				if (!value) value=0;
				
				switch (phrase[pos+1][i].op) {
					case "+": { sum+=value; if (th.debugging) sumlog+="+"+value; break }
					case "-": { sum-=value; if (th.debugging) sumlog+="-"+value; break }
					case "floor": { sum=Math.floor(sum); if (th.debugging) sumlog+="(floor)"; break }
				}
			}
			if (th.debugging) this.debug(th,"CALC:"+sumlog+"="+sum);
			return sum;
		} else return th[phrase[pos]][phrase[pos+1]];
	},
	
	simplelogicevaluator:function(th,phrase,phase) {
		var ok=false;
		var val=0;
		var comp=0;
		var log=true;
		for (var i=0;i<phrase.length;i++) {
			if (!phrase[i][0]||(phrase[i][0]==phase)) {
				val=this.simplelogicgetvar(th,phrase[i],2);
				comp=this.simplelogicgetvar(th,phrase[i],5);
				switch (phrase[i][4]) {
					case "==": { log=val==comp; break }
					case ">": { log=val>comp; break }
					case "<": { log=val<comp; break }
					case ">=": { log=val>=comp; break }
					case "<=": { log=val<=comp; break }
					case "!=": { log=val!=comp; break }
				}
				switch (phrase[i][1]) {
					case "and": { ok=ok&&log; break }
					case "or": { ok=ok||log; break }
				}
			}
		}
		return ok;
	},
	
	// --- STATS HANDLER
	
	checknextsection:function(th,phase) {
		var done=false;
		var __delme=0;
		while (!done) {
			
			if (this.sectionmarks[th.config.score.sectionmarks][th.currentsection]&&(this.simplelogicevaluator(th,this.sectionmarks[th.config.score.sectionmarks][th.currentsection].condition,phase))) {
				var sec=this.sectionmarks[th.config.score.sectionmarks][th.currentsection].onend;
				if (sec)  { // If there are conditional actions on section
					done=true;
					for (var x=0;x<sec.length;x++) // Fetch sections actions
						if (!sec[x].condition||this.simplelogicevaluator(th,sec[x].condition,phase)) {	// If promotion conditions are met...
							__delme++;
							if (sec[x].unchainlogic) done=true; else done=false;
							this.applysetup(th,sec[x].setup); // Apply the section action
							break;
						}
				}
				this.startnextsection(th);
			} else done=true;
		}
		if (th.debugging&&__delme>1) this.debug(th,"checknextsection chained "+__delme+" operations.");
	},
	
	startnextsection:function(th) {
		// Section stats
		if (th.currentsection>=0)
			th.sectionstats[th.currentsection].rotperpiece=th.sectionstats[th.currentsection].rotations/th.sectionstats[th.currentsection].pieces;
		// Next section
		th.currentsection++;
		th.sectionstats[th.currentsection]={};
		this.resetstats(th,th.sectionstats[th.currentsection]);

	},
	
	resetstats:function(th,v) {
		help.copyModel(v,this.statstemplate); // Prepare stats
		v.linesgroups=[];
	},
	
	addstat:function(th,key,value) {
		this.rawaddstat(th,th.overall,key,value);
		if (th.config.score.sectionmarks) this.rawaddstat(th,th.sectionstats[th.currentsection],key,value);
	},
	
	setstat:function(th,key,value) {
		this.rawsetstat(th,th.overall,key,value);
		if (th.config.score.sectionmarks) this.rawsetstat(th,th.sectionstats[th.currentsection],key,value);
	},

	addlinesgroup:function(th,size,value) {
		this.rawaddlinesgroup(th,th.overall,size,value);
		if (th.config.score.sectionmarks) this.rawaddlinesgroup(th,th.sectionstats[th.currentsection],size,value);
	},
	
	// --- COUNTERS (update counters and stats)
	
	ticktimer:function(th) {
		this.rawticktimer(th,th.overall);
		if (th.config.score.sectionmarks) this.rawticktimer(th,th.sectionstats[th.currentsection]);
	},
	
	
	setcombo:function(th,value) {
		this.rawsetcombo(th,th.overall,value);
		if (th.config.score.sectionmarks) this.rawsetcombo(th,th.sectionstats[th.currentsection],value);
	},

	
	addscore:function(th,score) {
		this.rawaddscore(th,th.overall,score);
		if (th.config.score.sectionmarks) this.rawaddscore(th,th.sectionstats[th.currentsection],score);
	},
	
	
	
	// --- RAW COUNTERS ( do not includes stats updates)

	rawaddlinesgroup:function(th,stats,size,value) {
		stats.linesgroups[size]+=value;
	},
	
	
	rawaddstat:function(th,stats,key,value) {
		stats[key]+=value;
	},

	rawsetstat:function(th,stats,key,value) {
		stats[key]=value;
	},
	
	rawticktimer:function(th,stats) {
		stats.fr++;
	  if (stats.fr==gbox.getFps()) {
	  	stats.s++;
	  	stats.secs++;
	  	if (stats.s>59) {
	  		stats.m++;
	  		stats.s=0;
	  	}
	  	stats.fr=0;
	  	
	  }
	  stats.csec=Math.floor((stats.fr*100)/gbox.getFps());
	  stats.time=stats.secs+(stats.csec/100);
	  stats.timerstring=help.prepad(stats.m,2,"0")+":"+help.prepad(stats.s,2,"0")+":"+help.prepad(stats.csec,2,"0")
	},
	
	rawsetcombo:function(th,stats,value) {
		if (value>stats.combo) stats.combo=value;
	},

	rawaddscore:function(th,stats,value) {
		stats.score+=value;
		if ((th.config.score.scorecap!=null)&&(stats.score>th.config.score.scorecap))
			stats.score=th.config.score.scorecap;
	},
	
	// --- BIG set generator
	
	zoomgrid:function(th,map,zoom) {
		var ret=[];
		for (var y=0;y<map.length;y++) {
			for (var yz=0;yz<zoom;yz++) {
				ret[(y*zoom)+yz]=[];
				for (var x=0;x<map[y].length;x++) {
					for (var xz=0;xz<zoom;xz++)
						ret[(y*2)+yz].push(map[y][x]);
				}
			}
		}
		return ret;
	},
	
	zoompieces:function(th,map,zoom) {
		if (!map) return map;
		var ret=[];
		for (var p = 0;p<map.length;p++) {
			if (!map[p]) ret[p]=map[p]; else {
				ret[p]=[];
				for (var r=0;r<map[p].length;r++)
					if (!map[p][r]) ret[p][r]=map[p][r]; else
					ret[p][r]=this.zoomgrid(th,map[p][r],zoom);
			}
		}
		return ret;
	},
	
	zoomobject:function(th,map,zoom) {
		if (!map) return map;
		if (map.constructor == Array) {
			var ret=[];
			for (var i=0;i<map.length;i++)
				ret[i]=this.zoomobject(th,map[i],zoom);
			return ret;
		} else if (map.constructor == Object) {
			var ret={};
			for (var i in map) {
				if ((typeof map[i]== "string")||(typeof map[i]== "boolean")) ret[i]=map[i]; else
				if (i=="map") ret[i]=this.zoomgrid(th,map[i],zoom); else	
				if ((i=="floorkick")||(i=="kicks")) ret[i]=map[i]; else
				ret[i]=this.zoomobject(th,map[i],zoom);
			}
			return ret;
		} else return map*zoom;
	},
	
	dump:function(v) {
		if (!v) return v+"";
		ret="";
		if (v.constructor == Array) {
			var ret="[";
			for (var i=0;i<v.length;i++)
				ret+=this.dump(v[i])+",";
			ret+="]\n";
			return ret;
		} else if (v.constructor == Object) {
			var ret="{";
			for (var i in v) {
				ret+=i+":"+this.dump(v[i])+",";
			}
			ret+="}\n";
			return ret;
		} else return v;
	},
	
	makebigset:function(th,zoom) {
		var newname;
		
		if (th.config.field.piecemodel) {
			newname="big_"+th.config.field.piecemodel;
			this.pieces[newname]=this.zoompieces(th,this.pieces[th.config.field.piecemodel],zoom);
			
			if (this.tspins[th.config.field.piecemodel])
				this.tspins[newname]=this.zoompieces(th,this.tspins[th.config.field.piecemodel],zoom);

			th.config.field.piecemodel=newname;
		}
		if (th.config.next.spawnpoint) {
			newname="big_"+th.config.next.spawnpoint;
			this.xspawnpoints[newname]=this.zoomobject(th,this.xspawnpoints[th.config.next.spawnpoint],zoom);
			this.yspawnpoints[newname]=this.zoomobject(th,this.yspawnpoints[th.config.next.spawnpoint],zoom);
			th.config.next.spawnpoint=newname;
		}
		if (th.config.control.spinevaluator) {
			
		}
		if (th.config.control.rotationlock) {
			var newrl=[];
			var name;
			for (var i=0;i< th.config.control.rotationlock.length;i++) {
				name=th.config.control.rotationlock[i];
				var newname="big_"+name;
				newrl.push(newname);
				this.rotationlocks[newname]=this.zoomobject(th,this.rotationlocks[name],zoom);
			}
			th.config.control.rotationlock=newrl;
		}
		if (th.config.timing.kickset) {
			var newrl=[];
			var name;
			for (var i=0;i<th.config.timing.kickset.length;i++) {
				name=th.config.timing.kickset[i];
				var newname="big_"+name;
				newrl.push(newname);
				this.kicksets[newname]=this.zoomobject(th,this.kicksets[name],zoom);
			}
			th.config.timing.kickset=newrl;
		}
	},
	
	// -- DEBUG
	
	debug:function(th,line) {
		if (window.console) console.log(line);
		if (th.debug.length==8) {
			for (var i=0;i<th.debug.length-1;i++) {
				th.debug[i]=th.debug[i+1];
			}
			th.debug[th.debug.length-1]=""+line;
		} else th.debug.push(""+line);
	}
	
}
