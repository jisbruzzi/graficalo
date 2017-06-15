function Escalable(o){
  //-- escalado --//
  let escala = vec3.fromValues(1,1,1);
  o.escalar=function(x,y,z){
    vec3.multiply(escala,[x,y,z],escala);
    return this;
  }
  o.anularEscalado=function(){
    escala = vec3.fromValues(1,1,1);
    return this;
  }
  o.obtenerEscala=function(){
    return vec3.clone(escala);
  }
}
