function FormaVacia(gl){

  let normal_buffer=[];
  let texture_coord_buffer=[];
  let position_buffer=[];
  let index_buffer=[];
  let color_buffer=[];
  let tangent_buffer=[];
  let binormal_buffer=[];

  //hacer copia con varias texturas
  this.hacerCopiaConTexturas=function(base,sobre){
    let copia=jQuery.extend({},this);
    return FormaMultitexturable(copia).agregarSampler2D("uSamplerBase",base).agregarSampler2D("uSamplerSobre",sobre);
  }


  //INTERFAZ
  this.normal_buffer=normal_buffer;
	this.texture_coord_buffer=texture_coord_buffer;
	this.position_buffer=position_buffer;
	this.index_buffer=index_buffer;
	this.color_buffer=color_buffer;
  this.tangent_buffer=tangent_buffer;
  this.binormal_buffer=binormal_buffer;

  //-- interfaz obligatoria --//
  this.copiaConTextura=hacerMetodoCopiaConTextura(this,gl);
  this.modoDibujado = getter(gl.TRIANGLES);
  //this.esIluminado=getter(false);
  this.hacerCopiaConTextura=hacerMetodoCopiaConTextura(this,gl);

}
