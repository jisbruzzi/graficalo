precision highp float;

varying vec2 vTextureCoord;

#include normal-comun-fs
#include pesosIluminacionGlobal-fs
#include pesosIluminacion-fs

uniform sampler2D uSampler;

//acentuacíón ññ

void main(void) {
  //textura
  vec4 textureColor = texture2D(uSampler, vec2(vTextureCoord.s, vTextureCoord.t));
  vec3 pesos=pesosIluminacion()+pesosIluminacionGlobal();
  gl_FragColor = vec4(textureColor.rgb * pesos, textureColor.a);
}
