<?php 
header('Content-Type: application/json');
include '../db.php';

$result = $conn->query("SELECT * FROM quotes ORDER BY id DESC");
$quotes = [];

if (!$result) {
    echo json_encode(['error' => $conn->error]);
    exit;
}

while ($row = $result->fetch_assoc()) {
    $quotes[] = [
        'id' => $row['id'],
        'quote' => $row['quote'],
        'author' => $row['author']
    ];
}

echo json_encode($quotes);
?>
