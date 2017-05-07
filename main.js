/*


LOS GLOBALES QUE TENGO QUE SACRA DEL SCOPE GLOBAL


*/


var CameraMatrix = mat4.create();
var pMatrix = mat4.create();

    var gl;

var shaderProgramTexturedObject;
var shaderProgramColoredObject;





function Main(animador){



  function drawScene() {

  		// Se configura el vierport dentro de área ¨canvas¨. en este caso se utiliza toda
  		// el área disponible
          gl.viewport(0, 0, gl.viewportWidth, gl.viewportHeight);

  		// Se habilita el color de borrado para la pantalla (Color Buffer) y otros buffers
          gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);

  		// Se configura la matriz de proyección
          mat4.perspective(pMatrix, 3.14/12.0, gl.viewportWidth / gl.viewportHeight, 0.1, 1000.0);


          /////////////////////////////////////////////////////
  		// Definimos la ubicación de la camara
  		// Pensamos por el momento marsamente la posición de la cámara, la cual siempre mira al mars.
  		var matriz_camara = mat4.create();
          mat4.identity(matriz_camara);
  		//mat4.identity(CameraMatrix);
  		//mat4.translate(CameraMatrix, CameraMatrix, [0, 0, -60]);
          var eye_point = vec3.create();
          vec3.set(eye_point, 40, 75, -100);
          var at_point = vec3.create();
          vec3.set(at_point, 0, 0, 0);
          var up_point = vec3.create();
          vec3.set(up_point, 0, 1, 0);

          mat4.lookAt(CameraMatrix, eye_point, at_point, up_point);
          mat4.multiply(CameraMatrix, CameraMatrix, matriz_camara);

          //---- dibujado ----//
          animador.obtenerMundo().dibujar();
    }

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

          //------------------------ COMPORTAMIENTO (HAY QUE SCARALO DE ACÁ!) --------------------//
          animador.tick();

          //--- dibujadoo ---//

          drawScene();
      };
      this.tick=tick;

  let lista = animador.archivosShaderPrograms;
  let listaImagenes = animador.archivosImagenes;

	var canvas = document.getElementById("clase03-vertex shader");
	initGL(canvas);
  cargarVariosShaderProgram(gl,lista,function(programs){
    cargarImagenes(listaImagenes,function(atlasImagenes){
      _atlasImagenes=atlasImagenes;

      shaderProgramColoredObject = programs[0];
      shaderProgramTexturedObject = programs[1];

      animador.iniciarMundo(programs,atlasImagenes);

  		gl.clearColor(0.0, 0.0, 0.0, 1.0)
      gl.enable(gl.DEPTH_TEST);

  		tick();
    });
  });

}

function webGLStart() {
  let animador = new Animador();
  let main=new Main(animador);
}
