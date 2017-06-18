precision highp float;

varying vec3 vVertexNormal;

void main(void) {
  gl_FragColor = vec4(vVertexNormal*0.5+vec3(0.5,0.5,0.5), 1.0);
}
