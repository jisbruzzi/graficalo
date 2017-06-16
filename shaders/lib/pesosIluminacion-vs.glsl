uniform vec3 uLightPosition;
varying vec3 vPosRelFuente;
void prepararPesosIluminacion(in vec3 miPosicion){
  vPosRelFuente = uLightPosition-vec3(uModelMatrix * vec4(miPosicion, 1.0));
}
