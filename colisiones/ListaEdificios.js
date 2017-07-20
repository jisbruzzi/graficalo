function elegir(array){
  return array[Math.floor(Math.random()*array.length)];
}
function ListaEdificios(lado){
  let cantidadEdificios = lado*lado*(0.2+Math.random())/2;//10;//
  let yo=[];

  function agregarEdficiosPosRandom(){
    for(let i =0; i<50;i++){
      let xr=Math.floor(Math.random()*lado);
      let yr=Math.floor(Math.random()*lado);
      let ancho=elegir([1,1,1,2,2,3]);
      let fondo=elegir([1,1,1,2,2,3]);
      let eNuevo = new Edificio(ancho,fondo,xr,yr);

      if(!colisiona(eNuevo)){
        yo.push(eNuevo);

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


  //for(let i = 0;i<cantidadEdificios;i++){
    agregarEdficiosPosRandom();
  //}

  for(let i = 0;i<3;i++){//3 <-> lado
    revolverTodo();
  }


  return yo;
}
