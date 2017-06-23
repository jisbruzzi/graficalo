//normalFinal tiene que estar definida arriba del include de este archivo




vec3 pesosIluminacionGlobalEspecular(){
  vec3 reflected_ray= ((dot(-uDireccionLuzGlobal, normalFinal())*normalFinal())*2.0)-uDireccionLuzGlobal;
  float pesoGlobal = pow(max(dot(vDirCamara, reflected_ray), 0.0),uGlossiness);
  return uColorLuzGlobal*pesoGlobal;
}
