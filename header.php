<head>
    <title>Chinook Abridged</title>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="Content-Security-Policy" content="script-src http://chinookabridged-env-1.eba-ap8rbted.us-east-1.elasticbeanstalk.com/js/">
    <link rel="stylesheet" href="css/headerStyle.css">
</head>
<header>
    
    <form action="browse.php" method="POST">
        <input type="submit" name="browse" value="Browse Music">
    </form>
    <?php
        if(!isset($_SESSION["role"])){
    ?>
        <form action="login.php" method="post">
            <input type="submit" value="Sign In">
        </form>
    <?php
        }
        if (isset($_SESSION["customerId"])){
    ?>
        <form action="profile.php" method="POST">
            <input type="submit" name="profile" value="Profile">
        </form>
    <?php
        }
        if (isset($_SESSION["role"])) {
            $user = "(Logged in as ".$_SESSION["role"].")";
    ?>
            <span id="role"><?=$user?></span>
            <form action="index.php" method="POST">
                <input type="submit" name="logout" value="Logout">
            </form>
            <?php
            if($_SESSION["role"] === "Admin"){
                ?>
                    <form action="admin.php" method="POST">
                        <input type="submit" name="admin" value="Administration">
                    </form>
                <?php
            }
        }
    ?>
</header>
