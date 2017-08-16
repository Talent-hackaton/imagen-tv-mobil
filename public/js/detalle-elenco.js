var cargarPagina = function(){
    $(".button-collapse").sideNav();
	cargarDetalleDeElenco();
};

var cargarDetalleDeElenco = function(){
	 $.ajax({
        url: 'http://imagentv.jediteam.mx/api/v2/application/detailsheet/{host|cast}/:id',
        type: 'GET',
        dataType: 'json',
        timeout: 0,
        data: {
            'id': localStorage.id,
        },
        success: function(response) {
            console.log("response",response)
        },
        error : function(error ) {
            console.log(error)
        },
        complete: function(jqxhr, textStatus){
            if(textStatus == "error"){
                registroUsuarioApi(responseAPI);
            } else {
                swal({
                    title: "Bienvenid@!",
                    text: responseAPI.name,
                    timer: 2000,
                    showConfirmButton: false
                });
                setTimeout(function(){
                    location.href = "canal.html";
                }, 2100);
            }
        }
    })
};

$(document).ready(cargarPagina);
