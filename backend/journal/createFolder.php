<?php
include '../db.php';

$name = $_POST['name'] ?? '';
$created_at = date('H:i:s m-d-Y');

if (empty($name) || empty($created_at)) {
    die("Quote and Author are required.");
}

$stmt = $conn->prepare("INSERT INTO folders (name, created_at) VALUES (?,?)");
$stmt->bind_param("ss", $quote, $author);

try{
    $stmt->execute();
} catch(error){
    echo $stmt->error;
}

$stmt->close();
$conn->close();
?>