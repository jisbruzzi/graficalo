function ObjetoObraDeArte(gl){
  let yo = new Objeto();
  let s = atlasShaderPs.p("reflexion");
  let t = atlasTexturas.t("refmap.jpg");

  let formaEsfera=new FormaEsfera(30,30,gl);
  let formaCubo=new FormaEdificio(gl,1,1,0,0,1,1,1);
  FormaMultitexturable(formaEsfera);
  formaEsfera.agregarSampler2D("uSamplerReflexion",t);
  formaEsfera.agregarSampler2D("uSampler",atlasTexturas.t("textura-pasto.jpg"));
  FormaMultitexturable(formaCubo);
  formaCubo.agregarSampler2D("uSamplerReflexion",t);
  formaCubo.agregarSampler2D("uSampler",atlasTexturas.t("textura-pasto.jpg"));

  let mEsfera=new Modelo(formaEsfera,s,gl);

  //let o1=new Objeto(mEsfera);
  let o2=new Objeto(mEsfera);
  o2.mover(0,0,1);
  o2.escalar(0.45,0.45,0.45);

  let o3=new Objeto(mEsfera);
  o3.escalar(0.45,0.45,0.45);
  o3.mover(0.5,0,0.5);

  let med = new Modelo(formaCubo,s,gl);
  let e1=new Objeto(med);
  yo.hijos.push(e1);

  //yo.hijos.push(o1);
  yo.hijos.push(o2);
  yo.hijos.push(o3);
  //yo.hijos.push(o4);


  return yo;

}
