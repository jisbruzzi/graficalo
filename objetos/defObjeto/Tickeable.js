function Tickeable(o){
  let sobretick=null;
  o.cambiarSobretick=function(cual){
    sobretick=cual;
  }

  o.sobretick=function(delta,mundo){
    if(sobretick!=null && delta != undefined){
      sobretick(delta,mundo);
    }
  };

  o.tick = function(delta,mundo){

    this.sobretick(delta,mundo);
    o.hijos.forEach(function(h){
      h.tick(delta,mundo);
    });
  }
}
