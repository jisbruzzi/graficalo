function ObjetoColectorEdificios(gl){
  let yo=new Objeto();

  yo.agregarEdificio=function(ancho,fondo,gl,altura,retardo,tiempoAnimacion,x,y){
    let e = new ObjetoEdificio(ancho,fondo,gl,altura,retardo,tiempoAnimacion);
    console.log(e);
    e.mover(x,y,0);
    yo.hijos.push(e);
  }

  yo.actualizar=function(){
    //nada. Esto lo que va a hacer es actualizar la forma
  }


  return yo;
}
