function GrupoCoches(cantidadCoches,curvas,alturaRuta,programaColor,porgramaTextura,gl){
	let yo=new Objeto();

	var cochePrincipal=new ObjetoCoche(programaColor,porgramaTextura,gl);
	var i=0;
	var paso=0.1250;
	var anchoCoche=2.5/7;
	var largoCoche=5/7;
	var anchoTotal=2;
	var bordeInicialRuta=0.2*anchoTotal+anchoCoche/2;
	var anchoRuta=anchoTotal-bordeInicialRuta*2;
	cochePrincipal.mover(0,0,alturaRuta);//lo subo a la ruta
	var cochesCentrados=[]
	var posicionEnCurva=[];
	var par=true;//da direccion

	for(var i=0;i<cantidadCoches;i++){
		var posicionEnCarril=-(Math.random()*anchoRuta+bordeInicialRuta);//el - es para que se maneje por la
		var auxiliar= new Objeto();
		auxiliar.hijos.push(cochePrincipal);
		auxiliar.mover(0,posicionEnCarril,0)//posicionarlo en carril
		//if(!par){
		//	auxiliar.escalar(1,1,1);
		//}

		par=!par;
		cochesCentrados.push(new Objeto());
		cochesCentrados[i].hijos.push(auxiliar);
	}

	inicioIntervalo=0;
	let longitudAproximada=0;
	for(var i=0;i<1;i+=0.01){
		longitudAproximada+=0.01*curvas[2](i);
	}
	let distanciaIdealEntreCoches=longitudAproximada/cantidadCoches*0.85;//acoto un poco para no salir de la carretera
	let coche=1;
	posicionEnCurva[0]=0;
	let distanciaRecorrida=0;
	for(var i=0;i<1;i+=0.01){
		distanciaRecorrida+=0.01*curvas[2](i);
		
		if(distanciaRecorrida>distanciaIdealEntreCoches){
			distanciaRecorrida=0;
			posicionEnCurva[coche]=i;
			distanciaAProximoCoche= ((Math.random()-0.5)/0.5+1)*distanciaIdealEntreCoches;
			coche++;
		}
	}
	//inicializar posicon en curva

	yo.actualizarPosicionesEnCurva=function(paso){
		let par=true;
		for(var i=0;i<cantidadCoches;i++){
			var normaTang =curvas[2](posicionEnCurva[i]);
			if(!par){
				posicionEnCurva[i]-=paso/normaTang;
				if(posicionEnCurva[i]<0) //vuelvo a iniciar
					posicionEnCurva[i]++;
			}else{
				posicionEnCurva[i]+=paso/normaTang;

				if(posicionEnCurva[i]>1)// vuelvo a iniciar
					posicionEnCurva[i]--;
			}
			par=!par;
		}
	}

	yo.tick=function(){

		yo.avanzar();
	}
	yo.avanzar=function(){
		cochePrincipal.avanzar(paso);
		yo.actualizarPosicionesEnCurva(paso);
		par=true;

		for(var i=0;i<cantidadCoches;i++){
			var desp = curvas[0](posicionEnCurva[i]);
			var tang = curvas[1](posicionEnCurva[i]);
			if(!par){
				var ang = anguloEntre([-1,0,0],tang);
			}else{
				var ang = anguloEntre([1,0,0],tang);
			}
			cochesCentrados[i].anularRotacion();
			cochesCentrados[i].anularPosicion();


			cochesCentrados[i].mover(desp[0],desp[1],desp[2]);
			cochesCentrados[i].rotar([0,0,1], ang);

			par=!par;


		}
	}
	console.log(anguloEntre([1,0,0],[0,1,0]));
	yo.hijos=cochesCentrados;
	return yo;
}
