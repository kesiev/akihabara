// ---
// Copyright (c) 2010 Francesco Cottone, http://www.kesiev.com/
// ---

/**
 * @namespace
 * Toys module provides lots of common routines during the game developing:
 * from effects for screen titles to HUD handling to platform/SHMUP/RPG oriented routines,
 * like jumping characters, Z-Indexed objects, bullets, sparks, staff rolls, bonus screens, dialogues etc.
 */
var toys={

	// CONSTANTS
	NOOP:function(){},
	PUSH_NONE:0,
	PUSH_LEFT:1,
	PUSH_RIGHT:2,
	PUSH_UP:3,
	PUSH_DOWN:4,

	FACES:["up","right","down","left"],
	FACES_ANGLE:[trigo.ANGLE_UP,trigo.ANGLE_RIGHT,trigo.ANGLE_DOWN,trigo.ANGLE_LEFT],
	FACE_UP:0,
	FACE_RIGHT:1,
	FACE_DOWN:2,
	FACE_LEFT:3,

	/**
	* @namespace
	* Top-view RPG specific libraries.
	*/
	topview:{

		/**
		* Checks if an object checks that both objects are on the same Z plane and if so it calls gbox.collides.
		* @param {Object} fr The object which collision is being checked for.
		* <ul>
		* <li>x{Integer}: (required)Objects x position</li>
		* <li>y{Integer}: (required)Objects y position</li>
		* <li>z{Integer}: (required)Objects z position</li>
		* <li>colx{Integer}: (required)The dimension of the collision box along the x axis</li>
		* <li>coly{Integer}: (required)The dimension of the collision box along the y axis</li>
		* <li>colh{Integer}: (required)Collision box height</li>
		* <li>colw{Integer}: (required)Collision box width</li>
		* </ul>
		* @param {Object} to The object that collision is being checked against.
		* <ul>
		* <li>x{Integer}: (required)Objects x position</li>
		* <li>y{Integer}: (required)Objects y position</li>
		* <li>z{Integer}: (required)Objects z position</li>
		* <li>colx{Integer}: (required)Collision x</li>
		* <li>coly{Integer}: (required)Collision y</li>
		* <li>colh{Integer}: (required)Collision box height</li>
		* <li>colw{Integer}: (required)Collision box width</li>
		* </ul>
		* @param {int} t This is the tollerance (or margin for error) on the collide function.
		*/
		collides:function(fr,to,t) { // Special collision. Counts also the Z
			if (Math.abs(fr.z,to.z)<5) return gbox.collides({x:fr.x+fr.colx,y:fr.y+fr.coly,h:fr.colh,w:fr.colw},{x:to.x+to.colx,y:to.y+to.coly,h:to.colh,w:to.colw},t); else return false;
		},

		/**
		* Checks for pixel collisions with an offset to the X and Y of the colidable using colx and coly.
		* @param {Object} fr The object which collision is being tested for.
		* @param {Object} to The object (or point) which collision is being tested against.
		* @param {int} t The tollerance of the collision algorithm.
		*/
		pixelcollides:function(fr,to,t) { // Special collision. Counts also the Z
			return gbox.pixelcollides(fr,{x:to.x+to.colx,y:to.y+to.coly,h:to.colh,w:to.colw},t);
		},

		/**
		* Initializes the game with the variables needed for topview and whatever else you feed in through data.
		* @param {Object} th Passes in the object being initialized.
		* @param {Object} data This is used to pass in everything that's being initiliized. If a value is not in Data then a default value is used instead. This can pass in values which do not have a default.
		* <ul>
		* <li>x{Integer}: x position of the object. (defaults to 0)</li>
		* <li>y{Integer}: y position of the object. (defaults to 0)</li>
		* <li>z{Integer}: z index of the object. (defaults to 0)</li>
		* <li>accx{Integer}: The starting x velociyt of the object. (defaults to 0)</li>
		* <li>accy{Integer}: The starting y velocity of the object. (defaults to 0)</li>
		* <li>accz{Integer}: The starting z velocity of the object. (defaults to 0)</li>
		* <li>frames{Object}: This is stores the animation frames for the objects in a map style structure. An empty map means the default image will display with no animation frames. (defaults to an empty map)</li>
		* <li>shadow: (defaults to null)</li> //incomplete
		* <li>maxacc{Integer}: (defaults to )4</li>
		* <li>controlmaxacc{Integer}: (defaults to 4)</li>
		* <li>responsive: (defaults to 0)</li>
		* <li>weapon: (defaults to 0)</li>
		* <li>camera{Boolean}: (defaults to true)</li>
		* <li>flipv{Boolean}: Notes if the object is flipped vertically(defaults to false)</li>
		* <li>fliph{Boolean}: Notes if the object is flipped horrizontally(defaults to false)</li>
		* <li>facing{Integer}: Stores the facing of the object. This is set with pre-defined Integer values from within Toys.(defaults to toys.FACE_DOWN)</li>
		* <ul>
		* <li>FACE_UP:0,</li>
		* <li>FACE_RIGHT:1,</li>
		* <li>FACE_DOWN:2,</li>
		* <li>FACE_LEFT:3,</li>
		* </ul>
		* <li>flipside{Boolean}: (defaults to true)</li>
		* <li>haspushing{Boolean}: (defaults to false)</li>
		* <li>frame: (default to 0)</li>
		* <li>colh{Integer}: (defaults to gbox.getTiles(th.tileset).tilehh)</li>
		* <li>colw{Integer}: (defaults to gbox.getTiles(th.tileset).tilew)</li>
		* <li>colx{Integer}: (defaults to 0)</li>
		* <li>staticspeed{Integer}: (defaults to 0)</li>
		* <li>nodiagonals{Boolean}: (defaults to false)</li>
		* <li>noreset: (defaults to false)</li>
		* </ul>
		*/
		initialize:function(th,data) {
			help.mergeWithModel(
				th,
				help.mergeWithModel(
					data,
					{
						x:0, y:0,
						z:0,
						accx:0, accy:0, accz:0,
						frames:{},
						shadow:null,
						maxacc:4, controlmaxacc:4,
						responsive:0, // Responsiveness
						weapon:0, // Weapon
						camera:true,
						flipv:false, fliph:false,
						facing:toys.FACE_DOWN,
						flipside:true,
						haspushing:false,
						frame:0,
						colh:gbox.getTiles(th.tileset).tilehh,
						colw:gbox.getTiles(th.tileset).tilew,
						colx:0,
						staticspeed:0,
						nodiagonals:false,
						noreset:false
					}
				)
			);
			if (th.coly==null) th.coly=gbox.getTiles(th.tileset).tileh-th.colh;
			th.colhh=Math.floor(th.colh/2);
			th.colhw=Math.floor(th.colw/2);

			toys.topview.spawn(th);
		},

		/**
		* Spawns a new object in the topview namespace. This also merges parameters in data into paramaters in th using help.copyModel.
    * This initializes some basic basic variables for the object and sets the Z index.
		* @param {Object} th References 'this' which is the object that called the method (generally).
		* <ul>
		* <li>y {Integer}: (required) The object's y position.</li>
		* <li>h {Integer}: (required) The object's height.</li>
		* </ul>
		* @param {Object} data This holds variables to be merged into th's stored info.
		*/
		spawn:function(th,data) {
			th.xpushing=toys.PUSH_NONE; // user is moving side
			th.vpushing=toys.PUSH_NONE; // user is moving side
			th.zpushing=toys.PUSH_NONE; // user is moving side
			th.counter=0; // self counter
			th.hittimer=0;
			th.killed=false;
			help.copyModel(th,data);
			gbox.setZindex(th,th.y+th.h); // these object follows the z-index and uses ZINDEX_LAYER
		},

		/**
		* This sets and runs the control keys for the game.
		* @param {Object} th This is the object that is being controlled by the keys (assumed to be the player)
		* <ul>
		* <li>accx: the object's currect acceleration in the x direction</li>
		* <li>accy: the object's currect acceleration in the y direction</li>
		* <li>responsive: minimum movement speed</li>
		* <li>staticspeed: turns off acceleration</li>
		* <li>nodiagonals: boolean determining if the object can move along both axis at once.</li>
		* <li>xpushing: a boolean that notes whether the object is pushing against something in the x direction.</li>
		* <li>ypushing: a boolean that notes whether the object is pushing against something in the y direction.</li>
		* <li>controlmaxacc: max acceleration for the object along an axis</li>
		* <li>noreset: checks for the object being allowed to reset its pushing status (?)</li>
		* </ul>
		* @param {Object} keys These are the control keys being passed in for left, right, up, and down.
		* //incomplete
		*/
		controlKeys:function(th,keys) {
			var cancelx=false;
			var cancely=false;
			var idlex=false;
			var idley=false;

			if (gbox.keyIsPressed(keys.left)||keys.pressleft) {
				th.xpushing=toys.PUSH_LEFT;
				th.facing=toys.FACE_LEFT;
				if (th.accx>th.responsive) th.accx=th.responsive;
				if (th.staticspeed) th.accx=-th.staticspeed; else th.accx=help.limit(th.accx-1,-th.controlmaxacc,th.controlmaxacc);
				if (th.nodiagonals) { cancely=true; idley=true }
			} else if (gbox.keyIsPressed(keys.right)||keys.pressright) {
				th.xpushing=toys.PUSH_RIGHT;
				th.facing=toys.FACE_RIGHT;
				if (th.accx<-th.responsive) th.accx=-th.responsive;
				if (th.staticspeed) th.accx=th.staticspeed; else th.accx=help.limit(th.accx+1,-th.controlmaxacc,th.controlmaxacc);
				if (th.nodiagonals) { cancely=true; idley=true }
			} else idlex=true;

			if (!cancely&&(gbox.keyIsPressed(keys.up)||keys.pressup)) {
				th.ypushing=toys.PUSH_UP;
				th.facing=toys.FACE_UP;
				if (th.accy>th.responsive) th.accy=th.responsive;
				if (th.staticspeed) th.accy=-th.staticspeed; else th.accy=help.limit(th.accy-1,-th.controlmaxacc,th.controlmaxacc);
				if (th.nodiagonals) { cancelx=true; idlex=true; }
			} else if (!cancely&&(gbox.keyIsPressed(keys.down)||keys.pressdown)) {
				th.ypushing=toys.PUSH_DOWN;
				th.facing=toys.FACE_DOWN;
				if (th.accy<-th.responsive) th.accy=-th.responsive;
				if (th.staticspeed) th.accy=th.staticspeed; else th.accy=help.limit(th.accy+1,-th.controlmaxacc,th.controlmaxacc);
				if (th.nodiagonals) { cancelx=true; idlex=true; }
			} else idley=true;



			 if (idlex) {
				if (cancelx) th.accx=0;
				if (cancelx||!th.noreset) th.xpushing=toys.PUSH_NONE;
			}
			if (idley) {
				if (cancely) th.accy=0;
				if (cancely||!th.noreset) th.ypushing=toys.PUSH_NONE;
			}
		},

		/**
		* Gets the next X position the object is going to move to.
		* @param {Object} th The object being checked.
		* <ul>
		* <li>x: the current x position of the object</li>
		* <li>accx: the object's currect acceleration in the x direction</li>
		* <li>maxacc: the max accleration the object can have (if accx is greater than this then this value is used instead)</li>
		* </ul>
		*/
		getNextX:function(th) { return th.x+help.limit(th.accx,-th.maxacc,th.maxacc); },

		/**
		* Gets the next Y position the object is going to move to.
		* @param {Object} th The object being checked.
		* <ul>
		* <li>y: the current y position of the object</li>
		* <li>accy: the object's currect acceleration in the y direction</li>
		* <li>maxacc: the max accleration the object can have (if accy is greater than this then this value is used instead)</li>
		* </ul>
		*/
		getNextY:function(th) { return th.y+help.limit(th.accy,-th.maxacc,th.maxacc); },

		/**
		* Gets the next Z position the object is going to move to.
		* @param {Object} th The object being checked.
		* <ul>
		* <li>z: the current z position of the object</li>
		* <li>accz: the object's currect acceleration in the z direction</li>
		* <li>maxacc: the max accleration the object can have (if accz is greater than this then this value is used instead)</li>
		* </ul>
		*/
		getNextZ:function(th) { return th.z+help.limit(th.accz,-th.maxacc,th.maxacc); },

		/**
		* Sets the objects current location to its next location using the getNextX and getNextY methods.
		* @param {Object} th The object being modified.
		* <ul>
		* <li>x: the current x position of the object</li>
		* <li>y: the current y position of the object</li>
		* <li>accx: the object's currect acceleration in the x direction</li>
		* <li>accy: the object's currect acceleration in the y direction</li>
		* <li>maxacc: the max accleration the object can have (if either acceleration is greater than this then this value is used instead for that acceleration)</li>
		* </ul>
		*/
		applyForces:function(th) {
			th.x=toys.topview.getNextX(th);
			th.y=toys.topview.getNextY(th);
		},

		/**
		* This applies acceleration in the Z direction (not nessesarily gravity but whatever the next accerlation on the Z axis is)
		* @param {Object} th The object being modified.
		* <ul>
		* <li>z: the current z position of the object</li>
		* <li>accz: the object's currect acceleration in the z direction</li>
		* <li>maxacc: the max accleration the object can have (if accz is greater than this then this value is used instead)</li>
		* </ul>
		*/
		applyGravity:function(th) {
			th.z=toys.topview.getNextZ(th);
		},

		/**
		* Degrades all accelerations on an object by one toward zero.
		* @param {Object} th The object being modified.
		* <ul>
		* <li>xpushing: a boolean that notes whether the object is pushing against something in the x direction.</li>
		* <li>ypushing: a boolean that notes whether the object is pushing against something in the y direction.</li>
		* <li>accx: the object's currect acceleration in the x direction</li>
		* <li>accy: the object's currect acceleration in the y direction</li>
		* </ul>
		*/
		handleAccellerations:function(th) {
			if (!th.xpushing) th.accx=help.goToZero(th.accx);
			if (!th.ypushing) th.accy=help.goToZero(th.accy);

		},

		/**
		* Increases the Z acceleration on the object by one.
		* @param {Object} th The object being modified.
		* <ul>
		* <li>accz: the acceleration on the Z axis</li>
		* </ul>
		*/
		handleGravity:function(th) {
			th.accz++;
		},

		/**
		* This sets which frame the object is going to display based on an agregate word that describes predefined states.
		* @param {Object} th The object whose frame is being set.
		* <ul>
		* <li>xpushing: a boolean that notes whether the object is pushing against something in the x direction.</li>
		* <li>ypushing: a boolean that notes whether the object is pushing against something in the y direction.</li>
		* <li>haspushing: a boolean that notes if the object changes when pushing against something.</li>
		* <li>toucheddown: a boolean that notes if the object is touching something below it on the screen.</li>
		* <li>touchedup: a boolean that notes if the object is touching something above it on the screen.<</li>
		* <li>touchedright: a boolean that notes if the object is touching something right of it on the screen.<</li>
		* <li>touchedleft: a boolean that notes if the object is touching something left of it on the screen.<</li>
		* <li>flipside: </li>
		* <li>fliph: </li>
		* <li>facing: </li>
		* <li>frames: </li>
		* <li>frame: </li>
		* <li>counter: </li>
		* </ul>
		* // incomplete
		*/
		setFrame:function(th) {
			var pref="stand";
			if (th.xpushing||th.ypushing)
				if (th.haspushing&&(th.toucheddown||th.touchedup||th.touchedleft||th.touchedright)) pref="pushing"; else pref="moving";
			if (th.flipside)
				th.fliph=(th.facing==toys.FACE_RIGHT);
			th.frame=help.decideFrame(th.counter,th.frames[pref+toys.FACES[th.facing]]);
		},

		/**
		* Checks if the specified object is colliding with tiles in the map in an area defined by the object's colw and colh variables as well as the tolerance and approximation variables that are passed in through data. Only tiles in the map marked as solid are checked against. The alogrithm checks the
		* @param {Object} th The object that is being checked against the tilemap.
		* @param {Object} map This is the asci map that the tile map is generated from.
		* @param {Object} tilemap This is the array of tile objects that it itterated over checking for collisions.
		* @param {Object} defaulttile The default tile to be returned if nothing can be found. Null can be used here.
		* @param {Object} data Passes is extra dat to the function. Can be set as null.
		* <ul>
		* <li>tolerance{Integer}: This is subtracted from the collision space to get the maximum collision area for the object. This defaults to 6.</li>
		* <li>approximation{Integer}: This is the amount that the checked values are incremented by until they reach the maximum value allowed. This defaults to 10.</li>
		* </ul>
		*/
		tileCollision:function(th,map,tilemap,defaulttile,data) {

			th.touchedup=false;
			th.toucheddown=false;
			th.touchedleft=false;
			th.touchedright=false;

			var tolerance=(data&&(data.tolerance!=null)?data.tolerance:6);
			var approximation=(data&&(data.approximation!=null)?data.approximation:10);
			var t=tolerance-approximation;
			do {
				t+=approximation;
				if (t>th.colw-tolerance-1) t=th.colw-tolerance-1;
				var bottom=help.getTileInMap(th.x+th.colx+t,th.y+th.coly+th.colh-1,map,defaulttile,tilemap);
				var top=help.getTileInMap(th.x+th.colx+t,th.y+th.coly,map,defaulttile,tilemap);
				if (map.tileIsSolid(th,top)) th.touchedup=true;
				if (map.tileIsSolid(th,bottom)) th.toucheddown=true;
			} while (t!=th.colw-tolerance-1);

			t=tolerance-approximation;
			do {
				t+=approximation;
				if (t>th.colh-tolerance-1) t=th.colh-tolerance-1;
				var left=help.getTileInMap(th.x+th.colx,th.y+th.coly+t,map,defaulttile,tilemap);
				var right=help.getTileInMap(th.x+th.colx+th.colw-1,th.y+th.coly+t,map,defaulttile,tilemap);
				if (map.tileIsSolid(th,left)) th.touchedleft=true;
				if (map.tileIsSolid(th,right)) th.touchedright=true;
			} while (t!=th.colh-tolerance-1);

			if (th.touchedup) {
				th.accy=0;
				th.y=help.yPixelToTile(map,th.y+th.coly,1)-th.coly;
			}
			if (th.toucheddown) {
				th.accy=0;
				th.y=help.yPixelToTile(map,th.y+th.coly+th.colh-1)-th.coly-th.colh;
			}
			if (th.touchedleft) {
				th.accx=0;
				th.x=help.xPixelToTile(map,th.x+th.colx,1)-th.colx;
			}
			if (th.touchedright) {
				th.accx=0;
				th.x=help.xPixelToTile(map,th.x+th.colx+th.colw-1)-th.colx-th.colw;
			}

		},

		/**
		* @param {Object} th The object being checked for collisions.
		* <ul>
		* <li></li>
		* <li></li>
		* <li></li>
		* <li></li>
		* </ul>
		* @param {Object} data This is used to pass in other data and arguments.
		* <ul>
		* <li>group {String}: (required) This is the group of objects being checked against.</li>
		* <li></li>
		* <li></li>
		* <li></li>
		* <li></li>
		* </ul> //incomplete
		*/
		spritewallCollision:function(th,data) {
			var wl;
			for (var i in gbox._objects[data.group])
				if ((!gbox._objects[data.group][i].initialize)&&toys.topview.collides(th,gbox._objects[data.group][i])) {
					wl=gbox._objects[data.group][i];
					if (toys.topview.pixelcollides({x:th.x+th.colx,y:th.y+th.coly+th.colhh},wl)) {
						th.touchedleft=true;
						th.accx=0;
						th.x=wl.x+wl.colx+wl.colw-th.colx;
					} else if (toys.topview.pixelcollides({x:th.x+th.colx+th.colw,y:th.y+th.coly+th.colhh},wl)) {
						th.touchedright=true;
						th.accx=0;
						th.x=wl.x+wl.colx-th.colw-th.colx;
					}
					if (toys.topview.pixelcollides({x:th.x+th.colx+th.colhw,y:th.y+th.coly+th.colh},wl)) {
						th.toucheddown=true;
						th.accy=0;
						th.y=wl.y+wl.coly-th.colh-th.coly;
					} else if (toys.topview.pixelcollides({x:th.x+th.colx+th.colhw,y:th.y+th.coly},wl)) {
						th.touchedup=true;
						th.accy=0;
						th.y=wl.y+wl.coly+wl.colh-th.coly;
					}
				}

		},

		/**
		* This checks if the object's z index is 0 which means it has hit the floor. If this has occured it also plays an impact or bounce noise if one is passed in. Note: The area above the floor is in the negative z index space so a value of 1 for z will return that the object has collided with the floor and z will then be set to zero.
		* @param {Object} th The object being checked for collision.
		* <ul>
		* <li>touchedfloor{boolean}: This value is not passed in but is created or set in the function. This contains the function's return value.</li>
		* <li></li>
		* <li></li>
		* <li></li>
		* </ul>
		* @param {Object} data This is used to pass in extra parameters.
		* <ul>
		* <li></li>
		* </ul>
		*/
		floorCollision:function(th,data) {
			th.touchedfloor=false;
			if (th.z>0) {
				th.accz=(data==null?0:-Math.floor(th.accz/data.bounce));
				if (data&&data.audiobounce&&th.accz) gbox.hitAudio(data.audiobounce);
				th.z=0;
				th.touchedfloor=true;
			}
		},

		/**
		*
		*/
		adjustZindex:function(th) {
			gbox.setZindex(th,th.y+th.h);
		},

		/**
		*
		*/
		// Helper: returns the ahead pixel (i.e. destination use action)
		getAheadPixel:function(th,data) {
			switch (th.facing) {
				case toys.FACE_RIGHT:{
					return {x:th.x+th.colx+th.colw+data.distance,y:th.y+th.coly+th.colhh};
					break;
				}
				case toys.FACE_LEFT:{
					return {x:th.x+th.colx-data.distance,y:th.y+th.coly+th.colhh};
					break;
				}
				case toys.FACE_UP:{
					return {x:th.x+th.colx+th.colhw,y:th.y+th.coly-data.distance};
					break;
				}
				case toys.FACE_DOWN:{
					return {x:th.x+th.colx+th.colhw,y:th.y+th.coly+th.colh+data.distance};
					break;
				}
			}
		},

		/**
		*
		*/
		// Helper: trigger a method in colliding objects (i.e. "use action")
		callInColliding:function(th,data) {
			for (var i in gbox._objects[data.group])
				if ((!gbox._objects[data.group][i].initialize)&&toys.topview.pixelcollides(data,gbox._objects[data.group][i]))
					if (gbox._objects[data.group][i][data.call]) {
						gbox._objects[data.group][i][data.call](th);
						return i;
					}
			return false;
		},

		/**
		*
		*/
		// Enemy methods
		wander:function(th,map,tilemap,defaulttile,data) {
			if ((!th.wandercounter)||(th.toucheddown||th.touchedup||th.touchedleft||th.touchedright)) {
				th.wandercounter=help.random(data.minstep,data.steprange);
				th.wanderdirection=help.random(0,4);
			} else th.wandercounter--;
			switch (th.wanderdirection) {
				case toys.FACE_LEFT: {
					th.xpushing=toys.PUSH_LEFT;
					th.ypushing=toys.PUSH_NONE;
					th.facing=toys.FACE_LEFT;
					th.accx=-data.speed;
					th.accy=0;
					break;
				}
				case toys.FACE_RIGHT: {
					th.xpushing=toys.PUSH_RIGHT;
					th.ypushing=toys.PUSH_NONE;
					th.facing=toys.FACE_RIGHT;
					th.accx=data.speed;
					th.accy=0;
					break;
				}
				case toys.FACE_UP: {
					th.ypushing=toys.PUSH_UP;
					th.xpushing=toys.PUSH_NONE;
					th.facing=toys.FACE_UP;
					th.accy=-data.speed;
					th.accx=0;
					break;
				}
				case toys.FACE_DOWN: {
					th.ypushing=toys.PUSH_DOWN;
					th.xpushing=toys.PUSH_NONE;
					th.facing=toys.FACE_DOWN;
					th.accy=data.speed;
					th.accx=0;
					break;
				}
			}
		},

		/**
		*
		*/
		// generators (firebullet specific for topdown - more complex than SHMUP one)
		fireBullet:function(gr,id,data) {

			var ts=gbox.getTiles(data.tileset);


			var obj=gbox.addObject(
				help.mergeWithModel(
					data,{
						_bullet:true,
						zindex:0,
						fliph:false, flipv:false,
						id:id,
						group:gr,
						cnt:0,
						tileset:"",
						frames:{},
						acc:0,
						angle:0,
						camera:data.from.camera,
						accx:(data.accx==null?Math.floor(trigo.translateX(0,data.angle,data.acc)):0),
						accy:(data.accy==null?Math.floor(trigo.translateY(0,data.angle,data.acc)):0),
						accz:0,
						x:(data.sidex==toys.FACE_LEFT?data.from.x-ts.tilehw:(data.sidex==toys.FACE_RIGHT?data.from.x+data.from.w-ts.tilehw:data.from.x+data.from.hw-ts.tilehw))+(data.gapx?data.gapx:0),
						y:(data.sidey==toys.FACE_UP?data.from.y-ts.tilehh:(data.sidey==toys.FACE_DOWN?data.from.y+data.from.h-ts.tilehh:data.from.y+data.from.hh-ts.tilehh))+(data.gapy?data.gapy:0),
						z:(data.from.z==null?0:data.from.z),
						collidegroup:"",
						spark:toys.NOOP,
						power:1,
						lifetime:null,
						tilemap:null,
						defaulttile:0,
						applyzgravity:false,
						map:null,
						defaulttile:0,
						mapindex:"",
						spritewalls:null,
						colx:(data.fullhit?0:null),
						coly:(data.fullhit?0:null),
						colh:(data.fullhit?ts.tileh:null),
						colw:(data.fullhit?ts.tilew:null),
						duration:null,
						onWallHit:function() {
							this.spark(this);
							gbox.trashObject(this);
						},
						bulletIsAlive:function() {
							return gbox.objectIsVisible(this);
						}
					}
				)
			);

			obj.initialize=function() {
				toys.topview.initialize(this);
			};

			obj[(data.logicon==null?"first":data.logicon)]=function() {
				this.cnt=(this.cnt+1)%10;

				if (this.applyzgravity) toys.topview.handleGravity(this); // z-gravity
				toys.topview.applyForces(this); // Apply forces
				if (this.applyzgravity) toys.topview.applyGravity(this); // z-gravity
				if (this.map!=null) toys.topview.tileCollision(this,this.map,this.mapindex,this.defaulttile); // tile collisions
				if (this.spritewalls!=null) toys.topview.spritewallCollision(this,{group:this.spritewalls}); // walls collisions
				if (this.applyzgravity) toys.topview.floorCollision(this); // Collision with the floor (for z-gravity)
				toys.topview.adjustZindex(this);
				if (this.duration!=null) {
					this.duration--;
					if (this.duration==0) gbox.trashObject(this);
				}
				if (!this.bulletIsAlive()) gbox.trashObject(this);
				else if (this.toucheddown||this.touchedup||this.touchedleft||this.touchedright) this.onWallHit();
				else if (this.collidegroup!=null)
					for (var i in gbox._objects[this.collidegroup])
						if ((!gbox._objects[this.collidegroup][i].initialize)&&toys.topview.collides(this,gbox._objects[this.collidegroup][i],gbox._objects[this.collidegroup][i].tolerance)) {
							if (gbox._objects[this.collidegroup][i]["hitByBullet"]!=null)
								if (!gbox._objects[this.collidegroup][i].hitByBullet(this)) {
									this.spark(this);
									gbox.trashObject(this);
								}
						}
			}

			obj[(data.bliton==null?"blit":data.bliton)]=function() {
				if (!gbox.objectIsTrash(this))
					gbox.blitTile(gbox.getBufferContext(),{tileset:this.tileset,tile:help.decideFrame(this.cnt,this.frames),dx:this.x,dy:this.y+this.z,camera:this.camera,fliph:this.fliph,flipv:this.flipv});
			}

			gbox.setZindex(obj,obj.y+obj.h);

			return obj;

		},

		/**
		*
		*/
		makedoor:function(gr,id,map,data) {

			var mts=gbox.getTiles(map.tileset);
			var ts=gbox.getTiles(data.tileset);

			var obj=gbox.addObject(
				help.mergeWithModel(
					data,{
						zindex:0,
						fliph:false, flipv:false,
						id:id,
						group:gr,
						cnt:0,
						tileset:"",
						frames:{},
						camera:true,
						x:data.tilex*mts.tilew,
						y:data.tiley*mts.tileh,
						z:0,
						tilemap:null,
						defaulttile:0,
						map:map,
						colx:(data.fullhit?0:null),
						coly:(data.fullhit?0:null),
						colh:(data.fullhit?ts.tileh:null),
						colw:(data.fullhit?ts.tilew:null),
						opening:false,
						doorheight:ts.tileh,
						opencounter:0,
						opening:false,
						closing:false,
						audiobefore:null,
						audioafter:null,
						doOpen:function() {
							this.opening=true;
						},
						whenClosed:toys.NOOP,
						whenOpened:toys.NOOP,
						whileMoving:toys.NOOP,
						hitByBullet:function(by) {

						}
					}
				)
			);

			// Closing animation
			if (obj.closing) obj.opencounter=obj.doorheight;

			obj.initialize=function() {
				this.ismoving=false;
				toys.topview.initialize(this);
			};

			obj[(data.logicon==null?"first":data.logicon)]=function() {
				if (this.closing) {
					if (!this.ismoving) {
						if (this.audiobefore) gbox.hitAudio(this.audiobefore);
						this.ismoving=true;
					}
					this.whileMoving();
					this.opencounter--;
					if (this.opencounter<0) {
						if (this.audioafter) gbox.hitAudio(this.audioafter);
						this.ismoving=false;
						this.opencounter=0;
						this.closing=false;
						this.whenClosed();
					}
				}
				if (this.opening) {
					if (!this.ismoving) {
						if (this.audiobefore) gbox.hitAudio(this.audiobefore);
						this.ismoving=true;
					}
					this.whileMoving();
					this.opencounter++;
					if (this.opencounter>=this.doorheight) {
						if (this.audioafter) gbox.hitAudio(this.audioafter);
						this.ismoving=false;
						if (!this.whenOpened()) gbox.trashObject(this);
					}
				}
			}

			obj[(data.bliton==null?"blit":data.bliton)]=function() {
				if (!gbox.objectIsTrash(this))
					gbox.blitTile(gbox.getBufferContext(),{tileset:this.tileset,tile:help.decideFrame(this.cnt,this.frames),dx:this.x,dy:this.y+this.z+this.opencounter,h:this.h-this.opencounter,camera:this.camera,fliph:this.fliph,flipv:this.flipv});
			}

			gbox.setZindex(obj,obj.y+obj.h);

			return obj;
		},
		// Set the object speed making sure that the X and Y coords are multiple of the speed. Useful on maze-based games.
		setStaticSpeed:function(th,speed) {
			th.staticspeed=speed;
			th.x=Math.round(th.x/speed)*speed;
			th.y=Math.round(th.y/speed)*speed;
		}
	},


	/**
	* @namespace shmup The libraries for a 2D top-down Shmup game.
	*/
	// Shoot'em up specifics
	shmup:{

		/**
		*
		*/
		initialize:function(th,data) {
			help.mergeWithModel(
				th,
				help.mergeWithModel(
					data,
					{
						x:0, y:0,
						accx:0, accy:0,
						frames:{},
						maxacc:5, controlmaxacc:5,
						responsive:0, // Responsiveness
						bounds:{x:0,y:0,w:gbox.getScreenW(),h:gbox.getScreenH()}, // Bounds box (ship cannot exit from there)
						weapon:0, // Weapon
						hittime:5,
						camera:false,
						flipv:false, fliph:false,
						health:1,
						tolerance:4
					}
				)
			);
			toys.shmup.spawn(th);
		},

		/**
		*
		*/
		spawn:function(th,data) {
			th.xpushing=toys.PUSH_NONE; // user is moving side
			th.vpushing=toys.PUSH_NONE; // user is moving side
			th.counter=0; // self counter
			th.hittimer=0;
			th.killed=false;
			help.copyModel(th,data);
		},

		/**
		*
		*/
		getNextX:function(th) { return th.x+help.limit(th.accx,-th.maxacc,th.maxacc); },

		/**
		*
		*/
		getNextY:function(th) { return th.y+help.limit(th.accy,-th.maxacc,th.maxacc); },

		/**
		*
		*/
		controlKeys:function(th,keys) {

			if (gbox.keyIsPressed(keys.left)) {
				th.xpushing=toys.PUSH_LEFT;
				if (th.accx>th.responsive) th.accx=th.responsive;
				th.accx=help.limit(th.accx-1,-th.controlmaxacc,th.controlmaxacc);
			} else if (gbox.keyIsPressed(keys.right)) {
				th.xpushing=toys.PUSH_RIGHT;
				if (th.accx<-th.responsive) th.accx=-th.responsive;
				th.accx=help.limit(th.accx+1,-th.controlmaxacc,th.controlmaxacc);
			} else th.xpushing=toys.PUSH_NONE;
			if (gbox.keyIsPressed(keys.up)) {
				th.ypushing=toys.PUSH_UP;
				if (th.accy>th.responsive) th.accy=th.responsive;
				th.accy=help.limit(th.accy-1,-th.controlmaxacc,th.controlmaxacc);
			} else if (gbox.keyIsPressed(keys.down)) {
				th.ypushing=toys.PUSH_DOWN;
				if (th.accy<-th.responsive) th.accy=-th.responsive;
				th.accy=help.limit(th.accy+1,-th.controlmaxacc,th.controlmaxacc);
			} else th.ypushing=toys.PUSH_NONE;
		},

		/**
		*
		*/
		applyForces:function(th) {
			th.x=toys.shmup.getNextX(th);
			th.y=toys.shmup.getNextY(th);
		},

		/**
		*
		*/
		handleAccellerations:function(th) {
			if (!th.xpushing) th.accx=help.goToZero(th.accx);
			if (!th.ypushing) th.accy=help.goToZero(th.accy);
		},

		/**
		*
		*/
		keepInBounds:function(th) {
			if (th.x<th.bounds.x) {
				th.x=th.bounds.x;
				th.accx=0;
			} else if (th.x+th.w>th.bounds.x+th.bounds.w) {
				th.x=th.bounds.x+th.bounds.w-th.w;
				th.accx=0;
			}
			if (th.y<th.bounds.y) {
				th.y=th.bounds.y;
				th.accy=0;
			} else if (th.y+th.h>th.bounds.y+th.bounds.h) {
				th.y=th.bounds.y+th.bounds.h-th.h;
				th.accy=0;
			}
		},

		/**
		*
		*/
		setFrame:function(th) {
			if (th.hittimer) th.hittimer--;
			th.frame=help.decideFrame(th.counter,(th.hittimer?th.frames.hit:th.frames.still));
		},

		/**
		*
		*/
		fireBullet:function(gr,id,data) {

			var ts=gbox.getTiles(data.tileset);

			var obj=gbox.addObject(
				help.mergeWithModel(
					data,{
						_bullet:true,
						fliph:false, flipv:false,
						id:id,
						group:gr,
						cnt:0,
						tileset:"",
						frames:{},
						acc:0,
						angle:0,
						camera:false,
						accx:(data.accx==null?Math.floor(trigo.translateX(0,data.angle,data.acc)):0),
						accy:(data.accy==null?Math.floor(trigo.translateY(0,data.angle,data.acc)):0),
						x:data.from.x+data.from.hw-ts.tilehw+(data.gapx?data.gapx:0),
						y:(data.upper?data.from.y-ts.tilehh+(data.gapy?data.gapy:0):data.from.y+data.from.h-ts.tilehh-(data.gapy?data.gapy:0)),
						collidegroup:"",
						spark:toys.NOOP,
						power:1
					}
				)
			);

			obj[(data.logicon==null?"first":data.logicon)]=function() {
				this.x+=this.accx;
				this.y+=this.accy;
				this.cnt=(this.cnt+1)%10;
				if (!gbox.objectIsVisible(this)) gbox.trashObject(this);
				else if (this.collidegroup!=null)
					for (var i in gbox._objects[this.collidegroup])
						if ((!gbox._objects[this.collidegroup][i].initialize)&&gbox.collides(this,gbox._objects[this.collidegroup][i],gbox._objects[this.collidegroup][i].tolerance)) {
							if (gbox._objects[this.collidegroup][i]["hitByBullet"]!=null)
								if (!gbox._objects[this.collidegroup][i].hitByBullet(this)) {
									this.spark(this);
									gbox.trashObject(this);
								}
						}
			}

			obj[(data.bliton==null?"blit":data.bliton)]=function() {
				gbox.blitTile(gbox.getBufferContext(),{tileset:this.tileset,tile:help.decideFrame(this.cnt,this.frames),dx:this.x,dy:this.y,camera:this.camera,fliph:this.side,flipv:this.flipv});
			}

			return obj;

		},

		/**
		*
		*/
		hitByBullet:function(th,by) {
			if (by.power) {
				th.health-=by.power;
				if (th.health<=0) th.kill(by); else  th.hittimer=th.hittime;
			}
		},

		/**
		*
		*/
		generateEnemy:function(gr,id,data,model) {
			help.mergeWithModel(data,model);
			var obj=gbox.addObject(
				help.mergeWithModel(
					data,{
						id:id,
						group:gr,
						cnt:0,
						tileset:"",
						frames:{},
						acc:0,
						angle:0,
						camera:false,
						fliph:false,
						flipv:false,
						accx:(data.accx==null?Math.floor(trigo.translateX(0,data.angle,data.acc)):0),
						accy:(data.accy==null?Math.floor(trigo.translateY(0,data.angle,data.acc)):0),
						x:data.x,
						y:data.y,
						// -- spec
						animationset:"still",
						defaultanimationset:"still",
						hitanimationset:"still",
						hittime:5,
						script:toys.NOOP,
						handler:toys.NOOP,
						scriptline:(data.scriptline==null?-1:data.scriptline-1),
						newline:true,
						waitframes:0,
						doframes:0,
						mode:0,
						line:{},
						dohandler:null,
						ended:false,
						health:1,
						hittimer:0,
						kill:toys.NOOP,
						tolerance:0,
						initialize:null,
						invulnerable:false,
						hitAnimation:function(time) {
							this.hittimer=(time==null?this.hittime:time);
							this.animationset=this.hitanimationset;
						},
						goTo:function(nl) { // Jump to a line
							this.waitframes=0;
							this.doframes=0;
							this.line={};
							this.scriptline=nl-1;
						},
						hitByBullet:function(by) {
							if (!this.invulnerable&&by.power) {
								this.health-=by.power;
								if (this.health<=0) this.kill(this,by); else this.hitAnimation();
							}
						}
					}
				)
			);


			obj[(data.logicon==null?"first":data.logicon)]=function() {
				if (this.initialize!=null)  {
					this.initialize(this);
					this.initialize=null;
				}
				if (!this.ended) {
					if (!this.waitframes&&!this.doframes&&((this.line.waitfor==null)||this.line.waitfor(this))) {
						this.scriptline++;
						this.everycnt=-1;
						if (this.script[this.scriptline]==null)
							this.ended=true;
						else {
							if (this.script[this.scriptline]["goto"]!=null) this.scriptline=this.script[this.scriptline]["goto"];
							this.line=this.script[this.scriptline];
							if (this.line.afterframes!=null)
								this.waitframes=this.line.afterframes;
							if (this.line.forframes!=null)
								this.doframes=this.line.forframes;
							else
								this.doframes=1;
							if (this.line.cleardo)
								this.dohandler=null;
							else if (this.line.doit!=null) {
								this.dohandler={
									actiontimes:0,
									timer:(this.line.doit.every=="keep"?this.dohandler.every:this.line.doit.every),
									every:(this.line.doit.every=="keep"?this.dohandler.every:this.line.doit.every),
									once:(this.line.doit.once=="keep"?this.dohandler.once:this.line.doit.once),
									action:(this.line.doit.action=="keep"?this.dohandler.action:this.line.doit.action),
									render:(this.line.doit.render=="keep"?this.dohandler.render:this.line.doit.render)
								}
							}

						}
					}
					if (!this.waitframes&&this.doframes&&!this.ended) {
						this.doframes--;
						if (this.line.setinvulnerable!=null) this.invulnerable=this.line.setinvulnerable;
						if (this.line.setx!=null) this.x=this.line.setx;
						if (this.line.sety!=null) this.y=this.line.sety;
						if (this.line.addx!=null) this.x+=this.line.addx;
						if (this.line.addy!=null) this.y+=this.line.addy;
						if (this.line.setaccx!=null) this.accx=this.line.setaccx;
						if (this.line.setaccy!=null) this.accy=this.line.setaccy;
						if (this.line.setacc!=null) {
							this.acc=this.line.setacc;
							this.accx=Math.floor(trigo.translateX(0,this.angle,this.acc));
							this.accy=Math.floor(trigo.translateY(0,this.angle,this.acc));
						}
						if (this.line.addaccx!=null) this.accx+=this.line.addaccx;
						if (this.line.addaccy!=null) this.accy+=this.line.addaccy;
						if (this.line.addacc!=null) {
							this.acc+=this.line.addacc;
							this.accx=Math.floor(trigo.translateX(0,this.angle,this.acc));
							this.accy=Math.floor(trigo.translateY(0,this.angle,this.acc));
						}

						if (this.line.setangle!=null) {
							this.angle=this.line.setangle;
							this.accx=Math.floor(trigo.translateX(0,this.angle,this.acc));
							this.accy=Math.floor(trigo.translateY(0,this.angle,this.acc));
						}
						if (this.line.addangle!=null) {
							this.angle+=this.line.addangle;
							this.accx=Math.floor(trigo.translateX(0,this.angle,this.acc));
							this.accy=Math.floor(trigo.translateY(0,this.angle,this.acc));
						}
						if (this.line.everyframe) this.waitframes=this.line.everyframe;

					}
					if (this.waitframes>0) this.waitframes--;
				}
				if (this.dohandler&&(this.dohandler.action!=null)) {
					if (this.dohandler.timer==this.dohandler.every) {
						this.dohandler.action(this,this.dohandler.actiontimes);
						this.dohandler.timer=0;
						this.dohandler.actiontimes++;
					} else if (!this.dohandler.once) this.dohandler.timer++;
				}
				if (this.handler!=null) this.handler(this);

				if (this.hittimer) {
					this.hittimer--;
					if (!this.hittimer) this.animationset=this.defaultanimationset;
				}

				this.x+=this.accx;
				this.y+=this.accy;
				this.cnt=(this.cnt+1)%10;

			}

			obj[(data.bliton==null?"blit":data.bliton)]=function() {
				gbox.blitTile(gbox.getBufferContext(),{tileset:this.tileset,tile:help.decideFrame(this.cnt,this.frames[this.animationset]),dx:this.x,dy:this.y,camera:this.camera,fliph:this.side,flipv:this.flipv});
				if (this.dohandler&&(this.dohandler.render!=null)) this.dohandler.render(this);
			}

			return obj;

		},

		/**
		*
		*/
		generateScroller:function(gr,id,data) {
			var obj=gbox.addObject(
				help.mergeWithModel(
					help.cloneObject(data),{
						id:id, group:gr,
						y:0, x:0,
						stage:{},
						speed:0,
						stop:null, // Remember to set the last stop ever! or the last loop!
						block:-1,
						bly:0,
						lblock:-1,
						lbly:0,
						lget:0,
						tbly:0,
						trb:0,
						maxwidth:0,
						loopstart:null, loopend:null, looprounds:0,
						panspeed:1, panstimer:0, destspeed:0,

						setLoop:function(st,en) {
							this.loopstart=st;
							this.loopend=en;
							this.lget=1;
							this.looprounds=1;
						},

						quitLoop:function() {
							this.setLoop(null,null);
							this.looprounds=0;
						},

						setSpeed:function(s) {
							this.speed=s;
							this.destspeed=s;
						},

						panToSpeed:function(s,pans) {
							this.destspeed=s;
							this.panspeed=pans;
						},

						quitStop:function() {
							this.stop=null;
						},

						setStop:function(s) {
							this.stop=s;
						},

						setX:function(x) {
							if (x<0) this.x=0; else
							if (x+gbox.getScreenW()>this.maxwidth) this.x=this.maxwidth-gbox.getScreenW();
							else this.x=x;
						}

					}
				)
			);

			obj[(data.logicon==null?"first":data.logicon)]=function() {
				if ((this.stop==null)||(this.y<this.stop)) {
					if (this.speed!=this.destspeed) {
						if (this.panstimer) {
							this.panstimer--;
						} else {
							if (this.speed<this.destspeed) this.speed++; else
							if (this.speed>this.destspeed) this.speed--;
							this.panstimer=this.panspeed;
						}
					}
					this.y+=this.speed;
					if ((this.stop!=null)&&(this.y>=this.stop)) this.y=this.stop;
					if ((this.loopend!=null)&&(this.y>this.loopend)) {
						this.y=this.loopstart+(this.y-this.loopend);
						this.looprounds++;
						if (this.lget==1) {
							this.block=0;
							this.bly=0;
							this.lget=2;
						} else {
							this.block=this.lblock;
							this.bly=this.lbly;
						}

					}
				}

				// Cerca il blocco da mostrare
				this.trb=this.block;
				this.tbly=this.bly;
				do {
					this.trb++;
					this.tbly+=gbox.getImage(this.stage[this.trb].image).height;
				} while (this.tbly<this.y);

				this.block=this.trb-1;
				this.bly=this.tbly-gbox.getImage(this.stage[this.trb].image).height;


				if (this.lget==2) {
					this.lblock=this.block;
					this.lbly=this.bly;
					this.lget=3;
				}

			}

			obj[(data.bliton==null?"blit":data.bliton)]=function() {
				var dy=this.tbly-this.y;
				var done=false;
				do {
					if (dy>gbox.getScreenH()) done=true;
					gbox.blitAll(gbox.getBufferContext(),gbox.getImage(this.stage[this.trb].image),{dx:-this.x,dy:gbox.getScreenH()-dy});
					this.trb++;
					dy+=gbox.getImage(this.stage[this.trb].image).height;
				} while (!done);
			}

			return obj;
		}
	},

	/**
	* @namespace platformer The libraries for generating a 2D platformer game.
	*/
	platformer:{

		/**
		*
		*/
		initialize:function(th,data) {
			help.mergeWithModel(
				th,
				help.mergeWithModel(
					data,
					{
						maxaccx:5, maxaccy:10,
						jumpsize:6, jumpaccy:6,
						accx:0, accy:0,
						x:0, y:0,
						frames:{},
						camera:true,
						flipv:false,
						side:false
					}
				)
			);
			toys.platformer.spawn(th);
		},

		/**
		*
		*/
		spawn:function(th,data) {
			th.curjsize=0; // current jump size
			th.counter=0; // self counter
			th.touchedfloor=false; // touched floor
			th.touchedceil=false;
			th.touchedleftwall=false;
			th.touchedrightwall=false;
			th.pushing=toys.PUSH_NONE; // user is moving side
			th.killed=false;
			help.copyModel(th,data);
		},

		/**
		*
		*/
		getNextX:function(th) { return th.x+th.accx; },

		/**
		*
		*/
		getNextY:function(th) { return th.y+help.limit(th.accy,-th.maxaccy,th.maxaccy); },

		/**
		*
		*/
		applyGravity:function(th) {
			th.x=toys.platformer.getNextX(th);
			th.y=toys.platformer.getNextY(th);
		},

		/**
		*
		*/
		horizontalKeys:function(th,keys) {
			if (gbox.keyIsPressed(keys.left)) {
				th.pushing=toys.PUSH_LEFT;
				th.accx=help.limit(th.accx-1,-th.maxaccx,th.maxaccx);
			} else if (gbox.keyIsPressed(keys.right)) {
				th.pushing=toys.PUSH_RIGHT;
				th.accx=help.limit(th.accx+1,-th.maxaccx,th.maxaccx);
			} else th.pushing=toys.PUSH_NONE;
		},

		/**
		*
		*/
		verticalTileCollision:function(th,map,tilemap) {
			var bottom=help.getTileInMap(th.x+(th.w/2),th.y+th.h,map,0,tilemap);
			var top=help.getTileInMap(th.x+(th.w/2),th.y,map,0,tilemap);
			th.touchedfloor=false;
			th.touchedceil=false;

			if (map.tileIsSolidCeil(th,top)) {
				th.accy=0;
				th.y=help.yPixelToTile(map,th.y,1);
				th.touchedceil=true;
			}
			if (map.tileIsSolidFloor(th,bottom)) {
				th.accy=0;
				th.y=help.yPixelToTile(map,th.y+th.h)-th.h;
				th.touchedfloor=true;
			}
		},

		/**
		*
		*/
		horizontalTileCollision:function(th,map,tilemap,precision) {
			var left=0;
			var right=0;
			var t=0;

			th.touchedleftwall=false;
			th.touchedrightwall=false;

			while (t<th.h) {
				left=help.getTileInMap(th.x,th.y+t,map,0,tilemap);
				right=help.getTileInMap(th.x+th.w-1,th.y+t,map,0,tilemap);

				if ((th.accx<0)&&map.tileIsSolidFloor(th,left)) {
					th.accx=0;
					th.x=help.xPixelToTile(map,th.x-1,1);
					th.touchedleftwall=true;
				}
				if ((th.accx>0)&&map.tileIsSolidFloor(th,right)) {
					th.accx=0;
					th.x=help.xPixelToTile(map,th.x+th.w)-th.w;
					th.touchedrightwall=true;
				}
				t+=gbox.getTiles(map.tileset).tileh/(precision?precision:1);
			}
		},

		/**
		* Checks if the passed object is touching the floor and can therefore jump at present.
		* @param th This is the object being checked for jump ability at the time of calling.
		*/
		canJump:function(th) {
			return th.touchedfloor;
		},

		/**
		*
		*/
		jumpKeys:function(th,key) {
			if ((toys.platformer.canJump(th)||(key.doublejump&&(th.accy>=0)))&&gbox.keyIsHit(key.jump)&&(th.curjsize==0)) {
				if (key.audiojump) gbox.hitAudio(key.audiojump);
				th.accy=-th.jumpaccy;
				th.curjsize=th.jumpsize;
				return true;
			} else if (th.curjsize&&gbox.keyIsHold(key.jump)) { // Jump modulation
				th.accy--;
				th.curjsize--;
			} else
				th.curjsize=0;
			return false;
		},

		/**
		*
		*/
		bounce:function(th,data) {
			th.curjsize=0;
			th.accy=-data.jumpsize;
		},

		/**
		*
		*/
		handleAccellerations:function(th) {
			// Gravity
			if (!th.touchedfloor) th.accy++;
			// Attrito
			if (th.pushing==toys.PUSH_NONE) if (th.accx) th.accx=help.goToZero(th.accx);
		},

		/**
		*
		*/
		setSide:function(th) {
			if (th.accx) th.side=th.accx>0;
		},

		/**
		*
		*/
		setFrame:function(th) {
			if (th.touchedfloor)
				if (th.pushing!=toys.PUSH_NONE)
					th.frame=help.decideFrame(th.counter,th.frames.walking);
				else
					th.frame=help.decideFrame(th.counter,th.frames.still);
			else if (th.accy>0)
				th.frame=help.decideFrame(th.counter,th.frames.falling);
			else
				th.frame=help.decideFrame(th.counter,th.frames.jumping);
		},

		/**
		*
		*/
		auto:{
			// Moves on a platform. It tries to do not fall down, if specified.
			// Args: (object,{moveWhileFalling:<moves while not touching the floor>,speed:<movement speed>})
			// Outs: the frame
			goomba:function(th,data) {
				if (data.moveWhileFalling||th.touchedfloor) {
					if (th.side) {
						th.pushing=toys.PUSH_LEFT;
						th.accx=-data.speed;
					} else {
						th.pushing=toys.PUSH_RIGHT;
						th.accx=data.speed;
					}
				} else th.pushing=toys.PUSH_NONE;
			},
			dontFall:function(th,map,tilemap) {
				if (th.accx&&th.touchedfloor) {
					var til;
					if (th.accx>0) til=help.getTileInMap(toys.platformer.getNextX(th)+th.w-1+th.accx,th.y+th.h,map,0,tilemap);
					else til=help.getTileInMap(toys.platformer.getNextX(th),th.y+th.h,map,0,tilemap);
					if (!map.tileIsSolidFloor(th,til)) {
						th.side=!th.side;
						th.accx=0;
					}
				}
			},
			horizontalBounce:function(th) {
				if (th.touchedleftwall||th.touchedrightwall) th.side=!th.side;
			}
		}
	},

	// State-based toys
	// CONSTANTS
	TOY_BUSY:0,
	TOY_DONE:1,
	TOY_IDLE:2,

	// PRIVATE

	// Generical toys method

	/**
	*
	*/
	resetToy:function(th,id) { if (th.toys) delete th.toys[id] },

	/**
	*
	*/
	getToyValue:function(th,id,v,def) { return ((th.toys==null)||(th.toys[id]==null)?def:th.toys[id][v]) },

	/**
	*
	*/
	getToyStatus:function(th,id) { return ((th.toys==null)||(th.toys[id]==null)?toys.TOY_BUSY:th.toys[id].__status) },

	/**
	*
	*/
	_toydone:function(th,id) {
		if (th.toys[id].__status<toys.TOY_IDLE) th.toys[id].__status++;
		return th.toys[id].__status;
	},

	/**
	*
	*/
	_toybusy:function(th,id) {
		th.toys[id].__status=toys.TOY_BUSY;
		return th.toys[id].__status;
	},

	/**
	*
	*/
	_toyfrombool:function(th,id,b) { return (b?toys._toydone(th,id):toys._toybusy(th,id)) },

	/**
	*
	*/
	_maketoy:function(th,id){
		if (!th.toys) th.toys={};
		if (!th.toys[id]) {
			th.toys[id]={__status:toys.TOY_BUSY};
			return true;
		} else return false;
	},

	/**
	* @namespace timer Timer functionality based methods
	*/
	// Pure timers
	timer:{

		/**
		*
		*/
		randomly:function(th,id,data) {
			if (toys._maketoy(th,id)) {
				th.toys[id].time=help.random(data.base,data.range);
			}
			if (th.toys[id].time) {
				th.toys[id].time--;
				return toys._toybusy(th,id);
			} else {
				th.toys[id].time=help.random(data.base,data.range);
				return toys._toydone(th,id);
			}
		},

		/**
		*
		*/
		real:function(th,id,data) {
			if (toys._maketoy(th,id)) {
				th.toys[id].subtimer=gbox.getFps();
				th.toys[id].done=false;
				if (data.countdown)
					th.toys[id].time=data.countdown;
				else
					th.toys[id].time=0;
			}
			th.toys[id].subtimer--;
			if (!th.toys[id].subtimer) {
				th.toys[id].subtimer=gbox.getFps();
				if (data.countdown) {
					if (th.toys[id].time) {
						th.toys[id].time--;
						if (data.audiocritical&&(th.toys[id].time<=data.critical))
							gbox.hitAudio(data.audiocritical);
					} else th.toys[id].done=true;
				} else
					th.toys[id].time++;
			}
			return toys._toyfrombool(th,id,th.toys[id].done);

		},

		/**
		*
		*/
		every:function(th,id,frames){
			if (toys._maketoy(th,id)) th.toys[id].timer=0;
			th.toys[id].timer++;
			if (th.toys[id].timer==frames) {
				th.toys[id].timer=0;
				return toys._toydone(th,id);
			} else return toys._toybusy(th,id)
		},

		/**
		*
		*/
		after:function(th,id,frames) {
			if (toys._maketoy(th,id)) th.toys[id].timer=0;
			if (th.toys[id].timer==frames) return toys._toydone(th,id); else {
				th.toys[id].timer++;
				return toys._toybusy(th,id);
			}
		}
	},

	/**
	*
	*/
	// Logical helpers
	logic: {

		/**
		*
		*/
		once:function(th,id,cond){
			if (toys._maketoy(th,id)) th.toys[id].done=false;
			if (th.toys[id].done) return false; else if (cond) th.toys[id].done=true;
			return cond;
		}
	},

	/**
	*
	*/
	// UI
	ui:{

		/**
		*
		*/
		menu:function(th,id,opt) {
			if (toys._maketoy(th,id)||opt.resetmenu) {
				var fd=gbox.getFont(opt.font);
				th.toys[id].selected=(opt.selected?opt.selected:0);
				th.toys[id].ok=0;
				var w=0;
				for (var i=0;i<opt.items.length;i++)
					if (opt.items[i].length>w) w=opt.items[i].length;
				gbox.createCanvas("menu-"+id,{w:w*fd.tilew,h:opt.items.length*fd.tileh});
				for (var i=0;i<opt.items.length;i++)
					gbox.blitText(gbox.getCanvasContext("menu-"+id),{font:opt.font,text:opt.items[i],dx:0,dy:fd.tileh*i});
				th.toys[id].fh=fd.tileh;
				th.toys[id].fw=fd.tilew;
			}
			if (!th.toys[id].ok) {
				if (gbox.keyIsHit(opt.keys.up)&&(th.toys[id].selected>0)) {
					if (opt.audiooption) gbox.hitAudio(opt.audiooption);
					th.toys[id].selected--;
				} else
				if (gbox.keyIsHit(opt.keys.down)&&(th.toys[id].selected<opt.items.length-1)) {
					if (opt.audiooption) gbox.hitAudio(opt.audiooption);
					th.toys[id].selected++;
				} else
				if (gbox.keyIsHit(opt.keys.ok)) {
					if (opt.audioconfirm) gbox.hitAudio(opt.audioconfirm);
					th.toys[id].ok=1;
				} else
				if (gbox.keyIsHit(opt.keys.cancel)) th.toys[id].ok=-1;
			}
			gbox.blitAll(gbox.getBufferContext(),gbox.getCanvas("menu-"+id),{dx:opt.x+th.toys[id].fw,dy:opt.y,camera:opt.camera});
			if (!(th.toys[id].ok%2)) gbox.blitText(gbox.getBufferContext(),{font:opt.font,text:opt.selector,dx:opt.x,dy:opt.y+th.toys[id].selected*th.toys[id].fh,camera:opt.camera});
			if (th.toys[id].ok) {
				if (th.toys[id].ok>0)
					if (th.toys[id].ok<10) {
						th.toys[id].ok++;
						toys._toybusy(th,id);
					} else return toys._toydone(th,id); // selected > 0
				else return toys._toydone(th,id); // selected == -1
			} else return toys._toybusy(th,id);
		},

		/**
		*
		*/
		// Returns a full customizable object for optimized huds
		hud:function(id) {
			gbox.createCanvas(id);
			return {
				w:{},
				surfaceid:id,

				/**
				*
				*/
				updateWidget:function(i){
					if (!this.w[i].__hidden) {
						if (this.w[i].widget=="label") {
							if (this.w[i].prepad!=null) this.w[i].text=help.prepad(this.w[i].value,this.w[i].prepad,this.w[i].padwith); else
							if (this.w[i].postpad!=null) this.w[i].text=help.postpad(this.w[i].value,this.w[i].postpad,this.w[i].padwith); else
							this.w[i].text=this.w[i].value+"";
							gbox.blitText(gbox.getCanvasContext(this.surfaceid),this.w[i]);
						}
						if (this.w[i].widget=="symbols") {
							var ts=gbox.getTiles(this.w[i].tileset);
							gbox.blitClear(gbox.getCanvasContext(this.surfaceid),{x:this.w[i].dx,y:this.w[i].dy,w:((this.w[i].maxshown-1)*this.w[i].gapx)+ts.tilew,h:((this.w[i].maxshown-1)*this.w[i].gapy)+ts.tileh});
							var cnt=this.w[i].value;
							for (var x=0;x<this.w[i].maxshown;x++) {
								if (cnt>0) {
									gbox.blitTile(gbox.getCanvasContext(this.surfaceid),{tileset:this.w[i].tileset,tile:this.w[i].tiles[(cnt>this.w[i].tiles.length?this.w[i].tiles.length-1:cnt-1)],dx:this.w[i].dx+(x*this.w[i].gapx),dy:this.w[i].dy+(x*this.w[i].gapy),fliph:this.w[i].fliph,flipv:this.w[i].flipv});
								} else
									if (this.w[i].emptytile!=null)
										gbox.blitTile(gbox.getCanvasContext(this.surfaceid),{tileset:this.w[i].tileset,tile:this.w[i].emptytile,dx:this.w[i].dx+(x*this.w[i].gapx),dy:this.w[i].dy+(x*this.w[i].gapy),fliph:this.w[i].fliph,flipv:this.w[i].flipv});
								cnt-=this.w[i].tiles.length;
							}

						}
						if (this.w[i].widget=="stack") {
							var ts=gbox.getTiles(this.w[i].tileset);
							var bw=((this.w[i].maxshown-1)*this.w[i].gapx)+ts.tilew;
							gbox.blitClear(gbox.getCanvasContext(this.surfaceid),{x:this.w[i].dx-(this.w[i].rightalign?bw:0),y:this.w[i].dy,w:bw,h:((this.w[i].maxshown-1)*this.w[i].gapy)+ts.tileh});
							for (var x=0;x<this.w[i].maxshown;x++)
								if (x<this.w[i].value.length)
									gbox.blitTile(gbox.getCanvasContext(this.surfaceid),{tileset:this.w[i].tileset,tile:this.w[i].value[x],dx:(this.w[i].rightalign?this.w[i].dx-ts.tileh-(this.w[i].gapx*x):this.w[i].dx+(x*this.w[i].gapx)),dy:this.w[i].dy+(x*this.w[i].gapy),fliph:this.w[i].fliph,flipv:this.w[i].flipv});
						}
						if (this.w[i].widget=="radio") {
							var ts=gbox.getTiles(this.w[i].tileset);
							gbox.blitClear(gbox.getCanvasContext(this.surfaceid),{x:this.w[i].dx,y:this.w[i].dy,w:ts.tilew,h:ts.tileh});
							gbox.blitTile(gbox.getCanvasContext(this.surfaceid),{tileset:this.w[i].tileset,tile:this.w[i].frames[this.w[i].value],dx:this.w[i].dx,dy:this.w[i].dy,fliph:this.w[i].fliph,flipv:this.w[i].flipv});

						}
						if (this.w[i].widget=="blit") {
							var ts=gbox.getTiles(this.w[i].tileset);
							gbox.blitClear(gbox.getCanvasContext(this.surfaceid),{x:this.w[i].dx,y:this.w[i].dy,w:ts.tilew,h:ts.tileh});
							gbox.blitTile(gbox.getCanvasContext(this.surfaceid),{tileset:this.w[i].tileset,tile:this.w[i].value,dx:this.w[i].dx,dy:this.w[i].dy,fliph:this.w[i].fliph,flipv:this.w[i].flipv});

						}
						if (this.w[i].widget=="bool") {
							var ts=gbox.getTiles(this.w[i].tileset);
							gbox.blitClear(gbox.getCanvasContext(this.surfaceid),{x:this.w[i].dx,y:this.w[i].dy,w:ts.tilew,h:ts.tileh});
							if (this.w[i].value)
								gbox.blitTile(gbox.getCanvasContext(this.surfaceid),{tileset:this.w[i].tileset,tile:this.w[i].frame,dx:this.w[i].dx,dy:this.w[i].dy,fliph:this.w[i].fliph,flipv:this.w[i].flipv});
						}
						if (this.w[i].widget=="gauge") {
							var ts=gbox.getTiles(this.w[i].tileset);
							gbox.blitTile(gbox.getCanvasContext(this.surfaceid),{tileset:this.w[i].tileset,tile:0,dx:this.w[i].dx,dy:this.w[i].dy});
							gbox.blitTile(gbox.getCanvasContext(this.surfaceid),{tileset:this.w[i].tileset,tile:1,dx:this.w[i].dx,dy:this.w[i].dy,w:(this.w[i].value*ts.tilew)/this.w[i].maxvalue});
						}
					}
				},

				/**
				*
				*/
				hideWidgets:function(l) {
					for (var i=0;i<l.length;i++) this.w[l[i]].__hidden=true;
					this.redraw();
				},

				/**
				*
				*/
				showWidgets:function(l) {
					for (var i=0;i<l.length;i++) this.w[l[i]].__hidden=false;
					this.redraw();
				},

				/**
				*
				*/
				getValue:function(w,k) {
					return this.w[w][k];
				},

				/**
				*
				*/
				getNumberValue:function(w,k) {
					return this.w[w][k]*1;
				},

				/**
				*
				*/
				setValue:function(w,k,v) {
					if (this.w[w][k]!=v) {
						if (k=="value") {
							if ((this.w[w].maxvalue!=null)&&(v>this.w[w].maxvalue)) v=this.w[w].maxvalue;
							if ((this.w[w].minvalue!=null)&&(v<this.w[w].minvalue)) v=this.w[w].minvalue;
							if (this.w[w].widget=="radio") v=(v%this.w[w].frames.length);
						}
						this.w[w][k]=v;
						this.updateWidget(w);
					}
				},

				/**
				*
				*/
				pushValue:function(w,k,v) {
					this.w[w][k].push(v);
					this.updateWidget(w);
				},

				/**
				*
				*/
				addValue:function(w,k,v) {
					if (v) this.setValue(w,k,this.w[w][k]+v);
				},

				/**
				*
				*/
				setWidget:function(id,w) {
					this.w[id]=w;
					this.updateWidget(id);
				},

				/**
				*
				*/
				redraw:function() {
					gbox.blitClear(gbox.getCanvasContext(this.surfaceid));
					for (var i in this.w) this.updateWidget(i);
				},

				/**
				*
				*/
				blit:function() {
					gbox.blitAll(gbox.getBufferContext(),gbox.getCanvas(this.surfaceid),{dx:0,dy:0});
				}

			}
		}
	},

	/**
	*
	*/
	fullscreen:{

		/**
		*
		*/
		fadeout:function(th,id,tox,data) {
			if (toys._maketoy(th,id)||data.resetfade) {
				th.toys[id].fade=0;
				if (data.audiofade) th.toys[id].stv=gbox.getAudioVolume(data.audiofade);
				if (data.audiochannelfade) th.toys[id].chv=gbox.getChannelVolume(data.audiochannelfade);
			}
			th.toys[id].fade+=data.fadespeed;
			if (th.toys[id].fade>1) th.toys[id].fade=1;
			data.alpha=th.toys[id].fade;
			gbox.blitFade(tox,data);
			if (data.audiofade) gbox.setAudioVolume(data.audiofade,th.toys[id].stv*(1-data.alpha));
			if (data.audiochannelfade)
				if (data.alpha==1)
					gbox.stopChannel(data.audiochannelfade);
				else
					gbox.setChannelVolume(data.audiochannelfade,th.toys[id].chv*(1-data.alpha));
			return toys._toyfrombool(th,id,th.toys[id].fade==1)
		},

		/**
		*
		*/
		fadein:function(th,id,tox,data) {
			if (toys._maketoy(th,id)||data.resetfade) {
				th.toys[id].fade=1;
				if (data.audiofade) th.toys[id].stv=gbox.getAudioVolume(data.audiofade);
				if (data.audiochannelfade) th.toys[id].chv=gbox.getChannelDefaultVolume(data.audiochannelfade);
			}
			th.toys[id].fade-=data.fadespeed;
			if (th.toys[id].fade<0) th.toys[id].fade=0;
			if (th.toys[id].fade) {
				data.alpha=th.toys[id].fade;
				if (data.audiofade) gbox.setAudioVolume(data.audiofade,th.toys[id].stv*(1-data.alpha));
				if (data.audiochannelfade) gbox.setChannelVolume(data.audiochannelfade,th.toys[id].chv*(1-data.alpha));
				gbox.blitFade(tox,data);
			}
			return toys._toyfrombool(th,id,th.toys[id].fade==0);
		}
	},

	/**
	*
	*/
	text:{

		/**
		*
		*/
		blink:function(th,id,tox,data) {
			if (toys._maketoy(th,id)) {
				th.toys[id].texttimer=0;
				th.toys[id].visible=false;
				th.toys[id].times=0;
			}
			if (th.toys[id].texttimer>=data.blinkspeed) {
				th.toys[id].texttimer=0;
				th.toys[id].visible=!th.toys[id].visible;
				if (data.times) th.toys[id].times++;
			} else th.toys[id].texttimer++;
			if (th.toys[id].visible)
				gbox.blitText(tox,data);
			return toys._toyfrombool(th,id,(data.times?data.times<th.toys[id].times:false));
		},

		/**
		*
		*/
		fixed:function(th,id,tox,data) {
			if (toys._maketoy(th,id))
				th.toys[id].texttimer=0;
			else
				th.toys[id].texttimer++;
			gbox.blitText(tox,data);
			return toys._toyfrombool(th,id,data.time<th.toys[id].texttimer);
		}
	},

	/**
	*
	*/
	logos:{

		/**
		*
		*/
		linear:function(th,id,data) {
			if (toys._maketoy(th,id)) {
				th.toys[id].x=data.sx;
				th.toys[id].y=data.sy;
				th.toys[id].every=data.every;
				th.toys[id].played=false;
			}
			if (!th.toys[id].every) {
				if ((data.x!=th.toys[id].x)||(data.y!=th.toys[id].y))
					if ((Math.abs(data.x-th.toys[id].x)<=data.speed)&&(Math.abs(data.y-th.toys[id].y)<=data.speed)) {
						th.toys[id].x=data.x;
						th.toys[id].y=data.y;
					} else
						trigo.translate(th.toys[id],trigo.getAngle(th.toys[id],data),data.speed);
				else
					if (!th.toys[id].played) {
						if (data.audioreach) gbox.hitAudio(data.audioreach);
						th.toys[id].played=true;
					}
				th.toys[id].every=data.every;
			} else th.toys[id].every--;
			if (data.text)
				gbox.blitText(gbox.getBufferContext(),{
					font:data.font,
					dx:th.toys[id].x,dy:th.toys[id].y,
					text:data.text
				});
			else if (data.tileset)
				gbox.blitTile(gbox.getBufferContext(),{tileset:data.tileset,tile:data.tile,dx:th.toys[id].x,dy:th.toys[id].y,camera:data.camera,fliph:data.fliph,flipv:data.flipv,alpha:data.alpha});
			else
				gbox.blitAll(gbox.getBufferContext(),gbox.getImage(data.image),{dx:th.toys[id].x,dy:th.toys[id].y,alpha:data.alpha});
			return toys._toyfrombool(th,id,(data.x==th.toys[id].x)&&(data.y==th.toys[id].y));
		},

		/**
		*
		*/
		crossed:function(th,id,data) {
			if (toys._maketoy(th,id)) {
				th.toys[id].gapx=data.gapx;
				th.toys[id].lw=gbox.getImage(data.image).height;
				th.toys[id].done=false;
			}
			if (th.toys[id].gapx) {
				th.toys[id].gapx-=data.speed;
				if (th.toys[id].gapx<0) th.toys[id].gapx=0;
				gbox.blitAll(gbox.getBufferContext(),gbox.getImage(data.image),{dx:data.x-th.toys[id].gapx,dy:data.y,alpha:data.alpha});
				gbox.blitAll(gbox.getBufferContext(),gbox.getImage(data.image),{dx:data.x+th.toys[id].gapx,dy:data.y,alpha:data.alpha});
				return toys._toybusy(th,id);
			} else {
				if (!th.toys[id].done) {
					th.toys[id].done=true;
					if (data.audioreach) gbox.hitAudio(data.audioreach);
				}
				gbox.blitAll(gbox.getBufferContext(),gbox.getImage(data.image),{dx:data.x,dy:data.y});
				return toys._toydone(th,id);
			}
		},

		/**
		*
		*/
		zoomout:function(th,id,data) {
			if (toys._maketoy(th,id)) {
				th.toys[id].zoom=data.zoom;
				th.toys[id].done=false;
				th.toys[id].img=gbox.getImage(data.image);
			}
			if (th.toys[id].zoom!=1) {
				th.toys[id].zoom-=data.speed;
				if (th.toys[id].zoom<=1) {
					th.toys[id].zoom=1;
					if (data.audioreach) gbox.hitAudio(data.audioreach);
				}
				gbox.blit(gbox.getBufferContext(),gbox.getImage(data.image),{h:th.toys[id].img.height,w:th.toys[id].img.width,dx:data.x-Math.floor(th.toys[id].img.width*(th.toys[id].zoom-1)/2),dy:data.y-Math.floor(th.toys[id].img.height*(th.toys[id].zoom-1)/2),dh:Math.floor(th.toys[id].img.height*th.toys[id].zoom),dw:Math.floor(th.toys[id].img.width*th.toys[id].zoom),alpha:1/th.toys[id].zoom});
				return toys._toybusy(th,id);
			} else {
				gbox.blitAll(gbox.getBufferContext(),gbox.getImage(data.image),{dx:data.x,dy:data.y});
				return toys._toydone(th,id);
			}
		},

		/**
		*
		*/
		rising:function(th,id,data) {
			if (toys._maketoy(th,id)) {
				th.toys[id].cnt=0;
				th.toys[id].lh=gbox.getImage(data.image).height;
				th.toys[id].lw=gbox.getImage(data.image).width;
				th.toys[id].done=false;
			}
			if (th.toys[id].cnt<th.toys[id].lh) {
				th.toys[id].cnt+=data.speed;
				if (th.toys[id].cnt>th.toys[id].lh) th.toys[id].gapx=th.toys[id].lh;
				gbox.blit(gbox.getBufferContext(),gbox.getImage(data.image),{dh:th.toys[id].cnt,dw:th.toys[id].lw,dx:data.x,dy:data.y+th.toys[id].lh-th.toys[id].cnt,alpha:data.alpha});
				if (data.reflex) gbox.blit(gbox.getBufferContext(),gbox.getImage(data.image),{dh:th.toys[id].cnt,dw:th.toys[id].lw,dx:data.x,dy:data.y+th.toys[id].lh,alpha:data.reflex,flipv:true});
				if (th.toys[id].cnt>=th.toys[id].lh)
					if (data.audioreach) gbox.hitAudio(data.audioreach);
				return toys._toybusy(th,id);
			} else {
				gbox.blitAll(gbox.getBufferContext(),gbox.getImage(data.image),{dx:data.x,dy:data.y});
				if (data.reflex) gbox.blitAll(gbox.getBufferContext(),gbox.getImage(data.image),{dx:data.x,dy:data.y+th.toys[id].lh,alpha:data.reflex,flipv:true});

				return toys._toydone(th,id);
			}
		},

		/**
		*
		*/
		bounce:function(th,id,data) {
			if (toys._maketoy(th,id)) {
				th.toys[id].accy=data.accy;
				th.toys[id].y=data.y;
				th.toys[id].h=gbox.getImage(data.image).height;
				th.toys[id].done=false;
			}
			if (!th.toys[id].done) {
				if (th.toys[id].y+th.toys[id].h>=data.floory) {
					if (data.audiobounce) gbox.hitAudio(data.audiobounce);
					th.toys[id].y=data.floory-th.toys[id].h;
					th.toys[id].accy=-Math.ceil(th.toys[id].accy/(data.heavy?data.heavy:2));
					th.toys[id].done=(th.toys[id].accy==0);
				} else th.toys[id].accy--;
				th.toys[id].y-=th.toys[id].accy;
			}
			gbox.blitAll(gbox.getBufferContext(),gbox.getImage(data.image),{dx:data.x,dy:th.toys[id].y});

			return toys._toyfrombool(th,id,th.toys[id].done);
		}
	},

	/**
	*
	*/
	dialogue: {

		/**
		*
		*/
		render:function(th,id,data){
			if (toys._maketoy(th,id)) {
				th.toys[id].newscene=true;
				th.toys[id].sceneid=-1;
				th.toys[id].ended=false;
				th.toys[id].timer=0;
				th.toys[id].counter=0;
				th.toys[id].anim=0;
				gbox.createCanvas("dialogue-"+id);
			}
			if (!data.hideonend||(data.hideonend&&!th.toys[id].ended)) {
				if (th.toys[id].newscene&&!th.toys[id].ended) {
					th.toys[id].anim=0;
					th.toys[id].timer=0;
					th.toys[id].newscene=false;
					th.toys[id].sceneid++;
					th.toys[id].ended=(th.toys[id].sceneid==data.scenes.length);
					if (!th.toys[id].ended) {
						th.toys[id].letter=0;
						th.toys[id].wait=false;
						th.toys[id].scene=data.scenes[th.toys[id].sceneid];
						th.toys[id].fd=gbox.getFont((th.toys[id].scene.font?th.toys[id].scene.font:data.font));
						th.toys[id].sceneH=(th.toys[id].scene.dh?th.toys[id].scene.dh:gbox.getScreenH());
						th.toys[id].sceneW=(th.toys[id].scene.dw?th.toys[id].scene.dw:gbox.getScreenW());
						th.toys[id].sceneX=(th.toys[id].scene.dx?th.toys[id].scene.dx:0);
						th.toys[id].sceneY=(th.toys[id].scene.dy?th.toys[id].scene.dy:0);
						gbox.blitClear(gbox.getCanvasContext("dialogue-"+id));
						if (th.toys[id].scene.slide) {
							gbox.blitAll(gbox.getCanvasContext("dialogue-"+id),gbox.getImage(th.toys[id].scene.slide.image),{dx:th.toys[id].scene.slide.x,dy:th.toys[id].scene.slide.y});
						}
						if (th.toys[id].scene.scroller) {
							gbox.createCanvas("scroller-"+id,{w:th.toys[id].sceneW,h:(th.toys[id].scene.scroller.length)*(th.toys[id].fd.tileh+th.toys[id].scene.spacing)});
							for (var i=0;i<th.toys[id].scene.scroller.length;i++)
								gbox.blitText(gbox.getCanvasContext("scroller-"+id),{
										font:th.toys[id].fd.id,
										dx:0,
										dy:i*(th.toys[id].fd.tileh+th.toys[id].scene.spacing),
										dw:th.toys[id].sceneW,
										halign:gbox.ALIGN_CENTER,
										text:th.toys[id].scene.scroller[i]
									});
						}
						if (th.toys[id].scene.bonus) {
							gbox.createCanvas("bonus-"+id,{w:th.toys[id].sceneW,h:(th.toys[id].scene.bonus.length)*(th.toys[id].fd.tileh+th.toys[id].scene.spacing)});
						}
						if (th.toys[id].scene.audiomusic) gbox.hitAudio(th.toys[id].scene.audiomusic);
					}
				}
				if (!th.toys[id].ended) {
					if (th.toys[id].wait) {
						if (gbox.keyIsHit(data.esckey)) th.toys[id].ended=true; else
						if (gbox.keyIsHit(data.skipkey)) th.toys[id].newscene=true;
					} else {

						// SKIP KEYS

						if (gbox.keyIsHit(data.esckey)) th.toys[id].ended=true; else
						if (gbox.keyIsHold(data.skipkey)) th.toys[id].counter=th.toys[id].scene.speed;
						else th.toys[id].counter++;

						// MOVING

						if (th.toys[id].scene.talk) { // DIALOGUES


							if (th.toys[id].counter==th.toys[id].scene.speed) {
								th.toys[id].letter++;
								th.toys[id].counter=0;
								if (th.toys[id].scene.audio&&!(th.toys[id].letter%3)) gbox.hitAudio(th.toys[id].scene.audio);
								var tmp=th.toys[id].letter;
								var row=0;
								while (tmp>th.toys[id].scene.talk[row].length) {
									tmp-=th.toys[id].scene.talk[row].length;
									row++;
									if (row==th.toys[id].scene.talk.length)  {
										row=-1;
										break;
									}
								}
								if (row>=0) {
									gbox.blitText(gbox.getCanvasContext("dialogue-"+id),{
										font:data.font,
										dx:data.who[th.toys[id].scene.who].x,
										dy:(data.who[th.toys[id].scene.who].y)+(row*th.toys[id].fd.tileh),
										text:th.toys[id].scene.talk[row].substr(0,tmp)
									});
								} else
									th.toys[id].wait=true;
							}

						} else if (th.toys[id].scene.scroller) { // SCROLLER (i.e. credits)

							if (th.toys[id].counter==th.toys[id].scene.speed) {
								th.toys[id].letter++;
								th.toys[id].counter=0;
								if (th.toys[id].letter==(gbox.getCanvas("scroller-"+id).height+th.toys[id].scene.push))
									th.toys[id].wait=true;
							}

						} else if (th.toys[id].scene.bonus) { // BONUS (classic bonus award screen)
							for (var row=0;row<=th.toys[id].letter;row++) {
								if (th.toys[id].scene.bonus[row].text)
									gbox.blitText(gbox.getCanvasContext("bonus-"+id),{
										font:data.font,
										dx:0,
										dy:(row*(th.toys[id].fd.tileh+th.toys[id].scene.spacing)),
										text:th.toys[id].scene.bonus[row].text
									});
								else if (th.toys[id].scene.bonus[row].mul) {
									// Mask is %VAL%e%MUL%=%TOT%
									th.toys[id].scene.bonus[row].tmptext=th.toys[id].scene.bonus[row].mask.replace(/%VAL%/,th.toys[id].timer).replace(/%MUL%/,th.toys[id].scene.bonus[row].mul).replace(/%TOT%/,(th.toys[id].timer*th.toys[id].scene.bonus[row].mul));
									gbox.blitText(gbox.getCanvasContext("bonus-"+id),{
										clear:true,
										font:data.font,
										dx:0,
										dy:(row*(th.toys[id].fd.tileh+th.toys[id].scene.spacing)),
										text:th.toys[id].scene.bonus[row].tmptext
									});
								}
							}

							if (!th.toys[id].wait) {
								var next=false;
								if (th.toys[id].scene.bonus[th.toys[id].letter].mul&&!th.toys[id].scene.bonus[th.toys[id].letter].text) {
									if (th.toys[id].counter>=th.toys[id].scene.bonus[th.toys[id].letter].speed) {
										th.toys[id].counter=0;
										th.toys[id].timer++;
										if (th.toys[id].timer>th.toys[id].scene.bonus[th.toys[id].letter].mulvalue) {
											th.toys[id].scene.bonus[th.toys[id].letter].text=th.toys[id].scene.bonus[th.toys[id].letter].tmptext;
											next=true;
										} else {
											if (th.toys[id].scene.bonus[th.toys[id].letter].callback)
												th.toys[id].scene.bonus[th.toys[id].letter].callback(th.toys[id].scene.bonus[th.toys[id].letter],th.toys[id].scene.bonus[th.toys[id].letter].arg);
										}
									}

								} else if (th.toys[id].counter>=th.toys[id].scene.speed) next=true;
								if (next) {
									if (th.toys[id].letter==th.toys[id].scene.bonus.length-1)
										th.toys[id].wait=true;
									else {
										th.toys[id].letter++;
										if (th.toys[id].scene.bonus[th.toys[id].letter].mul) {
											th.toys[id].scene.bonus[th.toys[id].letter].text=null;
											th.toys[id].scene.bonus[th.toys[id].letter].tmptext=null;
											th.toys[id].timer=0;
										}
										th.toys[id].counter=0;
									}
								}
							}
						}

					}

				}

				// RENDERING


				if (th.toys[id].scene.talk) { // DIALOGUES
					if (data.who[th.toys[id].scene.who].box)
							gbox.blitRect(gbox.getBufferContext(),data.who[th.toys[id].scene.who].box);
					if (data.who[th.toys[id].scene.who].tileset) {
						th.toys[id].anim=(th.toys[id].anim+1)%20;
						gbox.blitTile(gbox.getBufferContext(),{tileset:data.who[th.toys[id].scene.who].tileset,tile:help.decideFrame(th.toys[id].anim,data.who[th.toys[id].scene.who].frames),dx:data.who[th.toys[id].scene.who].portraitx,dy:data.who[th.toys[id].scene.who].portraity,camera:false,fliph:data.who[th.toys[id].scene.who].fliph,flipv:data.who[th.toys[id].scene.who].flipv});
					}
					gbox.blitAll(gbox.getBufferContext(),gbox.getCanvas("dialogue-"+id),{dx:0,dy:0});
				} else if (th.toys[id].scene.scroller) // SCROLLER (i.e. credits)
					gbox.blit(gbox.getBufferContext(),gbox.getCanvas("scroller-"+id),{dx:th.toys[id].sceneX,dy:th.toys[id].sceneY+(th.toys[id].letter<th.toys[id].sceneH?th.toys[id].sceneH-th.toys[id].letter:0),dw:th.toys[id].sceneW,y:(th.toys[id].letter<th.toys[id].sceneH?0:th.toys[id].letter-th.toys[id].sceneH),dh:(th.toys[id].letter<th.toys[id].sceneH?th.toys[id].letter:th.toys[id].sceneH)});
				else if (th.toys[id].scene.bonus) // BONUS (i.e. credits)
					gbox.blitAll(gbox.getBufferContext(),gbox.getCanvas("bonus-"+id),{dx:th.toys[id].sceneX,dy:th.toys[id].sceneY});
			}
			return toys._toyfrombool(th,id,th.toys[id].ended);
		}
	},

	// GENERATORS


	/**
	*
	*/
	generate: {

		/**
		*
		*/
		sparks:{
			simple:function(th,group,id,data) {
				var ts=gbox.getTiles(data.tileset);
				if (data.frames==null) {
					data.frames={ speed:(data.animspeed==null?1:data.animspeed), frames:[]};
					for (var i=0;i<ts.tilerow;i++) data.frames.frames[i]=i;
				}

				var obj=gbox.addObject(
					help.mergeWithModel(
						data,{
							id:id,
							group:group,
							x:th.x+th.hw-ts.tilehw+(data.gapx==null?0:data.gapx),
							y:(data.valign=="top"?th.y:th.y+th.hh-ts.tilehh+(data.gapy==null?0:data.gapy)),
							tileset:data.tileset,
							alpha:null,
							accx:0, accy:0,
							frame:0,
							timer:(data.delay?-data.delay:-1),
							frames:data.frames,
							toptimer:((data.frames.frames.length)*data.frames.speed)-1,
							camera:th.camera,
							gravity:false,
							trashoffscreen:true,
							fliph:(data.fliph==null?th.fliph:data.fliph), flipv:(data.flipv==null?th.flipv:data.flipv),
							blinkspeed:0
						}
					)
				);

				obj[(data.logicon==null?"first":data.logicon)]=function() {
					this.timer++;
					if (this.timer>=0) {
						this.x+=this.accx;
						this.y+=this.accy;
						if (this.gravity) this.accy++;
						if ((this.timer==this.toptimer)||(this.trashoffscreen&&(!gbox.objectIsVisible(this)))) gbox.trashObject(this);
					}
				}

				obj[(data.bliton==null?"blit":data.bliton)]=function() {
					if ((this.timer>=0)&&(!this.blinkspeed||(Math.floor(this.timer/this.blinkspeed)%2)))
						gbox.blitTile(gbox.getBufferContext(),{tileset:this.tileset,tile:help.decideFrame(this.timer,this.frames),dx:this.x,dy:this.y,camera:this.camera,fliph:this.fliph,flipv:this.flipv,alpha:this.alpha});
				}

				return obj;
			},

			/**
			*
			*/
			popupText:function(th,group,id,data) {
				data.text+="";
				var fd=gbox.getFont(data.font);

				var obj=gbox.addObject(
					help.mergeWithModel(
						data,{
							id:id,
							group:group,
							x:Math.floor(th.x+th.hw-(fd.tilehw*data.text.length)),
							y:th.y-fd.tilehh,
							vaccy:-data.jump,
							font:"small",
							keep:0,
							text:data.text+"",
							cnt:0,
							camera:th.camera
						}
					)
				);

				obj.initialize=function() {
					var fd=gbox.getFont(this.font);
					gbox.createCanvas("poptext-"+this.id,{w:this.text.length*fd.tilew,h:fd.tileh});
					gbox.blitText(gbox.getCanvasContext("poptext-"+this.id),{font:this.font,text:this.text,dx:0,dy:0});
				}

				obj.onpurge=function() {
					gbox.deleteCanvas("poptext-"+this.id);
				}

				obj[(data.logicon==null?"first":data.logicon)]=function() {
					if (gbox.objectIsVisible(this)) {
						if (this.vaccy)
							this.vaccy++;
						else
							this.cnt++;
						this.y+=this.vaccy;
						if (this.cnt>=this.keep) gbox.trashObject(this);
					} else gbox.trashObject(this);
				}

				obj[(data.bliton==null?"blit":data.bliton)]=function() {
					gbox.blitAll(gbox.getBufferContext(),gbox.getCanvas("poptext-"+this.id),{dx:this.x,dy:this.y,camera:this.camera});
				}

				return obj;
			},

			/**
			*
			*/
			bounceDie:function(th,group,id,data){
				var obj=gbox.addObject(
					help.mergeWithModel(
						data,{
							id:id,
							group:group,
							tileset:th.tileset,
							frame:th.frame,
							side:th.side,
							frames:th.frames.die,
							x:th.x,
							y:th.y,
							vaccy:-data.jump,
							accx:0,
							flipv:data.flipv,
							cnt:0,
							blinkspeed:0,
							camera:th.camera
						}
					)
				);

				obj[(data.logicon==null?"first":data.logicon)]=function() {
					if (gbox.objectIsVisible(this)) {
						this.vaccy++;
						this.y+=this.vaccy;
						this.x+=this.accx;
						this.cnt++;
					} else gbox.trashObject(this);
				}

				obj[(data.bliton==null?"blit":data.bliton)]=function() {
					if (!this.blinkspeed||(Math.floor(this.cnt/this.blinkspeed)%2))
						gbox.blitTile(gbox.getBufferContext(),{tileset:this.tileset,tile:help.decideFrame(this.cnt,this.frames),dx:this.x,dy:this.y,camera:this.camera,fliph:this.side,flipv:this.flipv});
				}

				return obj;
			}
		},

		/**
		*
		*/
		audio:{

			/**
			*
			*/
			fadeOut:function(th,group,id,data){
				var obj=gbox.addObject(
					help.mergeWithModel(
						data,{
							id:id,
							group:group,
							fadespeed:-0.02*(data.fadein?-1:1),
							stoponmute:true,
							audio:null,
							channel:null,
							destination:null
						}
					)
				);

				obj[(data.logicon==null?"first":data.logicon)]=function() {
					if (this.destination==null)
						if (this.audio)
							if (this.fadespeed>0) this.destination=1; else this.destination=0;
						else
							if (this.fadespeed>0) this.destination=gbox.getChannelDefaultVolume(this.channel); else this.destination=0;
					if (this.fadespeed>0) gbox.playAudio(this.audio);
				}

				obj[(data.bliton==null?"blit":data.bliton)]=function() {
					if (this.audio) gbox.changeAudioVolume(this.audio,this.fadespeed);
					if (this.channel) gbox.changeChannelVolume(this.channel,this.fadespeed);
					if (
						(this.audio&&(
							((this.fadespeed<0)&&(gbox.getAudioVolume(this.audio)<=this.destination))||
							((this.fadespeed>0)&&(gbox.getAudioVolume(this.audio)>=this.destination))
					   ))||
						(this.channel&&(
							((this.fadespeed<0)&&(gbox.getChannelVolume(this.channel)<=this.destination))||
							((this.fadespeed>0)&&(gbox.getChannelVolume(this.channel)>=this.destination))
					   ))
					) {
						if (this.channel&&this.stoponmute&&(this.fadespeed<0)) gbox.stopChannel(this.channel);
						if (this.audio&&this.stoponmute&&(this.fadespeed<0)) gbox.stopAudio(this.audio);
						gbox.trashObject(this);
					}
				}
			}

		}

	}
}

