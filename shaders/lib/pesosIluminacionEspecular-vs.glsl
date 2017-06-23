#define CANT_LUCES 16
uniform vec3 uLightPosition[CANT_LUCES];
varying vec3 vPosRelFuente[CANT_LUCES];

void prepararPesosIluminacion(in vec3 miPosicion){
  for(int i = 0;i<CANT_LUCES;i++){
    vPosRelFuente[i] = uLightPosition[i]-vec3(uModelMatrix * vec4(miPosicion, 1.0));//ESTÁ BIEN ACÁ
  }
}
