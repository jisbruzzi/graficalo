


var puntos=new Array();
var l=document.getElementById("curva");
var c=l.getContext("2d");

function reiniciar_curva(){
  
  puntos=new Array();
  c.clearRect(0, 0, l.width, l.height);
}

l.onmousedown = function (e) {
   var bbox = l.getBoundingClientRect();
   agregarPuntoControl(e.clientX- bbox.left * (l.width  / bbox.width), e.clientY - bbox.top  * (l.height / bbox.height)); 
 // agregarPuntoControl(e.clientX,e.clientY);
};
function agregarPuntoControl(x,y){
  if(puntos.length<3 || x>puntos[puntos.length-3]){//no deja poner un punto que tenga un x mayor que el anterior
    puntos.push(x);
    puntos.push(y);
    puntos.push(0.0);
    
    dibujar();
    }
}
function dibujar(){

//var puntos=[100.0,100.0,0.0,100.0,200.0,0.0,200.0,200.0,0.0,350.0,50.0,0.0];
if(puntos.length>=3*3){
  var curva=curvaBSplineCuadratica(puntos)[0];

  c.clearRect(0, 0, l.width, l.height);

  c.beginPath();
  var puntoInicial=curva(0);
  c.moveTo(puntoInicial[0],puntoInicial[1]);
  var paso=0.001/puntos.length*3;
  for(var i=paso;i<=1;i+=paso) {
    var punto=curva(i);
    c.lineTo(punto[0],punto[1]);
  //  document.write(puntoAnterior[0]+" "+puntoAnterior[1]+ "<br>");
  }
    c.stroke();
}
for(var i=0;i*3<puntos.length;i++){
  c.beginPath();
  c.arc(puntos[i*3],puntos[i*3+1],1,0,2*Math.PI);
  c.fillStyle = "red"; // color de las estrellas
  c.fill();
  c.stroke();
}

}

function generar(){
  var puntosAux=puntos.slice(0);
  if(puntosAux.length>=3*3){
    puntoInicio=[(puntosAux[0]+puntosAux[3])/2,(puntosAux[1]+puntosAux[4])/2,(puntosAux[2]+puntosAux[5])/2];//"normalizo"
    for(var i=0;i<puntosAux.length/3;i++){
      puntosAux[i*3] -= puntoInicio[0];
      puntosAux[i*3+1] -= puntoInicio[1];
      puntosAux[i*3+2] -= puntoInicio[2]; 
    }

      
    document.getElementById("canvas-espera").style.display="none";

    webGLStart(curvaBSplineCuadratica(puntosAux));
  }
}

