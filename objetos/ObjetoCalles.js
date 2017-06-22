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
  let pilares =[];
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

  yo.getAncho=function(){
    return (ladoManzana+tamEsq)*manzanasAlto+tamEsq;
  }
  yo.getAlto=function(){
    return (ladoManzana+tamEsq)*manzanasAncho+tamEsq;
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
        return {hay:true,x:m.casilleroX,y:m.casilleroY,manzana:m};
      }
    }
    return {hay:false};
  }

  yo.sePuedePonerColumnaEn=function(x,y,radio){
    let miPosicion = yo.obtenerPosicion();
    let en =yo.manzanaEn({x:x+miPosicion[0],y:y+miPosicion[1]});

    if(!en.hay) {
      //console.log("No hay manzana en",x,y);
      return false;
    }

    let rCol=new Rectangulo(x-radio,y-radio,radio*2,radio*2);
    if(!rCol.dentroDe(en.manzana)){
      return false;
    }

    let mascara=new Rectangulo(x-radio,y-radio,2*radio,2*radio);
    for(p of pilares){
      if(p.colisiona(mascara)){
        return false;
      }
    }

    return true;
  }

 yo.generar=function(curvasEsquivar,curvaPilares, normaTangCurva){
   let colectorEdificios= new ObjetoColectorEdificios(gl);
   yo.hijos.push(colectorEdificios);

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


    let retardoManzanaActual=0.1;
    function ponerManzana(x,y,plaza){
      let v = new ObjetoVereda(ladoManzana+0.5,0.25,0.03,gl);
      v.setPosicion(x,y,0);
      yo.hijos.push(v);

      if(!plaza){
        retardoManzanaActual+=randn_bm()*1+2;
        let m = new ObjetoManzanaEdificios(ladoManzana,gl,retardoManzanaActual,colectorEdificios,x,y);
        yo.hijos.push(m);
      }

      let s = new ObjetoSuperficieManzana(ladoManzana,plaza,4,gl);
      s.setPosicion(x,y,0.03);
      yo.hijos.push(s);

      if(plaza && Math.random()<0.5){
        let obra=new ObjetoObraDeArte(gl);
        obra.setPosicion(x+Math.random()*ladoManzana-ladoManzana/2,y+Math.random()*ladoManzana-ladoManzana/2,0);
        obra.rotar([0,0,1],Math.PI*Math.random()*2)
        yo.hijos.push(obra);
      }


    }
    var distanciaDesdeUltimoPilar=0;
    function ponerPilarSiPosible(x,y,avance,distanciaMinima){
      console.log(distanciaDesdeUltimoPilar);
      if(yo.sePuedePonerColumnaEn(x,y,1) && distanciaDesdeUltimoPilar>distanciaMinima){

        pilar = new ObjetoPilar(atlasTexturas.t("concreto.jpg"),programaTextura,programaColor,gl);
        pilar.mover(x,y,0);
        pilar.escalar(0.5,0.5,0.5);
        yo.hijos.push(pilar);
        pilares.push(new Rectangulo(x-0.5,y-0.5,1,1));
        distanciaDesdeUltimoPilar=0;
      }
      distanciaDesdeUltimoPilar+=avance;
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
    var suma=0;
    for(let i=0;i<200;i++){
      suma+=normaTangCurva(i/200)*1/200;
    }
    var distanciaMinima=suma/7;
    for(let i=0;i<200;i++){
      let miPosicion = yo.obtenerPosicion();
      let p=curvaPilares(i/200);
      let avance=normaTangCurva(i/200)*1/200;
      p.x-=miPosicion[0];
      p.y-=miPosicion[1];

      ponerPilarSiPosible(p.x,p.y,avance,distanciaMinima);
    }


  }

  return yo;
}
