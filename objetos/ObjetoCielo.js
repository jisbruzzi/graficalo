function ObjetoCielo(gl,radio){
  let f = new FormaEsfera(40,40,gl).copiaConTextura(atlasTexturas.t("refmap.jpg"));
  let m = new Modelo(f,atlasShaderPs.p("cielo"),gl);
  let yo=new Objeto(m);
  yo.escalar(radio,radio,radio).rotar([1,0,0],Math.PI/2);
  return yo;
}
