precision highp float;

varying vec3 vVertexNormal;

void main(void) {
  gl_FragColor = vec4(vVertexNormal, 1.0);
  if (gl_FragColor.x==-1.0){
    gl_FragColor.x=0.5;
  }
  if (gl_FragColor.y==-1.0){
    gl_FragColor.y=0.5;
  }
  if (gl_FragColor.z==-1.0){
    gl_FragColor.z=0.5;
  }
}
