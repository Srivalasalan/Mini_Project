<?php
// Redirect function
function redirect($url) {
    header("Location: " . $url);
    exit();
}

// Secure input function
function h($string) {
    return htmlspecialchars($string, ENT_QUOTES, 'UTF-8');
}

// Check if the user is logged in
function isLoggedIn() {
    return isset($_SESSION['user_id']);
}
?>
