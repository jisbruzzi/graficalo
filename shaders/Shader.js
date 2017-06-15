function cargarShader(nombreArchivo,evExito,textoLib){
  $.get("shaders/"+nombreArchivo,function(texto){
			evExito(new Shader(nombreArchivo,texto,textoLib));
		});
}

function Shader(nombre,texto,textoLib){

  //---  determinar tipo ---//
  let regexFragment= new RegExp("^shader-fs");
  let regexVertex  = new RegExp("^shader-vs");
  if(regexFragment.test(nombre)){
    this.tipo="f";
  }
  if(regexVertex.test(nombre)){
    this.tipo="v";
  }

  //--- parsear variables ---//
  let lineas = texto.split(";");
  let pretipos="(uniform|attribute|varying)";

  let tipos="(bool|int|uint|double|";
  tipos+="sampler2D|sampler3D|"
  for(let i=2;i<=4;i++){
    tipos+="bvec"+i+"|";
    tipos+="ivec"+i+"|";
    tipos+="uvec"+i+"|";
    tipos+="vec"+i+"|";
    tipos+="dvec"+i+"|";
  }
  for(let m=2;m<=4;m++){
    for(let n=2;n<=4;n++){
      tipos+="mat"+n+"x"+m+"|";
    }
    tipos+="mat"+m+"|";
  }
  tipos+="float)";

  let regexVariable=new RegExp(pretipos+"[ ]*"+tipos+"[ ]*"+"([^ ]*)$");

  let variables=lineas.map(function(s){
    return regexVariable.exec(s);
  });

  variables = variables.filter(function(a){
    return a!=null;
  });

  variables = variables.map(function(a){
    return {
      pretipo:a[1],
      tipo:a[2],
      nombre:a[3]
    };
  });

  //--- hacer funcional el #include ---//
  texto = texto.replace("#include",textoLib);





  //--- tocar a opengl ---//
  this.obtenerShaderCompilado=function(gl){

    let tipo = null;
    if(this.tipo==="f"){
      tipo = gl.FRAGMENT_SHADER;
    }else if (this.tipo==="v"){
      tipo = gl.VERTEX_SHADER;
    }else{
      throw "el shader "+nombre+"no tiene ningún tipo";
    }

    let s = gl.createShader(tipo);
    gl.shaderSource(s,texto);
    gl.compileShader(s);

    if (!gl.getShaderParameter(s, gl.COMPILE_STATUS)) {
      alert(gl.getShaderInfoLog(s));
      return null;
    }

    return s
  }

  this.obtenerVariables = function(){
    return variables;
  }
}
