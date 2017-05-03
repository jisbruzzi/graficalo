//TIENE HANDLE LOAD TEXTURE Y TEXTUREDSPHERE



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












    function TexturedSphere(latitude_bands, longitude_bands){

        this.latitudeBands = latitude_bands;
        this.longitudeBands = longitude_bands;

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
          var forma = new FormaEsfera(this.latitudeBands,this.longitudeBands);

            // Creación e Inicialización de los buffers a nivel de OpenGL

          this.webgl_normal_buffer = new GlNormalBuffer(gl).aPartirDe(forma.normal_buffer);
          this.webgl_texture_coord_buffer = new GlTextureCoordBuffer(gl).aPartirDe(forma.texture_coord_buffer);
          this.webgl_position_buffer = new GlPositionBuffer(gl).aPartirDe(forma.position_buffer);
          this.webgl_index_buffer = new GlIndexBuffer(gl).aPartirDe(forma.index_buffer);
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
            this.webgl_position_buffer.asignarAtributoShader(shaderProgramTexturedObject.vertexPositionAttribute);
            this.webgl_texture_coord_buffer.asignarAtributoShader(shaderProgramTexturedObject.textureCoordAttribute);
            this.webgl_normal_buffer.asignarAtributoShader(shaderProgramTexturedObject.vertexNormalAttribute);

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

            this.webgl_index_buffer.dibujar();
        }

    }
