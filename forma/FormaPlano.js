function FormaPlano(ancho,alto,gl){
  //las 4 puntas (recorridas en forma de círculo)
  let position_buffer = [
    -ancho/2,-alto/2,0,
     ancho/2,-alto/2,0,
     ancho/2, alto/2,0,
    -ancho/2, alto/2,0
  ];
  let normal_buffer = [
    0,0,1,
    0,0,1,
    0,0,1,
    0,0,1
  ];
  let texture_coord_buffer = [
    0,0,
    ancho,0,
    ancho,alto,
    0,alto
  ];
  let color_buffer = [
    0,0,0,
    0,0,0,
    0,0,0,
    0,0,0
  ];

  let index_buffer =[0,1,2,2,3,0];


  //INTERFAZ
  this.normal_buffer=normal_buffer;
	this.texture_coord_buffer=texture_coord_buffer;
	this.position_buffer=position_buffer;
	this.index_buffer=index_buffer;
	this.color_buffer=color_buffer;

  this.copiaConTextura=hacerMetodoCopiaConTextura(this);
  this.modoDibujado = getter(gl.TRIANGLES);

  this.esIluminado=getter(true);
}
