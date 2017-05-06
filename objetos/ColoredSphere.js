    function ColoredSphere(latitude_bands, longitude_bands){
		    let forma = new FormaEsfera(latitude_bands,longitude_bands);
        let modelo = new Modelo(forma,shaderProgramColoredObject);


        this.setupShaders = function(){
            modelo.setupShaders();
        }

        this.setupLighting = function(lightPosition, ambientColor, diffuseColor){
            modelo.setupLighting(lightPosition,ambientColor,diffuseColor);
        }

        this.draw = function(modelMatrix){
            modelo.draw(modelMatrix);
        }

    }
