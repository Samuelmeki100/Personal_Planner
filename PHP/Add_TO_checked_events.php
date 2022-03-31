<?php
$event=$_GET['id'];
//date objects
$year=date("Y");
$month=date("m");
// Create connection
$conn = new mysqli("localhost", 'root', '', 'monthly_planner');
// Check connection
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

$sql = "UPDATE `item_allocation` SET `status` = 'checked' WHERE `item_allocation`.`id` = '$event';";

if ($conn->query($sql) === TRUE) {
    echo "successfully";
} else {
    echo "Error updating record: " . $conn->error;
}

$conn->close();