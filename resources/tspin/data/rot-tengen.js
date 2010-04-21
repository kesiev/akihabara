 // Tengen - http://www.tetrisconcept.net/wiki/Tetris_%28NES,_Tengen%29
 
block.xspawnpoints.tengen=[5,5,5,5,5,5,5];
block.yspawnpoints.tengen=[0,0,0,0,0,0,0];

block.pieces.tengen=[
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
	[[[1,1,0,0],[1,1,0,0],[0,0,0,0],[0,0,0,0]]]];


block.kicksets.tengen={ // Single left wallkick for all piece/rotations for Tengen tetris - http://www.tetrisconcept.net/wiki/Tetris_(NES,_Tengen)
	"p": {
		"r":[{x:-1}]
	}
};
			
			
block.library["rot-tengen"]=function(th) {
	th.config.field.piecemodel="tengen";
	th.config.next.spawnpoint="tengen";
	th.config.timing.kickset=["tengen"];
	th.config.control.rotationlock=null; // Pieces do not rotates in certain conditions
	th.config.control.harddrop=false;
	th.config.timing.harddrop=false;
	th.config.timing.floorkickcount=0;
	th.config.control.spinevaluator="none";
	th.config.gfx.palette="classic";
	th.config.timing.pushkicks=false;

 }
