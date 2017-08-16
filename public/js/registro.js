var $nombre = $('#nombre');
var $correo = $('#correo');
var $contraseña = $('#contrasenia');
var $form = $('#form');
var $botonCrearUsuario = $('#crearUsuario');
var $dia = $('#dia');
var $mes = $('#mes');
var $año = $('#anio');
var fecha = $año.val() + '-' + $mes.val() + '-' + $dia.val();
var cargarPagina = function() {
    $form.submit(validarCampos);
    validarCamposVacios();
    $nombre.keyup(validarCamposVacios);
    $correo.keyup(validarCamposVacios);
    $contraseña.keyup(validarCamposVacios);
    $botonCrearUsuario.click(validarCampos);
    $año.keyup(validarCamposVacios);
    $mes.keyup(validarCamposVacios);
    $dia.keyup(validarCamposVacios);
}
var registrarUsuario = function() {
    console.log("entrando")
    $.ajax({
        url: 'http://imagentv.jediteam.mx/api/users/register',
        type: 'POST',
        dataType: 'json',
        timeout: 0,
        data: {
            "type": 1,
            "name": $nombre.val(),
            "email": $correo.val(),
            "password": $contraseña.val(),
            "birthday": $año.val() + '-' + $mes.val() + '-' + $dia.val(),
            "gender": 'Femenino',
        },
        success: function(response, textStatus) {
            console.log(textStatus)
        },
        error : function(error ) {
            console.log(error)
        },
        complete: function(jqxhr, textStatus){
            console.log(textStatus);
            if(textStatus == 'success'){
                alert("El registro fue exitoso");
                setTimeout(function(){location.href = "bienvenido.html"}, 2000)
            } else {alert('Lo sentimos, por el momento no podemos registrate, intentalo más tarde.')}
        }
    })
}
var validarCampos = function(e) {
    e.preventDefault();
    if (validarNombre() && validarCorreo() && validarContraseña() && validarDia() && validarMes() && validarAño()) {
        registrarUsuario();
    }
}
var validarCamposVacios = function() {
    if ($nombre.val().length == 0 || $correo.val().length == 0 || $contraseña.val().length == 0 || $año.val().length == 0 || $dia.val().length == 0 || $mes.val().length == 0) {
        $botonCrearUsuario.addClass('disabled');
    } else {
        $botonCrearUsuario.removeClass('disabled');
    }
};
var validarDia = function() {
    if ($dia.val() > 0 && $dia.val() < 32) {
        return true;
    } else {
        alert("Por favor ingresa un día válido")
    };
}
var validarMes = function() {
    if ($mes.val() > 0 && $mes.val() < 13) {
        return true;
    } else {
        alert("Por favor ingresa un número de mes válido")
    };
}
var validarAño = function() {
    if ($año.val() > 2004) {
        alert('Lo sentimos, la edad mínima para tu registro debe ser de 13 años');
    } else if ($año.val() < 1918) {
        alert('Por favor ingresa un año de nacimiento válido');
    }
    if ($año.val() < 2004 && $año.val() > 1918) {
        return true;
    };
}
var validarNombre = function() {
    var parametroNombre = /[A-Za-zñÑ-áéíóúÁÉÍÓÚ\s\t-]/;
    if (parametroNombre.test($nombre.val())) {
        return true;
    } else {
        alert("Por favor ingresa un nombre válido");
    }
}
var validarContraseña = function() {
    if ($contraseña.val().length > 6) {
        alert("Recuerda que debes ingresar un password de 6 dígitos");
    } else if ($contraseña.val().length < 6) {
        alert("Recuerda que debes ingresar un password de mínimo 6 dígitos");
    } else if ($contraseña.val().length == 6) {
        return true
    };
}
var validarCorreo = function() {
    var parametroEmail = /^[-\w.%+]{1,64}@(?:[A-Z0-9-]{1,63}\.){1,125}[A-Z]{2,63}$/i;
    if (parametroEmail.test($correo.val())) {
        return true;
    } else {
        alert("Ingresa un email valido");
    }
}
$(document).ready(cargarPagina);