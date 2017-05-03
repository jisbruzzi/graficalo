function FormaEsfera(latitudeBands,longitudeBands){
  this.latitudeBands=latitudeBands;
  this.longitudeBands = longitudeBands;

  this.conTextura=function(){
    return conTextura;
  }
  this.conColor = function(){
    return conColor;
  }


  this.position_buffer = [];
  this.normal_buffer = [];
  this.texture_coord_buffer = [];
  this.color_buffer = [];


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

      this.normal_buffer.push(x);
      this.normal_buffer.push(y);
      this.normal_buffer.push(z);

      this.texture_coord_buffer.push(u);
      this.texture_coord_buffer.push(v);

      this.position_buffer.push(x);
      this.position_buffer.push(y);
      this.position_buffer.push(z);

      this.color_buffer.push(x/2.0);
      this.color_buffer.push(y/2.0);
      this.color_buffer.push(z/2.0);
    }
  }


  // Buffer de indices de los triangulos
  this.index_buffer = [];

  for (latNumber=0; latNumber < this.latitudeBands; latNumber++) {
    for (longNumber=0; longNumber < this.longitudeBands; longNumber++) {
      var first = (latNumber * (this.longitudeBands + 1)) + longNumber;
      var second = first + this.longitudeBands + 1;

      this.index_buffer.push(first);
      this.index_buffer.push(second);
      this.index_buffer.push(first + 1);

      this.index_buffer.push(second);
      this.index_buffer.push(second + 1);
      this.index_buffer.push(first + 1);
    }
  }
}