varying vec3 vTransformedNormal;
attribute vec3 aVertexNormal;
uniform mat3 uNMatrix;

void prepararNormal(){
  vTransformedNormal = uNMatrix * aVertexNormal;
  vTransformedNormal/=length(vTransformedNormal);
}
