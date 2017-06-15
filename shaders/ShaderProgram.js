const atlasShaderPs=(function(){
  let yo={};
  let gl=null;
  let shaderPrograms={};
  yo.configurarGl=function(nGl){
    gl=nGl;
  }

  yo.p=function(nombre){
    if(shaderPrograms[nombre]==undefined){
      throw "no hay un shader program que se llame "+nombre;
    }
    return shaderPrograms[nombre];
  }

  function cargarShaderProgram(nombresShaders,evExito){
    $.get("shaders/lib/"+"included.glsl",function(textoLib){
      let cargados = [];
      let exitoShader=function(s){
        cargados.push(s);
        if(cargados.length == nombresShaders.length){
          evExito(new ShaderProgram(gl,cargados));
        }
      };
      nombresShaders.forEach(function(n){
        cargarShader(n,exitoShader,textoLib);
      });
    });
  }


  yo.cargarShaderPrograms=function(listaDeShaders,evExito){
    let total = Object.keys(listaDeShaders).length;
    let cargados =0;
    Object.keys(listaDeShaders).forEach(function(k){
      cargarShaderProgram(listaDeShaders[k],function(programa){
        shaderPrograms[k]=programa;
        cargados +=1;
        if(cargados==total){
          evExito();
        }
      });
    });
  };


  function ShaderProgram(gl,shaders){
    //--- linkear programa ---//
    let programa=gl.createProgram();
    shaders.forEach(function(s){
      gl.attachShader(programa,s.obtenerShaderCompilado(gl));
    });
    gl.linkProgram(programa);

    if (!gl.getProgramParameter(programa, gl.LINK_STATUS)) {
      alert("Could not initialise shaders");
    }

    //--- obtener direcciones de las variables ---///
    let variables=[];
    shaders.forEach(function(shader){
      variables=shader.obtenerVariables().concat(variables);
    });

    let engancharPropiedades=function(quien){

      variables.forEach(function(v){
        if(v.pretipo === "uniform"){
          quien[v.nombre]=gl.getUniformLocation(programa, v.nombre);
        }

        if(v.pretipo === "attribute"){
          quien[v.nombre]=gl.getAttribLocation(programa, v.nombre);
          gl.enableVertexAttribArray(quien[v.nombre]);
          //console.log(v.nombre);
          //console.log(this[v.nombre]);
        }
      });

    }

    engancharPropiedades(this);

    //--- interfaz ---//
    this.usar=function(){
      gl.useProgram(programa);
    }
  }


  Object.freeze(yo);
  return yo;
})();
