function cargarImagenes(nombresArchivos,evExito){
  let ret={};
  let cargadas=0;
  nombresArchivos.forEach(function(n){
    cargarImagen("imagenes/"+n,function(i){
      ret[n]=i;
      cargadas+=1;
      if(cargadas==nombresArchivos.length){
        evExito(ret);
      }
    });
  });
}

function cargarImagen(nombreArchivo,evExito){
  let imagen = new Image();
  imagen.src = nombreArchivo;
  imagen.onload = function(){
    evExito(imagen);
  };
}
const atlasTexturas=(function(){
  let yo={};
  let gl=null;
  let texturas={};
  yo.configurarGl=function(nGl){
    gl=nGl;
  }

  yo.cargarTexturas=function(nombresArchivos,evExito){
    cargarImagenes(nombresArchivos,function(imagenes){
      nombresArchivos.forEach(function(n){
        texturas[n]=new Textura(imagenes[n],gl);
      });
      Object.freeze(texturas);
      evExito();
    })
  }

  yo.t=function(n){
    return texturas[n];
  }

  Object.freeze(yo);

  return yo;
})();



function Textura(imagen,gl){
  let textura = gl.createTexture();
  gl.pixelStorei(gl.UNPACK_FLIP_Y_WEBGL, true);
  gl.bindTexture(gl.TEXTURE_2D, textura);
  gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, imagen);
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR_MIPMAP_NEAREST);
  gl.generateMipmap(gl.TEXTURE_2D);
  gl.bindTexture(gl.TEXTURE_2D, null);
  textura.width=imagen.width;
  textura.height=imagen.height;
  textura.nombre=imagen.src;

  return textura;
}
