function Objeto(modelo){
  this.setupShaders = function(){
      modelo.setupShaders();
  };

  this.setupLighting = function(lightPosition, ambientColor, diffuseColor){
      modelo.setupLighting(lightPosition,ambientColor,diffuseColor);
  };

  this.draw = function(modelMatrix){
      modelo.draw(modelMatrix);
  };
}
