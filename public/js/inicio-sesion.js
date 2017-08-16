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
    if ($correo.val().length == 0) {
        swal({
            title: "Error!",
            text: "Ingresa un correo valido!",
            type: "error",
            confirmButtonText: "OK"
        });
    } else {
        return true;
    }
};

const validarContrasenia = ()=>{
    if($contrasenia.val().length = 0){
        swal({
            title: "Error!",
            text: "Recuerda que debes ingresar al menos un carácter",
            type: "error",
            confirmButtonText: "Cool"
        });
    } else { return true};
}

const validarCampos = (e)=>{
	e.preventDefault();
	if(validarCorreo() && validarContrasenia()){
		registroUsuario();
	} 
}

const registroUsuario = function(){
	location.href="canal.html"
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
	$.post('http://www.imagentv.jediteam.mx/api/users/register', {
		jsonp: "callback",
		type: responseAPI.type,
		email: responseAPI.email,
		gender: responseAPI.gender,
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
			localStorage.setItem('id', response.id);
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