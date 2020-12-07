<?php
    include_once("header.php");
    session_start();
?>
<html>
    <body>
        <form action="cookie.php" method="POST">
            <span>Track Name:</span>
            <input type="text" name="trackName" required>
            <span>Track Price:</span>
            <input type="text" name="trackPrice" required>
            <input type="submit" name="addToCart" value="Add to cart">
        </form>

        <form method="POST">
            <span>Hardcoded values for easy test:</span>
            <input type="hidden" name="trackName" value="For Those About To Rock (We Salute You)">
            <input type="hidden" name="trackPrice" value="$0.99">
            <input type="submit" name="addToCart" src="imgs/cart.png">
        </form>
    </body>
</html>
<?php

    $cookieName = "CustomerID".$_SESSION["customerId"];
    if(isset($_POST["trackName"]) && isset($_POST["trackPrice"])){
        if(isset($_COOKIE[$cookieName])){
            $newTrack = ["Name"=>$_POST["trackName"], "Price"=>$_POST["trackPrice"]];
            $tracks = unserialize($_COOKIE[$cookieName]);
            array_push($tracks, $newTrack);
            setcookie($cookieName, serialize($tracks), time() + (86400 * 30), "/");
        }
    }
    echo "customer cookie: " .$cookieName;
    if(isset($_COOKIE[$cookieName])){
        $tracks = unserialize($_COOKIE[$cookieName]);
        echo "<pre>";
        echo print_r($tracks);
        echo "</pre>";
    }

    if(isset($_SESSION)){
        echo "<pre>";
        echo print_r($_SESSION);
        echo "</pre>";
    }
?>