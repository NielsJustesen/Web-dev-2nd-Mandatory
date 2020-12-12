<?php
    if(isset($_POST["logout"])){
        if(isset($_SESSION)){
                session_destroy();
            }
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
    <?php
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
