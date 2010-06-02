{
	// Graphic resources.
	addImage:[	
		["logo","resources/tlol/logo.png"],
		["sprites","resources/tlol/cels.png"],
		["font","resources/tlol/font.png"],
		["fontbig","resources/tlol/fontbig.png"]
	],
	addFont:[
		{id:"small",image:"font",firstletter:" ",tileh:8,tilew:8,tilerow:255,gapx:0,gapy:0},
		{id:"smalltut",image:"font",firstletter:" ",tileh:8,tilew:8,tilerow:255,gapx:0,gapy:24},
		{id:"big",image:"fontbig",firstletter:" ",tileh:16,tilew:8,tilerow:255,gapx:0,gapy:0},
	],
	addTiles:[
		{id:"player",image:"sprites",tileh:30,tilew:30,tilerow:12,gapx:0,gapy:0},
		
		{id:"lefthit",image:"sprites",tileh:40,tilew:20,tilerow:4,gapx:0,gapy:30},
		{id:"uphit",image:"sprites",tileh:20,tilew:40,tilerow:4,gapx:0,gapy:70},
		{id:"foe1",image:"sprites",tileh:30,tilew:30,tilerow:12,gapx:0,gapy:90},
		{id:"shadows",image:"sprites",tileh:15,tilew:30,tilerow:12,gapx:0,gapy:120},
		{id:"bonus",image:"sprites",tileh:20,tilew:20,tilerow:12,gapx:0,gapy:135},
		{id:"hud",image:"sprites",tileh:20,tilew:20,tilerow:9,gapx:240,gapy:135},
		
		{id:"flame-white",image:"sprites",tileh:30,tilew:30,tilerow:4,gapx:0,gapy:155},
		{id:"flame-blue",image:"sprites",tileh:30,tilew:30,tilerow:4,gapx:120,gapy:155},
		{id:"flame-red",image:"sprites",tileh:30,tilew:30,tilerow:4,gapx:240,gapy:155},
		
		{id:"bullet-black",image:"sprites",tileh:15,tilew:15,tilerow:1,gapx:0,gapy:185},
		
		{id:"door",image:"sprites",tileh:90,tilew:60,tilerow:1,gapx:0,gapy:200},
		{id:"doorv",image:"sprites",tileh:90,tilew:30,tilerow:1,gapx:60,gapy:200},
		
		{id:"chest",image:"sprites",tileh:30,tilew:30,tilerow:1,gapx:0,gapy:290},
		
		{id:"leftarrow",image:"sprites",tileh:12,tilew:30,tilerow:2,gapx:0,gapy:320},
		{id:"uparrow",image:"sprites",tileh:30,tilew:12,tilerow:2,gapx:0,gapy:332},
		
		{id:"items",image:"sprites",tileh:20,tilew:20,tilerow:2,gapx:0,gapy:362},
		{id:"npc",image:"sprites",tileh:30,tilew:30,tilerow:10,gapx:0,gapy:382},
		
		{id:"house",image:"sprites",tileh:90,tilew:90,tilerow:1,gapx:0,gapy:412}
	],
	
	// Audio resources	
	addAudio:[
		["default-music",[audioserver+"tlol-intro.mp3",audioserver+"tlol-intro.ogg"],{channel:"bgmusic",loop:true}],
		["ending",[audioserver+"tlol-ending.mp3",audioserver+"tlol-ending.ogg"],{channel:"bgmusic",loop:true}],
		["cave",[audioserver+"tlol-cave.mp3",audioserver+"tlol-cave.ogg"],{channel:"bgmusic",loop:true}],
		
		["default-menu-option",[audioserver+"select.mp3",audioserver+"select.ogg"],{channel:"sfx"}],
		["default-menu-confirm",[audioserver+"start.mp3",audioserver+"start.ogg"],{channel:"sfx"}],
		["explosion",[audioserver+"explosion.mp3",audioserver+"explosion.ogg"],{channel:"sfx"}],
		["coin",[audioserver+"coin.mp3",audioserver+"coin.ogg"],{channel:"sfx"}],
		["sword",[audioserver+"sword.mp3",audioserver+"sword.ogg"],{channel:"sfx"}],
		["beep",[audioserver+"voice_narrator.mp3",audioserver+"voice_narrator.ogg"],{channel:"sfx"}],
		["beepbad",[audioserver+"voice_bad.mp3",audioserver+"voice_bad.ogg"],{channel:"sfx"}],
		["die",[audioserver+"die.mp3",audioserver+"die.ogg"],{channel:"sfx"}],
		["hit",[audioserver+"hit.mp3",audioserver+"hit.ogg"],{channel:"sfx"}],
		["explosion",[audioserver+"explosion.mp3",audioserver+"explosion.ogg"],{channel:"sfx"}],
		["megaexplosion",[audioserver+"megaexplosion.mp3",audioserver+"megaexplosion.ogg"],{channel:"sfx"}],
		["hurt",[audioserver+"eat.mp3",audioserver+"eat.ogg"],{channel:"sfx"}]
	],
	
	addBundle:[
		{file:"resources/tlol/bundle-credits.js"}
	]
}
