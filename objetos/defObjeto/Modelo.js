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

		//console.log(shaderProgram.attributes);
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
/*
		let asignados = [];
		let atributosShaderProgram=[];
		atributosPosibles.forEach(function(s){
			if(shaderProgram[s]!=undefined){
				atributosShaderProgram.push(s);
			}
			if(forma[s]!=undefined && shaderProgram[s]!=undefined){
				//console.log("Asigno "+s);
				forma[s]().asignarAtributoShader(shaderProgram[s]);
				asignados.push(s);
			}
		});
		if(asignados.length != Object.keys(shaderProgram.propiedades).length){
			console.log(asignados);
			console.log(atributosShaderProgram);
			console.log(forma);
			console.log(shaderProgram.propiedades);
			throw "Falta asignar buffer a atributos.";
		}
*/

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
//		console.log(asigne);
//		console.log(shaderProgram.attributes);
/*
		let atributos = gl.getProgramParameter(shaderProgram.obtenerProgram(), gl.ACTIVE_ATTRIBUTES);
		let program = shaderProgram.obtenerProgram();
		for (i = gl.getProgramParameter(program, gl.ACTIVE_ATTRIBUTES)-1; i >= 0; i--) {
			try{
  			let name = gl.getActiveAttrib(program, i).name;
  			//attribs[name] = gl.getAttribLocation(program, name);
//				console.log(name);
			} catch(e){};
		}
*/
//		console.log(atributos);

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
		shaderProgram.usar();
		this.setupLighting();
		this.setupUniforms(uniforms);
		this.draw(modelMatrix);
		shaderProgram.disableAttributes();
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
