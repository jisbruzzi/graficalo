function ObjetoEdificio(ancho,fondo,gl,altoMaximo,retardo,tiempoAnimacion){
  console.log(altoMaximo,retardo,tiempoAnimacion);
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

  oEdificio.sobretick=function(){
    ticks+=1;
    let altura = Math.max(ticks/100-retardo/100,0);


    oEdificio.uniforms[0].valor=altura;
    if(oEdificio.uniforms[0].valor>altoMaximo){
      oEdificio.uniforms[0].valor=altoMaximo;
    }
  }

  return oEdificio;

}
