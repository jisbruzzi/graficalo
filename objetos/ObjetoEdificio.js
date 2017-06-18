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

//voy a hacer como si fueran posibles sólo 8 texturas: 4 bajo y 4
const colectorEdificios=(function(){
  let yo={};
  let edificios=[];
  yo.nuevoEdificio=function(ancho,fondo,gl,altoMaximo,retardo,tiempoAnimacion){
    let edificio = new ObjetoEdificio(ancho,fondo,gl,altoMaximo,retardo,tiempoAnimacion);
    edificios.push(edificio);
    return edificio;
  }

  return yo;
})();

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

  let programaEdificio = atlasShaderPs.p("binormal");
  let fEdificio=forma.hacerCopiaConTexturas(tPlantabaja,tPisos);
  let mEdificio=new Modelo(fEdificio,programaEdificio,gl);
  let oEdificio = new Objeto(mEdificio);
  DibujableEdificio(oEdificio,mEdificio,fEdificio);
  oEdificio.iniciarUniforms(0,tPlantabaja.height/tPlantabaja.width,tPisos.height/tPisos.width);

  let iniciada = false;

  function easingAlAzar(){
    let posibilidades=[
      TWEEN.Easing.Elastic.Out,
      TWEEN.Easing.Elastic.Out,

      TWEEN.Easing.Quadratic.Out,
      TWEEN.Easing.Sinusoidal.Out,
      TWEEN.Easing.Circular.Out,

      TWEEN.Easing.Back.Out,
    ];
    return posibilidades[Math.floor(Math.random()*posibilidades.length)];
  }

  function iniciarAnimacion(){
    if (iniciada) return;
    iniciada=true;

    let easing = easingAlAzar();
    if(easing==TWEEN.Easing.Elastic.Out || easing==TWEEN.Easing.Back.Out){
      //Math.min(tiempoAnimacion/=5,2);
      tiempoAnimacion=Math.max(1.2+randn_bm()*0.3,1);
    }

    let coso ={h:0};
    new TWEEN.Tween(coso)
    .easing(easingAlAzar())
    .to({ h:1 }, 1000*tiempoAnimacion)
    .onUpdate(function() {
      oEdificio.cambiarAltura(coso.h*altoMaximo);
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
