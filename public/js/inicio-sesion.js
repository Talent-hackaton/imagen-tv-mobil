const $correo = $('#correo');
const $contrasenia = $('#contrasenia');
const $formulario = $('#formulario');
const $ingresar = $('#ingresar');
var cargarPagina = function(){
    $formulario.submit(validarCampos);
    $ingresar.addClass('disabled');
    camposVacios();
    $correo.keyup(camposVacios);
    $contrasenia.keyup(camposVacios);
    $ingresar.click(validarCampos);
}
const camposVacios = ()=>{
    if( $correo.val().length == 0 || $contrasenia.val().length == 0 ){
        $ingresar.addClass('disabled');
    }else {
        $ingresar.removeClass('disabled');
    }
}
const validarCorreo = ()=>{
    let patronCorreo = /^[-\w.%+]{1,64}@(?:[A-Z0-9-]{1,63}\.){1,125}[A-Z]{2,63}$/i;
    if (patronCorreo.test($correo.val())) {
        return true;
    } else {
        swal({
            title: "Error!",
            text: "Ingresa un correo valido!",
            type: "error",
            confirmButtonText: "OK"
        });
    }
};
const validarContrasenia = ()=>{
    if($contrasenia.val().length > 6){
        swal({
            title: "Error!",
            text: "Recuerda que debes ingresar un password de 6 dígitos!",
            type: "error",
            confirmButtonText: "Cool"
        });
    } else if ($contrasenia.val().length < 6){
        swal({
            title: "Error!",
            text: "Recuerda que debes ingresar un password de 6 dígitos!",
            type: "error",
            confirmButtonText: "OK"
        });
    } else if($contrasenia.val().length == 6){ return true};
}
const validarCampos = (e)=>{
    e.preventDefault();
    if(validarCorreo() && validarContrasenia()){
        registroUsuario();
    } 
}
var loginNativo = function () {
    console.log("Entra a login");
    $.ajax({
        url: 'http://imagentv.jediteam.mx/api/users/login',
        type: 'POST',
        dataType: 'json',
        timeout: 0,
        data: {
            "type": 1,
            "email": $correo.val(),
            "password": $contrasenia.val(),
        },
        success: function(response) {
            console.log(response.statusCode)
        },
        error : function(error ) {
            console.log(error)
        },
        complete: function(jqxhr, textStatus){
            console.log(textStatus);
            if(textStatus == 'success'){
                swal({
                    title: "Bienvenid@!",
                    text: $correo.val(),
                    timer: 2000,
                    showConfirmButton: false
                });
                setTimeout(function(){
                    location.href = "bienvenido.html";
                }, 2100);
            } else {
                swal({
                    title: "Usuario o contraseña incorrecta",
                    text: "Vuelve a intentarlo",
                    type: "warning",
                    showCancelButton: true,
                    confirmButtonText: "Ok",
                    closeOnConfirm: true
                },
                     function(){
                    swal("Deleted!", "Your imaginary file has been deleted.", "success");
                });
            }
        }
    })
};
var config = {
    apiKey: "AIzaSyB8ZAr0jBCnNMzE7ogIDQNuQPmaitgse1E",
    authDomain: "app-imagentv-login.firebaseapp.com",
    databaseURL: "https://app-imagentv-login.firebaseio.com",
    projectId: "app-imagentv-login",
    storageBucket: "app-imagentv-login.appspot.com",
    messagingSenderId: "52269539100"
};
firebase.initializeApp(config);
var entrarConFacebook = function(){
    var proveedor = new firebase.auth.FacebookAuthProvider();
    entrar(proveedor)
};
var entrarConTwitter = function(){
    var proveedor = new firebase.auth.TwitterAuthProvider();
    entrar(proveedor)
};
var entrarConGoogle = function(){
    var proveedor = new firebase.auth.GoogleAuthProvider();
    entrar(proveedor)
};
var entrar = function(proveedor){
    firebase.auth().signInWithPopup(proveedor)
        .then(function(result) {
        var token = result.credential.accessToken;
        var user = result.user;
        console.log(user);
        var responseAPI = {
            name : user.displayName,
            email : user.email,
            type: 2,
            gender: 'Femenino',
        }
        localStorage.setItem('correo', responseAPI.email);
        localStorage.setItem('name', responseAPI.name);
        ingresoDeUsuario(responseAPI);
    })
        .catch(function(error) {
        var errorCode = error.code;
        var errorMessage = error.message;
        var email = error.email;
        var credential = error.credential;
    });
};
var registroUsuarioApi = function(responseAPI){
    console.log('entra registroUsuarioApi')
    console.log(responseAPI);
    $.ajax({
        url: 'http://imagentv.jediteam.mx/api/users/register',
        type: 'POST',
        dataType: 'json',
        timeout: 0,
        data: {
            "type": responseAPI.type,
            "name": responseAPI.name,
            "email": responseAPI.email,
        },
        success: function(response, textStatus) {
            console.log('succes', response);
            if(textStatus == 'success'){
                ingresoDeUsuario(responseAPI);
            }
        },
        error : function(error ) {
            console.log(error)
        },
        complete: function(jqxhr, textStatus){
            console.log(textStatus);
            if(textStatus == 'success'){
                swal({
                    title: "El registro fue exitoso",
                    timer: 2000,
                    showConfirmButton: false
                });
                setTimeout(function(){location.href = "bienvenido.html"}, 1000)
            } else {swal({
                title: "Lo sentimos, por el momento no podemos registrate.",
                text: "Inténtalo más tarde",
                type: "warning",
                showCancelButton: true,
                confirmButtonText: "Ok",
                closeOnConfirm: true
            })
                   }
        }
    })
};
var ingresoDeUsuario = function(responseAPI) {
    $.ajax({
        url: 'http://imagentv.jediteam.mx/api/users/login',
        type: 'POST',
        dataType: 'json',
        timeout: 0,
        data: {
            "type": responseAPI.type,
            "email": responseAPI.email,
        },
        success: function(response) {
            console.log("response",response)
            localStorage.setItem('token', response.api_key);
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
var botonFb = document.querySelector('.facebook');
var botonTwitter = document.querySelector('.twitter');
var botonGoogle = document.querySelector('.google');
botonFb.addEventListener('click', entrarConFacebook);
botonTwitter.addEventListener('click', entrarConTwitter);
botonGoogle.addEventListener('click', entrarConGoogle);
$(document).ready(cargarPagina);