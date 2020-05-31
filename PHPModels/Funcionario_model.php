<?php
	include_once("Connection.php");

	class Funcionario_model{
		private $db;
		public function __construct(){
			$this->db = new Db();
		}

		public function get_multiple($condition="",$values="",$tablas=""){
			if($sql= $this->db->sql("select $values from $tablas $condition")){ 
				$result = $sql->fetchAll(PDO::FETCH_ASSOC);
				return $result;
			}else{
				return false;
			}
		}


		public function insert(
			$nombres,
			$apellidos,
			$cedula,
			$fecha_nacimiento,
			$fecha_ingreso,
			$fk_tipo_fun,
			$fk_grupo,
			$condition = ""
		){

			if($sql= $this->db->sql("
				INSERT INTO funcionario(
					nombres,
					apellidos,
					cedula,
					fecha_nacimiento,
					fecha_ingreso,
					fk_tipo_fun,
					fk_grupo
			 	)
				VALUES (
					'$nombres',
					'$apellidos',
					'$cedula',
					'$fecha_nacimiento',
					'$fecha_ingreso',
					$fk_tipo_fun,
					$fk_grupo
			 	) $condition")){
					
				return $cedula; 
			}else{
				return false;
			}

		}

		public function update($values="",$condition=""){
			if($sql= $this->db->sql("UPDATE funcionario SET $values $condition")){
				return true;
			}else{
				return false;
			}
		}	


		public function delete($condition=""){
			if($sql= $this->db->sql("DELETE FROM funcionario $condition")){
				return true;
			}else{
				return false;
			}
		}

		public function close(){
			$this->db->close();
		}
	}
?>