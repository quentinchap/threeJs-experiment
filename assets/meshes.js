var MESHES =
{
	Type: { Tree:0},
	Names:[
		"assets/libs/tree4.json"
	],
	ms_MorphsGeometry: [],
	ms_Morphs: [],
	ms_Loader: null,
	
	Initialize: function()
	{
		this.ms_Loader = new THREE.JSONLoader();
	},
	
	Load: function( inType, inCallback )
	{
		if( inType >= 0 && inType < this.Names.length )
		{
            console.log(this.Names,inType,inCallback);
			this.ms_Loader.load( this.Names[inType], inCallback );
			return true;
		}
		return false;
	},
	
	AddMorph: function( inGeometry )
	{
		this.MorphColorsToFaceColors( inGeometry );
		var mesh = this.CreateMorph( inGeometry, 0.55, 600, 0, 0, 0, false );
		this.ms_Morphs.push( mesh );
		this.ms_MorphsGeometry.push( inGeometry );
		return mesh;
	},
	
	CreateMorph: function( inGeometry, inSpeed, inDuration, inX, inY, inZ, inFudgeColor ) 
	{
		var material = new THREE.MeshPhongMaterial( { color: 0xffffff, morphTargets: true, vertexColors: THREE.FaceColors, wrapAround: true, specular: 0xffffff } );

		if ( inFudgeColor )
			THREE.ColorUtils.adjustHSV( material.color, 0, 0.5 - Math.random(), 0.5 - Math.random() );

		var meshAnim = new THREE.MorphBlendMesh( inGeometry, material );

		meshAnim.speed = inSpeed;
		meshAnim.duration = inDuration;
		meshAnim.time = 1000 * Math.random();

		meshAnim.position.set( inX, inY, inZ );

		meshAnim.castShadow = true;
		meshAnim.receiveShadow = true;
		
		return meshAnim;
	},
	
	MorphColorsToFaceColors: function( inGeometry ) 
	{
		if ( inGeometry.morphColors && inGeometry.morphColors.length ) 
		{
			var colorMap = inGeometry.morphColors[ 0 ];
			
			for ( var i = 0; i < colorMap.colors.length; i ++ )
				inGeometry.faces[i].color = colorMap.colors[i];
		}
	},
	
	Update: function( inDelta )
	{
		for ( var i = 0; i < this.ms_Morphs.length; i++ ) 
		{
			morph = this.ms_Morphs[i];
			morph.update( 1000 * inDelta );
		}
	}
};