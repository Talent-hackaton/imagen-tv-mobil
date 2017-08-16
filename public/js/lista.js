var cargarPagina = function() {
    
    console.log(localStorage.getItem('token'))
    accederAMiLista();
}

var accederAMiLista = function() {
	$.ajax({
		url: 'http://imagentv.jediteam.mx/api/users/bookmarks',
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

$(document).ready(cargarPagina);