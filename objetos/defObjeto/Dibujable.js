function Dibujable(o,modelo){
  //--configurar shaders--//
  o.uniforms=[];

  //-- dibujado --//
  o.dibujar = function(m){
    let def = o.obtenerMatModelado();
    if (m != null) mat4.multiply(def,m,def);
    if (modelo != null) modelo.dibujar(def,o.uniforms);

    o.hijos.forEach(function(h){
      h.dibujar(def);
    });
  };

  o.configurarIluminacionGlobal=function(luzGlobal){
    if(modelo!=null) modelo.configurarIluminacionGlobal(luzGlobal);

    o.hijos.forEach(function(h){
      h.configurarIluminacionGlobal(luzGlobal);
    });
    return o;
  };

  o.configurarLuces=function(listaLuces){
    if(modelo!=null) modelo.configurarLuces(listaLuces);

    o.hijos.forEach(function(h){
      h.configurarLuces(listaLuces);
    });
    return o;
  };

  o.configurarCamara=function(camara){
    if(modelo!=null) modelo.configurarCamara(camara);

    o.hijos.forEach(function(h){
      h.configurarCamara(camara);
    });

    return o;
  }
}
