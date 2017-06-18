
function ListaEdificios(lado){
  let cantidadEdificios = 10;//lado*lado*(0.2+Math.random())/2;//
  let yo=[];

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
    if(Math.random()<0.5){
      e.estirar(0,1,colisiona);
      if(Math.random()<0.5)e.mover(0,1,colisiona);
    }else{
      e.estirar(1,0,colisiona);
      if(Math.random()<0.5)e.mover(1,0,colisiona);
    }
  }

  function revolverTodo(){
    for(let i=0;i<yo.length;i++){
      revolver(yo[i]);
    }
  }


  for(let i = 0;i<cantidadEdificios;i++){
    agregarEdficioPosRandom();
  }

  for(let i = 0;i<lado;i++){
    revolverTodo();
  }


  return yo;
}
