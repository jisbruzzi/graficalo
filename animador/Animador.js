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
  let mundo=new Objeto();

  this.archivosShaderPrograms={

    "coloreado":["shader-fs-colored-obj.glsl","shader-vs-colored-obj.glsl"],
    "texturado":["shader-fs-textured-obj.glsl","shader-vs-textured-obj.glsl"],
    "edificio":["shader-fs-edificio-obj.glsl","shader-vs-edificio-obj.glsl"],
    "reflexion":["shader-fs-reflection-obj.glsl","shader-vs-reflection-obj.glsl"],
    "cielo":["shader-fs-cielo.glsl","shader-vs-cielo.glsl"],
    "normalmappeada-texturada":["shader-fs-textured-mapped-obj.glsl","shader-vs-textured-mapped-obj.glsl"],

    "normal":["debug/shader-fs-normal.glsl","debug/shader-vs-normal.glsl"],
    "binormal":["debug/shader-fs-binormal.glsl","debug/shader-vs-binormal.glsl"],
    "tangente":["debug/shader-fs-tangent.glsl","debug/shader-vs-tangent.glsl"]
  };
  this.archivosImagenes=[
    "mars_1k_color.jpg",
    "tramo-dobleamarilla.jpg",
    "cruce.jpg",
    "referenciaDebug.jpg",
    "llanta.jpg",
    "vereda.jpg",
    "vereda_normal.jpg",
    "refmap.jpg",
    "grass01.jpg",
    "grass01_n.jpg",
    "autopista.jpg",
    "autopista_n.png",
    "concreto_n.jpg",
    "gris.jpg",
    "coche-mips.jpg",


  ].concat(nombresImagenesPisos).concat(nombresImagenesPlantabajas);


  this.obtenerMundo=function(){
    return mundo;
  }


  this.tick=function(delta){
    if(jugador!=null){
      jugador.tick();
    }

    //mundo.configurarIluminacion(jugador.obtenerPosicion(), vec3.fromValues( 0.9, 0.9, 1), vec3.fromValues(0.01, 0.01, 0.0108));
    let p =jugador.obtenerPosicion();

    luz1.anularPosicion().mover(p[0],p[1],p[2]);
    luz2.anularPosicion().mover(p[0],p[1],p[2]).mover(3,0,0);
    mundo.configurarIluminacionGlobal(new ParametrosLuzGlobal().configurarHorario(delta/1000.0));
    if (cielo != null) cielo.anularPosicion().mover(p[0],p[1],p[2]);
  }

  let jugador=null;
  let cielo = null;
  let luz1 = new Luz();
  let luz2 = new Luz();


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

    let texturaCalle = atlasTexturas.t("tramo-dobleamarilla.jpg");
    let texturaEsquina = atlasTexturas.t("cruce.jpg");
    let texturaVereda = atlasTexturas.t("vereda.jpg");

    //calles = new ObjetoCalles(5,5,12,gl);
    calles = new ObjetoCalles(5,6,10,gl);
    mundo.hijos.push(calles);


    puntosControl=normalizarPuntosControl(puntosControl,calles.getAlto(),calles.getAncho());
    var curvas=curvaBSplineCuadratica(puntosControl);
    let generaFachada=new GeneraFachadaCurvaRuta(curvas);

    coches= new GrupoCoches(10,curvas,2.5+0.2-0.05,programaColor,programaTextura,gl);

    calles.generar([generaFachada.desplazada(-2),generaFachada.desplazada(2)],generaFachada.desplazada(0), curvas[2]);

    ruta = new ObjetoRutaCompleta(curvas,programaTextura,programaColor,gl);
    ruta.mover(0,0,2.5);
    mundo.hijos.push(ruta);
    mundo.hijos.push(coches);


    cielo = new ObjetoCielo(gl,900);
    mundo.hijos.push(cielo);

    //luces
    /*
    mundo.luces.push(luz1);
    luz1.cambiarHacia([0,0,-1]);
    luz1.concentracion=15;
    luz1.color=[1,0,0];
    mundo.luces.push(luz2);

    luz1.mover(30,30,30);
    luz1.distanciaIluminada=10
    luz2.mover(0,0,0.5);
    luz2.color=[0,1,0];
    */

    mundo.configurarLuces(mundo.obtenerLucesHijos());

  }

}
