function ObjetoSuperficieManzana(lado,plaza,densidad,gl){
  let sup=new FormaPlano(lado*densidad,lado*densidad,gl,[0.8,0.1,0.1]);
  let sp=atlasShaderPs.p("coloreado");
  if(!plaza){
    sup = sup.copiaConTextura(atlasTexturas.t("vereda.jpg"));
    sp=atlasShaderPs.p("texturado");
  }

  let m=new Modelo(sup,sp,gl);
  let o = new Objeto(m);
  o.escalar(1/densidad,1/densidad,1);
  return o;
}
