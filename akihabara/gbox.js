// ---
// Copyright (c) 2010 Francesco Cottone, http://www.kesiev.com/
// ---

var dynalist={
	create:function() {
		return {
			first:null,
			last:null,
			data:[],
			dl:0,
			gar:[],
			disconnect:function(obd) {
				if (this.data[obd].__first!=null)  this.data[this.data[obd].__first].__next=this.data[obd].__next; else this.first=this.data[obd].__next;
				if (this.data[obd].__next!=null)  this.data[this.data[obd].__next].__first=this.data[obd].__first; else this.last=this.data[obd].__first;
			},
			addObject:function(obj,prio) {
				var nid=this.gar.pop();
				if (nid==null) {
					nid=this.dl;
					this.dl++;
				}
				if (this.first==null) { // First element
					obj.__next=null;
					obj.__first=null;
					this.first=nid;
					this.last=nid;
				} else { // Chain next
					var i=this.first;
					while (i!=null)
						if (this.data[i].__prio>prio) break; else i=this.data[i].__next;
					if (i==null) { // if last, chain in queue
						obj.__next=null;
						obj.__first=this.last;								
						this.data[this.last].__next=nid;
						this.last=nid;								
					} else { // else reconnect objects
						obj.__first=this.data[i].__first;
						obj.__next=i;
						this.data[i].__first=nid;
						if (obj.__first!=null) this.data[obj.__first].__next=nid; else this.first=nid;
					}
					
				}
				obj.__prio=prio;
				obj.__id=nid;
				this.data[nid]=obj;
				return nid;
			},
			setPrio:function(obd,prio) {
				if (this.data[obd].__prio==prio) return;
				if (this.first!=this.last)
				if (this.data[obd].__prio<prio) {
					if (this.data[obd].__id!=this.last) {
						var i=this.data[obd].__next;
						while (i!=null)
							if (this.data[i].__prio>=prio) break; else i=this.data[i].__next;
						if ((i==null)||(this.data[i].__first!=this.data[obd].__id)) {
							// disconnect
							this.disconnect(obd);
							// Reconnect
							if (i==null) {
								this.data[this.last].__next=this.data[obd].__id;
								this.data[obd].__first=this.last;
								this.data[obd].__next=null;
								this.last=this.data[obd].__id;
							} else {
								this.data[obd].__first=this.data[i].__first;
								this.data[obd].__next=i;
								this.data[i].__first=this.data[obd].__id;
								if (this.data[obd].__first!=null) this.data[this.data[obd].__first].__next=this.data[obd].__id; else this.first=this.data[obd].__id;
							}
						}
					}
				} else {
					if (this.data[obd].__id!=this.first) {
						var i=this.data[obd].__first;
						while (i!=null)
							if (this.data[i].__prio<=prio) break; else i=this.data[i].__first;
						if ((i==null)||(this.data[i].__next!=this.data[obd].__id)) {
							// disconnect
							this.disconnect(obd);
							if (i==null) {
								this.data[this.first].__first=this.data[obd].__id;
								this.data[obd].__first=null;
								this.data[obd].__next=this.first;
								this.first=this.data[obd].__id;
							} else {
								this.data[obd].__first=i;
								this.data[obd].__next=this.data[i].__next;
								this.data[i].__next=this.data[obd].__id;
								if (this.data[obd].__next!=null) this.data[this.data[obd].__next].__first=this.data[obd].__id; else this.last=this.data[obd].__id;
							}
						}
					}
				}
				this.data[obd].__prio=prio;
			},
			remove:function(obd) {
				this.disconnect(obd);
				this.gar.push(this.data[obd].__id);
				delete this.data[this.data[obd].__id];
			}
		}
	}
}

// A special circular queue with some features useful for the resource loader
var cyclelist={
	create:function(size) {
		return {
			_head:0,
			_tail:0,
			_data:[],
			_size:(size?size:10),
			_total:0,
			_done:0,
			_current:null,
			getTotal:function(){return this._total}, // Number of elements to be "poped"
			getDone:function(){return this._done}, // Number of popped elements since the last empty
			getSize:function(){return this._size}, // The maximum number of elements in the queue
			isProcessing:function(){return this._current!=null}, // The last pop was not a null (i.e. the queue returned a valid object)
			isEnded:function(){return (this._head==this._tail)}, // There are other elements in the queue
			isBusy:function(){return this.isProcessing()||!this.isEnded()}, // There are elements in the queue/the last one pop returned an object that is being processed
			getCurrent:function(){return this._current}, // Return the last popped element
			push:function(d) {
				this._data[this._head]=d;
				this._head=(this._head+1)%this._size;
				this._total++;
			},
			pop:function() {
				if (this.isEnded()) {
					this._total=0;
					this._done=0;
					this._current=null;
				} else {
					this._current=this._data[this._tail];
					this._tail=(this._tail+1)%this._size;
					this._done++;
				}
				return this._current;
			},
			dump:function() {
				var r="";
				for (var i=0;i<this._size;i++) {
					r+=i+") "+this._data[i]+" | "+(i==this._head?"HEAD ":"")+(i==this._tail?"TAIL ":"")+"\n";
				}
				r+="\n\n"+this._done+"/"+this._total;
				return r;
			}
		}
	}
}

// A simple circular cache handler
var cachelist={
	create:function(size) {
		return {
			_cache:{},
			_queue:[],
			_head:0,
			_size:(size?size:10),
			add:function(k,v) {
				if (!this._cache[k]) {
					if (this._queue[this._head])
						delete this._cache[this._queue[this._head]];
					this._queue[this._head]=k;
					this._cache[k]={pos:this._head,value:v};
					this._head=(this._head+1)%this._size;
				} else this._cache[k].value=v;
			},
			read:function(k) {
				return (this._cache[k]?this._cache[k].value:null);
			},
			clear:function() {
				this._cache={};
				this._queue=[];
				this._head=0;
			}
		}
	}
}

/**
 * @namespace
 * Gamebox module allows multiple grouped objects to move simultaneously, it helps with collisions, #
 * rendering and moving objects. It also provides monospaced pixel-font rendering, keyboard handling,  
 * audio, double buffering and FSEs. Gamebox can also store and load data from cookies! 
 */
var gbox={
	// CONSTANTS
	ALIGN_CENTER:0,
	ALIGN_MIDDLE:0,
	ALIGN_RIGHT:1,
	ALIGN_BOTTOM:1,
	COLOR_BLACK:'rgb(0,0,0)',
	COLOR_WHITE:'rgb(255,255,255)',
	ZINDEX_LAYER:-1,
	PALETTES:{ // I think that some retrogamers will find these useful and/or inspiring
		c64:{ // C64 palette, picked from http://pepto.de/projects/colorvic/
			order:["black","white","red","cyan","purple","green","blue","yellow","orange","brown","lightred","darkgray","gray","lightgreen","lightblue","lightgray"],
			colors:{ black:"#000000", white:"#FFFFFF", red:"#68372B", cyan:"#70A4B2", purple:"#6F3D86", green:"#588D43", blue:"#352879", yellow:"#B8C76F", orange:"#6F4F25", brown:"#433900", lightred:"#9A6759", darkgray:"#444444", gray:"#6C6C6C", lightgreen:"#9AD284", lightblue:"#6C5EB5", lightgray:"#959595"}
		}
	},
	
	// VARS
	_autoid:0,
	_cb:null, // callback for loadAll()
	_keyboard:[],
	_keymap:{
		up:38,
		down:40,
		right:39,
		left:37,
		a:90,
		b:88,
		c:67
	},
	_flagstype:{
		experimental:"check",
		noaudio:"check",
		loadscreen:"list",
		fse:"list"
	},
	_flags:{
		experimental:false,
		noaudio:false,
		loadscreen:"normal",
		fse:"none"
	},
	_localflags:{},
	_fonts:{},
	_tiles:{},
	_images:{},
	_camera:{},
	_screen:0,
	_screenposition:0,
	_keyboardpicker:0,
	_screenh:0,
	_screenw:0,
	_screenhh:0,
	_screenhw:0,
	_zoom:1,
	_canvas:{},
	_objects:{},
	_groups:[],
	_renderorder:[],
	_groupplay:{},
	_actionqueue:["first","then","blit","after"], // initialize is executed once
	_mspf:0,
	_fps:0,
	_gametimer:0,
	_frameskip:0,
	_autoskip:{min:0,max:5,lowidle:0,hiidle:5}, // minimum frameskip, maximum frameskip, minimum idle time allowed for increasing frameskip, maximum idle time allowed for decreasing frameskip
	_fskid:0,
	_statbar:0,
	_border:0,
	_garbage:[],
	_zindexch:[],
	_framestart:0,
	_zindex:dynalist.create(),
	_db:false,
	_systemcookie:"__gboxsettings",
	_sessioncache:"",
	_breakcacheurl:function(a) {return a+(a.indexOf("?")==-1?"?":"&")+"_brc="+gbox._sessioncache; },
	_forcedidle:0,
	_gamewaiting:0,
	_canlog:false,
	_controlscallback:null,
	_splash:{
		gaugeLittleColor:"rgb(255,240,0)",
		gaugeLittleBackColor:"rgb(255,255,255)",
		gaugeBorderColor:"rgb(0,0,0)",
		gaugeBackColor:"rgb(100,100,100)",
		gaugeColor:"rgb(255,240,0)",
		gaugeHeight:10,
		background:null,
		minimalTime:0,
		footnotes:null,
		footnotesSpacing:1
	},
	_minimalexpired:0, // 0: not triggered, 1: triggered, 2: done
	setCanLog:function(c) { this._canlog=c&&window.console; },
	canLog:function() { return this._canlog},
	log:function() {}, // Overridden if console is really available
	_safedrawimage:function(tox,img,sx,sy,sw,sh,dx,dy,dw,dh) {
		if (!img||!tox) return;
		if (sx<0) { dx-=(dw/sw)*sx;sw+=sx; sx=0; }
		if (sy<0) { dy-=(dh/sh)*sy;sh+=sy; sy=0; }
		if (sx+sw>img.width) { dw=(dw/sw)*(img.width-sx);sw=img.width-sx;}
		if (sy+sh>img.height) { dh=(dh/sh)*(img.height-sy);sh=img.height-sy;}
		try { if ((sh>0)&&(sw>0)&&(sx<img.width)&&(sy<img.height)) tox.drawImage(img, sx,sy,sw,sh,dx,dy,dw,dh); } catch(e){}
	},
	_keydown:function(e){
		var key=(e.fake||window.event?e.keyCode:e.which);
		if (!gbox._keyboard[key]) gbox._keyboard[key]=1;
		return gbox._prevent(e);
	},
	_keyup:function(e){
		var key=(e.fake||window.event?e.keyCode:e.which);
		gbox._keyboard[key]=-1;
		return gbox._prevent(e);
	},
	_prevent:function(e) {
		if (e.preventDefault) e.preventDefault();
		if (e.stopImmediatePropagation) e.stopImmediatePropagation();
		if (e.stopPropagation) e.stopPropagation();
		e.returnValue=false;
		return false;
	},
	_resetkeys:function() {
		for (var key in gbox._keymap)
			gbox._keyup({fake:1,keyCode:gbox._keymap[key]});
	},
	_showkeyboardpicker:function(){
		gbox._keyboardpicker.value="Click/Tap here to enable the keyboard";
		gbox._keyboardpicker.style.left=(gbox._screenposition.x+5)+"px";
		gbox._keyboardpicker.style.top=(gbox._screenposition.y+5)+"px";
		gbox._keyboardpicker.style.width=(gbox._screenposition.w-10)+"px";
		gbox._keyboardpicker.style.height="30px";
		this._keyboardpicker.style.border="1px dashed white";
		this._keyboardpicker.readOnly=null;
	},
	_hidekeyboardpicker:function(){
		this._keyboardpicker.style.zIndex=100;
		this._keyboardpicker.readOnly="yes";
		this._keyboardpicker.style.position="absolute";
		this._keyboardpicker.style.textAlign="center";
		this._keyboardpicker.style.backgroundColor="#000000";
		this._keyboardpicker.style.color="#fefefe";
		this._keyboardpicker.style.cursor="pointer";			
		this._keyboardpicker.value="";
		this._keyboardpicker.style.left="0px";
		this._keyboardpicker.style.top="0px";
		this._keyboardpicker.style.height="0px";
		this._keyboardpicker.style.width="0px";
		this._keyboardpicker.style.border="0px";
		this._keyboardpicker.style.padding="0px";
		this._keyboardpicker.style.margin="0px";
	},
	_domgetabsposition:function(oElement) {
		var sizes={x:0,y:0,h:0,w:0};
		sizes.h=oElement.offsetHeight;
		sizes.w=oElement.offsetWidth;
		while( oElement != null) {
			sizes.y += oElement.offsetTop;
			sizes.x += oElement.offsetLeft;
			oElement = oElement.offsetParent;
		}
		return sizes;
	},
  
  /**
  * Sets the gbox._forcedidle property.
  * @param {Boolean} f The value to write to gbox._forcedidle.
  */	  
	setForcedIdle:function(f) { this._forcedidle=f},
  
  /**
  * Returns a gbox flag at index f.
  * @param {Object} f The index of the flag you want returned.
  */	  
	getFlag:function(f) { return this._flags[f] },
  
  /**
  * Sets the gbox._statbar property. Only useful if called before gbox.initScreen. Debugging funtionality.
  * Much easier to access if you add '?statusbar=1' to your URL.
  * @param {Boolean} f The value to write to gbox._statbar.
  */	
  setStatusBar:function(a) { this._statbar=a },
	setScreenBorder:function(a) { this._border=a},
  
  /**
  * Initializes the screen to a certain width and height, applies zoom attributes, populates the 
  * body of the HTML document including the canvas element, sets an initial camera, creates a '_buffer'
  * canvas, sets keyboard event listeners, and many other initialization functions.
  * @param {Integer} w The width of the main canvas.
  * @param {Integer} h The height of the main canvas.
  */	
	initScreen:function(w,h) {
		document.body.style.textAlign="center";
		document.body.style.height="100%";
		document.body.style.margin="0px";
		document.body.style.padding="0px";			
		document.getElementsByTagName("html")[0].style.height="100%";
		
		var container=document.createElement("div");
		container.style.width="100%";
		container.style.height="100%";
		container.style.display="table";
		this._box=document.createElement("div");
		this._box.style.display="table-cell";
		this._box.style.width="100%";
		this._box.style.textAlign="center";
		this._box.style.verticalAlign="middle";
		
		this._screen=document.createElement("canvas");
		if (this._border) this._screen.style.border="1px solid black";
		this._screen.setAttribute('height',h);
		this._screen.setAttribute('width',w);
		this._screen.style.width=(w*this._zoom)+"px";
		this._screen.style.height=(h*this._zoom)+"px";
		this._screenh=h;
		this._screenw=w;
		this._screenhh=Math.floor(h/2);
		this._screenhw=Math.floor(w/2);
		this._camera.x=0;
		this._camera.y=0;
		this._camera.h=h;
		this._camera.w=w;
		this._box.appendChild(this._screen);
		container.appendChild(this._box);
		document.body.appendChild(container);

		this.createCanvas("_buffer");
		if (gbox._controlscallback) {
			gbox.addEventListener(window,'keydown', this._prevent);
			gbox.addEventListener(window,'keyup', this._prevent);
		} else {
			gbox.addEventListener(window,'keydown', this._keydown);
			gbox.addEventListener(window,'keyup', this._keyup);
		}
		if (this._statbar) {
			this._statbar=document.createElement("div");
			if (this._border) this._statbar.style.border="1px solid black";
			this._statbar.style.margin="auto";
			this._statbar.style.backgroundColor="#ffffff";
			this._statbar.style.fontSize="10px";
			this._statbar.style.fontFamily="sans-serif";
			this._statbar.style.width=(w*this._zoom)+"px";
			this._box.appendChild(this._statbar);
		}
		// Keyboard support on devices that needs focus (like iPad) - actually is not working for a bug on WebKit's "focus" command.
		this._keyboardpicker=document.createElement("input");
		this._keyboardpicker.onclick=function(evt) { gbox._hidekeyboardpicker();return gbox._prevent(evt)};
		this._hidekeyboardpicker(this._keyboardpicker);
		
		gbox._box.appendChild(this._keyboardpicker);
		gbox._screen.ontouchstart=function(evt) { gbox._screenposition=gbox._domgetabsposition(gbox._screen);if (evt.touches[0].pageY-gbox._screenposition.y<30) gbox._showkeyboardpicker();else gbox._hidekeyboardpicker();return gbox._prevent(evt)};
		gbox._screen.ontouchend=gbox._prevent;
		gbox._screen.ontouchmove=gbox._prevent;
		gbox._screen.onmousedown=function(evt) {gbox._screenposition=gbox._domgetabsposition(gbox._screen);if (evt.pageY-gbox._screenposition.y<30)  gbox._showkeyboardpicker(); else gbox._hidekeyboardpicker();return gbox._prevent(evt)};
		
		var d=new Date();
		gbox._sessioncache=d.getDate()+"-"+d.getMonth()+"-"+d.getFullYear()+"-"+d.getHours()+"-"+d.getMinutes()+"-"+d.getSeconds();
		
		gbox._loadsettings(); // Load default configuration
		gbox.setCanAudio(true); // Tries to enable audio by default
		
		switch (gbox._flags.fse) { // Initialize FSEs
			case "scanlines": {
				gbox.createCanvas("-gbox-fse",{w:w,h:h});
				gbox.getCanvasContext("-gbox-fse").save();
				gbox.getCanvasContext("-gbox-fse").globalAlpha=0.2;
				gbox.getCanvasContext("-gbox-fse").fillStyle = gbox.COLOR_BLACK;
				for (var j=0;j<h;j+=2)
					gbox.getCanvasContext("-gbox-fse").fillRect(0,j,w,1);
				gbox.getCanvasContext("-gbox-fse").restore();
				gbox._localflags.fse=true;
				break;
			}
			case "lcd":{
				gbox.createCanvas("-gbox-fse-old",{w:w,h:h});
				gbox.createCanvas("-gbox-fse-new",{w:w,h:h});
				gbox._localflags.fse=true;
				break;
			}
		}
	},

  /**
  * Sets the gbox._db property. Turns on an off double buffering.
  * @param {Boolean} db The value to write to gbox._db. True enables double buffering, false disables.
  */	  
	setDoubleBuffering:function(db){this._db=db},
  
  /**
  * Writes text to the status bar, but only if the status bar is enabled.
  * @param {String} txt The text to write to the status bar.
  */	  
	setStatBar:function(txt){ if (gbox._statbar) this._statbar.innerHTML=(txt?txt:"&nbsp")},

  /**
  * Set the frames per second rate.
  * @param {Integer} f Total frames per second for the game to run at.
  */	  
	setFps:function(f){
		this._fps=f;
		this._mspf=Math.floor(1000/f)
	},
  
  /**
  * Get the frames per second rate (default is 25).
  * @returns {Integer} Returns the frames per second.
  */
	getFps:function() { return this._fps },
	setAutoskip:function(f){this._autoskip=f},
	setFrameskip:function(f){this._frameskip=f},
  
  /**
  * Get the screen height.
  * @returns {Integer} Screen height in pixels.
  */
	getScreenH:function(){return this._screenh},

  /**
  * Get the screen width.
  * @returns {Integer} Screen width in pixels.
  */
	getScreenW:function(){return this._screenw},
  
  /**
  * Get the screen half-height.
  * @returns {Integer} Screen half-height in pixels.
  */
	getScreenHH:function(){return this._screenhh},

  /**
  * Get the screen half-width.
  * @returns {Integer} Screen half-width in pixels.
  */
	getScreenHW:function(){return this._screenhw},
  
  /**
  * Sets the gbox._zoom parameter, only works before gbox.initScreen is called.
  * @param {Integer} z Zoom factor.
  */
	setZoom:function(z) { this._zoom=z},

  /**
  * Deprecated: gbox._cb is now set by passing it directly into gbox.loadAll(). Left in for backwards compatibility.
  * @param {String} cb The name of the function to be called once gbox.loadAll is completed.
  */
	setCallback:function(cb) { this._cb=cb; },

	_playobject:function(g,obj,a) {
		if (gbox._objects[g][obj].initialize) {
			gbox._objects[g][obj].initialize(obj);
			delete gbox._objects[g][obj].initialize;
		}
		if (gbox._objects[g][obj][a]) gbox._objects[g][obj][a](obj,a);
	},

	_nextframe:function(){
		gbox._framestart=gbox._mspf-(new Date().getTime()-gbox._framestart);
		if (gbox._autoskip)
			if ((gbox._framestart<gbox._autoskip.lowidle)&&(gbox._frameskip<gbox._autoskip.max)) gbox.setFrameskip(gbox._frameskip+1); else
			if ((gbox._framestart>gbox._autoskip.hiidle)&&(gbox._frameskip>gbox._autoskip.min)) gbox.setFrameskip(gbox._frameskip-1);
		if (gbox._statbar) gbox.debugGetstats();
		this._gametimer=setTimeout(gbox.go,(gbox._framestart<=0?1:gbox._framestart));		
	},
	/**
  * Apply FSEs to the screen. Is called each frame. 
  */
  _applyfse:function(){
	  switch (gbox._flags.fse) {
		case "scanlines": {
			gbox.getBufferContext().drawImage(gbox.getCanvas("-gbox-fse"),0,0);
			break;
		}
		case "lcd":{
			if (gbox._localflags.fselcdget&&gbox.getBuffer())
				gbox.getCanvasContext("-gbox-fse-new").drawImage(gbox.getBuffer(),0,0);
			gbox.getBufferContext().save();
			gbox.getBufferContext().globalAlpha=0.5;
			gbox.getBufferContext().drawImage(gbox.getCanvas("-gbox-fse-old"),0,0);
			gbox.getBufferContext().restore();
			if (gbox._localflags.fselcdget)
				gbox.swapCanvas("-gbox-fse-new","-gbox-fse-old");
			gbox._localflags.fselcdget=!gbox._localflags.fselcdget;	
			break;
		}
	}
  },
  /**
  * Register the code that have to be executed once the page is loaded. Usually contains game initialization, resources loading etc.
  */
  onLoad:function(code) {
  	this.addEventListener(window,'load',code);
  },
  /**
  * This function is called once per frame. This is where the basic rendering and processing of groups occurs.
  */
	go:function() {
		if (gbox._loaderqueue.isBusy()) {
			if (gbox._gamewaiting==1) {
				gbox.blitFade(gbox._screen.getContext("2d"),{alpha:0.5});
				gbox.blitText(gbox._screen.getContext("2d"),{font:"_dbf",dx:2,dy:2,text:"LOADING..."});
				gbox._gamewaiting=true;
			}
			if (gbox._gamewaiting<=1) {
				var bw=Math.floor(((gbox.getScreenW()-4)*gbox._loaderqueue.getDone())/gbox._loaderqueue.getSize());
				gbox._screen.getContext("2d").globalAlpha=1;
				gbox._screen.getContext("2d").fillStyle = gbox._splash.gaugeLittleBackColor;
				gbox._screen.getContext("2d").fillRect(0,4+gbox.getFont("_dbf").tileh,gbox.getScreenW(),1);
				gbox._screen.getContext("2d").fillStyle = gbox._splash.gaugeLittleColor;
				gbox._screen.getContext("2d").fillRect(0,4+gbox.getFont("_dbf").tileh,(bw>0?bw:0),1);
				gbox._screen.getContext("2d").restore();
				gbox.setStatBar("Loading... ("+gbox._loaderqueue.getDone()+"/"+gbox._loaderqueue.getTotal()+")");
			}
			if (gbox._gamewaiting) gbox._gamewaiting--;
			setTimeout(gbox.go,1000);
		} else {
			gbox._gamewaiting=3;
			gbox._framestart=new Date().getTime();
			if (gbox._controlscallback) gbox._controlscallback(gbox);
			var gr="";
			for (var g=0;g<gbox._renderorder.length;g++)
				if (gbox._groupplay[gbox._renderorder[g]])
					if (gbox._renderorder[g]==gbox.ZINDEX_LAYER) {
						var id;
						for (var i=0;i<gbox._actionqueue.length;i++) {
							id=gbox._zindex.first;
							while (id!=null) {
								if (gbox._groupplay[gbox._zindex.data[id].g])
									gbox._playobject(gbox._zindex.data[id].g,gbox._zindex.data[id].o,gbox._actionqueue[i]);
								id=gbox._zindex.data[id].__next;
							}
						}
					} else
						for (var i=0;i<gbox._actionqueue.length;i++)
							for (var obj in gbox._objects[gbox._renderorder[g]])
								gbox._playobject(gbox._renderorder[g],obj,gbox._actionqueue[i]);
			if (gbox._fskid>=gbox._frameskip) {
				if (gbox._localflags.fse) gbox._applyfse();
				if (gbox._db) gbox.blitImageToScreen(gbox.getBuffer());
				gbox._fskid=0;
			} else gbox._fskid++;
			
			gbox.purgeGarbage();
	
			if (gbox._zindexch.length) {
				
				for (var i=0;i<gbox._zindexch.length;i++) {
					if (gbox._objects[gbox._zindexch[i].o.g][gbox._zindexch[i].o.o])
						if (gbox._objects[gbox._zindexch[i].o.g][gbox._zindexch[i].o.o].__zt==null)
							gbox._objects[gbox._zindexch[i].o.g][gbox._zindexch[i].o.o].__zt=gbox._zindex.addObject(gbox._zindexch[i].o,gbox._zindexch[i].z);
						else
							gbox._zindex.setPrio(gbox._objects[gbox._zindexch[i].o.g][gbox._zindexch[i].o.o].__zt,gbox._zindexch[i].z);
				}
				gbox._zindexch=[];
			}
			
			
			// Handle holding
			for (var key in gbox._keymap)
				if (gbox._keyboard[gbox._keymap[key]]==-1) gbox._keyboard[gbox._keymap[key]]=0; else
				if (gbox._keyboard[gbox._keymap[key]]&&(gbox._keyboard[gbox._keymap[key]]<100))	gbox._keyboard[gbox._keymap[key]]++;
			if (gbox._forcedidle)
				this._gametimer=setTimeout(gbox._nextframe,gbox._forcedidle); // Wait for the browser
			else
				gbox._nextframe();
		}
	},
  
  /**
  * Displays basic audio, object, and performance statistics in the status bar. Automatically called each frame if the status bar is enabled.
  */
	debugGetstats:function() {
		var statline="Idle: "+gbox._framestart+"/"+gbox._mspf+(gbox._frameskip>0?" ("+gbox._frameskip+"skip)":"")+" | ";
		var cnt=0;
		for (var g=0;g<gbox._groups.length;g++)
			if (gbox._groupplay[gbox._groups[g]]) {
				cnt=0;
				for (var obj in gbox._objects[gbox._groups[g]]) cnt++;
				if (cnt) statline+=gbox._groups[g]+"["+cnt+"] ";
			}
		var cnt=0;
		var ply=0;
		for (var g in gbox._audio.aud) 
			for (var x=0;x<gbox._audio.aud[g].length;x++) {
				cnt++;
				if (!gbox._audio.aud[g][x].paused&&!gbox._audio.aud[g][x].ended) ply++;
			}
		statline+="| audio: "+ply+"/"+cnt+":"+this._audioteam;
			/*
			statline+="<br><br>";
		var id=gbox._zindex.first;
			while (id!=null) {
				if (gbox._groupplay[gbox._zindex.data[id].g]) statline+=gbox._zindex.data[id].g+" | "+gbox._zindex.data[id].o+" ("+gbox._zindex.data[id].__prio+")<br>";
				id=gbox._zindex.data[id].__next;
			}
			*/
		gbox.setStatBar(statline);
	},
  
	setZindex:function(th,z) {
		if ((th.__zt==null)||(th.zindex!=z)) {
			th.zindex=z;
			this._zindexch.push({o:{g:th.group,o:th.id},z:z});
		}
	},

  /**
  * Returns true if a given key in this._keymap is pressed. Only returns true on the transition from unpressed to pressed.
  * @param {String} id A key in the keymap. By default, one of: "up" "down" "left" "right" "a" "b" "c"
  * @returns {Boolean} True if the given key is transitioning from unpressed to pressed in this frame.
  */
	keyIsHit:function(id) { return this._keyboard[this._keymap[id]]==1},
  
  /**
  * Returns true if a given key in this._keymap is being held down. Returns true as long as the key is held down.
  * @param {String} id A key in the keymap. By default, one of: "up" "down" "left" "right" "a" "b" "c"
  * @returns {Boolean} True if the given key is held down.
  */  
	keyIsPressed:function(id) { return this._keyboard[this._keymap[id]]>0},

  /**
  * Returns true if a given key in this._keymap has been held down for at least one frame. Will not return true if a key
  * is quickly tapped, only once it has been held down for a frame.
  * @param {String} id A key in the keymap. By default, one of: "up" "down" "left" "right" "a" "b" "c"
  * @returns {Boolean} True if the given key has been held down for at least one frame.
  */  
	keyIsHold:function(id) { return this._keyboard[this._keymap[id]]>1},
  
  /**
  * Returns true if a given key in this._keymap is released. Only returns true on the transition from pressed to unpressed.
  * @param {String} id A key in the keymap. By default, one of: "up" "down" "left" "right" "a" "b" "c"
  * @returns {Boolean} True if the given key is transitioning from pressed to unpressed in this frame.
  */
	keyIsReleased:function(id) { return this._keyboard[this._keymap[id]]==-1},
  
	_savesettings:function() {
		var saved="";
		for (var k in this._keymap) saved+="keymap-"+k+":"+this._keymap[k]+"~";
		for (var f in this._flags) {
			switch (this._flagstype[f]) {
				case "check": { saved+="flag-"+f+":"+(this._flags[f]?1:0)+"~"; break; }
				case "list": { saved+="flag-"+f+":"+this._flags[f]+"~"; break; }
			}
		}
		this.dataSave("sys",saved);
	},
	_loadsettings:function() {
		var cfg=this.dataLoad("sys");
		if (cfg!==null) {
			cfg=cfg.split("~");
			var kv;
			var mk;
			for (var i=0;i<cfg.length;i++) {
				kv=cfg[i].split(":");
				mk=kv[0].split("-");
				switch (mk[0]) {
					case "keymap": { this._keymap[mk[1]]=kv[1]*1; break }
					case "flag": {
						switch (this._flagstype[mk[1]]) {
							case "check": { this._flags[mk[1]]=kv[1]*1; break }
							case "list": { this._flags[mk[1]]=kv[1]; break }
						}
						break
					}
				}
			}
		}
	},

  /**
  * Saves data to a browser cookie as a key-value pair, which can be restored later using gbox.dataLoad. Only 
  * works if user has cookies enabled.
  * @param {String} k The key which identifies the value you are storing.
  * @param {String} v The value you wish to store. Needs to be a string!
  * @param {String} d A date offset, to be added to the current date. Defines the cookie's expiration date. By default this is set to 10 years.
  * @example
  * // (from Capman)
  * gbox.dataSave("capman-hiscore",maingame.hud.getNumberValue("score","value"));
  */
	dataSave:function(k,v,d) { 
		var date = new Date();
		date.setTime(date.getTime()+((d?d:365*10)*24*60*60*1000));
		document.cookie =this._systemcookie+"~"+k+"="+v+"; expires="+date.toGMTString()+"; path=/";
	},
  
  /**
  * Loads data from a browser cookie. Send it a key and it returns a value (if available). Only works if user has cookies enabled.
  * @param {String} k The key which identifies the value you are loading.
  * @param {String} a A switch to determine whether a string or a number is returned. By default a string is returned.
  * @returns {Object} A string or a number loaded from the cookie.
  * @example
  * hiscore = gbox.dataLoad("hiscore");
  */
	dataLoad:function(k,a) {
		var nameeq=this._systemcookie+"~"+k+"=";
		var ca = document.cookie.split(";");
		var rt;
		for (var i=0;i<ca.length;i++) {
			var c=ca[i];
			while (c.charAt(0)==' ') c=c.substring(1,c.length);
			if (c.indexOf(nameeq)==0) {
				rt=c.substring(nameeq.length,c.length);
				if (a&&a.number) return rt*1; else return rt;
				if (a&&a.number) return rt*1; else return rt;
			}
		}
		return null;
	},

  /**
  * Clears a value stored in a  key-value pair in a browser cookie. Sets value to "". Only works if user has cookies enabled.
  * @param {String} k The key which identifies the value you are clearing.
  */
	dataClear:function(k) { this.dataSave(k,"",-1) },
  
  /**
  * Gets the current camera object.
  * @returns {Object} The camera object.
  */
	getCamera:function() { return this._camera; },
  
  /**
  * Sets the y value of the current camera object.
  * @param {Integer} y The camera object's new y value.
  * @param {Object} viewdata An object containing parameters h and w, which are a bounding box that the camera is
  * not supposed to leave. For example, to use your map as a bounding area for the camera, pass along {w: map.w, h: map.h}.
  */
	setCameraY:function(y,viewdata) {
		this._camera.y=y;
		if (this._camera.y+this._camera.h>viewdata.h) this._camera.y=viewdata.h-this._screenh;
		if (this._camera.y<0) this._camera.y=0;
	},

  /**
  * Sets the x value of the current camera object.
  * @param {Integer} x The camera object's new x value.
  * @param {Object} viewdata An object containing parameters h and w, which are a bounding box that the camera is
  * not supposed to leave. For example, to use your map as a bounding area for the camera, pass along {w: map.w, h: map.h}.
  */  
	setCameraX:function(x,viewdata) {
		this._camera.x=x;
		if (this._camera.x+this._camera.w>viewdata.w) this._camera.x=viewdata.w-this._screenw;
		if (this._camera.x<0) this._camera.x=0;
	},
  
  /**
  * Centers the camera.
  * @param {Object} data An object containing x and y parameters -- typically the object you wish to center the camera on.
  * @param {Object} viewdata An object containing parameters h and w, which are a bounding box that the camera is
  * not supposed to leave. For example, to use your map as a bounding area for the camera, pass along {w: map.w, h: map.h}.
  * @example
  * // Center the camera on the player object
  * gbox.centerCamera(gbox.getObject('player', 'player_id'), {w: map.w, h: map.h});
  */
	centerCamera:function(data,viewdata) {
		this.setCameraX(data.x-this._screenhw,viewdata);
		this.setCameraY(data.y-this._screenhh,viewdata);
	},

  /**
  * Get an array containing the names of each group in the game, in order of rendering.
  * @returns {Array} An array of group names.
  * @example
  * grouplist = gbox.getGroups();
  * grouplist; // => ["background", "player", "enemy", "game"]	
  */
  getGroups:function() { return this._groups; },
  
  /**
  * Defines the names of each group in the game along with their rendering order.
  * @param {Array} g An array of strings of group names, in the order in which the groups should be rendered. So
  * g[0] will contain the first group to render, g[1] the second group to render, etc.
  */
	setGroups:function(g){
		this._groups=g;
		this._groupplay[gbox.ZINDEX_LAYER]=true;
		for (var i=0;i<g.length;i++)
			if (!this._objects[g[i]]) {
				this._objects[g[i]]={};
				this._groupplay[g[i]]=true;
				this._renderorder[i]=g[i];
			}
	},
  
  /**
  * A method of setting the render order of groups independently of gbox.setGroups. Sets gbox._renderorder, 
  * which by default is equivalent to gbox._groups. However, gbox._renderorder is what ultimately determines
  * the rendering order of groups. If you need to change your rendering order on the fly, use this function 
  * by passing it a reordered array of group names.
  * @param {Array} g An array of strings of group names, in the order in which the groups should be rendered. So
  * g[0] will contain the first group to render, g[1] the second group to render, etc.
  */
	setRenderOrder:function(g) { this._renderorder=g; },
  
  /**
  * If a group is disabled, this will enable the group.
  * @param {String} gid The id of the group.
  */
	playGroup:function(gid){this._groupplay[gid]=true;},

  /**
  * If a group is enabled, this will disable the group.
  * @param {String} gid The id of the group.
  */
	stopGroup:function(gid){this._groupplay[gid]=false;},
  
  /**
  * Toggles a group between enabled and disabled status.
  * @param {String} gid The id of the group.
  */
	toggleGroup:function(gid){this._groupplay[gid]=!this._groupplay[gid];},
  
  /**
  * Turns off all groups except for the one specified. 
  * @param {String} gid The id of the group.
  */
	soloGroup:function(gid) {
		for (var i=0;i<this._groups.length;i++)
			if (this._groups[i]==gid) this.playGroup(this._groups[i]); else this.stopGroup(this._groups[i]);
	},
  
  /**
  * Enables all groups, toggling any groups that are currently disabled.
  */
	playAllGroups:function() { for (var i=0;i<this._groups.length;i++) this.playGroup(this._groups[i]); },

  /**
  * Destroys all objects in a given group.
  * @param {String} gid The id of the group.
  */
	clearGroup:function(group) {
		for (var obj in this._objects[group]) {
			if (this._objects[group][obj].__zt!=null) this._zindex.remove(this._objects[group][obj].__zt);
			delete this._objects[group][obj];
		}
	},
	playGroups:function(gid){for (var i=0;i<gid.length;i++)this.playGroup(gid[i])},
	stopGroups:function(gid){for (var i=0;i<gid.length;i++)this.stopGroup(gid[i])},
	toggleGroups:function(gid){for (var i=0;i<gid.length;i++)this.toggleGroup(gid[i])},
  
  /**
  * Given a group and an id for a particular object instance, this returns the instance requested.
  * <b>NOTE:</b> this does not return a copy of the object you've requested! Any modifications you make
  * to the object returned are directly modifying the object you requested.
  * @param {String} group The id of the group that contains the object.
  * @param {String} id The id of the instance of the object.
  * @returns {Object} The object requested.
  * @example
  * // Find the player and reduce health by half.
  * playertemp = gbox.getObject('player','player_id');
  * player.health = player.health/2;
  */ 
	getObject:function(group,id) {return this._objects[group][id]},

  /**
  * Creates a font.
  * @param {Object} data An object containing: <ul><li>id: the id of the font</li>
  * <li>image: reference to the font image loaded (must contain font character tiles in ASCII order)</li>
  * <li>firstletter: the ASCII character that the font image's first character corresponds to</li>
  * <li>tileh: height in pixels of the character tiles</li>
  * <li>tilew: width in pixels of the character tiles</li>
  * <li>tilerow: width in pixels of each row in the font image</li>
  * <li>gapx: x-coord gap between tile columns, in pixels</li>
  * <li>gapy: y-coord gap between tile rows, in pixels</li></ul>
  * @example
  * gbox.addImage('font', 'font.png');
  * gbox.addFont({ id: 'small', image: 'font', firstletter: ' ', tileh: 8, tilew: 8, tilerow: 255, gapx: 0, gapy: 0 });
  */ 
	addFont:function(data) {
		data.tilehh=Math.floor(data.tileh/2);
		data.tilehw=Math.floor(data.tilew/2);
		this._fonts[data.id]=data;
		this._fonts[data.id].firstascii=data.firstletter.charCodeAt(0);
	},
  
  /**
  * Returns a font object containing data about the font.
  * @param {String} id The id of the font, as set in gbox.addFont.
  */   
	getFont:function(id) {
		return this._fonts[id];
	},

  /**
  * Deletes an object, keeping a record of its group and id in gbox._garbage.
  * @param {Object} obj The object you wish to delete.
  */  
	trashObject:function(obj) {
		if (!this._garbage[obj.group]) this._garbage[obj.group]={};
		this._garbage[obj.group][obj.id]=1;
		obj.__trashing=true;
	},
  
  /**
  * Clears the record held in gbox._garbage of what has been deleted. The "onpurge" method is called on the object before being deleted (for canvas deallocation etc.)
  */    
	purgeGarbage:function() {
		for (var group in this._garbage)
			for (var id in this._garbage[group]) {
				if (this._objects[group][id]["onpurge"]) this._objects[group][id].onpurge();
				if (this._objects[group][id].__zt!=null)
					this._zindex.remove(this._objects[group][id].__zt)
				delete this._objects[group][id];
			}
		gbox._garbage={};
	},
  
  /**
  * Deletes every object in a given group.
  * @param {String} group The group id.
  */    
	trashGroup:function(group) {
		if (!this._garbage[group]) this._garbage[group]={};
		for (var obj in this._objects[group])
			this._garbage[group][obj]=1;
	},
  
  /**
  * Returns whether an object is due to be trashed. Useful in cases you want to check if
  * an object is marked as trash before it is actually deleted.
  * @param {Object} o The object you're checking.
  * @returns {Boolean} True if the object is marked as trash.
  */      
	objectIsTrash:function(o) { return o.__trashing },
  
  /**
  * Creates a new game object. Generally speaking you pass a fully-defined object as the parameter (including a group, id, tileset, and so on).
  * A group must be specified, or the program will crash. If no id is specified, then it will automatically provide 
  * an id of 'obj-XXXX' where 'XXXX' is an automatically incrementing integer. This is where the <i>initialize</i>, <i>first</i>, and <i>blit</i>
  * functions are defined, as well.
  * @param {Object} data The object you wish to create.
  * @returns {Object} The object you created.
  * @example
  * data = {
  *   group: 'player',
  *   id: 'player_id',
  *   tileset: 'player_tiles', 
  *   x: 0,
  *   y: 0,
  *   initialize: function() {
      this.x = 10;
      this.y = 10;
      },
  * };
  * gbox.addObject(data);
  */    
	addObject:function(data) {
		// Extras
		if (!data.id) {
			data.id="obj-"+this._autoid;
			this._autoid=(this._autoid+1)%1000;
		}
		if (data.tileset) {
			if (data.h==null) data.h=this._tiles[data.tileset].tileh;
			if (data.w==null) data.w=this._tiles[data.tileset].tilew;
			if (data.hw==null) data.hw=this._tiles[data.tileset].tilehw;
			if (data.hh==null) data.hh=this._tiles[data.tileset].tilehh;
		}
		this._objects[data.group][data.id]=data;
		if (data.zindex!=null)
			this.setZindex(this._objects[data.group][data.id],data.zindex);
		return this._objects[data.group][data.id];
	},
  
   /**
  * Returns whether a given group contains no objets.
  * @param {String} gid The group you're checking.
  * @returns {Boolean} True if the group contains no objects.
  */    
	groupIsEmpty:function(gid) { for (var i in this._objects[gid]) return false; return true; },
  
  /**
  * Creates a new canvas. By default, the width and height is the current gbox._screenw and gbox._screenh,
  * but it can also be set by passing in a data object with the appropriate parameters.
  * @param {String} id The id of the new canvas.
  * @param {Object} data (Optional) The height and width of the new canvas, contained in data.h and data.w parameters.
  * @example
  * gbox.createCanvas('newCanvas', {w: 640, h: 480});
  */    
	createCanvas:function(id,data) {
		this.deleteCanvas(id);
		var w=(data&&data.w?data.w:this._screenw);
		var h=(data&&data.h?data.h:this._screenh);
		this._canvas[id]=document.createElement("canvas");
		this._canvas[id].setAttribute('height',h);
		this._canvas[id].setAttribute('width',w);
		this._canvas[id].getContext("2d").save();
		this._canvas[id].getContext("2d").globalAlpha=0;
		this._canvas[id].getContext("2d").fillStyle = gbox.COLOR_BLACK;
		this._canvas[id].getContext("2d").fillRect(0,0,w,h);
		this._canvas[id].getContext("2d").restore();
	},
  /**
  * Swap two canvas using their ID.
  * @param {String} id The id of the first canvas.
  * @param {String} id The id of the second canvas.
  * @example
  * gbox.swapCanvas('canvas1','canvas2');
  */    
  swapCanvas:function(a,b) {
  	var swp=this._canvas[a];
  	this._canvas[a]=this._canvas[b];
  	this._canvas[b]=swp;
  },
  /**
  * Deletes a given canvas.
  * @param {String} id The id of the canvas to be deleted.
  */  
	deleteCanvas:function(id) {
		if (this._canvas[id]) delete this._canvas[id];	
	},
  
  /**
  * Checks to see if an image was successfully loaded.
  * @param {String} id The id of the image.
  * @returns {Boolean} True if the image has been loaded.
  */    
	imageIsLoaded:function(id){ return this._images[id]&&(this._images[id].getAttribute("wasloaded"))&&this._images[id].width },
  
  /**
  * Gets information about a loaded image.
  * @param {String} id The id of the image.
  * @returns {Object} A DOM Image element, including the URL and last modified date of the image, its ID, and whether it was loaded successfully.
  * @example
  * image = gbox.getImage('logo');
  * image; // => <img src=?"logo.png?_brc=5-7-2010-15-48-42" src_org=?"logo.png" id=?"logo" wasloaded=?"true">?
  */
	getImage:function(id){return this._images[id]},
  
  /**
  * Gets the buffer canvas (automatically created by gbox.initScreen).
  * @returns {Object} A DOM Canvas element, including the width and height of the canvas.
  */
	getBuffer:function(){return (gbox._fskid>=gbox._frameskip?(this._db?this.getCanvas("_buffer"):this._screen):null)},

  /**
  * Gets the buffer canvas context.
  * @returns {Object} A DOM Canvas context object.
  */
	getBufferContext:function(){ return (gbox._fskid>=gbox._frameskip?(this._db?this.getCanvasContext("_buffer"):this._screen.getContext("2d")):null) },
  
  /**
  * Gets a given canvas.
  * @param {Object} id The identifier of the canvas.
  * @returns {Object} A DOM Canvas element, including the width and height of the canvas.
  */
	getCanvas:function(id){return this._canvas[id]},
  
  /**
  * Gets the two-dimensional canvas context of a given canvas. The object it returns contains all the drawing functions for the canvas.
  * See <a href = "http://dev.w3.org/html5/spec/Overview.html#the-canvas-element">W3C</a> and
  * <a href = "https://developer.mozilla.org/en/canvas_tutorial/basic_usage">Mozilla Developer Center</a> for details.
  * @param {Object} id The identifier of the canvas.
  * @returns {Object} A DOM Canvas context object.
  */
	getCanvasContext:function(id){return this.getCanvas(id).getContext("2d");},
  
  /**
  * Adds an image file to the loader, assigning it to an ID. If adding an image to an existing ID, it checks to see if the file you're
  * adding is different than the one currently assigned to the ID. If it's different, it overwrites the old image. If it's the same, then
  * no action is taken.
  * @param {String} id The identifier of the image.
  * @param {String} filename The file name of the image.
  */
	addImage:function(id,filename) {
		if (this._images[id])
			if (this._images[id].getAttribute("src_org")==filename)
				return;
			else
				delete this._images[id];
		this._addtoloader({type:"image",id:id,filename:filename});
	},
  
  /**
  * Deletes an image currently in use. Does not delete the image file, but removes it from Akihabara's image list.
  * @param {String} id The identifier of the image.
  */
	deleteImage:function(id) {
		delete this._images[id];
	},
  
  /**
  * Creates a new Akihabara tileset, adding it to the engine.
  * @param {Object} t An object containing: <ul><li>id {String}: the new id of the tileset</li>
  * <li>image {String}: reference to the tileset image loaded</li>
  * <li>tileh {Integer}: height in pixels of the tiles</li>
  * <li>tilew {Integer}: width in pixels of the tiles</li>
  * <li>tilerow {Integer}: width in pixels of each row in the font image</li>
  * <li>gapx {Integer}: x-coord gap between tile columns, in pixels</li>
  * <li>gapy {Integer}: y-coord gap between tile rows, in pixels</li></ul>
  */
	addTiles:function(t) { 
		t.tilehh=Math.floor(t.tileh/2);
		t.tilehw=Math.floor(t.tilew/2);
		this._tiles[t.id]=t;
	},

  /**
  * Gets an Akihabara tileset, adding it to the engine.
  * @param {String} t The ID of a tileset.
  * @returns An object containing: <ul><li>id {String}: the new id of the tileset</li>
  * <li>image {String}: reference to the tileset image loaded</li>
  * <li>tileh {Integer}: height in pixels of the tiles</li>
  * <li>tilew {Integer}: width in pixels of the tiles</li>
  * <li>tilerow {Integer}: width in pixels of each row in the font image</li>
  * <li>gapx {Integer}: x-coord gap between tile columns, in pixels</li>
  * <li>gapy {Integer}: y-coord gap between tile rows, in pixels</li></ul>
  */
	getTiles:function(t) { return this._tiles[t] },
  
  /**
  * Loads the initial splash screen and debugging font, then calls gbox._waitforloaded which adds to the game all the previously
  * defined resources. Once gbox._waitforloaded is done, it calls the callback function cb.
  * @params {String} cb The name of the function to be called when all assets are done loading.
  */
	loadAll:function(cb) {
		// Setup logger
		if (this._canlog) this.log=console.log;
		// Set the callback function, which is called after the resources are loaded.
		if (!this._cb) this._cb = cb;
		// Default stuff
		this.addImage("_dbf","akihabara/debugfont.png");
		if (this._splash.background) this.addImage("_splash",this._splash.background);
		gbox.addFont({id:"_dbf",image:"_dbf",firstletter:" ",tileh:5,tilew:4,tilerow:16,gapx:0,gapy:0});
		if (!gbox._splash.minimalTime)
			gbox._minimalexpired=2;
		this._waitforloaded();
	},
  
	_implicitsargs:function(data) {
		if (data.camera) {
			data.dx-=this._camera.x;
			data.dy-=this._camera.y;	
		}
		if (data.sourcecamera) {
			data.x=this._camera.x*(data.parallaxx?data.parallaxx:1);
			data.y=this._camera.y*(data.parallaxy?data.parallaxy:1);	
		}
	},
  
  /**
  * Draws a tile to a canvas context
  * @param {Object} tox The canvas context to be drawn on.
  * @param {Object} data An object containing data about the tile to be drawn, including:
  * <ul><li>tileset {String}: the id of the tileset</li>
  * <li>tile {Integer}: the index of the tile within the tileset to be drawn</li>
  * <li>dx {Integer}: x coordinate to draw the tile at</li>
  * <li>dy {Integer}: y coordinate to draw the tile at</li>
  * <li>fliph {Integer}: horizontal flip, either 1 or -1</li>
  * <li>flipv {Integer}: vertical flip, either 1 or -1</li>
  * <li>alpha {Float}: alpha value (0 is transparent, 1 is opaque)</li></ul>
  * @example
  * // from capman, draws an current object's tile, called from inside its blit function
  * gbox.blitTile(gbox.getBufferContext(),{tileset:this.tileset,tile:this.frame,dx:this.x,dy:this.y,fliph:this.fliph,flipv:this.flipv,camera:this.camera,alpha:1});
  */
	blitTile:function(tox,data) {
		if (tox==null) return;
		var ts=this._tiles[data.tileset];
		var img=this.getImage(ts.image);
		this._implicitsargs(data);
		tox.save();
		tox.globalAlpha=(data.alpha?data.alpha:1);
		tox.translate((data.fliph?ts.tilew:0), (data.flipv?ts.tileh:0)); tox.scale((data.fliph?-1:1), (data.flipv?-1:1));
		this._safedrawimage(tox,img, ts.gapx+(ts.tilew*(data.tile%ts.tilerow)),ts.gapy+(ts.tileh*Math.floor(data.tile/ts.tilerow)),(data.w==null?ts.tilew:data.w),(data.h==null?ts.tileh:data.h),data.dx*(data.fliph?-1:1),data.dy*(data.flipv?-1:1),(data.w?data.w:ts.tilew),(data.h?data.h:ts.tileh));
		tox.restore();
	},

  /**
  * Draws an image to a canvas context
  * @param {Object} tox The canvas context to be drawn on.
  * @param {Object} image The image to draw. Must be a DOM Image element, typicallly accessed via gbox.getImage
  * @param {Object} data An object containing data about the tile to be drawn, including:
  * <ul><li>dx {Integer}: (required) x coordinate to draw the image at</li>
  * <li>dy {Integer}: (required) y coordinate to draw the image at</li>
  * <li>fliph {Integer}: horizontal flip, either 1 or -1</li>
  * <li>flipv {Integer}: vertical flip, either 1 or -1</li>
  * <li>alpha {Float}: alpha value (0 is transparent, 1 is opaque)</li></ul>
  * @example
  * // draw an image at (100,100)
  * gbox.blitAll(gbox.getBufferContext(),gbox.getImage("image_id"),{dx:100,dy:100});
  */
	blitAll:function(tox,image,data) {
		if (tox==null) return;
		this._implicitsargs(data);
		tox.save();
		tox.globalAlpha=(data.alpha?data.alpha:1);
		tox.translate((data.fliph?image.width:0), (data.flipv?image.height:0)); tox.scale((data.fliph?-1:1), (data.flipv?-1:1));
		this._safedrawimage(tox,image, 0,0, image.width,image.height,data.dx*(data.fliph?-1:1),data.dy*(data.flipv?-1:1),image.width,image.height);
		tox.restore();
	},
  
	blit:function(tox,image,data) {
		if (tox==null) return;
		this._implicitsargs(data);
		tox.save();
		tox.globalAlpha=(data.alpha?data.alpha:1);
		tox.translate((data.fliph?data.dw:0), (data.flipv?data.dh:0)); tox.scale((data.fliph?-1:1), (data.flipv?-1:1));
		this._safedrawimage(tox,image,(data.x?data.x:0), (data.y?data.y:0),(data.w?data.w:data.dw),(data.h?data.h:data.dh),data.dx*(data.fliph?-1:1),data.dy*(data.flipv?-1:1),data.dw,data.dh);
		tox.restore();
	},
  
  
  /**
  * Draws a tilemap to a canvas context
  * @param {Object} tox The canvas context to be drawn on.
  * @param {Object} data An object containing a set of tilemap data, including:
  * <ul><li>tileset {String}: (required) the id of the tileset the tilemap is based on</li>
  * <li>map {Array}: an array whose x and y coord represent the tilemap coordinates, containing integers that correspond to the index of a given tile (or null for no tile)</li></ul>
  */
	blitTilemap:function(tox,data) {
		if (tox==null) return;
		var ts=this._tiles[data.tileset];
		for (var y=0;y<data.map.length;y++)
			for (var x=0;x<data.map[y].length;x++)
				if (data.map[y][x]!=null) this.blitTile(tox,{tileset:data.tileset,tile:data.map[y][x],dx:x*ts.tilew,dy:y*ts.tilew});
	},
  
  
  /**
  * Draws text to a canvas context
  * @param {Object} tox The canvas context to be drawn on.
  * @param {Object} data An object containing a set of data, including:
  * <ul><li>font {String}: (required) the id of font to draw the text with</li>
  * <li>text {String}: (required) the text to display</li>
  * <li>dx {Integer}: (required) the x coordinate to draw the text at</li>
  * <li>dy {Integer}: (required) the y coordinate to draw the text at</li>
  * <li>dw {Integer}: the width of the text area -- required if you define data.halign</li>
  * <li>dh {Integer}: the height of the text area -- required if you define data.valign</li>
  * <li>valign {Integer}: either gbox.ALIGN_BOTTOM (aligns from the bottom of the text area) or gbox.ALIGN_MIDDLE (vertically centers text in text area)</li>
  * <li>halign {Integer}: either gbox.ALIGN_RIGHT (aligns to the right hand side of text area) or gbox.ALIGN_CENTER (horizontallly centers text in text area)</li>
  * <li>alpha {Float}: alpha value (0 is transparent, 1 is opaque)</li></ul>
  */
	blitText:function(tox,data) {
		if (tox==null) return;
		data.text+=""; // Convert to string.
		var fn=this._fonts[data.font];
		var tile=0;
		this._implicitsargs(data);
		var dx=data.dx;
		var dy=data.dy;			
		if (data.valign==gbox.ALIGN_BOTTOM) dy = dy+data.dh-fn.tileh;
		else if (data.valign==gbox.ALIGN_MIDDLE) dy = dy+Math.floor(data.dh/2)-fn.tileh;
		if (data.halign==gbox.ALIGN_RIGHT) dx = dx+data.dw-(data.text.length*fn.tilew);
		else if (data.halign==gbox.ALIGN_CENTER) dx = dx+Math.floor((data.dw-(data.text.length*fn.tilew))/2);
		tox.save();
		tox.globalAlpha=(data.alpha?data.alpha:1);
		for (var y=0;y<data.text.length;y++) {
			tile=data.text.charCodeAt(y)-fn.firstascii;
			if (tile>=0) {
				if (data.clear) tox.clearRect(dx+(y*fn.tilew),dy,(data.w?data.w:fn.tilew),(data.h?data.h:fn.tileh));
				this._safedrawimage(tox,this.getImage(fn.image), fn.gapx+(fn.tilew*(tile%fn.tilerow)),
				fn.gapy+(fn.tileh*Math.floor(tile/fn.tilerow)),fn.tilew,fn.tileh,dx+(y*fn.tilew),dy,(data.w?data.w:fn.tilew),(data.h?data.h:fn.tileh));
			}
		}
		tox.restore();
	},
  
  /**
  * Clears a rectangular area of a canvas context.
  * @param {Object} image The canvas context to be drawn on.
  * @param {Object} data An object containing a set of data, including:
  * <ul><li>x {Integer}: (required) the x coordinate of the top-left corner of the rectangle</li>
  * <li>y {Integer}: (required) the y coordinate of the top-left corner of the rectangle</li>
  * <li>w {Integer}: the width of the box; defaults to canvas width</li>
  * <li>h {Integer}: the height the box; defaults to canvas height</li></ul>
  */
	blitClear:function(image,data) {
		if (image==null) return;
		if (data==null) data={x:0,y:0};
		this._implicitsargs(data);
		image.clearRect(data.x,data.y,(data.w==null?image.canvas.width:data.w),(data.h==null?image.canvas.height:data.h));
	},
  
  /**
  * Draws an image directly to the screen's current canvas context. Used internally in gbox.go(). Probably shouldn't be used otherwise.
  */
	blitImageToScreen:function(image) {
		this._screen.getContext("2d").drawImage(image,0,0);
	},
  
   /**
  * Draws a filled rectangle over an entire canvas context.
  * @param {Object} tox The canvas context to be filled.
  * @param {Object} data An object containing a set of data, including:
  * <ul><li>alpha {Float}: the alpha value of the rectangle; defaults to 1</li>
  * <li>color {Object}: the color of the box, formatted rgb(rValue, gValue, bValue); default black</li></ul>
  */
	blitFade:function(tox,data) { 
		if (tox) this.blitRect(tox,{x:0,y:0,w:tox.canvas.width,h:tox.canvas.height,alpha:data.alpha,color:data.color});
	},
  
  /**
  * Draws a filled rectangle to a canvas context.
  * @param {Object} tox The canvas context to be drawn on.
  * @param {Object} data An object containing a set of data, including:
  * <ul><li>x {Integer}: (required) the x coordinate of the top-left corner of the rectangle</li>
  * <li>y {Integer}: (required) the y coordinate of the top-left corner of the rectangle</li>
  * <li>w {Integer}: (required) the width of the box</li>
  * <li>h {Integer}: (required) the height the box</li>
  * <li>alpha {Float}: the alpha value of the rectangle; defaults to 1</li>
  * <li>color {Object}: the color of the box, formatted rgb(rValue, gValue, bValue); default black</li></ul>
  */
	blitRect:function(tox,data) {
		if (tox==null) return;
		tox.save();
		tox.globalAlpha=(data.alpha?data.alpha:1);
		tox.fillStyle = (data.color?data.color:gbox.COLOR_BLACK);
		tox.fillRect(data.x,data.y,data.w,data.h);
		tox.restore();
	},
  
  /**
  * Calculates a box collision between two collision boxes within a given tolerance. A higher tolerance means less precise collision.
  * @param {Object} o1 A collision box you're testing for collision. Must contain:
  * <ul><li>x {Integer}: (required) the x coordinate of the object's origin; assumes the Akihabara default of top-left being the origin</li>
  * <li>y {Integer}: (required) the y coordinate of the object's origin; assumes the Akihabara default of top-left being the origin</li>
  * <li>w {Integer}: (required) the width of the box</li>
  * <li>h {Integer}: (required) the height the box</li></ul>
  * @param {Object} o2 A collision box you're testing for collision. Must contain:
  * <ul><li>x {Integer}: (required) the x coordinate of the object's origin; assumes the Akihabara default of top-left being the origin</li>
  * <li>y {Integer}: (required) the y coordinate of the object's origin; assumes the Akihabara default of top-left being the origin</li>
  * <li>w {Integer}: (required) the width of the box</li>
  * <li>h {Integer}: (required) the height the box</li></ul>
  * @param {Integer} t The tolerance for the collision, in pixels. A value of 0 means pixel-perfect box collision. A value of 2 would mean that the
  * boxes could overlap by up to 2 pixels without being considered a collision.
  * @returns True if the two collision boxes are colliding within the given tolerance.
  */  
	collides:function(o1,o2,t) {
		if (!t) t=0;
		return !((o1.y+o1.h-1-t<o2.y+t) || (o1.y+t> o2.y+o2.h-1-t) || (o1.x+o1.w-1-t<o2.x+t) || (o1.x+t>o2.x+o2.w-1-t));
	},
  
  /**
  * Calculates a point-box collision between a point and a collision box within a given tolerance. A higher tolerance means less precise collision.
  * @param {Object} o1 A point you're testing for collision. Must contain:
  * <ul><li>x {Integer}: (required) the x coordinate of the point</li>
  * <li>y {Integer}: (required) the y coordinate of the point</li></ul>
  * @param {Object} o2 A collision box you're testing for collision. Must contain:
  * <ul><li>x {Integer}: (required) the x coordinate of the object's origin; assumes the Akihabara default of top-left being the origin</li>
  * <li>y {Integer}: (required) the y coordinate of the object's origin; assumes the Akihabara default of top-left being the origin</li>
  * <li>w {Integer}: (required) the width of the box</li>
  * <li>h {Integer}: (required) the height the box</li></ul>
  * @param {Integer} t The tolerance for the collision, in pixels. A value of 0 means pixel-perfect collision. A value of 2 would mean that the
  * point could exist within the outermost 2 pixels of the box without being considered a collision.
  * @returns True if the point is colliding with the box within the given tolerance.
  */  
	pixelcollides:function(o1,o2,t) {
		if (!t) t=0;
		return !((o1.y<o2.y+t) || (o1.y> o2.y+o2.h-1-t) || (o1.x<o2.x+t) || (o1.x>o2.x+o2.w-1-t));
	},
  
  /**
  * Determines whether an object is visible by seeing if it collides with the camera's viewport.
  * @param {Object} obj The object you're testing to see if it's visible. Must contain:
  * <ul><li>x {Integer}: (required) the x coordinate of the object's origin; assumes the Akihabara default of top-left being the origin</li>
  * <li>y {Integer}: (required) the y coordinate of the object's origin; assumes the Akihabara default of top-left being the origin</li>
  * <li>w {Integer}: (required) the width of the object's collision box</li>
  * <li>h {Integer}: (required) the height the object's box</li></ul>
  * @returns True if the object's collision box is within the camera's viewport.
  */  
	objectIsVisible:function(obj) { return this.collides(obj,this._camera,0); },
	
	// --- 
	// --- 
	// ---  AUDIO ENGINE
	// --- 
	// --- 
	
	_audiochannels:{},
	_audiomastervolume:1.0,
	_canaudio:false,
	_audiodequeuetime:0,
	_audioprefetch:0.5,
	_audiocompatmode:0, // 0: pause/play, 1: google chrome compatibility, 2: ipad compatibility (single channel)
	_createmode:0, // 0: clone, 1: rehinstance
	_fakecheckprogressspeed:100, // Frequency of fake audio monitoring
	_fakestoptime:1, // Fake audio stop for compatibility mode
	_audioteam:2,
	_loweraudioteam:1,
	_audio:{lding:null,qtimer:false,aud:{},ast:{}},
	_audioactions:[],
	_showplayers:false,
	_singlechannelname:"bgmusic",
	_positiondelay:0,
	_playerforcer:0,
	_forcedmimeaudio:null,
	_singlechannelaudio:false,
	_audiomutevolume:0.0001, // Zero is still not accepted by everyone :(
	_rawstopaudio:function(su) {
		if (gbox._audiocompatmode==1) {
			if (su.duration-su.currentTime>gbox._fakestoptime)
				su.currentTime=su.duration-gbox._fakestoptime;
			su.muted=true;
		} else
			su.pause();

	},
	_rawplayaudio:function(su) {
		if (gbox._audiocompatmode==1) {
			try { su.currentTime=0; } catch (e) {}
			su.muted=false;
			su.play();
		} else if (gbox._audiocompatmode==2) {
			su.load();
			gbox._playerforcer=setInterval(function(e){try{su.play();clearInterval(gbox._playerforcer)}catch(e){}},1000);
		} else {
			try { su.currentTime=0; } catch (e) {}
			su.play();
		}
	},
	_finalizeaudio:function(ob,who,donext){
	
		var cur=(who?who:this);
		gbox.removeEventListener(cur,'ended', gbox._finalizeaudio);
		gbox.removeEventListener(cur,'timeupdate', gbox._checkprogress);
		
		gbox.addEventListener(cur,'ended', gbox._playbackended);
		if (donext) gbox._loaderloaded();
	},
	_audiodoload:function() {
		if (gbox._audiocompatmode==1) gbox._audio.lding.muted=true;
		else if (gbox._audiocompatmode==2)
			gbox._finalizeaudio(null,gbox._audio.lding,true);
		else {
			gbox._audio.lding.load();
			gbox._audio.lding.play();
		}
	},
	_timedfinalize:function() {
		gbox._rawstopaudio(gbox._audio.lding);
		gbox._finalizeaudio(null,gbox._audio.lding,true);	
	},
	_checkprogress:function() {
		if (gbox._audio.lding.currentTime>gbox._audioprefetch) gbox._timedfinalize();
	},
	_fakecheckprogress:function() {
		if (gbox._audio.lding.currentTime>gbox._audioprefetch) gbox._timedfinalize(); else setTimeout(gbox._fakecheckprogress,gbox._fakecheckprogressspeed);	
	},
	_audiofiletomime:function(f) {
		var fsp=f.split(".");
		switch (fsp.pop().toLowerCase()) {
			case "ogg": { return "audio/ogg"; break }
			case "mp3": { return "audio/mpeg"; break }
			default: {
				return "audio/mpeg";
			}
		}
	},
	_pushaudio:function(){try {this.currentTime=1.0} catch(e){} },
	_createnextaudio:function(cau) {
		if (cau.def) {
			gbox.deleteAudio(cau.id);
			this._audio.aud[cau.id]=[];
			this._audio.ast[cau.id]={cy:-1,volume:1,channel:null,play:false,mute:false,filename:cau.filename[0]};
			if (cau.def) for (var a in cau.def) this._audio.ast[cau.id][a]=cau.def[a];
		}
		if ((gbox._createmode==0)&&(cau.team>0)) {
			var ael =this._audio.aud[cau.id][0].cloneNode(true);
			gbox._finalizeaudio(null,ael,false);
		} else {
			var ael=document.createElement('audio');
			ael.volume=gbox._audiomutevolume;
		}
		if (!gbox._showplayers) {
			ael.style.display="none";
			ael.style.visibility="hidden";
			ael.style.width="1px";
			ael.style.height="1px";
			ael.style.position="absolute";
			ael.style.left="0px";
			ael.style.top="-1000px";
		}
		ael.setAttribute('controls',gbox._showplayers);
		ael.setAttribute('aki_id',cau.id);
		ael.setAttribute('aki_cnt',cau.team);
		gbox.addEventListener(ael,'loadedmetadata', gbox._pushaudio); // Push locked audio in safari
		if (((gbox._createmode==0)&&(cau.team==0))||(gbox._createmode==1)) {
			if (gbox._forcedmimeaudio) {
				for (var i=0;i<cau.filename.length;i++) {
					if (gbox._audiofiletomime(cau.filename[i]).indexOf(gbox._forcedmimeaudio)!=-1) {
						ael.src=gbox._breakcacheurl(cau.filename[i]);
						break;
					}
				}
			} else if (ael.canPlayType) {
				var cmime;
				for (var i=0;i<cau.filename.length;i++) {
					cmime=gbox._audiofiletomime(cau.filename[i]);
					if (("no" != ael.canPlayType(cmime)) && ("" != ael.canPlayType(cmime))) {
						ael.src=gbox._breakcacheurl(cau.filename[i]);
						break;
					}
				}
			} else {
				for (var i=0;i<cau.filename.length;i++) {
					var src=document.createElement('source');
					src.setAttribute('src', gbox._breakcacheurl(cau.filename[i]));
					ael.appendChild(src);
				}
			}
			gbox.addEventListener(ael,'ended',this._finalizeaudio);
			if (gbox._audiocompatmode==1)
				setTimeout(gbox._fakecheckprogress,gbox._fakecheckprogressspeed);
			else
				gbox.addEventListener(ael,'timeupdate',this._checkprogress);
			ael.setAttribute('buffering',"auto");
			ael.volume=0;
			this._audio.aud[cau.id].push(ael);
			document.body.appendChild(ael);
			gbox._audio.lding=ael;
			setTimeout(gbox._audiodoload,1);
		} else {
			this._audio.aud[cau.id].push(ael);
			document.body.appendChild(ael);
			gbox._loaderloaded();
		}
	},
	_playbackended:function(e) {
		if (gbox._audio.ast[this.getAttribute('aki_id')].cy==this.getAttribute('aki_cnt')) {
			if (gbox._audio.ast[this.getAttribute('aki_id')].play&&gbox._audio.ast[this.getAttribute('aki_id')].loop)
				if (gbox._audiocompatmode==2)
					gbox._rawplayaudio(this);
				else
					this.currentTime=0;
			else
				gbox._audio.ast[this.getAttribute('aki_id')].play=false; 
		} else if (gbox._audiocompatmode==1) {
			this.pause();
			this.muted=false;
		}
	},
	_updateaudio:function(a) {
		if (this._audio.ast[a].play) {
			this._audio.aud[a][this._audio.ast[a].cy].volume=(this._audio.ast[a].mute?this._audiomutevolume: 
				this._audiomastervolume*
				(this._audio.ast[a].volume!=null?this._audio.ast[a].volume:1)*
				((this._audio.ast[a].channel!=null)&&(this._audiochannels[this._audio.ast[a].channel]!=null)&&(this._audiochannels[this._audio.ast[a].channel].volume!=null)?this._audiochannels[this._audio.ast[a].channel].volume:1)
			)
		}
	},
	_minimaltimeexpired:function() { gbox._minimalexpired=2; },
	_splashscreeniscompleted:function() { return (gbox._splash.background?gbox.imageIsLoaded("_splash"):true) && (gbox._splash.minilogo?gbox.imageIsLoaded("logo"):true) && (gbox._splash.footnotes?gbox.imageIsLoaded("_dbf"):true) },
	_addqueue:function(a) {
		if (!gbox._audiodequeuetime)
			gbox._dequeueaudio(null,a);
		else {
			gbox._audioactions.push(a);
			if (!gbox._audio.qtimer) {
				gbox._audio.qtimer=true;
				setTimeout(gbox._dequeueaudio,gbox._audiodequeuetime);
			}
		}
	},
	_dequeueaudio:function(k,rt) {
			var ac=(rt?rt:gbox._audioactions.pop());
			switch (ac.t) {
				case 0: {
					gbox._updateaudio(ac.a.getAttribute("aki_id"));
					gbox._rawplayaudio(ac.a);
					break
				}
				case 1: {
					gbox._rawstopaudio(ac.a);
					break;
				}
				case 2: {
					gbox._updateaudio(ac.a.getAttribute("aki_id"));
					break;
				}
			}
			if (!rt&&gbox._audioactions.length) {
				gbox._audio.qtimer=true;
				setTimeout(gbox._dequeueaudio,gbox._audiodequeuetime);
			} else gbox._audio.qtimer=false;
	
	},
	getAudioIsSingleChannel:function() { return this._singlechannelaudio; },
	setAudioIsSingleChannel:function(m) { gbox._singlechannelaudio=m },
	setAudioPositionDelay:function(m) { gbox._positiondelay=m },
	setAudioDequeueTime:function(m) { gbox._audiodequeuetime=m },
	setShowPlayers:function(m) { gbox._showplayers=m},
	setAudioCompatMode:function(m) { gbox._audiocompatmode=m },
	setAudioCreateMode:function(m) { gbox._createmode=m },
	addAudio:function(id,filename,def) {
		if (gbox._canaudio) {
			if (gbox._audio.aud[id])
				if (gbox._audio.ast[id].filename==filename[0])
					return;
				else
					gbox.deleteAudio(id);
			if (!gbox._singlechannelaudio||(def.channel==gbox._singlechannelname)) {
				var grsize=(def.channel==gbox._singlechannelname?gbox._loweraudioteam:(def.background?gbox._loweraudioteam:gbox._audioteam));
				for (var i=0;i<grsize;i++)
					gbox._addtoloader({type:"audio",data:{id:id,filename:filename,def:(i==0?def:null),team:i}});
			}
		}
	},
	deleteAudio:function(id) {
		if (gbox._audio.aud[id]) {
			for (var i=0;i<gbox._audio.aud[id].length;i++) {
				try {document.body.removeChild(gbox._audio.aud[id][i]);}catch(e){}
				delete gbox._audio.aud[id][i];
			}
			delete gbox._audio.aud[id];
			if (gbox._audio.ast[id]) delete gbox._audio.ast[id];
		}
	},
	playAudio:function(a,data) {
		if (this._canaudio&&this._audio.ast[a])
			if (!this._audio.ast[a].play) this.hitAudio(a,data);
	},
	hitAudio:function(a,data) {
		if (this._canaudio&&this._audio.ast[a]) {
			var ael;
			if (this._audio.ast[a].cy!=-1)
				this.stopAudio(a,true);
			this._audio.ast[a].cy=(this._audio.ast[a].cy+1)%this._audio.aud[a].length;
			ael=this._audio.aud[a][this._audio.ast[a].cy];
			if (data) 
				for (var n in data) this._audio.ast[a][n]=data[n];
			this._audio.ast[a].play=true;
			this._addqueue({t:0,a:ael});
		}
	},
	stopAudio:function(a,permissive) {
		if (this._canaudio) {
			var ael;
			if (this._canaudio&&this._audio.ast[a]&&this._audio.ast[a].play) {
				this._audio.ast[a].play=false;
				ael=this._audio.aud[a][this._audio.ast[a].cy];
				if (ael.duration-1.5>0)
					this._addqueue({t:1,a:ael});
			}
		}
	},
	setSplashSettings:function(a) { for (var n in a) this._splash[n]=a[n]; },
	resetChannel:function(ch) {
		if (this._canaudio&&this._audiochannels[ch])
			if (ch=="master")
				for (var ch in this._audiochannels)
					this.setChannelVolume(ch,this._audiochannels[ch]._def.volume);
			else if (this._audiochannels[ch])
				this.setChannelVolume(ch,this._audiochannels[ch]._def.volume);
	},
	getChannelDefaultVolume:function(ch) {
		if (this._canaudio&&this._audiochannels[ch]) return this._audiochannels[ch]._def.volume; else return null;
	},
	setChannelVolume:function(ch,a) {
		if (this._canaudio&&this._audiochannels[ch]) {
			if (ch=="master") this._audiomastervolume=a; else this._audiochannels[ch].volume=a
			for (var j in gbox._audio.aud)
				if (this._audio.ast[j].cy>-1) this._updateaudio(j);
		}
	},
	getChannelVolume:function(ch) { if (ch=="master") return this._audiomastervolume; else if (this._audiochannels[ch]) return this._audiochannels[ch].volume; else return 0 },
	changeChannelVolume:function(ch,a) {
		if (this._canaudio&&this._audiochannels[ch]) {
			var vol=this.getChannelVolume(ch)+a;
			if (vol>1) vol=1; else if (vol<0) vol=0;
			this.setChannelVolume(ch,vol);
		}
	},
	stopChannel:function(ch) {
		if (this._canaudio)
			for (var j in gbox._audio.aud)
				if (this._audio.ast[j].cy>-1&&gbox._audio.ast[j].play&&((ch=="master")||(this._audio.ast[j].channel==ch)))
					this.stopAudio(j);
	},
	
	setAudioUnmute:function(a) { if (this._canaudio&&this._audio.ast[a]) { this._audio.ast[a].mute=false; this._updateaudio(a); } },
	setAudioMute:function(a) { if (this._canaudio&&this._audio.ast[a]) { this._audio.ast[a].mute=true; this._updateaudio(a); } },
	getAudioMute:function(a) { if (this._canaudio&&this._audio.ast[a]) return this._audio.ast[a].mute; else return null},
	
	setAudioVolume:function(a,vol) { if (this._canaudio&&this._audio.ast[a]) { this._audio.ast[a].volume=vol; this._updateaudio(a); } },
	getAudioVolume:function(a,vol) { if (this._canaudio&&this._audio.ast[a]) return this._audio.ast[a].volume; else return null},
	
	setAudioPosition:function(a,p) {  if (this._canaudio&&this._audio.ast[a]&&this._audio.aud[a][this._audio.ast[a].cy]) this._audio.aud[a][this._audio.ast[a].cy].currentTime=p;},
	getAudioPosition:function(a) {if (this._canaudio&&this._audio.ast[a]&&this._audio.aud[a][this._audio.ast[a].cy]) if (this._audio.aud[a][this._audio.ast[a].cy].currentTime>this._positiondelay) return this._audio.aud[a][this._audio.ast[a].cy].currentTime-this._positiondelay; else return 0; else return 0},

	getAudioDuration:function(a) {if (this._canaudio&&this._audio.ast[a]&&this._audio.aud[a][this._audio.ast[a].cy]) return this._audio.aud[a][this._audio.ast[a].cy].duration; else return 0},

	changeAudioVolume:function(a,vol) { if (this._canaudio&&this._audio.ast[a]) { if (this._audio.ast[a].volume+vol>1) this._audio.ast[a].volume=1; else  if (this._audio.ast[a].volume+vol<0) this._audio.ast[a].volume=0; else this._audio.ast[a].volume+=vol; this._updateaudio(a); } },
	setCanAudio:function(a) { this._canaudio=!this._flags.noaudio&&a;},
	setForcedMimeAudio:function(a){ this._forcedmimeaudio=a;},
	setAudioChannels:function(a){
		this._audiochannels=a;
		for (var ch in a) {
			this._audiochannels[ch]._def={};
			for (var attr in this._audiochannels[ch])
				if (attr!="_def") this._audiochannels[ch]._def[attr]=this._audiochannels[ch][attr];
		}
	},
	setAudioTeam:function(a){ this._audioteam=a; },
	setLowerAudioTeam:function(a){ this._loweraudioteam=a; },
	
	// ---
	// ---
	// ---  DYNAMIC SCRIPT INCLUSION
	// ---
	// ---
	
	addScript:function(call) {
		gbox._addtoloader({type:"script",call:call});
	},
	
	// ---
	// ---
	// ---  BUNDLES
	// ---
	// ---
	
	addBundle:function(call){
		gbox._addtoloader({type:"bundle",call:call});
	},
	
	readBundleData:function(pack,call) {
		// Local resources first
		if (pack.setObject) for (var i=0;i<pack.setObject.length;i++) eval("("+pack.setObject[i].object+")")[pack.setObject[i].property]=pack.setObject[i].value;
		if (pack.addFont) for (var i=0;i<pack.addFont.length;i++) gbox.addFont(pack.addFont[i]);
		if (pack.addTiles) for (var i=0;i<pack.addTiles.length;i++) gbox.addTiles(pack.addTiles[i]);
		// Remote resources for last
		if (pack.addImage) for (var i=0;i<pack.addImage.length;i++) gbox.addImage(pack.addImage[i][0],pack.addImage[i][1]);
		if (pack.addAudio) for (var i=0;i<pack.addAudio.length;i++) gbox.addAudio(pack.addAudio[i][0],pack.addAudio[i][1],pack.addAudio[i][2]);
		if (pack.addBundle) for (var i=0;i<pack.addBundle.length;i++) gbox.addBundle(pack.addBundle[i]);
		if (pack.addScript) for (var i=0;i<pack.addScript.length;i++) gbox.addScript(pack.addScript[i]);
		// Trigger the onLoad events in resource and loader
		if (pack.onLoad) gbox._addtoloader({type:"exec-onl",func:pack.onLoad,call:call,pack:pack});				
		if (call.onLoad) gbox._addtoloader({type:"exec-onl",func:call.onLoad,call:call,pack:pack});	
	},
	
	// --- 
	// --- 
	// ---  DATA LOADER
	// --- 
	// --- 

	_xmlhttp:null,
	_loaderqueue:cyclelist.create(200),
	_loadercache:cachelist.create(30),
	
	// Callback for loaded image
	_loaderimageloaded:function() {
		this.setAttribute('wasloaded',true);
		this.hheight=Math.floor(this.height/2);
		this.hwidth=Math.floor(this.width/2);
		gbox._loaderloaded();	
	},
	// Callback for loaded bundle
	_loaderhmlhttploading:function(){
		var rs=(typeof this.readyState != "undefined" ?this.readyState:gbox._xmlhttp.readyState);
		var st=(typeof this.status != "undefined" ?this.status:gbox._xmlhttp.status);
		var rt=(typeof this.responseText != "undefined" ?this.responseText:gbox._xmlhttp.responseText);
		if(rs == 4 && (!st ||st == 200)) {
			if (rt) {
				if (!gbox._loaderqueue.getCurrent().call.skipCacheSave)
					gbox._loadercache.add(gbox._loaderqueue.getCurrent().call.file,rt);
				var pack=eval("("+rt+")");
				gbox.readBundleData(pack,gbox._loaderqueue.getCurrent().call);
				// Keep loading the other resources.
				gbox._loaderloaded();
			}	
		}
	},
	
	// Loader code
	_addtoloader:function(d) { // type:xx, data:yy
		gbox._loaderqueue.push(d);
		if (!gbox._loaderqueue.isProcessing())
			gbox._loadnext();
	},
	_loaderloaded:function() {
		setTimeout(gbox._loadnext,10);
	},
	_loaderscript:function() {
		if (gbox._loaderqueue.getCurrent().call.onLoad) gbox._addtoloader({type:"exec-onl",func:gbox._loaderqueue.getCurrent().call.onLoad,call:gbox._loaderqueue.getCurrent().call});
		gbox._loadnext();
	},
	_loadnext:function() {
		var current=gbox._loaderqueue.pop();
		if (gbox._loaderqueue.isProcessing()) {
			switch (gbox._loaderqueue.getCurrent().type) {
				case "image":{
					gbox._images[current.id]=new Image();
					gbox.addEventListener(gbox._images[current.id],'load', gbox._loaderimageloaded);
					gbox._images[current.id].src=gbox._breakcacheurl(current.filename);
					gbox._images[current.id].setAttribute('src_org',current.filename);
					gbox._images[current.id].setAttribute('id',current.id);
					gbox._images[current.id].setAttribute('wasloaded',false);
					break;
				}
				case "bundle":{
					var done=false;
					if (!current.call.skipCacheLoad) {
						var data=gbox._loadercache.read(current.call.file);
						if (data) {
							var pack=eval("("+data+")");
							gbox.readBundleData(pack,current.call);
							// Keep loading the other resources.
							gbox._loaderloaded();
							done=true;
						}
					}
					if (!done) {
						gbox._xmlhttp=gbox.createXmlHttpRequest();
						gbox._xmlhttp.open((current.call.data?"POST":"GET"), gbox._breakcacheurl(current.call.file),true);
						gbox._xmlhttp.onreadystatechange = gbox._loaderhmlhttploading;
						if (current.call.data) {
							gbox._xmlhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
							gbox._xmlhttp.send(current.call.data);
						} else gbox._xmlhttp.send();
					}
					break;
				}
				case "audio":{
					gbox._createnextaudio(current.data);
					break;
				}
				case "exec-onl":{
					current.func(current.call,current.pack);
					gbox._loaderloaded();
					break;
				}
				case "script":{
					var script= document.createElement('script');
					script.type="text/javascript";
					script.onload=gbox._loaderscript;
					script.src=current.call.file;
					document.getElementsByTagName('body')[0].appendChild(script);
					break;
				}
			}
		}
	
	},
	_waitforloaded:function() {
		var aul;
		if (gbox._loaderqueue.isBusy()||(gbox._minimalexpired!=2)) {
			var tox=gbox._screen.getContext("2d");
			tox.save();
			gbox.blitFade(tox,{alpha:1});
			if (!gbox._minimalexpired&&gbox._splashscreeniscompleted()) {
				gbox._minimalexpired=1;
				setTimeout(gbox._minimaltimeexpired,gbox._splash.minimalTime);
			}
			if (gbox._splash.loading) gbox._splash.loading(tox,gbox._loaderqueue.getDone(),gbox._loaderqueue.getTotal());
			switch (gbox._flags.loadscreen) {
				case "c64": {
					var p=0;
					var l=0;
					while (p!=gbox.getScreenH()) {
						l=10+Math.floor(Math.random()*gbox.getScreenH()/4);
						if (p+l>gbox.getScreenH()) l=gbox.getScreenH()-p;
						tox.fillStyle = gbox.PALETTES.c64.colors[gbox.PALETTES.c64.order[Math.floor(Math.random()*gbox.PALETTES.c64.order.length)]];
						tox.fillRect(0,p,gbox.getScreenW(),l);
						p+=l;
					}
					tox.fillStyle = gbox.PALETTES.c64.colors.lightblue;
					tox.fillRect(Math.floor(gbox.getScreenW()/10),Math.floor(gbox.getScreenH()/10),gbox.getScreenW()-Math.floor(gbox.getScreenW()/5),gbox.getScreenH()-Math.floor(gbox.getScreenH()/5));
					if (gbox._splash.minilogo&&gbox.imageIsLoaded("logo")) {
						var dw=gbox.getScreenW()/4;
						var dh=(gbox.getImage("logo").height*dw)/gbox.getImage("logo").width;
						gbox.blit(tox,gbox.getImage(gbox._splash.minilogo),{w:gbox.getImage("logo").width,h:gbox.getImage("logo").height,dx:(gbox.getScreenW()-dw)/2,dy:(gbox.getScreenH()-dh)/2,dw:dw,dh:dh});
					}					
					break;
				}
				default:{
					if (gbox._splash.background&&gbox.imageIsLoaded("_splash"))
						gbox.blit(tox,gbox.getImage("_splash"),{w:gbox.getImage("_splash").width,h:gbox.getImage("_splash").height,dx:0,dy:0,dw:gbox.getScreenW(),dh:gbox.getScreenH()});
					if (gbox._splash.minilogo&&gbox.imageIsLoaded("logo")) {
						var dw=gbox.getScreenW()/4;
						var dh=(gbox.getImage("logo").height*dw)/gbox.getImage("logo").width;
						gbox.blit(tox,gbox.getImage(gbox._splash.minilogo),{w:gbox.getImage("logo").width,h:gbox.getImage("logo").height,dx:gbox.getScreenW()-dw-5,dy:gbox.getScreenH()-dh-5,dw:dw,dh:dh});
					}
					if (gbox._splash.footnotes&&gbox.imageIsLoaded("_dbf")) {
						if (!gbox.getCanvas("_footnotes")) {
							var fd=gbox.getFont("_dbf");
							gbox.createCanvas("_footnotes",{w:gbox.getScreenW()-5,h:(gbox._splash.footnotes.length)*(fd.tileh+gbox._splash.footnotesSpacing)});
							for (var i=0;i<gbox._splash.footnotes.length;i++)
								gbox.blitText(gbox.getCanvasContext("_footnotes"),{
												font:"_dbf",
												dx:0,
												dy:i*(fd.tileh+gbox._splash.footnotesSpacing),
												text:gbox._splash.footnotes[i]
											});
						}
						gbox.blitAll(tox,gbox.getCanvas("_footnotes"),{dx:5,dy:gbox.getScreenH()-gbox.getCanvas("_footnotes").height-5});
					}
					if (gbox._loaderqueue.isBusy()) {
						var bw=Math.floor(((gbox.getScreenW()-4)*gbox._loaderqueue.getDone())/gbox._loaderqueue.getTotal());
						tox.globalAlpha=1;
						tox.fillStyle = gbox._splash.gaugeBorderColor;
						tox.fillRect(0,Math.floor((gbox.getScreenH()-gbox._splash.gaugeHeight)/2),gbox.getScreenW(),gbox._splash.gaugeHeight);
						tox.fillStyle = gbox._splash.gaugeBackColor;
						tox.fillRect(1,Math.floor(((gbox.getScreenH()-gbox._splash.gaugeHeight)/2)+1),gbox.getScreenW()-4,gbox._splash.gaugeHeight-2);
						tox.fillStyle = gbox._splash.gaugeColor;
						tox.fillRect(1,Math.floor(((gbox.getScreenH()-gbox._splash.gaugeHeight)/2)+1),(bw>0?bw:0),gbox._splash.gaugeHeight-2);
					}
				}
			}
			tox.restore();		
			gbox.setStatBar("Loading... ("+gbox._loaderqueue.getDone()+"/"+gbox._loaderqueue.getTotal()+")");
			setTimeout(gbox._waitforloaded,50);
		} else {
			gbox.deleteImage("_splash");
			gbox.setStatBar();
			gbox._cb();
		}
	},
	clearCache:function() { this._loadercache.clear(); },
	
	// --- 
	// --- 
	// ---  BROWSER QUIRKS
	// --- 
	// --- 
	
	checkCanvasSupport:function() {
	  return !!document.createElement('canvas').getContext;
	},
	addEventListener:function(to,event,code) {
		if (to.addEventListener) to.addEventListener(event,code,false);
		else to.attachEvent('on'+event,code);
	},
	removeEventListener:function(to,event,code) {
		if (to.removeEventListener) to.removeEventListener(event,code,false);
		else to.detachEvent('on'+event,code);
	},
	XMLHttpFactories:[
		function () {return new XMLHttpRequest()},
		function () {return new ActiveXObject("Msxml2.XMLHTTP")},
		function () {return new ActiveXObject("Msxml3.XMLHTTP")},
		function () {return new ActiveXObject("Microsoft.XMLHTTP")}
	],
	createXmlHttpRequest:function() {
		var xmlhttp=false;
	   /* running locally on IE5.5, IE6, IE7 */                                              ; /*@cc_on
		 if(location.protocol=="file:"){
		  if(!xmlhttp)try{ xmlhttp=new ActiveXObject("MSXML2.XMLHTTP"); }catch(e){xmlhttp=false;}
		  if(!xmlhttp)try{ xmlhttp=new ActiveXObject("Microsoft.XMLHTTP"); }catch(e){xmlhttp=false;}
		 }                                                                                ; @cc_off @*/
	   /* IE7, Firefox, Safari, Opera...  */
		 if(!xmlhttp)try{ xmlhttp=new XMLHttpRequest(); }catch(e){xmlhttp=false;}
	   /* IE6 */
		 if(typeof ActiveXObject != "undefined"){
		  if(!xmlhttp)try{ xmlhttp=new ActiveXObject("MSXML2.XMLHTTP"); }catch(e){xmlhttp=false;}
		  if(!xmlhttp)try{ xmlhttp=new ActiveXObject("Microsoft.XMLHTTP"); }catch(e){xmlhttp=false;}
		 }
	   /* IceBrowser */
		 if(!xmlhttp)try{ xmlhttp=createRequest(); }catch(e){xmlhttp=false;}
		return xmlhttp;
	}

};

