/*NOTA: esta funcion, solo torma curvas planares sobre el plano xy, si quiere curvas en otro plano, externamente a la funcion debe 
hacer la rotacion y traslacion externamente a la funcion, devuelve un array con las posiciones de los vertices*/
function generarVertices(vertices,funcionCurva,paso){
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
		for(var i=0;i<3;i++ ){


			posicion.push(((1.0-t)*(1.0-t))/2.0*posPunto[puntoInicial*3+i]+((1.0-t)*t+1/2)*posPunto[puntoInicial*3+i+3]+(t*t)/2.0*posPunto[puntoInicial*3+i+2*3]);
		}
		return posicion;
	}
	return funcion;
}
function generarIndexBuffer(){}