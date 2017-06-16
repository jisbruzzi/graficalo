#define CANT_LUCES 2
uniform vec3 uLightPosition[CANT_LUCES];
varying vec3 vPosRelFuente[CANT_LUCES];
void prepararPesosIluminacion(in vec3 miPosicion){
  vPosRelFuente[0] = uLightPosition[0]-vec3(uModelMatrix * vec4(miPosicion, 1.0));
}
