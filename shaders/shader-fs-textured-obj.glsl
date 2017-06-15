precision highp float;

#include

varying vec2 vTextureCoord;
varying vec3 vVertexNormal;
varying vec3 vPosRelFuente;

uniform sampler2D uSampler;
uniform vec3 uAmbientColor;

uniform vec3 uDirectionalColor;
uniform bool uUseLighting;
uniform mat3 uNMatrix;


void main(void) {
  //textura
  vec4 textureColor = texture2D(uSampler, vec2(vTextureCoord.s, vTextureCoord.t));

  vec3 pesos=pesosIluminacion(
    vPosRelFuente,
    uNMatrix,
    vVertexNormal,
    uAmbientColor,
    uDirectionalColor,
    uUseLighting);

  gl_FragColor = vec4(textureColor.rgb * pesos, textureColor.a);
  //gl_FragColor=vec4(0.0,0.0,1.0,1.0);
}
