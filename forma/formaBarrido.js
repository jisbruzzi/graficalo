/*NOTA: esta funcion, solo torma curvas planares sobre el plano xy, si quiere curvas en otro plano, externamente a la funcion debe 
hacer la rotacion y traslacion externamente a la funcion, devuelve un array con las posiciones de los vertices*/
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
	for(var i=0;i<unVector.length;i++){
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
				//console.log("izq: "+matrizIzquierda[i][k] +"der: "+matrizDerecha[k][j] +"res: "+suma)
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
	vectorTraspuesto.push([1]);
	vectorTraspuesto=multiplicarMatriz(matriz,vectorTraspuesto);

	return [vectorTraspuesto[0][0],vectorTraspuesto[1][0],vectorTraspuesto[2][0]];
}
//obtener una matriz a traves de seno y coseno
function matrizRotacionEjeZ(coseno,seno){
	var matriz=[
	[coseno,-seno,0,0],
	[seno,coseno,0,0],
	[0,0,1,0],
	[0,0,0,1]
	];
	
	return matriz;
}
function matrizTraslacion(desplazamientos){
	var matriz=[
	[1,0,0,desplazamientos[0]],
	[0,1,0,desplazamientos[1]],
	[0,0,1,desplazamientos[2]],
	[0,0,0,1]
	];
	return matriz;
}
//pasar en forma de array que contiene xyz del punto1, luego xyz punto dos 
//ej:curvaBSplineCuadratica([1.0,1.0,1.0,2.0,2.0,2.0,3.0,3.0,3.0])
function curvaBSplineCuadratica(posicionesPuntos){

	var cantidadPuntos=Math.floor(posicionesPuntos.length/3);
	if(cantidadPuntos<3)
		throw "Cantidad de puntos menor que lo necesario.";
	var funcion=function(t){
		if(t>1||t<0)
			throw "Parametro no pertenece a rango valido.";
		var posPunto=posicionesPuntos;
		var posicion=new Array();
		t=t*(cantidadPuntos-2);
		var puntoInicial=Math.floor(t);
		if(cantidadPuntos-2<=puntoInicial){//significa que estoy al final de toda la curva o pasado,
		// en ese caso el punto inicial tomo el ultimo punto
			t=1;
			puntoInicial=cantidadPuntos-3;
		}else{
			t=t-(puntoInicial);
		}
		for(var i=0;i<3;i++){
			posicion.push(((1.0-t)*(1.0-t))/2.0*posPunto[puntoInicial*3+i]+((1.0-t)*t+1/2)*posPunto[puntoInicial*3+i+3]+(t*t)/2.0*posPunto[puntoInicial*3+i+2*3]);
		}
		return posicion;
	}
	var derivada=function(t){
		if(t>1||t<0)
			throw "Parametro no pertenece a rango valido.";
		var posPunto=posicionesPuntos;
		var tangente=new Array();
		t=t*(cantidadPuntos-2);
		var puntoInicial=Math.floor(t);
		if(cantidadPuntos-2<=puntoInicial){//significa que estoy al final de toda la curva o pasado,
		// en ese caso el punto inicial tomo el ultimo punto
			t=1;
			puntoInicial=cantidadPuntos-3;
		}else{
			t=t-(puntoInicial);
		}
		norma=0;
		for(var i=0;i<3;i++){
			tangente.push((-1.0+1.0*t)*posPunto[puntoInicial*3+i]+(1.0-2.0*t)*posPunto[puntoInicial*3+i+3]+t*posPunto[puntoInicial*3+i+2*3]);
			norma+=tangente[i]*tangente[i];
		}
		for(var i=0;i<3;i++){
			tangente[i]/=Math.sqrt(norma);
		}
		return tangente;
	}
	return [funcion,derivada];
}


//pasar en forma de array concatenado vertices y normales,las normales deben estar normalizadas, en el array se debe pasar primero la funcion con las posiciones
//y la siguiente debe ser la derivada 
function FormaBarrido(vertices,normales,arrayFunciones,paso,gl){


  this.puntosPatron=vertices.length/3;
  this.repeticionesPatron = Math.floor(1/paso)+1;

  let position_buffer = new Array();
  let normal_buffer = new Array();
  let texture_coord_buffer = new Array();
  let color_buffer = new Array();


	var vectorBinormal=[0,0,1];//esta condicion se da por ser curva planar en plano xy
	var vectorTangente, vectorNormal;
	
	for(var i=0;i<1+paso;i+=paso){//el paso /10 es para evitar errores de redondeo que generen que no se ponga el ultimo numero
		if(i>1) i=1;
		var desplazamientos=new Array();
		desplazamientos=arrayFunciones[0](i);
		vectorTangente=arrayFunciones[1](i);
		vectorNormal=productoVectorial(vectorTangente,vectorBinormal);//norma==1,porque las otras dos normas son ==1
		var coseno=productoInterno([1,0,0],vectorTangente);
		var vectorGiro=productoVectorial([1,0,0],vectorTangente);
		var seno=normaEuclidea(vectorGiro);
		if(vectorGiro[2]<0)
			seno*=-1;
		var matrizRotacion=matrizRotacionEjeZ(coseno,seno);
		var matrizCompleta=multiplicarMatriz(matrizTraslacion(desplazamientos),matrizRotacion);	
		for(var j=0;j<this.puntosPatron;j++){
			var punto=vertices.slice(j*3,(j+1)*3);
			var normal=normales.slice(j*3,(j+1)*3);
			punto=multiplicarMatrizHomogeneaVector(matrizCompleta,punto);
			position_buffer.concat(punto);


			position_buffer.push(punto[0]);
			position_buffer.push(punto[1]);
			position_buffer.push(punto[2]);
			normal=multiplicarMatrizHomogeneaVector(matrizRotacion,normal);
			
			normal_buffer.push(normal[0]);
			normal_buffer.push(normal[1]);
			normal_buffer.push(normal[2]);

			color_buffer.push(0.5);
			color_buffer.push(0.5);
			color_buffer.push(0.5);
			var u=j/(this.puntosPatron-1);
			var v=i*(this.repeticionesPatron-1);
			texture_coord_buffer.push(u);
			
			texture_coord_buffer.push(v);

		}
	}


  // Buffer de indices de los triangulos
  let index_buffer = new Array();

  for (var i=0; i < this.repeticionesPatron-1; i++) {//largo
    if(i%2==0)
	    for (var j=0; j < this.puntosPatron; j++) {//ancho creciente
	    	index_buffer.push(this.puntosPatron*i+j);
	    	index_buffer.push(this.puntosPatron*(i+1)+j);
	    }
	else
	    for(var j=this.puntosPatron-1;j>=0;j--){//ancho decreciente
	    	index_buffer.push(this.puntosPatron*i+j);
	    	index_buffer.push(this.puntosPatron*(i+1)+j);
	    }

    
  }

  //generar los buffers de opengl
  let webgl_normal_buffer = new GlNormalBuffer(gl).aPartirDe(normal_buffer);
  let webgl_texture_coord_buffer = new GlTextureCoordBuffer(gl).aPartirDe(texture_coord_buffer);
  let webgl_position_buffer = new GlPositionBuffer(gl).aPartirDe(position_buffer);
  let webgl_index_buffer = new GlIndexBuffer(gl).aPartirDe(index_buffer);
//  console.log(color_buffer);
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