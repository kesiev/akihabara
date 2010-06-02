// ---
// Copyright (c) 2010 Francesco Cottone, http://www.kesiev.com/
// ---

/**
 * Fretboard module provides a touchpad for touch-based device (for now, Android and iDevices).
 */
var iphofretboard={
	_swap:false,
	_frets:["a","b","c","left","right"],
	_move:["up","down"],
	_buttons:{up:false,down:false,left:false,right:false,a:false,b:false,c:false},
	_fretw:0,
	_moveh:0,
	_gapx:0,
	_gapy:0,
	_listen:function(e) {
		var nc={up:false,down:false,left:false,right:false,a:false,b:false,c:false};
		var fret;
		for (var i=0;i<e.touches.length;i++) {
			fret=Math.floor((e.touches[i].pageX-iphofretboard._gapx)/iphofretboard._fretw);
			if (fret<iphofretboard._frets.length)			
				nc[iphofretboard._frets[fret]]=true;
			else
				nc[iphofretboard._move[Math.floor((e.touches[i].pageY-iphofretboard._gapy)/iphofretboard._moveh)]]=true;
		}
		this._swap=!this._swap;
		for (var i in nc) {
			if (nc[i]!=iphofretboard._buttons[i])
				if (nc[i]) gbox._keydown({fake:true,keyCode:gbox._keymap[i]});
				else gbox._keyup({fake:true,keyCode:gbox._keymap[i]});
		}
		
		iphofretboard._buttons=nc;
	},
	initialize:function(data) {
		var oElement=document.createElement("img");
		oElement.src=data.bg;		
		oElement.style.margin="auto";
		oElement.style.padding="0px";
		oElement.style.height=data.h+"px";
		oElement.style.width="100%";
		
		gbox._box.appendChild(oElement);

		oElement.ontouchstart=function(evt) { evt.preventDefault();evt.stopPropagation(); iphofretboard._listen(evt) };
		oElement.ontouchend=function(evt) { evt.preventDefault();evt.stopPropagation();iphofretboard._listen(evt) };
		oElement.ontouchmove=function(evt) { evt.preventDefault();evt.stopPropagation();iphofretboard._listen(evt) };

		var sizes=gbox._domgetabsposition(oElement);
		this._gapx=sizes.x;
		this._gapy=sizes.y;
		this._fretw=sizes.w/(this._frets.length+1);
		this._moveh=sizes.h/(this._move.length);
	}
	
}
