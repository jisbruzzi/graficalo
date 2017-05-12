function FormaCuadricula(ancho,alto,gl){
  let posBuffer = [];
  let colBuffer = [];
  let normBuffer =[];
  let indexBuffer = [];

  function agregarLinea(f1,c1,f2,c2){
    //posiciones
    posBuffer.push(f1);
    posBuffer.push(c1);
    posBuffer.push(0);
    posBuffer.push(f2);
    posBuffer.push(c2);
    posBuffer.push(0);
    //colores
    colBuffer.push(1);
    colBuffer.push(1);
    colBuffer.push(1);
    colBuffer.push(1);
    colBuffer.push(1);
    colBuffer.push(1);
    //normales
    normBuffer.push(0);
    normBuffer.push(0);
    normBuffer.push(1);
    normBuffer.push(0);
    normBuffer.push(0);
    normBuffer.push(1);
    //indices
    indexBuffer.push(indexBuffer.length);
    indexBuffer.push(indexBuffer.length);

  }

/*
  for(let f=0;f<ancho+1;f++){
    for (let c=0; c<alto+1; c++){
      posBuffer.push(f);
      posBuffer.push(c);
      posBuffer.push(0);

      colBuffer.push(1);
      colBuffer.push(1);
      colBuffer.push(1);

      normBuffer.push(0);
      normBuffer.push(0);
      normBuffer.push(1);
    }
  }



  //líneas verticales ES MALO PERO ES
  for(let f=0;f<ancho+1;f++){
    for (let c=0; c<alto; c++){
      indexBuffer.push(f*(ancho+1)+c);
      indexBuffer.push(f*(ancho+1)+c+1);
    }
  }
  //líneas horizontales
  for (let c=0; c<alto+1; c++){
    for(let f=0; f<ancho; f++){
      indexBuffer.push(f*(ancho+1)+c);
      indexBuffer.push(f*(ancho+1+1)+c);
    }
  }
*/

  //líneas verticales ES MALO PERO ES
  for(let f=0;f<ancho+1;f++){
    agregarLinea(f,0,f,alto);
  }
  //líneas horizontales
  for (let c=0; c<alto+1; c++){
    agregarLinea(0,c,ancho,c);
  }



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
  this.modoDibujado = getter(gl.LINES);
  this.esIluminado=getter(false);
}
