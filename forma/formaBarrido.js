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
function calcularVersorTangente(posAnterior, posPosterior){
	var resultado=new Array();
	var norma=0;
	for(var i=0;i<3;i++){
		resultado.push(posPosterior[i]-posAnterior[i]);
		norma+=Math.pow(resultado[i],2);
	}
	norma=Math.sqrt(norma);
	if(norma==0)
		throw "No se pudo calcular tangente.";
	for(var i=0;i<3;i++){
		resultado[i]/=norma;
	}

	return resultado;
}
function generarVertices(vertices,funcionCurva,paso){
	var vectorBinormal=[0,0,1];//esta condicion se da por ser curva planar en plano xy
	var vectorTangente, vectorNormal;
	var anchoMatriz=vertices.length/3;
	var altoMatriz=Math.floor(1/paso)+1;
	var resultadosFinal=new Array();
	for(var i=0;i<=1;i+=paso){
		var desplazamientos=new Array();
		desplazamientos=funcionCurva(i);
		var posPosterior;
		var posInferior;
		if(i==0){
			posAnterior=funcionCurva(0);
		}else{
			posAnterior=funcionCurva(i-paso/10);
		}
		if(i==1){
			posPosterior=funcionCurva(1);
		}else{
			posPosterior=funcionCurva(i+paso/10);
		}
		vectorTangente=calcularVersorTangente(posAnterior, posPosterior);
		vectorNormal=productoVectorial(vectorTangente,vectorBinormal);//norma==1,porque las otras dos normas son ==1
		var coseno=normaEuclidea(productoInterno(vectorTangente,vectorNormal));
		var seno=normaEuclidea(productoVectorial(vectorNormal,vectorTangente));
		var matriz=multiplicarMatriz(matrizRotacionEjeX(coseno,seno),matrizTraslacion(desplazamientos));	
		for(var j=0;j<anchoMatriz;j++){
			var punto=vertices.slice(j*3,(j+1)*3);
			punto=multiplicarMatrizHomogeneaVector(matriz,punto);
			resultadosFinal.concat(punto);
		}
	}

	return resultadosFinal;
}


function generarVerticesFormaRevolucion(vertices,pasoEnRadianes){
	var anchoMatriz=vertices.length/3;
	var altoMatriz=Math.floor(1/paso)+1;
	var resultadosFinal=new Array();
	for(var i=0;i<=1;i+=paso){
		var desplazamientos=new Array();
		desplazamientos=funcionCurva(i);
		for(var j=0;j<anchoMatriz;j++){
			for(var k=0;k<3;k++){
				resultadosFinal.push(vertices[j*3+k]+desplazamientos[k]);
			}
		}
	}

	return resultadosFinal;
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
			puntoInicial=cantidadPuntos-2;
		}else{
			t=t-(puntoInicial);
		}
		for(var i=0;i<3;i++){
			posicion.push(((1.0-t)*(1.0-t))/2.0*posPunto[puntoInicial*3+i]+((1.0-t)*t+1/2)*posPunto[puntoInicial*3+i+3]+(t*t)/2.0*posPunto[puntoInicial*3+i+2*3]);
		}
		return posicion;
	}
	return funcion;
}
function generarIndexBuffer(){}