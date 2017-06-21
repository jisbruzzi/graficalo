precision highp float;

#include normal-comun-fs
#include pesosIluminacion-fs

varying vec2 vTextureCoord;
varying vec3 vVertexColor;

void main(void) {
  vec3 pesos=pesosIluminacion();
  gl_FragColor = vec4(vVertexColor.rgb * pesos, 1.0);
}
