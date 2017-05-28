function ObjetoCuboColores(gl,programaColor){
  let ret = new Objeto();

  let formaCuadriculaRoja = new FormaCuadricula(10,10,gl,[1,0,0]);
  let modeloCuadriculaRoja = new Modelo(formaCuadriculaRoja,programaColor,gl);

  let cuadriculaRoja1 = new Objeto(modeloCuadriculaRoja);

  cuadriculaRoja1.rotar([0,1,0],Math.PI/2);
  cuadriculaRoja1.mover(5,0,0);

  let cuadriculaRoja2 = new Objeto(modeloCuadriculaRoja);
  cuadriculaRoja2.rotar([0,1,0],Math.PI/2);
  cuadriculaRoja2.mover(-5,0,0);

  let formaCuadriculaAzul = new FormaCuadricula(10,10,gl,[0,0,1]);
  let modeloCuadriculaAzul = new Modelo(formaCuadriculaAzul,programaColor,gl);
  let mCuadVerde = new Modelo(new FormaCuadricula(10,10,gl,[0,1,0]),programaColor,gl);

  let cuadAz1=new Objeto(modeloCuadriculaAzul);
  cuadAz1.mover(0,0,5);
  let cuadAz2=new Objeto(modeloCuadriculaAzul);
  cuadAz2.mover(0,0,-5);

  let cuadVe1=new Objeto(mCuadVerde);
  cuadVe1.mover(0,5,0);
  cuadVe1.rotar([1,0,0],Math.PI/2);
  let cuadVe2=new Objeto(mCuadVerde);
  cuadVe2.mover(0,-5,0);
  cuadVe2.rotar([1,0,0],Math.PI/2);


  ret.hijos.push(cuadriculaRoja1);
  ret.hijos.push(cuadriculaRoja2);
  ret.hijos.push(cuadAz1);
  ret.hijos.push(cuadAz2);
  ret.hijos.push(cuadVe1);
  ret.hijos.push(cuadVe2);

  return ret;

}
