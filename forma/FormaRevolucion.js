/*NOTA: esta funcion, solo torma curvas planares sobre el plano xy, si quiere curvas en otro plano, externamente a la funcion debe
hacer la rotacion y traslacion externamente a la funcion, devuelve un array con las posiciones de los vertices*/
/*
function productoVectorial(unVector,otroVector){
	var resultado=new Array();
	for(var i=0;i<3;i++){
		resultado.push(unVector[(1+i)%3]*otroVector[(2+i)%3]-otroVector[(1+i)%3]*unVector[(2+i)%3]);
	}
	return resultado;
}
function normaEuclidea(vector){
	var norma=0;
	for(var i=0;i<vector.length;i++){
		norma+=Math.pow(vector[i],2);
	}
	return Math.sqrt(norma);
}
function productoInterno(unVector,otroVector){
	var resultado=0;
	if(unVector.length!=otroVector.length)
		throw "Vectores incomptaibles para multiplicar";
	for(var i=0;i<unVector;i++){
		resultado+=unVector[i]*otroVector[i];
	}
	return resultado;
}
function multiplicarMatriz(matrizIzquierda,matrizDerecha){
	var matriz=new Array();
	if( matrizIzquierda[0].length!=matrizDerecha.length)
		throw "Matrices incompatibles para multiplicar";
	for(var i=0;i<matrizIzquierda.length;i++){
		matriz.push([]);
		for(var j=0;j<matrizDerecha[0].length;j++){
			var suma=0;
			for(var k=0;k<matrizDerecha.length;k++){
				suma+=matrizIzquierda[i][k]*matrizDerecha[k][j];
			}
			matriz[i].push(suma);
		}
	}
	return matriz;
}
function multiplicarMatrizHomogeneaVector(matriz,vector){
	var vectorTraspuesto=new Array();
	for(var i=0;i<vector.length;i++){
		vectorTraspuesto.push([vector[i]]);
	}
	vectorTraspuesto.push(1);
	return multiplicarMatriz(matriz,vectorTraspuesto).slice(0,3);
}
//obtener una matriz a traves de seno y coseno
function matrizRotacionEjeX(coseno,seno){
	var matriz=[
	[1,0,0,0],
	[0,coseno,-seno,0],
	[0,seno,coseno,0],
	[0,0,0,1]
	];

	return matriz;
}
function matrizTraslacion(desplazamientos){
	var matriz=[
	[0,0,0,desplazamientos[0]],
	[0,0,0,desplazamientos[1]],
	[0,0,0,desplazamientos[2]],
	[0,0,0,1]
	];
	return matriz;
}
*/

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


	//INTERFAZ
	this.normal_buffer=normal_buffer;
	this.texture_coord_buffer=texture_coord_buffer;
	this.position_buffer=position_buffer;
	this.index_buffer=index_buffer;
	this.color_buffer=color_buffer;

  //-- interfaz obligatoria --//
  this.copiaConTextura=hacerMetodoCopiaConTextura(this);
    this.esIluminado=getter(true);

  this.modoDibujado = getter(gl.TRIANGLE_STRIP);
}
