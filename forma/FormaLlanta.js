function FormaLlanta(gl){//los colores se deben pasar por caras, siendo 0 YZ,1XZ,2XY,3YZop,4XZop,5XYop
	let radio=1;
  let cantidadPuntos=30;
  let posBuffer = [0,0,0];
  let normBuffer = [1,0,0];
  let text_coordinate = [0.5,0.5];
  let indexBuffer = [0];
  let largoBuffers=posBuffer.length;
  for(var i=0;i<=cantidadPuntos;i++){
    var x=0;
    var y=Math.cos(i/cantidadPuntos*2*Math.PI)*radio;
    var z=Math.sin(i/cantidadPuntos*2*Math.PI)*radio;
    posBuffer.push(x);posBuffer.push(y);posBuffer.push(z);
    normBuffer.push(1);normBuffer.push(0);normBuffer.push(0);
    text_coordinate.push(y/2/radio+0.5);text_coordinate.push(z/2/radio+0.5);
    indexBuffer.push(i+1);
  }

  this.normal_buffer=normBuffer;
	this.position_buffer=posBuffer;
	this.index_buffer=indexBuffer;
  this.texture_coord_buffer=text_coordinate;

  this.modoDibujado = getter(gl.TRIANGLE_FAN);
  this.esIluminado=getter(true);
  this.copiaConTextura=hacerMetodoCopiaConTextura(this,gl);
	this.nombre="llanta";





}
