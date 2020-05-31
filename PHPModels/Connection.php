<?php

	Class Db {

		private $link;
		private	$dbhost="localhost";  		
		private	$dbusuario="root"; 	
		private	$dbpassword=""; 	
		private	$db="policia";      

	
		public function __construct(){
			
			try {				
				$this->link=new PDO('mysql:dbname='.$this->db.';host='.$this->dbhost,$this->dbusuario,$this->dbpassword);
				$this->link->exec("set names utf8");
			} catch (PDOException $e) {
				echo "error:".$e->getMessage();	
			}
		}

		public function sql($sql){
			try {				
				$x=$this->link->prepare($sql);
				$x->execute();
				return $x;
			} catch (PDOException $e) {
				echo "error:".$e->getMessage();	
				return false;
			}
		}

		public function lastInsertId(){
			return $this->link->lastInsertId();
		}

		public function close(){
			$this->link=null;
		}

	}

?>