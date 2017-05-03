attribute vec3 aVertexPosition;
attribute vec3 aVertexNormal;
attribute vec3 aVertexColor;

uniform mat4 uViewMatrix;
uniform mat4 uModelMatrix;
uniform mat4 uPMatrix;
uniform mat3 uNMatrix;

uniform vec3 uAmbientColor;

uniform vec3 uLightPosition;
uniform vec3 uDirectionalColor;

uniform bool uUseLighting;

varying vec3 vVertexColor;
varying vec3 vLightWeighting;

void main(void) {

    // Transformamos al vértice al espacio de la cámara
    vec4 pos_camera_view = uViewMatrix * uModelMatrix * vec4(aVertexPosition, 1.0);

    // Transformamos al vértice al espacio de la proyección
    gl_Position = uPMatrix * pos_camera_view;

    // Coordenada de textura sin modifiaciones
    vVertexColor = aVertexColor;

    ////////////////////////////////////////////
    // Calculos de la iluminación
    vec3 light_dir =  uLightPosition - vec3( pos_camera_view );
    normalize(light_dir);
    if (!uUseLighting) {
            vLightWeighting = vec3(1.0, 1.0, 1.0);
    }else{
        vec3 transformedNormal = normalize(uNMatrix * aVertexNormal);
        float directionalLightWeighting = max(dot(transformedNormal, light_dir), 0.0);
        vLightWeighting = uAmbientColor + uDirectionalColor * directionalLightWeighting;
    }
    ////////////////////////////////////////////
}
