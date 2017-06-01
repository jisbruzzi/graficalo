function FormaCaja(colores,gl){//los colores se deben pasar por caras, siendo 0 YZ,1XZ,2XY,3YZop,4XZop,5XYop
			             	//  t1        YZ              t2                        t1            XZ        t2                 t1        XY     t2     
  let posBuffer = [0,0,0,0,0,1,0,1,0,       0,1,1,0,0,1,0,1,0,       0,0,0,0,0,1,1,0,0,    1,0,1,0,0,1,1,0,0,     0,0,0,1,0,0,0,1,0,   1,1,0,0,1,0,1,0,0];//0,1,1,0,1,0,1,0,0];
  let normBuffer = [-1,0,0,-1,0,0,-1,0,0,  -1,0,0,-1,0,0,-1,0,0,      0,-1,0,0,-1,0,0,-1,0,    0,-1,0,0,-1,0,0,-1,0,     0,0,-1,0,0,-1,0,0,-1,   0,0,-1,0,0,-1,0,0,-1];
  let colBuffer =[];
  let indexBuffer = [];
  let largoBuffers=posBuffer.length;
  for(var i=0;i<largoBuffers;i++){
  	normBuffer.push(-normBuffer[i]);
  }
  let caras=3;
  let triangulosPorCara=2;
  for(var cara=0;cara<caras;cara++){
  	for(var triangulo=0;triangulo<triangulosPorCara;triangulo++){
  		for(var punto=0;punto<3;punto++){
	  		for(var coordenada=0;coordenada<3;coordenada++){
	  			if(coordenada==cara)
	  				posBuffer.push(posBuffer[(((cara*triangulosPorCara+triangulo)*3)+punto)*3+coordenada]+1);
	  			else
	  				posBuffer.push(posBuffer[(((cara*triangulosPorCara+triangulo)*3)+punto)*3+coordenada]);
	  		}
	  	}
  	}
  }
  largoBuffers*=2;
  caras=6;
  for(var cara=0;cara<caras;cara++){
  	var col=colores(cara);
  	for(var puntos=0;puntos<6;puntos++){
  		colBuffer.push(col[0]);
  		colBuffer.push(col[1]);
  		colBuffer.push(col[2]); 		
  	}
  		

  }
  for(var i=0;i<largoBuffers;i++){
  	posBuffer[i]-=1/2;
  }

  for(var i=0;i<largoBuffers/3;i++){
  	indexBuffer.push(i);
  }


//INTERFAZ
  this.normal_buffer=normBuffer;
	this.position_buffer=posBuffer;
	this.index_buffer=indexBuffer;
	this.color_buffer=colBuffer;

  this.modoDibujado = getter(gl.TRIANGLES);
  this.esIluminado=getter(true);



}