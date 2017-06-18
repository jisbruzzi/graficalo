function Glizable(f,gl){

  function TipoBuffer(nombreComun,fabrica,nombreEnShader){
    let yo={};
    yo.tieneComun=function(){
      return f[nombreComun]!=undefined;
    };
    yo.agregar=function(){
      let glb = fabrica.aPartirDe(f[nombreComun]);
      f[nombreEnShader]=getter(glb);
    };
    return yo;
  }


  f.glizada=false;
  let tiposBuffer=[
    new TipoBuffer("position_buffer",new GlPositionBuffer(gl),"aVertexPosition"),
    new TipoBuffer("normal_buffer",new GlNormalBuffer(gl),"aVertexNormal"),
    new TipoBuffer("color_buffer",new GlColorBuffer(gl),"aVertexColor"),
    new TipoBuffer("texture_coord_buffer",new GlTextureCoordBuffer(gl),"aTextureCoord"),
    new TipoBuffer("tangent_buffer",new GlNormalBuffer(gl),"aVertexTangent"),
    new TipoBuffer("binormal_buffer",new GlNormalBuffer(gl),"aVertexBinormal"),
    new TipoBuffer("index_buffer",new GlIndexBuffer(gl),"getIndexBuffer")
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
}
