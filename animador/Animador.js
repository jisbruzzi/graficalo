function normalizarPuntosControl(puntosControl, alto,ancho){
    var puntoInicio=[(puntosControl[0]+puntosControl[3])/2,(puntosControl[1]+puntosControl[4])/2,(puntosControl[2]+puntosControl[5])/2];//"normalizo"
    for(var i=0;i<puntosControl.length/3;i++){
      puntosControl[i*3] -= puntoInicio[0];
    }
    var puntoFinal=[(puntosControl[puntosControl.length-6]+puntosControl[puntosControl.length-3])/2,(puntosControl[puntosControl.length-5]+puntosControl[puntosControl.length-2])/2,(puntosControl[puntosControl.length-4]+puntosControl[puntosControl.length-1])/2];

    var coeficienteDeExpansion=(alto)/puntoFinal[0];
    var mayorY,menorY;
    for(var i=0;i<puntosControl.length;i++){
        puntosControl[i]*=coeficienteDeExpansion;
    }
    mayorY=menorY=puntosControl[1];
    for(var i=4;i<puntosControl.length;i+=3){
        if(mayorY<puntosControl[i])
            mayorY=puntosControl[i];
        if(menorY>puntosControl[i])
            menorY=puntosControl[i];
    }
    var diferencia=mayorY-menorY;
    if(diferencia>ancho){
        var coeficienteDeContraccion=(ancho)/diferencia;
        for(var i=1;i<puntosControl.length;i+=3)
            puntosControl[i]=(puntosControl[i]-menorY)*coeficienteDeContraccion;

    }else{
        for(var i=1;i<puntosControl.length;i+=3)

            puntosControl[i]=puntosControl[i]-menorY-diferencia/2+ancho/2;
    }   

    return puntosControl;
}



function Animador(puntosControl){
  let mundo;
  let mars;

  this.archivosShaderPrograms={
    "coloreado":["shader-fs-colored-obj.glsl","shader-vs-colored-obj.glsl"],
    "texturado":["shader-fs-textured-obj.glsl","shader-vs-textured-obj.glsl"],
    "edificio":["shader-fs-edificio-obj.glsl","shader-vs-edificio-obj.glsl"]
  };
  this.archivosImagenes=[
    "mars_1k_color.jpg",
    "tramo-dobleamarilla.jpg",
    "cruce.jpg",
    "llanta.jpg",
    "vereda.jpg"
  ].concat(nombresImagenesPisos).concat(nombresImagenesPlantabajas);


  this.obtenerMundo=function(){
    return mundo;
  }

  this.tick=function(){
    mars.rotar([0,1,0],0.01);
    if(jugador!=null){
      jugador.tick();
    }
  }

  let jugador=null;


  this.iniciarMundo=function(gl,camaraNueva,mouse,movedorNuevo){

    var cantidadDeCoches=10;



    let calles;
    let ruta;
    let coches;

    mundo = new Objeto();
    jugador = new Jugador(camaraNueva,mouse,movedorNuevo);

    let programaColor = atlasShaderPs.p("coloreado");
    let programaTextura = atlasShaderPs.p("texturado");
    let programaEdificio = atlasShaderPs.p("edificio");
    var puntos=[0.0,1.0,1.0,0.0,0.0,2.0,0.0,-1.0,1.0,0.0,-1.0,-1.0,0.0,1.0,-1.0,0.0,1.0,1.0];
    var normales=[0.0,1.0/Math.sqrt(2),1.0/Math.sqrt(2),0.0,0.0,1.0,0.0,-1.0/Math.sqrt(2),1.0/Math.sqrt(2),0.0,-1.0/Math.sqrt(2),-1.0/Math.sqrt(2),0.0,1.0/Math.sqrt(2),-1.0/Math.sqrt(2),0.0,1.0/Math.sqrt(2),1.0/Math.sqrt(2)];


    let esfera64 = new FormaEsfera(64,64,gl);
    let esfera64Texturada =esfera64.copiaConTextura(atlasTexturas.t("mars_1k_color.jpg"));
    let modeloTexturada = new Modelo(esfera64Texturada,programaTextura,gl);
    mars  =new Objeto(modeloTexturada);
    mundo.hijos.push(mars);


    let texturaCalle = atlasTexturas.t("tramo-dobleamarilla.jpg");
    let texturaEsquina = atlasTexturas.t("cruce.jpg");
    let texturaVereda = atlasTexturas.t("vereda.jpg");

    //calles = new ObjetoCalles(5,5,12,gl);
    calles = new ObjetoCalles(6,4,10,gl);
    mundo.hijos.push(calles);

    puntosControl=normalizarPuntosControl(puntosControl,calles.getAlto(),calles.getAncho());
    var curvas=curvaBSplineCuadratica(puntosControl);
    let generaFachada=new GeneraFachadaCurvaRuta(curvas);

    coches= new GrupoCoches(10,curvas,2.5+0.2-0.05,programaColor,programaTextura,gl);

    calles.generar([generaFachada.desplazada(-2),generaFachada.desplazada(2)],generaFachada.desplazada(0), curvas[2]);

    ruta = new ObjetoRutaCompleta(curvas,atlasTexturas.t("concreto.jpg"),atlasTexturas.t("concreto.jpg"),programaTextura,programaColor,gl);
    ruta.mover(0,0,2.5);
    mundo.hijos.push(ruta);
    mundo.hijos.push(coches);



    mars.escalar(7,7,7);
    console.log(calles.obtenerPosicion());
    mars.mover(calles.getAlto()/2,calles.getAncho()/2,20);

    mundo.configurarIluminacion(vec3.fromValues(-100.0, 0.0, 0.0), vec3.fromValues( 0.9, 0.9, 1), vec3.fromValues(0.01, 0.01, 0.0108));
  }

}
