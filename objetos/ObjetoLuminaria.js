function factorial(n){
	if(n==0)
		return 1;
	return n*factorial(n-1);
}
function combinatoria(tamanioConjunto,tamanioSubconjunto){
	return factorial(tamanioConjunto)/factorial(tamanioSubconjunto)/factorial(tamanioConjunto-tamanioSubconjunto);
}
function curvaBezier(puntosControl){
	var funciones= new Array();
	var coeficiente= new Array();
	for(var i=0;i<puntosControl.length/3;i++){
		coeficiente.push(combinatoria(puntosControl.length/3-1,i));
	}
	var curva=function(t){
		this.cantidadPuntos=puntosControl.length/3;
		this.puntosControl=puntosControl;
		this.coeficiente=coeficiente;
		suma=[0,0,0];
		for(var puntoControl=0;puntoControl<this.cantidadPuntos;puntoControl++){
			for(var coordenada=0;coordenada<3;coordenada++){
				suma[coordenada]+=this.puntosControl[puntoControl*3+coordenada]*Math.pow((1-t),this.cantidadPuntos-1-puntoControl)*Math.pow(t,puntoControl)*this.coeficiente[puntoControl];
			}
			
		}
		return suma;
	}
	funciones.push(curva);
	var derivada=function(t){
		this.cantidadPuntos=puntosControl.length/3;
		this.puntosControl=puntosControl;
		this.coeficiente=coeficiente;
		suma=[0,0,0];
		var n=this.cantidadPuntos-1;
		for(var puntoControl=0;puntoControl<this.cantidadPuntos;puntoControl++){
			for(var coordenada=0;coordenada<3;coordenada++){
				suma[coordenada]+=this.puntosControl[puntoControl*3+coordenada]*this.coeficiente[puntoControl]*(
										((this.cantidadPuntos-1-puntoControl==0)? 0:(Math.pow((1-t),this.cantidadPuntos-2-puntoControl)))*(-1)*(this.cantidadPuntos-1-puntoControl)*Math.pow(t,puntoControl)
										+((puntoControl==0)?0:(Math.pow(t,puntoControl-1)))*puntoControl*Math.pow((1-t),this.cantidadPuntos-1-puntoControl));
			
			
			}
		}
		let norma=0;

		for(var coordenada=0;coordenada<3;coordenada++){
			norma+=suma[coordenada]*suma[coordenada];

		}
		norma=Math.sqrt(norma);
		if(norma==0){
			console.log("norma 0, error");
			return [1,0,0];
		}
		for(var coordenada=0;coordenada<3;coordenada++){
			suma[coordenada]/=norma;

		}

		return suma;
	}
	funciones.push(derivada);
	return funciones;

}

function ObjetoLuminaria(programaColor,gl){
	let radioBorde=1;
	let radioBase=3;
	let alturaBase=7;
	let extensionSobreRutaLuminaria=25;
	let alturaLuminaria=50;
	let cantidadPuntosEnCirculo=20;
	let largoLuz=7;
	let anchoLuz=4;
	let altoLuz=2;

	let contornoCirculo = new Array();
	let normalesCirculo = new Array();
	let contornoBase= [0,0,alturaBase,0,radioBase,alturaBase,0,radioBase,alturaBase,0,radioBase,0,0,0,0];
	let normalesBase= [0,0,1,0,0,1,0,1,0,0,1,0,0,0,-1];
	let objetoLuminaria = new Objeto();

	for(var i=0;i<=cantidadPuntosEnCirculo;i++){
		contornoCirculo.push(0);
		contornoCirculo.push(radioBorde*Math.cos(2*Math.PI*i/cantidadPuntosEnCirculo));
		contornoCirculo.push(radioBorde*Math.sin(2*Math.PI*i/cantidadPuntosEnCirculo));
		normalesCirculo.push(0);
		normalesCirculo.push(Math.cos(2*Math.PI*i/cantidadPuntosEnCirculo));
		normalesCirculo.push(Math.sin(2*Math.PI*i/cantidadPuntosEnCirculo));
	}

	var amarilloSucio=[function (u,v){return 0.6},function (u,v){return 0.5},function (u,v){return 0.1}];
	
	var curvas=curvaBezier([0,0,0,alturaLuminaria*0.75,0,0,alturaLuminaria,0,0,alturaLuminaria,extensionSobreRutaLuminaria,0]);
    var colorCaja=function(cara){
    	if(cara==2)
    		return [1,1,1];
    	else
    		return [0.6,0.5,0.1];
    }
	let formaPalo = new FormaBarrido(contornoCirculo,normalesCirculo,curvas,amarilloSucio,0.05,gl);
	let formaBase = new FormaRevolucion(contornoBase,normalesBase,Math.PI*2/cantidadPuntosEnCirculo,amarilloSucio,gl);
	let formaCaja = new FormaCaja(colorCaja,gl);


	let objetoPalo = new Objeto(new Modelo(formaPalo,programaColor,gl));
	let objetoBase = new Objeto(new Modelo(formaBase,programaColor,gl));
	let objetoCaja = new Objeto(new Modelo(formaCaja,programaColor,gl));
	//objetoPalo.mover(0,0,alturaBase);

	let desp=curvas[0](1);
	objetoCaja.mover(desp[0],desp[1],desp[2]);
	objetoCaja.mover(0,largoLuz/2,0);

	objetoCaja.rotar([0,0,1],Math.PI/2);	
	objetoCaja.rotar([0,1,0],Math.PI/2);
	objetoCaja.escalar(largoLuz,anchoLuz,altoLuz);


	let objetoPaloCaja=new Objeto();

	
	objetoPaloCaja.hijos.push(objetoCaja);
	objetoPaloCaja.hijos.push(objetoPalo);

	objetoPaloCaja.mover(0,0,alturaBase);
	objetoPaloCaja.rotar([0,1,0],-Math.PI/2);


	objetoLuminaria.hijos.push(objetoPaloCaja);
	objetoLuminaria.hijos.push(objetoBase);

	return objetoLuminaria;


	
}