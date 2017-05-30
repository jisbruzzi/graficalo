function ObjetoManzanaEdificios(lado,gl){
  let yo = new Objeto();

  let listaEdificios=new ListaEdificios(lado);
  listaEdificios.forEach(agregarEdificio);

  function agregarEdificio(edificio){
    //la altura viene de dos cosas: el área del edificio y la centralidad dentro de la cuadrd
    let distCentroX=edificio.x-lado/2;
    let distCentroY=edificio.y-lado/2;
    let distCentro = 1-Math.sqrt(distCentroX*distCentroX+distCentroY*distCentroY)/lado;

    let area = edificio.ancho*edificio.fondo/lado;

    let a1=Math.random()*area*2+distCentro;
    let a2=Math.random()*(area+distCentro)+(area+distCentro)/2;
    let a3=Math.random()*distCentro*2+area;

    console.log(area,distCentroX,distCentroY,distCentro);

    let altura = 3*a1+2*a2+1*a3;

    let retardo=Math.random()*(a1+a2)*150;

    let tiempoAnimacion=(Math.random()+Math.random()+Math.random()+Math.random()+Math.random()+Math.random())/3;


    let ancho = edificio.ancho-0.2;
    let fondo = edificio.fondo-0.2;
    let x = edificio.x-lado/2+edificio.ancho/2;
    let y = edificio.y-lado/2+edificio.fondo/2;
    let o = new ObjetoEdificio(edificio.ancho,edificio.fondo,gl,altura,retardo,tiempoAnimacion);
    o.mover(x,y,0);
    o.escalar(ancho/edificio.ancho,fondo/edificio.fondo,1);

    yo.hijos.push(o);
  }
/*
  agregarEdificio({ancho:1,fondo:1,x:0,y:0});
  agregarEdificio({ancho:1,fondo:2,x:1,y:0});
  agregarEdificio({ancho:1,fondo:1,x:0,y:1});
*/
  return yo;
}

function Edificio(ancho,fondo,x,y){
  let yo={};
  yo.ancho=ancho;
  yo.fondo=fondo;
  yo.x=x;
  yo.y=y;

  yo.intervaloX=function(){
    return new IntervaloAbierto(yo.x,yo.x+yo.ancho);
  }
  yo.intervaloY=function(){
    return new IntervaloAbierto(yo.y,yo.y+yo.fondo);
  }

  yo.intervalo=function(c){
    if(c==="x"){
      return yo.intervaloX();
    }else{
      return yo.intervaloY();
    }
  }

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

      yo.dentroDe=function(ancho,fondo,x,y){
        let nuevo = new Edificio(ancho,fondo,x,y);
        return proyectoDentro("x",nuevo) && proyectoDentro("y",nuevo)
      }


      yo.colisiona=function(otro){
        return proyeccionColisiona("x",otro) && proyeccionColisiona("y",otro);
      }



      function proyectoDentro(intervalador,otro){

        let miIntervalo = yo.intervalo(intervalador);
        let suIntervalo = otro.intervalo(intervalador);
        /*
        console.log("mi intervalo es ",miIntervalo," su intervalo es ",suIntervalo);
        console.log(suIntervalo.contiene(miIntervalo));
        */
        return suIntervalo.contiene(miIntervalo);
      }

      function proyeccionColisiona(intervalador,otro){

        let miIntervalo = yo.intervalo(intervalador);
        let suIntervalo = otro.intervalo(intervalador);
/*
        console.log("mi intervalo es ",miIntervalo," su intervalo es ",suIntervalo);
        console.log(miIntervalo.interseca(suIntervalo));
*/
        return miIntervalo.interseca(suIntervalo);
      }


      return yo;
}
//let afuera=new Edificio(10,10,0,0);
//let dentro = new Edificio(5,4,-3,-1);
//console.log(dentro.dentroDe(10,10,0,0));
//console.log(afuera.dentroDe(2,2,3,3));


let uno = new Edificio(1,7,8,3);
let dos = new Edificio(1,7,8,2);
//let tres= new Edificio(4,5,2,0);
console.log(uno.colisiona(dos))

//console.log(new Edificio(1,1,1,0).dentroDe(10,10,0,0));
//console.log(new IntervaloAbierto(0,1).contiene(new IntervaloAbierto(0,10)));

function IntervaloAbierto(desde,hasta){
  this.desde = desde;
  this.hasta = hasta;
  this.tiene=function(n){
    return Math.min(desde,hasta)<n && n<Math.max(desde,hasta);
  }
  this.casiTiene=function(n){
    return Math.min(desde,hasta)<=n && n<=Math.max(desde,hasta);
  }
  this.interseca=function(otro){
    return (this.tiene(otro.desde) || this.tiene(otro.hasta) || otro.tiene(this.desde) || otro.tiene(this.hasta))||
    (this.casiTiene(otro.desde) && this.casiTiene(otro.hasta));
  }
  this.contiene=function(otro){
    return this.casiTiene(otro.desde) && this.casiTiene(otro.hasta);
  }
}

function ListaEdificios(lado){
  let cantidadEdificios = lado*lado*(0.2+Math.random())/2;
  let yo=[];

  function colisiona(este){
    let si=false
      yo.forEach(function(otro){
        if(este.colisiona(otro) && este != otro){
          si = true;
          //console.log(este,"Choca con",otro);
        }
      });
      //--- contra bordes ---

      if(!este.dentroDe(lado,lado,0,0)){
        si=true;
        //console.log("No está adentro");
      }

      return si;
  }


  function agregarEdficioPosRandom(){
    for(let i =0; i<100;i++){
      let xr=Math.floor(Math.random()*lado);
      let yr=Math.floor(Math.random()*lado);
      let eNuevo = new Edificio(1,1,xr,yr);
      if(!colisiona(eNuevo)){
        yo.push(eNuevo);
        break;
      }
    }
  }

  function expandir(e,cuanto,cual,coefSuma){
    for(let i=0; i<cuanto;i++){
      e[cual]+=coefSuma;
      if(colisiona(e)){
        e[cual]-=coefSuma;
        break;
      }
    }
  }

  function revolver(e){
    /*
    if(Math.random()<0.5){
      expandir(e,1,"ancho",1);
      //if(Math.random()<0.5)expandir(e,1,"x",-1);
    }else{
      expandir(e,1,"fondo",1);
      //if(Math.random()<0.5)expandir(e,1,"y",-1);
    }
    */
    /*
    let alternativas =[
      () => e.mover(1,0,colisiona),
      () => e.estirar(1,0,colisiona),
      () => e.mover(0,1,colisiona),
      () => e.estirar(0,1,colisiona)
    ];
    */
    if(Math.random()<0.5){
      e.estirar(0,1,colisiona);
      if(Math.random()<0.5)e.mover(0,1,colisiona);
    }else{
      e.estirar(1,0,colisiona);
      if(Math.random()<0.5)e.mover(1,0,colisiona);
    }
    /*
    if(Math.random()<0.5){
      if(Math.random()<0.5)e.mover(1,0,colisiona);
      else e.estirar(1,0,colisiona);
    }else{
      if(Math.random()<0.5)e.mover(0,1,colisiona);
      else e.estirar(0,1,colisiona);
    }
    */
  }



  function revolverTodo(){
    for(let i=0;i<yo.length;i++){
      revolver(yo[i]);
    }
  }


  for(let i = 0;i<cantidadEdificios;i++){
    agregarEdficioPosRandom();
  }
  for(let i = 0;i<60;i++){
    revolverTodo();
  }
  for(let e of yo){
    console.log(e.ancho,e.fondo,e.x,e.y);
  }
  return yo;
}
