{
	// Graphic resources.
	addImage:[
		["sprites","resources/leavemealone/cels.png"],
		["bg","resources/leavemealone/bg1.png"],
		["font","resources/leavemealone/font.png"],
		["fontbig","resources/leavemealone/fontbig.png"],
		["intro1","resources/leavemealone/intro1.png"],
		["intro2","resources/leavemealone/intro2.png"],
		["intro3","resources/leavemealone/intro3.png"],
		["ending1","resources/leavemealone/ending1.png"],
		["logo","resources/leavemealone/logo.png"]
	],
	addFont:[
		{id:"small",image:"font",firstletter:" ",tileh:8,tilew:8,tilerow:255,gapx:0,gapy:8},
		{id:"big",image:"fontbig",firstletter:" ",tileh:16,tilew:8,tilerow:255,gapx:0,gapy:0}
	],
	addTiles:[
		{id:"player",image:"sprites",tileh:40,tilew:20,tilerow:9,gapx:0,gapy:0},
		{id:"tiles",image:"sprites",tileh:20,tilew:20,tilerow:9,gapx:0,gapy:40},
		{id:"enemy-goo",image:"sprites",tileh:20,tilew:20,tilerow:9,gapx:0,gapy:60},
		{id:"enemy-sad",image:"sprites",tileh:40,tilew:20,tilerow:9,gapx:0,gapy:80},
		{id:"tiledfont",image:"font",tileh:8,tilew:8,tilerow:255,gapx:0,gapy:8}
	],
	
	// Audio resources	
	addAudio:[
		["default-music",[audioserver+"leavemealone-intro.mp3",audioserver+"leavemealone-intro.ogg"],{channel:"bgmusic",loop:true}],
		["ingame",[audioserver+"leavemealone-ingame.mp3",audioserver+"leavemealone-ingame.ogg"],{channel:"bgmusic",loop:true}],
		["ending",[audioserver+"leavemealone-ending.mp3",audioserver+"leavemealone-ending.ogg"],{channel:"bgmusic",loop:true}],
		["default-menu-option",[audioserver+"select.mp3",audioserver+"select.ogg"],{channel:"sfx"}],
		["default-menu-confirm",[audioserver+"start.mp3",audioserver+"start.ogg"],{channel:"sfx"}],
		["beep",[audioserver+"voice_narrator.mp3",audioserver+"voice_narrator.ogg"],{channel:"sfx"}],
		["die",[audioserver+"die.mp3",audioserver+"die.ogg"],{channel:"sfx"}],
		["hit",[audioserver+"hit.mp3",audioserver+"hit.ogg"],{channel:"sfx"}],
		["jump",[audioserver+"jump.mp3",audioserver+"jump.ogg"],{channel:"sfx"}]	
	],
	
	// Sub-resource files.
	addBundle:[
		{file:"resources/leavemealone/bundle-dialogues.js"},
		{file:"resources/leavemealone/bundle-stage1.js"},
		{file:"resources/leavemealone/bundle-stage2.js"},
		{file:"resources/leavemealone/bundle-stage3.js"},
		{file:"resources/leavemealone/bundle-stage4.js"}
	]
}
