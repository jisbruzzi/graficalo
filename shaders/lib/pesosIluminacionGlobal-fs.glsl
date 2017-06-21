//normalFinal tiene que estar definida arriba del include de este archivo
uniform vec3 uColorAmbiente;
uniform vec3 uColorLuzGlobal;
uniform vec3 uDireccionLuzGlobal;

vec3 pesosIluminacionGlobal(){
  float pesoGlobal = max(dot(normalFinal(), uDireccionLuzGlobal), 0.0);
  return uColorLuzGlobal*pesoGlobal+uColorAmbiente;
}
