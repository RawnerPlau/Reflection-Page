<?php
include '../db.php';

$entry_id = $_POST['entry_id'] ?? null;
$entry_text = $_POST['entry_text'] ?? '';

// Basic validation
if (!$entry_id ){
    echo json_encode([
        "success" => false,
        "message" => "Entry ID is invalid."
    ]);
    exit;
}

if ($entry_text == '' ){
    echo json_encode([
        "success" => false,
        "message" => "Text is empty."
    ]);
    exit;
}

$stmt = $conn->prepare("UPDATE journal_entries SET content = ? WHERE id = ?");
$stmt->bind_param('si', $entry_text, $entry_id);

if ($stmt->execute()) {
    echo json_encode([
        "success" => true,
        "message" => "Entry has been updated successfully."
    ]);
} else {
    echo json_encode([
        "success" => false,
        "message" =>  $stmt->error
    ]);
}

$stmt->close();
$conn->close();
?>