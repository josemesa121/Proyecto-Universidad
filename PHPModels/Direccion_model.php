<?php
	include_once("Connection.php");

	class Direccion_model{
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
			$nombre,
			$condition = ""
		){

			if($sql= $this->db->sql("
				INSERT INTO direccion(
					nombre
			 	)
				VALUES (
					'$nombre'
			 	) $condition")){
					
				return $this->db->lastInsertId(); 
			}else{
				return false;
			}

		}

		public function update($values="",$condition=""){
			if($sql= $this->db->sql("UPDATE direccion SET $values $condition")){
				return true;
			}else{
				return false;
			}
		}	


		public function delete($condition=""){
			if($sql= $this->db->sql("DELETE FROM direccion $condition")){
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