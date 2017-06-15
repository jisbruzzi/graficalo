function Rotable(o){
  //-- rotación --//
  let rotacion = quat.create();//TENGO QUE APRENDER DE CUATERNIONES PARA SABER CÓMO IMPLEMENTAR LOS COSOS DE ABAJO
  //setAxisAngle parece una buena alternativa a mat4.rotate!! y se podría consultar el ángulo
  o.rotar=function(eje,cuanto){
    //mat4.rotate(rotacion,rotacion,cuanto,eje);
    let agregado = quat.create();
    quat.setAxisAngle(agregado,eje,cuanto);
    quat.multiply(rotacion,agregado,rotacion);
    return o;
  }
  o.anularRotacion=function(){
    rotacion = quat.create();
    return o;
  }
  o.rotacion=function(){
    let eje=vec3.create();
    let angulo=quat.getAxisAngle(eje,rotacion);
    let ret={};
    ret.angulo=angulo;
    ret.eje=eje;
    return o;
  }
  o.rotacionQuat=function(){
    return quat.clone(rotacion);
  }
}
