<?php
    session_start();
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
    <body>
        <div class="profile">
            <span>First name: </span><span><?=$firstName?></span><br>
            <span>Last name: </span><span><?=$lastName?></span><br>
            <span>Email: </span><span><?=$email?></span><br>
            <span>Company: </span><span><?=$company?></span><br>
            <span>Phone: </span><span><?=$phone?></span><br>
            <span>Fax: </span><span><?=$fax?></span><br>
            <fieldset id="shipping">
                <legend>Shipping</legend>
                <span>Address: </span><span><?=$address?></span><br>
                <span>City: </span><span><?=$city?></span><br>
                <span>State: </span><span><?=$state?></span><br>
                <span>Country: </span><span><?=$country?></span><br>
                <span>Postal Code: </span><span><?=$postalCode?></span><br>
            </fieldset>
        </div>
    </body>
</html>