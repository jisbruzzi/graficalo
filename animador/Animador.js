function Animador(){
  this.archivosShaderPrograms=[
    ["shader-fs-colored-obj.glsl","shader-vs-colored-obj.glsl"],
    ["shader-fs-textured-obj.glsl","shader-vs-textured-obj.glsl"]
  ];
  this.archivosImagenes=[
    "mars_1k_color.jpg",
    "moon.gif"
  ];

  let deimos;
  let phobos;
  let mars;
  let deimosEje;
  let phobosEje;
  let mundo;

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
  }

  this.iniciarMundo=function(programas,atlasImagenes,gl,camara){
    camara.setHacia(0,0,0).setPosicion(40, 75, -100).setArriba(0,1,0);



    let programaColor=programas[0];
    let programaTextura = programas[1];

    let esfera64 = new FormaEsfera(64,64,gl);
    let esfera64Texturada =esfera64.copiaConTextura(new Textura(atlasImagenes["mars_1k_color.jpg"],gl));
    let modeloColoreada = new Modelo(esfera64,programaColor,gl);
    let modeloTexturada = new Modelo(esfera64Texturada,programaTextura,gl);

    let formaCuadricula = new FormaCuadricula(10,10,gl);
    let modeloCuadricula = new Modelo(formaCuadricula,programaColor,gl);
    let cuadricula = new Objeto(modeloCuadricula);
    cuadricula.escalar(5,5,5).mover(-25,0,25);
    cuadricula.rotar([1,0,0],-3.14/2)


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
    mundo.hijos.push(cuadricula);

    mars.escalar(7,7,7);

    phobos.configurarIluminacion(vec3.fromValues(-100.0, 0.0, -60.0), vec3.fromValues( 0.5, 0.5, 0.5), vec3.fromValues(0.1, 0.1, 0.1));
    deimosEje.configurarIluminacion(vec3.fromValues(-100.0, 0.0, -60.0), vec3.fromValues(0.5, 0.5, 0.5), vec3.fromValues(0.05, 0.05, 0.05));
    mars.configurarIluminacion(vec3.fromValues(-100.0, 0.0, -60.0), vec3.fromValues(0.3, 0.3, 0.3), vec3.fromValues(0.05, 0.05, 0.05));
  }

}
