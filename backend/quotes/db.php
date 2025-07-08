<?php
$host = "localhost";
$username = "admin";
$password = "";
$database = "quotes";

$conn = new mysqli($host, $username, $password, $database);

if ($conn->connect_error) {
    die("Connection Failed: " .$conn->connect_error);
}
?>