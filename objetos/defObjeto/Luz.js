function Luz(){
  let yo={};
  Rotable(yo);
  Trasladable(yo);
  Escalable(yo);
  Modelable(yo);
  Spoteable(yo);
  let matAnterior=mat4.create()//es la identidad
  let cambioMatAnterior=true;
  let posicionFinalAnterior=vec3.create();
  yo.actualizarMatModeladoAnterior=function(m){
    //console.log(mat4);
    let iguales=mat4.equals(matAnterior,m);
    cambioMatAnterior= cambioMatAnterior || ! iguales;
    matAnterior=m;
  };

  function calcularPosicionFinal(){
    let def = yo.obtenerMatModelado();
    mat4.multiply(def,matAnterior,def);
    let pos = [0,0,0];
    let pos4=[pos[0],pos[1],pos[2],1.0];
    let post=[0.0,0.0,0.0,0.0];
    vec4.transformMat4(post,pos4,def);

    let posf = [post[0]/post[3],post[1]/post[3],post[2]/post[3]];
    return posf;
  }

  yo.obtenerPosicionFinal=function(){
    if(cambioMatAnterior){
      posicionFinalAnterior=calcularPosicionFinal();
      cambioMatAnterior=false;
    }
    return posicionFinalAnterior;
  }

  yo.distanciaIluminada=1;
  yo.color=[1,1,1];

  return yo;
}
