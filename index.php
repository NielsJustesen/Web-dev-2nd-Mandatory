<!DOCTYPE html>
<html lang="en">
    <head>
        <title>Chinook Abridged</title>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <meta http-equiv="Content-Security-Policy" content="script-src http://chinookabridged-env-1.eba-ap8rbted.us-east-1.elasticbeanstalk.com/js/">
        <link rel="stylesheet" href="css/styles.css">
        <script src="js/jquery-3.5.1.js"></script>
        <script src="js/script.js"></script>
    </head>
    <?php
        session_start();
        if(isset($_POST["logout"])){
            echo "destroying session";
            session_destroy();
        }
        if(!isset($_SESSION["role"])){
            header("Location: login.php");
        }
        include_once("header.php");
    ?>
    <body>
        <main>
        </main>
    </body>
    <?php
        include_once("footer.htm");
    ?>
</html>
