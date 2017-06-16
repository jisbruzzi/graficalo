precision highp float;

#include pesosIluminacion

varying vec2 vTextureCoord;
varying vec3 vVertexColor;


void main(void) {
  //iluminación

  vec3 pesos=pesosIluminacion();
  gl_FragColor = vec4(vVertexColor.rgb * pesos, 1.0);

  //gl_FragColor=vec4(1.0,1.0,0.0,1.0);
}
