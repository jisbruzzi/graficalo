function cargarVariosShaderProgram(gl,listasDeShaders,evExito){
  let cargados=[];
  let exitoProgram=function(p){
    cargados.push(p);
    if(cargados.length == listasDeShaders.length){
      evExito(cargados);
    }
  };
  listasDeShaders.forEach(function(l){
    cargarShaderProgram(gl,l,exitoProgram);
  });
}

function cargarShaderProgram(gl,nombresShaders,evExito){
  let cargados = [];
  let exitoShader=function(s){
    cargados.push(s);
    if(cargados.length == nombresShaders.length){
      evExito(new ShaderProgram(gl,cargados));
    }
  };
  nombresShaders.forEach(function(n){
    cargarShader(n,exitoShader);
  });
}

function ShaderProgram(gl,shaders){//siempre son 2? (vertex y fragment)?

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