function Camara(){
  
  let mProyeccion = mat4.create();
  this.setPerspectiva=function(fovy,aspect,near,far){
    mat4.perspective(mProyeccion, fovy, aspect, near, far);
    return this;
  }


  let posicion=[0,0,0];
  this.setPosicion=function(x,y,z){
    posicion=[x,y,z];
    return this;
  }

  let hacia=[0,0,0];
  this.setHacia=function(x,y,z){
    hacia=[x,y,z];
    return this;
  }

  let arriba=[0,0,0];
  this.setArriba=function(x,y,z){
    arriba=[x,y,z];
    return this;
  }

  this.obtenerMatrizProyeccion=function(){
    return mProyeccion;
  }

  this.obtenerMatrizCamara=function(){
    let mCamara=mat4.create();
    mat4.lookAt(mCamara,posicion,hacia,arriba);
    return mCamara;
  }

}
