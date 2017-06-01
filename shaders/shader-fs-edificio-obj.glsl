precision mediump float;

    varying vec2 vTextureCoord;
    varying vec3 vLightWeighting;

    uniform sampler2D uSamplerBase;
    uniform sampler2D uSamplerSobre;
    uniform float uAlturaBase;
    uniform float uAlturaSobre;

    void main(void) {
      vec2 uvDef=vTextureCoord;
      if(vTextureCoord.y<=0.25){
        uvDef.y/=0.25;
        uvDef.x/=0.25/uAlturaBase;
        vec4 textureColor = texture2D(uSamplerBase, uvDef);
        gl_FragColor = vec4(textureColor.rgb * vLightWeighting, textureColor.a);
      }else{
        uvDef.y-=uAlturaBase;
        uvDef.y/=uAlturaSobre;
        vec4 textureColor = texture2D(uSamplerSobre, uvDef);
        gl_FragColor = vec4(textureColor.rgb * vLightWeighting, textureColor.a);
      }
    }
