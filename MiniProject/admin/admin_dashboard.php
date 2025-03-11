<?php
include '../config.php'; // Database connection

$sql = "SELECT * FROM orders ORDER BY order_date DESC";
$result = $conn->query($sql);
?>

<!DOCTYPE html>
<html lang="en">
<head>
    <title>Admin Dashboard</title>
</head>
<body>
    <h2>Order Management</h2>
    <table border="1">
        <tr>
            <th>Order ID</th>
            <th>Student ID</th>
            <th>Total Price</th>
            <th>Status</th>
            <th>Action</th>
        </tr>
        <?php while ($order = $result->fetch_assoc()) { ?>
        <tr>
            <td><?php echo $order['order_id']; ?></td>
            <td><?php echo $order['student_id']; ?></td>
            <td><?php echo $order['total_amount']; ?></td>
            <td><?php echo $order['status']; ?></td>
            <td>
                <a href="update_order_status.php?id=<?php echo $order['order_id']; ?>&status=ready">Mark as Ready</a> |
                <a href="update_order_status.php?id=<?php echo $order['order_id']; ?>&status=delivered">Mark as Delivered</a>
            </td>
        </tr>
        <?php } ?>
    </table>
</body>
</html>
