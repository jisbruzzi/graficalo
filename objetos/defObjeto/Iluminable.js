function Iluminable(o){
  o.luces=[];
  o.obtenerLucesHijos=function(m){
    let ret=[].concat(o.luces);
    let def = o.obtenerMatModelado();
    if (m != null) mat4.multiply(def,m,def);

    for (l of o.luces){
      if (modelo != null) modelo.actualizarMatModeladoAnterior(def);
    }
    for ( h of o.hijos){
      ret = ret.concat(h.obtenerLucesHijos());
    }
    return ret;
  }
}
