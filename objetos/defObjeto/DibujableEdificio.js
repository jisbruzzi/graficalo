// la idea es interceptar la matriz, no dibujar. Y pegotear las formas de alguna manera y dibujar varios edificios en un solo draw.
function DibujableEdificio(o,modelo,forma){

  let miMatriz=mat4.create
  o.dibujar = function(m){
    let def = o.obtenerMatModelado();
    if (m != null) mat4.multiply(def,m,def);
    if (modelo != null) modelo.dibujar(def,o.uniforms);
    miMatriz=def;
    o.hijos.forEach(function(h){
      h.dibujar(def);
    });
  };

  o.iniciarUniforms=function(altura,alturaBase,alturaSobre){
    
    o.uniforms.push({nombre:"uAltura",valor:altura});
  }

  o.cambiarAltura=function(altura){
    o.uniforms[0].valor=altura;
  }
}
