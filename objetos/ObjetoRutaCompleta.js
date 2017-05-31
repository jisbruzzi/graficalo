function anguloEntre(vectorUno,vectorDos){
	var angulo=Math.acos(productoInterno(vectorUno,vectorDos));
	var vectorGiro=productoVectorial(vectorUno,vectorDos);
	var indicadorSentido=productoInterno(vectorGiro,[0,0,1]);
		if(indicadorSentido<0)
			angulo*=-1;
	return angulo;
}


function ObjetoRutaCompleta(curvas,texturaAsfalto,texturaBorde,programaTextura,programaColor,gl){
	var objetoCompleto = new Objeto();
	var objetoRuta = new ObjetoRuta(curvas,texturaAsfalto,texturaBorde,programaTextura,programaColor,gl);
	var luminaria = new ObjetoLuminaria(programaColor,gl);
	var integralAproximada=50;
	var distanciaEntreLuminarias=100;
	var par=true;
	paso=0.001;//aumentar el paso solo aumenta la precision
	for(var i=0;i<1+paso/10;i+=paso){
		if(i>1)
			i=1;
		var normaTang=curvas[2](i);
		integralAproximada+=normaTang*paso;
		if(integralAproximada>=distanciaEntreLuminarias){

		var objetoAux= new Objeto();
		par=!par;
		var desp= curvas[0](i);
		var tang= curvas[1](i);


		objetoAux.hijos.push(luminaria);
		objetoAux.escalar(1/30,1/30,1/30);
		objetoAux.rotar([0,0,1],((par?Math.PI:0)-anguloEntre(tang,[0,-1,0]))+Math.PI/2);
		objetoAux.mover(desp[0],desp[1],desp[2]);
		objetoCompleto.hijos.push(objetoAux);
		integralAproximada=0;
		}
	}
	objetoCompleto.hijos.push(objetoRuta);
	return objetoCompleto;
}
