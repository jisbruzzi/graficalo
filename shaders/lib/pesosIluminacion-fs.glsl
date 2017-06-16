#define CANT_LUCES 2
uniform vec3 uDirectionalColor;
uniform bool uUseLighting;
uniform mat3 uNMatrix;
uniform vec3 uAmbientColor;
varying vec3 vVertexNormal;
varying vec3 vPosRelFuente[CANT_LUCES];
uniform vec3 uLightPosition[CANT_LUCES];

vec3 pesosIluminacion(){

  vec3 light_dir =  vPosRelFuente[0];
  //para normalizar bien
  light_dir /= length(light_dir);
  vec3 pesosUniforme = vec3(1.0, 1.0, 1.0);
  if (uUseLighting){
    vec3 transformedNormal = uNMatrix * vVertexNormal;

    transformedNormal/=length(transformedNormal);

    float directionalLightWeighting = max(dot(transformedNormal, light_dir), 0.0);
    pesosUniforme = uAmbientColor + uDirectionalColor * directionalLightWeighting;
  }
  return pesosUniforme;
}
