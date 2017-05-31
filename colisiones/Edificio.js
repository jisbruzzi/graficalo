
function Edificio(ancho,fondo,x,y){
  let yo={};
  yo.ancho=ancho;
  yo.fondo=fondo;
  yo.x=x;
  yo.y=y;

  yo.mover = function(dx,dy,cond){
    yo.x+=dx;
    yo.y+=dy;
    let c = cond(yo);
    if(c){
      //console.log("perdonnnnN",yo.x,yo.y);
      yo.x-=dx;
      yo.y-=dy;
    }
    return !c;
  }

  yo.estirar = function(dx,dy,cond){
    yo.ancho+=dx;
    yo.fondo+=dy;
    let c = cond(yo);
    if(c){
      //console.log("estirar perdonnnnN",yo.ancho,yo.fondo);
      yo.ancho-=dx;
      yo.fondo-=dy;
    }
    return !c;
  }


  function rectangulo(quien){
    return new Rectangulo(quien.x,quien.y,quien.ancho,quien.fondo);
  }

  yo.dentroDe=function(ancho,fondo,x,y){
    return rectangulo(yo).dentroDe(new Rectangulo(x,y,ancho,fondo))
  }

  yo.colisiona=function(otro){
    return rectangulo(yo).colisiona(rectangulo(otro));
  }

  return yo;
}
