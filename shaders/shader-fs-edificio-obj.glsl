precision highp float;

#include normal-comun-fs
#include pesosIluminacion-fs

varying vec2 vTextureCoord;

uniform sampler2D uSamplerBase0;
uniform sampler2D uSamplerBase1;
uniform sampler2D uSamplerBase2;
uniform sampler2D uSamplerBase3;

uniform sampler2D uSamplerSobre0;
uniform sampler2D uSamplerSobre1;
uniform sampler2D uSamplerSobre2;
uniform sampler2D uSamplerSobre3;

uniform float uAltoBase0;
uniform float uAltoBase1;
uniform float uAltoBase2;
uniform float uAltoBase3;

uniform float uAltoSobre0;
uniform float uAltoSobre1;
uniform float uAltoSobre2;
uniform float uAltoSobre3;

uniform float uTiempo;

varying float vNumeroTexturaSobre;
varying float vNumeroTexturaBase;

vec4 samplerSobre(in vec2 uv){
  if(vNumeroTexturaSobre==0.0){
    return texture2D(uSamplerSobre0, uv);
  }
  if(vNumeroTexturaSobre==1.0){
    return texture2D(uSamplerSobre1, uv);
  }
  if(vNumeroTexturaSobre==2.0){
    return texture2D(uSamplerSobre2, uv);
  }
  if(vNumeroTexturaSobre==3.0){
    return texture2D(uSamplerSobre3, uv);
  }
}
vec4 samplerBase(in vec2 uv){
  if(vNumeroTexturaBase==0.0){
    return texture2D(uSamplerBase0, uv);
  }
  if(vNumeroTexturaBase==1.0){
    return texture2D(uSamplerBase1, uv);
  }
  if(vNumeroTexturaBase==2.0){
    return texture2D(uSamplerBase2, uv);
  }
  if(vNumeroTexturaBase==3.0){
    return texture2D(uSamplerBase3, uv);
  }
}

float altoSobre(){
  if(vNumeroTexturaSobre==0.0){
    return uAltoSobre0;
  }
  if(vNumeroTexturaSobre==1.0){
    return uAltoSobre1;
  }
  if(vNumeroTexturaSobre==2.0){
    return uAltoSobre2;
  }
  if(vNumeroTexturaSobre==3.0){
    return uAltoSobre3;
  }
}


float altoBase(){
  if(vNumeroTexturaBase==0.0){
    return uAltoBase0;
  }
  if(vNumeroTexturaBase==1.0){
    return uAltoBase1;
  }
  if(vNumeroTexturaBase==2.0){
    return uAltoBase2;
  }
  if(vNumeroTexturaBase==3.0){
    return uAltoBase3;
  }
}

void main(void) {
  //textura
  vec2 uvDef=vTextureCoord;
  vec4 textureColor=vec4(0.0,0.0,0.0,0.0);
  if(vTextureCoord.y<=0.25){
    uvDef.y/=0.25;
    uvDef.x/=0.25/altoBase();
    textureColor = samplerBase(uvDef);
  }else{
    uvDef.y-=0.25;
    uvDef.y/=altoSobre();
    textureColor = samplerSobre(uvDef);
  }

  vec3 pesos=pesosIluminacion();

  //gl_FragColor = 0.5*vec4(mod(uvDef.x, 1.0),mod(uvDef.y, 1.0),0.0, textureColor.a);
  //gl_FragColor+= 0.5*vec4(textureColor.rgb*pesos, textureColor.a);

  gl_FragColor = vec4(textureColor.rgb*pesos, textureColor.a);

  //gl_FragColor = vec4(uTiempo,uTiempo,uTiempo, textureColor.a);
}
