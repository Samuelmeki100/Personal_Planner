<?php
error_reporting(E_ALL);
ini_set('display_errors', 1);
header("Content-Type: application/json; charset=UTF-8");
$obj = json_decode("{\"limit\":10}", false);

$conn = new mysqli("localhost", "root", "", "dailyplaner");
$stmt = $conn->prepare("SELECT name FROM events LIMIT ?");
$stmt->bind_param("s", $obj->limit);
$stmt->execute();
$result = $stmt->get_result();
$outp = $result->fetch_all(MYSQLI_ASSOC);

echo json_encode($outp);

