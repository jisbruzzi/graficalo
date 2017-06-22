precision highp float;

#include normal-comun-fs
#include reflexion-fs
#include pesosIluminacionGlobal-fs

uniform vec3 uColorCielo;
uniform sampler2D uSampler;
//varying vec2 vTextureCoord;

void main(void) {
  /*
  vec4 colorReflexion = vec4(colorReflexion().rgb*uColorCielo,1.0);
  vec4 textureColor = texture2D(uSampler, vec2(vTextureCoord.s, vTextureCoord.t));
  vec4 sumaColores=0.5*colorReflexion+0.5*textureColor;
  gl_FragColor=vec4(sumaColores.rgb*pesosIluminacionGlobal(),1.0);
  */
  gl_FragColor=vec4(colorReflexion().rgb*uColorCielo*pesosIluminacionGlobal(),1.0);
}
