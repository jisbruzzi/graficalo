varying vec3 vDirCamara;

uniform sampler2D uSamplerReflexion;

#define PI 3.1415926535

float calcularDireccion(in float x,in float y){
  if(y==0.0 && x> 0.0) return 0.0;
  if(y==0.0 && x<=0.0) return PI;

  if(y< 0.0 && x==0.0) return PI/2.0;
  if(y>=0.0 && x==0.0) return 3.0*PI/2.0;



  if( y > 0.0){
    return  atan(y, x);
  }else{
    return  3.1415926535 + atan(-y, -x);
  }
}

vec4 colorReflexion(void) {


  vec3 dirCamara = vDirCamara / length(vDirCamara);

  //componente sobre npormal
  vec3 normal = normalFinal();
  vec3 componenteNormal = dot(normal,dirCamara)*normal;
  vec3 componenteTangente = dirCamara-componenteNormal;
  vec3 dirRayoReflejado = (-componenteTangente+componenteNormal);
  dirRayoReflejado/=length(dirRayoReflejado);

  //jugar con la direccion
  float u = calcularDireccion(dirRayoReflejado.x,dirRayoReflejado.y)/(3.1415926535*2.0);

  float largoH=length(vec2(dirRayoReflejado.x,dirRayoReflejado.y));
  vec2 paraV=vec2(largoH,dirRayoReflejado.z);
  paraV/=length(paraV);
  float casiV = (calcularDireccion(paraV.y,paraV.x))/(3.1415926535);//para evitar el corte ese, cambio y por x y después giro
  float v = 1.0-casiV;

  return texture2D(uSamplerReflexion, vec2(u, v));
}

/**
PREGUNTAS:
1-NORMAL Y POSICION RELATIVA A LA LUZ Y A LA CÁMARA SE CALCULAN ACÁ O EN EL VERTEX SHADER? QUÉ ACÁ Y QUÉ EN EL VERTEX?
2-ESA LÍNEA QUE APARECE EN LA ESFERA CELESTIAL
3-CUANDO MIRÁS TOTALMENTE PARA ARRIBA Y TOTALMENTE PARA ABAJO EN FPS O EN PANORÁMICA CERCANA, SE BORRA TODA LA IMAGEN.
  SI, LA MATRIZ SE PONE UN POQUITO RARA. MOSTRAR LA MATRIZ RARA A VER QUÉ ME DICEN.

  ES PORQUE EL UP LO TENÉS EN Z POSITIVA

4-PUEDO USAR LA FUNCIÓN REFLECT?
**/
