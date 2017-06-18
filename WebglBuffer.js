function WebglBuffer(gl,target,obtenerSrcData,usage,itemSize,tipo){
  this.aPartirDe=function(datos){
    let glBuffer = gl.createBuffer();
    let yo={};

    yo.asignarAtributoComplejoShader=function(atributo,normalized,stride,offset){
      gl.bindBuffer(target, glBuffer);
      gl.vertexAttribPointer(atributo, itemSize, tipo, normalized, stride, offset);
    }

    yo.asignarAtributoShader=function(atributo){
      yo.asignarAtributoComplejoShader(atributo,false,0,0);
    }

    yo.dibujarComplejo=function(modo,cuantos,offset){
      gl.bindBuffer(target, glBuffer);
      gl.drawElements(modo, cuantos, tipo, offset);
    }

    yo.dibujar=function(){
      yo.dibujarComplejo(gl.TRIANGLES,glBuffer.numItems,0);
    }

    yo.dibujarModo=function(modo){
      yo.dibujarComplejo(modo,glBuffer.numItems,0);
    }

    gl.bindBuffer(target, glBuffer);
    gl.bufferData(target, obtenerSrcData(datos), usage);
    glBuffer.itemSize = itemSize;
    glBuffer.numItems = datos.length/itemSize;
    return yo;
  };

  return this;
}

//normal y position son iguales por ahora

function GlNormalBuffer(gl){
  let obtenerSrcData = function(datos){
    return new Float32Array(datos);
  }
  return( new WebglBuffer(gl,gl.ARRAY_BUFFER,obtenerSrcData,gl.STATIC_DRAW,3,gl.FLOAT) );
}

function GlColorBuffer(gl){
  let obtenerSrcData = function(datos){
    return new Float32Array(datos);
  }
  return( new WebglBuffer(gl,gl.ARRAY_BUFFER,obtenerSrcData,gl.STATIC_DRAW,3,gl.FLOAT) );
}

function GlTextureCoordBuffer(gl){
  let obtenerSrcData = function(datos){
    return new Float32Array(datos);
  }
  return( new WebglBuffer(gl,gl.ARRAY_BUFFER,obtenerSrcData,gl.STATIC_DRAW,2,gl.FLOAT) );
}

function GlPositionBuffer(gl){
  let obtenerSrcData = function(datos){
    return new Float32Array(datos);
  }
  return( new WebglBuffer(gl,gl.ARRAY_BUFFER,obtenerSrcData,gl.STATIC_DRAW,3,gl.FLOAT) );
}

function GlIndexBuffer(gl){
  let obtenerSrcData = function(datos){
    return new Uint16Array(datos);
  }
  return( new WebglBuffer(gl,gl.ELEMENT_ARRAY_BUFFER,obtenerSrcData,gl.STATIC_DRAW,1,gl.UNSIGNED_SHORT) );//epa ese -1 !!
}

function GlFloatBufferDinamico(gl){
  let obtenerSrcData = function(datos){
    return new Float32Array(datos);
  }
  return( new WebglBuffer(gl,gl.ARRAY_BUFFER,obtenerSrcData,gl.DYNAMIC_DRAW,1,gl.FLOAT) );
}
