function ObjetoSubcolectorEdificios(gl,texturasPisos,texturasPlantabaja){
  let programaEdificio = atlasShaderPs.p("edificio");
  let yo=new Objeto();


  function elementoAlAzar(array){
    let r=Math.random();
    let cual = Math.floor(r*array.length);
    return array[cual];
  }

  let formaVieja=null;
  let formaCombinada=new FormaCombinada();
  formaCombinada=formaCombinada.agregarForma(new FormaVacia(gl));

  yo.agregarEdificio=function(ancho,fondo,gl,altura,retardo,tiempoAnimacion,x,y,anchoUv,fondoUv){

    //let e = new ObjetoEdificio(ancho,fondo,gl,altura,retardo,tiempoAnimacion);
    let forma = new FormaEdificio(gl,ancho,fondo,x,y,altura,anchoUv,fondoUv);
    FormaCustomizable(forma);
    //forma.definirBufferConstante("altura_base_buffer",tPlantabaja.height/tPlantabaja.width);
    //forma.definirBufferConstante("altura_sobre_buffer",tPisos.height/tPisos.width);
    //forma.definirBufferConstante("alto_maximo_buffer",altura); ya no se necesita
    forma.definirBufferConstante("numero_textura_sobre_buffer",elementoAlAzar([0,1,2,3]));
    forma.definirBufferConstante("numero_textura_base_buffer",elementoAlAzar([0,1,2,3]));
    forma.definirBufferConstante("retardo_animacion_buffer",retardo);
    forma.definirBufferConstante("duracion_animacion_buffer",tiempoAnimacion);
    forma.definirBufferConstante("tipo_animacion_buffer",elementoAlAzar([1,2,3]));

    formaCombinada=formaCombinada.agregarForma(forma);
  }

  let ultimoDelta=0;
  let inicio=-1;
  yo.cambiarSobretick(function(delta){
    if(inicio==-1){
      inicio=delta;
    }
    yo.hijos.forEach(function(h){
      h.uniforms[0].valor=delta-inicio;
    });
    ultimoDelta=delta;

  });


  let luzGlobal={};
  let configurarIluminacionGlobalPre= yo.configurarIluminacionGlobal;
  yo.configurarIluminacionGlobal=function(luzGlobalNueva){
    luzGlobal=luzGlobalNueva;
    configurarIluminacionGlobalPre(luzGlobalNueva);
  }
  let listaLuces=[];
  yo.configurarLuces=function(lista){
    listaLuces=lista;
  }

  yo.actualizar=function(mundo){
    //elimino la forma anterior y el objeto anterior
    if(formaVieja!=null){
      Glizable(formaVieja,gl).eliminarBuffers();
      yo.hijos=[];
      formaVieja.teElimineComoTeDibujas=true;
      formaVieja.teAmo=false;
    }

    //agrego la forma nueva

    Glizable(formaCombinada,gl).actualizarGlizacion();

    FormaMultitexturable(formaCombinada);

    for(let i=0;i<4;i++){
      formaCombinada.agregarSampler2D("uSamplerBase"+i,atlasTexturas.t(texturasPlantabaja[i]));
    }
    for(let i=0;i<4;i++){
      formaCombinada.agregarSampler2D("uSamplerSobre"+i,atlasTexturas.t(texturasPisos[i]));
    }


    let o =new Objeto(new Modelo(formaCombinada,programaEdificio,gl));
    formaCombinada.teAmo=true;
    yo.hijos.push(o);
    o.uniforms.push({nombre:"uTiempo",valor:ultimoDelta-inicio});

    // guardo la forma para borrarla cuando corresponda
    formaVieja=formaCombinada;

    yo.hijos.forEach(function(h){
      for(let i=0;i<4;i++){
        let tex=atlasTexturas.t(texturasPlantabaja[i]);
        let rel = tex.height/tex.width;
        h.uniforms.push({nombre:"uAltoBase"+i,valor:rel});
      }
    });

    yo.hijos.forEach(function(h){
      for(let i=0;i<4;i++){
        let tex=atlasTexturas.t(texturasPisos[i]);
        let rel = tex.height/tex.width;
        h.uniforms.push({nombre:"uAltoSobre"+i,valor:rel});
      }
    });

    yo.hijos.forEach(function(h){
      h.configurarLuces(listaLuces);
      h.configurarIluminacionGlobal(luzGlobal);
    })
  }


  return yo;
}
