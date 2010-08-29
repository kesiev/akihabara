// Nintendo right handed rotation system - http://www.tetrisconcept.net/wiki/Nintendo_Rotation_System
// Nintendo left handed rotation system - http://www.tetrisconcept.net/wiki/Nintendo_Rotation_System
   
block.yspawnpoints.nintendoright=[-2,-1,-1,0,-1,-1,-1];
block.yspawnpoints.nintendoleft=[-2,-1,-1,0,-1,-1,-1];
block.xspawnpoints.nintendoleft=null; // Spawn points are centered, rounded to the floor
block.xspawnpoints.nintendoright=null; // Spawn points are centered, rounded to the floor


block.pieces.nintendoright=[
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
	[[[0,0,0,0],[0,1,1,0],[0,1,1,0],[0,0,0,0]]]];

block.pieces.nintendoleft=[
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
	[[[0,0,0,0],[0,1,1,0],[0,1,1,0],[0,0,0,0]]]];
		
block.lines["nintendo"]=function(th,linedata) {
  var m=0;
  switch (linedata.cnt) {
	case 1: { m=40; break}
	case 2: { m=100; break}
	case 3: { m=300; break}
	case 4: { m=1200; break}
	default: {m=0;}
  }
  block.addscore(th,(m*(th.stage+1))+(th.falling.softdrop)+(th.falling.harddrop*2));
};

block.library["rot-nin-right"]=function(th){
	 // CONFIRMED
	th.config.field.piecemodel="nintendoright"; // Piece models for rotation systems (classic, sega etc.)
	th.config.next.spawnpoint="nintendoright"; // Spawn point of pieces
	th.config.timing.kickset=[]; // kicks sequence when rotating
	th.config.control.rotationlock=null; // Pieces do not rotates in certain conditions
	th.config.control.harddrop=false;
	th.config.timing.harddrop=false;
	th.config.timing.floorkickcount=0;
	th.config.control.spinevaluator="none";
	th.config.gfx.palette="classic";
	th.config.timing.pushkicks=false;

	th.config.timing.lockdelay=0; // frames. Time to wait before sticking the falling block
	
	
}

block.library["rot-nin-left"]=function(th){
	 // CONFIRMED
	th.config.field.piecemodel="nintendoleft"; // Piece models for rotation systems (classic, sega etc.)
	th.config.next.spawnpoint="nintendoleft"; // Spawn point of pieces
	th.config.timing.lockdelay=0; // frames. Time to wait before sticking the falling block
	th.config.timing.kickset=[]; // kicks sequence when rotating
}