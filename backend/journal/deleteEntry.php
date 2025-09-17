<?php
include '../db.php';

$entryId = $_POST['id'] ?? null;

if(empty($entryId)) {
    echo json_encode([
        "success" => false,
        "message" => "Invalid Entry ID."
    ]);
    exit;
};

$stmt = $conn->prepare('DELETE FROM journal_entries WHERE id = ?');
$stmt->bind_param('i', $entryId);

if ($stmt->execute()) {
    echo json_encode([
        "success" => true,
        "message" => "Entry deleted successfully."
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