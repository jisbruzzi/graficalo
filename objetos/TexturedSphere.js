    function TexturedSphere(latitude_bands, longitude_bands){

		var forma = null;
    var modelo = null;


        this.initTexture = function(texture_file){
          forma = new FormaEsfera(latitude_bands,longitude_bands).copiaConTextura(new Textura(_atlasImagenes[texture_file]));
          modelo = new Modelo(forma,shaderProgramTexturedObject);
        }

        this.setupShaders = function(){
            //shaderProgramTexturedObject.usar();
            modelo.setupShaders();
        }

        this.setupLighting = function(lightPosition, ambientColor, diffuseColor){
            modelo.setupLighting(lightPosition,ambientColor,diffuseColor);
        }

        this.draw = function(modelMatrix){
            modelo.draw(modelMatrix);
        }

    }
