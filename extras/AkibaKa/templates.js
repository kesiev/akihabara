var templates={

	// ---
	// LEAVE ME ALONE demo template.
	// ---
	leavemealone: {
		defaulttemplate:false,
		label:"Leave Me Alone",
		notes:"Remember to name the placeholder fields on metadata and names accordingly: <b>stageX</b> is the current stage name and <b>stageY</b> is the next stage name.",
		resourcespath:"../../",
		metadata:[
			{ id:"objectname", label:"This stage name.", value:"text", defaultvalue:"stageX", type:"text" },
			{ id:"nextLevel", label:"Next stage name. Leave empty for game ending.", value:"text", defaultvalue:"stageY", type:"text" }
		],
		
		// --- Map
		tilewidth:20,
		tileheight:20,
		defaultlayername:"stageX",
		usefinalizetilemap: false,
		maxmapsize: { width:100, height:100 },
		minmapsize: { width:16, height:12 },
		
		// --- Objects
		defaultobjectgroupname:"stageX",
		objectset:{
			player:{
				defaultobject:true,
				mode:"once",
				color:"blue",
				shortlabel:"Ply",
				longlabel:"Player",
				width:20,
				height:40,
				metadata: [
					{ id:"side", label:"Facing to side",  value:"number",  defaultvalue:1,  type:"combo", items:[{id:0,label:"Left"},{id:1,label:"Right"}]}
				]
			},
			squid:{
				mode:"multi",
				color:"red",
				shortlabel:"Sqd",
				longlabel:"Squid",
				width:20,
				height:20,
				metadata: [
					{ id:"side", label:"Facing to side",  value:"number",  defaultvalue:1,  type:"combo", items:[{id:0,label:"Left"},{id:1,label:"Right"}]}
				]				
			}
		},
		
		// --- Raw resources (copied as is into the resource file)
		includeimages:false,
		includetiles:false,
		addImage:[
			["sprites","resources/leavemealone/cels.png"],
		],
		addTiles:[
			{id:"tiles",image:"sprites",tileh:20,tilew:20,tilerow:9,gapx:0,gapy:40},
		]	
	},
	
	
	// ---
	// SAMPLE TEMPLATE
	// ---
	
	sample:{ // Id of this template. Is also stored into the resource file for automatic selection.
		defaulttemplate:true, // If true, is the template selected by default when opening the editor. Handy when working at the same game for long!
		label:"Sample template", // (Mandatory) Label for the profile.
		notes:"This is a sample editor template. Check the comments on the sources for further infos", // Notes for this template. Are shown on the template selector.
		resourcespath:"../../", // (Mandatory) The path prefix for searching resources
		metadata:[ // This resource file's metadata. Is a generical set of fields that can be filled with different widgets. Thing's metadata are ever structured in the same way.
			{
				id:"textfield", // (Mandatory) The field name
				label:"A sample text field", // (Mandatory) The field label. Explain the meaning of this attribute for the game.
				value:"text", // (text|number) The type of this field data. If "number", the chosen value will be converted in number. Default is text.
				defaultvalue:"defaultvalue", // The field default value
				type:"text", // (Mandatory) (text|constant|combo) The field type. Text is freely editable, constant is a fixed field and combo allow to the user to choose between some values.
			},
			// Note that must exist an "objectname" metadata field in this metadata set. Is the property name of the "mapmeta" object that will be filled with this metadata. Usually is ever the same and overwritten each level is loaded but can be different for each stage if you're going to load all the stages when the game starts.
			{
				id:"objectname",
				label:"The mapmeta property for this stage",
				value:"text",
				defaultvalue:"stagedata",
				type:"constant"
			},
			// These are more examples of metadata fields.
			{
				id:"numberfield", // A number field example
				label:"Please choose a number",
				value:"number", // This field will be converted to a number
				defaultvalue:3,
				type:"text"
			},
			{
				id:"constantfield", // A constant field example
				label:"You can't change this field.",
				defaultvalue:"Sorry :)",
				type:"constant"
			},
			{
				id:"combofield", // A sample combo field
				label:"Choose one of these strings.",
				defaultvalue:"due", // The default value is one of the "items" list.
				type:"combo",
				items:[ // The combo values. Pairs of id/label.
					{id:"uno",label:"One in italian"},
					{id:"due",label:"Two in italian"},
					{id:"tre",label:"Three in italian"}
				]
			},
			{
				id:"combonumberfield", // A sample combo field with numeric values
				label:"Choose one of these numbers.",
				value:"number", // This field will be converted to a number				
				defaultvalue:3,
				type:"combo",
				items:[ // The combo values. Pairs of id/label.
					{id:1,label:"One"},
					{id:2,label:"Two"},
					{id:3,label:"Three"}
				]
			}
			
				
		],
		
		// --- Map
		tilewidth:20, // (Mandatory) Width of map tiles
		tileheight:20, // (Mandatory) Height of map tiles
		defaultlayername:"defaultlayer", // (Mandatory) The default layer name
		usefinalizetilemap: true, // Wrap up layers with the help.finalizeTilemap command. Save you to do that when the map is loaded but needs that tilemaps have to be already loaded.
		maxmapsize: { width:100, height:100 }, // Maximum size of the map
		minmapsize: { width:16, height:12 }, // Minimum size of the map
		layermetadata:[ // Metadata for each map layer. The structure is the same of previous metadata definitions.
			{ id:"textfield", label:"A sample text field",  value:"text",  defaultvalue:"default value",  type:"text" }
		],
		
		// --- Objects
		defaultobjectgroupname:"defaultgroup", // (Mandatory) The default object group name.
		objectgroupmetadata:[ // Metadata for each group of objects. The structure is the same of previous metadata definitions.
			{ id:"textfield", label:"A sample text field",  value:"text",  defaultvalue:"default value",  type:"text" }
		],
		objectset:{ // Objects that can be added to the groups. Are shown as coloured squared placeholders.
			player:{ // (Mandatory) The object id
				defaultobject:true, // If true, will be the default selected object when selecting a group from the list.
				mode:"once", // (Mandatory) (once|multi) Defines if this object can be placed just once or multiple times in the same group.
				color:"blue", // (Mandatory) This object placeholder color.
				shortlabel:"Ply", // (Mandatory) The short label that is shown in this object placeholder,
				longlabel:"Player", // (Mandatory) The long name of this object
				width:20, // (Mandatory) Width in pixels of this object
				height:40, // (Mandatory) Height in pixels of this object
				metadata: [ // This object's metadata. The structure is the same of previous metadata definitions
					{ id:"side", label:"Facing to side",  value:"number",  defaultvalue:1,  type:"combo", items:[{id:0,label:"Left"},{id:1,label:"Right"}]}
				]
			},
			enemy:{ mode:"multi", color:"red", shortlabel:"Enm", longlabel:"Enemy", width:20, height:20 } // An example of multiple instantiable object.
		},
		
		// --- Raw resources (copied as is into the resource file)
		includeimages:true, // Add the addImage block to the resource file. Is useful when loading progressively graphics over the older one.
		includetiles:true, // Add the addTiles block to the resource file. Is useful when loading progressively graphics over the older one.
		addImage:[
			["sprites","resources/leavemealone/cels.png"],
		],
		addTiles:[
			{id:"tiles",image:"sprites",tileh:20,tilew:20,tilerow:9,gapx:0,gapy:40},
		]	
	}


};