//normalFinal tiene que estar definida arriba del include de este archivo




vec3 pesosIluminacionGlobalEspecular(){

  vec3 reflected_ray= ((max(dot(uDireccionLuzGlobal, normalFinal()),0.0)*normalFinal())*2.0)-uDireccionLuzGlobal;
  reflected_ray/=length(reflected_ray);



  float pesoGlobal = pow(max(dot(vDirCamara, reflected_ray), 0.0),uGlossiness);
  return uColorLuzGlobal*pesoGlobal;
}
