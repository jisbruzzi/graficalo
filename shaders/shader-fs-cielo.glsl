precision highp float;

uniform vec3 uColorCielo;
varying vec2 vTextureCoord;
uniform sampler2D uSampler;

void main(void) {
  vec4 col = texture2D(uSampler, vec2(vTextureCoord.s, vTextureCoord.t));
  gl_FragColor = vec4(col.rgb*uColorCielo,1.0);
}
