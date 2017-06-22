uniform vec3 uPosMundoCamara;

varying vec3 vDirCamara;

void prepararReflexion(void) {
	//posicion sin modificaciones

	vec3 dirCamara = vec3(uModelMatrix * vec4(aVertexPosition, 1.0))-uPosMundoCamara;
	dirCamara/=length(dirCamara);
	dirCamara*=-1.0;
	vDirCamara=dirCamara;
}
