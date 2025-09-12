<?php
include '../db.php';

$folderId = $_POST['id'] ?? null;

if(empty($folderId)){
    die("Folder not found.");
}
echo 'deleteFolder.php triggered';
$stmt = $conn->prepare('DELETE FROM folders WHERE id = ?');
$stmt->bind_param('i', $folderId);

if ($stmt->execute()) {
    echo 'Deleted successfully!';
} else {
    echo "Error deleting folder: " . $stmt->error;
}

$stmt->close();
$conn->close();
?>