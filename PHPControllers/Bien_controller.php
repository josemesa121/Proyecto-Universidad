<?php

include_once("../PHPModels/Bien_model.php");

	class Bien_controller{
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

			$modelo = new Bien_model();

			if($query['result'] = $modelo->get_multiple(
				"
					INNER JOIN direccion AS b ON a.fk_direccion=b.id
					ORDER BY a.id desc
				",
				"
					a.id, a.nombre, b.id AS fk_direccion, b.nombre AS nombre_direccion
				",
				"
					bien AS a
				"
				)){

				$query['status']="ok";

				echo json_encode($query);

			}

			$modelo->close();
		}
		
	
		public function obtener_registro(){

			$modelo = new Bien_model();
			$id=$this->data->id;
			
			if($query['result'] = $modelo->get_multiple(
				"
					WHERE id = $id order by id desc
				",
				"
					*
				",
				"
					bien
				"
				)){

				$query['status']="ok";
				echo json_encode($query);
			}

			$modelo->close();
		}

		public function insertar(){
			
			$data = array();
			$modelo  = new Bien_model();
			if($modelo->insert(
				$this->data->nombre,
				$this->data->fk_direccion
			)){
				$data['status'] = 'ok';
				echo json_encode($data);
			}
		}

		public function modificar(){

				$data = array();
				$modelo  = new Bien_model();
				
				if($modelo->update("
					nombre='".$this->data->nombre."',
					fk_direccion='".$this->data->fk_direccion."'
					"
				,"WHERE id =".$this->data->id)){
					$data['status'] = 'ok';
					echo json_encode($data);
				}
			
			$modelo->close();
		}
		
		public function eliminar(){
			$data = array();
			$modelo  = new Bien_model();			
			if($modelo->delete("WHERE id =".$this->data->id)){

				$modelo ->close();
				$data['status'] = 'ok';
				echo json_encode($data);
			}
		}
	
	}

	new Bien_controller();

?>