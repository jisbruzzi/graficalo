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
            var forma = new FormaEsfera(this.latitudeBands,this.longitudeBands);


            this.normal_buffer = forma.normal_buffer;
            this.color_buffer = forma.color_buffer;
            this.index_buffer = forma.index_buffer;
            this.position_buffer = forma.position_buffer;

            // Creación e Inicialización de los buffers a nivel de OpenGL
            this.webgl_normal_buffer = new GlNormalBuffer(gl).aPartirDe(forma.normal_buffer);
            this.webgl_color_buffer = new GlColorBuffer(gl).aPartirDe(forma.color_buffer);
            this.webgl_position_buffer = new GlPositionBuffer(gl).aPartirDe(forma.position_buffer);
            this.webgl_index_buffer = new GlIndexBuffer(gl).aPartirDe(forma.index_buffer);
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
            this.webgl_position_buffer.asignarAtributoShader(shaderProgramTexturedObject.vertexPositionAttribute);
            this.webgl_color_buffer.asignarAtributoShader(shaderProgramTexturedObject.vertexColorAttribute);
            this.webgl_normal_buffer.asignarAtributoShader(shaderProgramTexturedObject.vertexNormalAttribute);


            gl.uniformMatrix4fv(shaderProgramColoredObject.ModelMatrixUniform, false, modelMatrix);
            var normalMatrix = mat3.create();
            mat3.fromMat4(normalMatrix, modelMatrix);
            mat3.invert(normalMatrix, normalMatrix);
            mat3.transpose(normalMatrix, normalMatrix);
            gl.uniformMatrix3fv(shaderProgramColoredObject.nMatrixUniform, false, normalMatrix);


            this.webgl_index_buffer.dibujar();
        }

    }