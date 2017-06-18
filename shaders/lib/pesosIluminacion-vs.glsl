#define CANT_LUCES 2
uniform vec3 uLightPosition[CANT_LUCES];
varying vec3 vPosRelFuente[CANT_LUCES];
varying vec3 vTransformedNormal;
uniform mat3 uNMatrix;
void prepararPesosIluminacion(in vec3 miPosicion){
  vTransformedNormal = uNMatrix * vVertexNormal;//HACER ESTO EN EL VERTEX SHADER
  vTransformedNormal/=length(vTransformedNormal);
  for(int i = 0;i<CANT_LUCES;i++){
    vPosRelFuente[i] = uLightPosition[i]-vec3(uModelMatrix * vec4(miPosicion, 1.0));//ESTÁ BIEN ACÁ
  }
}
