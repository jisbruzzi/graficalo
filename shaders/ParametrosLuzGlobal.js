function ParametrosLuzGlobal(){
  let yo={};
  //ATARDECER
  /*
  yo.colorAmbiente=[235/255,176/255,99/255];//0.75
  yo.colorLuzGlobal=[247/255,96/255,49/255];//0.25
  yo.direccionLuzGlobal=[0,Math.cos(Math.PI/6),Math.sin(Math.PI/6)];
  */
  //NOCHE
  /*
  yo.colorAmbiente=[84/255,66/255,116/255];//0.75
  yo.colorLuzGlobal=[64/255,50/255,125/255];//0.25
  yo.direccionLuzGlobal=[0,Math.cos(Math.PI-Math.PI*3/4),Math.sin(Math.PI-Math.PI*3/4)];
  */
  //MEDIODIA
  /*
  yo.colorAmbiente=[0.9,0.9,1];//[207/255,227/255,230/255];
  yo.colorLuzGlobal=[0.32,0.32,0.1];//[253/255,235/255,125/255];//[249/255,228/255,33/255];
  yo.colorCielo=[180/255,203/255,253/255];
  yo.direccionLuzGlobal=[0,Math.cos(Math.PI*7/16),Math.sin(Math.PI*7/16)];
  */
  //MAÑANA
  yo.colorAmbiente=[181/255,125/255,197/255];//[207/255,227/255,230/255];
  yo.colorLuzGlobal=[215/255,125/255,130/255];//[253/255,235/255,125/255];//[249/255,228/255,33/255];
  yo.colorCielo=[134/255,125/255,197/255];
  yo.direccionLuzGlobal=[0,Math.cos(Math.PI*1/16),Math.sin(Math.PI*1/16)];

  return yo;
}
