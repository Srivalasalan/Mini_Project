<?php
session_start();
include '../config.php';

$studentId = $_SESSION['user_id'];
$totalAmount = $_POST['total_amount'];
$paymentMethod = $_POST['payment_method'];
$paymentStatus = "pending";
$status = "new";

// Insert order
$sql = "INSERT INTO orders (student_id, total_amount, status, payment_method, payment_status) 
        VALUES (?, ?, ?, ?, ?)";
$stmt = $conn->prepare($sql);
$stmt->bind_param("idsss", $studentId, $totalAmount, $status, $paymentMethod, $paymentStatus);

if ($stmt->execute()) {
    echo "Order placed successfully!";
} else {
    echo "Error: " . $stmt->error;
}
?>
