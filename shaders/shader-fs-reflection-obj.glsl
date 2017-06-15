precision highp float;

varying vec2 vTextureCoord;
varying vec3 vVertexNormal;
varying vec3 vVertexPosition;

uniform sampler2D uSampler;

uniform mat3 uNMatrix;
uniform mat4 uModelMatrix;
uniform vec3 uPosMundoCamara;

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

void main(void) {

/**
PREGUNTAS:
1-NORMAL Y POSICION RELATIVA A LA LUZ Y A LA CÁMARA SE CALCULAN ACÁ O EN EL VERTEX SHADER? QUÉ ACÁ Y QUÉ EN EL VERTEX?
2-ESA LÍNEA QUE APARECE EN LA ESFERA CELESTIAL
3-CUANDO MIRÁS TOTALMENTE PARA ARRIBA Y TOTALMENTE PARA ABAJO EN FPS O EN PANORÁMICA CERCANA, SE BORRA TODA LA IMAGEN.
  SI, LA MATRIZ SE PONE UN POQUITO RARA. MOSTRAR LA MATRIZ RARA A VER QUÉ ME DICEN.
4-PUEDO USAR LA FUNCIÓN REFLECT?
**/
  vec3 dirCamara = vec3(uModelMatrix * vec4(vVertexPosition, 1.0))-uPosMundoCamara;
	dirCamara/=length(dirCamara);
	dirCamara*=-1.0;

  vec3 transformedNormal = uNMatrix * vVertexNormal;
  transformedNormal/=length(transformedNormal);

  //componente sobre npormal
  vec3 componenteNormal = dot(transformedNormal,dirCamara)*transformedNormal;
  vec3 componenteTangente = dirCamara-componenteNormal;
  vec3 dirRayoReflejado = (-componenteTangente+componenteNormal);
  dirRayoReflejado/=length(dirRayoReflejado);

  //dirRayoReflejado=transformedNormal;
  //jugar con la direccion
  float u = calcularDireccion(dirRayoReflejado.x,dirRayoReflejado.y)/(3.1415926535*2.0);

  float largoH=length(vec2(dirRayoReflejado.x,dirRayoReflejado.y));
  vec2 paraV=vec2(largoH,dirRayoReflejado.z);
  paraV/=length(paraV);
  float casiV = (calcularDireccion(paraV.y,paraV.x))/(3.1415926535);//para evitar el corte ese, cambio y por x y después giro
  float v = 1.0-casiV;

  //direccion+=3.14;


  //esto de abajo no arregla nada
  //if (u>=1.0) u-=1.0;
  //if (u<0.0) u+=1.0;

  vec4 textureColor = texture2D(uSampler, vec2(u, v));
  gl_FragColor = vec4(textureColor.rgb, textureColor.a);//esto no anda bien
  //gl_FragColor = vec4(u,v,0.0, textureColor.a);
}
