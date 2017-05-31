function poliBezier(u0,u1,u2,u3){
  return function(t){
    return  u0*Math.pow(1-t,3)+
            u1*Math.pow(1-t,2)*t+
            u2*(1-t)*t*t+
            u3*t*t*t;
  }
}
function transicionBezierRandom(){
  //return poliBezier(0,Math.random()*0.2,3-Math.random()*0.1,1);
  return poliBezier(0,1,3,1);
}

function ObjetoEdificio(ancho,fondo,gl,altoMaximo,retardo,tiempoAnimacion){


  let miBezier=transicionBezierRandom();

  //console.log(altoMaximo,retardo,tiempoAnimacion);
  let ticks=0;
  let forma=new FormaEdificio(gl,ancho,fondo);
  function elementoAlAzar(array){
    let r=Math.random();
    let cual = Math.floor(r*array.length);
    return array[cual];
  }

  let tPisos = atlasTexturas.t(elementoAlAzar(nombresImagenesPisos));
  let tPlantabaja = atlasTexturas.t(elementoAlAzar(nombresImagenesPlantabajas));

  let programaEdificio = atlasShaderPs.p("edificio");
  let fEdificio=forma.hacerCopiaConTexturas(tPlantabaja,tPisos);
  let mEdificio=new Modelo(fEdificio,programaEdificio,gl);
  let oEdificio = new Objeto(mEdificio);
  oEdificio.uniforms.push({nombre:"uAltura",valor:0.0});
  oEdificio.uniforms.push({nombre:"uAlturaBase",valor:tPlantabaja.height/tPlantabaja.width});
  oEdificio.uniforms.push({nombre:"uAlturaSobre",valor:tPisos.height/tPisos.width});

  let iniciada = false;

  function easingAlAzar(){
    let posibilidades=[
      TWEEN.Easing.Elastic.Out,
      TWEEN.Easing.Elastic.InOut,
      //TWEEN.Easing.Linear,
      TWEEN.Easing.Quadratic.Out,
      TWEEN.Easing.Sinusoidal.Out,
      TWEEN.Easing.Circular.Out,
      TWEEN.Easing.Back.Out,
      TWEEN.Easing.Bounce.Out,
    ];
    return posibilidades[Math.floor(Math.random()*posibilidades.length)];
  }

  function iniciarAnimacion(){
    if (iniciada) return;
    iniciada=true;

    let coso ={h:0};
    new TWEEN.Tween(coso)
    .easing(easingAlAzar())
    .to({ h:1 }, 1000*tiempoAnimacion)
    .onUpdate(function() {
        oEdificio.uniforms[0].valor=coso.h*altoMaximo;
    }).start();
  }

  oEdificio.cambiarSobretick(function(delta){
    ticks=delta/3000;
    if (ticks>retardo){
      iniciarAnimacion();
    }
    //let coef = miBezier(Math.min(tiempo/(tiempoAnimacion*250),1));
  });

  return oEdificio;

}
