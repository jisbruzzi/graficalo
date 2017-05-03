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