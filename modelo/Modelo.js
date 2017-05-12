/**
ESTO FALTA ENGENCHARLO PERO LA IDEA ES QUE TODOS LOS OBJETOS RECIBEN ALGÚN Modelo
EL OBJETO DEFINE DÓNDE
EL MODELO DEFINE CÓMO SE DIBUJA
LA FORMA TIENE LOS BUFFERS Q SE CARGAN UNA SOLA VEZ

VARIOS MODELOS PUEDEN COMPÁRTIR LA MISMA FORMA
VARIOS MODELOS PUEDEN COMPARTIR EL MISMO SHADERPROGRAM
VARIOS OBJETOS PUEDEN COMPARTIR EL MISMO MODELO
*/


function Modelo(forma,shaderProgram,gl){
	let lightPosition =vec3.create();
	let ambientColor =vec3.create();
	let diffuseColor =vec3.create();
	let camara;

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
		if(camara==null){
			throw "No tengo cámara, no puedo dibujarme. Proveer cámara justo antes de dibujar, siempre.";
		}

		// setViewProjectionMatrix();
		gl.uniformMatrix4fv(shaderProgram.uPMatrix, false, camara.obtenerMatrizProyeccion());
		gl.uniformMatrix4fv(shaderProgram.uViewMatrix, false, camara.obtenerMatrizCamara());

		posibles=["aVertexPosition","aTextureCoord","aVertexNormal","aVertexColor"];
		posibles.forEach(function(s){
			if(forma[s]!=undefined && shaderProgram[s]!=undefined){
				forma[s]().asignarAtributoShader(shaderProgram[s]);
			}
		});

		//ahora sólo soporto 1 textura por shaderprogram, YAGNI
		if(forma.obtenerTextura && shaderProgram.uSampler!=undefined){
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

		if(forma.obtenerTextura && shaderProgram.uSampler!=undefined){
			gl.bindTexture(gl.TEXTURE_2D, forma.obtenerTextura());
		}
		if(forma.modoDibujado == undefined){
			forma.getIndexBuffer().dibujar();
		}else{
			forma.getIndexBuffer().dibujarModo(forma.modoDibujado());
		}

	};

	this.dibujar=function(modelMatrix){
		this.setupShaders();
		this.setupLighting(lightPosition, ambientColor, diffuseColor);
		this.draw(modelMatrix);
	}

	this.configurarIluminacion=function(lightPositionNueva, ambientColorNueva, diffuseColorNueva){
		lightPosition=lightPositionNueva;
		ambientColor=ambientColorNueva;
		diffuseColor=diffuseColorNueva;
	}

	this.configurarCamara=function(nuevaCamara){
		//console.log("tengo camara!");
		camara=nuevaCamara;
	}
}
