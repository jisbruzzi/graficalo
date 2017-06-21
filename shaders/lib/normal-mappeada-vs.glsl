varying vec3 vTransformedNormal;
varying vec3 vTransformedBinormal;
varying vec3 vTransformedTangent;

attribute vec3 aVertexNormal;
attribute vec3 aVertexTangent;
attribute vec3 aVertexBinormal;

uniform mat3 uNMatrix;

void prepararNormal(){
  vTransformedNormal = uNMatrix * aVertexNormal;
  vTransformedNormal/=length(vTransformedNormal);

  vTransformedBinormal = uNMatrix * aVertexBinormal;
  vTransformedBinormal/=length(vTransformedBinormal);

  vTransformedTangent = uNMatrix * aVertexTangent;
  vTransformedTangent/=length(vTransformedTangent);
}
