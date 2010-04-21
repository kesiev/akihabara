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
		_fonts:{},
		_count:0,
		_countloaded:0,
		_tiles:{},
		_images:{},
		_loaded:function() {
			gbox._countloaded++;	
		},
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
		_safedrawimage:function(tox,img,sx,sy,sw,sh,dx,dy,dw,dh) {
			if (sx<0) { dx-=(dw/sw)*sx;sw+=sx; sx=0; }
			if (sy<0) { dy-=(dh/sh)*sy;sh+=sy; sy=0; }
			if (sx+sw>img.width) { dw=(dw/sw)*(img.width-sx);sw=img.width-sx;}
			if (sy+sh>img.height) { dh=(dh/sh)*(img.height-sy);sh=img.height-sy;}
			if ((sh>0)&&(sw>0)&&(sx<img.width)&&(sy<img.height)) tox.drawImage(img, sx,sy,sw,sh,dx,dy,dw,dh);
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
		setCallback:function(cb) { this._cb=cb; },
		_playobject:function(g,obj,a) {
			if (gbox._objects[g][obj].initialize) {
				gbox._objects[g][obj].initialize(obj);
				delete gbox._objects[g][obj].initialize;
			}
			if (gbox._objects[g][obj][a]) gbox._objects[g][obj][a](obj,a);
		},
		go:function() {
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
				
			gbox._framestart=gbox._mspf-(new Date().getTime()-gbox._framestart);
			if (gbox._autoskip)
				if ((gbox._framestart<gbox._autoskip.lowidle)&&(gbox._frameskip<gbox._autoskip.max)) gbox.setFrameskip(gbox._frameskip+1); else
				if ((gbox._framestart>gbox._autoskip.hiidle)&&(gbox._frameskip>gbox._autoskip.min)) gbox.setFrameskip(gbox._frameskip-1);
			if (gbox._statbar) gbox.debugGetstats();
			this._gametimer=setTimeout(gbox.go,(gbox._framestart<=0?1:gbox._framestart));	
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
			if (this._canvas[id]) delete this._canvas[id];
			this._canvas[id]=document.createElement("canvas");
			this._canvas[id].setAttribute('height',(data&&data.h?data.h:this._screenh));
			this._canvas[id].setAttribute('width',(data&&data.w?data.w:this._screenw));
		},
		getImage:function(id){return this._images[id]},
		getBuffer:function(id){return this.getCanvas("_buffer")},
		getBufferContext:function(id){ return (gbox._fskid>=gbox._frameskip?(this._db?this.getCanvasContext("_buffer"):this._screen.getContext("2d")):null) },
		getCanvas:function(id){return this._canvas[id]},
		getCanvasContext:function(id){return this.getCanvas(id).getContext("2d");},
		addImage:function(id,filename) {
			this._count++;
			this._images[id]=new Image();
			this._images[id].addEventListener('load', this._loaded,false);
			this._images[id].src=filename;
			this._images[id].setAttribute('id',id);
		},
		addTiles:function(t) { 
			t.tilehh=Math.floor(t.tileh/2);
			t.tilehw=Math.floor(t.tilew/2);
			this._tiles[t.id]=t;
		},
		getTiles:function(t) { return this._tiles[t] },
		loadAll:function() {
			if (gbox._count!=gbox._countloaded) {
				gbox.setStatBar("Loading... ("+gbox._count+"/"+gbox._countloaded+")");
				setTimeout(gbox.loadAll,50);
			} else {
				// Calculate half heights
				for (var id in gbox._images) {
					gbox._images[id].hheight=Math.floor(gbox._images[id].height/2);
					gbox._images[id].hwidth=Math.floor(gbox._images[id].width/2);
				}
				gbox.setStatBar();
				gbox._cb();
			}
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
			tox.drawImage(image, data.dx*(data.fliph?-1:1),data.dy*(data.flipv?-1:1));
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
		objectIsVisible:function(obj) { return this.collides(obj,this._camera,0); }
	};
	
