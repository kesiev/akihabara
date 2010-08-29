{
	// Graphic resources.
	addImage:[	
		["logo","resources/solitude/logo.png"],
		["sea","resources/solitude/sea.png"],
		["seaside","resources/solitude/seaside.png"],
		["seaside2","resources/solitude/seaside2.png"],
		["beach","resources/solitude/beach.png"],
		["beach2","resources/solitude/beach2.png"],
		["sprites","resources/solitude/cels.png"],
		["fontbig","resources/solitude/fontbig.png"],
		["font","resources/solitude/font.png"]
	],
	addFont:[
		{id:"small",image:"font",firstletter:" ",tileh:8,tilew:8,tilerow:255,gapx:0,gapy:32},
		{id:"big",image:"fontbig",firstletter:" ",tileh:16,tilew:8,tilerow:255,gapx:0,gapy:0},
		{id:"bigred",image:"fontbig",firstletter:" ",tileh:16,tilew:8,tilerow:255,gapx:0,gapy:64}
	],
	addTiles:[
		{id:"player",image:"sprites",tileh:30,tilew:40,tilerow:9,gapx:0,gapy:0},
		{id:"bulletbig",image:"sprites",tileh:14,tilew:15,tilerow:9,gapx:0,gapy:30},
		{id:"spark",image:"sprites",tileh:15,tilew:15,tilerow:3,gapx:0,gapy:44},
		{id:"explosion",image:"sprites",tileh:40,tilew:40,tilerow:6,gapx:0,gapy:59},
		{id:"bulletsmall",image:"sprites",tileh:10,tilew:10,tilerow:2,gapx:0,gapy:99},
		{id:"enemy1",image:"sprites",tileh:30,tilew:30,tilerow:10,gapx:0,gapy:109},
		{id:"enemy2",image:"sprites",tileh:50,tilew:50,tilerow:4,gapx:0,gapy:139},
		{id:"boss",image:"sprites",tileh:97,tilew:188,tilerow:2,gapx:0,gapy:189},
		{id:"powerup",image:"sprites",tileh:20,tilew:20,tilerow:2,gapx:0,gapy:286},
		{id:"symbols",image:"sprites",tileh:13,tilew:17,tilerow:1,gapx:0,gapy:306},
		{id:"faces",image:"sprites",tileh:50,tilew:50,tilerow:7,gapx:0,gapy:319}
	],
	
	// Audio resources	
	addAudio:[
		["default-music",[audioserver+"solitude-intro.mp3",audioserver+"solitude-intro.ogg"],{channel:"bgmusic",loop:true}],
		["ingame",[audioserver+"solitude-ingame.mp3",audioserver+"solitude-ingame.ogg"],{channel:"bgmusic",loop:true}],
		["ending",[audioserver+"solitude-ending.mp3",audioserver+"solitude-ending.ogg"],{channel:"bgmusic",loop:true}],
		["boss",[audioserver+"solitude-boss.mp3",audioserver+"solitude-boss.ogg"],{channel:"bgmusic",loop:true}],		
		["default-menu-option",[audioserver+"select.mp3",audioserver+"select.ogg"],{channel:"sfx"}],
		["default-menu-confirm",[audioserver+"start.mp3",audioserver+"start.ogg"],{channel:"sfx"}],
		["explosion",[audioserver+"explosion.mp3",audioserver+"explosion.ogg"],{channel:"sfx"}],
		["megaexplosion",[audioserver+"megaexplosion.mp3",audioserver+"megaexplosion.ogg"],{channel:"sfx"}],
		["powerup",[audioserver+"powerup3.mp3",audioserver+"powerup3.ogg"],{channel:"sfx"}],
		["beep",[audioserver+"voice_narrator.mp3",audioserver+"voice_narrator.ogg"],{channel:"sfx"}],
		["beepbad",[audioserver+"voice_bad.mp3",audioserver+"voice_bad.ogg"],{channel:"sfx"}],
		["foefire",[audioserver+"eat.mp3",audioserver+"eat.ogg"],{channel:"sfx"}],
		["laser",[audioserver+"laser.mp3",audioserver+"laser.ogg"],{channel:"sfx",volume:0.5}]
	],
	
	// Sub-resource files.
	addBundle:[
		// This file contains dialogue data
		{file:"resources/solitude/bundle-dialogues.js"},

		// Enemies logic and models
		{file:"resources/solitude/bundle-enemies.js"},
		
		// These are stage data
		{file:"resources/solitude/bundle-attractmode.js"},
		{file:"resources/solitude/bundle-stage1.js"}
		// {file:"resources/solitude/bundle-stage2.js"}, // For now stage2 is only a placeholder. Uncomment and start developing!
		
	]
}
