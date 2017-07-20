function Glizable(f,gl){

  if(f.yaTieneInterfazGlizada!=undefined){
    return f;
  }

  f.yaTieneInterfazGlizada=true;


  function TipoBuffer(nombreComun,fabrica,nombreEnShader){
    let yo={};
    yo.tieneComun=function(){
      return f[nombreComun]!=undefined;
    };
    yo.tieneBuffer=function(){
      return f[nombreEnShader]!=undefined;
    };
    yo.eliminarBuffer=function(){
      f[nombreEnShader]().eliminar();
    }
    yo.agregar=function(){
      let glb = fabrica.aPartirDe(f[nombreComun]);
      f[nombreEnShader]=getter(glb);
    };
    return yo;
  }


  f.glizada=false;
  f.eliminada=false;
  let tiposBuffer=[
    new TipoBuffer("position_buffer",new GlPositionBuffer(gl),"aVertexPosition"),
    new TipoBuffer("normal_buffer",new GlNormalBuffer(gl),"aVertexNormal"),
    new TipoBuffer("color_buffer",new GlColorBuffer(gl),"aVertexColor"),
    new TipoBuffer("texture_coord_buffer",new GlTextureCoordBuffer(gl),"aTextureCoord"),
    new TipoBuffer("tangent_buffer",new GlNormalBuffer(gl),"aVertexTangent"),
    new TipoBuffer("binormal_buffer",new GlNormalBuffer(gl),"aVertexBinormal"),
    new TipoBuffer("index_buffer",new GlIndexBuffer(gl),"getIndexBuffer"),

    //los buffers para los edificios (se vienen más)
    new TipoBuffer("altura_base_buffer",new GlFloatBuffer(gl),"aAlturaBase"),
    new TipoBuffer("altura_sobre_buffer",new GlFloatBuffer(gl),"aAlturaSobre"),
    new TipoBuffer("numero_textura_sobre_buffer",new GlFloatBuffer(gl),"aNumeroTexturaSobre"),
    new TipoBuffer("alto_maximo_buffer",new GlFloatBuffer(gl),"aAltura"),
    new TipoBuffer("numero_textura_base_buffer",new GlFloatBuffer(gl),"aNumeroTexturaBase"),

    new TipoBuffer("retardo_animacion_buffer",new GlFloatBuffer(gl),"aRetardoAnimacion"),
    new TipoBuffer("duracion_animacion_buffer",new GlFloatBuffer(gl),"aDuracionAnimacion"),
    new TipoBuffer("tipo_animacion_buffer",new GlFloatBuffer(gl),"aTipoAnimacion"),
  ];

  f.glizar=function(){
    if (f.glizada) return;
    f.glizada=true;

    f.actualizarGlizacion();
  };

  f.actualizarGlizacion=function(){
    //ANTES QUE ESTO HAY QUE CHEQUEAR SI TIENE EL BUFFER YA ARMADO Y DESTRUIRLO!
    tiposBuffer.forEach(function(tipoBuffer){
      if(tipoBuffer.tieneComun()){
        tipoBuffer.agregar();
      }
    });
  };

  f.eliminarBuffers=function(){
    tiposBuffer.forEach(function(tipoBuffer){
      if(tipoBuffer.tieneBuffer()){
        tipoBuffer.eliminarBuffer();
      }
    });
  }
  return f;
}
