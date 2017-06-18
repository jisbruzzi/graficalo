precision highp float;

varying vec3 vVertexBinormal;

void main(void) {
  gl_FragColor = vec4(vVertexBinormal, 1.0);
}
