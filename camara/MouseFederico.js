function MouseFederico(canvas){
  let yo=this;
  let apretando=false;
  canvas.addEventListener("mousedown",function(e){
    apretando=true;
  });
  canvas.addEventListener("mouseup",function(e){
    apretando=false;
  });

  canvas.addEventListener("mousemove",function(e){
    if(apretando){
      yo.llamar.forEach(function(f){
        f(e.movementX,e.movementY);
      })
    };
  });

  canvas.addEventListener("wheel",function(e){
      yo.llamarScroll.forEach(function(f){
        f(e.deltaY);
      });
  });

  this.llamar=[];
  this.llamarScroll=[];
}
