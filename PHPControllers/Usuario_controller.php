<?php

include_once("../PHPModels/Usuario_model.php");

class Usuario_controller{
	private $data;

	public function __construct(){
		$json = file_get_contents('php://input');
		$this->data= json_decode($json);
		$metodo=$_GET["metodo"];

		if(method_exists($this, $metodo)){
			$this->$metodo();
		}else{
			throw new Exception("El metodo $metodo no Existe en el Controlador");
		}
	}

	// public function obtener_listado(){

	// 	$modelo = new Bien_model();

	// 	if($query['result'] = $modelo->get_multiple(
	// 		"
	// 		INNER JOIN direccion AS b ON a.fk_direccion=b.id
	// 		ORDER BY a.id desc
	// 		",
	// 		"
	// 		a.id, a.nombre, b.id AS fk_direccion, b.nombre AS nombre_direccion
	// 		",
	// 		"
	// 		bien AS a
	// 		"
	// 	)){

	// 		$query['status']="ok";

	// 		echo json_encode($query);

	// 	}

	// 	$modelo->close();
	// }

	
	// public function obtener_registro(){

	// 	$modelo = new Bien_model();
	// 	$id=$this->data->id;

	// 	if($query['result'] = $modelo->get_multiple(
	// 		"
	// 		WHERE id = $id order by id desc
	// 		",
	// 		"
	// 		*
	// 		",
	// 		"
	// 		usuario
	// 		"
	// 	)){

	// 		$query['status']="ok";
	// 		echo json_encode($query);
	// 	}

	// 	$modelo->close();
	// }

	// public function insertar(){

	// 	$data = array();
	// 	$modelo  = new Bien_model();
	// 	if($modelo->insert(
	// 		$this->data->nombre,
	// 		$this->data->fk_direccion
	// 	)){
	// 		$data['status'] = 'ok';
	// 		echo json_encode($data);
	// 	}
	// }

	// public function modificar(){

	// 	$data = array();
	// 	$modelo  = new Bien_model();

	// 	if($modelo->update("
	// 		nombre='".$this->data->nombre."',
	// 		fk_direccion='".$this->data->fk_direccion."'
	// 		"
	// 		,"WHERE id =".$this->data->id)){
	// 		$data['status'] = 'ok';
	// 		echo json_encode($data);
	// 	}

	// 	$modelo->close();
	// }

	// public function eliminar(){
	// 	$data = array();
	// 	$modelo  = new Bien_model();			
	// 	if($modelo->delete("WHERE id =".$this->data->id)){

	// 		$modelo ->close();
	// 		$data['status'] = 'ok';
	// 		echo json_encode($data);
	// 	}
	// }


	public function login(){

		$modelo = new Usuario_model();
		$cedula=$this->data->cedula;
		$clave=$this->data->clave;

		if($query['result'] = $modelo->get_multiple(
			"
			WHERE cedula = '$cedula'
			",
			"
			*
			",
			"
			usuario
			"
		)){

			if(password_verify($clave,$query['result'][0]['pw'])){
				session_start();

				$_SESSION['nombres'] = $query['result'][0]['nombres'];
				$_SESSION['apellidos'] = $query['result'][0]['apellidos'];
				$_SESSION['cedula'] = $query['result'][0]['cedula'];
				$_SESSION['rol'] = $query['result'][0]['rol'];

				$query['status']="ok";
				echo json_encode($query);
			}
		}

		$modelo->close();
	}

	public function logout(){
		session_start();
		session_destroy();

		$query['status']="ok";
		echo json_encode($query);
	}


	public function current_user(){
		session_start();
		$modelo = new Usuario_model();

		if(isset($_SESSION['cedula'])){
			$cedula=$_SESSION['cedula'];
			if($query['result'] = $modelo->get_multiple(
				"
				WHERE cedula = '$cedula'
				",
				"
				*
				",
				"
				usuario
				"
			)){
				$query['status']="ok";
				echo json_encode($query);
			}
		}else{
			session_destroy();
		}

		$modelo->close();
	}
	
}

new Usuario_controller();

?>