var app = angular.module('App', []);

app.controller('login',function($scope, $http){

	$scope.login=function(){
		var url=PHPcontrollers_url+"Usuario_controller.php?metodo=login";
		var data={
			cedula: $scope.cedula,
			clave: $scope.clave
		};
		var config = {
			headers : { 'Content-Type': 'json'}
		};

		get_then = $http.post(url, data, config)
		.then(
			function success(response){
				console.log(response);
				if(response.data.status=='ok'){
					location.href=base_url+'Views/cpanel/';
				}else{
					swal({
						title: "Datos Erroneos !!",
						text: "Por favor verifica tus datos e intenta de nuevo.",
						icon: "warning",
						button: "ok",
					});
				}
			},function error(response){
				console.log(response.statustext);
			}
			);
	}

})