{
	setObject:[
		// The actors...
		{
			object:"faces",
			property:"pilot",
			value:{
				x:80,
				y:150,
				tileset:"faces",
				frames:{ speed:10, frames:[0,1] },
				portraitx:10,
				portraity:150,
				box:{x:0,y:140,w:gbox.getScreenW(),h:70,alpha:0.5}
			}
		},{
			object:"faces",
			property:"pilotsurprised",
			value:{
				x:80,
				y:150,
				tileset:"faces",
				frames:{ speed:10, frames:[4] },
				portraitx:10,
				portraity:150,
				box:{x:0,y:140,w:gbox.getScreenW(),h:70,alpha:0.5}
			}
		},{
			object:"faces",
			property:"pilotangry",
			value:{
				x:80,
				y:150,
				tileset:"faces",
				frames:{ speed:4, frames:[2,3] },
				portraitx:10,
				portraity:150,
				box:{x:0,y:140,w:gbox.getScreenW(),h:70,alpha:0.5}
			}
		},{
			object:"faces",
			property:"radio",
			value:{
				x:80,
				y:50,
				tileset:"faces",
				frames:{ speed:10, frames:[5,6] },
				portraitx:10,
				portraity:50,
				box:{x:0,y:40,w:gbox.getScreenW(),h:70,alpha:0.5}
			}
		},{
			object:"faces",
			property:"radiosad",
			value:{
				x:80,
				y:50,
				tileset:"faces",
				frames:{ speed:1, frames:[7] },
				portraitx:10,
				portraity:50,
				box:{x:0,y:40,w:gbox.getScreenW(),h:70,alpha:0.5}
			}
		},{
			object:"faces",
			property:"radiosadder",
			value:{
				x:80,
				y:50,
				tileset:"faces",
				frames:{ speed:10, frames:[7,8] },
				portraitx:10,
				portraity:50,
				box:{x:0,y:40,w:gbox.getScreenW(),h:70,alpha:0.5}
			}
		},{
			object:"faces",
			property:"wife",
			value:{
				x:80,
				y:50,
				tileset:"faces",
				frames:{ speed:1, frames:[9] },
				portraitx:10,
				portraity:50,
				box:{x:0,y:40,w:gbox.getScreenW(),h:70,alpha:0.5}
			}
		},
		
		// ...and the script.
		{
			object:"dialogues",
			property:"intro",
			value:{
		  		font:"big",
		  		skipkey:"a",
		  		esckey:null,
		  		hideonend:true,  // Hidden when ended, so it is not shown during the boss battle.
		  		who:faces,
		  		scenes:[
		  			{
		  				speed:1,
		  				who:"pilot",
		  				audio:"beep",
		  				talk:[ "Control. 10 minutes to the", "target. All weapons are", "ready." ]
		  			},
		  			{
		  				speed:1,
		  				who:"radio",
		  				audio:"beep",
		  				talk:[ "Ok!", "Stay online. I'm scanning the", "coast for enemies." ]
		  			},
		  			{
		  				speed:1,
		  				who:"pilot",
		  				audio:"beep",
		  				talk:[ "Roger." ]
		  			},
		  			{
		  				speed:1,
		  				who:"radio",
		  				audio:"beep",
		  				talk:[ "It's your last mission, Hiro.", "I'm sure that you will leave", "a good remember to the Squad." ]
		  			},
		  			{
		  				speed:1,
		  				who:"pilot",
		  				audio:"beep",
		  				talk:[ "Last mission... It's not", "something I've decided." ]
		  			},
		  			{
		  				speed:1,
		  				who:"radiosad",
		  				talk:[ "..." ]
		  			},
		  			{
		  				speed:1,
		  				who:"radio",
		  				audio:"beep",
		  				talk:[ "Enemies are approaching.", "Stay alert, Hiro." ]
		  			},
		  		]
		  	}
		  },{
		  	object:"dialogues",
			property:"beforeboss",
			value:{
				font:"big",
		  		skipkey:"a",
		  		esckey:null,
		  		hideonend:true,  // Hidden when ended, so it is not shown during the boss battle.
		  		who:faces,
		  		scenes:[
		  			{
		  				speed:1,
		  				who:"radio",
		  				audio:"beep",
		  				talk:[ "Hiro...", "Something huge is coming...", "Please... survive..." ]
		  			},
		  			{
		  				speed:1,
		  				who:"pilot",
		  				audio:"beep",
		  				talk:[ "It's not the first huge enemy", "I will blow up... what's the", "matter?" ]
		  			},
		  			{
		  				speed:1,
		  				who:"radiosadder",
		  				audio:"beep",
		  				talk:[ "Please... forgive us...", "Survive... It's your last...", "mission..." ]
		  			},
		  			{
		  				speed:1,
		  				who:"pilot",
		  				audio:"beep",
		  				talk:[ "Wh... what happens?!" ]
		  			},
		  		]
		  	}
		  },{
		  	object:"dialogues",
			property:"boss",
			value:{
		  		font:"big",
		  		skipkey:"a",
		  		esckey:null,
		  		hideonend:true,  // Hidden when ended, so it is not shown during the boss battle.
		  		who:faces,
		  		scenes:[
		  			{
		  				speed:1,
		  				who:"wife",
		  				audio:"beepbad",
		  				talk:[ "At last you're here with me,", "Hiro..." ]
		  			},
		  			{
		  				speed:1,
		  				who:"pilotsurprised",
		  				audio:"beep",
		  				talk:[ "That... that voice..." ]
		  			},
		  			{
		  				speed:1,
		  				who:"wife",
		  				audio:"beepbad",
		  				talk:[ "You've left me alone for", "too many days, my love. For", "the war... but now..." ]
		  			},
		  			{
		  				speed:1,
		  				who:"pilotangry",
		  				audio:"beep",
		  				talk:[ "Sophia! My love! Wh... What", "they have done to you!!!" ]
		  			},
		  			{
		  				speed:1,
		  				who:"wife",
		  				audio:"beepbad",
		  				talk:[ "You've fought thousands of", "enemies... Now fight my", "deep loneliness..." ]
		  			},
		  			{
		  				speed:1,
		  				who:"pilotangry",
		  				audio:"beep",
		  				talk:[ "Please Sophia! Forgive me!", "Stop now! PLEASE STOP!" ]
		  			}
		  		]
		  	}
		  },{
		  	object:"dialogues",
			property:"bossend",
			value:{
		  		font:"big",
		  		skipkey:"a",
		  		esckey:null,
		  		hideonend:true,  // Hidden when ended, so it is not shown during the boss battle.
		  		who:faces,
		  		scenes:[
		  			{
		  				speed:2,
		  				who:"wife",
		  				audio:"beepbad",
		  				talk:[ "Good job, Hiro. You've beaten", "my loneliness... now I'm", "finally with you..." ]
		  			},
		  			{
		  				speed:1,
		  				who:"pilotangry",
		  				audio:"beep",
		  				talk:[ "Hold on, Sophia! I'm coming", "to save you!! Open the", "hangar!" ]
		  			},
		  			{
		  				speed:5,
		  				who:"wife",
		  				audio:"beepbad",
		  				talk:[ "I love you, Hiro." ]
		  			},
		  			{
		  				speed:1,
		  				who:"pilotangry",
		  				audio:"beep",
		  				talk:[ "SOPHIA!!" ]
		  			},
		  		]
		  	}
		  },{
		  	object:"dialogues",
			property:"titles",
			value:{
		  		skipkey:"a",
		  		esckey:"b",
				font:"small",
				scenes:[
					{
						speed:2,
						spacing:2,
						push:gbox.getScreenHH(),
						audiomusic:"ending",
						scroller:[
							"SOLITUDE",
							"A SHORT SHOOTER BY KESIEV",
							"","","",
							"JS-CODE BY",
							"KESIEV",
							"",
							"GRAPHICS BY",
							"KESIEV",
							"",
							"STORY BY",
							"KESIEV",
							"","",
		  					"SOUND EFFECTS",
		  					"CREATED USING",
		  					"CFXR",
		  					"THIRDCOG.EU/APPS/CFXR",
		  					"","",
		  					"MUSIC",
		  					"",
		  					"EXPANDAMONIUM!",
		  					"BY ANDYEXPANDY (c)2009",
		  					"8BITCOLLECTIVE.COM/MEMBERS/ANDYEXPANDY",
		  					"",
		  					"I BID YE FAREWELL",
		  					"BY ANDYEXPANDY (c)2009",
		  					"8BITCOLLECTIVE.COM/MEMBERS/ANDYEXPANDY",
		  					"",
		  					"SEVEN",
		  					"BY RICH VREELAND (c)2008",
		  					"WWW.RICHVREELAND.COM",
		  					"",
		  					"I MISS THOSE DAYS",
		  					"BY NE7 (c)2007",
		  					"8BITCOLLECTIVE.COM/MEMBERS/NE7",
		  					"","","",
							"CREATED USING THE AKIHABARA ENGINE",
							"BY KESIEV (c)2010",
							"WWW.KESIEV.COM",
							"","","","","","","","","","","",
							"THANK YOU FOR PLAYING!",
							"NEVER FORGET WHO LOVES YOU.",
							"",
							"THE END"
						]
					}
				]
			}
		}
	]
}
