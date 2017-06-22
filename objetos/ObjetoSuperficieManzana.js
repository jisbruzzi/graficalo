function ObjetoSuperficieManzana(lado,plaza,densidad,gl){
  let sup;
  let sp=atlasShaderPs.p("normalmappeada-texturada");
  if(plaza){
    sup=new FormaPlano(lado*densidad,lado*densidad,gl,[0.1,0.5,0.1]);
    sup=sup.copiaConTextura(atlasTexturas.t("grass01.jpg"));
    FormaNormalMappeada(sup,atlasTexturas.t("grass01_n.jpg"));
  }else{
    sup=new FormaPlano(lado*densidad,lado*densidad,gl,[0.1,0.5,0.1]);
    sup = sup.copiaConTextura(atlasTexturas.t("vereda.jpg"));
    FormaNormalMappeada(sup,atlasTexturas.t("vereda_normal.jpg"));
  }

  let m=new Modelo(sup,sp,gl);
  let o = new Objeto(m);
  o.escalar(1/densidad,1/densidad,1);
  return o;
}
