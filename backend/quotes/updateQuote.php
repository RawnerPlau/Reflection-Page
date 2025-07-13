<?php
include '../db.php';

$id = $_POST['id'] ?? null;
$quote = $_POST['quote'] ?? '';
$author = $_POST['author'] ?? '';

// Basic validation
if (!$id || $quote === '' || $author === '') {
    echo "Invalid input.";
    exit;
}

$stmt = $conn->prepare("UPDATE quotes SET quote = ?, author = ? WHERE id = ?");
$stmt->bind_param('ssi', $quote, $author, $id);

if ($stmt->execute()) {
    echo "Quote updated successfully!", $id, $quote, $author;
} else {
    echo "Error: " . $stmt->error;
}

$stmt->close();
$conn->close();
?>