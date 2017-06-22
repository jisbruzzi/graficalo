function Modelable(o){
  o.cambioPosicion=true;
  let ultimoCalculo=mat4.create();
  //-- calcular la matriz --//
  function calcularMatrizModelado(){
    let ret = mat4.create();
    mat4.fromRotationTranslation(ret,o.rotacionQuat(),o.obtenerPosicion());
    mat4.scale(ret,ret,o.obtenerEscala());
    return ret;
  }
  o.obtenerMatModelado = function(){
    if(o.cambioPosicion){
      o.cambioPosicion=false;
      ultimoCalculo=calcularMatrizModelado();
    }
    return calcularMatrizModelado();
  };
}
