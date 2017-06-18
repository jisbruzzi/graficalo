precision highp float;

varying vec3 vVertexTangent;

void main(void) {
  gl_FragColor = vec4(vVertexTangent, 1.0);
}
