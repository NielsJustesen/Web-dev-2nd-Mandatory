<?php
    session_start();
    echo "<pre>";
    $array = $_SESSION;
    echo print_r($array);
    echo "</pre>";
    if(isset($_SESSION["loggedin"]) && $_SESSION["loggedin"] === true){
        header("location: index.php");
    }
?>
<!DOCTYPE html>
<html lang="en">
    <head>
        <title>Chinook Abridged</title>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <link rel="stylesheet" href="css/styles.css">
        <script src="js/jquery-3.5.1.js"></script>
        <script src="js/script.js"></script>
    </head>
    <body>
        <?php
            if(!isset($_SESSION["loggedin"])){
        ?>
        <h2>Login</h2>
        <form action="index.php" method="post">
                <label>Username</label>
                <input type="text" name="email" id="email">
                <label>Password</label>
                <input type="password" name="pwd" id="pwd" class="form-control">
                <input type="submit" id="loginBtn" class="btn btn-primary" value="Login">
                <span hidden name="status" id="loggedin" value></span>
            <p>Don't have an account? <a href="register.php">Sign up now</a>.</p>
        </form>
        <?php
                if(isset($_POST["status"])){
                    $_SESSION["loggedin"] = $_POST["status"];
                }
            }
            else if (isset($_SESSION["loggedin"]) && $_SESSION["loggedin"] === true){
        ?>
            <form action="index.php" method="post">
                <span hidden name="status" value=<?false?>></span>
                <input type="submit" value="Log out">
            </form>
        <?php
                $_SESSION["loggedin"] = $_POST["status"];
            }
        ?>
    </body>
</html>