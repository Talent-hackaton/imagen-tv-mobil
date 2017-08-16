var cargarPagina = function(){
	$(".button-collapse").sideNav();
	$('.slider').slider();
	cargarCanal();
	$('.detalle').click(detalleVideo);
};

//Carga informacion del menu barra de navegacion
var cargarCanal = function(){
	$.ajax({
		url: 'http://imagentv.jediteam.mx/api/users/menu',
		type: 'GET',
		dataType: 'json',
		timeout: 0,
		data: {
			'api_key': localStorage.token,
		},
		success: function(response) {
			console.log("response",response)
		},
		error : function(error ) {
			console.log(error)
		},
		complete: function(jqxhr, textStatus){
			console.log('complete');
		}
	});

}


var detalleVideo = function(){
	location.href = 'detalle-video.html';
};

$(document).ready(cargarPagina);