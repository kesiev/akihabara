extras.push({
	id:"gridgenerator",
	label:"Grid generator",
	action:function() {
		var dia="Cell size: <input id='cel-w' value='20'> X <input id='cel-h' value='20'> pixels<br>";
		dia+="Grid size: <input id='grd-w' value='10'> X <input id='grd-h' value='10'> cells<br>";
		dia+="Colors: <select id='grd-c'>";
		dia+="<option value=''>Black and white</option>";
		dia+="<option value='bluered'>Blue and red</option>";
		dia+="<option value='whitemagenta'>White and magenta</option>";
		dia+="</select>";
		dia+="<br><br><input type=button onclick='getextra(\"gridgenerator\").make()' value='Make grid'> <input type=button onclick='detailhide()' value='Cancel'>";
		dia+="<br><hr><i>Right click and save. You can use as background for making sprites.<br><br><canvas id='grd-canvas'></canvas>";
		detailshow(dia);	
	},
	make:function() {
		var c=document.getElementById('grd-canvas');
		var ctx=c.getContext("2d");
		var cw=document.getElementById('cel-w').value*1;
		var ch=document.getElementById('cel-h').value*1;
		var gw=document.getElementById('grd-w').value*1;
		var gh=document.getElementById('grd-h').value*1;
		var cl=["#000000","#ffffff"];
		switch (getcombovalue('grd-c')) {
			case "bluered": { cl=["#ff0000","#0000ff"]; break; }
			case "whitemagenta": { cl=["#ffffff","#ff00ff"]; break; }
			default: { cl=["#000000","#ffffff"]; break; }
		}
		c.width=cw*gw;
		c.height=ch*gh;
		
		ctx.save();
		var curc;
		for (var y=0;y<gh;y++) {
			curc=y%cl.length;
			for (var x=0;x<gw;x++) {
				ctx.fillStyle = cl[curc];
				ctx.fillRect(x*cw,y*ch,cw,ch);			
				curc=(curc+1)%cl.length;
			}
		}
		ctx.restore();
	}
});