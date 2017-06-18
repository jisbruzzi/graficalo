precision highp float;

varying vec3 vVertexBinormal;

void main(void) {
  gl_FragColor = vec4(vVertexBinormal*0.5+vec3(0.5,0.5,0.5), 1.0);
}
