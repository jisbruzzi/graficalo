function Animador(curvas){
  this.archivosShaderPrograms={
    "coloreado":["shader-fs-colored-obj.glsl","shader-vs-colored-obj.glsl"],
    "texturado":["shader-fs-textured-obj.glsl","shader-vs-textured-obj.glsl"],
    "edificio":["shader-fs-edificio-obj.glsl","shader-vs-edificio-obj.glsl"]
  };
  this.archivosImagenes=[
    "mars_1k_color.jpg",
    "tramo-dobleamarilla.jpg",
    "cruce.jpg",

    "vereda.jpg"
  ].concat(nombresImagenesPisos).concat(nombresImagenesPlantabajas);

  let deimos;
  let phobos;
  let mars;
  let deimosEje;
  let phobosEje;
  let mundo;
  let calles;
  let oEdificio;
  let pilar;
  let ruta;

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
    //objBarrido.rotar([0,0,1],0.01)
    
    if(jugador!=null){
      jugador.tick();
    }

    //calles.rotar([1,0,0],0.05);
  }

  let jugador=null;


  this.iniciarMundo=function(gl,camaraNueva,mouse,movedorNuevo){

    jugador = new Jugador(camaraNueva,mouse,movedorNuevo);

    //camara.setHacia(1,0,0).setPosicion(0, 0, 0).setArriba(0,0,1);
//(40, 75, -100)
//camara.setHacia(0,0,0).setPosicion(40, 75, -100).setArriba(0,1,0);
  //camara.setPosicion(0,0,100).setHacia(0,0,0).setArriba(0,1,0);
    let programaColor = atlasShaderPs.p("coloreado");
    let programaTextura = atlasShaderPs.p("texturado");
    let programaEdificio = atlasShaderPs.p("edificio");
    var puntos=[0.0,1.0,1.0,0.0,0.0,2.0,0.0,-1.0,1.0,0.0,-1.0,-1.0,0.0,1.0,-1.0,0.0,1.0,1.0];
    var normales=[0.0,1.0/Math.sqrt(2),1.0/Math.sqrt(2),0.0,0.0,1.0,0.0,-1.0/Math.sqrt(2),1.0/Math.sqrt(2),0.0,-1.0/Math.sqrt(2),-1.0/Math.sqrt(2),0.0,1.0/Math.sqrt(2),-1.0/Math.sqrt(2),0.0,1.0/Math.sqrt(2),1.0/Math.sqrt(2)];
    //let formaBarrido= new FormaBarrido(puntos,normales,curvas,0.01,gl);
    //objBarrido=new Objeto(new Modelo(formaBarrido,programaColor,gl));
    ruta = new ObjetoRutaCompleta(curvas,atlasTexturas.t("concreto.jpg"),atlasTexturas.t("concreto.jpg"),programaTextura,programaColor,gl);
   

    pilar = new ObjetoPilar(atlasTexturas.t("concreto.jpg"),programaTextura,programaColor,gl);

    pilar.mover(5,0,0);
    let plano=new FormaPlano(8,15,gl);
    let formaCalle = plano.copiaConTextura(atlasTexturas.t("tramo-dobleamarilla.jpg"));
    let modeloCalle = new Modelo(formaCalle,programaTextura,gl);
    let objCalle = new Objeto(modeloCalle);
    
     //objBarrido.escalar(10,10,10);
    let esfera64 = new FormaEsfera(64,64,gl);
    let esfera64Texturada =esfera64.copiaConTextura(atlasTexturas.t("mars_1k_color.jpg"));
    let modeloColoreada = new Modelo(esfera64,programaColor,gl);
    let modeloTexturada = new Modelo(esfera64Texturada,programaTextura,gl);


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

   // mundo.hijos.push(mars);

    mundo.hijos.push(pilar);
    mundo.hijos.push(ruta);
    //mundo.hijos.push(objCalle);

    mundo.hijos.push(new ObjetoCuboColores(gl,programaColor));
    let texturaCalle = atlasTexturas.t("tramo-dobleamarilla.jpg");
    let texturaEsquina = atlasTexturas.t("cruce.jpg");
    let texturaVereda = atlasTexturas.t("vereda.jpg");

    calles = new ObjetoCalles(3,5,10,gl);
    mundo.hijos.push(calles);
    calles.mover(10,10,0);

    //vereda
    /*
    let fVereda = new FormaVereda(3,1,0.5,gl).copiaConTextura(texturaCalle);
    let mVereda = new Modelo(fVereda,programaTextura,gl)
    let oVereda = new Objeto(mVereda);
    */

/*
    let vereda= new ObjetoVereda(3,0.2,0.01,gl);
    mundo.hijos.push(vereda);


    oEdificio=new ObjetoEdificio(2,3,gl);
    oEdificio.mover(3,0,0);
    mundo.hijos.push(oEdificio);
*/
/*
  let oManzana = new ObjetoManzanaEdificios(10,gl);
  oManzana.mover(10,0,0);
  mundo.hijos.push(oManzana);
*/


    //mundo.rotar([1,0,0],Math.PI/2);

    mars.escalar(7,7,7);
    mars.mover(10,0,10);

    phobos.configurarIluminacion(vec3.fromValues(-100.0, 0.0, -60.0), vec3.fromValues( 0.5, 0.5, 0.5), vec3.fromValues(0.1, 0.1, 0.1));
    deimosEje.configurarIluminacion(vec3.fromValues(-100.0, 0.0, -60.0), vec3.fromValues(0.5, 0.5, 0.5), vec3.fromValues(0.05, 0.05, 0.05));
    mars.configurarIluminacion(vec3.fromValues(-1.0, 0.0, -0.0), vec3.fromValues(0.3, 0.3, 0.3), vec3.fromValues(0.05, 0.05, 0.05));
    calles.configurarIluminacion(vec3.fromValues(-100.0, 0.0, -60.0), vec3.fromValues( 1, 1, 1), vec3.fromValues(0.01, 0.01, 0.01));
    //objBarrido.configurarIluminacion(vec3.fromValues(-100.0, 0.0, -60.0), vec3.fromValues( 0.3,0.3, 0.3), vec3.fromValues(0.01, 0.01, 0.01));
    pilar.configurarIluminacion(vec3.fromValues(-100.0, 0.0, -60.0), vec3.fromValues( 0.1, 0.1, 0.1), vec3.fromValues(0.01,0.01, 0.01));
    ruta.configurarIluminacion(vec3.fromValues(-100.0, 0.0, -60.0), vec3.fromValues( 1, 1, 1), vec3.fromValues(0.01, 0.01, 0.01));
    //oManzana.configurarIluminacion(vec3.fromValues(-5.0, 0.0, -5.0), vec3.fromValues( 1, 1, 1), vec3.fromValues(0.01, 0.01, 0.01));
  }

}
