<?php
require_once 'includes/functions.php';

$host = "localhost";
$username = "root";  // Default username for XAMPP
$password = "";  // Leave empty for XAMPP
$database = "food_ordering";

$conn = new mysqli($host, $username, $password, $database);

if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}
?>
