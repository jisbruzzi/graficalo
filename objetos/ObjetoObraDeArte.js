function ObjetoObraDeArte(gl){
  let yo = new Objeto();
  let s = atlasShaderPs.p("reflexion");
  let t = atlasTexturas.t("refmap.jpg");

  let formaEsfera=new FormaEsfera(30,30,gl).copiaConTextura(t);
  let mEsfera=new Modelo(formaEsfera,s,gl);

  let o1=new Objeto(mEsfera);
  yo.hijos.push(o1);

  return yo;

}
