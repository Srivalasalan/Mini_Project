<?php
session_start();
include '../config.php';

if (!isset($_GET['id']) || !isset($_GET['status'])) {
    die("Invalid request.");
}

$order_id = $_GET['id'];
$status = $_GET['status'];

$sql = "UPDATE orders SET status = ? WHERE order_id = ?";
$stmt = $conn->prepare($sql);
$stmt->bind_param("si", $status, $order_id);

if ($stmt->execute()) {
    header("Location: admin_dashboard.php");
} else {
    echo "Error updating status: " . $stmt->error;
}
?>


<!DOCTYPE html>
<html lang="en">
<head>
    <title>My Orders</title>
</head>
<body>
    <h2>My Orders</h2>
    
    <?php while ($order = $result->fetch_assoc()): ?>
        <p>Order ID: <?php echo $order['order_id']; ?></p>
        <p>Status: <?php echo ucfirst($order['status']); ?></p>
        <hr>
    <?php endwhile; ?>
</body>
</html>
