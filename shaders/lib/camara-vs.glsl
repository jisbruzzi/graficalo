uniform vec3 uPosMundoCamara;
varying vec3 vDirCamara;

void prepararCamara(in vec3 miPosicion){
  vDirCamara=(uPosMundoCamara-miPosicion);
  vDirCamara/=length(vDirCamara);
}
