<?php
	include_once("Connection.php");

	class TipoFun_model{
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
			$sueldo,
			$condition = ""
		){

			if($sql= $this->db->sql("
				INSERT INTO tipo_fun(
					nombre,
					sueldo
			 	)
				VALUES (
					'$nombre',
					'$sueldo'
			 	) $condition")){
					
				return $this->db->lastInsertId(); 
			}else{
				return false;
			}

		}

		public function update($values="",$condition=""){
			if($sql= $this->db->sql("UPDATE tipo_fun SET $values $condition")){
				return true;
			}else{
				return false;
			}
		}	


		public function delete($condition=""){
			if($sql= $this->db->sql("DELETE FROM tipo_fun $condition")){
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