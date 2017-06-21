precision highp float;

uniform vec3 uColorAmbiente;
uniform vec3 uColorLuzGlobal;
varying vec2 vTextureCoord;
uniform sampler2D uSampler;

void main(void) {
  vec4 col = texture2D(uSampler, vec2(vTextureCoord.s, vTextureCoord.t));
  gl_FragColor = vec4(col.rgb*(uColorLuzGlobal*0.75+uColorAmbiente*0.25),1.0);
}
