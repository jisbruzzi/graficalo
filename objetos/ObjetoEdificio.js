function ObjetoEdificio(forma,gl){
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
  oEdificio = new Objeto(mEdificio);
  oEdificio.uniforms.push({nombre:"uAltura",valor:0.0});
  oEdificio.uniforms.push({nombre:"uAlturaBase",valor:tPlantabaja.height/tPlantabaja.width});
  oEdificio.uniforms.push({nombre:"uAlturaSobre",valor:tPisos.height/tPisos.width});

  oEdificio.sobretick=function(){
    oEdificio.uniforms[0].valor+=0.01;
  }

  return oEdificio;

}
