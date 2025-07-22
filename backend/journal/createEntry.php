<?php
include '../db.php';
$entry = $_POST['entry-textarea'] ?? '';
$folder_id = $_POST['folder_id'] ?? '';
$created_at = date('Y-m-d H:i:s');

if (empty($entry) || empty($folder_id)) {
    die("Quoteds and Author are required.");
}

$stmt = $conn->prepare("INSERT INTO journal_entries (content, created_at, folder_id) VALUES (?,?,?)");
$stmt->bind_param("ssi", $entry, $created_at, $folder_id);

try{
    $stmt->execute();
    echo $created_at;
} catch(error){
    echo $stmt->error;
}

$stmt->close();
$conn->close();
?>