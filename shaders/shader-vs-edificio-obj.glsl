attribute vec3 aVertexPosition;
attribute vec3 aVertexNormal;
attribute vec2 aTextureCoord;
attribute float aAlturaBase;
attribute float aAlturaSobre;

uniform mat4 uViewMatrix;
uniform mat4 uModelMatrix;
uniform mat4 uPMatrix;

varying vec2 vTextureCoord;
varying vec3 vVertexNormal;
varying float vAlturaBase;
varying float vAlturaSobre;

attribute float aAltura;

#include pesosIluminacion-vs

void main(void) {
  // Transformamos al vértice al espacio de la cámara
  vec3 vDef=aVertexPosition;
  vDef.z*=aAltura;

	vec4 pos_camera_view = uViewMatrix * uModelMatrix * vec4(vDef, 1.0);

	// Transformamos al vértice al espacio de la proyección
  gl_Position = uPMatrix * pos_camera_view;

	// Coordenada de textura sin modifiaciones
  vTextureCoord = aTextureCoord;
  vTextureCoord.y*=aAltura;
  // normal sin modificaciones
  vVertexNormal = aVertexNormal;
  // posición de la fuente
  prepararPesosIluminacion(vDef);

  //lo que antes eran uniforms
  vAlturaBase=aAlturaBase;
  vAlturaSobre=aAlturaSobre;
}
