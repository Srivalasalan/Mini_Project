<?php
require_once 'includes/functions.php';

session_start();
session_destroy();
header("Location: admin_login.php");
exit();
?>
