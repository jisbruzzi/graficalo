function Objeto(modelo){
  //--configurar shaders--//
  this.uniforms=[];

  //-- rotación --//
  let rotacion = quat.create();//TENGO QUE APRENDER DE CUATERNIONES PARA SABER CÓMO IMPLEMENTAR LOS COSOS DE ABAJO
//setAxisAngle parece una buena alternativa a mat4.rotate!! y se podría consultar el ángulo

  this.rotar=function(eje,cuanto){
    //mat4.rotate(rotacion,rotacion,cuanto,eje);
    let agregado = quat.create();
    quat.setAxisAngle(agregado,eje,cuanto);
    quat.multiply(rotacion,agregado,rotacion);
    return this;
  }
  this.anularRotacion=function(){
    rotacion = quat.create();
    return this;
  }
  this.rotacion=function(){
    let eje=vec3.create();
    let angulo=quat.getAxisAngle(eje,rotacion);
    let ret={};
    ret.angulo=angulo;
    ret.eje=eje;
    return ret;
  }

  //-- traslación --//
  let posicion = vec3.fromValues(0,0,0);
  this.mover=function(x,y,z){
    vec3.add(posicion,posicion,vec3.fromValues(x,y,z));
    return this;
  }
  this.anularPosicion=function(){
    posicion = vec3.fromValues(0,0,0);
    return this;
  }
  this.setPosicion=function(x,y,z){
    posicion=vec3.fromValues(x,y,z);
    return this;
  }
  this.obtenerPosicion=function () {
    return vec3.clone(posicion);
  }


  //-- escalado --//
  let escala = vec3.fromValues(1,1,1);
  this.escalar=function(x,y,z){
    vec3.multiply(escala,[x,y,z],escala);
    return this;
  }
  this.anularEscalado=function(){
    escala = vec3.fromValues(1,1,1);
    return this;
  }
  this.obtenerEscala=function(){
    return vec3.clone(escala);
  }

  //-- calcular la matriz --//
  this.obtenerMatModelado = function(){
    let ret = mat4.create();
    //console.log(mat4);
    mat4.fromRotationTranslation(ret,rotacion,posicion);
    mat4.scale(ret,ret,escala);
    return ret;
  }

  //-- hijos --//
  this.hijos=[];//así de simple

  //-- dibujado --//
  this.dibujar = function(m){
    let def = this.obtenerMatModelado();
    if (m != null) mat4.multiply(def,m,def);
    if (modelo != null) modelo.dibujar(def,this.uniforms);

    this.hijos.forEach(function(h){
      h.dibujar(def);
    });
  };

  this.configurarIluminacion=function(lightPosition, ambientColor, diffuseColor){
    if(modelo!=null) modelo.configurarIluminacion(lightPosition, ambientColor, diffuseColor);

    this.hijos.forEach(function(h){
      h.configurarIluminacion(lightPosition, ambientColor, diffuseColor);
    });

    return this;
  };

  this.configurarCamara=function(camara){
    if(modelo!=null) modelo.configurarCamara(camara);

    this.hijos.forEach(function(h){
      h.configurarCamara(camara);
    });

    return this;
  }

  let sobretick=null;
  this.cambiarSobretick=function(cual){
    sobretick=cual;
  }

  this.sobretick=function(delta){
    if(sobretick!=null && delta != undefined){
      sobretick(delta);
    }
  };

  this.tick = function(delta){

    this.sobretick(delta);
    this.hijos.forEach(function(h){
      h.tick(delta);
    });
  }
}
