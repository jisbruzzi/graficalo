function hacerMetodoCopiaConTextura(deQuien){
  return function(textura){
    let copia=jQuery.extend({},deQuien);
    copia.obtenerTextura = function(){
      return textura;
    }
    return copia;
  }
}
function getter(que){
  return function(){
    return que;
  }
}
/**
HAY POCA INTERFAZ, QUE ESTÁ ABAJO DE POCO.
EL COMPORTAMIENTO COMÚN A TODAS LAS FORMAS
ES MUY POCO ENTONCES NO PENSÉ MUCHO CÓMO EXTRAERLO
**/
function FormaEsfera(latitudeBands,longitudeBands,gl){


  this.latitudeBands=latitudeBands;
  this.longitudeBands = longitudeBands;

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
}
