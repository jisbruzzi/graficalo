function recorridoCurvoNoventa(offx,offy,offAngulo,radio,llamar){

  for (let i=0; i<=10;i++){
    let ang =Math.PI/2*i/10;
    let c=Math.cos(ang+offAngulo);
    let s=Math.sin(ang+offAngulo);

    //posicion;
    llamar(offx+c*radio,offy+s*radio,ang);
  }

}

function rectangulo(verticesHastaAHora,indexBuffer,llama){

  let inicio=verticesHastaAHora;//posBuffer.length/3;
  /*
  puntoNormalArriba(xm,ym,0);//0
  puntoNormalArriba(xM,ym,0);//1
  puntoNormalArriba(xM,yM,0);//2
  puntoNormalArriba(xm,yM,0);//3
  */

  llama(0,0);//0
  llama(1,0);//1
  llama(1,1);//2
  llama(0,1);//3

  indexBuffer.push(inicio+0);
  indexBuffer.push(inicio+1);
  indexBuffer.push(inicio+2);

  indexBuffer.push(inicio+2);
  indexBuffer.push(inicio+3);
  indexBuffer.push(inicio+0);
}


function FormaVereda(ladoManzana,anchoVereda,radioBorde,gl){
  anchoVereda=radioBorde;
  let profundidad=0;
  let posBuffer = [];
  let colBuffer = [];
  let normBuffer =[];
  let indexBuffer = [];
  let tcBuffer = [];

  let coordCentro=ladoManzana/2-radioBorde;//los centros de las curvas están en (coordCentro,coordCentro) y negarlas de a una o de a dos

  function puntoNormalArriba(x,y,z){
    //posicion;
    posBuffer.push(x);
    posBuffer.push(y);
    posBuffer.push(z);

    //color
    colBuffer.push(1);
    colBuffer.push(1);
    colBuffer.push(1);

    //normal
    normBuffer.push(0);
    normBuffer.push(0);
    normBuffer.push(1);
  }

  function uv(u,v){
    tcBuffer.push(u);
    tcBuffer.push(v);
  }



  function curvaNoventa(offx,offy,offAngulo){
    let ini = posBuffer.length/3
    let inicio = posBuffer.length/3;
    let prev=null;
    recorridoCurvoNoventa(offx,offy,offAngulo,radioBorde,function(x,y,ang){
      puntoNormalArriba(offx,offy,profundidad);
      uv(0,ang/(Math.PI/2));
      puntoNormalArriba(x,y,profundidad);
      uv(1,ang/(Math.PI/2));
    });

    for(let i=0; i<10;i++){
      indexBuffer.push(ini+i*2+0);
      indexBuffer.push(ini+i*2+1);
      indexBuffer.push(ini+i*2+2);

      indexBuffer.push(ini+i*2+3);
      indexBuffer.push(ini+i*2+1);
      indexBuffer.push(ini+i*2+2);
    }
  }

  function rectanguloZ(x1,y1,x2,y2,dv){
    rectangulo(posBuffer.length/3,indexBuffer,function(x,y){
      if(Math.abs(x1-x2)>Math.abs(y2-y1)){
        let corta=Math.abs(y2-y1);
        uv(y,x*(x2-x1)/Math.abs(y2-y1));
      }else{
        uv(x,y*(y2-y1)/Math.abs(x2-x1));
      }
      x=x1+(x2-x1)*x;
      y=y1+(y2-y1)*y;
      puntoNormalArriba(x,y,profundidad);
    });
  }



  function esquina(offx,offy,offAngulo){
    curvaNoventa(offx,offy,offAngulo,profundidad);

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

  rectanguloZ( dBordeInterior,dBordeInterior, dBordeExterior,-dBordeInterior);
  rectanguloZ(-dBordeInterior,dBordeInterior,-dBordeExterior,-dBordeInterior);
  rectanguloZ( dBordeInterior, dBordeInterior,-dBordeInterior, dBordeExterior);
  rectanguloZ( dBordeInterior,-dBordeInterior,-dBordeInterior,-dBordeExterior);


/*
  console.log(tcBuffer);
  console.log(posBuffer);
  console.log(indexBuffer);
*/

  this.normal_buffer=normBuffer;
	this.texture_coord_buffer=tcBuffer;
	this.position_buffer=posBuffer;
	this.index_buffer=indexBuffer;
	this.color_buffer=colBuffer;

  //generar los buffers de opengl
  let webgl_normal_buffer = new GlNormalBuffer(gl).aPartirDe(normBuffer);
  let webgl_position_buffer = new GlPositionBuffer(gl).aPartirDe(posBuffer);
  let webgl_index_buffer = new GlIndexBuffer(gl).aPartirDe(indexBuffer);
  let webgl_color_buffer = new GlColorBuffer(gl).aPartirDe(colBuffer);
  let webgl_texture_coord_buffer = new GlTextureCoordBuffer(gl).aPartirDe(tcBuffer);

  let getNormalBuffer=getter(webgl_normal_buffer);
  let getPositionBuffer=getter(webgl_position_buffer);
  let getColorBuffer=getter(webgl_color_buffer);


  //-- inrterfaz opcional según el shader --//
  this.aVertexPosition=getter(webgl_position_buffer);
  this.aVertexNormal  =getter(webgl_normal_buffer);
  this.aVertexColor   =getter(webgl_color_buffer);
  this.aTextureCoord  =getter(webgl_texture_coord_buffer);

  //-- interfaz obligatoria --//
  this.copiaConTextura=hacerMetodoCopiaConTextura(this,gl);
  this.getIndexBuffer =getter(webgl_index_buffer);
  this.modoDibujado = getter(gl.TRIANGLES);
  this.esIluminado=getter(true);
   



}
