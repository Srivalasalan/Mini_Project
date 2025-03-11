<?php
include '../config.php';

// Define admin credentials
$admin_email = "admin@example.com";
$admin_password = password_hash("admin123", PASSWORD_DEFAULT); // Securely hash the password

// Check if admin already exists
$sql = "SELECT * FROM users WHERE email = ?";
$stmt = $conn->prepare($sql);
$stmt->bind_param("s", $admin_email);
$stmt->execute();
$result = $stmt->get_result();

if ($result->num_rows == 0) { // If admin doesn't exist, insert it
    $sql = "INSERT INTO users (email, password, role) VALUES (?, ?, 'admin')";
    $stmt = $conn->prepare($sql);
    $stmt->bind_param("ss", $admin_email, $admin_password);
    if ($stmt->execute()) {
        echo "Admin account created successfully.";
    } else {
        echo "Error: " . $stmt->error;
    }
} else {
    echo "Admin account already exists.";
}
?>
