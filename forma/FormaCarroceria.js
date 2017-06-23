function FormaCarroceria(gl){
  let largoCoche=5;
  let anchoCoche=2.5;
  let anchoTecho=anchoCoche/2;
  let largoTecho=largoCoche/2;
  let largoTechoSup=largoTecho/2;
  //let colBuffer=[];
  let indexBuffer=[];
  let altoCoche=1.5;
  let altoTecho=0.75;
                              //cubo inferior visto desde el frente
  //costado izquierdo
  let posBuffer=[-largoCoche/2,-anchoCoche/2,altoCoche-altoTecho,-largoCoche/2,-anchoCoche/2,0,  largoCoche/2,-anchoCoche/2,altoCoche-altoTecho,largoCoche/2,-anchoCoche/2,0,
  //frente
    largoCoche/2,-anchoCoche/2,altoCoche-altoTecho,largoCoche/2,-anchoCoche/2,0, largoCoche/2,anchoCoche/2,altoCoche-altoTecho,largoCoche/2,anchoCoche/2,0,
  //costado derecho
    largoCoche/2,anchoCoche/2,altoCoche-altoTecho,largoCoche/2,anchoCoche/2,0,  -largoCoche/2,anchoCoche/2,altoCoche-altoTecho,-largoCoche/2,anchoCoche/2,0,
  //parte trasera
    -largoCoche/2,anchoCoche/2,altoCoche-altoTecho,-largoCoche/2,anchoCoche/2,0,  -largoCoche/2,-anchoCoche/2,altoCoche-altoTecho,-largoCoche/2,-anchoCoche/2,0,


  //"baul"
    -largoCoche/2,-anchoCoche/2,altoCoche-altoTecho,-largoCoche/2,anchoCoche/2,altoCoche-altoTecho, -largoTecho/2,-anchoCoche/2,altoCoche-altoTecho,-largoTecho/2,anchoCoche/2,altoCoche-altoTecho,


  //luneta
    -largoTecho/2,-anchoCoche/2,altoCoche-altoTecho,-largoTecho/2,anchoCoche/2,altoCoche-altoTecho,  -largoTechoSup/2,-anchoTecho/2,altoCoche,-largoTechoSup/2,anchoTecho/2,altoCoche,


  //techo parte sup
  -largoTechoSup/2,-anchoTecho/2,altoCoche,-largoTechoSup/2,anchoTecho/2,altoCoche,   largoTechoSup/2,-anchoTecho/2,altoCoche,largoTechoSup/2,anchoTecho/2,altoCoche,

  //parabrisa

  largoTechoSup/2,-anchoTecho/2,altoCoche,largoTechoSup/2,anchoTecho/2,altoCoche,   largoTecho/2,-anchoCoche/2,altoCoche-altoTecho,largoTecho/2,anchoCoche/2,altoCoche-altoTecho,

  //"capot"
  largoTecho/2,-anchoCoche/2,altoCoche-altoTecho,largoTecho/2,anchoCoche/2,altoCoche-altoTecho,     largoCoche/2,-anchoCoche/2,altoCoche-altoTecho,largoCoche/2,anchoCoche/2,altoCoche-altoTecho,

  //ventanilla der
  largoTecho/2,anchoCoche/2,altoCoche-altoTecho,-largoTecho/2,anchoCoche/2,altoCoche-altoTecho,     largoTechoSup/2,anchoTecho/2,altoCoche,-largoTechoSup/2,anchoTecho/2,altoCoche,
  //ventanilla izq
  -largoTechoSup/2,-anchoTecho/2,altoCoche,largoTechoSup/2,-anchoTecho/2,altoCoche,                   -largoTecho/2,-anchoCoche/2,altoCoche-altoTecho,largoTecho/2,-anchoCoche/2,altoCoche-altoTecho
  ];
  //aca se da en coordenadas como las da gimp, despues normalizo
  
  let texture_coord_buffer=[
  //costado izquierdo
  137,661, 137,795, 857,661, 857,795,
  //frente
  912,547, 994,547, 912,333, 994,333,
  //costado derecho
  857,661, 857,795, 137,661, 136,795,
  //parte trasera
  112,333, 28,333, 112,547, 28,547, 
  //baul
  112,547, 112,333, 231,547, 231,333,
  //luneta
  231,547, 231,333, 400,547,400,333,
  //techo parte sup
  400,547,400,333, 605,547, 605,333,
  //parabrisa
  605,547,  605,333, 775,547, 775,333,
  //capot
   775,547, 775,333, 912,547,  912,333,
  //ventanilla der

  677,661, 317,661, 587,547, 407,547,
  //698,661, 338,661,  608,547, 428,547, 
  //0,661,  686,661, 400,547, 610,547, 
  //400,547, 605,547, 331,661,  672,661,
  //ventanilla izq
  407,547, 587,547, 317,661, 677,661
  //414,547, 598,547, 321,661,  681,661
  //400,547, 605,547, 331,661,  672,661
  ];//normalizo
  for( var i=0;i+1<texture_coord_buffer.length;i+=2){
    texture_coord_buffer[i]/=1024;
    texture_coord_buffer[i+1]/=1024;
    texture_coord_buffer[i+1]=1-texture_coord_buffer[i+1];
  }

  var difAltura=(altoCoche-altoTecho);
  var difX=(largoTecho-largoTechoSup)/2;
  var difY=(anchoCoche-anchoTecho)/2;
                //              cost izq                      frente                  derecho                          trasero
  let normBuffer=[0,-1,0, 0,-1,0,0,-1,0, 0,-1,0,     1,0,0,1,0,0,1,0,0,1,0,0,   0,1,0,0,1,0,0,1,0,0,1,0,   -1,0,0,-1,0,0,-1,0,0,-1,0,0,-1,0,0,

//         baul               luneta                                                                           techoSup                              parabrisa                                                                           capot
  0,0,1,0,0,1,0,0,1,0,0,1,    -difAltura,0,difX,-difAltura,0,difX,-difAltura,0,difX,-difAltura,0,difX,         0,0,1,0,0,1,0,0,1,0,0,1,              difAltura,0,difX,difAltura,0,difX,difAltura,0,difX,difAltura,0,difX,               0,0,1,0,0,1,0,0,1,0,0,1,

//     ventanilla derecha                                                    ventanilla izquierda
    0,difAltura,difY,0,difAltura,difY,0,difAltura,difY,0,difAltura,difY,     0,-difAltura,difY, 0,-difAltura,difY,0,-difAltura,difY,0,-difAltura,difY
  ];


  let tangent_buffer=[
  //cost izq                frente                       derecho                    trasero
  1,0,0,1,0,0,1,0,0,1,0,0,  0,0,1,0,0,1,0,0,1,0,0,1, 1,0,0,1,0,0,1,0,0,1,0,0,   0,0,-1,0,0,-1,0,0,-1,0,0,-1,    
  //baul                    luneta                                                                        techoSup                   parabrisa                                                                capot                                       
  1,0,0,1,0,0,1,0,0,1,0,0,  difX,0,difAltura,difX,0,difAltura,difX,0,difAltura,difX,0,difAltura,          1,0,0,1,0,0,1,0,0,1,0,0,   difX,0,-difAltura,difX,0,-difAltura,difX,0,-difAltura,difX,0,-difAltura, 1,0,0,1,0,0,1,0,0,1,0,0,

  //ventanilla der          ventanilla izq
  1,0,0,1,0,0,1,0,0,1,0,0, 1,0,0,1,0,0,1,0,0,1,0,0
  ];
  //normalizo ambos y de paso agrego el binormal
  let binormal_buffer=new Array();
  for( var i=0;i+2<normBuffer.length;i+=3){
    var norma=Math.sqrt(normBuffer[i]*normBuffer[i]+normBuffer[i+1]*normBuffer[i+1]+normBuffer[i+2]*normBuffer[i+2]);
    normBuffer[i]/=norma;
    normBuffer[i+1]/=norma;
    normBuffer[i+2]/=norma;

    norma=Math.sqrt(tangent_buffer[i]*tangent_buffer[i]+tangent_buffer[i+1]*tangent_buffer[i+1]+tangent_buffer[i+2]*tangent_buffer[i+2]);
    tangent_buffer[i]/=norma;
    tangent_buffer[i+1]/=norma;
    tangent_buffer[i+2]/=norma;

    binormal_buffer.push(-(normBuffer[i+1]*tangent_buffer[i+2]-normBuffer[i+2]*tangent_buffer[i+1]));
    binormal_buffer.push(-(normBuffer[i+2]*tangent_buffer[i]-normBuffer[i]*tangent_buffer[i+2]));
    binormal_buffer.push(-(normBuffer[i+0]*tangent_buffer[i+1]-normBuffer[i+1]*tangent_buffer[i+0]));



  }

  let t=binormal_buffer;
  //binormal_buffer=tangent_buffer;
  //tangent_buffer=t;
  //console.log(binormal_buffer);
  //console.log(tangent_buffer);

  //manera rara de dibujar
  var offset=0;
  //cubo inferior
  for(var i=0;i<16;i++){
    indexBuffer.push(i);
  }

  //tira baul,luneta,techoSup,parabrisa,baul
  indexBuffer.push(14+offset);
  indexBuffer.push(14+offset);
  indexBuffer.push(14+offset);
  offset=16;
  for(var i=0;i<20;i++){
    indexBuffer.push(i+offset);
  }

  //ventanilla der
  indexBuffer.push(35);
  indexBuffer.push(35);
  offset=36;
  for(var i=0;i<4;i++)
    indexBuffer.push(i+offset);


  //ventanilla izq

  indexBuffer.push(39);
  indexBuffer.push(39);
  indexBuffer.push(40);
  indexBuffer.push(40);
  offset=40;
  for(var i=0;i<4;i++)
    indexBuffer.push(offset+i);

  //ventanilla izq


/*
  for(var i=0;i<posBuffer.length;i+=3){
    colBuffer.push(1);colBuffer.push(0);colBuffer.push(0);

  }
  //al parabrisa le pongo color especial
  for(var i=28*3;i<32*3;i+=3){
    colBuffer[i]=(0.85);colBuffer[i+1]=(1);colBuffer[i+2]=(1);
  }

  //igual a la luneta, le pongo polarizado
  for(var i=20*3;i<24*3;i+=3){
  //  colBuffer[i]=(0.1);colBuffer[i+1]=(0.3);colBuffer[i+2]=(0.3);
  }
*/

//INTERFAZ
  this.normal_buffer=normBuffer;
	this.position_buffer=posBuffer;
	this.index_buffer=indexBuffer;
//	this.color_buffer=colBuffer;
  this.tangent_buffer=tangent_buffer;
  this.binormal_buffer=binormal_buffer;
  this.texture_coord_buffer=texture_coord_buffer;


  this.copiaConTextura=hacerMetodoCopiaConTextura(this,gl);
  this.modoDibujado = getter(gl.TRIANGLE_STRIP);
  this.esIluminado=getter(true);
  this.nombre="carroceria";


}
