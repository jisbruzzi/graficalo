
    var gl;

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


    function getShader(gl, id,shaders) {
		let elemento=null;
		for (let i=0; i<shaders.length; i++){
			if(shaders[i].n===id){
				elemento=shaders[i];
			}
		}
		//console.log("a");
		console.log(elemento);
		//console.log(elemento.c);
        if (!elemento) {
            return null;
        }

        let str = elemento["c"];
		//console.log(elemento["c"]);
        let shader;
        if (elemento.t === "x-shader/x-fragment") {
            shader = gl.createShader(gl.FRAGMENT_SHADER);
        } else if (elemento.t === "x-shader/x-vertex") {
            shader = gl.createShader(gl.VERTEX_SHADER);
        } else {
            return null;
        }
        gl.shaderSource(shader, str);
        gl.compileShader(shader);

        if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
            alert(gl.getShaderInfoLog(shader));
            return null;
        }
        return shader;
    }


    var shaderProgramTexturedObject;
    var shaderProgramColoredObject;


       function initShaders(shaders) {

        ////////////////////////////////////////////
        ////////////////////////////////////////////
        //
        // Inicializamos todo lo relacionado con el program shader para
        // renderizar objetos texturados

        var fragmentShaderTexturedObj = getShader(gl, "shader-fs-textured-obj",shaders);
        var vertexShaderTexturedObj = getShader(gl, "shader-vs-textured-obj",shaders);

        shaderProgramTexturedObject = gl.createProgram();
        gl.attachShader(shaderProgramTexturedObject, vertexShaderTexturedObj);
        gl.attachShader(shaderProgramTexturedObject, fragmentShaderTexturedObj);
        gl.linkProgram(shaderProgramTexturedObject);

        if (!gl.getProgramParameter(shaderProgramTexturedObject, gl.LINK_STATUS)) {
            alert("Could not initialise shaders");
        }

        shaderProgramTexturedObject.vertexPositionAttribute = gl.getAttribLocation(shaderProgramTexturedObject, "aVertexPosition");
        gl.enableVertexAttribArray(shaderProgramTexturedObject.vertexPositionAttribute);

        shaderProgramTexturedObject.textureCoordAttribute = gl.getAttribLocation(shaderProgramTexturedObject, "aTextureCoord");
        gl.enableVertexAttribArray(shaderProgramTexturedObject.textureCoordAttribute);

        shaderProgramTexturedObject.vertexNormalAttribute = gl.getAttribLocation(shaderProgramTexturedObject, "aVertexNormal");
        gl.enableVertexAttribArray(shaderProgramTexturedObject.vertexNormalAttribute);

        shaderProgramTexturedObject.pMatrixUniform = gl.getUniformLocation(shaderProgramTexturedObject, "uPMatrix");
        shaderProgramTexturedObject.ViewMatrixUniform = gl.getUniformLocation(shaderProgramTexturedObject, "uViewMatrix");
        shaderProgramTexturedObject.ModelMatrixUniform = gl.getUniformLocation(shaderProgramTexturedObject, "uModelMatrix");
        shaderProgramTexturedObject.nMatrixUniform = gl.getUniformLocation(shaderProgramTexturedObject, "uNMatrix");
        shaderProgramTexturedObject.samplerUniform = gl.getUniformLocation(shaderProgramTexturedObject, "uSampler");
        shaderProgramTexturedObject.useLightingUniform = gl.getUniformLocation(shaderProgramTexturedObject, "uUseLighting");
        shaderProgramTexturedObject.ambientColorUniform = gl.getUniformLocation(shaderProgramTexturedObject, "uAmbientColor");
        shaderProgramTexturedObject.lightingDirectionUniform = gl.getUniformLocation(shaderProgramTexturedObject, "uLightPosition");
        shaderProgramTexturedObject.directionalColorUniform = gl.getUniformLocation(shaderProgramTexturedObject, "uDirectionalColor");

        ////////////////////////////////////////////
        ////////////////////////////////////////////

        ////////////////////////////////////////////
        ////////////////////////////////////////////
        //
        // Inicializamos todo lo relacionado con el program shader para
        // renderizar objetos Coloreados

        var fragmentShaderColoredObj = getShader(gl, "shader-fs-colored-obj",shaders);
        var vertexShaderColoredObj = getShader(gl, "shader-vs-colored-obj",shaders);

        shaderProgramColoredObject = gl.createProgram();
        gl.attachShader(shaderProgramColoredObject, vertexShaderColoredObj);
        gl.attachShader(shaderProgramColoredObject, fragmentShaderColoredObj);
        gl.linkProgram(shaderProgramColoredObject);

        if (!gl.getProgramParameter(shaderProgramColoredObject, gl.LINK_STATUS)) {
            alert("Could not initialise shaders");
        }


        shaderProgramColoredObject.vertexPositionAttribute = gl.getAttribLocation(shaderProgramColoredObject, "aVertexPosition");
        gl.enableVertexAttribArray(shaderProgramColoredObject.vertexPositionAttribute);

        shaderProgramColoredObject.vertexColorAttribute = gl.getAttribLocation(shaderProgramColoredObject, "aVertexColor");
        gl.enableVertexAttribArray(shaderProgramColoredObject.vertexColorAttribute);

        shaderProgramColoredObject.vertexNormalAttribute = gl.getAttribLocation(shaderProgramColoredObject, "aVertexNormal");
        gl.enableVertexAttribArray(shaderProgramColoredObject.vertexNormalAttribute);

        shaderProgramColoredObject.pMatrixUniform = gl.getUniformLocation(shaderProgramColoredObject, "uPMatrix");
        shaderProgramColoredObject.ViewMatrixUniform = gl.getUniformLocation(shaderProgramColoredObject, "uViewMatrix");
        shaderProgramColoredObject.ModelMatrixUniform = gl.getUniformLocation(shaderProgramColoredObject, "uModelMatrix");
        shaderProgramColoredObject.nMatrixUniform = gl.getUniformLocation(shaderProgramColoredObject, "uNMatrix");
        shaderProgramColoredObject.samplerUniform = gl.getUniformLocation(shaderProgramColoredObject, "uSampler");
        shaderProgramColoredObject.useLightingUniform = gl.getUniformLocation(shaderProgramColoredObject, "uUseLighting");
        shaderProgramColoredObject.ambientColorUniform = gl.getUniformLocation(shaderProgramColoredObject, "uAmbientColor");
        shaderProgramColoredObject.lightingDirectionUniform = gl.getUniformLocation(shaderProgramColoredObject, "uLightPosition");
        shaderProgramColoredObject.directionalColorUniform = gl.getUniformLocation(shaderProgramColoredObject, "uDirectionalColor");
    }


    function handleLoadedTexture() {
        gl.pixelStorei(gl.UNPACK_FLIP_Y_WEBGL, true);
        gl.bindTexture(gl.TEXTURE_2D, mars.texture);
        gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, mars.texture.image);
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR_MIPMAP_NEAREST);
        gl.generateMipmap(gl.TEXTURE_2D);

        gl.bindTexture(gl.TEXTURE_2D, null);

        gl.pixelStorei(gl.UNPACK_FLIP_Y_WEBGL, true);
        gl.bindTexture(gl.TEXTURE_2D, deimos.texture);
        gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, deimos.texture.image);
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR_MIPMAP_NEAREST);
        gl.generateMipmap(gl.TEXTURE_2D);

        gl.bindTexture(gl.TEXTURE_2D, null);

        //gl.pixelStorei(gl.UNPACK_FLIP_Y_WEBGL, true);
        //gl.bindTexture(gl.TEXTURE_2D, phobos.texture);
        //gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, phobos.texture.image);
        //gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);
        //gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR_MIPMAP_NEAREST);
        //gl.generateMipmap(gl.TEXTURE_2D);

        //gl.bindTexture(gl.TEXTURE_2D, null);
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

    function ColoredSphere(latitude_bands, longitude_bands){

        this.latitudeBands = latitude_bands;
        this.longitudeBands = longitude_bands;
        
        this.position_buffer = null;
        this.normal_buffer = null;
        this.color_buffer = null;
        this.index_buffer = null;

        this.webgl_position_buffer = null;
        this.webgl_normal_buffer = null;
        this.webgl_color_buffer = null;
        this.webgl_index_buffer = null;
        
        // Se generan los vertices para la esfera, calculando los datos para una esfera de radio 1
        // Y también la información de las normales y coordenadas de textura para cada vertice de la esfera
        // La esfera se renderizara utilizando triangulos, para ello se arma un buffer de índices 
        // a todos los triángulos de la esfera
        this.initBuffers = function(){

            this.position_buffer = [];
            this.normal_buffer = [];
            this.color_buffer = [];

            var latNumber;
            var longNumber;

            for (latNumber=0; latNumber <= this.latitudeBands; latNumber++) {
                var theta = latNumber * Math.PI / this.latitudeBands;
                var sinTheta = Math.sin(theta);
                var cosTheta = Math.cos(theta);

                for (longNumber=0; longNumber <= this.longitudeBands; longNumber++) {
                    var phi = longNumber * 2 * Math.PI / this.longitudeBands;
                    var sinPhi = Math.sin(phi);
                    var cosPhi = Math.cos(phi);

                    var x = cosPhi * sinTheta;
                    var y = cosTheta;
                    var z = sinPhi * sinTheta;
                    var u = 1.0 - (longNumber / this.longitudeBands);
                    var v = 1.0 - (latNumber / this.latitudeBands);

                    this.normal_buffer.push(x);
                    this.normal_buffer.push(y);
                    this.normal_buffer.push(z);

                    // Mejorar o modificar el algoritmo que inicializa
                    // el color de cada vertice
                    this.color_buffer.push(x/2.0)
                    this.color_buffer.push(y/2.0)
                    this.color_buffer.push(z/2.0)
                    
                    this.position_buffer.push(x);
                    this.position_buffer.push(y);
                    this.position_buffer.push(z);
                }
            }

            // Buffer de indices de los triangulos
            this.index_buffer = [];
          
            for (latNumber=0; latNumber < this.latitudeBands; latNumber++) {
                for (longNumber=0; longNumber < this.longitudeBands; longNumber++) {
                    var first = (latNumber * (this.longitudeBands + 1)) + longNumber;
                    var second = first + this.longitudeBands + 1;
                    this.index_buffer.push(first);
                    this.index_buffer.push(second);
                    this.index_buffer.push(first + 1);

                    this.index_buffer.push(second);
                    this.index_buffer.push(second + 1);
                    this.index_buffer.push(first + 1);
                }
            }

            // Creación e Inicialización de los buffers a nivel de OpenGL
            this.webgl_normal_buffer = gl.createBuffer();
            gl.bindBuffer(gl.ARRAY_BUFFER, this.webgl_normal_buffer);
            gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(this.normal_buffer), gl.STATIC_DRAW);
            this.webgl_normal_buffer.itemSize = 3;
            this.webgl_normal_buffer.numItems = this.normal_buffer.length / 3;

            this.webgl_color_buffer = gl.createBuffer();
            gl.bindBuffer(gl.ARRAY_BUFFER, this.webgl_color_buffer);
            gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(this.color_buffer), gl.STATIC_DRAW);
            this.webgl_color_buffer.itemSize = 3;
            this.webgl_color_buffer.numItems = this.webgl_color_buffer.length / 3;

            this.webgl_position_buffer = gl.createBuffer();
            gl.bindBuffer(gl.ARRAY_BUFFER, this.webgl_position_buffer);
            gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(this.position_buffer), gl.STATIC_DRAW);
            this.webgl_position_buffer.itemSize = 3;
            this.webgl_position_buffer.numItems = this.position_buffer.length / 3;

            this.webgl_index_buffer = gl.createBuffer();
            gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, this.webgl_index_buffer);
            gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, new Uint16Array(this.index_buffer), gl.STATIC_DRAW);
            this.webgl_index_buffer.itemSize = 1;
            this.webgl_index_buffer.numItems = this.index_buffer.length;
        }

        this.setupShaders = function(){
            gl.useProgram(shaderProgramColoredObject);
        }

        this.setupLighting = function(lightPosition, ambientColor, diffuseColor){
            ////////////////////////////////////////////////////
            // Configuración de la luz
            // Se inicializan las variables asociadas con la Iluminación
            var lighting;
            lighting = true;
            gl.uniform1i(shaderProgramColoredObject.useLightingUniform, lighting);       

            gl.uniform3fv(shaderProgramColoredObject.lightingDirectionUniform, lightPosition);
            gl.uniform3fv(shaderProgramColoredObject.ambientColorUniform, ambientColor );
            gl.uniform3fv(shaderProgramColoredObject.directionalColorUniform, diffuseColor);
        }

        this.draw = function(modelMatrix){

            gl.uniformMatrix4fv(shaderProgramColoredObject.pMatrixUniform, false, pMatrix);
            gl.uniformMatrix4fv(shaderProgramColoredObject.ViewMatrixUniform, false, CameraMatrix); 

            // Se configuran los buffers que alimentarán el pipeline
            gl.bindBuffer(gl.ARRAY_BUFFER, this.webgl_position_buffer);
            gl.vertexAttribPointer(shaderProgramColoredObject.vertexPositionAttribute, this.webgl_position_buffer.itemSize, gl.FLOAT, false, 0, 0);

            gl.bindBuffer(gl.ARRAY_BUFFER, this.webgl_color_buffer);
            gl.vertexAttribPointer(shaderProgramColoredObject.vertexColorAttribute, this.webgl_color_buffer.itemSize, gl.FLOAT, false, 0, 0);

            gl.bindBuffer(gl.ARRAY_BUFFER, this.webgl_normal_buffer);
            gl.vertexAttribPointer(shaderProgramColoredObject.vertexNormalAttribute, this.webgl_normal_buffer.itemSize, gl.FLOAT, false, 0, 0);


            gl.uniformMatrix4fv(shaderProgramColoredObject.ModelMatrixUniform, false, modelMatrix);
            var normalMatrix = mat3.create();
            mat3.fromMat4(normalMatrix, modelMatrix);
            mat3.invert(normalMatrix, normalMatrix);
            mat3.transpose(normalMatrix, normalMatrix);
            gl.uniformMatrix3fv(shaderProgramColoredObject.nMatrixUniform, false, normalMatrix);

         
            gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, this.webgl_index_buffer);
            //gl.drawElements(gl.LINE_LOOP, this.webgl_index_buffer.numItems, gl.UNSIGNED_SHORT, 0);
            gl.drawElements(gl.TRIANGLES, this.webgl_index_buffer.numItems, gl.UNSIGNED_SHORT, 0);
            /////////////////////////////////
        }
        
    }


    function TexturedSphere(latitude_bands, longitude_bands){

        this.latitudeBands = latitude_bands;
        this.longitudeBands = longitude_bands;
        
        this.position_buffer = null;
        this.normal_buffer = null;
        this.texture_coord_buffer = null;
        this.index_buffer = null;

        this.webgl_position_buffer = null;
        this.webgl_normal_buffer = null;
        this.webgl_texture_coord_buffer = null;
        this.webgl_index_buffer = null;
        
        this.texture = null;

        this.initTexture = function(texture_file){
            
            var aux_texture = gl.createTexture();
            this.texture = aux_texture;
            this.texture.image = new Image();

            this.texture.image.onload = function () {
                   handleLoadedTexture()
            }
            this.texture.image.src = texture_file;
        }


        // Se generan los vertices para la esfera, calculando los datos para una esfera de radio 1
        // Y también la información de las normales y coordenadas de textura para cada vertice de la esfera
        // La esfera se renderizara utilizando triangulos, para ello se arma un buffer de índices 
        // a todos los triángulos de la esfera
        this.initBuffers = function(){

            this.position_buffer = [];
            this.normal_buffer = [];
            this.texture_coord_buffer = [];

            var latNumber;
            var longNumber;

            for (latNumber=0; latNumber <= this.latitudeBands; latNumber++) {
                var theta = latNumber * Math.PI / this.latitudeBands;
                var sinTheta = Math.sin(theta);
                var cosTheta = Math.cos(theta);

                for (longNumber=0; longNumber <= this.longitudeBands; longNumber++) {
                    var phi = longNumber * 2 * Math.PI / this.longitudeBands;
                    var sinPhi = Math.sin(phi);
                    var cosPhi = Math.cos(phi);

                    var x = cosPhi * sinTheta;
                    var y = cosTheta;
                    var z = sinPhi * sinTheta;
                    var u = 1.0 - (longNumber / this.longitudeBands);
                    var v = 1.0 - (latNumber / this.latitudeBands);

                    this.normal_buffer.push(x);
                    this.normal_buffer.push(y);
                    this.normal_buffer.push(z);

                    this.texture_coord_buffer.push(u);
                    this.texture_coord_buffer.push(v);
                    
                    this.position_buffer.push(x);
                    this.position_buffer.push(y);
                    this.position_buffer.push(z);
                }
            }

            // Buffer de indices de los triangulos
            this.index_buffer = [];
          
            for (latNumber=0; latNumber < this.latitudeBands; latNumber++) {
                for (longNumber=0; longNumber < this.longitudeBands; longNumber++) {
                    var first = (latNumber * (this.longitudeBands + 1)) + longNumber;
                    var second = first + this.longitudeBands + 1;
                    this.index_buffer.push(first);
                    this.index_buffer.push(second);
                    this.index_buffer.push(first + 1);

                    this.index_buffer.push(second);
                    this.index_buffer.push(second + 1);
                    this.index_buffer.push(first + 1);
                }
            }

            // Creación e Inicialización de los buffers a nivel de OpenGL
            this.webgl_normal_buffer = gl.createBuffer();
            gl.bindBuffer(gl.ARRAY_BUFFER, this.webgl_normal_buffer);
            gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(this.normal_buffer), gl.STATIC_DRAW);
            this.webgl_normal_buffer.itemSize = 3;
            this.webgl_normal_buffer.numItems = this.normal_buffer.length / 3;

            this.webgl_texture_coord_buffer = gl.createBuffer();
            gl.bindBuffer(gl.ARRAY_BUFFER, this.webgl_texture_coord_buffer);
            gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(this.texture_coord_buffer), gl.STATIC_DRAW);
            this.webgl_texture_coord_buffer.itemSize = 2;
            this.webgl_texture_coord_buffer.numItems = this.texture_coord_buffer.length / 2;

            this.webgl_position_buffer = gl.createBuffer();
            gl.bindBuffer(gl.ARRAY_BUFFER, this.webgl_position_buffer);
            gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(this.position_buffer), gl.STATIC_DRAW);
            this.webgl_position_buffer.itemSize = 3;
            this.webgl_position_buffer.numItems = this.position_buffer.length / 3;

            this.webgl_index_buffer = gl.createBuffer();
            gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, this.webgl_index_buffer);
            gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, new Uint16Array(this.index_buffer), gl.STATIC_DRAW);
            this.webgl_index_buffer.itemSize = 1;
            this.webgl_index_buffer.numItems = this.index_buffer.length;
        }

        this.setupShaders = function(){
            gl.useProgram(shaderProgramTexturedObject);
        }

        this.setupLighting = function(lightPosition, ambientColor, diffuseColor){
            ////////////////////////////////////////////////////
            // Configuración de la luz
            // Se inicializan las variables asociadas con la Iluminación
            var lighting;
            lighting = true;
            gl.uniform1i(shaderProgramTexturedObject.useLightingUniform, lighting);       

            gl.uniform3fv(shaderProgramTexturedObject.lightingDirectionUniform, lightPosition);
            gl.uniform3fv(shaderProgramTexturedObject.ambientColorUniform, ambientColor );
            gl.uniform3fv(shaderProgramTexturedObject.directionalColorUniform, diffuseColor);
        }

        this.draw = function(modelMatrix){
         
            // setViewProjectionMatrix();
            gl.uniformMatrix4fv(shaderProgramTexturedObject.pMatrixUniform, false, pMatrix);
            gl.uniformMatrix4fv(shaderProgramTexturedObject.ViewMatrixUniform, false, CameraMatrix); 
            
            // Se configuran los buffers que alimentarán el pipeline
            gl.bindBuffer(gl.ARRAY_BUFFER, this.webgl_position_buffer);
            gl.vertexAttribPointer(shaderProgramTexturedObject.vertexPositionAttribute, this.webgl_position_buffer.itemSize, gl.FLOAT, false, 0, 0);

            gl.bindBuffer(gl.ARRAY_BUFFER, this.webgl_texture_coord_buffer);
            gl.vertexAttribPointer(shaderProgramTexturedObject.textureCoordAttribute, this.webgl_texture_coord_buffer.itemSize, gl.FLOAT, false, 0, 0);

            gl.bindBuffer(gl.ARRAY_BUFFER, this.webgl_normal_buffer);
            gl.vertexAttribPointer(shaderProgramTexturedObject.vertexNormalAttribute, this.webgl_normal_buffer.itemSize, gl.FLOAT, false, 0, 0);

            gl.activeTexture(gl.TEXTURE0);
            gl.bindTexture(gl.TEXTURE_2D, this.texture);
            gl.uniform1i(shaderProgramTexturedObject.samplerUniform, 0);

            gl.uniformMatrix4fv(shaderProgramTexturedObject.ModelMatrixUniform, false, modelMatrix);
            var normalMatrix = mat3.create();
            mat3.fromMat4(normalMatrix, modelMatrix);
            mat3.invert(normalMatrix, normalMatrix);
            mat3.transpose(normalMatrix, normalMatrix);
            gl.uniformMatrix3fv(shaderProgramTexturedObject.nMatrixUniform, false, normalMatrix);

            gl.bindTexture(gl.TEXTURE_2D, this.texture);
            
            gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, this.webgl_index_buffer);
            //gl.drawElements(gl.LINE_LOOP, this.webgl_index_buffer.numItems, gl.UNSIGNED_SHORT, 0);
            gl.drawElements(gl.TRIANGLES, this.webgl_index_buffer.numItems, gl.UNSIGNED_SHORT, 0);
            /////////////////////////////////
        }
        
    }


    function drawScene() {
	
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



    function webGLStart() {
		cargarShaders(function(shaders){
			var canvas = document.getElementById("clase03-vertex shader");
			initGL(canvas);
			initShaders(shaders);

			deimos = new ColoredSphere(64, 64);
			deimos.initBuffers();
	
			mars = new TexturedSphere(64,64);
			mars.initBuffers();
			mars.initTexture("mars_1k_color.jpg");
	
			phobos = new ColoredSphere(64, 64);
			phobos.initBuffers();
			
			gl.clearColor(0.0, 0.0, 0.0, 1.0);
			gl.enable(gl.DEPTH_TEST);
			
			tick();
		});
    }