
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
        deimos.setupShaders();

        // function(lightPosition, ambientColor, diffuseColor)
        deimos.setupLighting(vec3.fromValues(-100.0, 0.0, -60.0), vec3.fromValues(0.5, 0.5, 0.5), vec3.fromValues(0.05, 0.05, 0.05))

        // Matriz de modelado

        var model_matrix_deimos = mat4.create();
        mat4.identity(model_matrix_deimos)        ;
        var translate_deimos = mat4.create();
        mat4.identity(translate_deimos);
        mat4.translate(translate_deimos, translate_deimos, [10, 0, 0 ]);


        // Matriz de rotación del eje sobre el plano de la eclíptica a 23 grados
        var axis_inclination_matrix = mat4.create();
        mat4.identity(axis_inclination_matrix);
        mat4.rotate(axis_inclination_matrix, axis_inclination_matrix, -0.4014, [0, 0, 1]);

        var translation_movement = mat4.create();
        var inverse_translation_movement = mat4.create();

        mat4.identity(translation_movement);
        mat4.identity(inverse_translation_movement);

        mat4.rotate(translation_movement, translation_movement, deimosRotationAnglemars, [0, 1, 0]);
        mat4.rotate(inverse_translation_movement, inverse_translation_movement, -deimosRotationAnglemars, [0, 1, 0]);

        // Las transformaciones
        mat4.multiply(model_matrix_deimos, model_matrix_deimos, translation_movement);
        mat4.multiply(model_matrix_deimos, model_matrix_deimos, translate_deimos);
        mat4.multiply(model_matrix_deimos, model_matrix_deimos, inverse_translation_movement);
        mat4.multiply(model_matrix_deimos, model_matrix_deimos, axis_inclination_matrix);
        mat4.multiply(model_matrix_deimos, model_matrix_deimos, deimosRotationMatrix);

        var scale_deimos_matrix = mat4.create();
        mat4.identity(scale_deimos_matrix);
        mat4.scale(scale_deimos_matrix, scale_deimos_matrix, [1.8, 1.8, 1.8]);

        mat4.multiply(model_matrix_deimos, model_matrix_deimos, scale_deimos_matrix);

        deimos.draw(model_matrix_deimos);
        //
        ////////////////////////////////////////////////////////

        ///////////////////////////////////////////////////////
        //
        // Dibujamos a Phobos
        phobos.setupShaders();

        // function(lightPosition, ambientColor, diffuseColor)
        phobos.setupLighting(vec3.fromValues(-100.0, 0.0, -60.0), vec3.fromValues( 0.5, 0.5, 0.5), vec3.fromValues(0.1, 0.1, 0.1))

        // Matriz de modelado
        var model_matrix_phobos = mat4.create();
        mat4.identity(model_matrix_phobos);

        // Traslación de Deimos respecto de Marte
        // Es la traslación que lo pone en órbita
        var phobos_transalte_from_deimos_matrix = mat4.create();
        mat4.identity(phobos_transalte_from_deimos_matrix);
        mat4.translate(phobos_transalte_from_deimos_matrix, phobos_transalte_from_deimos_matrix, [25, 0,0]);


        var phobos_rotation_matrix = mat4.create();
        mat4.identity(phobos_rotation_matrix);
        mat4.rotate(phobos_rotation_matrix, phobos_rotation_matrix, phobosRotationAngledeimos, [0, 1 , 0]);

        // Secuencia de transformaciones
        mat4.multiply(model_matrix_phobos, model_matrix_phobos, phobos_rotation_matrix);
        mat4.multiply(model_matrix_phobos, model_matrix_phobos, phobos_transalte_from_deimos_matrix);
        mat4.multiply(model_matrix_phobos, model_matrix_phobos, phobos_rotation_matrix);

        var scale_phobos_matrix = mat4.create();
        mat4.identity(scale_phobos_matrix);
        mat4.scale(scale_phobos_matrix, scale_phobos_matrix, [1.0, 0.84, 0.7]);

        mat4.multiply(model_matrix_phobos, model_matrix_phobos, scale_phobos_matrix);

        phobos.draw(model_matrix_phobos);

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
