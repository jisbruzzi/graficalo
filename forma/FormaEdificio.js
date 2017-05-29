function FormaEdificio(gl){
  let normal_buffer=[];
  let texture_coord_buffer=[];
  let position_buffer=[];
  let index_buffer=[];
  let color_buffer=[];

  let uIzq=0;
  let uDer=1;
  function agregarPunto(x,y,h){
    let pos=position_buffer.length/3;
    position_buffer=position_buffer.concat([x-0.5,y-0.5,h]);

    color_buffer=color_buffer.concat([0.2,0.2,0.2]);
    return function(x,y,z){//por qué no?
      normal_buffer=normal_buffer.concat([x,y,z]);
      return function(u){
        texture_coord_buffer=texture_coord_buffer.concat([u,h]);
        return pos;
      }

    };
  }

  //frente interesante
  let abi=agregarPunto(0,0,0)(0,-1,0)(uIzq);
  let abd=agregarPunto(1,0,0)(0,-1,0)(uDer);
  let ari=agregarPunto(0,0,1)(0,-1,0)(uIzq);
  let ard=agregarPunto(1,0,1)(0,-1,0)(uDer);
  index_buffer=index_buffer.concat([abi,ari,ard]);
  index_buffer=index_buffer.concat([ard,abd,abi]);

  //atrás interesante ponele
   abi=agregarPunto(0,1,0)(0,1,0)(uIzq);
   abd=agregarPunto(1,1,0)(0,1,0)(uDer);
   ari=agregarPunto(0,1,1)(0,1,0)(uIzq);
   ard=agregarPunto(1,1,1)(0,1,0)(uDer);
  index_buffer=index_buffer.concat([abi,ari,ard]);
  index_buffer=index_buffer.concat([ard,abd,abi]);

  //izquierda
  abi=agregarPunto(1,0,0)(1,0,0)(uIzq);
  abd=agregarPunto(1,1,0)(1,0,0)(uDer);
  ari=agregarPunto(1,0,1)(1,0,0)(uIzq);
  ard=agregarPunto(1,1,1)(1,0,0)(uDer);
  index_buffer=index_buffer.concat([abi,ari,ard]);
  index_buffer=index_buffer.concat([ard,abd,abi]);

  //izquierda
  abi=agregarPunto(0,0,0)(-1,0,0)(uIzq);
  abd=agregarPunto(0,1,0)(-1,0,0)(uDer);
  ari=agregarPunto(0,0,1)(-1,0,0)(uIzq);
  ard=agregarPunto(0,1,1)(-1,0,0)(uDer);
  index_buffer=index_buffer.concat([abi,ari,ard]);
  index_buffer=index_buffer.concat([ard,abd,abi]);

  //izquierda
  abi=agregarPunto(0,0,1)(0,0,1)(uIzq);
  abd=agregarPunto(1,0,1)(0,0,1)(uDer);
  ari=agregarPunto(0,1,1)(0,0,1)(uIzq);
  ard=agregarPunto(1,1,1)(0,0,1)(uDer);
  index_buffer=index_buffer.concat([abi,ari,ard]);
  index_buffer=index_buffer.concat([ard,abd,abi]);

  //hacer copia con varias texturas
  this.hacerCopiaConTexturas=function(base,sobre){
    let copia=jQuery.extend({},this);
    copia.uSamplerBase=getter(base);

    copia.uSamplerSobre=getter(sobre);
    return copia;
  }


  //INTERFAZ
  this.normal_buffer=normal_buffer;
	this.texture_coord_buffer=texture_coord_buffer;
	this.position_buffer=position_buffer;
	this.index_buffer=index_buffer;
	this.color_buffer=color_buffer;

  //-- interfaz obligatoria --//
  this.copiaConTextura=hacerMetodoCopiaConTextura(this);
  this.modoDibujado = getter(gl.TRIANGLES);
  //this.esIluminado=getter(false);
}
