function cargarShaders(finCarga){
	let shaders=[
	{n:"shader-fs-colored-obj", t:"x-shader/x-fragment"},
	{n:"shader-vs-colored-obj", t:"x-shader/x-vertex"},
	{n:"shader-fs-textured-obj", t:"x-shader/x-fragment"},
	{n:"shader-vs-textured-obj", t:"x-shader/x-vertex"}
	];
	cargadas=0;
	for( let i=0; i<shaders.length; i++){
		
		let s =shaders[i];
		$.get(s.n+".glsl",function(codigo){
			s.c=codigo;
			cargadas += 1;
			if (cargadas==4){
				console.log(shaders);
				finCarga(shaders);
			}
		});
	}
	
	
}