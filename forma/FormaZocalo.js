function FormaZocalo(ladoManzana,radioBorde,gl,color){
  anchoVereda=radioBorde;
  let profundidad=1;
  let posBuffer = [];
  let colBuffer = [];
  let normBuffer =[];
  let indexBuffer = [];
  let coordCentro=ladoManzana/2-radioBorde;//los centros de las curvas están en (coordCentro,coordCentro) y negarlas de a una o de a dos

  function puntoNormalArriba(x,y,z){
    //posicion;
    posBuffer.push(x);
    posBuffer.push(y);
    posBuffer.push(z);

    //color
    colBuffer=colBuffer.concat(color);

    //normal
    normBuffer.push(0);
    normBuffer.push(0);
    normBuffer.push(1);
  }

  function insertarPuntoNormal(x,y,z){
    //posicion;
    posBuffer=posBuffer.concat([x,y,z]);

    //color
    colBuffer=colBuffer.concat(color);

    //normal
    return function(xn,yn){
      normBuffer=normBuffer.concat([xn,yn,0]);
    }
  }



  function curvaNoventa(offx,offy,offAngulo){
    let eje = posBuffer.length/3;


    let inicio = posBuffer.length/3;
    recorridoCurvoNoventa(offx,offy,offAngulo,radioBorde,function(x,y){
      puntoNormalArriba(x,y,profundidad);
    });


    for(let i=0; i<10;i++){
      indexBuffer.push(eje);
      indexBuffer.push(inicio+i);
      indexBuffer.push(inicio+i+1);
    }
  }

  function bordeCurvaNoventa(offx,offy,offAngulo){
    let prev=null;
    recorridoCurvoNoventa(offx,offy,offAngulo,radioBorde,function(x,y,ang){
      if(prev!=null){
        let angDef = ang+offAngulo;
        while(angDef>=2*Math.PI){
          angDef-=2*Math.PI;
        }
        rectanguloV(x,y,prev.x,prev.y)(Math.cos(angDef),Math.sin(angDef));
      }
      prev={};
      prev.x=x;
      prev.y=y;
    })
  }

  function rectanguloV(x1,y1,x2,y2){
    return function(xn,yn){
      rectangulo(posBuffer.length/3,indexBuffer,function(h,d){
        let x=x1+(x2-x1)*d;
        let y=y1+(y2-y1)*d;
        insertarPuntoNormal(x,y,h*profundidad)(xn,yn);
      });
    };
  }



  function esquina(offx,offy,offAngulo){
    bordeCurvaNoventa(offx,offy,offAngulo);
  }

  //esquinas
  esquina( coordCentro, coordCentro,0          );
  esquina(-coordCentro, coordCentro,Math.PI/2  ,0,0);
  esquina(-coordCentro,-coordCentro,Math.PI    ,0,0);
  esquina( coordCentro,-coordCentro,Math.PI*3/2,0,0);


  //rectas para arriba
  //(derecha)
  let dBordeInterior=ladoManzana/2-anchoVereda;
  let dBordeExterior=ladoManzana/2

  //rectangulos interiores
  rectanguloV( dBordeInterior,-dBordeInterior, dBordeInterior, dBordeInterior)(-1, 0);
  rectanguloV(-dBordeInterior,-dBordeInterior,-dBordeInterior, dBordeInterior)( 1, 0);
  rectanguloV(-dBordeInterior,-dBordeInterior, dBordeInterior,-dBordeInterior)( 0, 1);
  rectanguloV(-dBordeInterior, dBordeInterior, dBordeInterior, dBordeInterior)( 0,-1);

  //rectangulos exteriores
  let finCurva = ladoManzana/2-radioBorde;
  rectanguloV( dBordeExterior,-finCurva, dBordeExterior,finCurva)( 1, 0);
  rectanguloV(-dBordeExterior,-finCurva,-dBordeExterior,finCurva)(-1, 0);

  rectanguloV(finCurva, dBordeExterior,-finCurva, dBordeExterior)(0, 1);
  rectanguloV(finCurva,-dBordeExterior,-finCurva,-dBordeExterior)(0,-1);


//INTERFAZ
  this.normal_buffer=normBuffer;
	this.position_buffer=posBuffer;
	this.index_buffer=indexBuffer;
	this.color_buffer=colBuffer;

  this.modoDibujado = getter(gl.TRIANGLES);
  this.esIluminado=getter(true);



}
