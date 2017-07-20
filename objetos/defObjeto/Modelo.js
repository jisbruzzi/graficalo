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
	this.glossiness;
	this.specularColor;



	let listaLuces={};
	let luzGlobal=new ParametrosLuzGlobal();
	let camara;

	function desplegarParametroDeLuz(listaLuces,f,componentes){

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
		//armar esas listas de nuevo cuando en realidad no hace falta debe esttar consumiendo muchísimo tiempo.
		//Capaz se podría configurar la parte de la listaLuces una sola vez, y armar estas listas una sola vez.
		//O sólo cuando es necesario

		//-- si se usa iluminación --//
		let lighting = true;
		if (forma.esIluminado != undefined){
			lighting = forma.esIluminado();
		}
		gl.uniform1i(shaderProgram.uUseLighting, lighting);

		//-- desplegar los parámetros de las luces --//

		gl.uniform3fv(shaderProgram.uLightPosition, listaLuces.listaPosiciones);
		gl.uniform3fv(shaderProgram.uDireccionLuz, listaLuces.listaHacia);
		gl.uniform1fv(shaderProgram.uConcentracion, new Float32Array(listaLuces.listaConcentraciones));
		gl.uniform1fv(shaderProgram.uDistanciaIluminada, new Float32Array(listaLuces.listaDistancia));
		gl.uniform3fv(shaderProgram.uColorLuz, listaLuces.listaColores);
		gl.uniform3fv(shaderProgram.uColorAmbiente, luzGlobal.colorAmbiente );
		gl.uniform3fv(shaderProgram.uColorLuzGlobal, luzGlobal.colorLuzGlobal);
		gl.uniform3fv(shaderProgram.uDireccionLuzGlobal, luzGlobal.direccionLuzGlobal);
		gl.uniform3fv(shaderProgram.uColorCielo, luzGlobal.colorCielo);
		if(!(this.glossiness===undefined)){
			gl.uniform1f(shaderProgram.uGlossiness, this.glossiness);
			gl.uniform3fv(shaderProgram.uSpecularColor, this.specularColor);
		}

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
		if(FormaDibujable(forma).dibujable && !Glizable(forma).eliminada){
			shaderProgram.usar();
			this.setupLighting();
			this.setupUniforms(uniforms);
			this.draw(modelMatrix);
			shaderProgram.disableAttributes();
		}
	}

	this.configurarIluminacionGlobal=function(luzGlobalNueva){
		luzGlobal = luzGlobalNueva;
	}

	this.configurarLuces=function(listaLucesNueva){
		listaLucesNueva = listaLucesNueva.slice(0,CANT_LUCES);
		listaLuces.listaColores = desplegarParametroDeLuz(listaLucesNueva,function(l){return l.color},3);
		listaLuces.listaDistancia = desplegarParametroDeLuz(listaLucesNueva,function(l){return [l.distanciaIluminada]},1);
		listaLuces.listaPosiciones=desplegarParametroDeLuz(listaLucesNueva,function(l){return l.obtenerPosicionFinal()},3);
		listaLuces.listaHacia = desplegarParametroDeLuz(listaLucesNueva,function(l){return l.obtenerHaciaFinal()},3);
		listaLuces.listaConcentraciones = desplegarParametroDeLuz(listaLucesNueva,function(l){return [l.concentracion]},1);
	}

	this.configurarCamara=function(nuevaCamara){
		camara=nuevaCamara;
	}

}
