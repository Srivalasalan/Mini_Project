<?php
require_once 'includes/functions.php';
$status = 'new';

$sql = "INSERT INTO orders (order_id, student_id, total_amount, status, payment_method, payment_status) 
        VALUES (?, ?, ?, ?, ?, ?)";
$stmt = $conn->prepare($sql);
$stmt->bind_param("sidsss", $orderId, $studentId, $totalAmount, $status, $paymentMethod, $paymentStatus);
$stmt->execute();

session_start();
include("config.php");

if (!isset($_SESSION['admin_logged_in'])) {
    header("Location: admin_login.php");
    exit();
}

if (isset($_GET['id'])) {
    $order_id = $_GET['id'];
    
    $new_status = "ready"; // Example: Changing status to 'ready'
    $sql = "UPDATE orders SET status='$new_status' WHERE id=$order_id";
    $conn->query($sql);

    header("Location: view_order_details.php");
    exit();
}
?>
