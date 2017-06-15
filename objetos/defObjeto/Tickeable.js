function Tickeable(o){
  let sobretick=null;
  o.cambiarSobretick=function(cual){
    sobretick=cual;
  }

  o.sobretick=function(delta){
    if(sobretick!=null && delta != undefined){
      sobretick(delta);
    }
  };

  o.tick = function(delta){

    this.sobretick(delta);
    o.hijos.forEach(function(h){
      h.tick(delta);
    });
  }
}
