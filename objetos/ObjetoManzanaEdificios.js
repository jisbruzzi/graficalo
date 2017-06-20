
//--copio y pego este random--//
// Standard Normal variate using Box-Muller transform.
function randn_bm() {
    var u = 1 - Math.random(); // Subtraction to flip [0, 1) to (0, 1].
    var v = 1 - Math.random();
    return Math.sqrt( -2.0 * Math.log( u ) ) * Math.cos( 2.0 * Math.PI * v );
}

function rand_exp(lambda){
  return Math.log(1-Math.random())/(-lambda)
}



function ObjetoManzanaEdificios(lado,gl,retardoManzana,colectorEdificios,xManzana,yManzana){
  let yo = new Objeto();
  yo.setPosicion(xManzana,yManzana,0);

  let listaEdificios=new ListaEdificios(lado);


  listaEdificios.forEach(agregarEdificio);
  colectorEdificios.actualizar();

  function agregarEdificio(edificio){

    //la altura viene de dos cosas: el área del edificio y la centralidad dentro de la cuadrd
    let distCentroX=edificio.x-lado/2;
    let distCentroY=edificio.y-lado/2;
    let distCentro = 1-Math.sqrt(distCentroX*distCentroX+distCentroY*distCentroY)/lado;

    let area = Math.sqrt(edificio.ancho*edificio.fondo/lado);

    let altura = Math.max(randn_bm()*(area*3/2+distCentro/2)*1.5+4*distCentro+2*area+1,0.5);
    let retardo = Math.max(rand_exp(1)+0.2,0.2)+retardoManzana;
    let tiempoAnimacion=Math.max(rand_exp(0.8)+0.2,0.5);

    let ancho = edificio.ancho-0.2;
    let fondo = edificio.fondo-0.2;
    let x = edificio.x-lado/2+edificio.ancho/2;
    let y = edificio.y-lado/2+edificio.fondo/2;
    let o = colectorEdificios.agregarEdificio(ancho,fondo,gl,altura,retardo,tiempoAnimacion,x+xManzana,y+yManzana,edificio.ancho,edificio.fondo);

  }

  return yo;
}
