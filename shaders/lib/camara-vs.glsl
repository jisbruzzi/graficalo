uniform vec3 uPosMundoCamara;
varying vec3 vDirCamara;

void prepararCamara(in vec3 miPosicion){
	vec3 dirCamara = uPosMundoCamara -vec3(uModelMatrix * vec4(miPosicion, 1.0));
	dirCamara/=length(dirCamara);
	
	vDirCamara=dirCamara;
}
