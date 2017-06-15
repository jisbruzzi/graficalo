function Objeto(modelo){
  let yo = {}
  //-- hijos --//
  yo.hijos=[];//así de simple

  //-- concerns --//
  Rotable(yo);
  Trasladable(yo);
  Escalable(yo);
  Dibujable(yo,modelo);
  Tickeable(yo);
  Modelable(yo);
  Iluminable(yo);

  return yo;
}
