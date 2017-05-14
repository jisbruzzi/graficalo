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
    /*
    colBuffer.push(1);
    colBuffer.push(1);
    colBuffer.push(1);
    */
    colBuffer=colBuffer.concat(color);

    //normal
    normBuffer.push(0);
    normBuffer.push(0);
    normBuffer.push(1);
  }



  function curvaNoventa(offx,offy,offAngulo){
    let eje = posBuffer.length/3;

    puntoNormalArriba(offx,offy,profundidad);


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
    recorridoCurvoNoventa(offx,offy,offAngulo,radioBorde,function(x,y){
      if(prev!=null){
        rectanguloV(x,y,prev.x,prev.y);
      }
      prev={};
      prev.x=x;
      prev.y=y;
    })
  }

  function rectanguloV(x1,y1,x2,y2){
    rectangulo(posBuffer.length/3,indexBuffer,function(h,d){
      let x=x1+(x2-x1)*d;
      let y=y1+(y2-y1)*d;
      puntoNormalArriba(x,y,h*profundidad);
    });
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
  rectanguloV( dBordeInterior,-dBordeInterior, dBordeInterior,dBordeInterior);
  rectanguloV(-dBordeInterior,-dBordeInterior,-dBordeInterior,dBordeInterior);
  rectanguloV(-dBordeInterior,-dBordeInterior, dBordeInterior,-dBordeInterior);
  rectanguloV(-dBordeInterior, dBordeInterior, dBordeInterior, dBordeInterior);

  //rectangulos exteriores
  let finCurva = ladoManzana/2-radioBorde;
  rectanguloV( dBordeExterior,-finCurva, dBordeExterior,finCurva);
  rectanguloV(-dBordeExterior,-finCurva,-dBordeExterior,finCurva);

  rectanguloV(finCurva, dBordeExterior,-finCurva, dBordeExterior);
  rectanguloV(finCurva,-dBordeExterior,-finCurva,-dBordeExterior);

  //generar los buffers de opengl
  let webgl_normal_buffer = new GlNormalBuffer(gl).aPartirDe(normBuffer);
  let webgl_position_buffer = new GlPositionBuffer(gl).aPartirDe(posBuffer);
  let webgl_index_buffer = new GlIndexBuffer(gl).aPartirDe(indexBuffer);
  let webgl_color_buffer = new GlColorBuffer(gl).aPartirDe(colBuffer);

  let getNormalBuffer=getter(webgl_normal_buffer);
  let getPositionBuffer=getter(webgl_position_buffer);
  let getColorBuffer=getter(webgl_color_buffer);


  //-- inrterfaz opcional según el shader --//
  this.aVertexPosition=getter(webgl_position_buffer);
  this.aVertexNormal  =getter(webgl_normal_buffer);
  this.aVertexColor   =getter(webgl_color_buffer);

  //-- interfaz obligatoria --//
  //this.copiaConTextura=hacerMetodoCopiaConTextura(this);
  this.getIndexBuffer =getter(webgl_index_buffer);
  this.modoDibujado = getter(gl.TRIANGLES);
  this.esIluminado=getter(false);



}
