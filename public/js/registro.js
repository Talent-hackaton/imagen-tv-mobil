
const $name = $('#name');
const $email = $('#email');
const $password = $('#password');
const $form = $('#form');
const $createUser = $('#createUser');
var objetoDate = {
			      labelMonthNext: 'Siguien',
			      labelMonthPrev: 'Previo',
			      labelMonthSelect: 'Selecciona un mes',
			      labelYearSelect: false,
			      monthsFull: [ 'Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre' ],
			      monthsShort: [ 'Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun', 'Jul', 'Ago', 'Sep', 'Oct', 'Nov', 'Dic' ],
			      weekdaysFull: [ 'Domingo', 'Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado' ],
			      weekdaysShort: [ 'Dom', 'Lun', 'Mar', 'Mie', 'Jue', 'Vie', 'Sab' ],
			      weekdaysLetter: [ 'D', 'L', 'M', 'M', 'J', 'V', 'S' ],
			      today: false,
			      clear: 'Clear',
			      close: 'Close',
			      selectYears: false,
			      min: new Date(1925,3,20),
  				max: new Date(2000,7,14)
  			}

var cargarPagina = function(){
	$('select').material_select();
	$('.datepicker').pickadate(objetoDate);
	$form.submit(validateFields);
	emptyFields();
	$name.keyup(emptyFields);
	$email.keyup(emptyFields);
	$password.keyup(emptyFields);
	$createUser.click(validateFields);
}

const emptyFields = ()=>{
	if($name.val().length == 0 ||  $email.val().length == 0 || $password.val().length == 0 ){
		$createUser.addClass('disabled');
	}else {
		$createUser.removeClass('disabled');
	}
}

const validateEmail = ()=>{
	let emailRegex = /^[-\w.%+]{1,64}@(?:[A-Z0-9-]{1,63}\.){1,125}[A-Z]{2,63}$/i;
	if (emailRegex.test($email.val())) {
      return true;
    } else {
      alert("Ingresa un email valido");
    }
};

const validatePassword = ()=>{
	if($password.val().length > 6){
		alert("Recuerda que debes ingresar un password de 6 dígitos");
	} else if ($password.val().length < 6){
		alert("Recuerda que debes ingresar un password de mínimo 6 dígitos");
	} else if($password.val().length == 6){ return true};
}

const validateName = ()=>{
	let nameRegex =  /[A-Za-zñÑ-áéíóúÁÉÍÓÚ\s\t-]/;
	if(nameRegex.test($name.val())){
		return true;
	} else{
		alert("Por favor ingresa un nombre válido");
	}
}

const validateFields = (e)=>{
	e.preventDefault();
	if(validateName() && validateEmail() && validatePassword()){
		userRegister();
	} 
}
 
const userRegister = function(){
	location.href="notificaciones.html"
};

$(document).ready(cargarPagina);