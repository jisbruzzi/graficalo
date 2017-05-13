function Camara(){

  let mProyeccion = mat4.create();
  this.setPerspectiva=function(fovy,aspect,near,far){
    mat4.perspective(mProyeccion, fovy, aspect, near, far);
    return this;
  }


  let rotacion = quat.create();
  this.anularRotacion=function(){
    rotacion = quat.create();
    return this;
  }
  this.rotar=function(eje,cuanto){
    //mat4.rotate(rotacion,rotacion,cuanto,eje);
    let agregado = quat.create();
    quat.setAxisAngle(agregado,eje,cuanto);
    quat.multiply(rotacion,agregado,rotacion);
    return this;
  }


  let posicion=[0,0,0];
  this.setPosicion=function(x,y,z){
    posicion=[x,y,z];
    return this;
  }
  this.getPosicion = function(){
    return [posicion[0],posicion[1],posicion[2]]
  }
  this.mover=function(x,y,z){
    posicion[0]+=x;
    posicion[1]+=y;
    posicion[2]+=z;
    return this;
  }

  this.moverHacia=function(x,y,z){
    hacia[0]+=x;
    hacia[1]+=y;
    hacia[2]+=z;
    return this;
  }

  this.moverPosyHacia=function(x,y,z){
    return this.moverHacia(x,y,z).mover(x,y,z);
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
    /*
    let rot = mat4.create();
    mat4.fromQuat(rot,rotacion);
    mat4.multiply(mCamara,mCamara,rot);

    let mCamara =mat4.create();
    mat4.rotate(mCamara,mCamara,45/180*3.14,[1,0,0]);
    mat4.translate(mCamara,mCamara,[0,0,-1])
    //mat4.rotate(mCamara,mCamara,45/180*3.14,[1,0,0]);
    */
    return mCamara;
  }

}
