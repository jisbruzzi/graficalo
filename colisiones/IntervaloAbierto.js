function IntervaloAbierto(desde,hasta){
  this.desde = desde;
  this.hasta = hasta;
  this.tiene=function(n){
    return Math.min(desde,hasta)<n && n<Math.max(desde,hasta);
  }
  this.casiTiene=function(n){
    return Math.min(desde,hasta)<=n && n<=Math.max(desde,hasta);
  }
  this.interseca=function(otro){
    return (this.tiene(otro.desde) || this.tiene(otro.hasta) || otro.tiene(this.desde) || otro.tiene(this.hasta))||
    (this.casiTiene(otro.desde) && this.casiTiene(otro.hasta));
  }
  this.contiene=function(otro){
    return this.casiTiene(otro.desde) && this.casiTiene(otro.hasta);
  }
}
