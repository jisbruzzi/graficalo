function FormaMultitexturable(f){
  if(f.samplers==undefined){
    f.samplers=[];
  }
  f.agregarSampler2D=function(nombre,textura){
    f.samplers[nombre]=textura;
    return f;
  }
  return f;
}
