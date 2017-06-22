function Trasladable(o){
  //-- traslación --//
  o.cambioPosicion=true;
  let posicion = vec3.fromValues(0,0,0);
  o.mover=function(x,y,z){
    o.cambioPosicion=true;
    vec3.add(posicion,posicion,vec3.fromValues(x,y,z));
    return this;
  }
  o.anularPosicion=function(){
    o.cambioPosicion=true;
    posicion = vec3.fromValues(0,0,0);
    return this;
  }
  o.setPosicion=function(x,y,z){
    o.cambioPosicion=true;
    posicion=vec3.fromValues(x,y,z);
    return this;
  }
  o.obtenerPosicion=function () {
    return vec3.clone(posicion);
  }
}
