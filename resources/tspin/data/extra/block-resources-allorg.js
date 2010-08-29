
block.staffrolls={
		classic:{ font:"small-blue", speed:2, spacing:2,
				text:[
					"T-SPIN",
					"THE FAST",
					"PUZZLE",
					"","","",
					"JS-CODE","BY",
					"KESIEV",
					"",
					"GRAPHICS","BY",
					"KESIEV",
					"HEBO",
					"GIMAGES",
					"","","",
					"CREATED","USING THE",
					"AKIHABARA","ENGINE",
					"BY KESIEV","(c)2010",
					"KESIEV.COM",
					"","","","","","","","","","","",
					"THANK YOU",
					"FOR","PLAYING!",
					"","",
					"NO BLOCK","CAN",
					"STOP YOU!",
					"","","","","","","","","","","",
					"THE END"
				]
			},
			mroll:{ font:"small-red", speed:2, spacing:2,
				text:[
					"T-SPIN",
					"THE FAST",
					"PUZZLE",
					"","","",
					"JS-CODE","BY",
					"KESIEV",
					"",
					"GRAPHICS","BY",
					"KESIEV",
					"HEBO",
					"GIMAGES",
					"","","",
					"CREATED","USING THE",
					"AKIHABARA","ENGINE",
					"BY KESIEV","a2010",
					"KESIEV.COM",
					"","","","","","","","","","","",
					"THANK YOU",
					"FOR","PLAYING!",
					"","",
					"NO BLOCK","CAN",
					"STOP YOU!",
					"","","","","","","","","","","",
					"THE END"
				]
			}
	};
	
	
block.yspawnpoints={
		srs:[-2,-2,-2,-2,-2,-2,-2], // SRS - http://www.tetrisconcept.net/wiki/SRS
		ars:[-1,-1,-1,-1,-1,-1,0],  // ARS - http://www.tetrisconcept.net/wiki/TGM_rotation
		classic:[-1,-1,-1,0,-1,-1,0], 
		sega:[-1,-1,-1,-1,-1,-1,-1], // Sega rotation system - http://www.tetrisconcept.net/wiki/SRS
		nintendoright:[-2,-1,-1,0,-1,-1,-1], // Nintendo right handed rotation system - http://www.tetrisconcept.net/wiki/Nintendo_Rotation_System
		nintendoleft:[-2,-1,-1,0,-1,-1,-1],  // Nintendo left handed rotation system - http://www.tetrisconcept.net/wiki/Nintendo_Rotation_System
		tengen:[0,0,0,0,0,0,0] // Tengen - http://www.tetrisconcept.net/wiki/Tetris_%28NES,_Tengen%29
	};
	
block.xspawnpoints={
		srs:null, // SRS - Are centered, rounded to left - http://www.tetrisconcept.net/wiki/SRS
		sega:null, // Sega - Are centered, rounded to the left - http://www.tetrisconcept.net/wiki/SRS
		ars:null, // ARS - http://www.tetrisconcept.net/wiki/TGM_rotation
  		tengen:[5,5,5,5,5,5,5] // Tengen - http://www.tetrisconcept.net/wiki/Tetris_%28NES,_Tengen%29
	};
	
block.tspins={ // T-Spins positions (for t-spin supported pieces set)
		srs:[ // SRS rotation t-spin spots - http://www.tetrisconcept.net/wiki/SRS
				// I
				null, // Any t-spin spot
				// T (2 is for calculating spins)
				[[[1,0,1,0],[0,0,0,0],[1,0,1,0],[0,0,0,0]],
				 [[1,0,1,0],[0,0,0,0],[1,0,1,0],[0,0,0,0]],
				 [[1,0,1,0],[0,0,0,0],[1,0,1,0],[0,0,0,0]],
				 [[1,0,1,0],[0,0,0,0],[1,0,1,0],[0,0,0,0]]],
				// L
				null, // Any t-spin spot
				// J
				null, // Any t-spin spot
				// Z
				null, // Any t-spin spot
				// S
				null, // Any t-spin spot
				// O
				null, // Any t-spin spot
			]
	};
	
block.palettes={
		// Colors: 0-gray, 1-red, 2-orange, 3-yellow, 4-green, 5-cyan, 6-Blue, 7-violet
		classic: // Classic colors
		  // I T L J Z S O #
			[5,7,2,6,1,4,3,0],
		sega: // Sega rotation colors - http://www.tetrisconcept.net/wiki/Sega_Rotation
			[1,5,2,6,4,7,3,0]
	};
	
block.deadkeys={
			 // left right  up down rotright rotleft  hold
		none:[  true,true,true,true,    true,   true, true], // All keys available
		sega:[  true,true,true,true,   false,   true, true]  // Only counterclockwise - http://www.tetrisconcept.net/wiki/Tetris_%28Sega%29
	};
	
block.pieces={
		classic:[ // Classic rotation system
				// I
				[[[0,0,0,0],[1,1,1,1],[0,0,0,0],[0,0,0,0]],
				 [[0,1,0,0],[0,1,0,0],[0,1,0,0],[0,1,0,0]]],
				// T
				[[[0,0,0,0],[1,1,1,0],[0,1,0,0],[0,0,0,0]],
				 [[0,1,0,0],[1,1,0,0],[0,1,0,0],[0,0,0,0]],
				 [[0,1,0,0],[1,1,1,0],[0,0,0,0],[0,0,0,0]],
				 [[0,1,0,0],[0,1,1,0],[0,1,0,0],[0,0,0,0]]],
				// L
				[[[0,0,0,0],[1,1,1,0],[1,0,0,0],[0,0,0,0]],
				 [[1,1,0,0],[0,1,0,0],[0,1,0,0],[0,0,0,0]],
				 [[0,0,1,0],[1,1,1,0],[0,0,0,0],[0,0,0,0]],
				 [[0,1,0,0],[0,1,0,0],[0,1,1,0],[0,0,0,0]]],
				// J
				[[[1,0,0,0],[1,1,1,0],[0,0,0,0],[0,0,0,0]],
				 [[0,1,1,0],[0,1,0,0],[0,1,0,0],[0,0,0,0]],
				 [[0,0,0,0],[1,1,1,0],[0,0,1,0],[0,0,0,0]],
				 [[0,1,0,0],[0,1,0,0],[1,1,0,0],[0,0,0,0]]],
				// Z
				[[[0,0,0,0],[1,1,0,0],[0,1,1,0],[0,0,0,0]],
				 [[0,0,1,0],[0,1,1,0],[0,1,0,0],[0,0,0,0]]],
				// S
				[[[0,0,0,0],[0,1,1,0],[1,1,0,0],[0,0,0,0]],
				 [[0,1,0,0],[0,1,1,0],[0,0,1,0],[0,0,0,0]]],
				// O
				[[[0,1,1,0],[0,1,1,0],[0,0,0,0],[0,0,0,0]]]]
		,
		sega:[  // Sega rotation system - http://www.tetrisconcept.net/wiki/Sega_Rotation
				// I
				[[[0,0,0,0],[1,1,1,1],[0,0,0,0],[0,0,0,0]],
				 [[0,0,1,0],[0,0,1,0],[0,0,1,0],[0,0,1,0]]],
				// T
				[[[0,0,0,0],[1,1,1,0],[0,1,0,0],[0,0,0,0]],
				 [[0,1,0,0],[1,1,0,0],[0,1,0,0],[0,0,0,0]],
				 [[0,0,0,0],[0,1,0,0],[1,1,1,0],[0,0,0,0]],
				 [[0,1,0,0],[0,1,1,0],[0,1,0,0],[0,0,0,0]]],
				// L
				[[[0,0,0,0],[1,1,1,0],[1,0,0,0],[0,0,0,0]],
				 [[1,1,0,0],[0,1,0,0],[0,1,0,0],[0,0,0,0]],
				 [[0,0,0,0],[0,0,1,0],[1,1,1,0],[0,0,0,0]],
				 [[0,1,0,0],[0,1,0,0],[0,1,1,0],[0,0,0,0]]],
				// J
				[[[0,0,0,0],[1,0,0,0],[1,1,1,0],[0,0,0,0]],
				 [[0,1,1,0],[0,1,0,0],[0,1,0,0],[0,0,0,0]],
				 [[0,0,0,0],[1,1,1,0],[0,0,1,0],[0,0,0,0]],
				 [[0,1,0,0],[0,1,0,0],[1,1,0,0],[0,0,0,0]]],
				// Z
				[[[0,0,0,0],[1,1,0,0],[0,1,1,0],[0,0,0,0]],
				 [[0,0,1,0],[0,1,1,0],[0,1,0,0],[0,0,0,0]]],
				// S
				[[[0,0,0,0],[0,1,1,0],[1,1,0,0],[0,0,0,0]],
				 [[1,0,0,0],[1,1,0,0],[0,1,0,0],[0,0,0,0]]],
				// O
				[[[0,0,0,0],[0,1,1,0],[0,1,1,0],[0,0,0,0]]]]
		,
		nintendoright:[ // Nintendo right handed rotation system - http://www.tetrisconcept.net/wiki/Nintendo_Rotation_System
				// I
				[[[0,0,0,0],[0,0,0,0],[1,1,1,1],[0,0,0,0]],
				 [[0,0,1,0],[0,0,1,0],[0,0,1,0],[0,0,1,0]]],
				// T
				[[[0,0,0,0],[1,1,1,0],[0,1,0,0],[0,0,0,0]],
				 [[0,1,0,0],[1,1,0,0],[0,1,0,0],[0,0,0,0]],
				 [[0,1,0,0],[1,1,1,0],[0,0,0,0],[0,0,0,0]],
				 [[0,1,0,0],[0,1,1,0],[0,1,0,0],[0,0,0,0]]],
				// L
				[[[0,0,0,0],[1,1,1,0],[1,0,0,0],[0,0,0,0]],
				 [[1,1,0,0],[0,1,0,0],[0,1,0,0],[0,0,0,0]],
				 [[0,0,1,0],[1,1,1,0],[0,0,0,0],[0,0,0,0]],
				 [[0,1,0,0],[0,1,0,0],[0,1,1,0],[0,0,0,0]]],
				// J
				[[[1,0,0,0],[1,1,1,0],[0,0,0,0],[0,0,0,0]],
				 [[0,1,1,0],[0,1,0,0],[0,1,0,0],[0,0,0,0]],
				 [[0,0,0,0],[1,1,1,0],[0,0,1,0],[0,0,0,0]],
				 [[0,1,0,0],[0,1,0,0],[1,1,0,0],[0,0,0,0]]],
				// Z
				[[[0,0,0,0],[1,1,0,0],[0,1,1,0],[0,0,0,0]],
				 [[0,0,1,0],[0,1,1,0],[0,1,0,0],[0,0,0,0]]],
				// S
				[[[0,0,0,0],[0,1,1,0],[1,1,0,0],[0,0,0,0]],
				 [[0,1,0,0],[0,1,1,0],[0,0,1,0],[0,0,0,0]]],
				// O
				[[[0,0,0,0],[0,1,1,0],[0,1,1,0],[0,0,0,0]]]]
		,
		nintendoleft:[ // Nintendo left handed rotation system - http://www.tetrisconcept.net/wiki/Nintendo_Rotation_System
				// I
				[[[0,0,0,0],[0,0,0,0],[1,1,1,1],[0,0,0,0]],
				 [[0,1,0,0],[0,1,0,0],[0,1,0,0],[0,1,0,0]]],
				// T
				[[[0,0,0,0],[1,1,1,0],[0,1,0,0],[0,0,0,0]],
				 [[0,1,0,0],[1,1,0,0],[0,1,0,0],[0,0,0,0]],
				 [[0,1,0,0],[1,1,1,0],[0,0,0,0],[0,0,0,0]],
				 [[0,1,0,0],[0,1,1,0],[0,1,0,0],[0,0,0,0]]],
				// L
				[[[0,0,0,0],[1,1,1,0],[1,0,0,0],[0,0,0,0]],
				 [[1,1,0,0],[0,1,0,0],[0,1,0,0],[0,0,0,0]],
				 [[0,0,1,0],[1,1,1,0],[0,0,0,0],[0,0,0,0]],
				 [[0,1,0,0],[0,1,0,0],[0,1,1,0],[0,0,0,0]]],
				// J
				[[[1,0,0,0],[1,1,1,0],[0,0,0,0],[0,0,0,0]],
				 [[0,1,1,0],[0,1,0,0],[0,1,0,0],[0,0,0,0]],
				 [[0,0,0,0],[1,1,1,0],[0,0,1,0],[0,0,0,0]],
				 [[0,1,0,0],[0,1,0,0],[1,1,0,0],[0,0,0,0]]],
				// Z
				[[[0,0,0,0],[1,1,0,0],[0,1,1,0],[0,0,0,0]],
				 [[0,1,0,0],[1,1,0,0],[1,0,0,0],[0,0,0,0]]],
				// S
				[[[0,0,0,0],[0,1,1,0],[1,1,0,0],[0,0,0,0]],
				 [[1,0,0,0],[1,1,0,0],[0,1,0,0],[0,0,0,0]]],
				// O
				[[[0,0,0,0],[0,1,1,0],[0,1,1,0],[0,0,0,0]]]]		
		,
		srs:[ // SRS rotation pieces - http://www.tetrisconcept.net/wiki/SRS
				// I
				[[[0,0,0,0],[1,1,1,1],[0,0,0,0],[0,0,0,0]],
				 [[0,0,1,0],[0,0,1,0],[0,0,1,0],[0,0,1,0]],
				 [[0,0,0,0],[0,0,0,0],[1,1,1,1],[0,0,0,0]],
				 [[0,1,0,0],[0,1,0,0],[0,1,0,0],[0,1,0,0]]],
				// T (2 is for calculating spins)
				[[[0,1,0,0],[1,1,1,0],[0,0,0,0],[0,0,0,0]],
				 [[0,1,0,0],[0,1,1,0],[0,1,0,0],[0,0,0,0]],
				 [[0,0,0,0],[1,1,1,0],[0,1,0,0],[0,0,0,0]],
				 [[0,1,0,0],[1,1,0,0],[0,1,0,0],[0,0,0,0]]],
				// L
				[[[0,0,1,0],[1,1,1,0],[0,0,0,0],[0,0,0,0]],
				 [[0,1,0,0],[0,1,0,0],[0,1,1,0],[0,0,0,0]],
				 [[0,0,0,0],[1,1,1,0],[1,0,0,0],[0,0,0,0]],
				 [[1,1,0,0],[0,1,0,0],[0,1,0,0],[0,0,0,0]]],
				// J
				[[[1,0,0,0],[1,1,1,0],[0,0,0,0],[0,0,0,0]],
				 [[0,1,1,0],[0,1,0,0],[0,1,0,0],[0,0,0,0]],
				 [[0,0,0,0],[1,1,1,0],[0,0,1,0],[0,0,0,0]],
				 [[0,1,0,0],[0,1,0,0],[1,1,0,0],[0,0,0,0]]],
				// Z
				[[[1,1,0,0],[0,1,1,0],[0,0,0,0],[0,0,0,0]],
				 [[0,0,1,0],[0,1,1,0],[0,1,0,0],[0,0,0,0]],
				 [[0,0,0,0],[1,1,0,0],[0,1,1,0],[0,0,0,0]],
				 [[0,1,0,0],[1,1,0,0],[1,0,0,0],[0,0,0,0]]],
				// S
				[[[0,1,1,0],[1,1,0,0],[0,0,0,0],[0,0,0,0]],
				 [[0,1,0,0],[0,1,1,0],[0,0,1,0],[0,0,0,0]],
				 [[0,0,0,0],[0,1,1,0],[1,1,0,0],[0,0,0,0]],
				 [[1,0,0,0],[1,1,0,0],[0,1,0,0],[0,0,0,0]]],
				// O
				[[[0,1,1,0],[0,1,1,0],[0,0,0,0],[0,0,0,0]]]]		
		,
		ars:[ // ARS rotation pieces - http://www.tetrisconcept.net/wiki/TGM_rotation
				// I
				[[[0,0,0,0],[1,1,1,1],[0,0,0,0],[0,0,0,0]],
				 [[0,0,1,0],[0,0,1,0],[0,0,1,0],[0,0,1,0]]],
				// T
				[[[0,0,0,0],[1,1,1,0],[0,1,0,0],[0,0,0,0]],
				 [[0,1,0,0],[1,1,0,0],[0,1,0,0],[0,0,0,0]],
				 [[0,0,0,0],[0,1,0,0],[1,1,1,0],[0,0,0,0]],
				 [[0,1,0,0],[0,1,1,0],[0,1,0,0],[0,0,0,0]]],
				// L
				[[[0,0,0,0],[1,1,1,0],[1,0,0,0],[0,0,0,0]],
				 [[1,1,0,0],[0,1,0,0],[0,1,0,0],[0,0,0,0]],
				 [[0,0,0,0],[0,0,1,0],[1,1,1,0],[0,0,0,0]],
				 [[0,1,0,0],[0,1,0,0],[0,1,1,0],[0,0,0,0]]],
				// J
				[[[0,0,0,0],[1,1,1,0],[0,0,1,0],[0,0,0,0]],
				 [[0,1,0,0],[0,1,0,0],[1,1,0,0],[0,0,0,0]],
				 [[0,0,0,0],[1,0,0,0],[1,1,1,0],[0,0,0,0]],
				 [[0,1,1,0],[0,1,0,0],[0,1,0,0],[0,0,0,0]]],
				// Z
				[[[0,0,0,0],[1,1,0,0],[0,1,1,0],[0,0,0,0]],
				 [[0,0,1,0],[0,1,1,0],[0,1,0,0],[0,0,0,0]]],
				// S
				[[[0,0,0,0],[0,1,1,0],[1,1,0,0],[0,0,0,0]],
				 [[1,0,0,0],[1,1,0,0],[0,1,0,0],[0,0,0,0]]],
				// O
				[[[0,1,1,0],[0,1,1,0],[0,0,0,0],[0,0,0,0]]]]
		,
		tengen:[ // Tengen rotation system - http://www.tetrisconcept.net/wiki/Tetris_%28NES,_Tengen%29
				// I
				[[[1,1,1,1],[0,0,0,0],[0,0,0,0],[0,0,0,0]],
				 [[0,1,0,0],[0,1,0,0],[0,1,0,0],[0,1,0,0]]],
				// T
				[[[1,1,1,0],[0,1,0,0],[0,0,0,0],[0,0,0,0]],
				 [[0,1,0,0],[1,1,0,0],[0,1,0,0],[0,0,0,0]],
				 [[0,1,0,0],[1,1,1,0],[0,0,0,0],[0,0,0,0]],
				 [[0,0,1,0],[0,0,1,1],[0,0,1,0],[0,0,0,0]]],
				// L
				[[[1,1,1,0],[1,0,0,0],[0,0,0,0],[0,0,0,0]],
				 [[1,1,0,0],[0,1,0,0],[0,1,0,0],[0,0,0,0]],
				 [[0,0,1,0],[1,1,1,0],[0,0,0,0],[0,0,0,0]],
				 [[1,0,0,0],[1,0,0,0],[1,1,0,0],[0,0,0,0]]],
				// J
				[[[1,1,1,0],[0,0,1,0],[0,0,0,0],[0,0,0,0]],
				 [[0,1,0,0],[0,1,0,0],[1,1,0,0],[0,0,0,0]],
				 [[1,0,0,0],[1,1,1,0],[0,0,0,0],[0,0,0,0]],
				 [[1,1,0,0],[1,0,0,0],[1,0,0,0],[0,0,0,0]]],
				// Z
				[[[1,1,0,0],[0,1,1,0],[0,0,0,0],[0,0,0,0]],
				 [[0,1,0,0],[1,1,0,0],[1,0,0,0],[0,0,0,0]]],
				// S
				[[[0,1,1,0],[1,1,0,0],[0,0,0,0],[0,0,0,0]],
				 [[1,0,0,0],[1,1,0,0],[0,1,0,0],[0,0,0,0]]],
				// O
				[[[1,1,0,0],[1,1,0,0],[0,0,0,0],[0,0,0,0]]]]				
		};
	/*
		kicks:{
			singleleftwallkick:[{x:-1}],
			singlewallkick:[{x:-1},{x:+1}],
			doublewallkick:[{x:-1},{x:-2},{x:+1},{x:+2}],
			singlefloorkick:[{y:-1,kicks:-1,floorkick:true}],
			doublefloorkick:[{y:-1,kicks:-1,floorkick:true},{y:-2,kicks:-1,floorkick:true}] // TODO kicks:-1 ??
		},
	*/	
		
		// Rotation locks are like kicksets, as definition. Are to evaluate rotations.
		// If operator is true means that, if the map is correct, rotation is applied. If operator is false, the rotation fails if map matches.
		// Maps are like this: 0: unvaluate, 1: must be filled, 2: must be empty
		// { operator:true, logic:"and", map:[[0,0,0,0],[0,0,1,0],[0,2,0...]] }
		// "r0":[ // Every time the L is rotated to 0 state
		//					{
		//						setrotation:false, // The rotation is cancelled if...
		//						logic:"or", // ...one or more of these map points are verified.
		//						map:[[0,1,0,0],[0,0,0,0],[0,1,0,0],[0,0,0,0]]
		//					}
		//				],

block.garbagerolls={
	tgm2plus:[
		[null,7,7,7,7,7,7,7,7,7],
		[null,7,7,7,7,7,7,7,7,7],
		[null,7,7,7,7,7,7,7,7,7],
		[null,7,7,7,7,7,7,7,7,7],
		[7,7,7,7,7,7,7,7,7,null],
		[7,7,7,7,7,7,7,7,7,null],
		[7,7,7,7,7,7,7,7,7,null],
		[7,7,7,7,7,7,7,7,7,null],
		[null,null,7,7,7,7,7,7,7,7],
		[null,7,7,7,7,7,7,7,7,7],
		[null,7,7,7,7,7,7,7,7,7],
		[7,7,7,7,7,7,7,7,null,null],
		[7,7,7,7,7,7,7,7,7,null],
		[7,7,7,7,7,7,7,7,7,null],
		[7,7,null,7,7,7,7,7,7,7],
		[7,null,null,7,7,7,7,7,7,7],
		[7,null,7,7,7,7,7,7,7,7],
		[7,7,7,7,7,7,7,null,7,7],
		[7,7,7,7,7,7,7,null,null,7],
		[7,7,7,7,7,7,7,7,null,7],
		[7,7,7,7,null,null,7,7,7,7],
		[7,7,7,7,null,null,7,7,7,7],
		[7,7,7,7,null,7,7,7,7,7],
		[7,7,7,null,null,null,7,7,7,7]
	]
};

block["data"]={
	tgm2plus:function(th,phase) {
			if (th.data._tgm2roller==null) {
				th.data._tgm2roller=0;
				th.data.lastidle=th.overall.idlepieces;
				th.data.mycounter=0;
			}
			if (phase=="onlock") {
			th.data.mycounter+=th.overall.idlepieces-th.data.lastidle; // Keep a personal counter for idle pieces
			th.data.lastidle=th.overall.idlepieces;
			if (th.data.mycounter>=13-Math.floor(th.level/100)) {
				th.data.mycounter=0;
				block.pushline(th,block.garbagerolls.tgm2plus[th.data._tgm2roller]);
				th.data._tgm2roller=(th.data._tgm2roller+1)%block.garbagerolls.tgm2plus.length;
			}
		}
	}
};

block.rotationlocks={
			ars:{
				// I p0
				// T p1
				"p1":{
					"r0":[{ setrotation:false,  logic:"or",  map:[[0,1,0,0],[0,0,0,0],[0,0,0,0],[0,0,0,0]] }],
					"r2":[{ setrotation:false, logic:"or", map:[[0,1,0,0],[0,0,0,0],[0,0,0,0],[0,0,0,0]] }]
				},
				// L p2
				"p2":{
					"r0":[{ setrotation:false,  logic:"or",  map:[[0,1,0,0],[0,0,0,0],[0,1,0,0],[0,0,0,0]] }],
					"r2":[{ setrotation:false, logic:"or", map:[[0,1,0,0],[0,1,0,0],[0,0,0,0],[0,0,0,0]] }],
					// specific rotation are evaluated instead of single piece rotations. i.e...
					// Clockwise rotation of L
					"r01":[
						{ setrotation:true,  logic:"and",  map:[[1,0,0,0],[0,0,0,0],[0,1,0,0],[0,0,0,0]] },
						{ setrotation:false,  logic:"or",  map:[[0,1,0,0],[0,0,0,0],[0,1,0,0],[0,0,0,0]] } // Replicated the r0 statement
					]
				},
				// J p3
				"p3":{
					"r0":[{ setrotation:false, logic:"or", map:[[0,1,0,0],[0,0,0,0],[0,1,0,0],[0,0,0,0]] } ],
					"r2":[{ setrotation:false, logic:"or", map:[[0,1,0,0],[0,1,0,0],[0,0,0,0],[0,0,0,0]] }],
					// Counterclock wise rotation of J
					"r03":[
						{setrotation:true, logic:"and", map:[[0,0,1,0],[0,0,0,0],[0,1,0,0],[0,0,0,0]] },
						{setrotation:false, logic:"or", map:[[0,1,0,0],[0,0,0,0],[0,1,0,0],[0,0,0,0]] } // Replicated the r0 statement
					]
				},
				// Z p4
				// S p5
				// O p6
				// All Other (p)
				"p":{}
			}
		},
		
		// Kickset definitions
		// 0 - spawn rotation
		// 1 - R
		// 2 - 2
		// 3 - L
block.kicksets={
			singleleftwallkick:{ // Single left wallkick for all piece/rotations for Tengen tetris - http://www.tetrisconcept.net/wiki/Tetris_(NES,_Tengen)
				"p": {
					"r":[{x:-1}]
				}
			},
			ars:{ // ARS - http://www.tetrisconcept.net/wiki/SRS
				// I
				"p0":{}, // Never kicks (except on TGM3 - another kickset)
				// T p1
				// L p2
				// J p3
				// Z p4
				// S p5
				// O p6
				// All Other (p)
				"p": {
					"r":[{x:+1,y:0},{x:-1,y:0}]
				}
			},
			srs:{ // SRS kick set - http://www.tetrisconcept.net/wiki/SRS
				  // Notes: y+1 is moving the piece UP and not DOWN in the wiki!
				// I
				"p0":{
					"r01":[{x:-2,y:0},{x:+1,y:0},{x:-2,y:-1},{x:+1,y:+2,floorkick:true,kicks:-1}],
					"r10":[{x:+2,y:0},{x:-1,y:0},{x:+2,y:+1,floorkick:true,kicks:-1},{x:-1,y:-2}],

					"r12":[{x:-1,y:0},{x:+2,y:0},{x:-1,y:+2,floorkick:true,kicks:-1},{x:+2,y:-1}],
					"r21":[{x:+1,y:0},{x:+2,y:0},{x:+1,y:-2},{x:-2,y:+1,floorkick:true,kicks:-1}],
					
					"r23":[{x:-2,y:0},{x:-1,y:0},{x:+2,y:+1,floorkick:true,kicks:-1},{x:-1,y:-2}],
					"r32":[{x:+2,y:0},{x:+1,y:0},{x:-2,y:-1},{x:+1,y:+2,floorkick:true,kicks:-1}],
					
					"r30":[{x:+1,y:0},{x:-2,y:0},{x:+1,y:-2},{x:-2,y:+1,floorkick:true,kicks:-1}],
					"r03":[{x:-1,y:0},{x:-2,y:0},{x:-1,y:+2,floorkick:true,kicks:-1},{x:+2,y:-1}],

				},
				// T p1
				// L p2
				// J p3
				// Z p4
				// S p5
				// O p6
				// All Other (p)
				"p": {
					"r01":[{x:-1,y:0},{x:-1,y:+1,floorkick:true,kicks:-1},{x:0,y:-2},{x:-1,y:-2}],
					"r10":[{x:+1,y:0},{x:+1,y:-1},{x:0,y:+2,floorkick:true,kicks:-1},{x:+1,y:+2,floorkick:true,kicks:-1}],

					"r12":[{x:+1,y:0},{x:+1,y:-1},{x:0,y:+2,floorkick:true,kicks:-1},{x:+1,y:+2,floorkick:true,kicks:-1}],
					"r21":[{x:-1,y:0},{x:-1,y:+1,floorkick:true,kicks:-1},{x:0,y:-2},{x:-1,y:-2}],
					
					"r23":[{x:+1,y:0},{x:+1,y:+1,floorkick:true,kicks:-1},{x:0,y:-2},{x:+1,y:-2}],
					"r32":[{x:-1,y:0},{x:-1,y:-1},{x:0,y:+2,floorkick:true,kicks:-1},{x:-1,y:+2,floorkick:true,kicks:-1}],
					
					"r30":[{x:-1,y:0},{x:-1,y:-1},{x:0,y:+2,floorkick:true,kicks:-1},{x:-1,y:+2,floorkick:true,kicks:-1}],
					"r03":[{x:+1,y:0},{x:+1,y:+1,floorkick:true,kicks:-1},{x:0,y:-2},{x:+1,y:-2}],
				}
			}	
		};
		
block.medals={

	tgm2master:{ // TGM2+ medals system - http://www.tetrisconcept.net/wiki/Tetris_The_Absolute_The_Grand_Master_2_PLUS
		starting:["none","none","none","none","none"], // ST
		medals:[
			{ // Base series of grades
				none:{label:"acnone",promote:[{tomedal:"acbronze",condition:[["onlock","or","overall","bravo",">=",null,1]]}]},
				acbronze:{label:"acbronze",promote:[{tomedal:"acsilver",condition:[["onlock","or","overall","bravo",">=",null,2]]}]},
				acsilver:{label:"acsilver",promote:[{tomedal:"acgold",condition:[["onlock","or","overall","bravo",">=",null,3]]}]},
				acgold:{label:"acgold"}
			},
			{
				none:{label:"ronone",condition:[[null,"or","global","currentsection",">=",null,3]],promote:[{tomedal:"robronze",condition:[[null,"or","avgsection",[null,"rotperpiece",0,1,2],"<=",null,6/5]]},{fail:true}]},
				robronze:{label:"robronze",condition:[[null,"or","global","currentsection",">=",null,7]],promote:[{tomedal:"rosilver",condition:[[null,"or","avgsection",[null,"rotperpiece",3,4,5,6],"<=",null,6/5]]},{fail:true}]},
				rosilver:{label:"rosilver",condition:[[null,"or","global","currentsection",">=",null,10]],promote:[{tomedal:"rogold",condition:[[null,"or","avgsection",[null,"rotperpiece",7,8,9],"<=",null,6/5]]},{fail:true}]},
				rogold:{label:"rogold"}
			},
			{
				none:{label:"sknone",promote:[{tomedal:"skbronze",condition:[["onlock","or","overall","tetris",">=",null,10]]}]},
				skbronze:{label:"skbronze",promote:[{tomedal:"sksilver",condition:[["onlock","or","overall","tetris",">=",null,20]]}]},
				sksilver:{label:"sksilver",promote:[{tomedal:"skgold",condition:[["onlock","or","overall","tetris",">=",null,35]]}]},
				skgold:{label:"skgold"}
			
			},
			{
				none:{label:"renone",promote:[{tomedal:"rebronze",condition:[["onlock","or","overall","recovery",">=",null,1]]}]},
				rebronze:{label:"rebronze",promote:[{tomedal:"resilver",condition:[["onlock","or","overall","recovery",">=",null,2]]}]},
				resilver:{label:"resilver",promote:[{tomedal:"regold",condition:[["onlock","or","overall","recovery",">=",null,4]]}]},
				regold:{label:"regold"}
			},
			{
				none:{label:"conone",promote:[{tomedal:"cobronze",condition:[["onlock","or","overall","combo",">=",null,4]]}]},
				cobronze:{label:"cobronze",promote:[{tomedal:"cosilver",condition:[["onlock","or","overall","combo",">=",null,5]]}]},
				cosilver:{label:"cosilver",promote:[{tomedal:"cogold",condition:[["onlock","or","overall","combo",">=",null,7]]}]},
				cogold:{label:"cogold"}			
			}
		]
	},
	tgm2big:{ // TGM2+ big mode medals system (like master but with different sk/co) - http://www.tetrisconcept.net/wiki/Tetris_The_Absolute_The_Grand_Master_2_PLUS
		starting:["none","none","none","none","none"], // ST
		medals:[
			{ // Base series of grades
				none:{label:"acnone",promote:[{tomedal:"acbronze",condition:[["onlock","or","overall","bravo",">=",null,1]]}]},
				acbronze:{label:"acbronze",promote:[{tomedal:"acsilver",condition:[["onlock","or","overall","bravo",">=",null,2]]}]},
				acsilver:{label:"acsilver",promote:[{tomedal:"acgold",condition:[["onlock","or","overall","bravo",">=",null,3]]}]},
				acgold:{label:"acgold"}
			},
			{
				none:{label:"ronone",condition:[[null,"or","global","currentsection",">=",null,3]],promote:[{tomedal:"robronze",condition:[[null,"or","avgsection",[null,"rotperpiece",0,1,2],"<=",null,6/5]]},{fail:true}]},
				robronze:{label:"robronze",condition:[[null,"or","global","currentsection",">=",null,7]],promote:[{tomedal:"rosilver",condition:[[null,"or","avgsection",[null,"rotperpiece",3,4,5,6],"<=",null,6/5]]},{fail:true}]},
				rosilver:{label:"rosilver",condition:[[null,"or","global","currentsection",">=",null,10]],promote:[{tomedal:"rogold",condition:[[null,"or","avgsection",[null,"rotperpiece",7,8,9],"<=",null,6/5]]},{fail:true}]},
				rogold:{label:"rogold"}
			},
			{
				none:{label:"sknone",promote:[{tomedal:"skbronze",condition:[["onlock","or","overall","tetris",">=",null,1]]}]},
				skbronze:{label:"skbronze",promote:[{tomedal:"sksilver",condition:[["onlock","or","overall","tetris",">=",null,2]]}]},
				sksilver:{label:"sksilver",promote:[{tomedal:"skgold",condition:[["onlock","or","overall","tetris",">=",null,4]]}]},
				skgold:{label:"skgold"}
			
			},
			{
				none:{label:"renone",promote:[{tomedal:"rebronze",condition:[["onlock","or","overall","recovery",">=",null,1]]}]},
				rebronze:{label:"rebronze",promote:[{tomedal:"resilver",condition:[["onlock","or","overall","recovery",">=",null,2]]}]},
				resilver:{label:"resilver",promote:[{tomedal:"regold",condition:[["onlock","or","overall","recovery",">=",null,4]]}]},
				regold:{label:"regold"}
			},
			{
				none:{label:"conone",promote:[{tomedal:"cobronze",condition:[["onlock","or","overall","combo",">=",null,2]]}]},
				cobronze:{label:"cobronze",promote:[{tomedal:"cosilver",condition:[["onlock","or","overall","combo",">=",null,3]]}]},
				cosilver:{label:"cosilver",promote:[{tomedal:"cogold",condition:[["onlock","or","overall","combo",">=",null,4]]}]},
				cogold:{label:"cogold"}			
			}
		]
	},
	tgm2death:{ // TGM2+ death medals system (changes the SK medal only) - http://www.tetrisconcept.net/wiki/Tetris_The_Absolute_The_Grand_Master_2_PLUS
		starting:["none","none","none","none","none"], // ST
		medals:[
			{ // Base series of grades
				none:{label:"acnone",promote:[{tomedal:"acbronze",condition:[["onlock","or","overall","bravo",">=",null,1]]}]},
				acbronze:{label:"acbronze",promote:[{tomedal:"acsilver",condition:[["onlock","or","overall","bravo",">=",null,2]]}]},
				acsilver:{label:"acsilver",promote:[{tomedal:"acgold",condition:[["onlock","or","overall","bravo",">=",null,3]]}]},
				acgold:{label:"acgold"}
			},
			{
				none:{label:"ronone",condition:[[null,"or","global","currentsection",">=",null,3]],promote:[{tomedal:"robronze",condition:[[null,"or","avgsection",[null,"rotperpiece",0,1,2],"<=",null,6/5]]},{fail:true}]},
				robronze:{label:"robronze",condition:[[null,"or","global","currentsection",">=",null,7]],promote:[{tomedal:"rosilver",condition:[[null,"or","avgsection",[null,"rotperpiece",3,4,5,6],"<=",null,6/5]]},{fail:true}]},
				rosilver:{label:"rosilver",condition:[[null,"or","global","currentsection",">=",null,10]],promote:[{tomedal:"rogold",condition:[[null,"or","avgsection",[null,"rotperpiece",7,8,9],"<=",null,6/5]]},{fail:true}]},
				rogold:{label:"rogold"}
			},
			{
				none:{label:"sknone",promote:[{tomedal:"skbronze",condition:[["onlock","or","overall","tetris",">=",null,5]]}]},
				skbronze:{label:"skbronze",promote:[{tomedal:"sksilver",condition:[["onlock","or","overall","tetris",">=",null,10]]}]},
				sksilver:{label:"sksilver",promote:[{tomedal:"skgold",condition:[["onlock","or","overall","tetris",">=",null,17]]}]},
				skgold:{label:"skgold"}
			
			},
			{
				none:{label:"renone",promote:[{tomedal:"rebronze",condition:[["onlock","or","overall","recovery",">=",null,1]]}]},
				rebronze:{label:"rebronze",promote:[{tomedal:"resilver",condition:[["onlock","or","overall","recovery",">=",null,2]]}]},
				resilver:{label:"resilver",promote:[{tomedal:"regold",condition:[["onlock","or","overall","recovery",">=",null,4]]}]},
				regold:{label:"regold"}
			},
			{
				none:{label:"conone",promote:[{tomedal:"cobronze",condition:[["onlock","or","overall","combo",">=",null,4]]}]},
				cobronze:{label:"cobronze",promote:[{tomedal:"cosilver",condition:[["onlock","or","overall","combo",">=",null,5]]}]},
				cosilver:{label:"cosilver",promote:[{tomedal:"cogold",condition:[["onlock","or","overall","combo",">=",null,7]]}]},
				cogold:{label:"cogold"}			
			}
		]
	},
	// DEBUG
	debugtgm2:{
		starting:["none","none","none","none","none"], // ST
			medals:[
			{ // Base series of grades
				none:{label:"acnone",promote:[{tomedal:"acbronze",condition:[["onlock","or","overall","bravo",">=",null,1]]}]},
				acbronze:{label:"acbronze",promote:[{tomedal:"acsilver",condition:[["onlock","or","overall","bravo",">=",null,1]]}]},
				acsilver:{label:"acsilver",promote:[{tomedal:"acgold",condition:[["onlock","or","overall","bravo",">=",null,1]]}]},
				acgold:{label:"acgold"}
			},
			{
				none:{label:"ronone",condition:[[null,"or","global","currentsection",">=",null,3]],promote:[{tomedal:"robronze",condition:[[null,"or","avgsection",[null,"rotperpiece",0,1,2],"<=",null,100]]},{fail:true}]},
				robronze:{label:"robronze",condition:[[null,"or","global","currentsection",">=",null,7]],promote:[{tomedal:"rosilver",condition:[[null,"or","avgsection",[null,"rotperpiece",3,4,5,6],"<=",null,100]]},{fail:true}]},
				rosilver:{label:"rosilver",condition:[[null,"or","global","currentsection",">=",null,10]],promote:[{tomedal:"rogold",condition:[[null,"or","avgsection",[null,"rotperpiece",7,8,9],"<=",null,100]]},{fail:true}]},
				rogold:{label:"rogold"}
			},
			{
				none:{label:"sknone",promote:[{tomedal:"skbronze",condition:[["onlock","or","overall","tetris",">=",null,1]]}]},
				skbronze:{label:"skbronze",promote:[{tomedal:"sksilver",condition:[["onlock","or","overall","tetris",">=",null,1]]}]},
				sksilver:{label:"sksilver",promote:[{tomedal:"skgold",condition:[["onlock","or","overall","tetris",">=",null,1]]}]},
				skgold:{label:"skgold"}
			
			},
			{
				none:{label:"renone",promote:[{tomedal:"rebronze",condition:[["onlock","or","overall","recovery",">=",null,1]]}]},
				rebronze:{label:"rebronze",promote:[{tomedal:"resilver",condition:[["onlock","or","overall","recovery",">=",null,1]]}]},
				resilver:{label:"resilver",promote:[{tomedal:"regold",condition:[["onlock","or","overall","recovery",">=",null,1]]}]},
				regold:{label:"regold"}
			},
			{
				none:{label:"conone",promote:[{tomedal:"cobronze",condition:[["onlock","or","overall","combo",">=",null,1]]}]},
				cobronze:{label:"cobronze",promote:[{tomedal:"cosilver",condition:[["onlock","or","overall","combo",">=",null,2]]}]},
				cosilver:{label:"cosilver",promote:[{tomedal:"cogold",condition:[["onlock","or","overall","combo",">=",null,3]]}]},
				cogold:{label:"cogold"}			
			}
		]
	}
};

block.grades={ // Grading system
			tgm:{ // TGM grading system - http://www.tetrisconcept.net/wiki/Tetris_The_Grand_Master
				starting:["gr9","gm0"],
				grades:[
					{ // Base series of grades
						gr9:{label:"9",promote:[{tograde:"gr8",condition:[["onlock","or","overall","score",">=",null,400]]}]},
						gr8:{label:"8",promote:[{tograde:"gr7",condition:[["onlock","or","overall","score",">=",null,800]]}]},
						gr7:{label:"7",promote:[{tograde:"gr6",condition:[["onlock","or","overall","score",">=",null,1400]]}]},
						gr6:{label:"6",promote:[{tograde:"gr5",condition:[["onlock","or","overall","score",">=",null,2000]]}]},
						gr5:{label:"5",promote:[{tograde:"gr4",condition:[["onlock","or","overall","score",">=",null,3500]]}]},
						gr4:{label:"4",promote:[{tograde:"gr3",condition:[["onlock","or","overall","score",">=",null,5500]]}]},
						gr3:{label:"3",promote:[{tograde:"gr2",condition:[["onlock","or","overall","score",">=",null,8000]]}]},
						gr2:{label:"2",promote:[{tograde:"gr1",condition:[["onlock","or","overall","score",">=",null,12000]]}]},
						gr1:{label:"1",promote:[{tograde:"grS1",condition:[["onlock","or","overall","score",">=",null,16000]]}]},
						grS1:{label:"S1",promote:[{tograde:"grS2",condition:[["onlock","or","overall","score",">=",null,22000]]}]},
						grS2:{label:"S2",promote:[{tograde:"grS3",condition:[["onlock","or","overall","score",">=",null,30000]]}]},
						grS3:{label:"S3",promote:[{tograde:"grS4",condition:[["onlock","or","overall","score",">=",null,40000]]}]},
						grS4:{label:"S4",promote:[{tograde:"grS5",condition:[["onlock","or","overall","score",">=",null,52000]]}]},
						grS5:{label:"S5",promote:[{tograde:"grS6",condition:[["onlock","or","overall","score",">=",null,66000]]}]},
						grS6:{label:"S6",promote:[{tograde:"grS7",condition:[["onlock","or","overall","score",">=",null,82000]]}]},
						grS7:{label:"S7",promote:[{tograde:"grS8",condition:[["onlock","or","overall","score",">=",null,100000]]}]},
						grS8:{label:"S8",promote:[{tograde:"grS9",condition:[["onlock","or","overall","score",">=",null,120000]]}]},
						grS9:{label:"S9"}
					},
					{
						// Grandmaster grades -  Grades without labels are not shown, is shown the first available.
						gm0:{condition:[["onlock","or","global","level",">=",null,300]],promote:[{tograde:"gm1",condition:[["onlock","or","overall","score",">=",null,12000],["onlock","and","overall","time","<=",null,strtime2secs("04:15:00")]]},{fail:true}]},
						gm1:{condition:[["onlock","or","global","level",">=",null,500]],promote:[{tograde:"gm2",condition:[["onlock","or","overall","score",">=",null,40000],["onlock","and","overall","time","<=",null,strtime2secs("07:30:00")]]},{fail:true}]},
						gm2:{condition:[["onlock","or","global","level",">=",null,960]],promote:[{tograde:"gm3",condition:[["onlock","or","overall","score",">=",null,120000]]},{fail:true}]},
						gm3:{condition:[[null,"or","global","staffrolldone","==",null,1]],promote:[{tograde:"grGm", condition:[[null,"or","overall","time","<=",null,strtime2secs("13:30:00")]]},{fail:true}]},
						grGm:{label:"Gm"}
					}
				]
			},
			tgm2:{ // TGM2+ grading system - http://www.tetrisconcept.net/wiki/Tetris_The_Absolute_The_Grand_Master_2_PLUS
				starting:["gr9","gm0"],
				grades:[
					{ // Base series of grades
						gr9:{label:"9",promote:[{tograde:"gr8",condition:[["onlock","or","global","internalgrade",">=",null,1]]}]},
						gr8:{label:"8",promote:[{tograde:"gr7",condition:[["onlock","or","global","internalgrade",">=",null,2]]}]},
						gr7:{label:"7",promote:[{tograde:"gr6",condition:[["onlock","or","global","internalgrade",">=",null,3]]}]},
						gr6:{label:"6",promote:[{tograde:"gr5",condition:[["onlock","or","global","internalgrade",">=",null,4]]}]},
						gr5:{label:"5",promote:[{tograde:"gr4",condition:[["onlock","or","global","internalgrade",">=",null,5]]}]},
						gr4:{label:"4",promote:[{tograde:"gr4p",condition:[["onlock","or","global","internalgrade",">=",null,6]]}]},
						gr4p:{label:"4",promote:[{tograde:"gr3",condition:[["onlock","or","global","internalgrade",">=",null,7]]}]},
						gr3:{label:"3",promote:[{tograde:"gr3p",condition:[["onlock","or","global","internalgrade",">=",null,8]]}]},
						gr3p:{label:"3",promote:[{tograde:"gr2",condition:[["onlock","or","global","internalgrade",">=",null,9]]}]},
						gr2:{label:"2",promote:[{tograde:"gr2p",condition:[["onlock","or","global","internalgrade",">=",null,10]]}]},
						gr2p:{label:"2",promote:[{tograde:"gr2pp",condition:[["onlock","or","global","internalgrade",">=",null,11]]}]},
						gr2pp:{label:"2",promote:[{tograde:"gr1",condition:[["onlock","or","global","internalgrade",">=",null,12]]}]},
						gr1:{label:"1",promote:[{tograde:"gr1p",condition:[["onlock","or","global","internalgrade",">=",null,13]]}]},
						gr1p:{label:"1",promote:[{tograde:"gr1pp",condition:[["onlock","or","global","internalgrade",">=",null,14]]}]},
						gr1pp:{label:"1",promote:[{tograde:"grS1",condition:[["onlock","or","global","internalgrade",">=",null,15]]}]},
						grS1:{label:"S1",promote:[{tograde:"grS1p",condition:[["onlock","or","global","internalgrade",">=",null,16]]}]},
						grS1p:{label:"S1",promote:[{tograde:"grS1pp",condition:[["onlock","or","global","internalgrade",">=",null,17]]}]},
						grS1pp:{label:"S1",promote:[{tograde:"grS2",condition:[["onlock","or","global","internalgrade",">=",null,18]]}]},
						grS2:{label:"S2",promote:[{tograde:"grS3",condition:[["onlock","or","global","internalgrade",">=",null,19]]}]},
						grS3:{label:"S3",promote:[{tograde:"grS4",condition:[["onlock","or","global","internalgrade",">=",null,20]]}]},
						grS4:{label:"S4",promote:[{tograde:"grS4p",condition:[["onlock","or","global","internalgrade",">=",null,21]]}]},
						grS4p:{label:"S4",promote:[{tograde:"grS4pp",condition:[["onlock","or","global","internalgrade",">=",null,22]]}]},
						grS4pp:{label:"S4",promote:[{tograde:"grS5",condition:[["onlock","or","global","internalgrade",">=",null,23]]}]},
						grS5:{label:"S5",promote:[{tograde:"grS5p",condition:[["onlock","or","global","internalgrade",">=",null,24]]}]},
						grS5p:{label:"S5",promote:[{tograde:"grS6",condition:[["onlock","or","global","internalgrade",">=",null,25]]}]},
						grS6:{label:"S6",promote:[{tograde:"grS6p",condition:[["onlock","or","global","internalgrade",">=",null,26]]}]},
						grS6p:{label:"S6",promote:[{tograde:"grS7",condition:[["onlock","or","global","internalgrade",">=",null,27]]}]},
						grS7:{label:"S7",promote:[{tograde:"grS7p",condition:[["onlock","or","global","internalgrade",">=",null,28]]}]},
						grS7p:{label:"S7",promote:[{tograde:"grS8",condition:[["onlock","or","global","internalgrade",">=",null,29]]}]},
						grS8:{label:"S8",promote:[{tograde:"grS8p",condition:[["onlock","or","global","internalgrade",">=",null,30]]}]},
						grS8p:{label:"S8",promote:[{tograde:"grS9",condition:[["onlock","or","global","internalgrade",">=",null,31]]}]},
						grS9:{label:"S9"}
					},
					{
						// Grandmaster grades -  Grades without labels are not shown, is shown the first available.
						gm0:{condition:[["onlock","or","global","level",">=",null,100]],promote:[{tograde:"gm1",condition:[["onlock","or","section","time","<=",null,65],["onlock","and","section","tetris",">=",null,2]]},{fail:true}]},
						gm1:{condition:[["onlock","or","global","level",">=",null,200]],promote:[{tograde:"gm2",condition:[["onlock","or","section","time","<=",null,65],["onlock","and","section","tetris",">=",null,2]]},{fail:true}]},
						gm2:{condition:[["onlock","or","global","level",">=",null,300]],promote:[{tograde:"gm3",condition:[["onlock","or","section","time","<=",null,65],["onlock","and","section","tetris",">=",null,2]]},{fail:true}]},
						gm3:{condition:[["onlock","or","global","level",">=",null,400]],promote:[{tograde:"gm4",condition:[["onlock","or","section","time","<=",null,65],["onlock","and","section","tetris",">=",null,2]]},{fail:true}]},
						gm4:{condition:[["onlock","or","global","level",">=",null,500]],promote:[{tograde:"gm5",condition:[["onlock","or","section","time","<=",null,65],["onlock","and","section","tetris",">=",null,2]]},{fail:true}]},
						
						gm5:{condition:[["onlock","or","global","level",">=",null,600]],promote:[{tograde:"gm6",condition:[["onlock","or","diffavgsection",["floor","time",0,1,2,3,4],"<=",null,2],["onlock","and","section","tetris",">=",null,1]]},{fail:true}]},
						gm6:{condition:[["onlock","or","global","level",">=",null,700]],promote:[{tograde:"gm7",condition:[["onlock","or","diffsection",["time",5],"<=",null,2],["onlock","and","section","tetris",">=",null,1]]},{fail:true}]},
						gm7:{condition:[["onlock","or","global","level",">=",null,800]],promote:[{tograde:"gm8",condition:[["onlock","or","diffsection",["time",6],"<=",null,2],["onlock","and","section","tetris",">=",null,1]]},{fail:true}]},
						gm8:{condition:[["onlock","or","global","level",">=",null,900]],promote:[{tograde:"gm9",condition:[["onlock","or","diffsection",["time",7],"<=",null,2],["onlock","and","section","tetris",">=",null,1]]},{fail:true}]},
						gm9:{condition:[["onlock","or","global","stagelabel","==",null,"roll"]],promote:[{tograde:"gmMroll",condition:[["onlock","or","diffsection",["time",8],"<=",null,2],[null,"and","overall","time","<=",null,strtime2secs("08:45:00")],[null,"and","global","gradelabel","==",null,"S9"]]},{fail:true}]},
						
						gmMroll:{gotostagelabel:"mroll",promote:[{tograde:"grMM",condition:[[null,"or","global","match","==",null,"fail"]]},{tograde:"grMV",condition:[[null,"or","global","match","==",null,"success"],[null,"and","section","lines","<",null,32]]},{tograde:"grMO",condition:[[null,"or","global","match","==",null,"success"],[null,"and","section","lines",">=",null,32]]}]},
						grMM:{label:"MM"},
						grMV:{label:"MV"},
						grMO:{label:"MO"}
					}
				]
			},
			tgm2death:{ // TGM2+ grading system - http://www.tetrisconcept.net/wiki/Tetris_The_Absolute_The_Grand_Master_2_PLUS
				starting:["none"],
				grades:[
					{ // Base series of grades
						none:{condition:[["onlock","or","global","level",">=",null,300]],promote:[{tograde:"grMM",condition:[["onlock","or","overall","time","<=",null,strtime2secs("03:25:00")]]},{fail:true}]},
						grMM:{label:"MM",promote:[{tograde:"grGm",condition:[["onlock","or","global","level",">=",null,999]]}]},
						grGm:{label:"Gm"}
					}
				]
			},
			// DEBUG
			debugtgm2death:{ // TGM2+ grading system - http://www.tetrisconcept.net/wiki/Tetris_The_Absolute_The_Grand_Master_2_PLUS
				starting:["none"],
				grades:[
					{ // Base series of grades
						none:{condition:[["onlock","or","global","level",">=",null,10]],promote:[{tograde:"grMM",condition:[["onlock","or","overall","time","<=",null,strtime2secs("00:30:00")]]},{fail:true}]},
						grMM:{label:"MM",promote:[{tograde:"grGm",condition:[["onlock","or","global","level",">=",null,46]]}]},
						grGm:{label:"Gm"}
					}
				]
			},
			debugtgm:{ // An Easier TGM grading system - for debug
				starting:["gr9","gm0"],
				grades:[
					{ // Base series of grades
						gr9:{label:"9",promote:[{tograde:"gr8",condition:[["onlock","or","overall","score",">=",null,1]]}]},
						gr8:{label:"8",promote:[{tograde:"gr7",condition:[["onlock","or","overall","score",">=",null,2]]}]},
						gr7:{label:"7",promote:[{tograde:"gr6",condition:[["onlock","or","overall","score",">=",null,3]]}]},
						gr6:{label:"6",promote:[{tograde:"gr5",condition:[["onlock","or","overall","score",">=",null,4]]}]},
						gr5:{label:"5",promote:[{tograde:"gr4",condition:[["onlock","or","overall","score",">=",null,5]]}]},
						gr4:{label:"4",promote:[{tograde:"gr3",condition:[["onlock","or","overall","score",">=",null,6]]}]},
						gr3:{label:"3",promote:[{tograde:"gr2",condition:[["onlock","or","overall","score",">=",null,7]]}]},
						gr2:{label:"2",promote:[{tograde:"gr1",condition:[["onlock","or","overall","score",">=",null,8]]}]},
						gr1:{label:"1",promote:[{tograde:"grS1",condition:[["onlock","or","overall","score",">=",null,9]]}]},
						grS1:{label:"S1",promote:[{tograde:"grS2",condition:[["onlock","or","overall","score",">=",null,10]]}]},
						grS2:{label:"S2",promote:[{tograde:"grS3",condition:[["onlock","or","overall","score",">=",null,11]]}]},
						grS3:{label:"S3",promote:[{tograde:"grS4",condition:[["onlock","or","overall","score",">=",null,12]]}]},
						grS4:{label:"S4",promote:[{tograde:"grS5",condition:[["onlock","or","overall","score",">=",null,13]]}]},
						grS5:{label:"S5",promote:[{tograde:"grS6",condition:[["onlock","or","overall","score",">=",null,14]]}]},
						grS6:{label:"S6",promote:[{tograde:"grS7",condition:[["onlock","or","overall","score",">=",null,15]]}]},
						grS7:{label:"S7",promote:[{tograde:"grS8",condition:[["onlock","or","overall","score",">=",null,16]]}]},
						grS8:{label:"S8",promote:[{tograde:"grS9",condition:[["onlock","or","overall","score",">=",null,17]]}]},
						grS9:{label:"S9"}
					},
					{
						// Grandmaster grades -  Grades without labels are not shown, is shown the first available.
						gm0:{condition:[["onlock","or","global","level",">=",null,5]],promote:[{tograde:"gm1",condition:[["onlock","or","overall","score",">=",null,0],["onlock","and","overall","time","<=",null,strtime2secs("00:10:00")]]},{fail:true}]},
						gm1:{condition:[["onlock","or","global","level",">=",null,10]],promote:[{tograde:"gm2",condition:[["onlock","or","overall","score",">=",null,1],["onlock","and","overall","time","<=",null,strtime2secs("07:30:00")]]},{fail:true}]},
						gm2:{condition:[["onlock","or","global","level",">=",null,15]],promote:[{tograde:"gm3",condition:[["onlock","or","overall","score",">=",null,2]]},{fail:true}]},
						gm3:{condition:[[null,"or","global","staffrolldone","==",null,1]],promote:[{tograde:"grGm", condition:[[null,"or","overall","time","<=",null,strtime2secs("01:20:00")]]},{fail:true}]},
						grGm:{label:"Gm"}
					}
				]
			},
			debugtgm2:{ // Easier tgm2 grading for debug.
				starting:["gr9","gm0"],
				grades:[
					{ // Base series of grades
						gr9:{label:"9",promote:[{tograde:"gr8",condition:[["onlock","or","global","internalgrade",">=",null,1]]}]},
						gr8:{label:"8",promote:[{tograde:"gr7",condition:[["onlock","or","global","internalgrade",">=",null,1]]}]},
						gr7:{label:"7",promote:[{tograde:"gr6",condition:[["onlock","or","global","internalgrade",">=",null,1]]}]},
						gr6:{label:"6",promote:[{tograde:"gr5",condition:[["onlock","or","global","internalgrade",">=",null,1]]}]},
						gr5:{label:"5",promote:[{tograde:"gr4",condition:[["onlock","or","global","internalgrade",">=",null,1]]}]},
						gr4:{label:"4",promote:[{tograde:"gr4p",condition:[["onlock","or","global","internalgrade",">=",null,1]]}]},
						gr4p:{label:"4",promote:[{tograde:"gr3",condition:[["onlock","or","global","internalgrade",">=",null,1]]}]},
						gr3:{label:"3",promote:[{tograde:"gr3p",condition:[["onlock","or","global","internalgrade",">=",null,1]]}]},
						gr3p:{label:"3",promote:[{tograde:"gr2",condition:[["onlock","or","global","internalgrade",">=",null,1]]}]},
						gr2:{label:"2",promote:[{tograde:"gr2p",condition:[["onlock","or","global","internalgrade",">=",null,1]]}]},
						gr2p:{label:"2",promote:[{tograde:"gr2pp",condition:[["onlock","or","global","internalgrade",">=",null,1]]}]},
						gr2pp:{label:"2",promote:[{tograde:"gr1",condition:[["onlock","or","global","internalgrade",">=",null,1]]}]},
						gr1:{label:"1",promote:[{tograde:"gr1p",condition:[["onlock","or","global","internalgrade",">=",null,1]]}]},
						gr1p:{label:"1",promote:[{tograde:"gr1pp",condition:[["onlock","or","global","internalgrade",">=",null,1]]}]},
						gr1pp:{label:"1",promote:[{tograde:"grS1",condition:[["onlock","or","global","internalgrade",">=",null,1]]}]},
						grS1:{label:"S1",promote:[{tograde:"grS1p",condition:[["onlock","or","global","internalgrade",">=",null,1]]}]},
						grS1p:{label:"S1",promote:[{tograde:"grS1pp",condition:[["onlock","or","global","internalgrade",">=",null,1]]}]},
						grS1pp:{label:"S1",promote:[{tograde:"grS2",condition:[["onlock","or","global","internalgrade",">=",null,1]]}]},
						grS2:{label:"S2",promote:[{tograde:"grS3",condition:[["onlock","or","global","internalgrade",">=",null,1]]}]},
						grS3:{label:"S3",promote:[{tograde:"grS4",condition:[["onlock","or","global","internalgrade",">=",null,1]]}]},
						grS4:{label:"S4",promote:[{tograde:"grS4p",condition:[["onlock","or","global","internalgrade",">=",null,1]]}]},
						grS4p:{label:"S4",promote:[{tograde:"grS4pp",condition:[["onlock","or","global","internalgrade",">=",null,1]]}]},
						grS4pp:{label:"S4",promote:[{tograde:"grS5",condition:[["onlock","or","global","internalgrade",">=",null,1]]}]},
						grS5:{label:"S5",promote:[{tograde:"grS5p",condition:[["onlock","or","global","internalgrade",">=",null,1]]}]},
						grS5p:{label:"S5",promote:[{tograde:"grS6",condition:[["onlock","or","global","internalgrade",">=",null,1]]}]},
						grS6:{label:"S6",promote:[{tograde:"grS6p",condition:[["onlock","or","global","internalgrade",">=",null,1]]}]},
						grS6p:{label:"S6",promote:[{tograde:"grS7",condition:[["onlock","or","global","internalgrade",">=",null,1]]}]},
						grS7:{label:"S7",promote:[{tograde:"grS7p",condition:[["onlock","or","global","internalgrade",">=",null,1]]}]},
						grS7p:{label:"S7",promote:[{tograde:"grS8",condition:[["onlock","or","global","internalgrade",">=",null,1]]}]},
						grS8:{label:"S8",promote:[{tograde:"grS8p",condition:[["onlock","or","global","internalgrade",">=",null,1]]}]},
						grS8p:{label:"S8",promote:[{tograde:"grS9",condition:[["onlock","or","global","internalgrade",">=",null,1]]}]},
						grS9:{label:"S9"}
					},
					{
						// Grandmaster grades -  Grades without labels are not shown, is shown the first available.
						gm0:{condition:[["onlock","or","global","level",">=",null,10]],promote:[{tograde:"gm1",condition:[["onlock","or","section","time","<=",null,65],["onlock","and","section","tetris",">=",null,1]]},{fail:true}]},
						gm1:{condition:[["onlock","or","global","level",">=",null,20]],promote:[{tograde:"gm2",condition:[["onlock","or","section","time","<=",null,65],["onlock","and","section","tetris",">=",null,0]]},{fail:true}]},
						gm2:{condition:[["onlock","or","global","level",">=",null,30]],promote:[{tograde:"gm3",condition:[["onlock","or","section","time","<=",null,65],["onlock","and","section","tetris",">=",null,0]]},{fail:true}]},
						gm3:{condition:[["onlock","or","global","level",">=",null,40]],promote:[{tograde:"gm4",condition:[["onlock","or","section","time","<=",null,65],["onlock","and","section","tetris",">=",null,0]]},{fail:true}]},
						gm4:{condition:[["onlock","or","global","level",">=",null,41]],promote:[{tograde:"gm5",condition:[["onlock","or","section","time","<=",null,65],["onlock","and","section","tetris",">=",null,0]]},{fail:true}]},
						
						gm5:{condition:[["onlock","or","global","level",">=",null,42]],promote:[{tograde:"gm6",condition:[["onlock","or","diffavgsection",["floor","time",0,1,2,3,4],"<=",null,20],["onlock","and","section","tetris",">=",null,0]]},{fail:true}]},
						gm6:{condition:[["onlock","or","global","level",">=",null,43]],promote:[{tograde:"gm7",condition:[["onlock","or","diffsection",["time",5],"<=",null,4],["onlock","and","section","tetris",">=",null,0]]},{fail:true}]},
						gm7:{condition:[["onlock","or","global","level",">=",null,44]],promote:[{tograde:"gm8",condition:[["onlock","or","diffsection",["time",6],"<=",null,4],["onlock","and","section","tetris",">=",null,0]]},{fail:true}]},
						gm8:{condition:[["onlock","or","global","level",">=",null,45]],promote:[{tograde:"gm9",condition:[["onlock","or","diffsection",["time",7],"<=",null,4],["onlock","and","section","tetris",">=",null,0]]},{fail:true}]},
						gm9:{condition:[["onlock","or","global","stagelabel","==",null,"roll"]],promote:[{tograde:"gmMroll",condition:[["onlock","or","diffsection",["time",8],"<=",null,10],[null,"and","overall","time","<=",null,strtime2secs("08:45:00")],[null,"and","global","gradelabel","==",null,"S9"]]},{fail:true}]},
						
						gmMroll:{gotostagelabel:"mroll",promote:[{tograde:"grMM",condition:[[null,"or","global","match","==",null,"fail"]]},{tograde:"grMV",condition:[[null,"or","global","match","==",null,"success"],[null,"and","section","lines","<",null,5]]},{tograde:"grMO",condition:[[null,"or","global","match","==",null,"success"],[null,"and","section","lines",">=",null,5]]}]},
						grMM:{label:"MM"},
						grMV:{label:"MV"},
						grMO:{label:"MO"}
						
					}
				]
			}
		};
		
block.internalgrades={ // Internal grading handler in TGM2 style - http://www.tetrisconcept.net/wiki/Tetris_The_Absolute_The_Grand_Master_2_PLUS
			tgm2:{
				nextgradeevery:100, // Nextr grade is reached every 100 Internal grade points.
				decay:[ // Decay rate of internal grade points (after these frames, if combo array is empty, internal grade points are decreased)
					125, 80, 80, 50, 45, 45, 45, 40, 40, 40,
					40, 40, 30, 30, 30, 20, 20, 20, 20, 20,
					15, 15, 15, 15, 15, 15, 15, 15, 15, 15,
					10, 10
				],
				score:[ // Score of single, double, triple and Tetris
					[ 10, 20, 40, 50 ],
					[ 10, 20, 30, 40 ],
					[ 10, 20, 30, 40 ],
					[ 10, 15, 30, 40 ],
					[ 10, 15, 20, 40 ],
					[  5, 15, 20, 30 ],
					[  5, 10, 20, 30 ],
					[  5, 10, 15, 30 ],
					[  5, 10, 15, 30 ],
					[  5, 10, 15, 30 ],
					[  2, 12, 13, 30 ] // and so on...	
				],
				combo:[ // Combo multipliers
					[1.0, 1.0,  1.0,  1],
					[1.2, 1.4,  1.5,  1],					
					[1.2, 1.5,  1.8,  1],
					[1.4, 1.6,  2.0,  1],
					[1.4, 1.7,  2.2,  1],
					[1.4, 1.8,  2.3,  1],
					[1.4, 1.9,  2.4,  1],
					[1.5, 2.0,  2.5,  1],
					[1.5, 2.1,  2.6,  1],
					[2.0, 2.5,  3.0,  1] // And so on...
				],
				level:[ // Level multipliers
					{level:249,mul:1},
					{level:499,mul:2},
					{level:749,mul:3},
					{level:999,mul:4} // And so on...
				]
			},
			debugtgm2:{
				nextgradeevery:20, // Nextr grade is reached every 100 Internal grade points.
				decay:[ // Decay rate of internal grade points (after these frames, if combo array is empty, internal grade points are decreased)
					125, 80, 80, 50, 45, 45, 45, 40, 40, 40,
					40, 40, 30, 30, 30, 20, 20, 20, 20, 20,
					15, 15, 15, 15, 15, 15, 15, 15, 15, 15,
					10, 10
				],
				score:[ // Score of single, double, triple and Tetris
					[ 10, 20, 40, 50 ],
					[ 10, 20, 30, 40 ],
					[ 10, 20, 30, 40 ],
					[ 10, 15, 30, 40 ],
					[ 10, 15, 20, 40 ],
					[  5, 15, 20, 30 ],
					[  5, 10, 20, 30 ],
					[  5, 10, 15, 30 ],
					[  5, 10, 15, 30 ],
					[  5, 10, 15, 30 ],
					[  2, 12, 13, 30 ] // and so on...	
				],
				combo:[ // Combo multipliers
					[1.0, 1.0,  1.0,  1],
					[1.2, 1.4,  1.5,  1],					
					[1.2, 1.5,  1.8,  1],
					[1.4, 1.6,  2.0,  1],
					[1.4, 1.7,  2.2,  1],
					[1.4, 1.8,  2.3,  1],
					[1.4, 1.9,  2.4,  1],
					[1.5, 2.0,  2.5,  1],
					[1.5, 2.1,  2.6,  1],
					[2.0, 2.5,  3.0,  1] // And so on...
				],
				level:[ // Level multipliers
					{level:249,mul:1},
					{level:499,mul:2},
					{level:749,mul:3},
					{level:999,mul:4} // And so on...
				]
			}
		};
		
block.roads={
			tetrisworlds:[ // Classic Tetris Worlds parameters - http://www.tetrisconcept.net/wiki/Tetris_Worlds
				{setup:{animation:{pause:true,type:"readygo",tileset:"readygo",tiles:[0,1],times:[1,1]}}},
				{setup:{gravity:0.01667},nextstage:[{condition:[["onlock","or","overall","lines",">=",null,10]]}]},
				{setup:{gravity:0.021017},nextstage:[{condition:[["onlock","or","overall","lines",">=",null,20]]}]},
				{setup:{gravity:0.026977},nextstage:[{condition:[["onlock","or","overall","lines",">=",null,30]]}]},
				{setup:{gravity:0.035256},nextstage:[{condition:[["onlock","or","overall","lines",">=",null,40]]}]},
				{setup:{gravity:0.04693},nextstage:[{condition:[["onlock","or","overall","lines",">=",null,50]]}]},
				{setup:{gravity:0.06361},nextstage:[{condition:[["onlock","or","overall","lines",">=",null,60]]}]},
				{setup:{gravity:0.0879},nextstage:[{condition:[["onlock","or","overall","lines",">=",null,70]]}]},
				{setup:{gravity:0.1236},nextstage:[{condition:[["onlock","or","overall","lines",">=",null,80]]}]},
				{setup:{gravity:0.1775},nextstage:[{condition:[["onlock","or","overall","lines",">=",null,90]]}]},
				{setup:{gravity:0.2598},nextstage:[{condition:[["onlock","or","overall","lines",">=",null,100]]}]},
				{setup:{gravity:0.388},nextstage:[{condition:[["onlock","or","overall","lines",">=",null,110]]}]},
				{setup:{gravity:0.59},nextstage:[{condition:[["onlock","or","overall","lines",">=",null,120]]}]},
				{setup:{gravity:0.92},nextstage:[{condition:[["onlock","or","overall","lines",">=",null,130]]}]},
				{setup:{gravity:1.46},nextstage:[{condition:[["onlock","or","overall","lines",">=",null,140]]}]},
				{setup:{gravity:2.36},nextstage:[{condition:[["onlock","or","overall","lines",">=",null,150]]}]},
				block.defaults. // Play forever
			],
			gameboy:[ // Classic Gameboy parameters - http://www.tetrisconcept.net/wiki/Tetris_%28Game_Boy%29
				{setup:{animation:{pause:true,type:"readygo",tileset:"readygo",tiles:[0,1],times:[1,1]}}},
				{setup:{gravity:fpc2g(53)},nextstage:[{condition:[["onlock","or","overall","lines",">=",null,10]]}]},
				{setup:{gravity:fpc2g(49)},nextstage:[{condition:[["onlock","or","overall","lines",">=",null,20]]}]},
				{setup:{gravity:fpc2g(45)},nextstage:[{condition:[["onlock","or","overall","lines",">=",null,30]]}]},
				{setup:{gravity:fpc2g(41)},nextstage:[{condition:[["onlock","or","overall","lines",">=",null,40]]}]},
				{setup:{gravity:fpc2g(37)},nextstage:[{condition:[["onlock","or","overall","lines",">=",null,50]]}]},
				{setup:{gravity:fpc2g(33)},nextstage:[{condition:[["onlock","or","overall","lines",">=",null,60]]}]},
				{setup:{gravity:fpc2g(28)},nextstage:[{condition:[["onlock","or","overall","lines",">=",null,70]]}]},
				{setup:{gravity:fpc2g(22)},nextstage:[{condition:[["onlock","or","overall","lines",">=",null,80]]}]},
				{setup:{gravity:fpc2g(17)},nextstage:[{condition:[["onlock","or","overall","lines",">=",null,90]]}]},
				{setup:{gravity:fpc2g(11)},nextstage:[{condition:[["onlock","or","overall","lines",">=",null,100]]}]},
				{setup:{gravity:fpc2g(10)},nextstage:[{condition:[["onlock","or","overall","lines",">=",null,110]]}]},
				{setup:{gravity:fpc2g(9)},nextstage:[{condition:[["onlock","or","overall","lines",">=",null,120]]}]},
				{setup:{gravity:fpc2g(8)},nextstage:[{condition:[["onlock","or","overall","lines",">=",null,130]]}]},
				{setup:{gravity:fpc2g(7)},nextstage:[{condition:[["onlock","or","overall","lines",">=",null,140]]}]},
				{setup:{gravity:fpc2g(6)},nextstage:[{condition:[["onlock","or","overall","lines",">=",null,150]]}]},
				{setup:{gravity:fpc2g(6)},nextstage:[{condition:[["onlock","or","overall","lines",">=",null,160]]}]},
				{setup:{gravity:fpc2g(5)},nextstage:[{condition:[["onlock","or","overall","lines",">=",null,170]]}]},
				{setup:{gravity:fpc2g(5)},nextstage:[{condition:[["onlock","or","overall","lines",">=",null,180]]}]},
				{setup:{gravity:fpc2g(4)},nextstage:[{condition:[["onlock","or","overall","lines",">=",null,190]]}]},
				{setup:{gravity:fpc2g(4)},nextstage:[{condition:[["onlock","or","overall","lines",">=",null,200]]}]},
				{setup:{gravity:fpc2g(3)},nextstage:[{condition:[["onlock","or","overall","lines",">=",null,210]]}]},
				block.defaults.playforever()
			],
			nes:[ // Classic NES parameters - http://www.tetrisconcept.net/wiki/Tetris_%28NES,_Nintendo%29
				{setup:{animation:{pause:true,type:"readygo",tileset:"readygo",tiles:[0,1],times:[1,1]}}},
				{setup:{gravity:fpc2g(48)},nextstage:[{condition:[["onlock","or","overall","lines",">=",null,10]]}]},
				{setup:{gravity:fpc2g(43)},nextstage:[{condition:[["onlock","or","overall","lines",">=",null,20]]}]},
				{setup:{gravity:fpc2g(38)},nextstage:[{condition:[["onlock","or","overall","lines",">=",null,30]]}]},
				{setup:{gravity:fpc2g(33)},nextstage:[{condition:[["onlock","or","overall","lines",">=",null,40]]}]},
				{setup:{gravity:fpc2g(28)},nextstage:[{condition:[["onlock","or","overall","lines",">=",null,50]]}]},
				{setup:{gravity:fpc2g(23)},nextstage:[{condition:[["onlock","or","overall","lines",">=",null,60]]}]},
				{setup:{gravity:fpc2g(18)},nextstage:[{condition:[["onlock","or","overall","lines",">=",null,70]]}]},
				{setup:{gravity:fpc2g(13)},nextstage:[{condition:[["onlock","or","overall","lines",">=",null,80]]}]},
				{setup:{gravity:fpc2g(8)},nextstage:[{condition:[["onlock","or","overall","lines",">=",null,90]]}]},
				{setup:{gravity:fpc2g(6)},nextstage:[{condition:[["onlock","or","overall","lines",">=",null,100]]}]},
				{setup:{gravity:fpc2g(5)},nextstage:[{condition:[["onlock","or","overall","lines",">=",null,110]]}]},
				{setup:{gravity:fpc2g(5)},nextstage:[{condition:[["onlock","or","overall","lines",">=",null,120]]}]},
				{setup:{gravity:fpc2g(5)},nextstage:[{condition:[["onlock","or","overall","lines",">=",null,130]]}]},
				{setup:{gravity:fpc2g(4)},nextstage:[{condition:[["onlock","or","overall","lines",">=",null,140]]}]},
				{setup:{gravity:fpc2g(4)},nextstage:[{condition:[["onlock","or","overall","lines",">=",null,150]]}]},
				{setup:{gravity:fpc2g(4)},nextstage:[{condition:[["onlock","or","overall","lines",">=",null,160]]}]},
				{setup:{gravity:fpc2g(3)},nextstage:[{condition:[["onlock","or","overall","lines",">=",null,170]]}]},
				{setup:{gravity:fpc2g(3)},nextstage:[{condition:[["onlock","or","overall","lines",">=",null,180]]}]},
				{setup:{gravity:fpc2g(3)},nextstage:[{condition:[["onlock","or","overall","lines",">=",null,190]]}]},
				{setup:{gravity:fpc2g(2)},nextstage:[{condition:[["onlock","or","overall","lines",">=",null,200]]}]},
				{setup:{gravity:fpc2g(2)},nextstage:[{condition:[["onlock","or","overall","lines",">=",null,210]]}]},
				{setup:{gravity:fpc2g(2)},nextstage:[{condition:[["onlock","or","overall","lines",">=",null,220]]}]},
				{setup:{gravity:fpc2g(2)},nextstage:[{condition:[["onlock","or","overall","lines",">=",null,230]]}]},
				{setup:{gravity:fpc2g(2)},nextstage:[{condition:[["onlock","or","overall","lines",">=",null,240]]}]},
				{setup:{gravity:fpc2g(2)},nextstage:[{condition:[["onlock","or","overall","lines",">=",null,250]]}]},
				{setup:{gravity:fpc2g(2)},nextstage:[{condition:[["onlock","or","overall","lines",">=",null,260]]}]},
				{setup:{gravity:fpc2g(2)},nextstage:[{condition:[["onlock","or","overall","lines",">=",null,270]]}]},
				{setup:{gravity:fpc2g(2)},nextstage:[{condition:[["onlock","or","overall","lines",">=",null,280]]}]},
				{setup:{gravity:fpc2g(2)},nextstage:[{condition:[["onlock","or","overall","lines",">=",null,290]]}]},
				{setup:{gravity:fpc2g(1)},nextstage:[{condition:[["onlock","or","overall","lines",">=",null,300]]}]},
				block.defaults.playforever()
			],
			
			segaeasy:[ // Sega tetris Easy - http://www.tetrisconcept.net/wiki/Tetris_%28Sega%29
				{setup:{animation:{pause:true,type:"readygo",tileset:"readygo",tiles:[0,1],times:[1,1]}}},
				{setup:{resettimers:true,gravity:fpc2g(48)},nextstage:[{condition:[["onlock","or","global","stagetimer",">=",null,14],["onlock","or","overall","tetris","!=","last","tetris"]]}]},
				{setup:{resettimers:true,gravity:fpc2g(32)},nextstage:[{condition:[["onlock","or","global","stagetimer",">=",null,9],["onlock","or","overall","tetris","!=","last","tetris"]]}]},
				{setup:{resettimers:true,gravity:fpc2g(24)},nextstage:[{condition:[["onlock","or","global","stagetimer",">=",null,9],["onlock","or","overall","tetris","!=","last","tetris"]]}]},
				{setup:{resettimers:true,gravity:fpc2g(18)},nextstage:[{condition:[["onlock","or","global","stagetimer",">=",null,9],["onlock","or","overall","tetris","!=","last","tetris"]]}]},
				{setup:{resettimers:true,gravity:fpc2g(14)},nextstage:[{condition:[["onlock","or","global","stagetimer",">=",null,9],["onlock","or","overall","tetris","!=","last","tetris"]]}]},
				{setup:{resettimers:true,gravity:fpc2g(12)},nextstage:[{condition:[["onlock","or","global","stagetimer",">=",null,9],["onlock","or","overall","tetris","!=","last","tetris"]]}]},
				{setup:{resettimers:true,gravity:fpc2g(10)},nextstage:[{condition:[["onlock","or","global","stagetimer",">=",null,9],["onlock","or","overall","tetris","!=","last","tetris"]]}]},
				{setup:{resettimers:true,gravity:fpc2g(8)},nextstage:[{condition:[["onlock","or","global","stagetimer",">=",null,9],["onlock","or","overall","tetris","!=","last","tetris"]]}]},
				{setup:{resettimers:true,gravity:fpc2g(6)},nextstage:[{condition:[["onlock","or","global","stagetimer",">=",null,9],["onlock","or","overall","tetris","!=","last","tetris"]]}]},
				{setup:{resettimers:true,gravity:fpc2g(4)},nextstage:[{condition:[["onlock","or","global","stagetimer",">=",null,14],["onlock","or","overall","tetris","!=","last","tetris"]]}]},
				{setup:{resettimers:true,gravity:fpc2g(12)},nextstage:[{condition:[["onlock","or","global","stagetimer",">=",null,14],["onlock","or","overall","tetris","!=","last","tetris"]]}]},
				{setup:{resettimers:true,gravity:fpc2g(10)},nextstage:[{condition:[["onlock","or","global","stagetimer",">=",null,9],["onlock","or","overall","tetris","!=","last","tetris"]]}]},
				{setup:{resettimers:true,gravity:fpc2g(8)},nextstage:[{condition:[["onlock","or","global","stagetimer",">=",null,9],["onlock","or","overall","tetris","!=","last","tetris"]]}]},
				{setup:{resettimers:true,gravity:fpc2g(6)},nextstage:[{condition:[["onlock","or","global","stagetimer",">=",null,9],["onlock","or","overall","tetris","!=","last","tetris"]]}]},
				{setup:{resettimers:true,gravity:fpc2g(4)},nextstage:[{condition:[["onlock","or","global","stagetimer",">=",null,9],["onlock","or","overall","tetris","!=","last","tetris"]]}]},
				{setup:{resettimers:true,gravity:fpc2g(2)},nextstage:[{condition:[["onlock","or","global","stagetimer",">=",null,14],["onlock","or","overall","tetris","!=","last","tetris"]]}]},
				block.defaults.playforever()
			],
			seganormal:[ // Sega tetris Normal - http://www.tetrisconcept.net/wiki/Tetris_%28Sega%29
				{setup:{animation:{pause:true,type:"readygo",tileset:"readygo",tiles:[0,1],times:[1,1]}}},
				{setup:{resettimers:true,gravity:fpc2g(48)},nextstage:[{condition:[["onlock","or","global","stagetimer",">=",null,14],["onlock","or","overall","tetris","!=","last","tetris"]]}]},
				{setup:{resettimers:true,gravity:fpc2g(24)},nextstage:[{condition:[["onlock","or","global","stagetimer",">=",null,9],["onlock","or","overall","tetris","!=","last","tetris"]]}]},
				{setup:{resettimers:true,gravity:fpc2g(18)},nextstage:[{condition:[["onlock","or","global","stagetimer",">=",null,9],["onlock","or","overall","tetris","!=","last","tetris"]]}]},
				{setup:{resettimers:true,gravity:fpc2g(15)},nextstage:[{condition:[["onlock","or","global","stagetimer",">=",null,9],["onlock","or","overall","tetris","!=","last","tetris"]]}]},
				{setup:{resettimers:true,gravity:fpc2g(12)},nextstage:[{condition:[["onlock","or","global","stagetimer",">=",null,9],["onlock","or","overall","tetris","!=","last","tetris"]]}]},
				{setup:{resettimers:true,gravity:fpc2g(10)},nextstage:[{condition:[["onlock","or","global","stagetimer",">=",null,9],["onlock","or","overall","tetris","!=","last","tetris"]]}]},
				{setup:{resettimers:true,gravity:fpc2g(8)},nextstage:[{condition:[["onlock","or","global","stagetimer",">=",null,9],["onlock","or","overall","tetris","!=","last","tetris"]]}]},
				{setup:{resettimers:true,gravity:fpc2g(6)},nextstage:[{condition:[["onlock","or","global","stagetimer",">=",null,9],["onlock","or","overall","tetris","!=","last","tetris"]]}]},
				{setup:{resettimers:true,gravity:fpc2g(4)},nextstage:[{condition:[["onlock","or","global","stagetimer",">=",null,9],["onlock","or","overall","tetris","!=","last","tetris"]]}]},
				{setup:{resettimers:true,gravity:fpc2g(2)},nextstage:[{condition:[["onlock","or","global","stagetimer",">=",null,14],["onlock","or","overall","tetris","!=","last","tetris"]]}]},
				{setup:{resettimers:true,gravity:fpc2g(10)},nextstage:[{condition:[["onlock","or","global","stagetimer",">=",null,14],["onlock","or","overall","tetris","!=","last","tetris"]]}]},
				{setup:{resettimers:true,gravity:fpc2g(8)},nextstage:[{condition:[["onlock","or","global","stagetimer",">=",null,9],["onlock","or","overall","tetris","!=","last","tetris"]]}]},
				{setup:{resettimers:true,gravity:fpc2g(6)},nextstage:[{condition:[["onlock","or","global","stagetimer",">=",null,9],["onlock","or","overall","tetris","!=","last","tetris"]]}]},
				{setup:{resettimers:true,gravity:fpc2g(4)},nextstage:[{condition:[["onlock","or","global","stagetimer",">=",null,9],["onlock","or","overall","tetris","!=","last","tetris"]]}]},
				{setup:{resettimers:true,gravity:fpc2g(2)},nextstage:[{condition:[["onlock","or","global","stagetimer",">=",null,9],["onlock","or","overall","tetris","!=","last","tetris"]]}]},
				{setup:{resettimers:true,gravity:fpc2g(1)},nextstage:[{condition:[["onlock","or","global","stagetimer",">=",null,14],["onlock","or","overall","tetris","!=","last","tetris"]]}]},
				block.defaults.playforever()
			],
			segahard:[ // Sega tetris Hard - http://www.tetrisconcept.net/wiki/Tetris_%28Sega%29
				{setup:{animation:{pause:true,type:"readygo",tileset:"readygo",tiles:[0,1],times:[1,1]}}},
				{setup:{resettimers:true,gravity:fpc2g(40)},nextstage:[{condition:[["onlock","or","global","stagetimer",">=",null,14],["onlock","or","overall","tetris","!=","last","tetris"]]}]},
				{setup:{resettimers:true,gravity:fpc2g(20)},nextstage:[{condition:[["onlock","or","global","stagetimer",">=",null,9],["onlock","or","overall","tetris","!=","last","tetris"]]}]},
				{setup:{resettimers:true,gravity:fpc2g(16)},nextstage:[{condition:[["onlock","or","global","stagetimer",">=",null,9],["onlock","or","overall","tetris","!=","last","tetris"]]}]},
				{setup:{resettimers:true,gravity:fpc2g(12)},nextstage:[{condition:[["onlock","or","global","stagetimer",">=",null,9],["onlock","or","overall","tetris","!=","last","tetris"]]}]},
				{setup:{resettimers:true,gravity:fpc2g(10)},nextstage:[{condition:[["onlock","or","global","stagetimer",">=",null,9],["onlock","or","overall","tetris","!=","last","tetris"]]}]},
				{setup:{resettimers:true,gravity:fpc2g(8)},nextstage:[{condition:[["onlock","or","global","stagetimer",">=",null,9],["onlock","or","overall","tetris","!=","last","tetris"]]}]},
				{setup:{resettimers:true,gravity:fpc2g(6)},nextstage:[{condition:[["onlock","or","global","stagetimer",">=",null,9],["onlock","or","overall","tetris","!=","last","tetris"]]}]},
				{setup:{resettimers:true,gravity:fpc2g(4)},nextstage:[{condition:[["onlock","or","global","stagetimer",">=",null,9],["onlock","or","overall","tetris","!=","last","tetris"]]}]},
				{setup:{resettimers:true,gravity:fpc2g(2)},nextstage:[{condition:[["onlock","or","global","stagetimer",">=",null,9],["onlock","or","overall","tetris","!=","last","tetris"]]}]},
				{setup:{resettimers:true,gravity:fpc2g(1)},nextstage:[{condition:[["onlock","or","global","stagetimer",">=",null,14],["onlock","or","overall","tetris","!=","last","tetris"]]}]},
				{setup:{resettimers:true,gravity:fpc2g(10)},nextstage:[{condition:[["onlock","or","global","stagetimer",">=",null,14],["onlock","or","overall","tetris","!=","last","tetris"]]}]},
				{setup:{resettimers:true,gravity:fpc2g(8)},nextstage:[{condition:[["onlock","or","global","stagetimer",">=",null,9],["onlock","or","overall","tetris","!=","last","tetris"]]}]},
				{setup:{resettimers:true,gravity:fpc2g(6)},nextstage:[{condition:[["onlock","or","global","stagetimer",">=",null,9],["onlock","or","overall","tetris","!=","last","tetris"]]}]},
				{setup:{resettimers:true,gravity:fpc2g(4)},nextstage:[{condition:[["onlock","or","global","stagetimer",">=",null,9],["onlock","or","overall","tetris","!=","last","tetris"]]}]},
				{setup:{resettimers:true,gravity:fpc2g(2)},nextstage:[{condition:[["onlock","or","global","stagetimer",">=",null,9],["onlock","or","overall","tetris","!=","last","tetris"]]}]},
				{setup:{resettimers:true,gravity:fpc2g(1)},nextstage:[{condition:[["onlock","or","global","stagetimer",">=",null,14],["onlock","or","overall","tetris","!=","last","tetris"]]}]},
				block.defaults.playforever()
			],
			segahardest:[ // Sega tetris Hardest - http://www.tetrisconcept.net/wiki/Tetris_%28Sega%29
				{setup:{animation:{pause:true,type:"readygo",tileset:"readygo",tiles:[0,1],times:[1,1]}}},
				{setup:{resettimers:true,gravity:fpc2g(30)},nextstage:[{condition:[["onlock","or","global","stagetimer",">=",null,14],["onlock","or","overall","tetris","!=","last","tetris"]]}]},
				{setup:{resettimers:true,gravity:fpc2g(15)},nextstage:[{condition:[["onlock","or","global","stagetimer",">=",null,9],["onlock","or","overall","tetris","!=","last","tetris"]]}]},
				{setup:{resettimers:true,gravity:fpc2g(12)},nextstage:[{condition:[["onlock","or","global","stagetimer",">=",null,9],["onlock","or","overall","tetris","!=","last","tetris"]]}]},
				{setup:{resettimers:true,gravity:fpc2g(10)},nextstage:[{condition:[["onlock","or","global","stagetimer",">=",null,9],["onlock","or","overall","tetris","!=","last","tetris"]]}]},
				{setup:{resettimers:true,gravity:fpc2g(8)},nextstage:[{condition:[["onlock","or","global","stagetimer",">=",null,9],["onlock","or","overall","tetris","!=","last","tetris"]]}]},
				{setup:{resettimers:true,gravity:fpc2g(6)},nextstage:[{condition:[["onlock","or","global","stagetimer",">=",null,9],["onlock","or","overall","tetris","!=","last","tetris"]]}]},
				{setup:{resettimers:true,gravity:fpc2g(4)},nextstage:[{condition:[["onlock","or","global","stagetimer",">=",null,9],["onlock","or","overall","tetris","!=","last","tetris"]]}]},
				{setup:{resettimers:true,gravity:fpc2g(2)},nextstage:[{condition:[["onlock","or","global","stagetimer",">=",null,9],["onlock","or","overall","tetris","!=","last","tetris"]]}]},
				{setup:{resettimers:true,gravity:fpc2g(1)},nextstage:[{condition:[["onlock","or","global","stagetimer",">=",null,9],["onlock","or","overall","tetris","!=","last","tetris"]]}]},
				{setup:{resettimers:true,gravity:fpc2g(1)},nextstage:[{condition:[["onlock","or","global","stagetimer",">=",null,14],["onlock","or","overall","tetris","!=","last","tetris"]]}]},
				{setup:{resettimers:true,gravity:fpc2g(8)},nextstage:[{condition:[["onlock","or","global","stagetimer",">=",null,14],["onlock","or","overall","tetris","!=","last","tetris"]]}]},
				{setup:{resettimers:true,gravity:fpc2g(6)},nextstage:[{condition:[["onlock","or","global","stagetimer",">=",null,9],["onlock","or","overall","tetris","!=","last","tetris"]]}]},
				{setup:{resettimers:true,gravity:fpc2g(4)},nextstage:[{condition:[["onlock","or","global","stagetimer",">=",null,9],["onlock","or","overall","tetris","!=","last","tetris"]]}]},
				{setup:{resettimers:true,gravity:fpc2g(2)},nextstage:[{condition:[["onlock","or","global","stagetimer",">=",null,9],["onlock","or","overall","tetris","!=","last","tetris"]]}]},
				{setup:{resettimers:true,gravity:fpc2g(1)},nextstage:[{condition:[["onlock","or","global","stagetimer",">=",null,9],["onlock","or","overall","tetris","!=","last","tetris"]]}]},
				{setup:{resettimers:true,gravity:fpc2g(1)},nextstage:[{condition:[["onlock","or","global","stagetimer",">=",null,14],["onlock","or","overall","tetris","!=","last","tetris"]]}]},
				block.defaults.playforever()
			],
			segaonl:[
				{setup:{animation:{pause:true,type:"readygo",tileset:"readygo",tiles:[0,1],times:[1,1]}}},
				{setup:{gravity:fpc2g(30)},nextstage:[{condition:[["onlock","or","overall","lines",">=",null,10]]}]},
				{setup:{gravity:fpc2g(15)},nextstage:[{condition:[["onlock","or","overall","lines",">=",null,20]]}]},
				{setup:{gravity:fpc2g(12)},nextstage:[{condition:[["onlock","or","overall","lines",">=",null,30]]}]},
				{setup:{gravity:fpc2g(10)},nextstage:[{condition:[["onlock","or","overall","lines",">=",null,40]]}]},
				{setup:{gravity:fpc2g(8)},nextstage:[{condition:[["onlock","or","overall","lines",">=",null,50]]}]},
				{setup:{gravity:fpc2g(6)},nextstage:[{condition:[["onlock","or","overall","lines",">=",null,60]]}]},
				{setup:{gravity:fpc2g(4)},nextstage:[{condition:[["onlock","or","overall","lines",">=",null,70]]}]},
				{setup:{gravity:fpc2g(2)},nextstage:[{condition:[["onlock","or","overall","lines",">=",null,80]]}]},
				{setup:{gravity:fpc2g(1)},nextstage:[{condition:[["onlock","or","overall","lines",">=",null,90]]}]},
				{setup:{gravity:fpc2g(1)},nextstage:[{condition:[["onlock","or","overall","lines",">=",null,100]]}]},
				{setup:{gravity:fpc2g(8)},nextstage:[{condition:[["onlock","or","overall","lines",">=",null,110]]}]},
				{setup:{gravity:fpc2g(6)},nextstage:[{condition:[["onlock","or","overall","lines",">=",null,120]]}]},
				{setup:{gravity:fpc2g(4)},nextstage:[{condition:[["onlock","or","overall","lines",">=",null,130]]}]},
				{setup:{gravity:fpc2g(2)},nextstage:[{condition:[["onlock","or","overall","lines",">=",null,140]]}]},
				{setup:{gravity:fpc2g(1)},nextstage:[{condition:[["onlock","or","overall","lines",">=",null,150]]}]},
				{setup:{},nextstage:[{condition:[]} // Play forever
			],
			tgm:[
				{setup:{forcedlinesevery:100,levelcap:999,animation:{pause:true,type:"readygo",tileset:"readygo",tiles:[0,1],times:[1,1]}}},
				{setup:{gravity:tgmg2g(4)},nextstage:[{condition:[["onlock","or","global","level",">=",null,30]]}]},
				{setup:{gravity:tgmg2g(6)},nextstage:[{condition:[["onlock","or","global","level",">=",null,35]]}]},
				{setup:{gravity:tgmg2g(8)},nextstage:[{condition:[["onlock","or","global","level",">=",null,40]]}]},
				{setup:{gravity:tgmg2g(10)},nextstage:[{condition:[["onlock","or","global","level",">=",null,50]]}]},
				{setup:{gravity:tgmg2g(12)},nextstage:[{condition:[["onlock","or","global","level",">=",null,60]]}]},
				{setup:{gravity:tgmg2g(16)},nextstage:[{condition:[["onlock","or","global","level",">=",null,70]]}]},
				{setup:{gravity:tgmg2g(32)},nextstage:[{condition:[["onlock","or","global","level",">=",null,80]]}]},
				{setup:{gravity:tgmg2g(48)},nextstage:[{condition:[["onlock","or","global","level",">=",null,90]]}]},
				{setup:{gravity:tgmg2g(64)},nextstage:[{condition:[["onlock","or","global","level",">=",null,100]]}]}, // In level based stages, 100th "level" is reachable only with line clears.
				{setup:{gravity:tgmg2g(80)},nextstage:[{condition:[["onlock","or","global","level",">=",null,120]]}]},
				{setup:{gravity:tgmg2g(96)},nextstage:[{condition:[["onlock","or","global","level",">=",null,140]]}]},
				{setup:{gravity:tgmg2g(112)},nextstage:[{condition:[["onlock","or","global","level",">=",null,160]]}]},
				{setup:{gravity:tgmg2g(128)},nextstage:[{condition:[["onlock","or","global","level",">=",null,170]]}]},
				{setup:{gravity:tgmg2g(144)},nextstage:[{condition:[["onlock","or","global","level",">=",null,200]]}]},
				{setup:{gravity:tgmg2g(4)},nextstage:[{condition:[["onlock","or","global","level",">=",null,220]]}]},
				{setup:{gravity:tgmg2g(32)},nextstage:[{condition:[["onlock","or","global","level",">=",null,230]]}]},
				{setup:{gravity:tgmg2g(64)},nextstage:[{condition:[["onlock","or","global","level",">=",null,233]]}]},
				{setup:{gravity:tgmg2g(128)},nextstage:[{condition:[["onlock","or","global","level",">=",null,236]]}]},
				{setup:{gravity:tgmg2g(160)},nextstage:[{condition:[["onlock","or","global","level",">=",null,239]]}]},
				{setup:{gravity:tgmg2g(192)},nextstage:[{condition:[["onlock","or","global","level",">=",null,243]]}]},
				{setup:{gravity:tgmg2g(224)},nextstage:[{condition:[["onlock","or","global","level",">=",null,247]]}]},
				{setup:{gravity:1},nextstage:[{condition:[["onlock","or","global","level",">=",null,251]]}]},
				{setup:{gravity:2},nextstage:[{condition:[["onlock","or","global","level",">=",null,300]]}]},
				{setup:{gravity:3},nextstage:[{condition:[["onlock","or","global","level",">=",null,360]]}]},
				{setup:{gravity:4},nextstage:[{condition:[["onlock","or","global","level",">=",null,400]]}]},
				{setup:{gravity:5},nextstage:[{condition:[["onlock","or","global","level",">=",null,420]]}]},
				{setup:{gravity:4},nextstage:[{condition:[["onlock","or","global","level",">=",null,450]]}]},
				{setup:{gravity:3},nextstage:[{condition:[["onlock","or","global","level",">=",null,500]]}]},
				{setup:{gravity:20},nextstage:[{condition:[["onlock","or","global","level",">=",null,999]]}]},
				{label:"roll",setup:{startstaffroll:"classic"},nextstage:[{condition:[[null,"or","global","staffrolldone","==",null,1]]}]}, // Wait the ending of the staffroll
				block.defaults.playforever()
			],
			tgm2normal:[ // Normal mode of TGM2+ - http://www.tetrisconcept.net/wiki/Tetris_The_Absolute_The_Grand_Master_2_PLUS
				{setup:{forcedlinesevery:100,levelcap:999,animation:{pause:true,type:"readygo",tileset:"readygo",tiles:[0,1],times:[1,1]}}},
				{setup:{gravity:tgmg2g(4)},nextstage:[{condition:[["onlock","or","global","level",">=",null,8]]}]},
				{setup:{gravity:tgmg2g(5)},nextstage:[{condition:[["onlock","or","global","level",">=",null,19]]}]},
				{setup:{gravity:tgmg2g(6)},nextstage:[{condition:[["onlock","or","global","level",">=",null,35]]}]},
				{setup:{gravity:tgmg2g(8)},nextstage:[{condition:[["onlock","or","global","level",">=",null,40]]}]},
				{setup:{gravity:tgmg2g(10)},nextstage:[{condition:[["onlock","or","global","level",">=",null,50]]}]},
				{setup:{gravity:tgmg2g(12)},nextstage:[{condition:[["onlock","or","global","level",">=",null,60]]}]},
				{setup:{gravity:tgmg2g(16)},nextstage:[{condition:[["onlock","or","global","level",">=",null,70]]}]},
				{setup:{gravity:tgmg2g(32)},nextstage:[{condition:[["onlock","or","global","level",">=",null,80]]}]},
				{setup:{gravity:tgmg2g(48)},nextstage:[{condition:[["onlock","or","global","level",">=",null,90]]}]},
				{setup:{gravity:tgmg2g(64)},nextstage:[{condition:[["onlock","or","global","level",">=",null,100]]}]}, // In level based stages, 100th "level" is reachable only with line clears.
				{setup:{gravity:tgmg2g(4)},nextstage:[{condition:[["onlock","or","global","level",">=",null,108]]}]},
				{setup:{gravity:tgmg2g(5)},nextstage:[{condition:[["onlock","or","global","level",">=",null,119]]}]},
				{setup:{gravity:tgmg2g(6)},nextstage:[{condition:[["onlock","or","global","level",">=",null,125]]}]},
				{setup:{gravity:tgmg2g(8)},nextstage:[{condition:[["onlock","or","global","level",">=",null,131]]}]},
				{setup:{gravity:tgmg2g(12)},nextstage:[{condition:[["onlock","or","global","level",">=",null,139]]}]},
				{setup:{gravity:tgmg2g(32)},nextstage:[{condition:[["onlock","or","global","level",">=",null,149]]}]},			
				{setup:{gravity:tgmg2g(48)},nextstage:[{condition:[["onlock","or","global","level",">=",null,156]]}]},
				{setup:{gravity:tgmg2g(80)},nextstage:[{condition:[["onlock","or","global","level",">=",null,164]]}]},
				{setup:{gravity:tgmg2g(112)},nextstage:[{condition:[["onlock","or","global","level",">=",null,174]]}]},
				{setup:{gravity:tgmg2g(128)},nextstage:[{condition:[["onlock","or","global","level",">=",null,180]]}]},
				{setup:{gravity:tgmg2g(144)},nextstage:[{condition:[["onlock","or","global","level",">=",null,200]]}]},
				{setup:{gravity:tgmg2g(16)},nextstage:[{condition:[["onlock","or","global","level",">=",null,212]]}]},
				{setup:{gravity:tgmg2g(48)},nextstage:[{condition:[["onlock","or","global","level",">=",null,221]]}]},
				{setup:{gravity:tgmg2g(80)},nextstage:[{condition:[["onlock","or","global","level",">=",null,232]]}]},
				{setup:{gravity:tgmg2g(112)},nextstage:[{condition:[["onlock","or","global","level",">=",null,244]]}]},
				{setup:{gravity:tgmg2g(144)},nextstage:[{condition:[["onlock","or","global","level",">=",null,256]]}]},
				{setup:{gravity:tgmg2g(176)},nextstage:[{condition:[["onlock","or","global","level",">=",null,267]]}]},
				{setup:{gravity:tgmg2g(192)},nextstage:[{condition:[["onlock","or","global","level",">=",null,277]]}]},
				{setup:{gravity:tgmg2g(208)},nextstage:[{condition:[["onlock","or","global","level",">=",null,287]]}]},
				{setup:{gravity:tgmg2g(224)},nextstage:[{condition:[["onlock","or","global","level",">=",null,295]]}]},
				{setup:{gravity:tgmg2g(240)},nextstage:[{condition:[["onlock","or","global","level",">=",null,300]]}]},
				{label:"roll",setup:{gravity:20,startstaffroll:"classic",clearongameover:true},condition:[[null,"or","global","staffrolldone","==",null,1]]}]},
				block.defaults.gameclear()
			],
			tgm2master:[
				{setup:{forcedlinesevery:100,levelcap:999,animation:{pause:true,type:"readygo",tileset:"readygo",tiles:[0,1],times:[1,1]}}},
				{setup:{gravity:tgmg2g(4),are:25,das:14,initialdas:14,lockdelay:30,linecleardelay:25},nextstage:[{condition:[["onlock","or","global","level",">=",null,30]]}]},
				{setup:{gravity:tgmg2g(6)},nextstage:[{condition:[["onlock","or","global","level",">=",null,35]]}]},
				{setup:{gravity:tgmg2g(8)},nextstage:[{condition:[["onlock","or","global","level",">=",null,40]]}]},
				{setup:{gravity:tgmg2g(10)},nextstage:[{condition:[["onlock","or","global","level",">=",null,50]]}]},
				{setup:{gravity:tgmg2g(12)},nextstage:[{condition:[["onlock","or","global","level",">=",null,60]]}]},
				{setup:{gravity:tgmg2g(16)},nextstage:[{condition:[["onlock","or","global","level",">=",null,70]]}]},
				{setup:{gravity:tgmg2g(32)},nextstage:[{condition:[["onlock","or","global","level",">=",null,80]]}]},
				{setup:{gravity:tgmg2g(48)},nextstage:[{condition:[["onlock","or","global","level",">=",null,90]]}]},
				{setup:{gravity:tgmg2g(64)},nextstage:[{condition:[["onlock","or","global","level",">=",null,100]]}]}, // In level based stages, 100th "level" is reachable only with line clears.
				{setup:{gravity:tgmg2g(80)},nextstage:[{condition:[["onlock","or","global","level",">=",null,120]]}]},
				{setup:{gravity:tgmg2g(96)},nextstage:[{condition:[["onlock","or","global","level",">=",null,140]]}]},
				{setup:{gravity:tgmg2g(112)},nextstage:[{condition:[["onlock","or","global","level",">=",null,160]]}]},
				{setup:{gravity:tgmg2g(128)},nextstage:[{condition:[["onlock","or","global","level",">=",null,170]]}]},
				{setup:{gravity:tgmg2g(144)},nextstage:[{condition:[["onlock","or","global","level",">=",null,200]]}]},
				{setup:{gravity:tgmg2g(4)},nextstage:[{condition:[["onlock","or","global","level",">=",null,220]]}]},
				{setup:{gravity:tgmg2g(32)},nextstage:[{condition:[["onlock","or","global","level",">=",null,230]]}]},
				{setup:{gravity:tgmg2g(64)},nextstage:[{condition:[["onlock","or","global","level",">=",null,233]]}]},
				{setup:{gravity:tgmg2g(128)},nextstage:[{condition:[["onlock","or","global","level",">=",null,236]]}]},
				{setup:{gravity:tgmg2g(160)},nextstage:[{condition:[["onlock","or","global","level",">=",null,239]]}]},
				{setup:{gravity:tgmg2g(192)},nextstage:[{condition:[["onlock","or","global","level",">=",null,243]]}]},
				{setup:{gravity:tgmg2g(224)},nextstage:[{condition:[["onlock","or","global","level",">=",null,247]]}]},
				{setup:{gravity:1},nextstage:[{condition:[["onlock","or","global","level",">=",null,251]]}]},
				{setup:{gravity:2},nextstage:[{condition:[["onlock","or","global","level",">=",null,300]]}]},
				{setup:{gravity:3},nextstage:[{condition:[["onlock","or","global","level",">=",null,360]]}]},
				{setup:{gravity:4},nextstage:[{condition:[["onlock","or","global","level",">=",null,400]]}]},
				{setup:{gravity:5},nextstage:[{condition:[["onlock","or","global","level",">=",null,420]]}]},
				{setup:{gravity:4},nextstage:[{condition:[["onlock","or","global","level",">=",null,450]]}]},
				{setup:{gravity:3},nextstage:[{condition:[["onlock","or","global","level",">=",null,500]]}]},
				{setup:{gravity:20,are:25,das:8,lockdelay:30,linecleardelay:0},nextstage:[{condition:[["onlock","or","global","level",">=",null,600]]}]},	
				{setup:{are:25,das:8,initialdas:8,lockdelay:30,linecleardelay:0},nextstage:[{condition:[["onlock","or","global","level",">=",null,700]]}]},
				{setup:{are:16,das:8,initialdas:8,lockdelay:30,linecleardelay:0},nextstage:[{condition:[["onlock","or","global","level",">=",null,800]]}]},
				{setup:{are:12,das:8,initialdas:8,lockdelay:30,linecleardelay:0},nextstage:[{condition:[["onlock","or","global","level",">=",null,900]]}]},
				{setup:{are:12,das:6,initialdas:6,lockdelay:30,linecleardelay:0},nextstage:[{condition:[["onlock","or","global","level",">=",null,901]]}]},
				{setup:{are:12,das:6,initialdas:6,lockdelay:17,linecleardelay:0},nextstage:[{condition:[["onlock","or","global","level",">=",null,999]]}]},
				{label:"roll",setup:{startstaffroll:"classic"},nextstage:[{condition:[[null,"or","global","staffrolldone","==",null,1]]}]}, // Wait the ending of the staffroll
				block.defaults.gameclear(),
				{label:"mroll",setup:{initfield:true,vanishspeed:5,drawborder:"",startstaffroll:"mroll"},nextstage:[{condition:[[null,"or","global","staffrolldone","==",null,1]]}]}, // Wait the ending of the staffroll
				block.defaults.gameclear()
			],
			tgm2death:[
				{setup:{forcedlinesevery:100,levelcap:999,animation:{pause:true,type:"readygo",tileset:"readygo",tiles:[0,1],times:[1,1]}}},
				{setup:{gravity:20,are:16,das:10,initialdas:10,lockdelay:30,linecleardelay:0},nextstage:[{condition:[["onlock","or","global","level",">=",null,100]]}]},
				{setup:{are:12,das:10,initialdas:10,lockdelay:26},nextstage:[{condition:[["onlock","or","global","level",">=",null,200]]}]},
				{setup:{are:12,das:9,initialdas:9,lockdelay:26},nextstage:[{condition:[["onlock","or","global","level",">=",null,201]]}]},
				{setup:{are:12,das:9,initialdas:9,lockdelay:22},nextstage:[{condition:[["onlock","or","global","level",">=",null,300]]}]},
				{setup:{are:12,das:8,initialdas:8,lockdelay:22},nextstage:[{condition:[["onlock","or","global","level",">=",null,301]]}]},
				{setup:{are:6,das:8,initialdas:8,lockdelay:18},nextstage:[{condition:[["onlock","or","global","level",">=",null,400]]}]},
				{setup:{are:5,das:6,initialdas:6,lockdelay:18},nextstage:[{condition:[["onlock","or","global","level",">=",null,401]]}]},
				{setup:{are:5,das:6,initialdas:6,lockdelay:15},nextstage:[{gotostagelabel:"roll",condition:[["onlock","or","global","level",">=",null,500],["onlock","and","data","torikan","==",null,1]]},{condition:[["onlock","or","global","level",">=",null,500],["onlock","and","data","torikan","!=",null,1]]}]}, // 501-999 stages are available only if not torikan-ed (see block.torikans)
				{setup:{are:4,das:6,initialdas:6,lockdelay:15},nextstage:[{condition:[["onlock","or","global","level",">=",null,999]]}]},
				{label:"roll",setup:{startstaffroll:"classic"},nextstage:[{condition:[[null,"or","global","staffrolldone","==",null,1]]}]}, // Wait the ending of the staffroll
				block.defaults.gameclear()
			],
			
			// DEBUG VERSION OF ROADS
			debugtgm2death:[
				{setup:{forcedlinesevery:10,levelcap:46,animation:{pause:true,type:"readygo",tileset:"readygo",tiles:[0,1],times:[1,1]}}},			
				{setup:{gravity:0.001,are:16,das:10,initialdas:10,lockdelay:30,linecleardelay:0},nextstage:[{condition:[["onlock","or","global","level",">=",null,10]]}]},
				{setup:{are:12,das:10,initialdas:10,lockdelay:26},nextstage:[{condition:[["onlock","or","global","level",">=",null,20]]}]},
				{setup:{are:12,das:9,initialdas:9,lockdelay:26},nextstage:[{condition:[["onlock","or","global","level",">=",null,21]]}]},
				
				{setup:{are:12,das:9,initialdas:9,lockdelay:22},nextstage:[{gotostagelabel:"roll",condition:[["onlock","or","global","level",">=",null,30],["onlock","and","data","torikan","==",null,1]]},{condition:[["onlock","or","global","level",">=",null,30],["onlock","and","data","torikan","!=",null,1]]}]}, // 501-999 stages are available only if not torikan-ed (see block.torikans) 
				
				
				{setup:{are:12,das:8,initialdas:8,lockdelay:22},nextstage:[{condition:[["onlock","or","global","level",">=",null,31]]}]},
				{setup:{are:4,das:6,initialdas:6,lockdelay:15},nextstage:[{condition:[["onlock","or","global","level",">=",null,46]]}]},
				{label:"roll",setup:{startstaffroll:"classic"},nextstage:[{condition:[[null,"or","global","staffrolldone","==",null,1]]}]}, // Wait the ending of the staffroll
				block.defaults.gameclear()
			],
			debugtgm2master:[
				{setup:{forcedlinesevery:10,levelcap:46,animation:{pause:true,type:"readygo",tileset:"readygo",tiles:[0,1],times:[1,1]}}},
				{setup:{gravity:tgmg2g(4),are:25,das:14,initialdas:14,lockdelay:30,linecleardelay:25},nextstage:[{condition:[["onlock","or","global","level",">=",null,10]]}]},
				{setup:{gravity:tgmg2g(6)},nextstage:[{condition:[["onlock","or","global","level",">=",null,20]]}]},
				{setup:{gravity:tgmg2g(8)},nextstage:[{condition:[["onlock","or","global","level",">=",null,30]]}]},
				{setup:{gravity:tgmg2g(11),are:25,das:8,lockdelay:30,linecleardelay:0},nextstage:[{condition:[["onlock","or","global","level",">=",null,40]]}]},	
				{setup:{are:12,das:6,initialdas:6,lockdelay:17,linecleardelay:0},nextstage:[{condition:[["onlock","or","global","level",">=",null,46]]}]},
				{label:"roll",setup:{startstaffroll:"classic"},nextstage:[{condition:[[null,"or","global","staffrolldone","==",null,1]]}]}, // Wait the ending of the staffroll
				block.defaults.gameclear(),
				{label:"mroll",setup:{initfield:true,vanishspeed:10,drawborder:"",startstaffroll:"mroll"},nextstage:[{condition:[[null,"or","global","staffrolldone","==",null,1]]}]}, // Wait the ending of the staffroll
				block.defaults.gameclear(),
				
			],
			debugtgm:[ // TGM - short version for debugging
				{setup:{forcedlinesevery:10,levelcap:46,animation:{pause:true,type:"readygo",tileset:"readygo",tiles:[0,1],times:[1,1]}}},
				{setup:{gravity:tgmg2g(4)},nextstage:[{condition:[["onlock","or","global","level",">=",null,10]]}]},
				{setup:{gravity:tgmg2g(6)},nextstage:[{condition:[["onlock","or","global","level",">=",null,20]]}]},
				{setup:{gravity:tgmg2g(8)},nextstage:[{condition:[["onlock","or","global","level",">=",null,30]]}]},
				{setup:{gravity:tgmg2g(10)},nextstage:[{condition:[["onlock","or","global","level",">=",null,46]]}]},
				{label:"roll",setup:{startstaffroll:"classic"},nextstage:[{condition:[[null,"or","global","staffrolldone","==",null,1]]}]}, // Wait the ending of the staffroll
				block.defaults.gameclear()
			],
		};
		
		
		// name: 0: bag | 1: bag count | 2: history size | 3: starting history | 4: history tries
block.nextmodels={
		  debugi:{bag:"0",bagscount:0,history:0,starting:"",tries:"unlimited",first:""}, // ever I
		  debugt:{bag:"1",bagscount:0,history:0,starting:"",tries:"unlimited",first:""}, // ever T
		  debugl:{bag:"2",bagscount:0,history:0,starting:"",tries:"unlimited",first:""}, // ever L
		  debugj:{bag:"3",bagscount:0,history:0,starting:"",tries:"unlimited",first:""}, // ever I
		  
		  // Random based
		  memoryless:{bag:"0123456",bagscount:0,history:0,starting:"",tries:"unlimited",first:""},
		  memorylessdifficult:{bag:"00333222666555111444",bagscount:0,history:0,starting:"",tries:"unlimited",first:""},
		  zs:{bag:"45",bagscount:0,history:0,starting:"",tries:"unlimited",first:""},
		  memorylesspoweron:{bag:"0123456",bagscount:0,history:0,starting:"",tries:"unlimited",poweron:"0326514"},
		  
		  // History based
		  movetoback:{bag:"0123456",bagscount:0,history:4,starting:"",tries:"unlimited",first:""},
		  zsalternating:{bag:"45",bagscount:0,history:1,starting:"",tries:"unlimited",first:""},
		  
		  // History based with starting history and roll count
		  tgm1:{bag:"0123456",bagscount:0,history:4,starting:"4444",tries:4,first:"0321"},
		  tgm23:{bag:"0123456",bagscount:0,history:4,starting:"4545",tries:6,first:"0321"},
		  
		  // bags based
		  lardarse:{bag:"01332266555444",bagscount:5},
		  randomgenerator:{bag:"0123456",bagscount:7},
		  m14piece:{bag:"00112233445566",bagscount:14},
		  m14piecehalf:{bag:"00112233445566",bagscount:7}
		};
		
		
		// CUSTOM: SCORE (also check for backtoback and combo and falling.immobilespins value)
	block.lines=function(th,linedata) {
		  var m=0;
		  switch (th.config.score.style) {
			case "tds": { // Tetris DS scoring - http://www.tetrisconcept.net/wiki/Tetris_DS
				var base=th.stage+linedata.height;
				switch (linedata.cnt) {
					case 0:{
						if (th.falling.spins)
							if (th.falling.kicked) m=100; else m=400;
						break;
					}
					case 1:{
						if (th.falling.spins)
							if (th.falling.kicked) m=200; else m=800;
						else m=100;
					}
					case 2:{
						if (th.falling.spins) m=1200;
						else m=300;
					}
					case 3:{
						if (th.falling.spins) m=1600;
						else m=500;
					}
					default:{
						m=800;
						break;
					}
				}
				if (m) this.addscore(th,(base*m*(th.backtoback>1?3/2:1))+(th.falling.softdrop)+(th.falling.harddrop*2));
				break;
			}
			case "nintendo": { // Original Nintendo scoring system - http://www.tetrisconcept.net/wiki/Scoring 
			  switch (linedata.cnt) {
				case 1: { m=40; break}
				case 2: { m=100; break}
				case 3: { m=300; break}
				case 4: { m=1200; break}
				default: {m=0;}
			  }
			  if (m) this.addscore(th,(m*(th.stage+1))+(th.falling.softdrop)+(th.falling.harddrop*2));
			  break;
			}
			case "tgm": { // TGM scoring system - http://www.tetrisconcept.net/wiki/Tetris_The_Grand_Master
			  if (linedata.cnt) {
			  	var combo=1;
			  	for (var i=0;i<th.combo.length;i++) // Calculates combo
			  		combo+=(th.combo[i]*2)-2;
			  	this.addscore(th,(Math.ceil((th.level+linedata.cnt)/4)+th.falling.softdrop)*linedata.cnt*combo*(linedata.bravo?4:1));
			  }
			  break;
			}
			case "tgm2":{ // TGM2 scoring system - http://www.tetrisconcept.net/wiki/Tetris_The_Absolute_The_Grand_Master_2_PLUS
			 if (linedata.cnt) {
			  	var combo=1;
			  	for (var i=0;i<th.combo.length;i++) // Calculates combo
			  		combo+=(th.combo[i]*2)-2;
			  	this.addscore(th,((Math.ceil((th.level+linedata.cnt)/4)+th.falling.softdrop)*linedata.cnt*combo*(linedata.bravo?4:1))+Math.ceil(this.getcappedlevel(th,th.level+linedata.cnt)/2)+((th.falling.activetime-th.config.timing.lockdelay)*7));
			  }
			  break;
			}
		  }
		},
	
block.setgarbageconfig=function(th,gset) {
			th.config.gfx.blits.push({type:"label",text:gset,dx:-8,dy:-40,font:"small"});
			switch (gset) {
				case "test-srs-immobleonlyspin": { // SRS TESTED (for tetris worlds) - http://www.tetrisconcept.net/wiki/SRS
					th.config.gfx.blits.push({type:"debug",dx:-105,dy:150,font:"_dbf"});		
					this.pushline(th,[null,null,null,null,null,null,0,0,null,null]);
					this.pushline(th,[0,0,0,0,null,null,null,0,0,0]);
					this.pushline(th,[0,0,0,0,null,null,0,0,0,0]);
					th.config.control.spinevaluator="all";
					th.config.next.randomizer="debugt";
					break;
				}
				case "test-srs-tspin-nokick": { // SRS TESTED (also valid for sega rotation system) - http://www.tetrisconcept.net/wiki/SRS
					th.config.gfx.blits.push({type:"debug",dx:-105,dy:150,font:"_dbf"});		
					this.pushline(th,[null,null,null,null,null,null,0,0,null,null]);
					this.pushline(th,[0,0,0,0,null,null,null,0,0,0]);
					this.pushline(th,[0,0,0,0,0,null,0,0,0,0]);
					th.config.control.spinevaluator="all";
					th.config.next.randomizer="debugt";
					break;
				}
				case "test-tripletspin": { // SRS TESTED - http://www.youtube.com/watch?v=7x7CLknMMMQ
					th.config.gfx.blits.push({type:"debug",dx:-105,dy:150,font:"_dbf"});		
					this.pushline(th,[null,null,0,0,0,0,0,0,0,0]);
					this.pushline(th,[null,null,null,0,0,0,0,0,0,0]);
					this.pushline(th,[0,0,null,0,0,0,0,0,0,0]);
					this.pushline(th,[0,null,null,0,0,0,0,0,0,0]);
					this.pushline(th,[0,0,null,0,0,0,0,0,0,0]);
					this.pushline(th,[0,0,null,0,0,0,0,0,0,0]);
					th.config.control.spinevaluator="all";
					th.config.next.randomizer="debugt";
					break;
				}
				case "test-srs-lspin": { // SRS TESTED - http://www.tetrisconcept.net/wiki/SRS
					th.config.gfx.blits.push({type:"debug",dx:-105,dy:150,font:"_dbf"});		
					this.pushline(th,[null,null,null,null,0,0,0,null,null,null]);
					this.pushline(th,[null,null,null,null,null,0,0,0,null,null]);
					this.pushline(th,[null,null,null,null,null,null,0,0,0,0]);
					this.pushline(th,[null,0,0,0,null,null,null,0,0,0]);
					this.pushline(th,[0,0,null,null,null,null,0,0,0,0]);
					this.pushline(th,[0,0,0,0,null,null,0,0,0,0]);
					this.pushline(th,[0,0,0,0,0,null,0,0,0,0]);
					th.config.control.spinevaluator="all";
					th.config.next.randomizer="debugl";
					break;
				}
				case "test-tds-depth": { // Depth of Tetris DS is very high - http://www.tetrisconcept.net/wiki/Tetris_DS
					th.config.gfx.blits.push({type:"debug",dx:-105,dy:150,font:"_dbf"});		
					for (var i=0;i<30;i++)
						this.pushline(th,[0,null,null,null,null,null,null,null,null,0]);
					th.config.next.randomizer="debugi";	
					break;
				}
				case "test-sega-ceiling": { // Sega tetris has ceiling. I cannot rotate at starting. vanisnhinglines counts too! - http://www.tetrisconcept.net/wiki/Tetris_%28Sega%29
					th.config.gfx.blits.push({type:"debug",dx:-105,dy:150,font:"_dbf"});		
					th.config.field.ceiling=true;
					th.config.next.randomizer="debugi";	
					break;
				}
				case "test-sega-twist": { // An I-Twist example. Turn the I before locking - http://www.tetrisconcept.net/wiki/Tetris_%28Sega%29_Techniques
					th.config.gfx.blits.push({type:"debug",dx:-105,dy:150,font:"_dbf"});		
					th.config.next.randomizer="debugi";	
					this.pushline(th,[0,0,0,0,0,null,0,0,0,0]);
					this.pushline(th,[0,0,0,null,null,null,null,0,0,0]);
					this.pushline(th,[0,0,0,0,0,null,0,0,0,0]);
					this.pushline(th,[0,0,0,0,0,null,0,0,0,0]);
				
					break;
				}
				case "test-ars-tescape": { // The T escape tecnique is only applicable in TGM3 ARS - http://www.tetrisconcept.net/wiki/TGM_rotation
					th.config.gfx.blits.push({type:"debug",dx:-105,dy:150,font:"_dbf"});		
					th.config.next.randomizer="debugt";	
					this.pushline(th,[0,null,null,null,null,null,null,null,null,null]);
					this.pushline(th,[0,null,null,null,null,null,null,null,null,null]);
					this.pushline(th,[0,0,null,0,0,0,0,0,0,0]);
				
					break;
				}
				case "test-ars-mihara-l": { // The L rotation - http://www.tetrisconcept.net/wiki/TGM_rotation
					th.config.gfx.blits.push({type:"debug",dx:-105,dy:150,font:"_dbf"});		
					th.config.next.randomizer="debugl";	
					this.pushline(th,[0,null,null,null,0,0,0,null,null,null]);
					this.pushline(th,[0,null,null,null,0,0,0,null,null,null]);
					this.pushline(th,[0,null,null,null,null,null,0,null,null,null]);
					this.pushline(th,[0,null,0,null,0,0,0,0,null,null]);
					this.pushline(th,[0,0,0,0,0,0,0,0,0,null]);
					this.pushline(th,[0,0,0,0,0,0,0,0,0,null]);
				
					break;
				}
				case "test-ars-mihara-j": { // The failing J rotation - http://www.tetrisconcept.net/wiki/TGM_rotation
					th.config.gfx.blits.push({type:"debug",dx:-105,dy:150,font:"_dbf"});		
					th.config.next.randomizer="debugj";	
					this.pushline(th,[null,null,null,0,0,0,null,null,null,0]);
					this.pushline(th,[null,null,null,0,0,0,null,null,null,0]);
					this.pushline(th,[null,null,null,0,null,null,null,null,null,0]);
					this.pushline(th,[null,null,0,0,0,0,null,0,null,0]);
					this.pushline(th,[null,0,0,0,0,0,0,0,0,0]);
					this.pushline(th,[null,0,0,0,0,0,0,0,0,0]);
					break;
				}
				case "test-bravo": { // Bravo detection (field clear) - http://www.tetrisconcept.net/wiki/Glossary#B
					th.config.gfx.blits.push({type:"debug",dx:-105,dy:150,font:"_dbf"});		
					this.pushline(th,[0,0,0,0,null,null,null,0,0,0]);
					this.pushline(th,[0,0,0,0,0,null,0,0,0,0]);
					th.config.next.randomizer="debugt";
					break;
				}
				case "test-tgm-combo": { // Combo score: 3, 7, 7 - http://www.tetrisconcept.net/wiki/Tetris_The_Grand_Master
					th.config.gfx.blits.push({type:"debug",dx:-105,dy:150,font:"_dbf"});		
					th.config.next.randomizer="debugi";
					this.pushline(th,[null,0,0,0,0,0,0,0,0,0]);
					this.pushline(th,[null,0,0,0,0,0,0,0,0,0]);				
					this.pushline(th,[0,0,0,0,0,0,0,0,0,null]);
					this.pushline(th,[0,0,0,0,0,0,0,0,0,null]);				
					this.pushline(th,[0,0,0,0,0,0,0,0,0,null]);
					this.pushline(th,[0,null,0,0,0,0,0,0,0,0]);				
					this.pushline(th,[0,0,0,0,0,null,0,0,0,0]);
					this.pushline(th,[0,0,0,0,0,null,0,0,0,0]);	
					break;
				}
				case "test-tgm-debug":{ // Simplified grading/levels system for testing. End in 01:20 (use hard drops) and do at least 5 lines for GM grade. Wait a bit while blocks are falling to fail last GM check.
					th.config.gfx.blits.push({type:"debug",dx:-105,dy:150,font:"_dbf"});		
					th.config.score.grading="debugtgm";
					th.config.score.gamemode="debugtgm";
					th.config.gfx.blits.push({type:"allstats",dx:-105,dy:20,font:"_dbf"});		
					th.config.gfx.blits.push({type:"debug",dx:-105,dy:150,font:"_dbf"});		
					/*
					th.config.gfx.blits.push({ifgrading:true,type:"dump",label:"grading",dx:-90,dy:50,font:"small"});
					th.config.gfx.blits.push({ifgrading:true,type:"dump",label:"gradelabels",dx:-90,dy:90,font:"small"});
					th.config.gfx.blits.push({ifgrading:true,type:"label",label:"gradelabel",dx:-90,dy:130,font:"small"});
					th.config.gfx.blits.push({ifgrading:true,type:"label",label:"gradeid",dx:-50,dy:130,font:"small"});
					*/
					break;
				}
				case "test-tgm2master-debug": {  // Simplified tgm2  master mode for testing. 
					//th.config.gfx.blits.push({type:"debug",dx:-105,dy:150,font:"_dbf"});		
					th.config.score.gamemode="debugtgm2master";
					th.config.score.sectionmarks="debugtgm2master";
					th.config.score.internalgrade="debugtgm2";
					th.config.score.grading="debugtgm2";
					th.config.score.medals="debugtgm2";
				  	th.config.score.blocksforcritical=50; // Easy recovery medal
				  	th.config.score.blocksforrecovery=30;
					
					th.config.gfx.blits.push({type:"allstats",dx:-105,dy:20,font:"_dbf"});		
					th.config.gfx.blits.push({type:"sectionstats",dx:100,dy:0,font:"_dbf"});
					this.nextmodels[th.config.next.randomizer].poweron="1101"; // Put this I for a tetris for GM rankings and test the recovery
					this.pushline(th,[0,0,0,0,0,0,0,null,null,null]);
					this.pushline(th,[0,0,0,0,0,0,0,0,null,0]);
					this.pushline(th,[0,0,0,0,0,0,0,null,null,null]);
					this.pushline(th,[0,0,0,0,0,0,0,0,null,0]);

					this.pushline(th,[0,0,null,0,0,0,0,0,0,0]);
					this.pushline(th,[0,0,null,0,0,0,0,0,0,0]);
					this.pushline(th,[0,0,null,0,0,0,0,0,0,0]);
					this.pushline(th,[0,0,null,0,0,0,0,0,0,0]);

					this.pushline(th,[0,0,0,0,0,0,0,null,null,null]);
					this.pushline(th,[0,0,0,0,0,0,0,0,null,0]);
					
					break;
				}
				case "test-tgm2death-debug": {  // Simplified tgm2  master mode for testing. 
					th.config.gfx.blits.push({type:"debug",dx:-105,dy:150,font:"_dbf"});		
					th.config.score.gamemode="debugtgm2death";
					th.config.score.sectionmarks="debugtgm2master";
					th.config.score.grading="debugtgm2death";
					th.config.score.medals="debugtgm2";
					th.config.score.torikan="debugtgm2death";
					th.config.gfx.blits.push({type:"allstats",dx:-105,dy:20,font:"_dbf"});		
					th.config.gfx.blits.push({type:"sectionstats",dx:100,dy:0,font:"_dbf"});	
					th.nextpile.push(0); // Put this I for a tetris for GM rankings.
					break;
				}
			}
		};

// Section markers (for grade calculatings)		
block.sectionmarks={
	tgm2master:[ // Used for stats in tgm2 master mode - http://www.tetrisconcept.net/wiki/Tetris_The_Absolute_The_Grand_Master_2_PLUS
		{condition:[["onlock","or","global","level",">=",null,100],["onlock","and","global","stagelabel","!=",null,"roll"]]}, // Roll is checked for avoid torikan-section skips
		{condition:[["onlock","or","global","level",">=",null,200],["onlock","and","global","stagelabel","!=",null,"roll"]]},
		{condition:[["onlock","or","global","level",">=",null,300],["onlock","and","global","stagelabel","!=",null,"roll"]]},
		{condition:[["onlock","or","global","level",">=",null,400],["onlock","and","global","stagelabel","!=",null,"roll"]]},
		{condition:[["onlock","or","global","level",">=",null,500],["onlock","and","global","stagelabel","!=",null,"roll"]]},
		{condition:[["onlock","or","global","level",">=",null,600],["onlock","and","global","stagelabel","!=",null,"roll"]]},
		{condition:[["onlock","or","global","level",">=",null,700],["onlock","and","global","stagelabel","!=",null,"roll"]]},
		{condition:[["onlock","or","global","level",">=",null,800],["onlock","and","global","stagelabel","!=",null,"roll"]]},
		{condition:[["onlock","or","global","level",">=",null,900],["onlock","and","global","stagelabel","!=",null,"roll"]]},
		{condition:[["onlock","or","global","stagelabel","==",null,"roll"]]}  // The M-Roll section
	],
	debugtgm2master:[ // Simplified tgm2 master mode sections
		{condition:[["onlock","or","global","level",">=",null,10],["onlock","and","global","stagelabel","!=",null,"roll"]]}, // Roll is checked for avoid torikan-section skips
		{condition:[["onlock","or","global","level",">=",null,20],["onlock","and","global","stagelabel","!=",null,"roll"]]},
		{condition:[["onlock","or","global","level",">=",null,30],["onlock","and","global","stagelabel","!=",null,"roll"]]},
		{condition:[["onlock","or","global","level",">=",null,40],["onlock","and","global","stagelabel","!=",null,"roll"]]},
		{condition:[["onlock","or","global","level",">=",null,41],["onlock","and","global","stagelabel","!=",null,"roll"]]},
		{condition:[["onlock","or","global","level",">=",null,42],["onlock","and","global","stagelabel","!=",null,"roll"]]},
		{condition:[["onlock","or","global","level",">=",null,43],["onlock","and","global","stagelabel","!=",null,"roll"]]},
		{condition:[["onlock","or","global","level",">=",null,44],["onlock","and","global","stagelabel","!=",null,"roll"]]},
		{condition:[["onlock","or","global","level",">=",null,45],["onlock","and","global","stagelabel","!=",null,"roll"]]},
		{condition:[["onlock","or","global","stagelabel","==",null,"roll"]]}  // The M-Roll section
	]
};

// Torikan - the game is limited in certain conditions
block.torikans={
	tgm2death:{ // TGM2+ death mode torikan system - http://www.tetrisconcept.net/wiki/Tetris_The_Absolute_The_Grand_Master_2_PLUS
		starting:["main"], // A single main torikan
		torikans:[
			{ // Base torikan. Change the level cap and set the torikan to 1. Will be checked by torikan enabled stages. The levelcap is set here to best match the level_after_clear scoring in tgm2+
				main:{condition:[[null,"or","overall","time",">",null,strtime2secs("03:25:00")]],apply:[{setup:{levelcap:500,setdata:["torikan",1]},condition:[[null,"or","global","level","<",null,500]]},{fail:true}]}
			}
		]
	},
	// DEBUG
	debugtgm2death:{ // TGM2+ death mode torikan system - http://www.tetrisconcept.net/wiki/Tetris_The_Absolute_The_Grand_Master_2_PLUS
		starting:["main"], // A single main torikan
		torikans:[
			{ // Base torikan. Change the level cap and set the torikan to 1. Will be checked by torikan enabled stages. The levelcap is set here to best match the level_after_clear scoring in tgm2+
				main:{condition:[[null,"or","overall","time",">",null,strtime2secs("01:00:00")]],apply:[{fail:true,setup:{levelcap:30,setdata:["torikan",1]},condition:[[null,"or","global","level","<",null,30]]},{fail:true}]}
			}
		]
	},
};
	
block.setconfigbundle=function (th,alternative) {
		  switch (alternative) {
		  // ROTATION SYSTEMS
		  case "rot-srs": { // SRS rotation system - http://www.tetrisconcept.net/wiki/SRS
		  	  // CONFIRMED
			  th.config.next.spawnpoint="srs";
			  th.config.field.piecemodel="srs";
			  th.config.timing.kickset=["srs"];
			  th.config.control.spinevaluator="tspin";
			  
			  // TO BE CONFIRMED
			  th.config.timing.pushkicks=true;
			  break;
		  }
		  case "rot-nin-right":{ // Nintendo right rotation system - http://www.tetrisconcept.net/wiki/Nintendo_Rotation_System
		  	 // CONFIRMED
			th.config.field.piecemodel="nintendoright"; // Piece models for rotation systems (classic, sega etc.)
			th.config.next.spawnpoint="nintendoright"; // Spawn point of pieces
			th.config.timing.lockdelay=0; // frames. Time to wait before sticking the falling block
			th.config.timing.kickset=[]; // kicks sequence when rotating
		  	break;
		  }
		  case "rot-nin-left":{ // Nintendo left rotation system - http://www.tetrisconcept.net/wiki/Nintendo_Rotation_System
		  	 // CONFIRMED
			th.config.field.piecemodel="nintendoleft"; // Piece models for rotation systems (classic, sega etc.)
			th.config.next.spawnpoint="nintendoleft"; // Spawn point of pieces
			th.config.timing.lockdelay=0; // frames. Time to wait before sticking the falling block
			th.config.timing.kickset=[]; // kicks sequence when rotating
		  	break;
		  }
		  case "rot-tengen": { // Tengen Tetris - http://www.tetrisconcept.net/wiki/Tetris_(NES,_Tengen)
		    th.config.field.piecemodel="tengen";
		    th.config.next.spawnpoint="tengen";
		   	break;		  
		  }
		  case "rot-sega": { // Basic Sega Rotation - http://www.tetrisconcept.net/wiki/Sega_Rotation
		    th.config.field.piecemodel="sega";
		    th.config.next.spawnpoint="sega";
		    // No initial rotation, No wallkicks, No floorkicks
		   	break;		  
		  }
		  case "rot-ars": { // Basic ARS Rotation - http://www.tetrisconcept.net/wiki/Ars
		    th.config.field.piecemodel="ars";
		    th.config.next.spawnpoint="ars";
		    th.config.timing.kickset=["ars"];
		    th.config.control.rotationlock=["ars"]; // Pieces do not rotates in certain conditions
			th.config.control.harddrop=true;
		    th.config.timing.soniclock=true;
			break;		  
		  }
		  // GRAPHICS
		  case "gfx-none": { // Any gfx effect
		  	th.config.gfx.drawborder=null;
		  	th.config.gfx.thd=null;
		  	th.config.gfx.fallingthd=null;
		  	th.config.gfx.breaksparks=null;
		  	th.config.gfx.dropanimation=null;
		  	th.config.gfx.clearlineanimation="void";
		  	th.config.gfx.lockanimation=null;
		  	th.config.gfx.darkenlight=0;
		  	break;
		  }
		  
		  
		  // SIMS
		  case "sim-tgm":{ // Tetris The Grand Master parameters - http://www.tetrisconcept.net/wiki/Tetris_The_Grand_Master
		  	// CONFIRMED
			th.config.field.height=21;
			th.config.field.width=12;
			th.config.field.hold=false;
			th.config.score.gamemode="tgm";
			th.config.timing.are=this.convertframes(th,30);
			th.config.control.keyhold=true;
			th.config.control.das=this.convertframes(th,14); // frames of hold
			th.config.timing.lockdelay=this.convertframes(th,30);
			th.config.control.charge=true;
			th.config.field.ghost=true;
			th.config.score.grading="tgm";
			th.config.score.style="tgm";
			this.setconfigbundle(th,"rot-ars");
		  	
		  	// TO BE CONFIRMED
		  	th.config.timing.linecleardelay=this.convertframes(th,41-30); // Is the wiki lineclear minus das?
		  	th.config.control.initialdas=th.config.control.das;
		  	th.config.next.randomizer="randomgenerator";
		  	
		  	// GRAPHICS
		  	this.setconfigbundle(th,"gfx-none");
		  	th.config.gfx.tileset="brick-tgm";
		  	th.config.gfx.drawborder="rgb(255,255,255)";
		  	th.config.gfx.lockanimation={type:"flash",duration:2,soniclock:true};
		  	th.config.gfx.blits[th.config.gfx.blitsfieldindex]={type:"blit",dx:-8,dy:-8,tileset:"fields",tile:5};
		  	break;
		  	
		  }
		  case "sim-tgm2-normal":{ // TGM2 normal mode - http://www.tetrisconcept.net/wiki/Tetris_The_Absolute_The_Grand_Master_2_PLUS
		  
		  	// CONFIRMED
			th.config.field.height=21;
			th.config.field.width=12;
			th.config.field.hold=false;
			th.config.timing.are=this.convertframes(th,25);
			th.config.control.keyhold=true;
			th.config.control.das=this.convertframes(th,14); // frames of hold
			th.config.timing.lockdelay=this.convertframes(th,30);
			th.config.control.charge=true;
			th.config.field.ghost=true;
			th.config.score.gamemode="tgm2normal";
			th.config.score.style="tgm2";
			this.setconfigbundle(th,"rot-ars");

			// TO BE CONFIRMED
		    th.config.timing.soniclock=false; // In all modes?
			th.config.timing.linecleardelay=this.convertframes(th,40-25); // Is the wiki lineclear - are?
		    th.config.timing.stickstoppable=true;
			
		  	// GRAPHICS
		  	this.setconfigbundle(th,"gfx-none");
		  	th.config.gfx.tileset="brick-tgm";
		  	th.config.gfx.drawborder="rgb(255,255,255)";
		  	th.config.gfx.lockanimation={type:"flash",duration:2,onharddrop:true};
		  	th.config.gfx.blits[th.config.gfx.blitsfieldindex]={type:"blit",dx:-8,dy:-8,tileset:"fields",tile:5};
		  	th.config.gfx.breaksparks={spacing:15,valign:"top",accx:0,accy:0,tileset:"break-tgm",frames:{speed:1,frames:help.seq(0,36,this.getframeskip(th))}};
		  	
		  	break; 
		  }
		  case "sim-tgm2-master":{ // TGM2 master mode - http://www.tetrisconcept.net/wiki/Tetris_The_Absolute_The_Grand_Master_2_PLUS
		  	// CONFIRMED
		  	this.setconfigbundle(th,"sim-tgm2-normal");
		  	th.config.score.grading="tgm2";
		  	th.config.score.internalgrade="tgm2";
		  	th.config.score.medals="tgm2master";
		  	th.config.score.blocksforcritical=150;
		  	th.config.score.blocksforrecovery=70;
		  	th.config.score.sectionmarks="tgm2master";
		  	th.config.score.gamemode="tgm2master";
		    break;
		  }
		  case "sim-tgm2-plus":{ // TGM2 plus mode - http://www.tetrisconcept.net/wiki/Tetris_The_Absolute_The_Grand_Master_2_PLUS
		  	// CONFIRMED
		  	this.setconfigbundle(th,"sim-tgm2-normal");
		  	th.config.score.gamemode="tgm2master"; // Like the master mode but without medals
		  	th.config.field.extraactions="tgm2plus"; // With garbage growing
		  	
		  	// TO BE CONFIRMED
		  	// ARE, DAS, LOCK, LINECLEAR are the same of normal/master mode but ARE is different on wiki. Keeping the normal timings.
		  	
		    break;
		  }
		  case "sim-tgm2-death":{ // TGM2 death mode - http://www.tetrisconcept.net/wiki/Tetris_The_Absolute_The_Grand_Master_2_PLUS
		  	// CONFIRMED
		  	this.setconfigbundle(th,"sim-tgm2-master");
		  	th.config.score.gamemode="tgm2death";
		  	th.config.score.grading="tgm2death";
		  	th.config.score.medals="tgm2death";
		  	th.config.score.internalgrade=null;
		  	th.config.score.torikan="tgm2death";
		  	
		  	// TO BE CONFIRMED
		  	// ARE, DAS, LOCK, LINECLEAR are the same of normal/master mode but ARE is different on wiki. Keeping the normal timings.
		  	
		    break;
		  }
		  case "sim-tgm2-big":{ // TGM2 big mode - http://www.tetrisconcept.net/wiki/Tetris_The_Absolute_The_Grand_Master_2_PLUS
		  	// CONFIRMED
		  	this.setconfigbundle(th,"sim-tgm2-master");
		  	th.config.score.medals="tgm2big";
		  	
		  	th.config.field.big=2;
		  	
		  	// TO BE CONFIRMED
		  	// ARE, DAS, LOCK, LINECLEAR are the same of normal/master mode but ARE is different on wiki. Keeping the normal timings.
		  	
		    break;
		  }
		  case "sim-tds":{ // Tetris DS parameters - http://www.tetrisconcept.net/wiki/Tetris_DS
		  	  // CONFIRMED
			  th.config.next.count=6;
			  th.config.field.height=21;
			  th.config.field.width=12;
			  th.config.field.vanishinglines=23;
			  th.config.field.hold=true;
			  th.config.field.holdcount=1;
			  th.config.control.harddrop=true;
			  th.config.timing.soniclock=true; 
			  th.config.field.blockout=true;
			  th.config.field.lockout=true;
			  th.config.field.partiallockout=false;
			  th.config.timing.movereset=true;
			  th.config.timing.spinreset=true;
			  th.config.timing.are=0;
			  th.config.control.keyhold=true; // Handle hold keys
			  th.config.control.initialdas=this.convertframes(th,11); // frames of hold when key is pressed
			  th.config.control.das=this.convertframes(th,5); // frames of hold
			  th.config.timing.lockdelay=this.convertframes(th,30);
		  	  th.config.timing.linecleardelay=this.convertframes(th,40);
			  th.config.field.ghost=true;
			  th.config.score.style="tds";
			  this.setconfigbundle(th,"rot-srs");
			 
		  	  // TO BE CONFIRMED
		  	  th.config.timing.stickstoppable=true;
			  th.config.score.gamemode="tetrisworlds";
			  th.config.next.randomizer="randomgenerator";

			  // GRAPHICS CHANGES
			  this.setconfigbundle(th,"gfx-none");
			  th.config.gfx.tileset="brick-tds";
		  	  th.config.gfx.darkenlight=0;
		  	  th.config.gfx.dropanimation={type:"trail",accx:0,accy:0,tileset:"drop-tds",animspeed:3};
			  th.config.gfx.lockanimation={type:"spark",accx:0,accy:0,tileset:"lock-tds",frames:{speed:1,frames:help.seq(0,60,this.getframeskip(th)*3)}};
		  	  th.config.gfx.blits[th.config.gfx.blitsfieldindex]={type:"blit",dx:-11,dy:0,tileset:"field-tds",tile:0};
		  	   
			  break;
		  }
		  case "sim-tds-multi":{ // Tetris DS parameters (multiplayer) - http://www.tetrisconcept.net/wiki/Tetris_DS
		  	// TO BE CONFIRMED
		  	this.setconfigbundle(th,"sim-tds");
		  	th.config.timing.floorkickcount=5;
		  	break;
		  }
		  case "sim-sega-easy": { // Classic Sega tetris - http://www.tetrisconcept.net/wiki/Tetris_%28Sega%29
		  	// CONFIRMED
			th.config.next.count=1;
			th.config.field.height=21;
			th.config.field.width=12;
			th.config.control.harddrop=false;
			th.config.gfx.palette="sega";
			th.config.control.deadkeys="sega"; // Only counterclockwise rotation
			th.config.field.ceiling=true; // Sega tetris has ceiling (i.e. under vanishing lines is wall)
			th.config.control.softdrop=1; // Gravity of soft drops
			th.config.control.softdropisdas=false; // Use das instrad of softdrop gravity
			th.config.timing.lockdelay=this.convertframes(th,30);
			th.config.timing.linecleardelay=this.convertframes(th,42);
			th.config.control.keyhold=true; // Handle hold keys
			th.config.control.das=this.convertframes(th,5); // frames of hold
			th.config.control.initialdas=this.convertframes(th,20);
		  	th.config.score.gamemode="segaeasy";
			th.config.score.stagetimermax=20; // Capped by checked conditions
			th.config.score.stagetimerframes=256;
		  	th.config.next.randomizer="memorylesspoweron";		  	
		  	this.setconfigbundle(th,"rot-sega");
		  	
		  	// TO BE CONFIRMED
			th.config.timing.linecleardelay=this.convertframes(th,42); // Since ARE is missing, probably 42 is lineclear+ARE. Are have to be decreased
		  	
		  	// GRAPHIC CHANGES (TO BE CONFIRMED)
		  	this.setconfigbundle(th,"gfx-none");
		  	th.config.gfx.tileset="brick-sega";
		  	th.config.gfx.blits[th.config.gfx.blitsfieldindex]={type:"blit",dx:-8,dy:-8,tileset:"fields",tile:21};
		  	
		  	break;
		  }
		  case "sim-sega-normal": {
		  	// CONFIRMED
		  	this.setconfigbundle(th,"sim-sega-easy");
		  	th.config.score.gamemode="seganormal";
		  	
		  	break;
		  }
		  case "sim-sega-hard": {
		  	// CONFIRMED
		  	this.setconfigbundle(th,"sim-sega-easy");
		  	th.config.score.gamemode="segahard";
		  	
		  	break;
		  }
		   case "sim-sega-hardest": {
		  	// CONFIRMED
		  	this.setconfigbundle(th,"sim-sega-easy");
		  	th.config.score.gamemode="segahardest";
		  	
		  	break;
		  }
		  case "sim-nes":{ // Classic NES parameters - http://www.tetrisconcept.net/wiki/Tetris_%28NES,_Nintendo%29
		  	
		  	// CONFIRMED
		  	th.config.timing.fps=60.0988; // frames per sec
			th.config.field.height=21; // field height (including borders)
			th.config.field.width=12; // field width (including borders)
			th.config.score.gamemode="nes"; // leveling criteria
			th.config.next.count=1; // Number of shown incoming blocks
			th.config.control.keyhold=true; // Handle hold keys
			th.config.control.initialdas=this.convertframes(th,16); // frames of hold when key is pressed
			th.config.control.das=this.convertframes(th,6); // frames of hold
			th.config.timing.are=this.convertframes(th,10); // frames to wait before spawning the next piece
			th.config.score.style="nintendo"; // Scoring type for lines
			th.config.control.softdrop=0.5; // Gravity of soft drops
			th.config.control.softdropisdas=false; // Use das instrad of softdrop gravity
			this.setconfigbundle(th,"rot-nin-right");

			// TO BE CONFIRMED
			th.config.timing.linecleardelay=this.convertframes(th,20-10); // is wiki lineclear - das?

			// TODO
			// Tenendo premuto giu' il primo pezzo rispetta la gravita' e non il softdrop
			// In Marathon (called A-TYPE), when the player line clear (startLevel * 10 + 10) or 100 lines, whatever comes first, the level advances by 1. After this, the level advances by 1 for every 10 lines.
			// * Start at level 5, advance to level 6 at 60 lines, advance to level 7 at 70 lines.
    		// * Start at level 12, advance to level 13 at 100 lines, advance to level 14 at 110 lines. 
						
			// GRAPHICS CHANGES
			this.setconfigbundle(th,"gfx-none");
			th.config.gfx.blits[th.config.gfx.blitsfieldindex]={type:"blit",dx:-8,dy:-8,tileset:"fields",tile:23};
		  	th.config.gfx.tileset="brick-nes";

			break;
			
		  }
		  case "sim-tengen":{ // Tengen Tetris - http://www.tetrisconcept.net/wiki/Tetris_(NES,_Tengen)
		  
		  	// CONFIRMED
		    th.config.field.height=21;
		    th.config.field.width=12;
			th.config.field.hold=false;
			th.config.control.harddrop=false; // up for dropping a piece to the bottom
			th.config.timing.kickset=["singleleftwallkick"];
			
		  	this.setconfigbundle(th,"rot-tengen");
		  	
		  	// TO BE CONFIRMED
		  	
		  	// TODO
		  	// Graphics.
		  	// ARE/DAS etc.
		  	// The game gives line clearing bonuses only after completing each 30 lines. 
		  	// All tetrominoes become the same color when they lock, due to limitations of the NES picture memory. This color varies from level to level. 
		  	
			// GRAPHICS CHANGES (TO BE CONFIRMED)
			this.setconfigbundle(th,"gfx-none");
			th.config.gfx.blits[th.config.gfx.blitsfieldindex]={type:"blit",dx:-8,dy:0,tileset:"fields",tile:22};
		  	th.config.gfx.tileset="brick-tengen";
			break;
		}
		  case "sim-gb": { // Classic Gameboy Parameters - http://www.tetrisconcept.net/wiki/Tetris_%28Game_Boy%29
		  	  // CONFIRMED
		  	  th.config.timing.fps=59.73;
			  th.config.field.hold=false;
			  th.config.control.harddrop=false; // up for dropping a piece to the bottom
			  th.config.field.height=19;
			  th.config.field.width=12;
			  th.config.control.softdropisdas=false; // Use das instrad of softdrop gravity
			  th.config.control.softdrop=1/3; // Gravity of soft drops
			  th.config.timing.are=this.convertframes(th,2); // frames to wait before spawning the next piece
			  th.config.control.keyhold=true;
			  th.config.control.das=this.convertframes(th,24); // frames of hold
			  th.config.score.style="nintendo";
			  th.config.score.gamemode="gameboy";
			  th.config.score.scorecap=999999;

			  this.setconfigbundle(th,"rot-nin-left");
		  	  
		  	  // TO BE CONFIRMED
			  th.config.timing.linecleardelay=this.convertframes(th,93-2-2); // frames for new lines detection and removal - is wiki lineclear minus are?
		  	  th.config.control.initialdas=th.config.control.das;

			  // TODO
			  // The "heart levels" (activated by holding Down+Start at the title screen) are as fast as the level plus 10, but unlike on the NES version, they don't improve the score.
			  
			  // GRAPHIC CHANGES
			  this.setconfigbundle(th,"gfx-none");
			  th.config.gfx.blits[th.config.gfx.blitsfieldindex]={type:"blit",dx:-8,dy:0,tileset:"fields",tile:20};
		  	  th.config.gfx.tileset="brick-gb";
		  	  th.config.gfx.clearlineanimation="blink";
			  break;
		  }
		  
		  case "default": { // Default parameters - A plain tetris without any extra.
		  		
		  		// ALL GAME PARAMETERS
		 		th.config.timing.fps=60; // frames per sec
		  		th.config.control.charge=false;
				th.config.control.das=this.convertframes(th,24);
				th.config.control.harddrop=false;
				th.config.control.initialdas=this.convertframes(th,48);
				th.config.control.keyhold=false;
				th.config.control.softdrop=0;
				th.config.control.softdropisdas=true;
				th.config.control.spinevaluator=null;
				th.config.control.deadkeys="none";
				th.config.control.rotationlock=null;
				th.config.control.lockingsoftdrop=false;
				th.config.field.blockout=true;
				th.config.field.ghost=false;
				th.config.field.height=21;
				th.config.field.hold=false;
				th.config.field.holdcount=0;
				th.config.field.lockout=true;
				th.config.field.partiallockout=true;
				th.config.field.piecemodel="classic";
				th.config.field.vanishinglines=0;
				th.config.field.width=12;
				th.config.field.ceiling=false;
				th.config.field.extraactions=null;		
				th.config.field.big=1;
				th.config.field.vanishspeed=null;
				th.config.next.count=1;
				th.config.next.randomizer="memoryless";
				th.config.next.spawnpoint="classic";
				th.config.score.gamemode="tetrisworlds";
				th.config.score.style="nintendo";
				th.config.score.tspinwithwalls=false;
				th.config.score.scorecap=null;
				th.config.score.stagetimermax=0;
				th.config.score.stagetimerframes=0;
				th.config.score.grading=null;
				th.config.score.sectionmarks=null;
				th.config.score.internalgrade=null;
				th.config.score.forcedlinesevery=null;
				th.config.score.levelcap=null;
				th.config.score.medals=null;
		  		th.config.score.blocksforcritical=null;
		  		th.config.score.blocksforrecovery=null;
		  		th.config.score.torikan=null;
		  		th.config.score.harddropscore="longest"; // Can be "sum"
				th.config.timing.are=0;
				th.config.timing.soniclock=true;
				th.config.timing.floorkickcount=0;
				th.config.timing.fps=60;
				th.config.timing.movereset=false;
				th.config.timing.spinreset=false;
				th.config.timing.kickset=[];
				th.config.timing.linecleardelay=0;
				th.config.timing.lockdelay=0;
				th.config.timing.pushkicks=false;
				th.config.timing.stickstoppable=false;
				th.config.timing.gravity=0;
			   
		  		// GRAPHIC PARAMETERS
		  		th.config.gfx.tileset="brick-tgm";
		  		th.config.gfx.drawborder="rgb(255,255,255)";
		  		th.config.gfx.thd=7;
		  		th.config.gfx.fallingthd=7;
		  		th.config.gfx.breaksparks={spacing:15,valign:"top",accx:0,accy:0,tileset:"break-tgm",frames:{speed:1,frames:help.seq(0,36,this.getframeskip(th))}};
		  		th.config.gfx.dropanimation={type:"tgm"};
		  		th.config.gfx.blinkprefix="bl";
		  		th.config.gfx.blitsfieldindex=1; // The index of the border blits. For changing in other modules.
		  		th.config.gfx.blits=[
		  			{type:"background"},
		  			{type:"blit",dx:-8,dy:-8,tileset:"fields",tile:0},
		  			{type:"staffroll"},
		  			{type:"blit",dx:-8,dy:-41,tileset:"head-tgm",tile:0},
		  			{type:"blit",dx:28,dy:-37,tileset:"small-lbl",tile:0},
		  			{type:"blit",dx:-8,dy:-37,tileset:"small-lbl",tile:6},
		  			
		  			
		  			
		  			{type:"blit",dx:90,dy:-8,tileset:"small-lbl",tile:4},
		  			{type:"label",label:"stage",dx:90,dy:-1,font:"small-digitgray"},
		  			
		  			{type:"blit",dx:90,dy:20,tileset:"small-lbl",tile:1},
		  			{type:"label",subj:"overall",label:"score",dx:90,dy:27,font:"small-digitgray"},
		  			{ifcondition:"score",type:"blit",dx:90,dy:37,tileset:"bar",tile:0},
		  			{ifcondition:"score",type:"label",caplabel:"score",dx:90,dy:41,font:"small-digitgray"},
		  			
		  			{type:"blit",dx:90,dy:58,tileset:"small-lbl",tile:7},
		  			{type:"label",subj:"overall",label:"lines",dx:90,dy:66,font:"small-digitgray"},
		  			{ifcondition:"lines",type:"blit",dx:90,dy:76,tileset:"bar",tile:0},
		  			{ifcondition:"lines",type:"label",caplabel:"lines",dx:90,dy:81,font:"small-digitgray"},
		  			
		  			{ifcondition:"level",type:"blit",dx:90,dy:96,tileset:"small-lbl",tile:2},
		  			{ifcondition:"level",type:"label",label:"level",dx:90,dy:104,font:"small-digitgray"},
		  			{ifcondition:"level",type:"blit",dx:90,dy:114,tileset:"bar",tile:0},
		  			{ifcondition:"level",type:"label",label:"nextlevelat",dx:90,dy:118,font:"small-digitgray"},
		  			
		  			{ifgrading:true,type:"blit",dx:-40,dy:-8,tileset:"small-lbl",tile:10},
		  			{ifgrading:true,blink:true,type:"labelmap",label:"gradelabel",prefix:"gr",dx:-70,dy:0,map:{
		  				gr9:{tileset:"grade",tile:0},  grS1:{tileset:"grade",tile:1},  grM1:{tileset:"grade",tile:2},  grMa:{tileset:"grade",tile: 3},  grS10:{tileset:"grade",tile:4},   grM:{tileset:"grade",tile:5},
		  				gr8:{tileset:"grade",tile:6},  grS2:{tileset:"grade",tile:7},  grM2:{tileset:"grade",tile:8},  grMaK:{tileset:"grade",tile:9},  grS11:{tileset:"grade",tile:10},  grMM:{tileset:"grade",tile:11},
		  				gr7:{tileset:"grade",tile:12}, grS3:{tileset:"grade",tile:13}, grM3:{tileset:"grade",tile:14}, grMaV:{tileset:"grade",tile:15}, grS12:{tileset:"grade",tile:16},  grMK:{tileset:"grade",tile:17},
		  				gr6:{tileset:"grade",tile:18}, grS4:{tileset:"grade",tile:19}, grM4:{tileset:"grade",tile:20}, grMaO:{tileset:"grade",tile:21}, grS13:{tileset:"grade",tile:22},  grMV:{tileset:"grade",tile:23},
		  				gr5:{tileset:"grade",tile:24}, grS5:{tileset:"grade",tile:25}, grM5:{tileset:"grade",tile:26}, grMaM:{tileset:"grade",tile:27},           						  grMO:{tileset:"grade",tile:29},
		  				gr4:{tileset:"grade",tile:30}, grS6:{tileset:"grade",tile:31}, grM6:{tileset:"grade",tile:32}, grMas:{tileset:"grade",tile:33},           						  grMMM:{tileset:"grade",tile:35},
		  				gr3:{tileset:"grade",tile:36}, grS7:{tileset:"grade",tile:37}, grM7:{tileset:"grade",tile:38}, 																	  grGm:{tileset:"grade-gm",tile:1}, 
		  				gr2:{tileset:"grade",tile:42}, grS8:{tileset:"grade",tile:43}, grM8:{tileset:"grade",tile:44},
		  				gr1:{tileset:"grade",tile:48}, grS9:{tileset:"grade",tile:49}, grM9:{tileset:"grade",tile:50}
		  			}},
		  			{ifmedals:true,type:"medalsmap",dx:-30,dy:50,map:{
		  				acplatinum:{tileset:"medal",tile:0}, stplatinum:{tileset:"medal",tile:1}, skplatinum:{tileset:"medal",tile:2}, replatinum:{tileset:"medal",tile:3}, roplatinum:{tileset:"medal",tile:4}, coplatinum:{tileset:"medal",tile:5}, tsplatinum:{tileset:"medal",tile:6},
		  				acgold:{tileset:"medal",tile:7}, stgold:{tileset:"medal",tile:8}, skgold:{tileset:"medal",tile:9}, regold:{tileset:"medal",tile:10}, rogold:{tileset:"medal",tile:11}, cogold:{tileset:"medal",tile:12}, tsgold:{tileset:"medal",tile:13},
		  				acsilver:{tileset:"medal",tile:14}, stsilver:{tileset:"medal",tile:15}, sksilver:{tileset:"medal",tile:16}, resilver:{tileset:"medal",tile:17}, rosilver:{tileset:"medal",tile:18}, cosilver:{tileset:"medal",tile:19}, tssilver:{tileset:"medal",tile:20},
		  				acbronze:{tileset:"medal",tile:21}, stbronze:{tileset:"medal",tile:22}, skbronze:{tileset:"medal",tile:23}, rebronze:{tileset:"medal",tile:24}, robronze:{tileset:"medal",tile:25}, cobronze:{tileset:"medal",tile:26}, tsbronze:{tileset:"medal",tile:27},
		  				acnone:{tileset:"medal",tile:28}, stnone:{tileset:"medal",tile:29}, sknone:{tileset:"medal",tile:30}, renone:{tileset:"medal",tile:31}, ronone:{tileset:"medal",tile:32}, conone:{tileset:"medal",tile:33}, tsnone:{tileset:"medal",tile:34},
		  			}},
		  			
		  			


		  			{ifcondition:"stagetimer",type:"blit",dx:90,dy:145,tileset:"small-lbl",tile:8},
		  			{ifcondition:"stagetimer",type:"label",caponlabel:"stagetimer",dx:115,dy:143,font:"small-gray"},
		  			

		  			
		  			{type:"label",blink:true,subj:"overall",label:"timerstring",dx:-8,dy:175,font:"big-digitgray"},
		  			{type:"piece",dx:25,dy:-28,tileset:null,piece:this.cons.piece.next,nextid:0,dark:0,thd:null},
		  			{type:"piece",dx:60,dy:-20,tileset:"smbrick-tgm",piece:this.cons.piece.next,nextid:1,dark:0,thd:null},
		  			{type:"piece",dx:80,dy:-20,tileset:"smbrick-tgm",piece:this.cons.piece.next,nextid:2,dark:0,thd:null},
		  			{type:"piece",dx:100,dy:-20,tileset:"smbrick-tgm",piece:this.cons.piece.next,nextid:3,dark:0,thd:null},
		  			{type:"piece",dx:120,dy:-20,tileset:"smbrick-tgm",piece:this.cons.piece.next,nextid:4,dark:0,thd:null},
		  			{type:"piece",dx:140,dy:-20,tileset:"smbrick-tgm",piece:this.cons.piece.next,nextid:5,dark:0,thd:null},
		  			{type:"piece",dx:160,dy:-20,tileset:"smbrick-tgm",piece:this.cons.piece.next,nextid:6,dark:0,thd:null},
		  			{type:"piece",dx:-4,dy:-28,tileset:"smbrick-tgm",piece:this.cons.piece.hold,dark:0,thd:null},
		  			{type:"field"},
		  			{type:"falling"},
		  			
		  			{type:"message",dx:-110,dy:165,font:"small-gray"}
		  		];
		  		
		  		th.config.gfx.backgrounds=[ // 320x280, posterized 10, luminosita' -127
		  			{image:"back-01",scroll:20,speed:this.convertframes(th,400)},
		  			{image:"back-03",scroll:20,speed:this.convertframes(th,400)},
		  			{image:"back-02",scroll:20,speed:this.convertframes(th,400)}
		  		];
		  		th.config.gfx.ghostlight=0.5;
		  		th.config.gfx.darkenlight=1;
		  		th.config.gfx.vanishingcolors=1;
		  		th.config.gfx.clearlineanimation="fade";
		  		th.config.gfx.lockanimation={type:"flash",duration:2,onharddrop:true};
		  		th.config.gfx.palette="classic";
		  		th.config.gfx.messagetime=3; // in seconds
		  		
			break;
		  }
	  }
	};
	
