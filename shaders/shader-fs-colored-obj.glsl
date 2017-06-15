precision highp float;

#include

varying vec2 vTextureCoord;
varying vec3 vVertexNormal;
varying vec3 vPosRelFuente;
varying vec3 vVertexColor;

uniform vec3 uAmbientColor;

uniform vec3 uDirectionalColor;
uniform bool uUseLighting;
uniform mat3 uNMatrix;


void main(void) {
  //iluminación

  vec3 pesos=pesosIluminacion(
    vPosRelFuente,
    uNMatrix,
    vVertexNormal,
    uAmbientColor,
    uDirectionalColor,
    uUseLighting);
  gl_FragColor = vec4(vVertexColor.rgb * pesos, 1.0);

  //gl_FragColor=vec4(1.0,1.0,0.0,1.0);
}
