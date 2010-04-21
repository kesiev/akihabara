//  ARS rotation pieces - http://www.tetrisconcept.net/wiki/TGM_rotation

block.yspawnpoints.ars=[-1,-1,-1,-1,-1,-1,0];
block.xspawnpoints.ars=null; // Spawn points are centered, rounded to the floor
block.palettes.ars=[1,5,2,6,4,7,3,0];
block.pieces.ars=[
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
	[[[0,1,1,0],[0,1,1,0],[0,0,0,0],[0,0,0,0]]]];

block.rotationlocks.ars={
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
};
			
block.kicksets.ars={
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
		"r10":[{x:+1,y:0},{x:-1,y:0}]
	}
};

block.kicksets.arstgm3={
	// I
	"p0":{ // I kicks. Horizontal by 2, vertical by 2 but only if is not floating (i.e. cannot move down)
		"r10":[{x:+1,y:0},{x:-1,y:0},{x:+2,y:0},{x:-2,y:0}], // Horizontal kicks only when passing to horizontal mode
		"r":[{x:0,y:+1,notfloating:true,floorkick:true,kicks:-1},{x:0,y:+2,notfloating:true,floorkick:true,kicks:-1}]
	},
	// T p1
	"p1":{ // T can escape from holes
		"r":[{x:0,y:+1,notfloating:true,floorkick:true,kicks:-1}]
	},
	// L p2
	// J p3
	// Z p4
	// S p5
	// O p6
	// All Other (p)
	"p": {
		"r":[{x:+1,y:0},{x:-1,y:0}]
	}
};
			
block.library["rot-ars"]=function(th) {
	th.config.field.piecemodel="ars";
	th.config.next.spawnpoint="ars";
	th.config.timing.kickset=["ars"];
	th.config.control.rotationlock=["ars"]; // Pieces do not rotates in certain conditions
	th.config.control.harddrop=true;
	th.config.timing.harddrop=false;
	th.config.timing.floorkickcount=0;
	th.config.control.spinevaluator="none";
	th.config.gfx.palette="ars";
	th.config.timing.pushkicks=true;
};

block.library["rot-ars-tgm3"]=function(th) {
	th.config.field.piecemodel="ars";
	th.config.next.spawnpoint="ars";
	th.config.timing.kickset=["arstgm3"];
	th.config.control.rotationlock=["ars"]; // Pieces do not rotates in certain conditions
	th.config.control.harddrop=true;
	th.config.timing.harddrop=false;
	th.config.timing.floorkickcount=1;
	th.config.control.spinevaluator="none";
	th.config.gfx.palette="ars";
	th.config.timing.pushkicks=true;	
};
