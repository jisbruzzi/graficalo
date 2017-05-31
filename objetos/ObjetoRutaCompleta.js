function anguloEntre(vectorUno,vectorDos){
	var angulo=Math.acos(productoInterno(vectorUno,vectorUno));
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
	var integralAproximada=55;
	var distanciaEntreLuminarias=105;
	var par=true;
	paso=0.01;
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
		objetoAux.escalar(1/15,1/15,1/15);
		objetoAux.rotar([0,0,1],((par?Math.PI:0)+anguloEntre(tang,[1,0,0])));
		objetoAux.mover(desp[0],desp[1],desp[2]);
		objetoCompleto.hijos.push(objetoAux);
		integralAproximada=0;
		}
	}
	objetoCompleto.hijos.push(objetoRuta);
	return objetoCompleto;
}