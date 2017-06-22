const atlasShaderPs=(function(){
  let libreriaShaders={};
  let nombresLibreriaShaders=[
    "pesosIluminacion-fs","pesosIluminacion-vs",
    "normal-comun-fs","normal-comun-vs",
    "normal-mappeada-fs","normal-mappeada-vs",
    "pesosIluminacionGlobal-fs",
    "reflexion-fs","reflexion-vs",
  ];
  let yo={};
  let gl=null;
  let shaderPrograms={};
  yo.configurarGl=function(nGl){
    gl=nGl;
  }

  function cargarLibreriaShaders(fin){
    let cargados=0;
    nombresLibreriaShaders.forEach(function(n){
      $.get("shaders/lib/"+n+".glsl",function(texto){
        libreriaShaders[n]=texto;
        cargados+=1;
        if (cargados==nombresLibreriaShaders.length){
          fin();
        }
      });
    });

  }

  yo.p=function(nombre){
    if(shaderPrograms[nombre]==undefined){
      throw "no hay un shader program que se llame "+nombre;
    }
    return shaderPrograms[nombre];
  }
  function getLibreria(nombre){
    if(libreriaShaders[nombre]===undefined){
      console.log(libreriaShaders);
      throw "no existe una libreria llamada "+nombre;
    }
    return libreriaShaders[nombre];
  }

  function cargarShaderProgram(nombresShaders,evExito){
    let cargados = [];
    let exitoShader=function(s){
      cargados.push(s);
      if(cargados.length == nombresShaders.length){
        evExito(new ShaderProgram(gl,cargados));
      }
    };
    nombresShaders.forEach(function(n){
      cargarShader(n,exitoShader,libreriaShaders);
    });
  }


  yo.cargarShaderPrograms=function(listaDeShaders,evExito){
    cargarLibreriaShaders(function(){
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
    })
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



    let yo=this;
    let uniforms={};
    let attributes={};
    variables.forEach(function(v){
      if(v.pretipo === "uniform"){
        uniforms[v.nombre]=gl.getUniformLocation(programa, v.nombre);
        yo[v.nombre]=uniforms[v.nombre];
      }
    });

    let atributosActivos=gl.getProgramParameter(programa, gl.ACTIVE_ATTRIBUTES);
    let atributosPosta = []
    for (i = 0; i < atributosActivos; i+=1) {
      atributosPosta.push(gl.getActiveAttrib(programa, i).name);
    }
    atributosPosta.forEach(function(nombre){
      attributes[nombre]=gl.getAttribLocation(programa, nombre);
    });

    this.uniforms=uniforms;
    this.attributes=attributes;



    //--- interfaz ---//
    this.usar=function(){
      gl.useProgram(programa);
      Object.keys(attributes).forEach(function(s){
        gl.enableVertexAttribArray(attributes[s]);
      });
    }
    this.disableAttributes=function(){
      Object.keys(attributes).forEach(function(s){
        gl.disableVertexAttribArray(attributes[s]);
      });
    }
    this.obtenerProgram=function(){
      return programa;
    }
  }


  Object.freeze(yo);
  return yo;
})();
