function ObjetoColectorEdificios(gl){
  function elementoAlAzar(array){
    let r=Math.random();
    let cual = Math.floor(r*array.length);
    return array[cual];
  }

  let yo=new Objeto();
  for(let i=0;i<5;i++){
    yo.hijos.push(new ObjetoSubcolectorEdificios(gl,nombresImagenesPisos.slice(i*4,i*4+4),nombresImagenesPlantabajas.slice(i*4,i*4+4)));
    //let a=["referenciaDebug.jpg","referenciaDebug.jpg","referenciaDebug.jpg","referenciaDebug.jpg"];
    //let b=["ed12_pisos.jpg","ed12_pisos.jpg","ed12_pisos.jpg","referenciaDebug.jpg"];
    //yo.hijos.push(new ObjetoSubcolectorEdificios(gl,b,b));
  }

  yo.agregarEdificio=function(ancho,fondo,gl,altura,retardo,tiempoAnimacion,x,y,anchoUv,fondoUv){
    elementoAlAzar(yo.hijos).agregarEdificio(ancho,fondo,gl,altura,retardo,tiempoAnimacion,x,y,anchoUv,fondoUv);
  };

  yo.actualizar=function(){
    for (let colector of yo.hijos) {
      colector.actualizar();
    }
  };

  return yo;


}
