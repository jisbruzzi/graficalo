function Iluminable(o,modelo){
  o.luces=[];
  o.obtenerLucesHijos=function(m){
    let ret=[].concat(o.luces);
    let def = o.obtenerMatModelado();
    if (m != null) mat4.multiply(def,m,def);

    for (l of o.luces){
      l.actualizarMatModeladoAnterior(def);
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
  o.setSpecular=function(glossiness,specularColor){
    if(modelo!=undefined){
      modelo.glossiness=glossiness;
      modelo.specularColor=specularColor;
    }
    for(hijo of o.hijos){
      hijo.setSpecular(glossiness,specularColor);
    }
  }
}
