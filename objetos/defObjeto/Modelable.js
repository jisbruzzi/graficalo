function Modelable(o){
  //-- calcular la matriz --//
  o.obtenerMatModelado = function(){
    let ret = mat4.create();
    //console.log(mat4);
    mat4.fromRotationTranslation(ret,o.rotacionQuat(),o.obtenerPosicion());
    mat4.scale(ret,ret,o.obtenerEscala());
    return ret;
  }
}
