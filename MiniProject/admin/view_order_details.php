<?php
require_once 'includes/functions.php';

session_start();
include("config.php");

if (!isset($_SESSION['admin_logged_in'])) {
    header("Location: admin_login.php");
    exit();
}

$sql = "SELECT * FROM orders";
$result = $conn->query($sql);
?>

<!DOCTYPE html>
<html>
<head><title>Order Details</title></head>
<body>
    <h2>Order Details</h2>
    <table border="1">
        <tr>
            <th>Order ID</th>
            <th>User ID</th>
            <th>Total Price</th>
            <th>Status</th>
            <th>Action</th>
        </tr>
        <?php while ($order = $result->fetch_assoc()) { ?>
        <tr>
            <td><?php echo $order['id']; ?></td>
            <td><?php echo $order['user_id']; ?></td>
            <td><?php echo $order['total_price']; ?></td>
            <td><?php echo $order['status']; ?></td>
            <td>
                <a href="update_order_status.php?id=<?php echo $order['id']; ?>">Update Status</a>
            </td>
        </tr>
        <?php } ?>
    </table>
</body>
</html>
