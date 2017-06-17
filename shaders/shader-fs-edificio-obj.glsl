precision highp float;

#include pesosIluminacion-fs

varying vec2 vTextureCoord;

uniform sampler2D uSamplerBase;
uniform sampler2D uSamplerSobre;
varying float vAlturaBase;
varying float vAlturaSobre;

void main(void) {
  //textura
  vec2 uvDef=vTextureCoord;
  vec4 textureColor=vec4(0.0,0.0,0.0,0.0);
  if(vTextureCoord.y<=0.25){
    uvDef.y/=0.25;
    uvDef.x/=0.25/vAlturaBase;
    textureColor = texture2D(uSamplerBase, uvDef);
  }else{
    uvDef.y-=0.25;
    uvDef.y/=vAlturaSobre;
    textureColor = texture2D(uSamplerSobre, uvDef);
  }

  vec3 pesos=pesosIluminacion();

  gl_FragColor = vec4(textureColor.rgb*pesos, textureColor.a);
}
