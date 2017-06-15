precision highp float;

varying vec2 vTextureCoord;
varying vec3 vVertexNormal;
varying vec3 vPosRelFuente;

uniform vec3 uAmbientColor;

uniform vec3 uDirectionalColor;
uniform bool uUseLighting;
uniform mat3 uNMatrix;


uniform sampler2D uSamplerBase;
uniform sampler2D uSamplerSobre;
uniform float uAlturaBase;
uniform float uAlturaSobre;


void main(void) {
  //textura
  vec2 uvDef=vTextureCoord;
  vec4 textureColor=vec4(0.0,0.0,0.0,0.0);
  if(vTextureCoord.y<=0.25){
    uvDef.y/=0.25;
    uvDef.x/=0.25/uAlturaBase;
    textureColor = texture2D(uSamplerBase, uvDef);
  }else{
    uvDef.y-=uAlturaBase;
    uvDef.y/=uAlturaSobre;
    textureColor = texture2D(uSamplerSobre, uvDef);
  }

  //iluminación
  vec3 light_dir =  vPosRelFuente;
  normalize(light_dir);
  //para normalizar bien
  light_dir /= length(light_dir);
  vec3 pesosUniforme = vec3(1.0, 0.0, 0.0);
  if (uUseLighting){
    vec3 transformedNormal = normalize(uNMatrix * vVertexNormal);
    float directionalLightWeighting = max(dot(transformedNormal, light_dir), 0.0);
    pesosUniforme = uAmbientColor + uDirectionalColor * directionalLightWeighting;
  }

  gl_FragColor = vec4(textureColor.rgb * pesosUniforme, textureColor.a);

}
