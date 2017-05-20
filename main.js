function webGLStart() {
  let animador = new Animador();
  let main=new Main(animador);

}

function Main(animador){
  let gl;
  let camara=new Camara();

  function initGL(canvas) {
    try {
      gl = canvas.getContext("experimental-webgl");
      gl.viewportWidth = canvas.width;
      gl.viewportHeight = canvas.height;

    } catch (e) {
    }
    if (!gl) {
        alert("Could not initialise WebGL, sorry :-(");
    }
  }

  let tick = function() {
    requestAnimFrame(tick);

    animador.tick();

    // Se configura el vierport dentro de área ¨canvas¨. en este caso se utiliza toda
    // el área disponible
    gl.viewport(0, 0, gl.viewportWidth, gl.viewportHeight);

    // Se habilita el color de borrado para la pantalla (Color Buffer) y otros buffers
    gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);

    //---- dibujado ----//
    animador.obtenerMundo().configurarCamara(camara).dibujar();
  };

  this.tick=tick;

  let lista = animador.archivosShaderPrograms;
  let listaImagenes = animador.archivosImagenes;


  //////////////////////////////////// INICIO ////////////////////////////////////////////

	var canvas = document.getElementById("clase03-vertex shader");
	initGL(canvas);
  atlasTexturas.configurarGl(gl);
  cargarVariosShaderProgram(gl,lista,function(programs){
    cargarImagenes(listaImagenes,function(atlasImagenes){
      atlasTexturas.cargarTexturas(listaImagenes,function(){

        camara.setPerspectiva(3.14/12.0, gl.viewportWidth / gl.viewportHeight, 0.1, 1000.0);

        animador.iniciarMundo(programs,gl,camara,new Mouse(canvas),new Movedor(canvas));

    		gl.clearColor(0.2, 0.2, 0.0, 1);
        gl.enable(gl.DEPTH_TEST);

    		tick();
      });
    });

  });
}