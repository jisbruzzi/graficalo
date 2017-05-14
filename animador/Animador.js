function Animador(){
  this.archivosShaderPrograms=[
    ["shader-fs-colored-obj.glsl","shader-vs-colored-obj.glsl"],
    ["shader-fs-textured-obj.glsl","shader-vs-textured-obj.glsl"]
  ];
  this.archivosImagenes=[
    "mars_1k_color.jpg",
    "tramo-dobleamarilla.jpg",
    "cruce.jpg",
    "vereda.jpg"
  ];

  let deimos;
  let phobos;
  let mars;
  let deimosEje;
  let phobosEje;
  let mundo;
  let calles;

  this.obtenerMundo=function(){
    return mundo;
  }

  this.tick=function(){
    deimosEje.rotar([0,1,0],0.01);
    phobosEje.rotar([0,1,0],0.003);


    let eje = vec3.fromValues(1,1,0);
    vec3.normalize(eje,eje);
    phobos.rotar(eje,0.2);
    phobosEje.rotar(eje,0.01);

    mars.rotar([0,1,0],0.01);

    if(jugador!=null){
      jugador.tick();
    }

    //calles.rotar([1,0,0],0.05);
  }

  let jugador=null;

  this.iniciarMundo=function(programas,atlasImagenes,gl,camaraNueva,mouse,movedorNuevo){
    jugador = new Jugador(camaraNueva,mouse,movedorNuevo);

    //camara.setHacia(1,0,0).setPosicion(0, 0, 0).setArriba(0,0,1);
//(40, 75, -100)
//camara.setHacia(0,0,0).setPosicion(40, 75, -100).setArriba(0,1,0);
  //camara.setPosicion(0,0,100).setHacia(0,0,0).setArriba(0,1,0);
    let programaColor = programas[0];
    let programaTextura = programas[1];

    let plano=new FormaPlano(8,15,gl);
    let formaCalle = plano.copiaConTextura(new Textura(atlasImagenes["tramo-dobleamarilla.jpg"],gl));
    let modeloCalle = new Modelo(formaCalle,programaTextura,gl);
    let objCalle = new Objeto(modeloCalle);

    let esfera64 = new FormaEsfera(64,64,gl);
    let esfera64Texturada =esfera64.copiaConTextura(new Textura(atlasImagenes["mars_1k_color.jpg"],gl));
    let modeloColoreada = new Modelo(esfera64,programaColor,gl);
    let modeloTexturada = new Modelo(esfera64Texturada,programaTextura,gl);

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

    deimos=new Objeto(modeloColoreada);
    mars  =new Objeto(modeloTexturada);
    phobos=new Objeto(modeloColoreada);

    deimosEje=new Objeto();
    deimosEje.hijos.push(deimos);
    deimos.mover(10,0,0).escalar(1.8,1.8,1.8);

    phobosEje=new Objeto();
    phobosEje.hijos.push(phobos);
    phobos.mover(25,0,0).escalar(1.,0.84,0.47);

    mundo = new Objeto();
    mundo.hijos.push(deimosEje);
    mundo.hijos.push(phobosEje);
    mundo.hijos.push(mars);
    mundo.hijos.push(cuadriculaRoja1);
    mundo.hijos.push(cuadriculaRoja2);
    mundo.hijos.push(cuadAz1);
    mundo.hijos.push(cuadAz2);
    mundo.hijos.push(cuadVe1);
    mundo.hijos.push(cuadVe2);
    //mundo.hijos.push(objCalle);

    let texturaCalle = new Textura(atlasImagenes["tramo-dobleamarilla.jpg"],gl);
    let texturaEsquina = new Textura(atlasImagenes["cruce.jpg"],gl);
    let texturaVereda = new Textura(atlasImagenes["vereda.jpg"],gl);

    calles = new ObjetoCalles(3,5,2,texturaCalle,texturaEsquina,programaTextura,programaColor,texturaVereda,gl);
    mundo.hijos.push(calles);
    calles.mover(10,10,0);

    //vereda
    /*
    let fVereda = new FormaVereda(3,1,0.5,gl).copiaConTextura(texturaCalle);
    let mVereda = new Modelo(fVereda,programaTextura,gl)
    let oVereda = new Objeto(mVereda);
    */


    let vereda= new ObjetoVereda(3,0.2,0.01,gl,texturaVereda,programaColor,programaTextura);
    mundo.hijos.push(vereda);



    //mundo.rotar([1,0,0],Math.PI/2);

    mars.escalar(7,7,7);
    mars.mover(10,0,10);

    phobos.configurarIluminacion(vec3.fromValues(-100.0, 0.0, -60.0), vec3.fromValues( 0.5, 0.5, 0.5), vec3.fromValues(0.1, 0.1, 0.1));
    deimosEje.configurarIluminacion(vec3.fromValues(-100.0, 0.0, -60.0), vec3.fromValues(0.5, 0.5, 0.5), vec3.fromValues(0.05, 0.05, 0.05));
    mars.configurarIluminacion(vec3.fromValues(-100.0, 0.0, -60.0), vec3.fromValues(0.3, 0.3, 0.3), vec3.fromValues(0.05, 0.05, 0.05));
    calles.configurarIluminacion(vec3.fromValues(-100.0, 0.0, -60.0), vec3.fromValues( 1, 1, 1), vec3.fromValues(0.01, 0.01, 0.01));
  }

}
