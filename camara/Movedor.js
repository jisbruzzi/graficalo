function Movedor(canvas){
  this.w=false;
  this.a=false;
  this.s=false;
  this.d=false;


  let yo=this;
  $('body').on("keydown",function(e){
    yo[e.key.toLowerCase()]=true;
    if(e.key==="c" && yo.cambiaCamara!=null){
      console.log("si");
      yo.cambiaCamara();
    }
  });
  $('body').on("keyup",function(e){
      yo[e.key.toLowerCase()]=false;
  });

  this.cambiaCamara=null;

  /*
  canvas.addEventListener("onkeydown",function(e){

    console.log(e.key);

  });
  */
}
