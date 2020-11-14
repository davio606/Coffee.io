<?php
//Andrew Murphy afm9yy
//Salwa Malik sm5zx
//David Yoon djy6cg
/******************************/
// connecting to GCP cloud SQL instance

$username = 'root';
$password = 'B99AePeE$$x9CgbKsB';

$dbname = 'coffeeshop';

// if PHP is on GCP standard App Engine, use instance name to connect
$host = 'cs4750db-290216:us-east4:andromeda';

// if PHP is hosted somewhere else (non-GCP), use public IP address to connect
// $host = "public-IP-address-to-cloud-instance";


/******************************/
// connecting to DB on XAMPP (local)

// $username = 'your-username';
// $password = 'your-password';
// $host = 'localhost:3306';
// $dbname = 'your-database-name';


/******************************/
// connecting to DB on CS server

// $username = 'your-computingID';
// $password = 'your-MySQL-password';
// $host = 'usersrv01.cs.virginia.edu';
// $dbname = 'your-computingID';


/******************************/

// $dsn = "mysql:host=$host;dbname=$dbname";
$dsn = "mysql:unix_socket=/cloudsql/$host;dbname=$dbname";
$db = "";

/** connect to the database **/
try 
{
   $db = new PDO($dsn, $username, $password);   
   // echo "<p>You are connected to the database</p>";
}
catch (PDOException $e)     // handle a PDO exception (errors thrown by the PDO library)
{
   // Call a method from any object, 
   // use the object's name followed by -> and then method's name
   // All exception objects provide a getMessage() method that returns the error message 
   $error_message = $e->getMessage();        
   echo "<p>An error occurred while connecting to the database: $error_message </p>";
}
catch (Exception $e)       // handle any type of exception
{
   $error_message = $e->getMessage();
   echo "<p>Error message: $error_message </p>";
}

?>