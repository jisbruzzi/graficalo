function FormaEdificio(gl,ancho,fondo,posx,posy,altura,anchoUv,fondoUv){

  let normal_buffer=[];
  let texture_coord_buffer=[];
  let position_buffer=[];
  let index_buffer=[];
  let color_buffer=[];
  let tangent_buffer=[];
  let binormal_buffer=[];

  let uIzq=0;
  let uDer=1;
  function agregarPunto(x,y,h){
    let pos=position_buffer.length/3;
    position_buffer=position_buffer.concat([(x-0.5)*ancho+posx,(y-0.5)*fondo+posy,h*altura]);

    color_buffer=color_buffer.concat([0.2,0.2,0.2]);
    return function(xn,yn,zn){//por qué no?
      normal_buffer=normal_buffer.concat([xn,yn,zn]);
      return function(u,v){
        if(v==null){
          texture_coord_buffer=texture_coord_buffer.concat([u,h*altura]);
        }else{
          texture_coord_buffer=texture_coord_buffer.concat([u,v]);
        }
        return function(vec){
          tangent_buffer=tangent_buffer.concat(vec);
          let binormal=[0,0,0];
          vec3.cross(binormal,[xn,yn,zn],vec);
          binormal_buffer=binormal_buffer.concat(binormal);
          return pos;
        };
      }

    };
  }

  uDer=anchoUv;
  let vArriba=[0,0,1];
  //frente interesante
  let abi=agregarPunto(0,0,0)(0,-1,0)(uIzq)(vArriba);
  let abd=agregarPunto(1,0,0)(0,-1,0)(uDer)(vArriba);
  let ari=agregarPunto(0,0,1)(0,-1,0)(uIzq)(vArriba);
  let ard=agregarPunto(1,0,1)(0,-1,0)(uDer)(vArriba);
  index_buffer=index_buffer.concat([abi,ari,ard]);
  index_buffer=index_buffer.concat([ard,abd,abi]);

  //atrás interesante ponele
   abi=agregarPunto(0,1,0)(0,1,0)(uIzq)(vArriba);
   abd=agregarPunto(1,1,0)(0,1,0)(uDer)(vArriba);
   ari=agregarPunto(0,1,1)(0,1,0)(uIzq)(vArriba);
   ard=agregarPunto(1,1,1)(0,1,0)(uDer)(vArriba);
  index_buffer=index_buffer.concat([abi,ari,ard]);
  index_buffer=index_buffer.concat([ard,abd,abi]);

  uDer=fondoUv;
  //izquierda
  abi=agregarPunto(1,0,0)(1,0,0)(uIzq)(vArriba);
  abd=agregarPunto(1,1,0)(1,0,0)(uDer)(vArriba);
  ari=agregarPunto(1,0,1)(1,0,0)(uIzq)(vArriba);
  ard=agregarPunto(1,1,1)(1,0,0)(uDer)(vArriba);
  index_buffer=index_buffer.concat([abi,ari,ard]);
  index_buffer=index_buffer.concat([ard,abd,abi]);

  //izquierda
  abi=agregarPunto(0,0,0)(-1,0,0)(uIzq)(vArriba);
  abd=agregarPunto(0,1,0)(-1,0,0)(uDer)(vArriba);
  ari=agregarPunto(0,0,1)(-1,0,0)(uIzq)(vArriba);
  ard=agregarPunto(0,1,1)(-1,0,0)(uDer)(vArriba);
  index_buffer=index_buffer.concat([abi,ari,ard]);
  index_buffer=index_buffer.concat([ard,abd,abi]);

  //ariba
  let vAdelante=[1,0,0];
  abi=agregarPunto(0,0,1)(0,0,1)(0,0)(vAdelante);
  abd=agregarPunto(1,0,1)(0,0,1)(0,0)(vAdelante);
  ari=agregarPunto(0,1,1)(0,0,1)(0,0)(vAdelante);
  ard=agregarPunto(1,1,1)(0,0,1)(0,0)(vAdelante);
  index_buffer=index_buffer.concat([abi,ari,ard]);
  index_buffer=index_buffer.concat([ard,abd,abi]);

  //hacer copia con varias texturas
  this.hacerCopiaConTexturas=function(base,sobre){
    let copia=jQuery.extend({},this);
    return FormaMultitexturable(copia).agregarSampler2D("uSamplerBase",base).agregarSampler2D("uSamplerSobre",sobre);
  }


  //INTERFAZ
  this.normal_buffer=normal_buffer;
	this.texture_coord_buffer=texture_coord_buffer;
	this.position_buffer=position_buffer;
	this.index_buffer=index_buffer;
	this.color_buffer=color_buffer;
  this.tangent_buffer=tangent_buffer;
  this.binormal_buffer=binormal_buffer;

  //-- interfaz obligatoria --//
  this.copiaConTextura=hacerMetodoCopiaConTextura(this,gl);
  this.modoDibujado = getter(gl.TRIANGLES);
  //this.esIluminado=getter(false);
  this.hacerCopiaConTextura=hacerMetodoCopiaConTextura(this,gl);

}
