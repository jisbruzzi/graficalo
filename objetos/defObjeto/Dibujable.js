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

  o.configurarIluminacion=function(lightPosition, ambientColor, diffuseColor){
    if(modelo!=null) modelo.configurarIluminacion(lightPosition, ambientColor, diffuseColor);

    o.hijos.forEach(function(h){
      h.configurarIluminacion(lightPosition, ambientColor, diffuseColor);
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
