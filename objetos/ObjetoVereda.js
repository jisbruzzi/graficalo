/*
VA A ESTAR MAL ILUMINADO PORQUE LAS NORMALES ESTÁN MAL ARMADAS EN LAS FORMAS!!
*/
function ObjetoVereda(ladoManzana,radioBorde,altura,gl){
  let yo=new Objeto();
  let texturaVereda = atlasTexturas.t("vereda.jpg");////vereda.jpg
  let programaColor = atlasShaderPs.p("coloreado");
  let programaTextura = atlasShaderPs.p("normalmappeada-texturada");
  let fTapa=new FormaVereda(ladoManzana,radioBorde,radioBorde,gl).copiaConTextura(texturaVereda);
  FormaNormalMappeada(fTapa,atlasTexturas.t("vereda_normal.jpg"));
  let fZoca=new FormaZocalo(ladoManzana,radioBorde,gl,[0.5,0.5,0.5]);
  let oTapa=new Objeto(new Modelo(fTapa,programaTextura,gl));
  let oZoca=new Objeto(new Modelo(fZoca,programaColor,gl));
  oZoca.escalar(1,1,altura);
  oTapa.mover(0,0,altura);
  yo.hijos.push(oZoca);
  yo.hijos.push(oTapa);
  return yo;
}
