attribute vec3 aVertexPosition;
attribute vec3 aVertexNormal;
attribute vec2 aTextureCoord;

uniform mat4 uViewMatrix;
uniform mat4 uModelMatrix;
uniform mat4 uPMatrix;

varying vec2 vTextureCoord;
varying vec3 vVertexNormal;

#include pesosIluminacion-vs

void main(void) {
  // Transformamos al vértice al espacio de la cámara
	vec4 pos_camera_view = uViewMatrix * uModelMatrix * vec4(aVertexPosition, 1.0);

	// Transformamos al vértice al espacio de la proyección
  gl_Position = uPMatrix * pos_camera_view;

	// Coordenada de textura sin modifiaciones
  vTextureCoord = aTextureCoord;
  // normal sin modificaciones
  vVertexNormal = aVertexNormal;
  // posición de la fuente
  prepararPesosIluminacion(aVertexPosition);
}
