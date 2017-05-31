function Rectangulo(x,y,ancho,alto){
  let yo={};
  yo.x=x;
  yo.y=y;
  yo.ancho=ancho;
  yo.alto=alto;

  yo.intervaloX=function(){
    return new IntervaloAbierto(yo.x,yo.x+yo.ancho);
  }
  yo.intervaloY=function(){
    return new IntervaloAbierto(yo.y,yo.y+yo.alto);
  }

  yo.intervalo=function(c){
    if(c==="x"){
      return yo.intervaloX();
    }else{
      return yo.intervaloY();
    }
  }

  yo.dentroDe=function(otro){
    return proyectoDentro("x",otro) && proyectoDentro("y",otro)
  }

  yo.contiene=function(pos){
    return yo.intervaloX().tiene(pos.x) && yo.intervaloY().tiene(pos.y);
  }


  yo.colisiona=function(otro){
    return proyeccionColisiona("x",otro) && proyeccionColisiona("y",otro);
  }

  function proyectoDentro(intervalador,otro){
    let miIntervalo = yo.intervalo(intervalador);
    let suIntervalo = otro.intervalo(intervalador);
    return suIntervalo.contiene(miIntervalo);
  }

  function proyeccionColisiona(intervalador,otro){
    let miIntervalo = yo.intervalo(intervalador);
    let suIntervalo = otro.intervalo(intervalador);
    return miIntervalo.interseca(suIntervalo);
  }

  return yo;
}
