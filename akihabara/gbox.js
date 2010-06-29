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
 * Gamebox module allows multiple grouped objects to move simultaneously, it helps with collisions, 
 * rendering and moving objects. It also provides monospaced pixel-font rendering, keyboard handling,  
 * audio, double buffering and eventually FSEs. Gamebox can also store and load data from cookies! 
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
	_flags:{
		experimental:false,
		noaudio:false
	},
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
	},
	_keyup:function(e){
		var key=(e.fake||window.event?e.keyCode:e.which);
		gbox._keyboard[key]=-1;
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
	setForcedIdle:function(f) { this._forcedidle=f},
	getFlag:function(f) { return this._flags[f] },
	setStatusBar:function(a) { this._statbar=a },
	setScreenBorder:function(a) { this._border=a},
	initScreen:function(w,h) {
		document.body.style.textAlign="center";
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
		window.addEventListener('keydown', this._keydown,false);
		window.addEventListener('keyup', this._keyup,false);
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
		this._keyboardpicker.onclick=function(evt) { gbox._hidekeyboardpicker();evt.preventDefault();evt.stopPropagation();};
		this._hidekeyboardpicker(this._keyboardpicker);
		
		gbox._box.appendChild(this._keyboardpicker);
		gbox._screen.ontouchstart=function(evt) { gbox._screenposition=gbox._domgetabsposition(gbox._screen);if (evt.touches[0].pageY-gbox._screenposition.y<30) gbox._showkeyboardpicker();else gbox._hidekeyboardpicker();evt.preventDefault();evt.stopPropagation();};
		gbox._screen.ontouchend=function(evt) {evt.preventDefault();evt.stopPropagation();};
		gbox._screen.ontouchmove=function(evt) { evt.preventDefault();evt.stopPropagation();};
		gbox._screen.onmousedown=function(evt) {gbox._screenposition=gbox._domgetabsposition(gbox._screen);if (evt.pageY-gbox._screenposition.y<30)  gbox._showkeyboardpicker(); else gbox._hidekeyboardpicker();evt.preventDefault();evt.stopPropagation();};
		
		var d=new Date();
		gbox._sessioncache=d.getDate()+"-"+d.getMonth()+"-"+d.getFullYear()+"-"+d.getHours()+"-"+d.getMinutes()+"-"+d.getSeconds();
		
		gbox._loadsettings(); // Load default configuration
		gbox.setCanAudio(true); // Tries to enable audio by default
	},
	setDoubleBuffering:function(db){this._db=db},
	setStatBar:function(txt){ if (gbox._statbar) this._statbar.innerHTML=(txt?txt:"&nbsp")},
	setFps:function(f){
		this._fps=f;
		this._mspf=Math.floor(1000/f)
	},
	getFps:function() { return this._fps },
	setAutoskip:function(f){this._autoskip=f},
	setFrameskip:function(f){this._frameskip=f},
	getScreenH:function(){return this._screenh},
	getScreenW:function(){return this._screenw},
	getScreenHH:function(){return this._screenhh},
	getScreenHW:function(){return this._screenhw},
	setZoom:function(z) { this._zoom=z},
	// setCallback is deprecated, as cb is now passed directly into loadAll(). Leaving it in for backwards compatibility.
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
	keyIsHit:function(id) { return this._keyboard[this._keymap[id]]==1},
	keyIsPressed:function(id) { return this._keyboard[this._keymap[id]]>0},
	keyIsHold:function(id) { return this._keyboard[this._keymap[id]]>1},
	keyIsReleased:function(id) { return this._keyboard[this._keymap[id]]==-1},
	_savesettings:function() {
		var saved="";
		for (var k in this._keymap) saved+="keymap-"+k+":"+this._keymap[k]+"~";
		for (var f in this._flags) saved+="flag-"+f+":"+(this._flags[f]?1:0)+"~";
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
					case "flag": { this._flags[mk[1]]=kv[1]*1; break }
				}
			}
		}
	},
	dataSave:function(k,v,d) { 
		var date = new Date();
		date.setTime(date.getTime()+((d?d:356*10)*24*60*60*1000));
		document.cookie =this._systemcookie+"~"+k+"="+v+"; expires="+date.toGMTString()+"; path=/";
	},
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
			}
		}
		return null;
	},
	dataClear:function(k) { this.dataSave(k,"",-1) },
	getCamera:function() { return this._camera; },
	setCameraY:function(y,viewdata) {
		this._camera.y=y;
		if (this._camera.y+this._camera.h>viewdata.h) this._camera.y=viewdata.h-this._screenh;
		if (this._camera.y<0) this._camera.y=0;
	},
	setCameraX:function(x,viewdata) {
		this._camera.x=x;
		if (this._camera.x+this._camera.w>viewdata.w) this._camera.x=viewdata.w-this._screenw;
		if (this._camera.x<0) this._camera.x=0;
	},
	centerCamera:function(data,viewdata) {
		this.setCameraX(data.x-this._screenhw,viewdata);
		this.setCameraY(data.y-this._screenhh,viewdata);
	},
	
	

	getGroups:function() { return this._groups; },
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
	setRenderOrder:function(g) { this._renderorder=g; },
	playGroup:function(gid){this._groupplay[gid]=true;},
	stopGroup:function(gid){this._groupplay[gid]=false;},
	toggleGroup:function(gid){this._groupplay[gid]=!this._groupplay[gid];},
	soloGroup:function(gid) {
		for (var i=0;i<this._groups.length;i++)
			if (this._groups[i]==gid) this.playGroup(this._groups[i]); else this.stopGroup(this._groups[i]);
	},
	playAllGroups:function() { for (var i=0;i<this._groups.length;i++) this.playGroup(this._groups[i]); },
	clearGroup:function(group) {
		for (var obj in this._objects[group]) {
			if (this._objects[group][obj].__zt!=null) this._zindex.remove(this._objects[group][obj].__zt);
			delete this._objects[group][obj];
		}
	},
	playGroups:function(gid){for (var i=0;i<gid.length;i++)this.playGroup(gid[i])},
	stopGroups:function(gid){for (var i=0;i<gid.length;i++)this.stopGroup(gid[i])},
	toggleGroups:function(gid){for (var i=0;i<gid.length;i++)this.toggleGroup(gid[i])},
	getObject:function(group,id) {return this._objects[group][id]},
	addFont:function(data) {
		data.tilehh=Math.floor(data.tileh/2);
		data.tilehw=Math.floor(data.tilew/2);
		this._fonts[data.id]=data;
		this._fonts[data.id].firstascii=data.firstletter.charCodeAt(0);
	},
	getFont:function(id) {
		return this._fonts[id];
	},
	trashObject:function(obj) {
		if (!this._garbage[obj.group]) this._garbage[obj.group]={};
		this._garbage[obj.group][obj.id]=1;
		obj.__trashing=true;
	},
	purgeGarbage:function() {
		for (var group in this._garbage)
			for (var id in this._garbage[group]) {
				if (this._objects[group][id].__zt!=null)
					this._zindex.remove(this._objects[group][id].__zt)
				delete this._objects[group][id];
			}
		gbox._garbage={};
	},
	trashGroup:function(group) {
		if (!this._garbage[group]) this._garbage[group]={};
		for (var obj in this._objects[group])
			this._garbage[group][obj]=1;
	},
	objectIsTrash:function(o) { return o.__trashing },
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
	groupIsEmpty:function(gid) { for (var i in this._objects[gid]) return false; return true; },
	createCanvas:function(id,data) {
		this.deleteCanvas(id);
		this._canvas[id]=document.createElement("canvas");
		this._canvas[id].setAttribute('height',(data&&data.h?data.h:this._screenh));
		this._canvas[id].setAttribute('width',(data&&data.w?data.w:this._screenw));
	},
	deleteCanvas:function(id) {
		if (this._canvas[id]) delete this._canvas[id];	
	},
	imageIsLoaded:function(id){ return this._images[id]&&(this._images[id].getAttribute("wasloaded"))&&this._images[id].width },
	getImage:function(id){return this._images[id]},
	getBuffer:function(id){return this.getCanvas("_buffer")},
	getBufferContext:function(id){ return (gbox._fskid>=gbox._frameskip?(this._db?this.getCanvasContext("_buffer"):this._screen.getContext("2d")):null) },
	getCanvas:function(id){return this._canvas[id]},
	getCanvasContext:function(id){return this.getCanvas(id).getContext("2d");},
	addImage:function(id,filename) {
		if (this._images[id])
			if (this._images[id].getAttribute("src_org")==filename)
				return;
			else
				delete this._images[id];
		this._addtoloader({type:"image",id:id,filename:filename});
	},
	deleteImage:function(id) {
		delete this._images[id];
	},
	addTiles:function(t) { 
		t.tilehh=Math.floor(t.tileh/2);
		t.tilehw=Math.floor(t.tilew/2);
		this._tiles[t.id]=t;
	},
	getTiles:function(t) { return this._tiles[t] },
	getFont:function(t){ return this._fonts[t] },
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
	blitTilemap:function(tox,data) {
		if (tox==null) return;
		var ts=this._tiles[data.tileset];
		for (var y=0;y<data.map.length;y++)
			for (var x=0;x<data.map[y].length;x++)
				if (data.map[y][x]!=null) this.blitTile(tox,{tileset:data.tileset,tile:data.map[y][x],dx:x*ts.tilew,dy:y*ts.tilew});
	},
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
	blitClear:function(image,data) {
		if (image==null) return;
		if (data==null) data={x:0,y:0};
		this._implicitsargs(data);
		image.clearRect(data.x,data.y,(data.w==null?image.canvas.width:data.w),(data.h==null?image.canvas.height:data.h));
	},
	blitImageToScreen:function(image) {
		this._screen.getContext("2d").drawImage(image,0,0);
	},
	blitFade:function(tox,data) { 
		if (tox) this.blitRect(tox,{x:0,y:0,w:tox.canvas.width,h:tox.canvas.height,alpha:data.alpha,color:data.color});
	},
	blitRect:function(tox,data) {
		if (tox==null) return;
		tox.save();
		tox.globalAlpha=(data.alpha?data.alpha:1);
		tox.fillStyle = (data.color?data.color:gbox.COLOR_BLACK);
		tox.fillRect(data.x,data.y,data.w,data.h);
		tox.restore();
	},
	collides:function(o1,o2,t) {
		if (!t) t=0;
		return !((o1.y+o1.h-1-t<o2.y+t) || (o1.y+t> o2.y+o2.h-1-t) || (o1.x+o1.w-1-t<o2.x+t) || (o1.x+t>o2.x+o2.w-1-t));
	},
	pixelcollides:function(o1,o2,t) {
		if (!t) t=0;
		return !((o1.y<o2.y+t) || (o1.y> o2.y+o2.h-1-t) || (o1.x<o2.x+t) || (o1.x>o2.x+o2.w-1-t));
	},
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
		cur.removeEventListener('ended', gbox._finalizeaudio,false);
		cur.removeEventListener('timeupdate', gbox._checkprogress,false);
		
		cur.addEventListener('ended', gbox._playbackended,false);
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
		ael.addEventListener('loadedmetadata', gbox._pushaudio,false); // Push locked audio in safari
		if (((gbox._createmode==0)&&(cau.team==0))||(gbox._createmode==1)) {
			if (ael.canPlayType) {
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
			ael.addEventListener('ended',this._finalizeaudio,false);
			if (gbox._audiocompatmode==1)
				setTimeout(gbox._fakecheckprogress,gbox._fakecheckprogressspeed);
			else
				ael.addEventListener('timeupdate',this._checkprogress,false);
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
	getAudioIsSingleChannel:function() { return this._audiocompatmode==2; },
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
			if ((gbox._audiocompatmode!=2)||(def.channel==gbox._singlechannelname)) {
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
		if(this.readyState == 4 && (this.status == 0||this.status == 200)) {
			if (this.responseText) {
				if (!gbox._loaderqueue.getCurrent().call.skipCacheSave)
					gbox._loadercache.add(gbox._loaderqueue.getCurrent().call.file,this.responseText);
				var pack=eval("("+this.responseText+")");
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
					gbox._images[current.id].addEventListener('load', gbox._loaderimageloaded,false);
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
						gbox._xmlhttp=new XMLHttpRequest();
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
			if (gbox._splash.background&&gbox.imageIsLoaded("_splash"))
				gbox.blit(tox,gbox.getImage("_splash"),{w:gbox.getImage("_splash").width,h:gbox.getImage("_splash").height,dx:0,dy:0,dw:gbox.getScreenW(),dh:gbox.getScreenH()});
			if (gbox._splash.minilogo&&gbox.imageIsLoaded("logo")) {
				var dw=gbox.getScreenW()/4;
				var dh=(gbox.getImage("logo").height*dw)/gbox.getImage("logo").width
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
			tox.restore();		
			gbox.setStatBar("Loading... ("+gbox._loaderqueue.getDone()+"/"+gbox._loaderqueue.getTotal()+")");
			setTimeout(gbox._waitforloaded,50);
		} else {
			gbox.deleteImage("_splash");
			gbox.setStatBar();
			gbox._cb();
		}
	},
	clearCache:function() { this._loadercache.clear(); }

};

