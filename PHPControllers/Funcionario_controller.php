<?php

include_once("../PHPModels/Funcionario_model.php");

class Funcionario_controller{
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

	public function obtener_listado(){

		$modelo = new Funcionario_model();

		if($query['result'] = $modelo->get_multiple(
			"
			INNER JOIN tipo_fun AS b ON a.fk_tipo_fun=b.id 
			INNER JOIN grupo AS c ON a.fk_grupo=c.id
			",
			"
			a.nombres, a.apellidos, a.cedula, a.fecha_nacimiento, a.fecha_ingreso, a.fecha_egreso, a.fk_tipo_fun, a.fk_grupo, b.nombre AS nombre_tipo_funcionario, c.nombre AS nombre_grupo
			",
			"
			funcionario AS a
			"
		)){

			$query['status']="ok";

			echo json_encode($query);

		}

		$modelo->close();
	}

	
	public function obtener_registro(){

		$modelo = new Funcionario_model();
		$cedula=$this->data->cedula;

		if($query['result'] = $modelo->get_multiple(
			"
			WHERE cedula=".$cedula."
			ORDER BY cedula desc
			",
			"
			*
			",
			"
			funcionario
			"
		)){

			$query['status']="ok";
			echo json_encode($query);
		}

		$modelo->close();
	}

	public function insertar(){

		$data = array();
		$modelo  = new Funcionario_model();

		if($modelo->get_multiple(
			"
			WHERE cedula='".$this->data->cedula."' 
			ORDER BY cedula desc
			",
			"
			*
			",
			"
			funcionario
			"
		)){

			$data['status']="cedula ya existe";

		}else{

			if($modelo->insert(
				$this->data->nombres,
				$this->data->apellidos,
				$this->data->cedula,
				$this->data->fecha_nacimiento,
				$this->data->fecha_ingreso,
				$this->data->fk_tipo_fun,
				$this->data->fk_grupo
			)){
				$data['status'] = 'ok';
			}
		}

		echo json_encode($data);
		$modelo->close();
	}

	public function modificar(){

		$data = array();
		$modelo  = new Funcionario_model();
		if($modelo->get_multiple(
			"
			WHERE cedula='".$this->data->cedula."' && cedula!='".$this->data->cedula_old."' 
			ORDER BY cedula desc
			",
			"
			*
			",
			"
			funcionario
			"
		)){

			$data['status']="cedula ya existe";

		}else{

			if($modelo->update("
				nombres='".$this->data->nombres."',
				apellidos='".$this->data->apellidos."',
				cedula='".$this->data->cedula."',
				fecha_nacimiento='".$this->data->fecha_nacimiento."',
				fecha_ingreso='".$this->data->fecha_ingreso."',
				fecha_egreso='".$this->data->fecha_egreso."',
				fk_tipo_fun='".$this->data->fk_tipo_fun."',
				fk_grupo='".$this->data->fk_grupo."'
				"
				,"WHERE cedula ='".$this->data->cedula_old."'")){
				$data['status'] = 'ok';
			}
		}

		echo json_encode($data);
		$modelo->close();
	}

	public function eliminar(){
		$data = array();
		$modelo  = new Funcionario_model();			
		if($modelo->delete("WHERE cedula ='".$this->data->cedula."'")){

			$modelo ->close();
			$data['status'] = 'ok';
			echo json_encode($data);
		}
	}
	
}

new Funcionario_controller();

?>