function ObjetoEdificio(forma,gl){
  let texturaCalle = atlasTexturas.t("tramo-dobleamarilla.jpg");
  let texturaEsquina = atlasTexturas.t("cruce.jpg");
  let texturaVereda = atlasTexturas.t("vereda.jpg");

  let programaEdificio = atlasShaderPs.p("edificio");
  let fEdificio=forma.hacerCopiaConTexturas(texturaEsquina,texturaCalle);
  let mEdificio=new Modelo(fEdificio,programaEdificio,gl);
  oEdificio = new Objeto(mEdificio);
  oEdificio.uniforms.push({nombre:"uAltura",valor:0.0});
  oEdificio.uniforms.push({nombre:"uAlturaBase",valor:0.5});
  oEdificio.uniforms.push({nombre:"uAlturaSobre",valor:0.7});

  oEdificio.sobretick=function(){
    oEdificio.uniforms[0].valor+=0.01;
  }

  return oEdificio;

}
