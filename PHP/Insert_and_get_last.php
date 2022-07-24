<?php
header("context-type: application/json; charset=UTF=8");
$name=$_POST["name"];
$Amount=$_POST["Amount"];
$Description=$_POST["Description"];
$year=date("Y");
$month=date("m");
$item_allocation = $year ."". $month;
// Create connection
$conn = new mysqli("localhost", "root", "", "monthly_planner");
// Check connection
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}
if(isset($name)){
    $sql = "INSERT INTO `item_allocation`(`id`, `Name`, `Description`, `item_allocation`, `status`, `amount_allocated`)	VALUES (NULL, '$name', '$Description', '$item_allocation', 'Null', '$Amount')";

    if ($conn->query($sql) === false) {
      echo "Error: " . $sql . "<br>" . $conn->error;
    }
     $last_id = $conn->insert_id;
    }

$stmt=$conn->prepare("SELECT * FROM `item_allocation` where id='$last_id'");
$stmt->execute();
$result=$stmt->get_result();
$outP= $result->fetch_all(MYSQLI_ASSOC);

echo json_encode($outP);

$conn->close();
