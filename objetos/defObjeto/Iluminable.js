function Iluminable(o,modelo){
  o.luces=[];
  o.obtenerLucesHijos=function(m){
    let ret=[].concat(o.luces);
    let def = o.obtenerMatModelado();
    if (m != null) mat4.multiply(def,m,def);

    for (l of o.luces){
      if (modelo != null) l.actualizarMatModeladoAnterior(def);
    }
    //console.log(o.hijos);
    for ( h of o.hijos){
      try{
        ret = ret.concat(h.obtenerLucesHijos(def));
      }catch(e){
        //console.log(h);
        throw e;
      }
    }
    return ret;
  }
}
