/**
ESTO FALTA ENGENCHARLO PERO LA IDEA ES QUE TODOS LOS OBJETOS RECIBEN ALGÚN Modelo
EL OBJETO DEFINE DÓNDE
EL MODELO DEFINE CÓMO SE DIBUJA
LA FORMA TIENE LOS BUFFERS Q SE CARGAN UNA SOLA VEZ

VARIOS MODELOS PUEDEN COMPÁRTIR LA MISMA FORMA
VARIOS MODELOS PUEDEN COMPARTIR EL MISMO SHADERPROGRAM
VARIOS OBJETOS PUEDEN COMPARTIR EL MISMO MODELO
*/


function Modelo(forma,shaderProgram){
	this.setupShaders = function(){
        shaderProgram.usar();
	}

	this.setupLighting = function(lightPosition, ambientColor, diffuseColor){
		////////////////////////////////////////////////////
		// Configuración de la luz
		// Se inicializan las variables asociadas con la Iluminación
		var lighting;
		lighting = true;
		gl.uniform1i(shaderProgram.uUseLighting, lighting);

		gl.uniform3fv(shaderProgram.uLightPosition, lightPosition);
		gl.uniform3fv(shaderProgram.uAmbientColor, ambientColor );
		gl.uniform3fv(shaderProgram.uDirectionalColor, diffuseColor);
	}

	this.draw = function(modelMatrix){
		// setViewProjectionMatrix();
		gl.uniformMatrix4fv(shaderProgram.uPMatrix, false, pMatrix);
		gl.uniformMatrix4fv(shaderProgram.uViewMatrix, false, CameraMatrix);

		posibles=["aVertexPosition","aTextureCoord","aVertexNormal","aVertexColor"];
		posibles.forEach(function(s){
			if(forma[s]!=undefined && shaderProgram[s]!=undefined){
				forma[s]().asignarAtributoShader(shaderProgram[s]);
			}
		});

		//ahora sólo soporto 1 textura por shaderprogram, YAGNI
		if(forma.obtenerTextura){
			gl.activeTexture(gl.TEXTURE0);
			gl.bindTexture(gl.TEXTURE_2D, forma.obtenerTextura());
			gl.uniform1i(shaderProgram.uSampler, 0);
		}

		gl.uniformMatrix4fv(shaderProgram.uModelMatrix, false, modelMatrix);
		var normalMatrix = mat3.create();
		mat3.fromMat4(normalMatrix, modelMatrix);
		mat3.invert(normalMatrix, normalMatrix);
		mat3.transpose(normalMatrix, normalMatrix);
		gl.uniformMatrix3fv(shaderProgram.uNMatrix, false, normalMatrix);

		if(forma.obtenerTextura){
			gl.bindTexture(gl.TEXTURE_2D, forma.obtenerTextura());
		}

		forma.getIndexBuffer().dibujar();
	}
}
