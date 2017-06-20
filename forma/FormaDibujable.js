function FormaDibujable(forma,valor){

  if(forma.dibujable===undefined){
    if(valor ==null){
      forma.dibujable=true;
    }else{
      forma.dibujable=valor;
    }
  }else{
    if(valor ==null){
      //nada
    }else{
      forma.dibujable=valor;
    }
  }
  return forma;

}
