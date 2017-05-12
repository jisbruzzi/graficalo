function WebglBuffer(gl,target,obtenerSrcData,usage,itemSize,tipo){
  let glBuffer = gl.createBuffer();
  this.aPartirDe=function(datos){
    gl.bindBuffer(target, glBuffer);
    gl.bufferData(target, obtenerSrcData(datos), usage);
    glBuffer.itemSize = itemSize;
    glBuffer.numItems = datos.length/itemSize;
    return this;
  };
  this.asignarAtributoComplejoShader=function(atributo,normalized,stride,offset){
    gl.bindBuffer(target, glBuffer);
    gl.vertexAttribPointer(atributo, itemSize, tipo, normalized, stride, offset);
  }

  this.asignarAtributoShader=function(atributo){
    this.asignarAtributoComplejoShader(atributo,false,0,0);
  }

  this.dibujarComplejo=function(modo,cuantos,offset){
    gl.bindBuffer(target, glBuffer);
    gl.drawElements(modo, cuantos, tipo, offset);
  }

  this.dibujar=function(){
    this.dibujarComplejo(gl.TRIANGLES,glBuffer.numItems,0);
  }

  this.dibujarModo=function(modo){
    this.dibujarComplejo(modo,glBuffer.numItems,0);
  }

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
