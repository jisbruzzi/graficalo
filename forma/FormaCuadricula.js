function FormaCuadricula(ancho,alto,gl,color){
  let posBuffer = [];
  let colBuffer = [];
  let normBuffer =[];
  let indexBuffer = [];

  if (color==null){
    color=[1,1,1];
  }

  function agregarLinea(f1,c1,f2,c2){
    //posiciones
    posBuffer.push(f1-ancho/2);
    posBuffer.push(c1-alto/2);
    posBuffer.push(0);
    posBuffer.push(f2-ancho/2);
    posBuffer.push(c2-alto/2);
    posBuffer.push(0);
    //colores
    colBuffer.push(color[0]);
    colBuffer.push(color[1]);
    colBuffer.push(color[2]);
    colBuffer.push(color[0]);
    colBuffer.push(color[1]);
    colBuffer.push(color[2]);
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


  //INTERFAZ
  this.normal_buffer=normBuffer;
	this.position_buffer=posBuffer;
	this.index_buffer=indexBuffer;
	this.color_buffer=colBuffer;
  //-- interfaz obligatoria --//
  //this.copiaConTextura=hacerMetodoCopiaConTextura(this,gl);
  this.modoDibujado = getter(gl.LINES);
  this.esIluminado=getter(false);
  this.nombre="cuadricula";

}
