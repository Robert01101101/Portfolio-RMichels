<?php

session_start();
if (isset($_POST['language'])) {
    $_SESSION['language'] = $_POST['language'];
}
header("Location: " . $_SERVER['HTTP_REFERER']);
exit;

?>