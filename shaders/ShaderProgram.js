function cargarVariosShaderProgram(gl,listasDeShaders,evExito){
  let cargados=[];
  let exitoProgram=function(p){
    cargados.push(p);
    if(cargados.length == listasDeShaders.length){
      evExito(cargados);
    }
  };
  listasDeShaders.foreach(function(l){
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
  nombresShaders.foreach(function(n){
    cargarShader(n,exitoShader);
  });
}

function ShaderProgram(gl,shaders){//siempre son 2? (vertex y fragment)?

  //--- linkear programa ---//
  this.programa=gl.createProgram();
  shaders.forEach(function(s){
    gl.attachShader(this.programa,s.obtenerShaderCompilado(gl));
  });
  gl.linkProgram(this.programa);

  if (!gl.getProgramParameter(this.programa, gl.LINK_STATUS)) {
    alert("Could not initialise shaders");
  }

  //--- obtener direcciones de las variables ---///
  let variables=[];
  shaders.forEach(function(shader){
    variables=shader.obtenerVariables().concat(variables);
  });

  variables.forEach(function(variable){
    if(v.pretipo === "uniform"){
      this[v.nombre]=gl.getUniformLocation(this.programa, v.nombre);
    }

    if(v.pretipo === "attribute"){
      this[v.nombre]=gl.getAttribLocation(this.programa, v.nombre);
      gl.enableVertexAttribArray(this[v.nombre]);
    }
  });
}