// ---
// Copyright (c) 2010 Francesco Cottone, http://www.kesiev.com/
// ---

/**
 * @namespace Trigo module provides some math stuff for moving objects in a 
 * direction or following a round path.
 */
var trigo={
	ANGLE_RIGHT:0,
	ANGLE_DOWN:Math.PI*0.5,
	ANGLE_LEFT:Math.PI,
	ANGLE_UP:Math.PI*1.5555555,
 
 /**
 * Adds two angles together (radians).
 * @param {Float} a Base angle.
 * @param {Float} add The angle you're adding to the base angle.
 * @returns The resultant angle, always between 0 and 2*pi.
 */
	addAngle:function(a,add) {
		a=(a+add)%(Math.PI*2);
		if (a<0) return (Math.PI*2)+a; else return a;
	},
  /**
  * Gets the distance between two points.
  * @param {Object} p1 This is an object containing x and y params for the first point.
  * @param {Object} p2 This is an object containing x and y params for the second point.
  * @returns The distance between p1 and p2.
  */
	getDistance:function(p1,p2) {
		return Math.sqrt(Math.pow(p2.x-p1.x,2)+Math.pow(p2.y-p1.y,2))
	},
  
  /**
  * Calculates the angle between two points.
  * @param {Object} p1 This is an object containing x and y params for the first point.
  * @param {Object} p2 This is an object containing x and y params for the second point.
  * @param {Float} transl (Optional) Adds an angle (in radians) to the result. Defaults to 0.
  * @returns The angle between points p1 and p2, plus transl.
  */
	getAngle:function(p1,p2,transl) {
		return this.addAngle(Math.atan2(p2.y-p1.y,p2.x-p1.x),(transl?transl:0));
	},
  
  /**
  * Translates a point by a vector defined by angle and distance. This does not return a value but rather modifies the x and y values of p1.
  * @param {Object} p1 This is an object containing x and y params for the point.
  * @param {Float} a The angle of translation (rad).
  * @param {Float} d The distance of translation.
  */  
	translate:function(p1,a,d) {
		p1.x=p1.x+Math.cos(a)*d;
		p1.y=p1.y+Math.sin(a)*d;
	},
  
  /**
  * Translates an x component of a coordinate by a vector defined by angle and distance. This returns its component translation.
  * @param {Float} x1 This is an x coordinate.
  * @param {Float} a The angle of translation (rad).
  * @param {Float} d The distance of translation.
  */    
	translateX:function(x1,a,d) {
		return x1+Math.cos(a)*d
	},

  /**
  * Translates a y component of a coordinate by a vector defined by angle and distance. This returns its component translation.
  * @param {Float} y1 This is a y coordinate.
  * @param {Float} a The angle of translation (rad).
  * @param {Float} d The distance of translation.
  */    
	translateY:function(y1,a,d) {
		return y1+Math.sin(a)*d;
	}
}
