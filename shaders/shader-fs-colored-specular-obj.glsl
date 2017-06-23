precision highp float;

uniform vec3 uSpecularColor;

#include normal-comun-fs
#include pesosIluminacionGlobal-fs
#include pesosIluminacion-fs
#include pesosIluminacionEspecular-fs
#include pesosIluminacionGlobalEspecular-fs

varying vec2 vTextureCoord;
varying vec3 vVertexColor;

void main(void) {
  vec3 pesos=pesosIluminacion()+pesosIluminacionGlobal();
  vec3 pesosEspecular=pesosIluminacionEspecular()+pesosIluminacionGlobalEspecular();
  gl_FragColor = 0.5*vec4(vVertexColor.rgb * pesos, 1.0)+0.5*vec4(uSpecularColor*pesosEspecular,1.0);
}
