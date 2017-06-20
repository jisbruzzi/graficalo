attribute vec3 aVertexPosition;
attribute vec3 aVertexNormal;
attribute vec2 aTextureCoord;
//attribute float aAlturaBase;//esto deberia ser un uniform al lado de la textura
//attribute float aAlturaSobre;//esto debería ser un uniform al lado de la textura
attribute float aAltura;//este no hace falta
attribute float aNumeroTexturaSobre;
attribute float aNumeroTexturaBase;
attribute float aRetardoAnimacion;
attribute float aDuracionAnimacion;
attribute float aTipoAnimacion;


uniform mat4 uViewMatrix;
uniform mat4 uModelMatrix;
uniform mat4 uPMatrix;
uniform float uTiempo;

varying vec2 vTextureCoord;
varying vec3 vVertexNormal;
varying float vAlturaBase;
varying float vAlturaSobre;
varying float vNumeroTexturaSobre;
varying float vNumeroTexturaBase;

#include pesosIluminacion-vs

//1: TWEEN.Easing.Elastic.Out: Math.pow(2, -10 * k) * Math.sin((k - 0.1) * 5 * Math.PI) + 1;
//2: TWEEN.Easing.Quadratic.Out: k * (2 - k);
//3: lineal: k

float animacion(in float parte){
  if(aTipoAnimacion==1.0){
    return pow(2.0, -10.0*parte)*sin((parte-0.1)*5.0*3.14)+1.0;
  }
  if(aTipoAnimacion==2.0){
    return parte*(2.0-parte);
  }
  if(aTipoAnimacion==3.0){
    return parte;
  }

}

float proporcionAltura(){
  float cruda = (uTiempo/1000.0-aRetardoAnimacion)/aDuracionAnimacion;
  return animacion(min(max(cruda,0.0),1.0));
}

void main(void) {
  float altura = aAltura*proporcionAltura();//aRetardoAnimacion;//
  // Transformamos al vértice al espacio de la cámara
  vec3 vDef=aVertexPosition;
  vDef.z*=altura;

	vec4 pos_camera_view = uViewMatrix * uModelMatrix * vec4(vDef, 1.0);

	// Transformamos al vértice al espacio de la proyección
  gl_Position = uPMatrix * pos_camera_view;

	// Coordenada de textura sin modifiaciones
  vTextureCoord = aTextureCoord;
  vTextureCoord.y*=altura;
  // normal sin modificaciones
  vVertexNormal = aVertexNormal;
  // posición de la fuente
  prepararPesosIluminacion(vDef);

  //lo que antes eran uniforms
//  vAlturaBase=aAlturaBase;
//  vAlturaSobre=aAlturaSobre;

  vNumeroTexturaSobre=aNumeroTexturaSobre;
  vNumeroTexturaBase=aNumeroTexturaBase;
}
