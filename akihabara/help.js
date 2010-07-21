// ---
// Copyright (c) 2010 Francesco Cottone, http://www.kesiev.com/
// ---

/**
 * Help module provides some Javascript-specific functions, such object copying, randomizing functions, 
 * string/array handlers and the akihabaraInit function, that automatically sets a comfortable 
 * preset of configurations: 25fps, double-sized display for non-mobile devices, dynamic frameskip.
 */
var help={

	/**
	    *  generates numbers from st to ed, skipping skip
	    */
	seq:function(st,ed,skip) {
		var ret=[];
		for (var i=st;i<ed;i+=(skip==null?1:skip)) ret.push(i);
		return ret;
	},

	// Handle a multiplier like counter. that means, 0=1 / 1=1 / 2=2*mul etc...
	multiplier:function(v,mul) {
		return (!v||(v<2)?1:v*(!mul?1:mul));
	},
	
	// pad str with heading pad until is "len" long
	prepad:function(str,len,pad) {
		str+="";
		while (str.length<len) str=pad+str;
		return str;
	},
	
	// pad str with tail pad until is "len" long
	postpad:function(str,len,pad) {
		str+="";
		while (str.length<len) str+=pad;
		return str;
	},

	// true if "th" is squished by "by"
	isSquished:function(th,by) {
		return ((by.accy>0)&&gbox.collides(th,by)&&(Math.abs(th.y-(by.y+by.h))<(th.h/2)))
	},
	// Random number
	random:function(min,range) {
		return min+Math.floor(Math.random()*range);
	},
	// Decides an animation frame.
	// Args: (number,{speed:<animation speed>,frames:<animation sequence>})
	// Outs: the frame
	decideFrame:function(cnt,anim) {
		return anim.frames[Math.floor(cnt/anim.speed)%anim.frames.length];
	},
	// Decides an animation frame that is played once. The last frame is still.
	// Args: (number,{speed:<animation speed>,frames:<animation sequence>})
	// Outs: the frame
	decideFrameOnce:function(cnt,anim) {
		return anim.frames[(cnt>=anim.frames.length*anim.speed?anim.frames.length-1:Math.floor(cnt/anim.speed))];
	},
	// Returns if the animation was fully played at least once with decideFrame or fully with decideFrameOnce.
	// Args: (number,{speed:<animation speed>,frames:<animation sequence>})
	// Outs: the frame
	isLastFrameOnce:function(cnt,anim) {
		return (cnt>=anim.frames.length*anim.speed);
	},
	// Numbers going up and down once reached the half
	// Args: (counter)
	// Outs: the value
	upAndDown:function(counter,max) {
		if ((counter%max)>(max/2)) return max-(counter%max); else return (counter%max);
	},
	
	// Get the tile value in a map, using pixels as coords
	// Args: (x,y,map,<output if any tile is found>,<index of the map array in the passed map>)
	// Outs: the tile or ifout
	getTileInMap:function(x,y,map,ifout,mapid) {
		if (!mapid) mapid="map";
		var ts=gbox._tiles[map.tileset];
		var tx=Math.floor(x/ts.tilew);
		var ty=Math.floor(y/ts.tileh);
		if ((ty<0)||(ty>=map[mapid].length)) return ifout; else
		if ((tx<0)||(tx>=map[mapid][ty].length)) return ifout; else
		return map[mapid][ty][tx];
	},
	// Convert an ascii art array of string to a map. The first argument is the map, the second one is the translation map.
	// i.e. (["---","- -","---"],[[null," "],[1,"-"]]);
	asciiArtToMap:function(map,tra) {
		var sz=tra[0][1].length;
		var ret=[];
		var xpos;
		var pie;
		for (var y=0;y<map.length;y++) {
			var row=[];
			xpos=0;
			while (xpos<map[y].length) {
				pie=map[y].substr(xpos,sz);
				for (var t=0;t<tra.length;t++)
					if (pie==tra[t][1]) {
						if (t==0) row.push(null); else row.push(tra[t][0]);
						break;
					}
				xpos+=sz;
			}
			ret.push(row);
		}
		return ret;
	},
	
	
	// Finalize a map definition, setting height and width in pixels etc.
	// Args: (map)
	// Outs: finalized map
	finalizeTilemap:function(map) {
		var ts=gbox._tiles[map.tileset];
		map.h=map.map.length*ts.tileh;
		map.w=map.map[0].length*ts.tilew;
		map.hw=Math.floor(map.w/2);
		map.hh=Math.floor(map.h/2);
		return map;
	},
	// Converts a x-coord pixel in a x-coord tile
	xPixelToTileX:function(map,x,gap) {
		var ts=gbox._tiles[map.tileset];
		return Math.floor(x/ts.tilew);
	},
	// Converts a x-coord pixel in a x-coord tile
	yPixelToTileY:function(map,y,gap) {
		var ts=gbox._tiles[map.tileset];
		return Math.floor(y/ts.tileh);
	},
	// Converts a x-coord in pixel to the x-coord of the corresponding tile column in pixels
	// Args: (map,x,<gap of the position in tiles>)
	// Outs: the x coord in pixel of the tile column
	xPixelToTile:function(map,x,gap) {
		var ts=gbox._tiles[map.tileset];
		return (Math.floor(x/ts.tilew)+(gap?gap:0))*ts.tilew;
	},
	// Converts a y-coord in pixel to the x-coord of the corresponding tile row in pixels
	// Args: (map,y,<gap of the position in tiles>)
	// Outs: the y coord in pixel of the tile row
	yPixelToTile:function(map,y,gap) {
		var ts=gbox._tiles[map.tileset];
		return (Math.floor(y/ts.tileh)+(gap?gap:0))*ts.tileh;
	},
	// Limit a value between 2 numbers
	// Args: (value,<minimal limit>,<maximal limit>)
	// Outs: the value limited
	limit:function(v,min,max) {
		if (v<min) return min; else if (v>max) return max; else return v;
	},
	// Subtracts or adds 1 to a value to reach 0. i.e passing -3, outs -2. Passing 3, outs 2
	// Args: (value)
	// Outs: new value
	goToZero:function(v) { return (v?v-(v/Math.abs(v)):0); },
	
	// Copy a model on a data set if a value is not defined
	mergeWithModel:function(data,model) {
		if (data==null) data={};
		if (model!=null)
			for (var i in model)
				if (data[i]==null) data[i]=model[i];
		return data;
	},
	
	// Copy a model into data set
	copyModel:function(data,model) {
		if (data==null) data={};
		if (model!=null)
			for (var i in model) data[i]=model[i];
		return data;
	},
	
	// Create a model from an object (copies attributes)
	createModel:function(obj,attrs) {
		var ret={};
		for (var i=0;i<attrs.length;i++) ret[attrs[i]]=obj[attrs[i]];
		return ret;
	},
	
	// Clones an objecy
	cloneObject:function(model) {
		if (!model) return model;
		var data={};
		for (var i in model) data[i]=model[i];
		return data;
	},
	
	// Blit a tile in a map and changes a surface accordingly
	setTileInMap:function(ctx,tilemap,x,y,tile,map) {
		var ts=gbox.getTiles(tilemap.tileset);
		tilemap[(map==null?"map":map)][y][x]=tile;
		if (tile==null)
			gbox.blitClear(ctx,{x:x*ts.tilew,y:y*ts.tilew,h:ts.tileh,w:ts.tilew});
		else
			gbox.blitTile(ctx,{tileset:tilemap.tileset,tile:tile,dx:x*ts.tilew,dy:y*ts.tilew});
	},
	
	// Get the item of an array, if available. Else returns the last one
	getArrayCapped:function(a,id) {
		if (id>=a.length) return a[a.length-1]; else return a[id];
	},
	
	// Get an item of an array of object, using a field as index. is returned the first entry if the field is not valued.
	getArrayIndexed:function(a,value,field) {
		if (a[0][field]==null) return a[0];
		var i=0;
		while ((value>a[i][field])&&(i!=a.length-1)) i++;
		return a[i];
	},
	
			
	// Convert frames to minutes, seconds and csecs
	framestotime:function(frames) {
		var csec=Math.ceil(frames/gbox.getFps()*100);
		return this.prepad((Math.floor(csec/6000)%60),2,"0")+":"+this.prepad((Math.floor(csec/100)%60),2,"0")+":"+this.prepad(csec%100,2,"0");
		
	},
	
	// get an url parameter
	geturlparameter:function( name ) {
	  name = name.replace(/[\[]/,"\\\[").replace(/[\]]/,"\\\]");
	  var regexS = "[\\?&]"+name+"=([^&#]*)";
	  var regex = new RegExp( regexS );
	  var results = regex.exec( window.location.href );
	  if( results == null )
		return "";
	  else
		return results[1];
	},
	
	// transform simple object in string, for debug
	objToStr:function(o) {
		var ret="";
		for (var n in o) ret+=n+":["+o[n]+"] ";
		return ret;
	},
	
	// Check if a variable is defined or not
	isDefined:function(v) {
		return ((typeof(v) !== 'undefined') || (v===null));
	},
	
	// Get device configuration
	getDeviceConfig:function() {

		var cap;
		if (navigator.userAgent.match(/iPhone/i)||navigator.userAgent.match(/iPod/i) || navigator.userAgent.match(/Android/i))
			cap={touch:true,width:320};			
		else if (navigator.userAgent.match(/iPad/i))
			cap={touch:true,width:768,forcedidle:10}; // Forced idle time is needed for correct framerate calculation.
		else
			cap={zoom:2};
		
		cap.canaudio=!!(document.createElement('audio').canPlayType);

		if (cap.canaudio) {
			if (navigator.userAgent.match(/iPad/i)||navigator.userAgent.match(/iPhone/i)||navigator.userAgent.match(/iPod/i)) {
				cap.audiocompatmode=2; // Single audio per time, so compatibility mode is needed. Plays only the "bgmusic" channel.
				cap.audioteam=1; // Only a member is required in the audioteam.
				cap.audioisexperimental=true; // Audio is experimental, since limited.
			} else if (navigator.userAgent.match(/Chrome/i)) {
				cap.audioteam=3; // Quite low performance on playback responsiveness.
			} else if (navigator.userAgent.match(/Firefox/i)) {
				cap.audioteam=1; // Testing smaller audioteam
				cap.audiopositiondelay=0.3; // Ogg playback is slower 0.3 between MP3 playback. Don't know why :)
				cap.audiocreatemode=1; // Firefox is stalling while downloading lot of things
			} else if (navigator.userAgent.match(/Minefield/i)) {
				cap.audioteam=1; // Testing smaller audioteam
				cap.audiocreatemode=1; // Firefox is stalling while downloading lot of things
				// Minefield has fixed the 0.3 delay!
			} else if (navigator.userAgent.match(/Safari/i)) {
				cap.audioteam=1; // Testing smaller audioteam						
			} else if (navigator.userAgent.match(/Opera/i)) {
				cap.audioteam=1; // Testing smaller audioteam			
				cap.audiocreatemode=1; // Do not like audio object cloning very much
			} else
				cap.audioisexperimental=true; // Audio is just experimental on all other devices.
				
		}

		return cap;
	},

	// The default Akihabara initialization. Low-res, low-framerate, zoomed view
	akihabaraInit:function(data) {
		if ((typeof data).toLowerCase() == "string") data={title:data};
		var device=this.getDeviceConfig();
		var footnotes=["MADE WITH AKIHABARA (C)2010 - GPL2/MIT","Project: www.kesiev.com/akihabara","Sources: github.com/kesiev/akihabara"];
		document.title=(data.title?data.title:"Akihabara");
		if (data.splash) {
			if (data.splash.footnotes) 
				for (var i=0;i<footnotes.length;i++) data.splash.footnotes.push(footnotes[i]);
			gbox.setSplashSettings(data.splash);
		}
		var screenwidth=(data.width?data.width:(data.portrait?240:320));
		var screenheight=(data.height?data.height:(data.portrait?320:240));
		if (!data.splash||(data.splash.minilogo==null)) gbox.setSplashSettings({minilogo:"logo"});
		if (!data.splash||(data.splash.background==null)) gbox.setSplashSettings({background:"akihabara/splash.png"});
		if (!data.splash||(data.splash.minimalTime==null)) gbox.setSplashSettings({minimalTime:3000});
		if (!data.splash||(data.splash.footnotes==null)) gbox.setSplashSettings({footnotes:footnotes});
		document.body.style.backgroundColor="#000000";
		gbox.setScreenBorder(false);
		if (help.geturlparameter("statusbar")) gbox.setStatusBar(1);
		if (help.geturlparameter("db")) gbox.setDoubleBuffering(true);
		if (help.geturlparameter("noautoskip")) gbox.setAutoskip(null);
		if (help.geturlparameter("zoom")) gbox.setZoom(help.geturlparameter("zoom")); else
	     	if (help.isDefined(data.zoom)) gbox.setZoom(data.zoom); else
			if (help.isDefined(device.zoom)) gbox.setZoom(device.zoom); else
			if (help.isDefined(device.width)) gbox.setZoom(device.width/screenwidth);
		if (help.geturlparameter("fps")) gbox.setFps(help.geturlparameter("fps")*1);
			else gbox.setFps((data.fps?data.fps:25));
		if (help.geturlparameter("fskip")) gbox.setFrameskip(help.geturlparameter("fskip"));
		if (help.geturlparameter("forcedidle")) gbox.setForcedIdle(help.geturlparameter("forcedidle")*1);
			else if (help.isDefined(device.forcedidle)) gbox.setForcedIdle(device.forcedidle);
		if (help.geturlparameter("canlog")) gbox.setCanLog(true);

		gbox.initScreen(screenwidth,screenheight);

		if (help.geturlparameter("showplayers")) gbox.setShowPlayers(help.geturlparameter("showplayers")=="yes");
		if (help.geturlparameter("canaudio")) gbox.setCanAudio(help.geturlparameter("canaudio")=="yes"); else
			gbox.setCanAudio(device.canaudio&&(!device.audioisexperimental||gbox.getFlag("experimental")));
		if (help.geturlparameter("audiocompatmode")) gbox.setAudioCompatMode(help.geturlparameter("audiocompatmode")*1); else
			if (help.isDefined(device.audiocompatmode)) gbox.setAudioCompatMode(device.audiocompatmode);
		if (help.geturlparameter("audioteam")) gbox.setAudioTeam(help.geturlparameter("audioteam")*1); else
			if (help.isDefined(device.audioteam)) gbox.setAudioTeam(device.audioteam);
		if (help.geturlparameter("loweraudioteam")) gbox.setLowerAudioTeam(help.geturlparameter("loweraudioteam")*1); else
			if (help.isDefined(device.loweraudioteam)) gbox.setLowerAudioTeam(device.loweraudioteam);			
		if (help.geturlparameter("audiocreatemode")) gbox.setAudioCreateMode(help.geturlparameter("audiocreatemode")*1); else
			if (help.isDefined(device.audiocreatemode)) gbox.setAudioCreateMode(device.audiocreatemode);
		if (help.geturlparameter("audiodequeuetime")) gbox.setAudioDequeueTime(help.geturlparameter("audiodequeuetime")*1); else
			if (help.isDefined(device.audiodequeuetime)) gbox.setAudioDequeueTime(device.audiodequeuetime);
		if (help.geturlparameter("audiopositiondelay")) gbox.setAudioPositionDelay(help.geturlparameter("audiopositiondelay")*1); else
			if (help.isDefined(device.audiopositiondelay)) gbox.setAudioPositionDelay(device.audiopositiondelay);
			
			
			
		if (help.geturlparameter("touch")=="no");
			else if ((help.geturlparameter("touch")=="yes")||device.touch)
				switch (data.padmode) {
					case "fretboard": {
						iphofretboard.initialize({h:100,bg:"akihabara/fretboard.png"});		
						break;
					}
					case "none": {
						break;
					}
					default: {
						iphopad.initialize({h:100,dpad:"akihabara/dpad.png",buttons:"akihabara/buttons.png",bg:"akihabara/padbg.png"});		
						break;
					}
				}
	}
}
