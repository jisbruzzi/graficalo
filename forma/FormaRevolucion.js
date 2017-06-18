
//pasar en forma de array concatenado vertices y normales, el paso debe ser en radianes, funcionesColor debe tener funciones que indiquen color de 0 a 1 para RGB, en ese orde, como parametro deben tomar angulo, y numero de pixel en patron inicial
function FormaRevolucion(vertices,normales,paso,funcionesColor,gl){


  this.puntosPatron=vertices.length/3;
  this.repeticionesPatron = Math.floor(Math.PI*2/paso);

  let position_buffer = new Array();
  let normal_buffer = new Array();
  let texture_coord_buffer = new Array();
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
			color_buffer.push(funcionesColor[0](i,j));

			color_buffer.push(funcionesColor[1](i,j));
			color_buffer.push(funcionesColor[2](i,j));
			var u=j*10;

			var v=i*10;
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


	//INTERFAZ
	this.normal_buffer=normal_buffer;
	this.texture_coord_buffer=texture_coord_buffer;
	this.position_buffer=position_buffer;
	this.index_buffer=index_buffer;
	this.color_buffer=color_buffer;

  //-- interfaz obligatoria --//
  this.copiaConTextura=hacerMetodoCopiaConTextura(this,gl);
    this.esIluminado=getter(true);

  this.modoDibujado = getter(gl.TRIANGLE_STRIP);
   
}
