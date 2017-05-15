function generar(){

}
var puntos=new Array();
var l=document.getElementById("curva");
var c=l.getContext("2d");

function reiniciar_curva(){
  
  puntos=new Array();
  c.clearRect(0, 0, l.width, l.height);
}

l.onmousedown = function (e) {
   var bbox = l.getBoundingClientRect();
  console.log("evento");
   agregarPuntoControl(e.clientX- bbox.left * (l.width  / bbox.width), e.clientY - bbox.top  * (l.height / bbox.height)); 
 // agregarPuntoControl(e.clientX,e.clientY);
};
function agregarPuntoControl(x,y){
  puntos.push(x);
  puntos.push(y);
  puntos.push(0.0);
  console.log(puntos);
  
    dibujar();
}
function dibujar(){

//var puntos=[100.0,100.0,0.0,100.0,200.0,0.0,200.0,200.0,0.0,350.0,50.0,0.0];
if(puntos.length>=3*3){
  var curva=curvaBSplineCuadratica(puntos);

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
  console.log("Voy a dibujar");
for(var i=0;i*3<puntos.length;i++){
  c.beginPath();
  c.arc(puntos[i*3],puntos[i*3+1],1,0,2*Math.PI);
  c.fillStyle = "red"; // color de las estrellas
  c.fill();
  c.stroke();
}

}