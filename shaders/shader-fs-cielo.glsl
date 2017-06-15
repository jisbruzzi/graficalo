precision highp float;

varying vec2 vTextureCoord;
varying vec3 vVertexNormal;
varying vec3 vPosRelFuente;

uniform sampler2D uSampler;
uniform vec3 uAmbientColor;

uniform vec3 uDirectionalColor;
uniform bool uUseLighting;
uniform mat3 uNMatrix;


void main(void) {
  //textura
  vec4 textureColor = texture2D(uSampler, vec2(vTextureCoord.s, vTextureCoord.t));

  //iluminación
  vec3 light_dir =  vPosRelFuente;
  normalize(light_dir);
  //para normalizar bien
  light_dir /= length(light_dir);
  vec3 pesosUniforme = vec3(1.0, 1.0, 1.0);
  if (uUseLighting){
    vec3 transformedNormal = normalize(uNMatrix * vVertexNormal);
    float directionalLightWeighting = max(dot(transformedNormal, light_dir), 0.0);
    pesosUniforme = uAmbientColor + uDirectionalColor * directionalLightWeighting;
  }

  gl_FragColor = vec4(textureColor.rgb * pesosUniforme, textureColor.a);
}
