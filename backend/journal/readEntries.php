<?php
header('Content-Type: application/json');
include '../db.php';

$folder_id = $_GET['folderId'] ?? null;

if (empty($folder_id)){
    echo json_encode(['error' => "No folder Id"]);
};

$stmt = $conn->prepare('SELECT * FROM journal_entries WHERE id = ?');
$stmt->bind_param('i', $folder_id);
$stmt->execute();

$result = $stmt->get_result();

$entries = [];

while($row = $result->fetch_assoc()){
    $entries[] = $row;
};

if (empty($entries)){
    die('No entries');
};

echo json_encode($entries);
exit;
?>