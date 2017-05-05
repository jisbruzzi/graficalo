function FormaEsfera(latitudeBands,longitudeBands){
  this.latitudeBands=latitudeBands;
  this.longitudeBands = longitudeBands;

  this.conTextura=function(){
    return conTextura;
  }
  this.conColor = function(){
    return conColor;
  }


  let position_buffer = [];
  let normal_buffer = [];
  let texture_coord_buffer = [];
  let color_buffer = [];


  var latNumber;
  var longNumber;

  for (latNumber=0; latNumber <= this.latitudeBands; latNumber++) {
    var theta = latNumber * Math.PI / this.latitudeBands;
    var sinTheta = Math.sin(theta);
    var cosTheta = Math.cos(theta);

    for (longNumber=0; longNumber <= this.longitudeBands; longNumber++) {
      var phi = longNumber * 2 * Math.PI / this.longitudeBands;
      var sinPhi = Math.sin(phi);
      var cosPhi = Math.cos(phi);

      var x = cosPhi * sinTheta;
      var y = cosTheta;
      var z = sinPhi * sinTheta;
      var u = 1.0 - (longNumber / this.longitudeBands);
      var v = 1.0 - (latNumber / this.latitudeBands);

      normal_buffer.push(x);
      normal_buffer.push(y);
      normal_buffer.push(z);

      texture_coord_buffer.push(u);
      texture_coord_buffer.push(v);

      position_buffer.push(x);
      position_buffer.push(y);
      position_buffer.push(z);

      color_buffer.push(x/2.0);
      color_buffer.push(y/2.0);
      color_buffer.push(z/2.0);
    }
  }


  // Buffer de indices de los triangulos
  let index_buffer = [];

  for (latNumber=0; latNumber < this.latitudeBands; latNumber++) {
    for (longNumber=0; longNumber < this.longitudeBands; longNumber++) {
      var first = (latNumber * (this.longitudeBands + 1)) + longNumber;
      var second = first + this.longitudeBands + 1;

      index_buffer.push(first);
      index_buffer.push(second);
      index_buffer.push(first + 1);

      index_buffer.push(second);
      index_buffer.push(second + 1);
      index_buffer.push(first + 1);
    }
  }
  
  
  //generar los buffers de opengl
  let webgl_normal_buffer = new GlNormalBuffer(gl).aPartirDe(normal_buffer);
  let webgl_texture_coord_buffer = new GlTextureCoordBuffer(gl).aPartirDe(texture_coord_buffer);
  let webgl_position_buffer = new GlPositionBuffer(gl).aPartirDe(position_buffer);
  let webgl_index_buffer = new GlIndexBuffer(gl).aPartirDe(index_buffer);
  let webgl_color_buffer = new GlColorBuffer(gl).aPartirDe(color_buffer);
  
  this.getNormalBuffer=function(){
	  return webgl_normal_buffer;
  }
  this.getTextureCoordBuffer=function(){
	  return webgl_texture_coord_buffer;
  }
  this.getPositionBuffer=function(){
	  return webgl_position_buffer;
  }
  this.getColorBuffer=function(){
	  return webgl_color_buffer;
  }
  this.getIndexBuffer=function(){
	  return webgl_index_buffer;
  }
  
  this.aVertexPosition=this.getPositionBuffer;
  this.aTextureCoord=this.getTextureCoordBuffer;
  this.aVertexNormal=this.getNormalBuffer;
  this.aVertexColor=this.getColorBuffer;
  
  this.normal_buffer=normal_buffer;
  this.texture_coord_buffer=texture_coord_buffer;
  this.position_buffer=position_buffer;
  this.index_buffer=index_buffer;
  this.color_buffer=color_buffer;
}