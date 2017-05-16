/*NOTA: esta funcion, solo torma curvas planares sobre el plano xy, si quiere curvas en otro plano, externamente a la funcion debe 
hacer la rotacion y traslacion externamente a la funcion, devuelve un array con las posiciones de los vertices*/

//pasar en forma de array concatenado vertices y normales, el paso debe ser en radianes
function FormaRevolucion(vertices,normales,paso,gl){


  this.puntosPatron=vertices.length/3;
  this.repeticionesPatron = Math.floor(Math.PI*2/paso);

  let position_buffer = new Array();
  let normal_buffer = new Array();
  let texture_coord_buffer = [];
  let color_buffer = new Array();


	var vectorBinormal=[0,0,1];//esta condicion se da por ser curva planar en plano xy
	var vectorTangente, vectorNormal;

	
	for(var i=0;i<2*Math.PI+paso/10;i+=paso){//+paso/10 para evitar errores de redondeo
		if(i>Math.PI*2) i=2*Math.PI;
		//vectorNormal=productoVectorial(vectorTangente,vectorBinormal);//norma==1,porque las otras dos normas son ==1
		var coseno=Math.cos(i);
		var seno=Math.sin(i);
		var matrizRotacion=matrizRotacionEjeZ(coseno,seno);
		for(var j=0;j<this.puntosPatron;j++){
			var punto=vertices.slice(j*3,(j+1)*3);
			var normal=normales.slice(j*3,(j+1)*3);
			punto=(multiplicarMatrizHomogeneaVector(matrizRotacion,punto));
			normal=(multiplicarMatrizHomogeneaVector(matrizRotacion,normal));
			for(var aux=0;aux<3;aux++){
				position_buffer.push(punto[aux]);
				normal_buffer.push(normal[aux]);
				
			}
			color_buffer.push(Math.cos(i)/2+0.5);

			color_buffer.push(Math.sin(i)/2+0.5);
			color_buffer.push(0.2);
			var u=j/(this.puntosPatron-1);
			var v=i/Math.PI;
			texture_coord_buffer.push(u);
			
			texture_coord_buffer.push(v);

		}
	}


  // Buffer de indices de los triangulos
  let index_buffer = new Array();

  for (var i=0; i < this.repeticionesPatron; i++) {//latitud
    if(i%2==0)
	    for (var j=0; j < this.puntosPatron; j++) {//longitud creciente
	    	index_buffer.push(this.puntosPatron*i+j);
	    	index_buffer.push(this.puntosPatron*((i+1)%this.repeticionesPatron)+j);
	    }
	else
	    for(var j=this.puntosPatron-1;j>=0;j--){//longitud decreciente
	    	index_buffer.push(this.puntosPatron*i+j);
	    	index_buffer.push(this.puntosPatron*((i+1)%this.repeticionesPatron)+j);
	    }

    
  }


  //generar los buffers de opengl
  let webgl_normal_buffer = new GlNormalBuffer(gl).aPartirDe(normal_buffer);
  let webgl_texture_coord_buffer = new GlTextureCoordBuffer(gl).aPartirDe(texture_coord_buffer);
  let webgl_position_buffer = new GlPositionBuffer(gl).aPartirDe(position_buffer);
  let webgl_index_buffer = new GlIndexBuffer(gl).aPartirDe(index_buffer);
  let webgl_color_buffer = new GlColorBuffer(gl).aPartirDe(color_buffer);

  let getNormalBuffer=getter(webgl_normal_buffer);
  let getTextureCoordBuffer=getter(webgl_texture_coord_buffer);
  let getPositionBuffer=getter(webgl_position_buffer);
  let getColorBuffer=getter(webgl_color_buffer);


  //-- inrterfaz opcional según el shader --//
  this.aVertexPosition=getter(webgl_position_buffer);
  this.aTextureCoord  =getter(webgl_texture_coord_buffer);
  this.aVertexNormal  =getter(webgl_normal_buffer);
  this.aVertexColor   =getter(webgl_color_buffer);

  //-- interfaz obligatoria --//
  this.copiaConTextura=hacerMetodoCopiaConTextura(this);
  this.getIndexBuffer =getter(webgl_index_buffer);
    this.esIluminado=getter(true);

  this.modoDibujado = getter(gl.TRIANGLE_STRIP);
}