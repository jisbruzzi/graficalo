function FormaCubierta(gl){//los colores se deben pasar por caras, siendo 0 YZ,1XZ,2XY,3YZop,4XZop,5XYop
  let posContorno=[];
  let normContorno=[];
  let puntosEnCurvatura=5;
  let radioInterno=1;
  let radioExterno=radioInterno*1.2;
  let alturaCubierta=1;
  let radioCurvatura=radioExterno-radioInterno;
  var fCero=function(u,v){return 0;}
  let color=[fCero,fCero,fCero];

  for(var i=0;i<puntosEnCurvatura;i++){
    posContorno.push(0);
    posContorno.push(radioInterno+radioCurvatura*Math.sin(i/(puntosEnCurvatura-1)*Math.PI/2));
    posContorno.push(radioCurvatura-radioCurvatura*Math.cos(i/(puntosEnCurvatura-1)*Math.PI/2));
    normContorno.push(0);
    normContorno.push(Math.sin(i/(puntosEnCurvatura-1)*Math.PI/2));
    normContorno.push(-Math.cos(i/(puntosEnCurvatura-1)*Math.PI/2));
  }
  for(var i=0;i<puntosEnCurvatura;i++){
    posContorno.push(0);
    posContorno.push(radioInterno+radioCurvatura*Math.cos(i/(puntosEnCurvatura-1)*Math.PI/2));
    posContorno.push(alturaCubierta-radioCurvatura+radioCurvatura*Math.sin(i/(puntosEnCurvatura-1)*Math.PI/2));
    normContorno.push(0);
    normContorno.push(Math.cos(i/(puntosEnCurvatura-1)*Math.PI/2));
    normContorno.push(Math.sin(i/(puntosEnCurvatura-1)*Math.PI/2));
  }
  return new FormaRevolucion(posContorno,normContorno,Math.PI/20,color,gl);


}