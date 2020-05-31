<?php

include_once("../PHPModels/TipoFun_model.php");

	class TipoFun_controller{
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

			$modelo = new TipoFun_model();

			if($query['result'] = $modelo->get_multiple(
				"
					order by id desc
				",
				"
					*
				",
				"
					tipo_fun
				"
				)){

				$query['status']="ok";

				echo json_encode($query);

			}

			$modelo->close();
		}
		
	
		public function obtener_registro(){

			$modelo = new TipoFun_model();
			$id=$this->data->id;
			
			if($query['result'] = $modelo->get_multiple(
				"
					WHERE id = $id order by id desc
				",
				"
					*
				",
				"
					tipo_fun
				"
				)){

				$query['status']="ok";
				echo json_encode($query);
			}

			$modelo->close();
		}

		public function insertar(){
			
			$data = array();
			$modelo  = new TipoFun_model();
			if($modelo->insert(
				$this->data->nombre,
				$this->data->sueldo
			)){
				$data['status'] = 'ok';
				echo json_encode($data);
			}
		}

		public function modificar(){

				$data = array();
				$modelo  = new TipoFun_model();
				
				if($modelo->update("
					nombre='".$this->data->nombre."',
					sueldo='".$this->data->sueldo."'
					"
				,"WHERE id =".$this->data->id)){
					$data['status'] = 'ok';
					echo json_encode($data);
				}
			
			$modelo->close();
		}
		
		public function eliminar(){
			$data = array();
			$modelo  = new TipoFun_model();			
			if($modelo->delete("WHERE id =".$this->data->id)){

				$modelo ->close();
				$data['status'] = 'ok';
				echo json_encode($data);
			}
		}
	
	}

	new TipoFun_controller();

?>