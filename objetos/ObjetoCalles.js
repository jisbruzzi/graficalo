function ObjetoCalles(manzanasAncho,manzanasAlto,ladoManzana,gl){
  let programaColor = atlasShaderPs.p("coloreado");
  let programaTextura = atlasShaderPs.p("texturado");
  let texturaCalle = atlasTexturas.t("tramo-dobleamarilla.jpg");
  let texturaEsquina = atlasTexturas.t("cruce.jpg");
  let texturaVereda = atlasTexturas.t("vereda.jpg");

  let yo = new Objeto();
  let fEsquina = new FormaPlano(1,1,gl).copiaConTextura(texturaEsquina);
  let fCalle = new FormaPlano(1,ladoManzana,gl).copiaConTextura(texturaCalle);
  let mEsquina = new Modelo(fEsquina,programaTextura,gl);
  let mCalle = new Modelo(fCalle,programaTextura,gl);
  let tamEsq=1.48;

  function ponerEsquina(x,y){
    let e = new Objeto(mEsquina);
    e.mover(x,y,0);
    e.escalar(tamEsq,tamEsq,tamEsq);
    yo.hijos.push(e);
  }
  let retardoManzanaActual=3;
  function ponerManzana(x,y){
    let v = new ObjetoVereda(ladoManzana+0.5,0.25,0.03,gl);
    v.setPosicion(x,y,0);
    yo.hijos.push(v);

    retardoManzanaActual+=randn_bm()*0.5+1;
    let m = new ObjetoManzanaEdificios(ladoManzana,gl,retardoManzanaActual);
    m.setPosicion(x,y,0);
    yo.hijos.push(m);

    let s = new ObjetoSuperficieManzana(ladoManzana,false,4,gl);
    s.setPosicion(x-0,y-0,0.03);
    //s.escalar((ladoManzana+0.1)/ladoManzana,(ladoManzana+0.1)/ladoManzana,1);
    yo.hijos.push(s);

  }
  function ponerCalleVertical(x,y){
    let e = new Objeto(mCalle);
    e.mover(x,y,0);
    yo.hijos.push(e);
  }
  function ponerCalleHorizontal(x,y){
    let e = new Objeto(mCalle);
    e.mover(x,y,0);
    e.rotar([0,0,1],Math.PI/2);
    yo.hijos.push(e);
  }
  for (let x=0; x<manzanasAncho+1;x++){
    for (let y=0; y<manzanasAlto+1;y++){
      ponerEsquina(x*(ladoManzana+tamEsq),y*(ladoManzana+tamEsq));
    }
  }
  for (let x=0; x<manzanasAncho;x++){
    for (let y=0; y<manzanasAlto;y++){
      ponerManzana(tamEsq/2+x*(ladoManzana+tamEsq)+ladoManzana/2,tamEsq/2+y*(ladoManzana+tamEsq)+ladoManzana/2);
    }
  }
  for (let x=0; x<manzanasAncho+1;x++){
    for (let y=0; y<manzanasAlto;y++){
      ponerCalleVertical(x*(ladoManzana+tamEsq),(tamEsq+ladoManzana)/2+y*(ladoManzana+tamEsq));
    }
  }

  for (let x=0; x<manzanasAncho;x++){
    for (let y=0; y<manzanasAlto+1;y++){
      ponerCalleHorizontal((tamEsq+ladoManzana)/2+x*(ladoManzana+tamEsq),y*(ladoManzana+tamEsq));
    }
  }

  return yo;
}
