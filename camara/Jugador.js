function Jugador(camara,mouse,movedor){
  camara.setHacia(1,0,0).setPosicion(0, 0, 0).setArriba(0,0,1);
  let x=0,y=0,z=0;

  let camaraFPS=true;
  movedor.cambiaCamara=function(){
    camaraFPS= !camaraFPS;
    console.log("cambia");
  }

  //--------- encganchar cámara-------------//
  let rotacionHorizontal=0;//entre -pi y pi
  let rotacionVertical = 0;//entre -pi/2 y pi/2

  function configurarCamaraFPS(){
    //coseno y seno vertical
    let cv=Math.cos(-rotacionVertical);
    let sv=Math.sin(-rotacionVertical);
    //rayo x y z
    let rx=Math.cos(rotacionHorizontal)*cv;
    let ry=Math.sin(rotacionHorizontal)*cv;
    let rz=sv;
    //camara
    camara.setHacia(x+rx,y+ry,z+rz).setPosicion(x,y,z);
  }

  function configurarCamaraGlobal(){
    //coseno y seno vertical
    let cv=Math.cos(-rotacionVertical);
    let sv=Math.sin(-rotacionVertical);
    //rayo x y z
    let rx=Math.cos(rotacionHorizontal)*cv;
    let ry=Math.sin(rotacionHorizontal)*cv;
    let rz=sv;
    //camara
    camara.setPosicion(x-100*rx,y-100*ry,z-100*rz).setHacia(x,y,z);
  }

  let enganchaCamara=function(dx,dy){

    //borde horizontal
    rotacionHorizontal-=dx*0.15/180*Math.PI;
    while(rotacionHorizontal>=2*Math.PI){
      rotacionHorizontal-=2*Math.PI;
    }
    while(rotacionHorizontal<0){
      rotacionHorizontal+=2*Math.PI;
    }

    //borde vertical
    rotacionVertical+=dy*0.15/180*Math.PI;
    rotacionVertical=Math.min(Math.PI/2,rotacionVertical);
    rotacionVertical=Math.max(-Math.PI/2,rotacionVertical);

    if(camaraFPS){
      configurarCamaraFPS();
    }else{
      configurarCamaraGlobal();
    }

  };
  mouse.llamar=[enganchaCamara];




  this.tick=function(){
    let ch=Math.cos(rotacionHorizontal);
    let sh=Math.sin(rotacionHorizontal);
    let boost = 1;
    let dx =0,dy=0,dz=0;
    if(movedor.shift != undefined && movedor.shift){
      boost=5;
    }
    if(movedor.w){
      dx=0.1*ch*boost;
      dy=0.1*sh*boost;
    }
    if(movedor.s){
      dx = -0.1*ch*boost;
      dy = -0.1*sh*boost;
    }
    if(movedor.a){
      dx=0.1*-sh*boost;
      dy=0.1* ch*boost;
    }
    if(movedor.d){
      dx=-0.1*-sh*boost;
      dy=-0.1*ch*boost;
    }
    if(movedor.q){
      dz=-1;
    }
    if(movedor.e){
      dz=1;
    }

    //si es FPS

    x+=dx;
    y+=dy;
    z+=dz;

    if(camaraFPS){
      configurarCamaraFPS();
    }else{
      configurarCamaraGlobal();
    }
  }

}
