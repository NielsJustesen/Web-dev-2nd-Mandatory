<?php
    session_start();
    echo "<pre>";
    $array = $_SESSION;
    echo print_r($array);
    echo "</pre>";
?>
