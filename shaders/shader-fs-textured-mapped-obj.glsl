precision highp float;

varying vec2 vTextureCoord;

vec2 uv_pos(){
  return vTextureCoord;
}

#include normal-mappeada-fs
#include pesosIluminacion-fs

uniform sampler2D uSampler;

//acentuacíón ññ

void main(void) {
  //textura
  vec4 textureColor = texture2D(uSampler, vec2(vTextureCoord.s, vTextureCoord.t));
  vec3 pesos=pesosIluminacion();

  gl_FragColor = vec4(textureColor.rgb * pesos, textureColor.a);
}
