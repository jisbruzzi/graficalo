function FormaCombinada(){
  FormaDibujable(this,false);
  function generarAgregarForma(yo){
    return function(forma){
      yo.copiaConTextura = forma.copiaConTextura;
      yo.modoDibujado = forma.modoDibujado;
      let largoAhora=0;
      if("position_buffer" in yo){
        largoAhora=yo.position_buffer.length/3;
      }
      for (let atributo in forma){
        if (Array.isArray(forma[atributo])){

          if(atributo in yo){
            if(atributo === "index_buffer"){
              forma[atributo].forEach(function(n){
                yo[atributo].push(n+largoAhora);
              });
            }else{
              yo[atributo]=yo[atributo].concat(forma[atributo]);
            }
          }else{
            yo[atributo]=forma[atributo];
          }
          yo.dibujable=true;
        }
      }
      return yo;
    };

  }
  this.agregarForma=generarAgregarForma(this);
  /*
  this.agregarForma=function(forma){
    this.copiaConTextura = forma.copiaConTextura;
    this.modoDibujado = forma.modoDibujado;
    for (let atributo in forma){
      if (Array.isArray(forma[atributo])){
        console.log("agrego el array "+atributo);

        if(atributo in this){
          //this[atributo]=this[atributo].concat(forma[atributo]);
          Object.defineProperty(this,atributo,{value:forma[atributo].concat(this[atributo])});
          console.log("de nuevo me agregan "+atributo);
        }else{
          //yo[atributo]=forma[atributo];
          console.log("la primera vez que me agregan "+atributo);
          Object.defineProperty(this,atributo,{value:forma[atributo]});
        }
        console.log(this);
        this.dibujable=true;

      }
    }
  };
  */

  this.hacerCopiaConTextura=hacerMetodoCopiaConTextura(this);
  this.hacerCopiaConTexturas=function(base,sobre){
    let copia=jQuery.extend({},this);
    copia.uSamplerBase=getter(base);

    copia.uSamplerSobre=getter(sobre);
    return copia;
  }
  this.nombre="combinada";
}
