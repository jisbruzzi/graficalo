function FormaPlano(ancho,alto,gl,color,mapeoTextura){//mapeotextura es una funcion que toma i,j y devuelve las coordenadas uv para el mapeo 
  //las 4 puntas (recorridas en forma de círculo)
  let position_buffer = [
    -ancho/2,-alto/2,0,
     ancho/2,-alto/2,0,
    -ancho/2, alto/2,0,
     ancho/2, alto/2,0
    
  ];
  let tangent_buffer =[
    0,1,0,
    0,1,0,
    0,1,0,
    0,1,0,
  ];
  let binormal_buffer =[
    -1,0,0,
    -1,0,0,
    -1,0,0,
    -1,0,0,
  ];
  let normal_buffer = [
    0,0,1,
    0,0,1,
    0,0,1,
    0,0,1
  ];
  let texture_coord_buffer;
  if(mapeoTextura===undefined){
    texture_coord_buffer = [
    0,0,
    ancho,0,
    0,alto,
    ancho,alto
    ];
  }
  else{
    texture_coord_buffer = new Array();
    for(var i=0;i<2;i++){
      for(var j=0;j<2;j++){
        var uv=mapeoTextura(j,i);
        texture_coord_buffer.push(uv[0]);
        texture_coord_buffer.push(uv[1]);
      }
    }
  }
  

  let color_buffer = [];
  if (color==null || color == undefined){
    color_buffer =[0,0,0];
  }
  for(let i=0;i<4;i++){
    color_buffer = color_buffer.concat(color)
  }

  let index_buffer =[0,1,3,3,2,0];


  //INTERFAZ
  this.normal_buffer=normal_buffer;
  this.tangent_buffer=tangent_buffer;
  this.binormal_buffer=binormal_buffer;
	this.texture_coord_buffer=texture_coord_buffer;
	this.position_buffer=position_buffer;
	this.index_buffer=index_buffer;
	this.color_buffer=color_buffer;

  this.copiaConTextura=hacerMetodoCopiaConTextura(this,gl);
  this.modoDibujado = getter(gl.TRIANGLES);

  this.esIluminado=getter(true);
  this.nombre="plano";

}
