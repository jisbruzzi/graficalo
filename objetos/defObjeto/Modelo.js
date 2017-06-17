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
	const atributosPosibles=["aVertexPosition","aTextureCoord","aVertexNormal","aVertexColor"];
	const nombresLegibles=["position_buffer","texture_coord_buffer","normal_buffer","color_buffer"]

	function glizarForma(){
		if(forma.glizada!=undefined && forma.glizada) return;

		forma.glizada=true;

		//generar los buffers de opengl
		if(forma.position_buffer!=undefined){
			let webgl_position_buffer = new GlPositionBuffer(gl).aPartirDe(forma.position_buffer);
			forma.aVertexPosition=getter(webgl_position_buffer);
		}
		if(forma.normal_buffer!=undefined){
			let glb = new GlNormalBuffer(gl).aPartirDe(forma.normal_buffer);
			forma.aVertexNormal=getter(glb);
		}
		if(forma.color_buffer!=undefined){
			let glb = new GlColorBuffer(gl).aPartirDe(forma.color_buffer);
			forma.aVertexColor=getter(glb);
		}
		if(forma.texture_coord_buffer!=undefined){
			let glb = new GlTextureCoordBuffer(gl).aPartirDe(forma.texture_coord_buffer);
			forma.aTextureCoord=getter(glb);
		}
		if(forma.index_buffer!=undefined){
			let glb = new GlIndexBuffer(gl).aPartirDe(forma.index_buffer);
			forma.getIndexBuffer=getter(glb);
		}
	}

	glizarForma();




	let listaLuces=[];
	let luzGlobal=new ParametrosLuzGlobal();
	let camara;

	this.setupShaders = function(){
		shaderProgram.usar();
	}

	function desplegarParametroDeLuz(f,componentes){
		const CANT_LUCES=2;

		let ret=[];
		for (luz of listaLuces) {
			let res = f(luz);
			ret=ret.concat(Array.prototype.slice.call(res));
		}

		while (ret.length<CANT_LUCES*componentes){
			ret.push(0);
		}

		return ret;
	}

	this.setupLighting = function(){

		//-- si se usa iluminación --//
		let lighting = true;
		if (forma.esIluminado != undefined){
			lighting = forma.esIluminado();
		}
		gl.uniform1i(shaderProgram.uUseLighting, lighting);

		//-- desplegar los parámetros de las luces --//

		let listaPosiciones=desplegarParametroDeLuz(function(l){return l.obtenerPosicionFinal()},3);
		gl.uniform3fv(shaderProgram.uLightPosition, listaPosiciones);

		let listaHacia = desplegarParametroDeLuz(function(l){return l.obtenerHaciaFinal()},3);
		gl.uniform3fv(shaderProgram.uDireccionLuz, listaHacia);

		let listaConcentraciones = desplegarParametroDeLuz(function(l){return l.concentracion},1);
		gl.uniform1fv(shaderProgram.uDireccionLuz, listaConcentraciones);

		let listaDistancia = desplegarParametroDeLuz(function(l){return [l.distanciaIluminada]},1);
		gl.uniform1fv(shaderProgram.uDistanciaIluminada, listaDistancia);

		let listaColores = desplegarParametroDeLuz(function(l){return l.color},3);
		gl.uniform1fv(shaderProgram.uColorLuz, listaColores);



		gl.uniform3fv(shaderProgram.uAmbientColor, [1,1,1] );

		gl.uniform3fv(shaderProgram.uDirectionalColor, [1,0,0]);
	}

	this.draw = function(modelMatrix){
		if(camara==null){
			throw "No tengo cámara, no puedo dibujarme. Proveer cámara justo antes de dibujar, siempre.";
		}

		// setViewProjectionMatrix();
		gl.uniformMatrix4fv(shaderProgram.uPMatrix, false, camara.obtenerMatrizProyeccion());
		gl.uniformMatrix4fv(shaderProgram.uViewMatrix, false, camara.obtenerMatrizCamara());


		atributosPosibles.forEach(function(s){
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


		if(shaderProgram.uPosMundoCamara!=undefined){
			gl.uniform3fv(shaderProgram.uPosMundoCamara, camara.getPosicion());
		}

		if(forma.uSamplerBase && shaderProgram.uSamplerBase!=undefined){
			gl.activeTexture(gl.TEXTURE0);
			gl.bindTexture(gl.TEXTURE_2D, forma.uSamplerBase());
			gl.uniform1i(shaderProgram.uSampler, 0);
		}

		if(forma.uSamplerSobre && shaderProgram.uSamplerSobre!=undefined){
			gl.activeTexture(gl.TEXTURE1);
			gl.bindTexture(gl.TEXTURE_2D, forma.uSamplerSobre());
			gl.uniform1i(shaderProgram.uSamplerSobre, 1);
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

	this.setupUniforms=function(uniforms){
		uniforms.forEach(function(u){
			if(shaderProgram[u.nombre]!=undefined){
				gl.uniform1f(shaderProgram[u.nombre],u.valor);
			}
		});
	}

	this.dibujar=function(modelMatrix,uniforms){
		this.setupShaders();
		this.setupLighting();
		this.setupUniforms(uniforms);
		this.draw(modelMatrix);
	}

	this.configurarIluminacion=function(listaLucesNueva,luzGlobalNueva){
		listaLuces = listaLucesNueva;
		luzGlobal = luzGlobalNueva;
	}

	this.configurarCamara=function(nuevaCamara){
		//console.log("tengo camara!");
		camara=nuevaCamara;
	}
}
