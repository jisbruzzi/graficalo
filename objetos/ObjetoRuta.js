function ObjetoRuta(curvas,texturaAsfalto,texturaBorde,programaTextura,programaColor,gl){//curvas es un array que tiene en la primera la curva, y en la segunda su derivada
	let contornoAsfalto = [];
	let normalesAsfalto = [];
	let contornoBorde = [];
	let normalesBorde = [];

	let objetoRuta = new Objeto();

	let formaAsfalto = new FormaBarrido(contornoAsfalto,normalesAsfalto,curvas,0.01,gl).copiaConTextura(texturaAsfalto);
	let formaBorde = new FormaBarrido(contornoBorde,normalesBorde,curvas,0.01,gl).copiaConTextura(texturaBorde);

	let objetoAsfalto = new Objeto(new Modelo(formaAsfalto,programaTextura,gl));
	let objetoBorde = new Objeto(new Modelo(formaBorde,programaTextura,gl));

	let objetoRuta.hijos.push(objetoRuta);
	let objetoRuta.hijos.push(objetoBorde);

	return objetoRuta;

}