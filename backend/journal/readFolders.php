<?php
header('Content-Type: application/json');
include '../db.php';

$result = $conn->query('SELECT * FROM folders ORDER BY id ASC');
$folders= [];

if (!$result) {
    echo json_encode(['error' => $conn->error]);
    exit;
};

while ($row = $result->fetch_assoc()){
    $folders[] = [
        'id' => $row['id'],
        'name' => $row['name'],
        'created_at' => $row['created_at']
    ];
};

echo json_encode($folders);
?>