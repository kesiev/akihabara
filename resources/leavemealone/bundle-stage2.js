{
	_template:"leavemealone",
	setObject:[
		{
			object:"mapmeta",
			property:"stage2",
			value:{nextLevel:"stage3"}
		},
		{
			object:"mapobjects",
			property:"stage2",
			value:{
				items:[
					{objecttype:"player", x:40, y:40, side:1},
					{objecttype:"squid", x:80, y:140, side:1},
					{objecttype:"squid", x:340, y:140, side:1},
					{objecttype:"squid", x:200, y:40, side:1},
					{objecttype:"squid", x:200, y:120, side:1},
					{objecttype:"squid", x:200, y:200, side:1}
				]
			}
		},
		{
			object:"tilemaps",
			property:"stage2",
			value:help.finalizeTilemap({
				tileset:"tiles",
				map:[
					[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
					[0,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,0],
					[0,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,0],
					[0,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,0],
					[0,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,0],
					[0,null,null,null,null,null,null,null,null,0,0,0,0,null,null,null,null,null,null,null,null,0],
					[0,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,0],
					[0,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,0],
					[0,null,null,null,null,null,null,null,0,null,null,null,null,0,null,null,null,null,null,null,null,0],
					[0,null,null,0,0,0,null,null,null,0,0,0,0,null,null,null,0,0,0,null,null,0],
					[0,null,null,0,0,0,null,null,null,null,null,null,null,null,null,null,0,0,0,null,null,0],
					[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0]
				]
			})
		}
	]
}