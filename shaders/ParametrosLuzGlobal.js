function ParametrosLuzGlobal(){
  let horarios=[];
  let yo={};

  function distanciaCircular(a,b){
    let ret=a-b;
    while(ret>0.5) ret -=1;
    while(ret<=-0.5) ret +=1;
    return Math.abs(ret);
  }

  function cambiarDireccionLuz(proporcion){
    let anguloRecorrido=Math.PI/3;
    //en 0.5 es el mediodía, y en 0 y 1 es la medianoche
    if(Math.abs(proporcion-0.5)<0.25){//dibujo el sol (queda entre 0 y 1)
      //entre 0.25 y 0.75
      proporcion*=2;//entre 0.5 y 1.5
      proporcion-=0.5;//entre 0 y 1

      anguloRecorrido=Math.PI*5/8;
    }else{//dibujo la luna
      //entre 0 y 0.25 y 0.75 y 1
      if(proporcion>0.5){
        proporcion-=1;//ahora entre -0.25 y 0.25
      }
      proporcion+=0.25;//entre 0 y 0.5
      proporcion*=2;//entre 0 y 1

      anguloRecorrido=Math.PI*3/4;
    }

    let u=Math.cos(Math.PI*proporcion);
    let v=Math.sin(Math.PI*proporcion);
    yo.direccionLuzGlobal=[0,u,v];
    vec3.rotateY(yo.direccionLuzGlobal,yo.direccionLuzGlobal,[0,0,0],anguloRecorrido);
  }


  yo.configurarHorario=function(hora){
    while(hora>=24) hora-=24;
    while(hora< 0 ) hora+=24;

    yo.colorAmbiente=[0,0,0];
    yo.colorLuzGlobal=[0,0,0];
    yo.colorCielo=[0,0,0];

    cambiarDireccionLuz(hora/24);

    horarios.forEach(function(h){
      let dis=distanciaCircular(h.horario,hora/24);
      if(Math.abs(dis)<0.25){
        let peso=Math.pow(Math.cos(Math.PI*dis*2),2);
        vec3.scaleAndAdd(yo.colorAmbiente,yo.colorAmbiente,h.colorAmbiente,peso);
        vec3.scaleAndAdd(yo.colorLuzGlobal,yo.colorLuzGlobal,h.colorLuzGlobal,peso);
        vec3.scaleAndAdd(yo.colorCielo,yo.colorCielo,h.colorCielo,peso);
      }
    });
    return yo;
  }

  yo.configurarHorario(12);

  //ATARDECER
  let atardecer={};
  atardecer.colorAmbiente=[235/255,176/255,99/255];//0.75
  atardecer.colorLuzGlobal=[247/255,96/255,49/255];//0.25
  atardecer.direccionLuzGlobal=[0,Math.cos(Math.PI/6),Math.sin(Math.PI/6)];
  atardecer.colorCielo=[
    235*0.75/255+247*0.25/255,
    176*0.75/255+96*0.25/255,
    99*0.75/255+49*0.25/255
  ];
  atardecer.horario=0.75;
  horarios.push(atardecer);

  //NOCHE
  let noche={};
  noche.colorAmbiente=[84/255,66/255,116/255];//0.75
  noche.colorLuzGlobal=[64/255,50/255,125/255];//0.25
  noche.direccionLuzGlobal=[0,Math.cos(Math.PI-Math.PI*3/4),Math.sin(Math.PI-Math.PI*3/4)];
  noche.colorCielo=[
    84*0.75/255+64*0.25/255,
    66*0.75/255+50*0.25/255,
    116*0.75/255+125*0.25/255
  ];
  noche.horario=0;
  horarios.push(noche);

  //MEDIODIA
  let mediodia={};
  mediodia.colorAmbiente=[0.9,0.9,1];//[207/255,227/255,230/255];
  mediodia.colorLuzGlobal=[0.32,0.32,0.1];//[253/255,235/255,125/255];//[249/255,228/255,33/255];
  mediodia.colorCielo=[180/255,203/255,253/255];
  mediodia.direccionLuzGlobal=[0,Math.cos(Math.PI*7/16),Math.sin(Math.PI*7/16)];
  mediodia.horario=0.5
  horarios.push(mediodia);
  //MAÑANA
  let amanecer={};
  amanecer.colorAmbiente=[181/255,125/255,197/255];//[207/255,227/255,230/255];
  amanecer.colorLuzGlobal=[215/255,125/255,130/255];//[253/255,235/255,125/255];//[249/255,228/255,33/255];
  amanecer.colorCielo=[134/255,125/255,197/255];
  amanecer.direccionLuzGlobal=[0,Math.cos(Math.PI*1/16),Math.sin(Math.PI*1/16)];
  amanecer.horario=0.25;
  horarios.push(amanecer);

  return yo;
}
