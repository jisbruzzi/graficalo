varying vec3 vTransformedNormal;
varying vec3 vTransformedBinormal;
varying vec3 vTransformedTangent;

uniform sampler2D uNormalMap;

vec3 normalFinal(){
  vec4 local=texture2D(uNormalMap, uv_pos());
  vec3 ret = (vTransformedBinormal*local.x+vTransformedTangent*local.y+vTransformedNormal*local.z);
  return ret/length(ret);
}
