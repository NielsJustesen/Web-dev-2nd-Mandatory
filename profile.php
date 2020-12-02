<?php
    if(!isset($_SESSION)){
        session_start();
    }
    $firstName = $_SESSION["firstName"];
    $lastName = $_SESSION["lastName"];
    $email = $_SESSION["email"];
    $company = $_SESSION["company"];
    $phone = $_SESSION["phone"];
    $fax = $_SESSION["fax"];
    $address = $_SESSION["address"];
    $city = $_SESSION["city"];
    $state = $_SESSION["state"];
    $country = $_SESSION["country"];
    $postalCode = $_SESSION["postalCode"];
?>
<!DOCTYPE html>
<html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Chinook Abridged</title>
        <script src="js/jquery-3.5.1.js"></script>
        <script src="js/script.js"></script>
    </head>
    <?php
        include_once("header.php");
    ?>
    <body>
        <div id="profile">
            <fieldset id="profileInfo">
                <legend>Profile</legend>    
                <span>First name: <?=$firstName?></span><br>
                <span>Last name: <?=$lastName?></span><br>
                <span>Email: <?=$email?></span><br>
                <span>Company: <?=$company?></span><br>
                <span>Phone: <?=$phone?></span><br>
                <span>Fax: <?=$fax?></span><br>
                <fieldset id="shipping">
                    <legend>Shipping</legend>
                    <span>Address: <?=$address?></span><br>
                    <span>City: <?=$city?></span><br>
                    <span>State: <?=$state?></span><br>
                    <span>Country: <?=$country?></span><br>
                    <span>Postal Code: <?=$postalCode?></span><br>
                </fieldset>
            </fieldset>
            <fieldset id="cart">
                <legend>Cart</legend>
                <ol id="cartList">
                    <!-- TEST CART ITEM PLACEHOLDER -->
                    <li class="cartItem"><span>Song name: </span><span class="songName" >Thunderstruck</span><span> Price: </span><span class="songPrice">0.99</span></li>
                </ol>
                <span id="totalPrice">Total: </span>
            </fieldset>
        </div>
    </body>
</html>