const CANT_LUCES=16;

function webGLStart(puntosControl) {
  let animador = new Animador(puntosControl);
  let main=new Main(animador);

}


function esperando(){
  var canvas_espera = document.getElementById("canvas-espera");
  var gl_espera;
  function initGL(canvas) {
    try {
      gl_espera = canvas.getContext("2d");
      gl_espera.viewportWidth = canvas.width;
      gl_espera.viewportHeight = canvas.height;

    } catch (e) {
    }
    if (!gl_espera) {
        alert("Could not initialise WebGL, sorry :-(");
    }
  }
  initGL(canvas_espera);
  var img = new Image();
  img.src = "imagenes/esperando.png";
  img.onload = function(){
    gl_espera.drawImage(img, 0, 0);
  }
}
function Main(animador){
  let gl;
  let camara=new Camara();

  function initGL(canvas) {
    try {
      gl = canvas.getContext("experimental-webgl");
      gl.viewportWidth = canvas.width;
      gl.viewportHeight = canvas.height;

      /*
      //anda apenas mejor con culling pero hay que hacer todas las formas de nuevo
      gl.enable(gl.CULL_FACE);
      gl.cullFace(gl.BACK);
      */

    } catch (e) {
    }
    if (!gl) {
        alert("Could not initialise WebGL, sorry :-(");
    }
  }

  let ultimoTick=new Date().getTime();
  let ultimoTiempo=0
  let tick = function(delta) {

    requestAnimFrame(tick);
    try{
      TWEEN.update(delta);
    }catch(e){};

    animador.tick(delta);
    animador.obtenerMundo().tick(delta,animador.obtenerMundo());
    //console.log(delta);

    // Se configura el vierport dentro de área ¨canvas¨. en este caso se utiliza toda
    // el área disponible
    gl.viewport(0, 0, gl.viewportWidth, gl.viewportHeight);

    // Se habilita el color de borrado para la pantalla (Color Buffer) y otros buffers
    gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);

    //---- dibujado ----//
    animador.obtenerMundo().configurarCamara(camara).dibujar();

    //--- fps ---//
    let ahora = new Date().getTime();
    let milis = ahora-ultimoTick;
    document.getElementById("fps").innerHTML=milis;
    ultimoTick=ahora;
  };

  this.tick=tick;

  let lista = animador.archivosShaderPrograms;
  let listaImagenes = animador.archivosImagenes;


  //////////////////////////////////// INICIO ////////////////////////////////////////////

	var canvas = document.getElementById("clase03-vertex shader");
  canvas.style.display="inline";
	initGL(canvas);
  atlasTexturas.configurarGl(gl);
  atlasShaderPs.configurarGl(gl);
  atlasShaderPs.cargarShaderPrograms(lista,function(){
    cargarImagenes(listaImagenes,function(atlasImagenes){
      atlasTexturas.cargarTexturas(listaImagenes,function(){

        camara.setPerspectiva(3.14/6.0, gl.viewportWidth / gl.viewportHeight, 0.1, 10000.0);

        animador.iniciarMundo(gl,camara,new MouseFederico(canvas),new Movedor(canvas));

    		gl.clearColor(0.82, 0.82, 0.92, 1);
        gl.enable(gl.DEPTH_TEST);

    		tick();
      });
    });

  });
}
