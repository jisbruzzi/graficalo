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


  let webgl_normal_buffer = new GlNormalBuffer(gl).aPartirDe(normal_buffer);
  let webgl_texture_coord_buffer = new GlTextureCoordBuffer(gl).aPartirDe(texture_coord_buffer);
  let webgl_position_buffer = new GlPositionBuffer(gl).aPartirDe(position_buffer);
  let webgl_index_buffer = new GlIndexBuffer(gl).aPartirDe(index_buffer);
  let webgl_color_buffer = new GlColorBuffer(gl).aPartirDe(color_buffer);

  this.aVertexPosition=getter(webgl_position_buffer);
  this.aTextureCoord  =getter(webgl_texture_coord_buffer);
  this.aVertexNormal  =getter(webgl_normal_buffer);
  this.aVertexColor   =getter(webgl_color_buffer);

  this.copiaConTextura=hacerMetodoCopiaConTextura(this);
  this.getIndexBuffer =getter(webgl_index_buffer);
  this.modoDibujado = getter(gl.TRIANGLES);

  this.esIluminado=getter(true);
}
