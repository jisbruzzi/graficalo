function ObjetoRuta(curvas,texturaAsfalto,texturaBorde,programaTextura,programaColor,gl){//curvas es un array que tiene en la primera la curva, y en la segunda su derivada
	let ancho=1;
	let gap=0.05*ancho;
	let alto=0.10*ancho;
	let canto=0.05*ancho;
	let contornoAsfalto = [0,-ancho-gap/2.0+0.00001,alto-canto/2.0, 0,-gap/2.0-0.000001,alto-canto/2.0,];
	let normalesAsfalto = 	[0,0,1,0,0,1];
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

	for(var i=0;i<3;i++){
		asfalto.push(function(u,v){return 0.2;});

		borde.push(function(u,v){return 0.7;});
	}

	let formaAsfaltoUno = new FormaBarrido(contornoAsfalto,normalesAsfalto,curvas,asfalto,0.01,gl).copiaConTextura(texturaAsfalto);
	let formaAsfaltoDos = new FormaBarrido(contornoAsfaltoDesplazado,normalesAsfalto,curvas,asfalto,0.01,gl).copiaConTextura(texturaAsfalto);
	
	let formaBordeUno = new FormaBarrido(contornoBorde,normalesBorde,curvas,borde,0.01,gl).copiaConTextura(texturaBorde);
	let formaBordeDos = new FormaBarrido(contornoBordeDesplazado,normalesBorde,curvas,borde,0.01,gl).copiaConTextura(texturaBorde);

	let objetoAsfaltoUno = new Objeto(new Modelo(formaAsfaltoUno,programaColor,gl));
	let objetoAsfaltoDos = new Objeto(new Modelo(formaAsfaltoDos,programaColor,gl));
	
	let objetoBordeUno = new Objeto(new Modelo(formaBordeUno,programaColor,gl));
	let objetoBordeDos = new Objeto(new Modelo(formaBordeDos,programaColor,gl));

	objetoRuta.hijos.push(objetoAsfaltoUno);
	objetoRuta.hijos.push(objetoAsfaltoDos);

	objetoRuta.hijos.push(objetoBordeUno);
	objetoRuta.hijos.push(objetoBordeDos);
	return objetoRuta;

}