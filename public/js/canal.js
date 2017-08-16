var cargarPagina = function(){
	$(".button-collapse").sideNav();
	$('.slider').slider();
	$('.detalle').click(detalleVideo);
};


var detalleVideo = function(){
	location.href = 'detalle-video.html';
};

$(document).ready(cargarPagina);