<?php
include '../db.php';
$folder_name = $_POST['folder-name-txt'] ?? '';
$created_at = date('Y-m-d H:i:s');

if (empty($folder_name)) {
    die("Quote and Author are required.");
}

$stmt = $conn->prepare("INSERT INTO folders (name, created_at) VALUES (?,?)");
$stmt->bind_param("ss", $folder_name, $created_at);

try{
    $stmt->execute();
    echo $created_at;
} catch(error){
    echo $stmt->error;
}

$stmt->close();
$conn->close();
?>