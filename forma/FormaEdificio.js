function FormaEdificio(gl){
  let normal_buffer=[];
  let texture_coord_buffer=[];
  let position_buffer=[];
  let index_buffer=[];
  let color_buffer=[];

  function agregarPunto(x,y,h){
    let pos=position_buffer.length/3;
    position_buffer=position_buffer.concat([x-0.5,y-0.5,h]);
    texture_coord_buffer=texture_coord_buffer.concat([x,h]);
    color_buffer=color_buffer.concat([0.2,0.2,0.2]);
    return function(x,y,z){//por qué no?
      normal_buffer=normal_buffer.concat([x,y,z]);
      return pos;
    };
  }

  //frente interesante
  let abi=agregarPunto(0,0,0)(0,-1,0);
  let abd=agregarPunto(1,0,0)(0,-1,0);
  let ari=agregarPunto(0,0,1)(0,-1,0);
  let ard=agregarPunto(1,0,1)(0,-1,0);
  index_buffer=index_buffer.concat([abi,ari,ard]);
  index_buffer=index_buffer.concat([ard,abd,abi]);

  //atrás interesante ponele
   abi=agregarPunto(0,1,0)(0,1,0);
   abd=agregarPunto(1,1,0)(0,1,0);
   ari=agregarPunto(0,1,1)(0,1,0);
   ard=agregarPunto(1,1,1)(0,1,0);
  index_buffer=index_buffer.concat([abi,ari,ard]);
  index_buffer=index_buffer.concat([ard,abd,abi]);

  //izquierda
  abi=agregarPunto(1,0,0)(1,0,0);
  abd=agregarPunto(1,1,0)(1,0,0);
  ari=agregarPunto(1,0,1)(1,0,0);
  ard=agregarPunto(1,1,1)(1,0,0);
  index_buffer=index_buffer.concat([abi,ari,ard]);
  index_buffer=index_buffer.concat([ard,abd,abi]);

  //izquierda
  abi=agregarPunto(0,0,0)(-1,0,0);
  abd=agregarPunto(0,1,0)(-1,0,0);
  ari=agregarPunto(0,0,1)(-1,0,0);
  ard=agregarPunto(0,1,1)(-1,0,0);
  index_buffer=index_buffer.concat([abi,ari,ard]);
  index_buffer=index_buffer.concat([ard,abd,abi]);

  //izquierda
  abi=agregarPunto(0,0,1)(0,0,1);
  abd=agregarPunto(1,0,1)(0,0,1);
  ari=agregarPunto(0,1,1)(0,0,1);
  ard=agregarPunto(1,1,1)(0,0,1);
  index_buffer=index_buffer.concat([abi,ari,ard]);
  index_buffer=index_buffer.concat([ard,abd,abi]);

  //hacer copia con varias texturas
  this.hacerCopiaConTexturas=function(base,sobre){
    let copia=jQuery.extend({},this);
    copia.uSamplerBase=getter(base);

    copia.uSamplerSobre=getter(sobre);
    return copia;
  }






  //generar los buffers de opengl
  let webgl_normal_buffer = new GlNormalBuffer(gl).aPartirDe(normal_buffer);
  let webgl_texture_coord_buffer = new GlTextureCoordBuffer(gl).aPartirDe(texture_coord_buffer);
  let webgl_position_buffer = new GlPositionBuffer(gl).aPartirDe(position_buffer);
  let webgl_index_buffer = new GlIndexBuffer(gl).aPartirDe(index_buffer);
  let webgl_color_buffer = new GlColorBuffer(gl).aPartirDe(color_buffer);

  let getNormalBuffer=getter(webgl_normal_buffer);
  let getTextureCoordBuffer=getter(webgl_texture_coord_buffer);
  let getPositionBuffer=getter(webgl_position_buffer);
  let getColorBuffer=getter(webgl_color_buffer);


  //-- inrterfaz opcional según el shader --//
  this.aVertexPosition=getter(webgl_position_buffer);
  this.aTextureCoord  =getter(webgl_texture_coord_buffer);
  this.aVertexNormal  =getter(webgl_normal_buffer);
  this.aVertexColor   =getter(webgl_color_buffer);

  //-- interfaz obligatoria --//
  this.copiaConTextura=hacerMetodoCopiaConTextura(this);
  this.getIndexBuffer =getter(webgl_index_buffer);
  this.modoDibujado = getter(gl.TRIANGLES);
  //this.esIluminado=getter(false);
}
