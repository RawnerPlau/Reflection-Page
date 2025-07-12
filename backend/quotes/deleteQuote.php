<?php
include '../db.php';

$quoteId = $_POST['id'] ?? null;

if(empty($quoteId)){
    die("Quote not found.");
}

$stmt = $conn->prepare('DELETE FROM quotes WHERE id = ?');
$stmt->bind_param('i', $quoteId);

if ($stmt->execute()) {
    echo 'Deleted successfully!';
} else {
    echo "Error deleting quote: " . $stmt->error;
}

$stmt->close();
$conn->close();
?>