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
	Glizable(forma,gl);
	forma.glizar();

	const atributosPosibles=["aVertexPosition","aTextureCoord","aVertexNormal","aVertexColor","aAlturaBase","aAlturaSobre","aAltura"];
	const nombresLegibles=["position_buffer","texture_coord_buffer","normal_buffer","color_buffer"]




	let listaLuces=[];
	let luzGlobal=new ParametrosLuzGlobal();
	let camara;

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

		///ESTE 1FV ES EL QUE TIRA EL WARNING ANALIZAR BIEN!!
		let listaConcentraciones = desplegarParametroDeLuz(function(l){return [l.concentracion]},1);
		gl.uniform1fv(shaderProgram.uConcentracion, new Float32Array(listaConcentraciones));

		let listaDistancia = desplegarParametroDeLuz(function(l){return [l.distanciaIluminada]},1);
		gl.uniform1fv(shaderProgram.uDistanciaIluminada, new Float32Array(listaDistancia));

		let listaColores = desplegarParametroDeLuz(function(l){return l.color},3);
		gl.uniform3fv(shaderProgram.uColorLuz, listaColores);


		gl.uniform3fv(shaderProgram.uColorAmbiente, luzGlobal.colorAmbiente );
		gl.uniform3fv(shaderProgram.uColorLuzGlobal, luzGlobal.colorLuzGlobal);
		gl.uniform3fv(shaderProgram.uDireccionLuzGlobal, luzGlobal.direccionLuzGlobal);
		gl.uniform3fv(shaderProgram.uColorCielo, luzGlobal.colorCielo);

	}

	this.draw = function(modelMatrix){
		if(camara==null){
			throw "No tengo cámara, no puedo dibujarme. Proveer cámara justo antes de dibujar, siempre.";
		}

		// setViewProjectionMatrix();
		gl.uniformMatrix4fv(shaderProgram.uPMatrix, false, camara.obtenerMatrizProyeccion());
		gl.uniformMatrix4fv(shaderProgram.uViewMatrix, false, camara.obtenerMatrizCamara());

		let asigne=[]
		Object.keys(shaderProgram.attributes).forEach(function(s){
			if(forma[s]===undefined){
				console.log(forma);
				throw "esta forma no define un atributo "+s;
			}else{
				forma[s]().asignarAtributoShader(shaderProgram.attributes[s]);
				asigne.push(s);
			}
		});


		if(shaderProgram.uPosMundoCamara!=undefined){
			gl.uniform3fv(shaderProgram.uPosMundoCamara, camara.getPosicion());
		}


		let nroTexturasUsadas=0;
		for(let nombre in FormaMultitexturable(forma).samplers){
			if(shaderProgram[nombre] != undefined){

				if (nroTexturasUsadas>=32){
					throw "estas usando demasiados samplers, permito maximo 32";
				}
				gl.activeTexture(gl["TEXTURE"+nroTexturasUsadas]);
				gl.bindTexture(gl.TEXTURE_2D, forma.samplers[nombre]);
				gl.uniform1i(shaderProgram[nombre], nroTexturasUsadas);
				nroTexturasUsadas+=1;
			}
		}


		/*

		if(forma.uSamplerBase!=undefined && shaderProgram.uSamplerBase!=undefined){
			gl.activeTexture(gl.TEXTURE0);
			gl.bindTexture(gl.TEXTURE_2D, forma.uSamplerBase());
			gl.uniform1i(shaderProgram.uSamplerBase, 0);
		}

		if(forma.uSamplerSobre && shaderProgram.uSamplerSobre!=undefined){
			gl.activeTexture(gl.TEXTURE1);
			gl.bindTexture(gl.TEXTURE_2D, forma.uSamplerSobre());
			gl.uniform1i(shaderProgram.uSamplerSobre, 1);
		}
		*/

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
		//console.log(forma);
		if(FormaDibujable(forma).dibujable){
			shaderProgram.usar();
			this.setupLighting();
			this.setupUniforms(uniforms);
			this.draw(modelMatrix);
			shaderProgram.disableAttributes();
		}
	}

	this.configurarIluminacion=function(listaLucesNueva,luzGlobalNueva){
		listaLuces = listaLucesNueva;
		luzGlobal = luzGlobalNueva;
	}

	this.configurarCamara=function(nuevaCamara){
		camara=nuevaCamara;
	}

}
