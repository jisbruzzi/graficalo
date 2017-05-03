/*
ESTA FUNCIÓN HACE DE PUENTE ENTRE EL CÓDIGO TEMPLATE QUE NOS DIERON Y EL NUESTRO, QUE CARGA LOS SHADERS DESDE AFUERA
ESTARÍA BUENO QUE LO DE VERTEX O FRAGMENT SE SAQUE DEL NOMBRE P/NO ACOPLAR TANTO LOS NOMBRES DE LOS ARCHIVOS
esto fue quick and dirty
*/
function cargarShaders(finCarga){
	let shaders=[
	{n:"shader-fs-colored-obj", t:"x-shader/x-fragment"},
	{n:"shader-vs-colored-obj", t:"x-shader/x-vertex"},
	{n:"shader-fs-textured-obj", t:"x-shader/x-fragment"},
	{n:"shader-vs-textured-obj", t:"x-shader/x-vertex"}
	];
	cargadas=0;
	for( let i=0; i<shaders.length; i++){

		let s =shaders[i];
		$.get("shaders/"+s.n+".glsl",function(codigo){
			s.c=codigo;
			cargadas += 1;
			if (cargadas==4){
				console.log(shaders);
				finCarga(shaders);
			}
		});
	}


}


//ESTO ES CASI COPIPASTEADO DEL HTML

function getShader(gl, id,shaders) {
		let elemento=null;
		for (let i=0; i<shaders.length; i++){
			if(shaders[i].n===id){
				elemento=shaders[i];
			}
		}
		//console.log("a");
		console.log(elemento);
		//console.log(elemento.c);
        if (!elemento) {
            return null;
        }

        let str = elemento["c"];
		//console.log(elemento["c"]);
        let shader;
        if (elemento.t === "x-shader/x-fragment") {
            shader = gl.createShader(gl.FRAGMENT_SHADER);
        } else if (elemento.t === "x-shader/x-vertex") {
            shader = gl.createShader(gl.VERTEX_SHADER);
        } else {
            return null;
        }
        gl.shaderSource(shader, str);
        gl.compileShader(shader);

        if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
            alert(gl.getShaderInfoLog(shader));
            return null;
        }
        return shader;
    }








//ESTO ES COPIPASTEADO DE TEMPLATETP.HTML


var shaderProgramTexturedObject;
var shaderProgramColoredObject;


       function initShaders(shaders) {

        ////////////////////////////////////////////
        ////////////////////////////////////////////
        //
        // Inicializamos todo lo relacionado con el program shader para
        // renderizar objetos texturados

        var fragmentShaderTexturedObj = getShader(gl, "shader-fs-textured-obj",shaders);
        var vertexShaderTexturedObj = getShader(gl, "shader-vs-textured-obj",shaders);

        shaderProgramTexturedObject = gl.createProgram();
        gl.attachShader(shaderProgramTexturedObject, vertexShaderTexturedObj);
        gl.attachShader(shaderProgramTexturedObject, fragmentShaderTexturedObj);
        gl.linkProgram(shaderProgramTexturedObject);

        if (!gl.getProgramParameter(shaderProgramTexturedObject, gl.LINK_STATUS)) {
            alert("Could not initialise shaders");
        }

        shaderProgramTexturedObject.vertexPositionAttribute = gl.getAttribLocation(shaderProgramTexturedObject, "aVertexPosition");
        gl.enableVertexAttribArray(shaderProgramTexturedObject.vertexPositionAttribute);

        shaderProgramTexturedObject.textureCoordAttribute = gl.getAttribLocation(shaderProgramTexturedObject, "aTextureCoord");
        gl.enableVertexAttribArray(shaderProgramTexturedObject.textureCoordAttribute);

        shaderProgramTexturedObject.vertexNormalAttribute = gl.getAttribLocation(shaderProgramTexturedObject, "aVertexNormal");
        gl.enableVertexAttribArray(shaderProgramTexturedObject.vertexNormalAttribute);

        shaderProgramTexturedObject.pMatrixUniform = gl.getUniformLocation(shaderProgramTexturedObject, "uPMatrix");
        shaderProgramTexturedObject.ViewMatrixUniform = gl.getUniformLocation(shaderProgramTexturedObject, "uViewMatrix");
        shaderProgramTexturedObject.ModelMatrixUniform = gl.getUniformLocation(shaderProgramTexturedObject, "uModelMatrix");
        shaderProgramTexturedObject.nMatrixUniform = gl.getUniformLocation(shaderProgramTexturedObject, "uNMatrix");
        shaderProgramTexturedObject.samplerUniform = gl.getUniformLocation(shaderProgramTexturedObject, "uSampler");
        shaderProgramTexturedObject.useLightingUniform = gl.getUniformLocation(shaderProgramTexturedObject, "uUseLighting");
        shaderProgramTexturedObject.ambientColorUniform = gl.getUniformLocation(shaderProgramTexturedObject, "uAmbientColor");
        shaderProgramTexturedObject.lightingDirectionUniform = gl.getUniformLocation(shaderProgramTexturedObject, "uLightPosition");
        shaderProgramTexturedObject.directionalColorUniform = gl.getUniformLocation(shaderProgramTexturedObject, "uDirectionalColor");

        ////////////////////////////////////////////
        ////////////////////////////////////////////

        ////////////////////////////////////////////
        ////////////////////////////////////////////
        //
        // Inicializamos todo lo relacionado con el program shader para
        // renderizar objetos Coloreados

        var fragmentShaderColoredObj = getShader(gl, "shader-fs-colored-obj",shaders);
        var vertexShaderColoredObj = getShader(gl, "shader-vs-colored-obj",shaders);

        shaderProgramColoredObject = gl.createProgram();
        gl.attachShader(shaderProgramColoredObject, vertexShaderColoredObj);
        gl.attachShader(shaderProgramColoredObject, fragmentShaderColoredObj);
        gl.linkProgram(shaderProgramColoredObject);

        if (!gl.getProgramParameter(shaderProgramColoredObject, gl.LINK_STATUS)) {
            alert("Could not initialise shaders");
        }


        shaderProgramColoredObject.vertexPositionAttribute = gl.getAttribLocation(shaderProgramColoredObject, "aVertexPosition");
        gl.enableVertexAttribArray(shaderProgramColoredObject.vertexPositionAttribute);

        shaderProgramColoredObject.vertexColorAttribute = gl.getAttribLocation(shaderProgramColoredObject, "aVertexColor");
        gl.enableVertexAttribArray(shaderProgramColoredObject.vertexColorAttribute);

        shaderProgramColoredObject.vertexNormalAttribute = gl.getAttribLocation(shaderProgramColoredObject, "aVertexNormal");
        gl.enableVertexAttribArray(shaderProgramColoredObject.vertexNormalAttribute);

        shaderProgramColoredObject.pMatrixUniform = gl.getUniformLocation(shaderProgramColoredObject, "uPMatrix");
        shaderProgramColoredObject.ViewMatrixUniform = gl.getUniformLocation(shaderProgramColoredObject, "uViewMatrix");
        shaderProgramColoredObject.ModelMatrixUniform = gl.getUniformLocation(shaderProgramColoredObject, "uModelMatrix");
        shaderProgramColoredObject.nMatrixUniform = gl.getUniformLocation(shaderProgramColoredObject, "uNMatrix");
        shaderProgramColoredObject.samplerUniform = gl.getUniformLocation(shaderProgramColoredObject, "uSampler");
        shaderProgramColoredObject.useLightingUniform = gl.getUniformLocation(shaderProgramColoredObject, "uUseLighting");
        shaderProgramColoredObject.ambientColorUniform = gl.getUniformLocation(shaderProgramColoredObject, "uAmbientColor");
        shaderProgramColoredObject.lightingDirectionUniform = gl.getUniformLocation(shaderProgramColoredObject, "uLightPosition");
        shaderProgramColoredObject.directionalColorUniform = gl.getUniformLocation(shaderProgramColoredObject, "uDirectionalColor");
    }


