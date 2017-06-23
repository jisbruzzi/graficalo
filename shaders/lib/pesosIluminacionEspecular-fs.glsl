#define CANT_LUCES 16


uniform float uGlossiness;
varying vec3 vDirCamara;

vec3 pesosIluminacionEspecular(){

  vec3 pesosUniforme = vec3(1.0, 1.0, 1.0);
  if (uUseLighting){
    vec3 transformedNormal=normalFinal();
    //transformedNormal/=length(transformedNormal);
    
    vec3 sumaDifusa = vec3(0.0,0.0,0.0);
    for(int i=0; i<CANT_LUCES;i++){
      float pesoPorDistancia = 1.0-length(vPosRelFuente[i])/uDistanciaIluminada[i];
      if (length(vPosRelFuente[i])<uDistanciaIluminada[i]){
        vec3 light_dir =  vPosRelFuente[i];
        light_dir /= length(light_dir);

        vec3 reflected_ray= ((dot(light_dir, transformedNormal)*transformedNormal)*2.0)-light_dir;
        reflected_ray/=length(reflected_ray);
        float directionalLightWeighting = pow(max(dot(vDirCamara, reflected_ray), 0.0),uGlossiness);
        float pesoPorSpot = pow(max(dot(-light_dir,uDireccionLuz[i]),0.0),uConcentracion[i]);
        if (uConcentracion[i]==0.0){
          pesoPorSpot=1.0;
        }

        sumaDifusa+=uColorLuz[i] * pesoPorDistancia*pesoPorSpot*directionalLightWeighting;// * directionalLightWeighting
      }
    }
    pesosUniforme = sumaDifusa;

  }

  return pesosUniforme;
}
