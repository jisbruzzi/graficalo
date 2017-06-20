#define CANT_LUCES 2
uniform vec3 uDirectionalColor;
uniform bool uUseLighting;
uniform vec3 uAmbientColor;
varying vec3 vPosRelFuente[CANT_LUCES];
uniform vec3 uDireccionLuz[CANT_LUCES];

uniform float uConcentracion[CANT_LUCES];
uniform float uDistanciaIluminada[CANT_LUCES];
uniform vec3 uColorLuz[CANT_LUCES];



vec3 pesosIluminacion(){

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
        float directionalLightWeighting = max(dot(transformedNormal, light_dir), 0.0);
        float pesoPorSpot = pow(max(dot(-light_dir,uDireccionLuz[i]),0.0),uConcentracion[i]);
        if (uConcentracion[i]==0.0){
          pesoPorSpot=1.0;
        }

        sumaDifusa+=uColorLuz[i] * pesoPorDistancia*pesoPorSpot*directionalLightWeighting;// * directionalLightWeighting
      }
    }
    pesosUniforme = uAmbientColor + sumaDifusa;

  }

  return pesosUniforme;
}
