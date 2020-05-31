<?php
	include_once("Connection.php");

	class Usuario_model{
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


		// public function insert(
		// 	$nombre,
		// 	$fk_direccion,
		// 	$condition = ""
		// ){

		// 	if($sql= $this->db->sql("
		// 		INSERT INTO bien(
		// 			nombre,
		// 			fk_direccion
		// 	 	)
		// 		VALUES (
		// 			'$nombre',
		// 			$fk_direccion
		// 	 	) $condition")){
					
		// 		return $this->db->lastInsertId(); 
		// 	}else{
		// 		return false;
		// 	}

		// }

		public function update($values="",$condition=""){
			if($sql= $this->db->sql("UPDATE usuario SET $values $condition")){
				return true;
			}else{
				return false;
			}
		}	


		public function delete($condition=""){
			if($sql= $this->db->sql("DELETE FROM usuario $condition")){
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