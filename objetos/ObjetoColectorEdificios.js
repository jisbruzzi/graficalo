function ObjetoColectorEdificios(gl){
  let yo=new Objeto();

  function elementoAlAzar(array){
    let r=Math.random();
    let cual = Math.floor(r*array.length);
    return array[cual];
  }

  yo.agregarEdificio=function(ancho,fondo,gl,altura,retardo,tiempoAnimacion,x,y){
    let tPisos = atlasTexturas.t(elementoAlAzar(nombresImagenesPisos));
    let tPlantabaja = atlasTexturas.t(elementoAlAzar(nombresImagenesPlantabajas));

    let programaEdificio = atlasShaderPs.p("edificio");
    //let e = new ObjetoEdificio(ancho,fondo,gl,altura,retardo,tiempoAnimacion);
    let forma = new FormaEdificio(gl,ancho,fondo,x,y).hacerCopiaConTexturas(tPlantabaja,tPisos);;
    FormaCustomizable(forma);
    forma.definirBufferConstante("altura_base_buffer",tPlantabaja.height/tPlantabaja.width);
    forma.definirBufferConstante("altura_sobre_buffer",tPisos.height/tPisos.width);
    forma.definirBufferConstante("alto_maximo_buffer",altura);

    let o = new Objeto(new Modelo(forma,programaEdificio,gl))
    yo.hijos.push(o);
  }

  yo.actualizar=function(){
    //nada. Esto lo que va a hacer es actualizar la forma
  }


  return yo;
}
/*
let yo=new Objeto();
function elementoAlAzar(array){
  let r=Math.random();
  let cual = Math.floor(r*array.length);
  return array[cual];
}

yo.agregarEdificio=function(ancho,fondo,gl,altura,retardo,tiempoAnimacion,x,y){
  let tPisos = atlasTexturas.t(elementoAlAzar(nombresImagenesPisos));
  let tPlantabaja = atlasTexturas.t(elementoAlAzar(nombresImagenesPlantabajas));

  let programaEdificio = atlasShaderPs.p("edificio");
  let fEdificio=forma.hacerCopiaConTexturas(tPlantabaja,tPisos);
  //let e = new ObjetoEdificio(ancho,fondo,gl,altura,retardo,tiempoAnimacion);
  let forma = new FormaEdificio(gl,ancho,fondo,x,y);
  console.log(e);
  e.mover(x,y,0);
  yo.hijos.push(e);
}
*/
