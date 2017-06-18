function Glizable(f,gl){
  /*
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
  */
  let forma = f;
  f.glizar=function(){
    if(forma.glizada!=undefined && forma.glizada) return;

    forma.glizada=true;

    //generar los buffers de opengl

    if(forma.position_buffer!=undefined){
      let webgl_position_buffer = new GlPositionBuffer(gl).aPartirDe(forma.position_buffer);
      forma.aVertexPosition=getter(webgl_position_buffer);
    }
    if(forma.normal_buffer!=undefined){
      let glb = new GlNormalBuffer(gl).aPartirDe(forma.normal_buffer);
      forma.aVertexNormal=getter(glb);
    }
    if(forma.color_buffer!=undefined){
      let glb = new GlColorBuffer(gl).aPartirDe(forma.color_buffer);
      forma.aVertexColor=getter(glb);
    }
    if(forma.texture_coord_buffer!=undefined){
      let glb = new GlTextureCoordBuffer(gl).aPartirDe(forma.texture_coord_buffer);
      forma.aTextureCoord=getter(glb);
    }
    if(forma.tangent_buffer!=undefined){
      let glb = new GlNormalBuffer(gl).aPartirDe(forma.tangent_buffer);
      forma.aVertexTangent=getter(glb);
    }

    if(forma.binormal_buffer!=undefined){
      let glb = new GlNormalBuffer(gl).aPartirDe(forma.binormal_buffer);
      forma.aVertexBinormal=getter(glb);
    }
    if(forma.index_buffer!=undefined){
      let glb = new GlIndexBuffer(gl).aPartirDe(forma.index_buffer);
      forma.getIndexBuffer=getter(glb);
    }
  }
}

/*
function glizarForma(){
  if(forma.glizada!=undefined && forma.glizada) return;

  forma.glizada=true;

  //generar los buffers de opengl

  if(forma.position_buffer!=undefined){
    let webgl_position_buffer = new GlPositionBuffer(gl).aPartirDe(forma.position_buffer);
    forma.aVertexPosition=getter(webgl_position_buffer);
  }
  if(forma.normal_buffer!=undefined){
    let glb = new GlNormalBuffer(gl).aPartirDe(forma.normal_buffer);
    forma.aVertexNormal=getter(glb);
  }
  if(forma.color_buffer!=undefined){
    let glb = new GlColorBuffer(gl).aPartirDe(forma.color_buffer);
    forma.aVertexColor=getter(glb);
  }
  if(forma.texture_coord_buffer!=undefined){
    let glb = new GlTextureCoordBuffer(gl).aPartirDe(forma.texture_coord_buffer);
    forma.aTextureCoord=getter(glb);
  }
  if(forma.tangent_buffer!=undefined){
    let glb = new GlNormalBuffer(gl).aPartirDe(forma.tangent_buffer);
    forma.aVertexTangent=getter(glb);
  }

  if(forma.binormal_buffer!=undefined){
    let glb = new GlNormalBuffer(gl).aPartirDe(forma.binormal_buffer);
    forma.aVertexBinormal=getter(glb);
  }
  if(forma.index_buffer!=undefined){
    let glb = new GlIndexBuffer(gl).aPartirDe(forma.index_buffer);
    forma.getIndexBuffer=getter(glb);
  }
}

glizarForma();
*/
