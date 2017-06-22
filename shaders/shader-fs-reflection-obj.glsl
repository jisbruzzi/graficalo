precision highp float;

#include normal-comun-fs
#include reflexion-fs

void main(void) {
  gl_FragColor = colorReflexion();
}
