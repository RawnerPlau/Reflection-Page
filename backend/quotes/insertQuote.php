<?php
include '../db.php';

$quote = $_POST['quote'] ?? '';
$author = $_POST['author'] ?? '';

if (empty($quote) || empty($author)) {
    die("Quote and Author are required.");
}

$stmt = $conn->prepare("INSERT INTO quotes (quote, author) VALUES (?,?)");
$stmt->bind_param("ss", $quote, $author);

try{
    $stmt->execute();
} catch(error){
    echo $stmt->error;
}

$stmt->close();
$conn->close();
?>