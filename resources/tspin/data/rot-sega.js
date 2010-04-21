// Sega rotation system - http://www.tetrisconcept.net/wiki/SRS

block.yspawnpoints.sega=[-1,-1,-1,-1,-1,-1,-1];
block.xspawnpoints.sega=null;

block.palettes.sega=[1,5,2,6,4,7,3,0];

block.pieces.sega=[
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
	[[[0,0,0,0],[0,1,1,0],[0,1,1,0],[0,0,0,0]]]];

block.library["rot-sega"]=function(th) { 
	th.config.field.piecemodel="sega";
	th.config.next.spawnpoint="sega";
	th.config.timing.kickset=[]; // kicks sequence when rotating
	th.config.control.rotationlock=null; // Pieces do not rotates in certain conditions
	th.config.control.harddrop=false;
	th.config.timing.harddrop=false;
	th.config.timing.floorkickcount=0;
	th.config.control.spinevaluator="none";
	th.config.gfx.palette="sega";
	th.config.timing.pushkicks=false;
}
