 // SRS - http://www.tetrisconcept.net/wiki/SRS
 // DEPENDS ON classic
 
block.yspawnpoints.srs=[-2,-2,-2,-2,-2,-2,-2];
block.xspawnpoints.srs=null;

block.tspins.srs=[ // SRS rotation t-spin spots
	// I
	null, // Any t-spin spot
	// T (2 is for calculating spins)
	[[[1,0,1],[0,0,0],[1,0,1]],
	 [[1,0,1],[0,0,0],[1,0,1]],
	 [[1,0,1],[0,0,0],[1,0,1]],
	 [[1,0,1],[0,0,0],[1,0,1]]],
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
];

block.pieces.srs=[ // SRS rotation pieces
	// I
	[[[0,0,0,0],[1,1,1,1],[0,0,0,0],[0,0,0,0]],
	 [[0,0,1,0],[0,0,1,0],[0,0,1,0],[0,0,1,0]],
	 [[0,0,0,0],[0,0,0,0],[1,1,1,1],[0,0,0,0]],
	 [[0,1,0,0],[0,1,0,0],[0,1,0,0],[0,1,0,0]]],
	// T
	[[[0,1,0],[1,1,1],[0,0,0]],
	 [[0,1,0],[0,1,1],[0,1,0]],
	 [[0,0,0],[1,1,1],[0,1,0]],
	 [[0,1,0],[1,1,0],[0,1,0]]],
	// L
	[[[0,0,1],[1,1,1],[0,0,0]],
	 [[0,1,0],[0,1,0],[0,1,1]],
	 [[0,0,0],[1,1,1],[1,0,0]],
	 [[1,1,0],[0,1,0],[0,1,0]]],
	// J
	[[[1,0,0],[1,1,1],[0,0,0]], // TODO l'ho cambiato rispetto a http://www.tetrisconcept.net/wiki/SRS. Ho spostato in cima la riga vuota. Prova se e' cosi'. Se si, fai su tutti
	 [[0,1,1],[0,1,0],[0,1,0]],
	 [[0,0,0],[1,1,1],[0,0,1]],
	 [[0,1,0],[0,1,0],[1,1,0]]],
	// Z
	[[[1,1,0],[0,1,1],[0,0,0]],
	 [[0,0,1],[0,1,1],[0,1,0]],
	 [[0,0,0],[1,1,0],[0,1,1]],
	 [[0,1,0],[1,1,0],[1,0,0]]],
	// S
	[[[0,1,1],[1,1,0],[0,0,0]],
	 [[0,1,0],[0,1,1],[0,0,1]],
	 [[0,0,0],[0,1,1],[1,1,0]],
	 [[1,0,0],[1,1,0],[0,1,0]]],
	// O
	[[[0,1,1,0],[0,1,1,0],[0,0,0,0],[0,0,0,0]]]];	

block.kicksets.srs={ 
        // Notes: y+1 is moving the piece UP and not DOWN in the wiki!
	// I
	"p0":{
		"r01":[{x:-2,y:0},{x:+1,y:0},{x:-2,y:-1},{x:+1,y:+2,floorkick:true,kicks:-1}],
		"r10":[{x:+2,y:0},{x:-1,y:0},{x:+2,y:+1,floorkick:true,kicks:-1},{x:-1,y:-2}],

		"r12":[{x:-1,y:0},{x:+2,y:0},{x:-1,y:+2,floorkick:true,kicks:-1},{x:+2,y:-1}],
		"r21":[{x:+1,y:0},{x:-2,y:0},{x:+1,y:-2},{x:-2,y:+1,floorkick:true,kicks:-1}],
		
		"r23":[{x:+2,y:0},{x:-1,y:0},{x:+2,y:+1,floorkick:true,kicks:-1},{x:-1,y:-2}],
		"r32":[{x:-2,y:0},{x:+1,y:0},{x:-2,y:-1},{x:+1,y:+2,floorkick:true,kicks:-1}],
		
		"r30":[{x:+1,y:0},{x:-2,y:0},{x:+1,y:-2},{x:-2,y:+1,floorkick:true,kicks:-1}],
		"r03":[{x:-1,y:0},{x:+2,y:0},{x:-1,y:+2,floorkick:true,kicks:-1},{x:+2,y:-1}]

	},
	// O p6
	"p6": { }, // O do not kicks,

	// T p1
	// L p2
	// J p3
	// Z p4
	// S p5
	// All Other (p)
	"p": {
		"r01":[{x:-1,y:0},{x:-1,y:+1,floorkick:true,kicks:-1},{x:0,y:-2},{x:-1,y:-2}],
		"r10":[{x:+1,y:0},{x:+1,y:-1},{x:0,y:+2,floorkick:true,kicks:-1},{x:+1,y:+2,floorkick:true,kicks:-1}],

		"r12":[{x:+1,y:0},{x:+1,y:-1},{x:0,y:+2,floorkick:true,kicks:-1},{x:+1,y:+2,floorkick:true,kicks:-1}],
		"r21":[{x:-1,y:0},{x:-1,y:+1,floorkick:true,kicks:-1},{x:0,y:-2},{x:-1,y:-2}],
		
		"r23":[{x:+1,y:0},{x:+1,y:+1,floorkick:true,kicks:-1},{x:0,y:-2},{x:+1,y:-2}],
		"r32":[{x:-1,y:0},{x:-1,y:-1},{x:0,y:+2,floorkick:true,kicks:-1},{x:-1,y:+2,floorkick:true,kicks:-1}],
		
		"r30":[{x:-1,y:0},{x:-1,y:-1},{x:0,y:+2,floorkick:true,kicks:-1},{x:-1,y:+2,floorkick:true,kicks:-1}],
		"r03":[{x:+1,y:0},{x:+1,y:+1,floorkick:true,kicks:-1},{x:0,y:-2},{x:+1,y:-2}]
	}
};

block.kicksets.arikasrs={ 
        // Notes: y+1 is moving the piece UP and not DOWN in the wiki!
	// I
	"p0":{
		"r01":[{x:-2,y:0},{x:+1,y:0},{x:+1,y:+2,floorkick:true,kicks:-1},{x:-2,y:-1}],
		"r10":[{x:+2,y:0},{x:-1,y:0},{x:-1,y:+2,floorkick:true,kicks:-1},{x:+2,y:-1}],

		"r12":[{x:-2,y:0},{x:+1,y:0},{x:-2,y:+1,floorkick:true,kicks:-1},{x:+1,y:-1}],
		"r21":[{x:+2,y:0},{x:-1,y:0},{x:+2,y:+1,floorkick:true,kicks:-1},{x:-1,y:-1}],
		
		"r23":[{x:+2,y:0},{x:-1,y:0},{x:+2,y:+1,floorkick:true,kicks:-1},{x:-1,y:-2}],
		"r32":[{x:-2,y:0},{x:+1,y:0},{x:-2,y:+1,floorkick:true,kicks:-1},{x:+1,y:-2}],
		
		"r30":[{x:-1,y:0},{x:+2,y:0},{x:-1,y:+2,floorkick:true,kicks:-1},{x:+2,y:-1}],
		"r03":[{x:+1,y:0},{x:-2,y:0},{x:+1,y:+2,floorkick:true,kicks:-1},{x:-2,y:-1}]

	},
	// O p6
	"p6": { }, // O do not kicks,
	// T p1
	// L p2
	// J p3
	// Z p4
	// S p5
	// All Other (p)
	"p": {
		"r01":[{x:-1,y:0},{x:-1,y:+1,floorkick:true,kicks:-1},{x:0,y:-2},{x:-1,y:-2}],
		"r10":[{x:+1,y:0},{x:+1,y:-1},{x:0,y:+2,floorkick:true,kicks:-1},{x:+1,y:+2,floorkick:true,kicks:-1}],

		"r12":[{x:+1,y:0},{x:+1,y:-1},{x:0,y:+2,floorkick:true,kicks:-1},{x:+1,y:+2,floorkick:true,kicks:-1}],
		"r21":[{x:-1,y:0},{x:-1,y:+1,floorkick:true,kicks:-1},{x:0,y:-2},{x:-1,y:-2}],
		
		"r23":[{x:+1,y:0},{x:+1,y:+1,floorkick:true,kicks:-1},{x:0,y:-2},{x:+1,y:-2}],
		"r32":[{x:-1,y:0},{x:-1,y:-1},{x:0,y:+2,floorkick:true,kicks:-1},{x:-1,y:+2,floorkick:true,kicks:-1}],
		
		"r30":[{x:-1,y:0},{x:-1,y:-1},{x:0,y:+2,floorkick:true,kicks:-1},{x:-1,y:+2,floorkick:true,kicks:-1}],
		"r03":[{x:+1,y:0},{x:+1,y:+1,floorkick:true,kicks:-1},{x:0,y:-2},{x:+1,y:-2}]
	}
};

			
block.library["rot-srs"]=function(th) {
	 // SRS rotation system - http://www.tetrisconcept.net/wiki/SRS
	  // CONFIRMED
	  th.config.field.piecemodel="srs";
	  th.config.next.spawnpoint="srs";
	  th.config.timing.kickset=["srs"];
	  th.config.control.rotationlock=null;
	  th.config.control.harddrop=true;
	  th.config.timing.harddrop=true; // usually is harddrop
	  th.config.timing.floorkickcount=null;
	  th.config.control.spinevaluator="tspin";
	  th.config.gfx.palette="classic";
	  th.config.timing.pushkicks=true;  // TO BE CONFIRMED
	  
};
block.library["rot-arikasrs"]=function(th) {
	 block.loadlibrary(th,"rot-srs");
	 th.config.timing.kickset=["arikasrs"];
};