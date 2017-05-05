    function ColoredSphere(latitude_bands, longitude_bands){
		let forma = new FormaEsfera(latitude_bands,longitude_bands);
        this.latitudeBands = latitude_bands;
        this.longitudeBands = longitude_bands;

        this.webgl_position_buffer = null;
        this.webgl_normal_buffer = null;
        this.webgl_color_buffer = null;
        this.webgl_index_buffer = null;

        // Se generan los vertices para la esfera, calculando los datos para una esfera de radio 1
        // Y también la información de las normales y coordenadas de textura para cada vertice de la esfera
        // La esfera se renderizara utilizando triangulos, para ello se arma un buffer de índices
        // a todos los triángulos de la esfera
        this.initBuffers = function(){
            
            // Creación e Inicialización de los buffers a nivel de OpenGL
        }

        this.setupShaders = function(){
            shaderProgramColoredObject.usar();
        }

        this.setupLighting = function(lightPosition, ambientColor, diffuseColor){
            ////////////////////////////////////////////////////
            // Configuración de la luz
            // Se inicializan las variables asociadas con la Iluminación
            var lighting;
            lighting = true;
            gl.uniform1i(shaderProgramColoredObject.uUseLighting, lighting);

            gl.uniform3fv(shaderProgramColoredObject.uLightPosition, lightPosition);
            gl.uniform3fv(shaderProgramColoredObject.uAmbientColor, ambientColor );
            gl.uniform3fv(shaderProgramColoredObject.uDirectionalColor, diffuseColor);
        }

        this.draw = function(modelMatrix){

            gl.uniformMatrix4fv(shaderProgramColoredObject.uPMatrix, false, pMatrix);
            gl.uniformMatrix4fv(shaderProgramColoredObject.uViewMatrix, false, CameraMatrix);

            // Se configuran los buffers que alimentarán el pipeline
            forma.getColorBuffer().asignarAtributoShader(shaderProgramColoredObject["aVertexColor"]);
			forma.getPositionBuffer().asignarAtributoShader(shaderProgramColoredObject["aVertexPosition"]);
            forma.getNormalBuffer().asignarAtributoShader(shaderProgramColoredObject["aVertexNormal"]);


            gl.uniformMatrix4fv(shaderProgramColoredObject.uModelMatrix, false, modelMatrix);
            var normalMatrix = mat3.create();
            mat3.fromMat4(normalMatrix, modelMatrix);
            mat3.invert(normalMatrix, normalMatrix);
            mat3.transpose(normalMatrix, normalMatrix);
            gl.uniformMatrix3fv(shaderProgramColoredObject.uNMatrix, false, normalMatrix);


            forma.getIndexBuffer().dibujar();
        }

    }