// ---
// Copyright (c) 2010 Francesco Cottone, http://www.kesiev.com/
// ---

/**
 * Trigo module provides some math stuff for moving objects in a 
 * direction or following a round path.
 */
var trigo={
	ANGLE_RIGHT:0,
	ANGLE_DOWN:Math.PI*0.5,
	ANGLE_LEFT:Math.PI,
	ANGLE_UP:Math.PI*1.5555555,
	addAngle:function(a,add) {
		a=(a+add)%(Math.PI*2);
		if (a<0) return (Math.PI*2)+a; else return a;
	},
	getDistance:function(p1,p2) {
		return Math.sqrt(Math.pow(p2.x-p1.x,2)+Math.pow(p2.y-p1.y,2))
	},
	getAngle:function(p1,p2,transl) {
		return this.addAngle(Math.atan2(p2.y-p1.y,p2.x-p1.x),(transl?transl:0));
	},
	translate:function(p1,a,d) {
		p1.x=p1.x+Math.cos(a)*d;
		p1.y=p1.y+Math.sin(a)*d;
	},
	translateX:function(x1,a,d) {
		return x1+Math.cos(a)*d
	},
	translateY:function(y1,a,d) {
		return y1+Math.sin(a)*d;
	}
}
