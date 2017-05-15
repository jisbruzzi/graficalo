var controles=document.getElementById("controles");
var controles_auxiliares=document.getElementById("controles_alternativos");


function ocultar_controles(){
	controles.style.display='none';	
	controles_auxiliares.style.display='inline';
}
function mostrar_controles(){
	controles.style.display='inline';
	controles_auxiliares.style.display='none';
}