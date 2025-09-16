<?php
include '../db.php';
$entry = $_POST['entry_text'] ?? '';
$folder_id = $_POST['folder_id'] ?? null;
$created_at = date('Y-m-d H:i:s');



if (!$folder_id){
    echo json_encode([
        "success" => false,
        "message" => "Folder cannot be found."
    ]);
    exit;
}

if (empty($entry)){
    echo json_encode([
        "success" => false,
        "message" => "Entry cannot be blank."
    ]);
    exit;
};

$stmt = $conn->prepare("INSERT INTO journal_entries (content, created_at, folder_id) VALUES (?,?,?)");
$stmt->bind_param("ssi", $entry, $created_at, $folder_id);

if ($stmt->execute()) {
    echo json_encode([
        "success" => true,
        "message" => "New entry has been created."
    ]);
} else {
    echo json_encode([
        "success" => false,
        "message" => $stmt->error
    ]);
}

$stmt->close();
$conn->close();
?>