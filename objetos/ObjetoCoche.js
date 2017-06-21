function ObjetoCoche(programaColor,programaTextura,gl){
	var obj= new Objeto();
	var largoCoche=5;
	var anchoCoche=2.5;
	var objCarroceria= new Objeto(new Modelo(new FormaCarroceria(gl),programaColor,gl));
	var objLlanta = new Objeto(new Modelo(new FormaLlanta(gl).copiaConTextura(atlasTexturas.t("llanta.jpg")),programaTextura,gl));
	var objCubierta = new Objeto(new Modelo(new FormaCubierta(gl),programaColor,gl));
	var objRuedaGenerica=new Objeto();
	objLlanta.rotar([0,0,1],Math.PI/2);

	objLlanta.mover(0,1,0);
	objCubierta.rotar([1,0,0],-Math.PI/2);
	objRuedaGenerica.mover(largoCoche/2*0.6/7,(anchoCoche/2/7-1/2/15),1.2/15);//coloco rueda delantera izq
	objRuedaGenerica.escalar(1/15,1/15,1/15);

	objRuedaGenerica.hijos.push(objLlanta);
	objRuedaGenerica.hijos.push(objCubierta);

	var objRuedaDelanteraDerecha = new Objeto();
	objRuedaDelanteraDerecha.escalar(1,-1,1);
	objRuedaDelanteraDerecha.hijos.push(objRuedaGenerica);
	
	var objRuedaTraseraDerecha = new Objeto();
	objRuedaTraseraDerecha.mover(-largoCoche*0.6/7,0,0);
	objRuedaTraseraDerecha.escalar(1,-1,1);
	objRuedaTraseraDerecha.hijos.push(objRuedaGenerica);

	var objRuedaTraseraIzquierda = new Objeto();
	objRuedaTraseraIzquierda.mover(-largoCoche*0.6/7,0,0);
	objRuedaTraseraIzquierda.hijos.push(objRuedaGenerica);

	var objRuedaDelanteraIzquierda = new Objeto();
	objRuedaDelanteraIzquierda.hijos.push(objRuedaGenerica);




	objCarroceria.mover(0,0,1.2/15);
	objCarroceria.escalar(1/7,1/7,1/7);
	obj.hijos.push(objCarroceria);



	obj.hijos.push(objRuedaDelanteraIzquierda);
	obj.hijos.push(objRuedaTraseraIzquierda);
	obj.hijos.push(objRuedaTraseraDerecha);
	obj.hijos.push(objRuedaDelanteraDerecha);
	obj.avanzar=function(distancia){
		objRuedaGenerica.rotar([0,1,0],distancia/(1.2/15));//como las ruedas estan espejadas(y no rotadas) no necesito hacer tratamiento especial para el giro
	}


	return obj;
}