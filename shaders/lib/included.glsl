vec3 pesosIluminacion(in vec3 posRelFuente,
                      in mat3 nMatrix,
                      in vec3 vertexNormal,
                      in vec3 ambientColor,
                      in vec3 directionalColor,
                      in bool useLighting){

  vec3 light_dir =  posRelFuente;
  normalize(light_dir);
  //para normalizar bien
  light_dir /= length(light_dir);
  vec3 pesosUniforme = vec3(1.0, 1.0, 1.0);
  if (useLighting){
    vec3 transformedNormal = normalize(nMatrix * vertexNormal);
    float directionalLightWeighting = max(dot(transformedNormal, light_dir), 0.0);
    pesosUniforme = ambientColor + directionalColor * directionalLightWeighting;
  }
  return pesosUniforme;
}
