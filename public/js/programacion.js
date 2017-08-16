var plantilla = '<li class="collection-item">'+
                    '<div class="row">'+
                        '<div class="col s2">'+
                            '<span>**hora**</span>'+
                        '</div>'+
                        '<div class="col s10">'+
                            '<span>**programa**</span>'+
                            '<a href="#!" class="secondary-content detallevideo" data="**idvideo**"><i class="material-icons">send</i></a>'+
                       ' </div>'+
                    '</div>'+
                '</li>';

var cargarPagina = function() {
    console.log(dir.url)
    programacionHoy();
    
}


var obtenerFecha = function(){

    var hoy = new Date();
    var dd = hoy.getDate();
    var mm = hoy.getMonth()+1; //hoy es 0!
    var yyyy = hoy.getFullYear();

    if(dd<10) {
        dd='0'+dd
    } 

    if(mm<10) {
        mm='0'+mm
    } 

    hoy = yyyy+'-'+mm+'-'+dd;
    return hoy;
}

var obtenerHoraActual = function(){
    var horaActual = new Date();
    var hora = horaActual.getHours();
    var min = horaActual.getMinutes()
    if(hora <10){
        hora='0'+hora;
    }
    if(min <10){
        min='0'+min;
    }
    horaActual = hora+':'+min;
    return horaActual;
}

var dir = {url: 'http://imagentv.jediteam.mx/api/application/escaleta/filter?date='}
var programacionHoy = function() {

    $.ajax({
        url: dir.url+obtenerFecha()+' '+obtenerHoraActual(),
        type: 'GET',
        dataType: 'json',
        timeout: 0,
        success: function(response, textStatus) {
            obtenerDataProgramas(response);
        },
        error: function(error) {
            console.log(error)
        },
        complete: function(jqxhr, textStatus) {
            console.log(textStatus);
            if(textStatus == 'succes'){
                alert("Ya puedes ver la programacionHoy")
            }
        }
    })
}

var programacionMartes = function(){

}

var obtenerDataProgramas = function(response){
    console.log(response);
    var programas = response.schedules;
    var plantillaFinal = "";
    var idVideo = 0;
    console.log(response)
    console.log(programas);
    programas.forEach(function(programa){
            plantillaFinal += plantilla.replace('**hora**', programa.hour)
                                        .replace('**programa**', programa.program)
                                        .replace('**idvideo**', programa.id);

    $('#cont-mie').html(plantillaFinal);
    $('.detallevideo').click(function(e){
              localStorage.setItem('idVideo',$(this).attr('data'))
              console.log(localStorage.idVideo)
               setTimeout(function(){location.href="detalle-video.html"}, 3000)
            })
        })
}

$(document).ready(cargarPagina);