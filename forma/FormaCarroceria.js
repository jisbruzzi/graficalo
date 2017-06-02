function FormaCarroceria(gl){//los colores se deben pasar por caras, siendo 0 YZ,1XZ,2XY,3YZop,4XZop,5XYop
  let largoCoche=5;
  let anchoCoche=2.5;
  let anchoTecho=anchoCoche/2;
  let largoTecho=largoCoche/2;
  let largoTechoSup=largoTecho/2;
  let colBuffer=[];
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

  var raiz=Math.sqrt(2);//las normales que tienen raiz por ahora son aproximadas

                //              cost izq                      frente                  derecho                          trasero
  let normBuffer=[0,-1,0, 0,-1,0,0,-1,0, 0,-1,0,     1,0,0,1,0,0,1,0,0,1,0,0,   0,1,0,0,1,0,0,1,0,0,1,0,   0,-1,0,0,-1,0,0,-1,0,0,-1,0,0,-1,0,

//         baul               luneta                                                       techoSup                              parabrisa                                                                capot 
  0,0,1,0,0,1,0,0,1,0,0,1,    -raiz,0,raiz,-raiz,0,raiz,-raiz,0,raiz,-raiz,0,raiz,         0,0,1,0,0,1,0,0,1,0,0,1,              raiz,0,raiz,raiz,0,raiz,raiz,0,raiz,raiz,0,raiz,               0,0,1,0,0,1,0,0,1,0,0,1,

//     ventanilla derecha                               ventanilla izquierda
    0,raiz,raiz,0,raiz,raiz,0,raiz,raiz,0,raiz,raiz,   0,-raiz,raiz, 0,-raiz,raiz, 0,-raiz,raiz, 0,-raiz,raiz
  ];




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


//INTERFAZ
  this.normal_buffer=normBuffer;
	this.position_buffer=posBuffer;
	this.index_buffer=indexBuffer;
	this.color_buffer=colBuffer;

  this.modoDibujado = getter(gl.TRIANGLE_STRIP);
  this.esIluminado=getter(true);



}