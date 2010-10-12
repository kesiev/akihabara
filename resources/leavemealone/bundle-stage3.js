{
	_template:"leavemealone",
	setObject:[
		{
			object:"mapmeta",
			property:"stage3",
			value:{nextLevel:"stage4"}
		},
		{
			object:"mapobjects",
			property:"stage3",
			value:{
				items:[
					{objecttype:"player", x:30, y:320, side:1},
					{objecttype:"squid", x:80, y:320, side:1},
					{objecttype:"squid", x:80, y:200, side:1},
					{objecttype:"squid", x:80, y:80, side:1},
					{objecttype:"squid", x:220, y:320, side:1},
					{objecttype:"squid", x:220, y:200, side:1},
					{objecttype:"squid", x:220, y:80, side:1}
				]
			}
		},
		{
			object:"tilemaps",
			property:"stage3",
			value:help.finalizeTilemap({
				tileset:"tiles",
				map:[
					[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
					[0,null,null,null,null,null,null,null,null,null,null,null,null,null,null,0],
					[0,null,null,null,null,null,null,null,null,null,null,null,null,null,null,0],
					[0,null,null,null,null,null,null,null,null,null,null,null,null,null,null,0],
					[0,null,null,null,null,null,null,null,null,null,null,null,null,null,null,0],
					[0,null,null,null,null,null,null,null,null,null,null,null,null,null,null,0],
					[0,null,null,0,0,0,null,null,null,null,0,0,0,null,null,0],
					[0,null,null,null,null,null,null,null,null,null,null,null,null,null,null,0],
					[0,null,null,null,null,null,null,null,null,null,null,null,null,null,null,0],
					[0,null,null,null,null,null,null,0,0,null,null,null,null,null,null,0],
					[0,null,null,null,null,null,null,null,null,null,null,null,null,null,null,0],
					[0,null,null,null,null,null,null,null,null,null,null,null,null,null,null,0],
					[0,null,null,0,0,0,null,null,null,null,0,0,0,null,null,0],
					[0,null,null,null,null,null,null,null,null,null,null,null,null,null,null,0],
					[0,null,null,null,null,null,null,null,null,null,null,null,null,null,null,0],
					[0,null,null,null,null,null,null,0,0,null,null,null,null,null,null,0],
					[0,null,null,null,null,null,null,null,null,null,null,null,null,null,null,0],
					[0,null,null,null,null,null,null,null,null,null,null,null,null,null,null,0],
					[0,null,null,0,0,0,null,null,null,null,0,0,0,null,null,0],
					[0,null,null,null,0,null,null,null,null,null,null,0,null,null,null,0],
					[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0]
				]
			})
		}
	]
}