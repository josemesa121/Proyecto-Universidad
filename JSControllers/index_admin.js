function uniconumeroDano(evt)
{
	var keyPressed = (evt.which) ? evt.which : event.keyCode
	return !(keyPressed > 31 && (keyPressed < 48 || keyPressed > 57));
}


function soloLetras(e) {
	key = e.keyCode || e.which;
	tecla = String.fromCharCode(key).toLowerCase();
	letras = " áéíóúabcdefghijklmnñopqrstuvwxyz";
	especiales = [8, 37, 39, 46];

	tecla_especial = false
	for(var i in especiales) {
		if(key == especiales[i]) {
			tecla_especial = true;
			break;
		}
	}

	if(letras.indexOf(tecla) == -1 && !tecla_especial)
		return false;
}

function soloDecimales(e) {
	key = e.keyCode || e.which;
	tecla = String.fromCharCode(key).toLowerCase();
	decimales = "1234567890.";
	especiales = [8, 46];

	tecla_especial = false
	for(var i in especiales) {
		if(key == especiales[i]) {
			tecla_especial = true;
			break;
		}
	}

	if(decimales.indexOf(tecla) == -1 && !tecla_especial)
		return false;
}

var app = angular.module('App', ['ngRoute']);

// filtro para paginar
app.filter('startFromGrid', function() {
	return function(input, start) {
		start = +start;
		if(input){
			return input.slice(start);
		}
		return null;
	}
});


// rutas
app.config(function($routeProvider){
	$routeProvider
	.when('/',{
		controller: 'main',
		templateUrl: Views_url+'/cpanel/main.html'
	})
	.when('/tipo_funcionario',{
		controller: 'tipo_funcionario',
		templateUrl: Views_url+'/cpanel/tipo_funcionario.html'
	})
	.when('/direccion',{
		controller: 'direccion',
		templateUrl: Views_url+'/cpanel/direccion.html'
	})
	.when('/bien',{
		controller: 'bien',
		templateUrl: Views_url+'/cpanel/bien.html'
	})
	.when('/grupo',{
		controller: 'grupo',
		templateUrl: Views_url+'/cpanel/grupo.html'
	})
	.when('/funcionario',{
		controller: 'funcionario',
		templateUrl: Views_url+'/cpanel/funcionario.html'
	})
});

app.controller('index',function($scope, $http){
	$scope.date_format=function(string){
		var date= string.replace('-','/');
		return date=new Date(date);
	}

	$scope.current_user=function(){
		var url=PHPcontrollers_url+"Usuario_controller.php?metodo=current_user";
		var data={};
		var config = {
			headers : { 'Content-Type': 'json'}
		};

		get_then = $http.post(url, data, config)
		.then(
			function success(response){
				if(response.data.status=='ok'){
					$scope.data_user={};
					$scope.data_user.cedula=response.data.result[0].cedula;
					$scope.data_user.nombres=response.data.result[0].nombres;
					$scope.data_user.apellidos=response.data.result[0].apellidos;
					$scope.data_user.rol=response.data.result[0].rol;
				}else{
					location.href=base_url;
				}
			},function error(response){
				console.log(response.statustext);
			}
			);
	}
	$scope.current_user();

	$scope.logout=function(){
		var url=PHPcontrollers_url+"Usuario_controller.php?metodo=logout";
		var data={};
		var config = {
			headers : { 'Content-Type': 'json'}
		};

		get_then = $http.post(url, data, config)
		.then(
			function success(response){
				if(response.data.status=='ok'){
					location.href=base_url;
				}
			},function error(response){
				console.log(response.statustext);
			}
			);
	}

})

app.controller('main',function($scope, $http){
	
})

// =================================================================================================
// TIPO FUNCIONARIO
// ==================================================================================================
app.controller('tipo_funcionario',function($scope, $http, filterFilter){

	$scope.currentPage = 0;
	$scope.pageSize = 5;
	$scope.pages = [];
	$scope.data = [];
	$scope.data_filtered = [];

	$scope.load_agregar=function(){
		$scope.status_agregar=true;
		$scope.nombre='';
		$scope.sueldo='';
		$scope.formu.$setPristine();
		$scope.formu.$setUntouched();

		$('#modal_agregar').modal('show');
	}

	$scope.load_update=function(data){
		$scope.status_agregar=false;
		$scope.id_registro=data.id;
		$scope.nombre=data.nombre;
		$scope.sueldo=parseFloat(data.sueldo);

		$('#modal_agregar').modal('show');
	}

	$scope.request=function(){
		var url=PHPcontrollers_url+"TipoFun_controller.php?metodo=obtener_listado";
		var data={};
		var config = {
			headers : { 'Content-Type': 'json'}
		};

		get_then = $http.post(url, data, config)
		.then(
			function success(response){
				if(response.data.status=='ok'){
					$scope.data=response.data.result;
				}else{
					$scope.data=[];
				}
				$scope.filtrar_data();
			},function error(response){
				console.log(response.statustext);
			}
			);
	}

	$scope.agregar=function(){
		var url=PHPcontrollers_url+"TipoFun_controller.php?metodo=insertar";
		var data={
			nombre: $scope.nombre,
			sueldo: $scope.sueldo
		};
		var config = {
			headers : { 'Content-Type': 'json'}
		};

		get_then = $http.post(url, data, config)
		.then(
			function success(response){
				if(response.data.status=='ok'){
					$('#modal_agregar').modal('hide');
					$scope.request();
					swal({
						title: "Éxito !!",
						text: "Operación exitosa.",
						icon: "success",
						button: "ok",
					});
				}
			},function error(response){
				console.log(response.statustext);
			}
			);
	}

	$scope.modificar=function(){
		var url=PHPcontrollers_url+"TipoFun_controller.php?metodo=modificar";
		var data={
			id: $scope.id_registro,
			nombre: $scope.nombre,
			sueldo: $scope.sueldo
		};
		var config = {
			headers : { 'Content-Type': 'json'}
		};

		get_then = $http.post(url, data, config)
		.then(
			function success(response){
				if(response.data.status=='ok'){
					$('#modal_agregar').modal('hide');
					$scope.request();
					swal({
						title: "Éxito !!",
						text: "Operación exitosa.",
						icon: "success",
						button: "ok",
					});
				}
			},function error(response){
				console.log(response.statustext);
			}
			);
	}


	$scope.load_eliminar=function(data){
		$scope.id_registro=data.id;
		swal({
			title: "Estas seguro?",
			text: "Una vez eliminado, no se podrá recuperar!",
			icon: "warning",
			buttons: ["Cancelar", "ok"],
			dangerMode: true,
		})
		.then((willDelete) => {
			if (willDelete) {
				$scope.eliminar(data);
			} else {
				
			}
		});
	}



	$scope.eliminar=function(){
		var url=PHPcontrollers_url+"TipoFun_controller.php?metodo=eliminar";
		var data={
			id: $scope.id_registro
		};
		var config = {
			headers : { 'Content-Type': 'json'}
		};

		get_then = $http.post(url, data, config)
		.then(
			function success(response){
				if(response.data.status=='ok'){
					$scope.request();
					swal({
						title: "Éxito !!",
						text: "Operación exitosa.",
						icon: "success",
						button: "ok",
					});
				}
			},function error(response){
				console.log(response.statustext);
			}
			);
	}



	$scope.filtrar_data=function(){
		$scope.data_filtered = filterFilter($scope.data, $scope.search);
		$scope.configPages();
	}

	$scope.configPages = function() {
		$scope.pages.length = 0;
		var ini = $scope.currentPage - 4;
		var fin = $scope.currentPage + 5;
		
		if (ini < 1) {
			ini = 1;
			if (Math.ceil($scope.data_filtered.length / $scope.pageSize) > 10)
				fin = 10;
			else
				fin = Math.ceil($scope.data_filtered.length / $scope.pageSize);
		} else {
			if (ini >= Math.ceil($scope.data_filtered.length / $scope.pageSize) - 10) {
				ini = Math.ceil($scope.data_filtered.length / $scope.pageSize) - 10;
				fin = Math.ceil($scope.data_filtered.length / $scope.pageSize);
			}
		}
		
		if (ini < 1) ini = 1;
		for (var i = ini; i <= fin; i++) {
			$scope.pages.push({
				no: i
			});
		}

		if ($scope.currentPage >= $scope.pages.length){
			$scope.currentPage = $scope.pages.length - 1;
		}
	};


	$scope.setPage = function(index) {
		$scope.currentPage = index - 1;
	};

	$scope.request();
})



// =================================================================================================
// DIRECCION
// ==================================================================================================
app.controller('direccion',function($scope, $http, filterFilter){

	$scope.currentPage = 0;
	$scope.pageSize = 5;
	$scope.pages = [];
	$scope.data = [];
	$scope.data_filtered = [];

	$scope.load_agregar=function(){
		$scope.status_agregar=true;
		$scope.nombre='';
		$scope.formu.$setPristine();
		$scope.formu.$setUntouched();

		$('#modal_agregar').modal('show');
	}

	$scope.load_update=function(data){
		$scope.status_agregar=false;
		$scope.id_registro=data.id;
		$scope.nombre=data.nombre;

		$('#modal_agregar').modal('show');
	}

	$scope.request=function(){
		var url=PHPcontrollers_url+"Direccion_controller.php?metodo=obtener_listado";
		var data={};
		var config = {
			headers : { 'Content-Type': 'json'}
		};

		get_then = $http.post(url, data, config)
		.then(
			function success(response){
				if(response.data.status=='ok'){
					$scope.data=response.data.result;
				}else{
					$scope.data=[];
				}
				$scope.filtrar_data();
			},function error(response){
				console.log(response.statustext);
			}
			);
	}

	$scope.agregar=function(){
		var url=PHPcontrollers_url+"Direccion_controller.php?metodo=insertar";
		var data={
			nombre: $scope.nombre
		};
		var config = {
			headers : { 'Content-Type': 'json'}
		};

		get_then = $http.post(url, data, config)
		.then(
			function success(response){
				if(response.data.status=='ok'){
					$('#modal_agregar').modal('hide');
					$scope.request();
					swal({
						title: "Éxito !!",
						text: "Operación exitosa.",
						icon: "success",
						button: "ok",
					});
				}
			},function error(response){
				console.log(response.statustext);
			}
			);
	}

	$scope.modificar=function(){
		var url=PHPcontrollers_url+"Direccion_controller.php?metodo=modificar";
		var data={
			id: $scope.id_registro,
			nombre: $scope.nombre
		};
		var config = {
			headers : { 'Content-Type': 'json'}
		};

		get_then = $http.post(url, data, config)
		.then(
			function success(response){
				if(response.data.status=='ok'){
					$('#modal_agregar').modal('hide');
					$scope.request();
					swal({
						title: "Éxito !!",
						text: "Operación exitosa.",
						icon: "success",
						button: "ok",
					});
				}
			},function error(response){
				console.log(response.statustext);
			}
			);
	}


	$scope.load_eliminar=function(data){
		$scope.id_registro=data.id;
		swal({
			title: "Estas seguro?",
			text: "Una vez eliminado, no se podrá recuperar!",
			icon: "warning",
			buttons: ["Cancelar", "ok"],
			dangerMode: true,
		})
		.then((willDelete) => {
			if (willDelete) {
				$scope.eliminar(data);
			} else {
				
			}
		});
	}



	$scope.eliminar=function(){
		var url=PHPcontrollers_url+"Direccion_controller.php?metodo=eliminar";
		var data={
			id: $scope.id_registro
		};
		var config = {
			headers : { 'Content-Type': 'json'}
		};

		get_then = $http.post(url, data, config)
		.then(
			function success(response){
				if(response.data.status=='ok'){
					$scope.request();
					swal({
						title: "Éxito !!",
						text: "Operación exitosa.",
						icon: "success",
						button: "ok",
					});
				}
			},function error(response){
				console.log(response.statustext);
			}
			);
	}



	$scope.filtrar_data=function(){
		$scope.data_filtered = filterFilter($scope.data, $scope.search);
		$scope.configPages();
	}

	$scope.configPages = function() {
		$scope.pages.length = 0;
		var ini = $scope.currentPage - 4;
		var fin = $scope.currentPage + 5;
		
		if (ini < 1) {
			ini = 1;
			if (Math.ceil($scope.data_filtered.length / $scope.pageSize) > 10)
				fin = 10;
			else
				fin = Math.ceil($scope.data_filtered.length / $scope.pageSize);
		} else {
			if (ini >= Math.ceil($scope.data_filtered.length / $scope.pageSize) - 10) {
				ini = Math.ceil($scope.data_filtered.length / $scope.pageSize) - 10;
				fin = Math.ceil($scope.data_filtered.length / $scope.pageSize);
			}
		}
		
		if (ini < 1) ini = 1;
		for (var i = ini; i <= fin; i++) {
			$scope.pages.push({
				no: i
			});
		}

		if ($scope.currentPage >= $scope.pages.length){
			$scope.currentPage = $scope.pages.length - 1;
		}
	};


	$scope.setPage = function(index) {
		$scope.currentPage = index - 1;
	};

	$scope.request();
})


// =================================================================================================
// BIEN
// ==================================================================================================
app.controller('bien',function($scope, $http, filterFilter){

	$scope.currentPage = 0;
	$scope.pageSize = 5;
	$scope.pages = [];
	$scope.data = [];
	$scope.data_filtered = [];

	$scope.load_agregar=function(){
		$scope.status_agregar=true;
		$scope.nombre='';
		$scope.fk_direccion='';
		$scope.formu.$setPristine();
		$scope.formu.$setUntouched();

		$('#modal_agregar').modal('show');
	}

	$scope.load_update=function(data){
		$scope.status_agregar=false;
		$scope.id_registro=data.id;
		$scope.nombre=data.nombre;
		$scope.fk_direccion=data.fk_direccion;

		$('#modal_agregar').modal('show');
	}

	$scope.request=function(){
		var url=PHPcontrollers_url+"Bien_controller.php?metodo=obtener_listado";
		var data={};
		var config = {
			headers : { 'Content-Type': 'json'}
		};

		get_then = $http.post(url, data, config)
		.then(
			function success(response){
				if(response.data.status=='ok'){
					$scope.data=response.data.result;
				}else{
					$scope.data=[];
				}
				$scope.filtrar_data();
			},function error(response){
				console.log(response.statustext);
			}
			);
	}

	$scope.get_direcciones=function(){
		var url=PHPcontrollers_url+"Direccion_controller.php?metodo=obtener_listado";
		var data={};
		var config = {
			headers : { 'Content-Type': 'json'}
		};

		get_then = $http.post(url, data, config)
		.then(
			function success(response){
				if(response.data.status=='ok'){
					$scope.list_direcciones=response.data.result;
				}
			},function error(response){
				console.log(response.statustext);
			}
			);
	}
	$scope.get_direcciones();

	$scope.agregar=function(){
		var url=PHPcontrollers_url+"Bien_controller.php?metodo=insertar";
		var data={
			nombre: $scope.nombre,
			fk_direccion: $scope.fk_direccion
		};
		var config = {
			headers : { 'Content-Type': 'json'}
		};

		get_then = $http.post(url, data, config)
		.then(
			function success(response){
				if(response.data.status=='ok'){
					$('#modal_agregar').modal('hide');
					$scope.request();
					swal({
						title: "Éxito !!",
						text: "Operación exitosa.",
						icon: "success",
						button: "ok",
					});
				}
			},function error(response){
				console.log(response.statustext);
			}
			);
	}

	$scope.modificar=function(){
		var url=PHPcontrollers_url+"Bien_controller.php?metodo=modificar";
		var data={
			id: $scope.id_registro,
			nombre: $scope.nombre,
			fk_direccion: $scope.fk_direccion
		};
		var config = {
			headers : { 'Content-Type': 'json'}
		};

		get_then = $http.post(url, data, config)
		.then(
			function success(response){
				if(response.data.status=='ok'){
					$('#modal_agregar').modal('hide');
					$scope.request();
					swal({
						title: "Éxito !!",
						text: "Operación exitosa.",
						icon: "success",
						button: "ok",
					});
				}
			},function error(response){
				console.log(response.statustext);
			}
			);
	}


	$scope.load_eliminar=function(data){
		$scope.id_registro=data.id;
		swal({
			title: "Estas seguro?",
			text: "Una vez eliminado, no se podrá recuperar!",
			icon: "warning",
			buttons: ["Cancelar", "ok"],
			dangerMode: true,
		})
		.then((willDelete) => {
			if (willDelete) {
				$scope.eliminar(data);
			} else {
				
			}
		});
	}



	$scope.eliminar=function(){
		var url=PHPcontrollers_url+"Bien_controller.php?metodo=eliminar";
		var data={
			id: $scope.id_registro
		};
		var config = {
			headers : { 'Content-Type': 'json'}
		};

		get_then = $http.post(url, data, config)
		.then(
			function success(response){
				if(response.data.status=='ok'){
					$scope.request();
					swal({
						title: "Éxito !!",
						text: "Operación exitosa.",
						icon: "success",
						button: "ok",
					});
				}
			},function error(response){
				console.log(response.statustext);
			}
			);
	}



	$scope.filtrar_data=function(){
		$scope.data_filtered = filterFilter($scope.data, $scope.search);
		$scope.configPages();
	}

	$scope.configPages = function() {
		$scope.pages.length = 0;
		var ini = $scope.currentPage - 4;
		var fin = $scope.currentPage + 5;
		
		if (ini < 1) {
			ini = 1;
			if (Math.ceil($scope.data_filtered.length / $scope.pageSize) > 10)
				fin = 10;
			else
				fin = Math.ceil($scope.data_filtered.length / $scope.pageSize);
		} else {
			if (ini >= Math.ceil($scope.data_filtered.length / $scope.pageSize) - 10) {
				ini = Math.ceil($scope.data_filtered.length / $scope.pageSize) - 10;
				fin = Math.ceil($scope.data_filtered.length / $scope.pageSize);
			}
		}
		
		if (ini < 1) ini = 1;
		for (var i = ini; i <= fin; i++) {
			$scope.pages.push({
				no: i
			});
		}

		if ($scope.currentPage >= $scope.pages.length){
			$scope.currentPage = $scope.pages.length - 1;
		}
	};


	$scope.setPage = function(index) {
		$scope.currentPage = index - 1;
	};

	$scope.request();
})



// =================================================================================================
// GRUPO
// ==================================================================================================
app.controller('grupo',function($scope, $http, filterFilter){

	$scope.currentPage = 0;
	$scope.pageSize = 5;
	$scope.pages = [];
	$scope.data = [];
	$scope.data_filtered = [];

	$scope.load_agregar=function(){
		$scope.status_agregar=true;
		$scope.nombre='';
		$scope.formu.$setPristine();
		$scope.formu.$setUntouched();

		$('#modal_agregar').modal('show');
	}

	$scope.load_update=function(data){
		$scope.status_agregar=false;
		$scope.id_registro=data.id;
		$scope.nombre=data.nombre;

		$('#modal_agregar').modal('show');
	}

	$scope.request=function(){
		var url=PHPcontrollers_url+"Grupo_controller.php?metodo=obtener_listado";
		var data={};
		var config = {
			headers : { 'Content-Type': 'json'}
		};

		get_then = $http.post(url, data, config)
		.then(
			function success(response){
				if(response.data.status=='ok'){
					$scope.data=response.data.result;
				}else{
					$scope.data=[];
				}
				$scope.filtrar_data();
			},function error(response){
				console.log(response.statustext);
			}
			);
	}

	$scope.agregar=function(){
		var url=PHPcontrollers_url+"Grupo_controller.php?metodo=insertar";
		var data={
			nombre: $scope.nombre
		};
		var config = {
			headers : { 'Content-Type': 'json'}
		};

		get_then = $http.post(url, data, config)
		.then(
			function success(response){
				if(response.data.status=='ok'){
					$('#modal_agregar').modal('hide');
					$scope.request();
					swal({
						title: "Éxito !!",
						text: "Operación exitosa.",
						icon: "success",
						button: "ok",
					});
				}
			},function error(response){
				console.log(response.statustext);
			}
			);
	}

	$scope.modificar=function(){
		var url=PHPcontrollers_url+"Grupo_controller.php?metodo=modificar";
		var data={
			id: $scope.id_registro,
			nombre: $scope.nombre
		};
		var config = {
			headers : { 'Content-Type': 'json'}
		};

		get_then = $http.post(url, data, config)
		.then(
			function success(response){
				if(response.data.status=='ok'){
					$('#modal_agregar').modal('hide');
					$scope.request();
					swal({
						title: "Éxito !!",
						text: "Operación exitosa.",
						icon: "success",
						button: "ok",
					});
				}
			},function error(response){
				console.log(response.statustext);
			}
			);
	}


	$scope.load_eliminar=function(data){
		$scope.id_registro=data.id;
		swal({
			title: "Estas seguro?",
			text: "Una vez eliminado, no se podrá recuperar!",
			icon: "warning",
			buttons: ["Cancelar", "ok"],
			dangerMode: true,
		})
		.then((willDelete) => {
			if (willDelete) {
				$scope.eliminar();
			} else {
				
			}
		});
	}



	$scope.eliminar=function(){
		var url=PHPcontrollers_url+"Grupo_controller.php?metodo=eliminar";
		var data={
			id: $scope.id_registro
		};
		var config = {
			headers : { 'Content-Type': 'json'}
		};

		get_then = $http.post(url, data, config)
		.then(
			function success(response){
				$scope.request();
				if(response.data.status=='ok'){
					swal({
						title: "Éxito !!",
						text: "Operación exitosa.",
						icon: "success",
						button: "ok",
					});
				}
			},function error(response){
				console.log(response.statustext);
			}
			);
	}



	$scope.filtrar_data=function(){
		$scope.data_filtered = filterFilter($scope.data, $scope.search);
		$scope.configPages();
	}

	$scope.configPages = function() {
		$scope.pages.length = 0;
		var ini = $scope.currentPage - 4;
		var fin = $scope.currentPage + 5;
		
		if (ini < 1) {
			ini = 1;
			if (Math.ceil($scope.data_filtered.length / $scope.pageSize) > 10)
				fin = 10;
			else
				fin = Math.ceil($scope.data_filtered.length / $scope.pageSize);
		} else {
			if (ini >= Math.ceil($scope.data_filtered.length / $scope.pageSize) - 10) {
				ini = Math.ceil($scope.data_filtered.length / $scope.pageSize) - 10;
				fin = Math.ceil($scope.data_filtered.length / $scope.pageSize);
			}
		}
		
		if (ini < 1) ini = 1;
		for (var i = ini; i <= fin; i++) {
			$scope.pages.push({
				no: i
			});
		}

		if ($scope.currentPage >= $scope.pages.length){
			$scope.currentPage = $scope.pages.length - 1;
		}
	};


	$scope.setPage = function(index) {
		$scope.currentPage = index - 1;
	};

	$scope.request();
})

// =================================================================================================
// FUNCIONARIO
// ==================================================================================================
app.controller('funcionario',function($scope, $http, filterFilter){

	$scope.currentPage = 0;
	$scope.pageSize = 5;
	$scope.pages = [];
	$scope.data = [];
	$scope.data_filtered = [];

	$scope.load_agregar=function(){
		$scope.status_agregar=true;

		$scope.cedula='';
		$scope.nombres='';
		$scope.apellidos='';
		$scope.fecha_nacimiento='';
		$scope.fecha_ingreso='';
		$scope.fecha_egreso='';
		$scope.fk_tipo_fun='';
		$scope.fk_grupo='';

		$scope.formu.$setPristine();
		$scope.formu.$setUntouched();

		$('#modal_agregar').modal('show');
	}

	$scope.load_update=function(data){
		$scope.status_agregar=false;
		$scope.id_registro=data.cedula;
		$scope.cedula=data.cedula;
		$scope.nombres=data.nombres;
		$scope.apellidos=data.apellidos;
		$scope.fecha_nacimiento=$scope.date_format(data.fecha_nacimiento);
		$scope.fecha_ingreso=$scope.date_format(data.fecha_ingreso);
		if(data.fecha_egreso=='' || data.fecha_egreso=='null'){
			$scope.fecha_egreso=$scope.date_format(data.fecha_egreso);
		}
		$scope.fk_tipo_fun=data.fk_tipo_fun;
		$scope.fk_grupo=data.fk_grupo;
		$scope.fk_direccion=data.fk_direccion;

		$('#modal_agregar').modal('show');
	}

	$scope.request=function(){
		var url=PHPcontrollers_url+"Funcionario_controller.php?metodo=obtener_listado";
		var data={};
		var config = {
			headers : { 'Content-Type': 'json'}
		};

		get_then = $http.post(url, data, config)
		.then(
			function success(response){
				if(response.data.status=='ok'){
					$scope.data=response.data.result;
				}else{
					$scope.data=[];
				}
				$scope.filtrar_data();
			},function error(response){
				console.log(response.statustext);
			}
			);
	}

	$scope.get_tipos_funcionario=function(){
		var url=PHPcontrollers_url+"TipoFun_controller.php?metodo=obtener_listado";
		var data={};
		var config = {
			headers : { 'Content-Type': 'json'}
		};

		get_then = $http.post(url, data, config)
		.then(
			function success(response){
				if(response.data.status=='ok'){
					$scope.list_tipos_funcionario=response.data.result;
				}
			},function error(response){
				console.log(response.statustext);
			}
			);
	}
	$scope.get_tipos_funcionario();

	$scope.get_grupos=function(){
		var url=PHPcontrollers_url+"Grupo_controller.php?metodo=obtener_listado";
		var data={};
		var config = {
			headers : { 'Content-Type': 'json'}
		};

		get_then = $http.post(url, data, config)
		.then(
			function success(response){
				if(response.data.status=='ok'){
					$scope.list_grupos=response.data.result;
				}
			},function error(response){
				console.log(response.statustext);
			}
			);
	}
	$scope.get_grupos();

	$scope.agregar=function(){
		var url=PHPcontrollers_url+"Funcionario_controller.php?metodo=insertar";
		var data={
			cedula: $scope.cedula,
			nombres: $scope.nombres,
			apellidos: $scope.apellidos,
			fecha_nacimiento: $('#fecha_nacimiento').val(),
			fecha_ingreso: $('#fecha_ingreso').val(),
			fk_tipo_fun: $scope.fk_tipo_fun,
			fk_grupo: $scope.fk_grupo
		};
		var config = {
			headers : { 'Content-Type': 'json'}
		};

		get_then = $http.post(url, data, config)
		.then(
			function success(response){
				console.log(response);
				if(response.data.status=='ok'){
					$('#modal_agregar').modal('hide');
					$scope.request();
					swal({
						title: "Éxito !!",
						text: "Operación exitosa.",
						icon: "success",
						button: "ok",
					});
				}else if(response.data.status=='cedula ya existe'){
					swal({
						title: "La Cedula ya existe !!",
						text: "Por favor ingrese una valida.",
						icon: "warning",
						button: "ok",
					});
				}
			},function error(response){
				console.log(response.statustext);
			}
			);
	}

	$scope.modificar=function(){
		var url=PHPcontrollers_url+"Funcionario_controller.php?metodo=modificar";
		var data={
			cedula_old: $scope.id_registro,
			cedula: $scope.cedula,
			nombres: $scope.nombres,
			apellidos: $scope.apellidos,
			fecha_nacimiento: $('#fecha_nacimiento').val(),
			fecha_ingreso: $('#fecha_ingreso').val(),
			fecha_egreso: $('#fecha_egreso').val(),
			fk_tipo_fun: $scope.fk_tipo_fun,
			fk_grupo: $scope.fk_grupo
		};
		var config = {
			headers : { 'Content-Type': 'json'}
		};

		get_then = $http.post(url, data, config)
		.then(
			function success(response){
				if(response.data.status=='ok'){
					$('#modal_agregar').modal('hide');
					$scope.request();
					swal({
						title: "Éxito !!",
						text: "Operación exitosa.",
						icon: "success",
						button: "ok",
					});
				}else if(response.data.status=='cedula ya existe'){
					swal({
						title: "La Cedula ya existe !!",
						text: "Por favor ingrese una valida.",
						icon: "warning",
						button: "ok",
					});
				}
			},function error(response){
				console.log(response.statustext);
			}
			);
	}


	$scope.load_eliminar=function(data){
		// cedula funciona como id
		$scope.id_registro=data.cedula;
		swal({
			title: "Estas seguro?",
			text: "Una vez eliminado, no se podrá recuperar!",
			icon: "warning",
			buttons: ["Cancelar", "ok"],
			dangerMode: true,
		})
		.then((willDelete) => {
			if (willDelete) {
				$scope.eliminar(data);
			} else {
				
			}
		});
	}



	$scope.eliminar=function(){
		var url=PHPcontrollers_url+"Funcionario_controller.php?metodo=eliminar";
		var data={
			cedula: $scope.id_registro
		};
		var config = {
			headers : { 'Content-Type': 'json'}
		};

		get_then = $http.post(url, data, config)
		.then(
			function success(response){
				if(response.data.status=='ok'){
					$scope.request();
					swal({
						title: "Éxito !!",
						text: "Operación exitosa.",
						icon: "success",
						button: "ok",
					});
				}
			},function error(response){
				console.log(response.statustext);
			}
			);
	}



	$scope.filtrar_data=function(){
		$scope.data_filtered = filterFilter($scope.data, $scope.search);
		$scope.configPages();
	}

	$scope.configPages = function() {
		$scope.pages.length = 0;
		var ini = $scope.currentPage - 4;
		var fin = $scope.currentPage + 5;
		
		if (ini < 1) {
			ini = 1;
			if (Math.ceil($scope.data_filtered.length / $scope.pageSize) > 10)
				fin = 10;
			else
				fin = Math.ceil($scope.data_filtered.length / $scope.pageSize);
		} else {
			if (ini >= Math.ceil($scope.data_filtered.length / $scope.pageSize) - 10) {
				ini = Math.ceil($scope.data_filtered.length / $scope.pageSize) - 10;
				fin = Math.ceil($scope.data_filtered.length / $scope.pageSize);
			}
		}
		
		if (ini < 1) ini = 1;
		for (var i = ini; i <= fin; i++) {
			$scope.pages.push({
				no: i
			});
		}

		if ($scope.currentPage >= $scope.pages.length){
			$scope.currentPage = $scope.pages.length - 1;
		}
	};


	$scope.setPage = function(index) {
		$scope.currentPage = index - 1;
	};

	$scope.request();
})