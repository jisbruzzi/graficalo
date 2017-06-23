function ObjetoRuta(curvas,programaTextura,programaColor,gl){//curvas es un array que tiene en la primera la curva, y en la segunda su derivada normalizada, en la tercera el valor de la norma de la derivada
	let ancho=2;
	let gap=0.05*ancho;
	let alto=0.10*ancho;
	let canto=0.05*ancho;
	let contornoAsfalto = [0,-ancho-gap/2.0-0.00001+canto*1.25,alto-canto/2.0, 0,-gap/2.0+0.000001-canto*1.25,alto-canto/2.0,];
	let normalesAsfalto = [0,0,1,0,0,1];
	let contornoBorde =[0,-ancho-gap/2.0,alto,0,-ancho-gap/2.0,0,  0,-ancho-gap/2.0,0,0,-gap/2.0,0, 0,-gap/2.0,0,0,-gap/2.0,alto,  0,-gap/2.0,alto,0,-gap/2.0-canto,alto, 0,-gap/2.0-canto,alto,0,-gap/2.0-canto*1.5,alto-canto, 0,-gap/2.0-canto*1.5,alto-canto,0,-ancho-gap/2.0+canto*1.5,alto-canto, 0,-ancho-gap/2.0+canto*1.5,alto-canto,0,-ancho-gap/2.0+canto,alto, 0,-ancho-gap/2.0+canto,alto,0,-ancho-gap/2.0,alto];
	let normalesBorde = [0,-1,0,0,-1,0,                             0,0,-1,0,0,-1,                   0,1,0,0,1,0                   ,0,0,1,0,0,1,                           0,-0.83205,0.5447,0,-0.83205,0.5447,                   0,0,1,0,0,1,                                                           0,0.83205,0.5447,0,0.83205,0.5447,                                 0,0,1,0,0,1 ];

	let objetoRuta = new Objeto();

	let contornoAsfaltoDesplazado= new Array();
	for(var i=0;i<contornoAsfalto.length/3;i++){
		contornoAsfaltoDesplazado.push(0);
		contornoAsfaltoDesplazado.push(contornoAsfalto[i*3+1]+ancho+gap);
		contornoAsfaltoDesplazado.push(contornoAsfalto[i*3+2]);
	}

	let contornoBordeDesplazado = new Array();
	for(var i=0;i<contornoBorde.length/3;i++){
		contornoBordeDesplazado.push(0);
		contornoBordeDesplazado.push(contornoBorde[i*3+1]+ancho+gap);
		contornoBordeDesplazado.push(contornoBorde[i*3+2]);
	}
	var asfalto = new Array();
	var borde = new Array();
	//estas funciones no se usan mas, deberia sacarlas;
	for(var i=0;i<3;i++){
		asfalto.push(function(u,v){return 0.2;});

		borde.push(function(u,v){return 0.7;});
	}
	let sp=atlasShaderPs.p("normalmappeada-texturada");//normalmappeada-texturada
	let formaAsfaltoUno = new FormaBarrido(contornoAsfalto,normalesAsfalto,curvas,asfalto,0.001,gl).copiaConTexturaMapeada(atlasTexturas.t("autopista.jpg"),20);
    FormaNormalMappeada(formaAsfaltoUno,atlasTexturas.t("autopista_n.png"));
		//formaAsfaltoUno.agregarSampler2D("uSampler",atlasTexturas.t("referenciaDebug.jpg"));
	let formaAsfaltoDos = new FormaBarrido(contornoAsfaltoDesplazado,normalesAsfalto,curvas,asfalto,0.001,gl).copiaConTexturaMapeada(atlasTexturas.t("autopista.jpg"),20);
	FormaNormalMappeada(formaAsfaltoDos,atlasTexturas.t("autopista_n.png"));
	//formaAsfaltoDos.agregarSampler2D("uSampler",atlasTexturas.t("referenciaDebug.jpg"));

	let formaBordeUno = new FormaBarrido(contornoBorde,normalesBorde,curvas,borde,0.001,gl).copiaConTexturaMapeada(atlasTexturas.t("gris.jpg"),20);
	let formaBordeDos = new FormaBarrido(contornoBordeDesplazado,normalesBorde,curvas,borde,0.001,gl).copiaConTexturaMapeada(atlasTexturas.t("gris.jpg"),20);
    FormaNormalMappeada(formaBordeUno,atlasTexturas.t("concreto_n.jpg"));
		//formaBordeUno.agregarSampler2D("uSampler",atlasTexturas.t("referenciaDebug.jpg"));
    FormaNormalMappeada(formaBordeDos,atlasTexturas.t("concreto_n.jpg"));
		//formaBordeDos.agregarSampler2D("uSampler",atlasTexturas.t("referenciaDebug.jpg"));

	let objetoAsfaltoUno = new Objeto(new Modelo(formaAsfaltoUno,sp,gl));
	let objetoAsfaltoDos = new Objeto(new Modelo(formaAsfaltoDos,sp,gl));

	let objetoBordeUno = new Objeto(new Modelo(formaBordeUno,sp,gl));
	let objetoBordeDos = new Objeto(new Modelo(formaBordeDos,sp,gl));

	objetoRuta.hijos.push(objetoAsfaltoUno);
	objetoRuta.hijos.push(objetoAsfaltoDos);

	objetoRuta.hijos.push(objetoBordeUno);
	objetoRuta.hijos.push(objetoBordeDos);
	return objetoRuta;

}
