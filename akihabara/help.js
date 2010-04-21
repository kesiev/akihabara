// ---
// Copyright (c) 2010 Francesco Cottone, http://www.kesiev.com/
// ---

	var help={
	
		// generates numbers from st to ed, skipping skip
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

		// The default Akihabara initialization. Low-res, low-framerate, zoomed view
		akihabaraInit:function(title) {
			var device=iphopad.getDeviceConfig();
		
			document.title=(title?title:"Akihabara");
			document.body.style.backgroundColor="#000000";
			gbox.setScreenBorder(false);
			if (help.geturlparameter("statusbar")) gbox.setStatusBar(1);
			if (help.geturlparameter("db")) gbox.setDoubleBuffering(true);
			if (help.geturlparameter("noautoskip")) gbox.setAutoskip(null);
			if (help.geturlparameter("zoom")) gbox.setZoom(help.geturlparameter("zoom")); else
				if (device.zoom) gbox.setZoom(device.zoom); else
				if (device.width) gbox.setZoom(device.width/320);
			if (help.geturlparameter("fps")) gbox.setFps(help.geturlparameter("fps")*1);
				else gbox.setFps(25);
			if (help.geturlparameter("fskip")) gbox.setFrameskip(help.geturlparameter("fskip"));
				
				
			gbox.initScreen(320,240);
			
			if (help.geturlparameter("touch")=="no");
				else if ((help.geturlparameter("touch")=="yes")||device.touch)
					iphopad.initialize({h:100,dpad:"akihabara/dpad.png",buttons:"akihabara/buttons.png",bg:"akihabara/padbg.png"});
		
			// Debug fonts
			gbox.addImage("_dbf","akihabara/debugfont.png");
			gbox.addFont({id:"_dbf",image:"_dbf",firstletter:" ",tileh:5,tilew:4,tilerow:16,gapx:0,gapy:0});
			
		}
	}
