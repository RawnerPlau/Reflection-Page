<?php
include '../db.php';

$id = $_POST['folder_id'] ?? null;
$folder_name= $_POST['folder_name'] ?? '';

// Basic validation
if (!$id) {
    echo json_encode([
        "success" => false,
        "message" => "Folder not found.",
    ]);
    exit;
};

if ($folder_name === '') {
    echo json_encode([
        "success" => false,
        "message" => "New folder name cannot be blank."
    ]);
    exit;
};

$stmt = $conn->prepare("UPDATE folders SET name = ? WHERE id = ?");
$stmt->bind_param('si', $folder_name, $id);

if ($stmt->execute()) {
    echo json_encode([
        "success" => true,
        "message" => "Folder renamed successfully."
    ]);
} else {
    echo json_encode ([
        "success" => false,
        "message" => $stmt->error
    ]);
}

$stmt->close();
$conn->close();
?>