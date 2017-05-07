
    var gl;

var shaderProgramTexturedObject;
var shaderProgramColoredObject;
var _atlasImagenes=null;


function webGLStart() {
  lista=[
    ["shader-fs-colored-obj.glsl","shader-vs-colored-obj.glsl"],
    ["shader-fs-textured-obj.glsl","shader-vs-textured-obj.glsl"]
    ];
  listaImagenes=[
    "mars_1k_color.jpg",
    "moon.gif"
  ];

	var canvas = document.getElementById("clase03-vertex shader");
	initGL(canvas);
  cargarVariosShaderProgram(gl,lista,function(programs){
    cargarImagenes(listaImagenes,function(atlasImagenes){
      todoCargado=true;
      _atlasImagenes=atlasImagenes;

      shaderProgramColoredObject = programs[0];
      shaderProgramTexturedObject = programs[1];

      let esfera64 = new FormaEsfera(64,64);
      let esfera64Texturada =esfera64.copiaConTextura(new Textura(atlasImagenes["mars_1k_color.jpg"]));
      let modeloColoreada = new Modelo(esfera64,shaderProgramColoredObject);
      let modeloTexturada = new Modelo(esfera64Texturada,shaderProgramTexturedObject);

      deimos=new Objeto(modeloColoreada);
      mars  =new Objeto(modeloTexturada);
      phobos=new Objeto(modeloColoreada);

      deimosEje=new Objeto();
      deimosEje.hijos.push(deimos);
      deimos.mover(10,0,0).escalar([1.8,1.8,1.8]);

      phobosEje=new Objeto();
      phobosEje.hijos.push(phobos);
      phobos.mover(25,0,0).escalar([1.,0.84,0.47]);


  		gl.clearColor(0.0, 0.0, 0.0, 1.0)
      gl.enable(gl.DEPTH_TEST);

  		tick();
    });
  });
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

function tick() {
        requestAnimFrame(tick);
		var newRotationMatrix = mat4.create();
        mat4.identity(newRotationMatrix);
        mat4.rotate(newRotationMatrix, newRotationMatrix, 0.025, [0, 1, 0]);
		mat4.multiply(newRotationMatrix, deimosRotationMatrix, deimosRotationMatrix);

        deimosRotationAnglemars += 0.0045;
        phobosRotationAngledeimos += 0.0005;
        drawScene();
    }
todoCargado=false;

function drawScene() {
if(todoCargado){
  /*
  mars.rotar([0,1,0],0.1);
  mars.mover(0.01,0,0);
  mars.anularEscalado();
  mars.escalar([1,1,2]);
  */

		// Se configura el vierport dentro de área ¨canvas¨. en este caso se utiliza toda
		// el área disponible
        gl.viewport(0, 0, gl.viewportWidth, gl.viewportHeight);

		// Se habilita el color de borrado para la pantalla (Color Buffer) y otros buffers
        gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);

		// Se configura la matriz de proyección
        mat4.perspective(pMatrix, 3.14/12.0, gl.viewportWidth / gl.viewportHeight, 0.1, 1000.0);

        /////////////////////////////////////////////////////
        // Configuración de la luz
        // Se inicializan las variables asociadas con la Iluminación


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



        ///////////////////////////////////////////////////////
        //
        // Dibujamos a Deimos

        // Configuramos la iluminación
        deimosEje.setupShaders();

        // function(lightPosition, ambientColor, diffuseColor)
        deimosEje.setupLighting(vec3.fromValues(-100.0, 0.0, -60.0), vec3.fromValues(0.5, 0.5, 0.5), vec3.fromValues(0.05, 0.05, 0.05));
        deimosEje.rotar([0,1,0],0.01);
        deimosEje.draw();
        //
        ////////////////////////////////////////////////////////

        ///////////////////////////////////////////////////////
        //
        // Dibujamos a Phobos
        phobosEje.setupShaders();

        // function(lightPosition, ambientColor, diffuseColor)
        phobosEje.setupLighting(vec3.fromValues(-100.0, 0.0, -60.0), vec3.fromValues( 0.5, 0.5, 0.5), vec3.fromValues(0.1, 0.1, 0.1))
        phobosEje.rotar([0,1,0],0.003);
        phobosEje.draw();

        ////////////////////////////////////////////////////////
        //
        // Dibujamos a Marte

        // Configuramos la iluminación
        mars.setupShaders();
        mars.setupLighting(vec3.fromValues(-100.0, 0.0, -60.0), vec3.fromValues(0.3, 0.3, 0.3), vec3.fromValues(0.05, 0.05, 0.05))

        // Matriz de modelado del mars
        var model_matrix_mars = mat4.create();
        mat4.identity(model_matrix_mars);
        mat4.scale(model_matrix_mars, model_matrix_mars, [7.0, 7.0, 7.0]);
        mars.draw(model_matrix_mars);
        //
        ////////////////////////////////////////////////////////
    }
  }




    var CameraMatrix = mat4.create();
    var mvMatrix = mat4.create();
    var mvMatrixStack = [];
    var pMatrix = mat4.create();

    var mouseDown = false;
    var lastMouseX = null;
    var lastMouseY = null;

    var deimos = null;
    var mars = null;
    var phobos = null;

    var deimosRotationMatrix = mat4.create();
    mat4.identity(deimosRotationMatrix);

    var deimosRotationAnglemars = 0.0;
    var phobosRotationAngledeimos = 0.0;

    function mvPushMatrix() {
        var copy = mat4.create();
        mat4.set(mvMatrix, copy);
        mvMatrixStack.push(copy);
    }

    function mvPopMatrix() {
        if (mvMatrixStack.length == 0) {
            throw "Invalid popMatrix!";
        }
        mvMatrix = mvMatrixStack.pop();
    }

    function setViewProjectionMatrix() {
        gl.uniformMatrix4fv(shaderProgramTexturedObject.pMatrixUniform, false, pMatrix);
        gl.uniformMatrix4fv(shaderProgramTexturedObject.ViewMatrixUniform, false, CameraMatrix);
    }


    function degToRad(degrees) {
        return degrees * Math.PI / 180;
    }



    //////////////////////////////////////////////////////////////////////////////
    //////////////////////////////////////////////////////////////////////////////
    //////////////////////////////////////////////////////////////////////////////
    //////////////////////////////////////////////////////////////////////////////
