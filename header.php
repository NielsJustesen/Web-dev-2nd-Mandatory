<?php
    if(!isset($_SESSION)){
        session_start();
    }
    if(isset($_POST["logout"])){
        session_destroy();
    }
?>
<head>
    <title>Chinook Abridged</title>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="stylesheet" href="css/styles.css">
</head>
<header>
    <?php
        if(!isset($_SESSION["customerId"])){
    ?>
        <form action="login.php" method="post">
            <input type="submit" value="Sign In">
        </form>
    <?php
        }
        else {
    ?>
        <form action="index.php" method="POST">
            <input type="submit" name="logout" value="Logout">
        </form>
        <form action="profile.php" method="POST">
            <input type="submit" name="profile" value="Profile">
        </form>
    <?php
        }
    ?>
</header>
