precision highp float;

#include pesosIluminacion

varying vec2 vTextureCoord;

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
    uvDef.y-=0.25;
    uvDef.y/=uAlturaSobre;
    textureColor = texture2D(uSamplerSobre, uvDef);
  }

  vec3 pesos=pesosIluminacion();

  gl_FragColor = vec4(textureColor.rgb*pesos, textureColor.a);
}
