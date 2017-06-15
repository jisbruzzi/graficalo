function Luz(){
  let yo={};
  
  Rotable(yo);
  Trasladable(yo);
  Escalable(yo);
  Modelable(yo);

  let matAnterior=mat4.create()//es la identidad
  yo.actualizarMatModeladoAnterior=function(m){
    matAnterior=m;
  }

  yo.obtenerPosicionFinal=function(){
    let def = o.obtenerMatModelado();
    mat4.multiply(def,matAnterior,def);
    let pos = o.obtenerPosicion();
    let pos4=vec4.fromValues(pos[0],pos[1],pos[2],1);
    vec4.transformMat4(pos4,def,pos4);
    let posf = vec3.fromValues(pos4[0]/pos4[3],pos4[1]/pos4[3],pos4[2]/pos4[3]);
    return posf;
  }

  return yo;
}
