<?php
include '../db.php';
$name = $_POST['name'] ?? '';
$created_at = date('Y-m-d H:i:s');

if (empty($name) || empty($created_at)) {
    die("Quote and Author are required.");
}

$stmt = $conn->prepare("INSERT INTO folders (name, created_at) VALUES (?,?)");
$stmt->bind_param("ss", $name, $created_at);

try{
    $stmt->execute();
    echo $created_at;
} catch(error){
    echo $stmt->error;
}

$stmt->close();
$conn->close();
?>