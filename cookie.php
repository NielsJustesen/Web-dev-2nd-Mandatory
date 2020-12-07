<?php
    include_once("header.php");

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
    echo "<pre>";
    if(isset($_COOKIE[$cookieName])){
        $tracks = unserialize($_COOKIE[$cookieName]);
        echo print_r($tracks);
    }
    echo "</pre>";
?>
<html>
    <body>
        <form action="cookie.php" method="POST">
            <input type="text" name="trackName" required>
            <input type="text" name="trackPrice" required>
            <input type="submit" name="addToCart" value="Add to cart">
        </form>
    </body>
</html>