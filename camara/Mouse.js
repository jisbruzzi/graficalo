function Mouse(canvas){
  let yo=this;
  canvas.addEventListener("mousedown",function(e){
    canvas.requestPointerLock();
  });

  canvas.addEventListener("mousemove",function(e){
    if(document.pointerLockElement === canvas){
      yo.llamar.forEach(function(f){
        f(e.movementX,e.movementY);
      })
    };
  });

  canvas.addEventListener("wheel",function(e){
    if(document.pointerLockElement === canvas){
      yo.llamarScroll.forEach(function(f){
        f(e.deltaY);
      })
    };
  });

  this.llamar=[];
  this.llamarScroll=[];
}
