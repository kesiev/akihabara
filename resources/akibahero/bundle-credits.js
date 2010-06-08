{
	// Funny thing. Resources can also be dynamic code, not only static things. That allow to
	// do strange things, like auto-filling staffroll, depending on the song(s) that are available
	// into the game.
	onLoad:function(load,res) {
	
		// The first part of the credits is ever the same.
		ending.credits={
			skipkey:"a",
			esckey:"b",
			font:"small",
			scenes:[
				{
					speed:2,
					spacing:2,
					push:gbox.getScreenHH(),
					scroller:[
						"AKIBA HERO",
						"AN UNORIGINAL MUSIC GAME BY KESIEV",
						"","","",
						"JS-CODE BY",
						"KESIEV",
						"","",
						"GRAPHICS BY",
						"KESIEV",
						"","",
						"GUITAR SOUND EFFECTS",
						"BY",
						"ARNALDO BRENNA",
						"",
						"SOUND EFFECTS",
						"CREATED USING",
						"CFXR",
						"THIRDCOG.EU/APPS/CFXR",
						"","",
						"MUSIC",
						""
					]
				}
			]
		};
		
		// Now let's fetch current song list and add staff to the roll
		for (var s in song) {
			ending.credits.scenes[0].scroller.push(song[s].title); // The song title...
			ending.credits.scenes[0].scroller.push("BY "+song[s].artist+" (c)"+song[s].year); // The song artist and year...
			ending.credits.scenes[0].scroller.push(song[s].contact); // The song contact...
			if (song[s].extranotes) { // If there are extra notes to add to staffroll..
				ending.credits.scenes[0].scroller.push(""); // A bit of space
				for (var i=0;i<song[s].extranotes.length;i++)
					ending.credits.scenes[0].scroller.push(song[s].extranotes[i]); // The song contact...
			}
			ending.credits.scenes[0].scroller.push(""); // A bit of space for the next one author			
			ending.credits.scenes[0].scroller.push("");			
		}
		
		// Now comes the usual closing stuff for credits.
		ending.credits.scenes[0].scroller.push("");
		ending.credits.scenes[0].scroller.push("");
		ending.credits.scenes[0].scroller.push("CREATED USING THE AKIHABARA ENGINE");
		ending.credits.scenes[0].scroller.push("BY KESIEV (c)2010");
		ending.credits.scenes[0].scroller.push("WWW.KESIEV.COM");
		ending.credits.scenes[0].scroller.push("");
		ending.credits.scenes[0].scroller.push("");
		ending.credits.scenes[0].scroller.push("");
		ending.credits.scenes[0].scroller.push("");
		ending.credits.scenes[0].scroller.push("");
		ending.credits.scenes[0].scroller.push("");
		ending.credits.scenes[0].scroller.push("");
		ending.credits.scenes[0].scroller.push("");
		ending.credits.scenes[0].scroller.push("");
		ending.credits.scenes[0].scroller.push("");
		ending.credits.scenes[0].scroller.push("");
		ending.credits.scenes[0].scroller.push("THANK YOU FOR PLAYING!");
		ending.credits.scenes[0].scroller.push("NEVER GIVE UP WITH YOUR DREAMS."); // For real, Arnaldo!
		ending.credits.scenes[0].scroller.push("");
		ending.credits.scenes[0].scroller.push("THE END");
		
		// Ok! Now credits are ok. The usual credits structure is kept, just the part in the
		// middle is variable.
	}
}