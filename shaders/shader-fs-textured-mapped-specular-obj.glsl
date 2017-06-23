precision highp float;

varying vec2 vTextureCoord;

vec2 uv_pos(){
  return vTextureCoord;
}

#include normal-mappeada-fs
#include pesosIluminacionGlobal-fs
#include pesosIluminacion-fs
#include pesosIluminacionEspecular-fs
#include pesosIluminacionGlobalEspecular-fs

uniform sampler2D uSampler;
uniform vec3 uSpecularColor;

//acentuacíón ññ

void main(void) {
  //textura
  vec4 textureColor = texture2D(uSampler, vec2(vTextureCoord.s, vTextureCoord.t));
  vec3 pesos=pesosIluminacion()+pesosIluminacionGlobal();
  vec3 pesosEspecular=pesosIluminacionEspecular()+pesosIluminacionGlobalEspecular();

  gl_FragColor = vec4(textureColor.rgb * pesos, textureColor.a)+vec4(uSpecularColor*pesosEspecular,1.0)*0.2;
}
