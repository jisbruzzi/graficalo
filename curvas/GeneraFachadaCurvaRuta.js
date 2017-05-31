//la cirva es plana
function GeneraFachadaCurvaRuta(curvas){
  let curva =curvas[0];
  let derivada = curvas[1];
  let normaDerivada = curvas[2];

  let yo ={};

  function punto(v){
    return vec3.fromValues(v[0],v[1],v[2])
  }

  function puntoLindo(vec3Inicial){
    return{
      x:vec3Inicial[0],
      y:vec3Inicial[1],
      z:vec3Inicial[2]
    }
  }

  yo.desplazada=function(x){
    return function(t){
      let biNormal=[0,0,1];

      let normal = vec3.create();
      vec3.cross(normal,biNormal,punto(derivada(t)));

      let puntoCurva = punto(curva(t));
      let offset = vec3.create();
      vec3.scale(offset,normal,x);

      let final = vec3.create();
      vec3.add(final,puntoCurva,offset);

      return puntoLindo(final);
    }
  }

  return yo;

}
