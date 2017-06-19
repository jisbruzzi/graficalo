function FormaCustomizable(f){
  //interfaz particular
  f.definirBufferConstante=function(nombre,valor){
    let buf_nuevo=[]
    for(let i=0;i<f.position_buffer.length/3;i++){
      buf_nuevo.push(valor);
    }
    f[nombre]=buf_nuevo;
  }
}
