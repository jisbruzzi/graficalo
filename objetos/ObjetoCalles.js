/**
cruvasEsquivar es un arreglo de curvas que hay que esquivar,
es decir, la que describe el centro de la ruta, y las 2 que describen los costados,
(ó sólo estas ultimas).
Deben devolver algún objeto que tenga coordenadas (propiedades x e y), en respuesta a algún t.
Se chequean 100 vecves, avanzando de a 0.01 constantemente.
*/

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

  let plazas=[];
  let manzanas =[];
  for(let x=0;x<manzanasAncho;x++){
    plazas[x]=[];
    for(let y=0;y<manzanasAlto;y++){
      plazas[x][y]=false;

      let m= new Rectangulo(tamEsq/2+x*(ladoManzana+tamEsq),tamEsq/2+y*(ladoManzana+tamEsq),ladoManzana,ladoManzana);
      m.casilleroX=x;
      m.casilleroY=y;

      manzanas.push(m);
    }
  }

  yo.manzanaEn=function(pos){
    let miPos=yo.obtenerPosicion();
    let posRelativa={
      x:pos.x-miPos[0],
      y:pos.y-miPos[1],
      z:pos.z
    }
    /*
    console.log(pos)
    console.log(miPos);
    console.log(posRelativa);
*/
    for(let m of manzanas){
      if(m.contiene(posRelativa)){
        return {hay:true,x:m.casilleroX,y:m.casilleroY};
      }
    }
    return {hay:false};
  }

 yo.generar=function(curvasEsquivar){

    function ubicarPlazas(curva){
      for(let i=0;i<1000;i++){
      //  console.log(i);
        let coords = yo.manzanaEn(curva(i/1000));
        if(coords.hay){
          plazas[coords.x][coords.y]=true;
        }
      }
    }

    for(let c of curvasEsquivar){
      ubicarPlazas(c);
    }


    function ponerEsquina(x,y){
      let e = new Objeto(mEsquina);
      e.mover(x,y,0);
      e.escalar(tamEsq,tamEsq,tamEsq);
      yo.hijos.push(e);
    }
    let retardoManzanaActual=3;
    function ponerManzana(x,y,plaza){
      let v = new ObjetoVereda(ladoManzana+0.5,0.25,0.03,gl);
      v.setPosicion(x,y,0);
      yo.hijos.push(v);

      if(!plaza){
        retardoManzanaActual+=randn_bm()*0.5+1;
        let m = new ObjetoManzanaEdificios(ladoManzana,gl,retardoManzanaActual);
        m.setPosicion(x,y,0);
        yo.hijos.push(m);
      }

      let s = new ObjetoSuperficieManzana(ladoManzana,plaza,4,gl);
      s.setPosicion(x,y,0.03);
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
        ponerManzana(tamEsq/2+x*(ladoManzana+tamEsq)+ladoManzana/2,tamEsq/2+y*(ladoManzana+tamEsq)+ladoManzana/2,plazas[x][y]);
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
  }

  return yo;
}
