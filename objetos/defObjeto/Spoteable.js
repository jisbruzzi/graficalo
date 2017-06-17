function Spoteable(o){
  let hacia=[0,0,1];
  o.cambiarHacia=function(vec){
    hacia=vec3.clone(vec);
    vec3.normalize(hacia,hacia);
  }

  o.obtenerHaciaFinal=function(){
    var normalMatrix = mat3.create();
		mat3.fromMat4(normalMatrix, o.obtenerMatModelado());
		mat3.invert(normalMatrix, normalMatrix);
		mat3.transpose(normalMatrix, normalMatrix);
    //siempre apunta para [0,0,1]
    let final=vec3.create();
    vec3.transformMat3(final,hacia,normalMatrix);
    return final;
  }

  o.concentracion=0;
}
