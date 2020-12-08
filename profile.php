<?php
    //Make delete cart item button from form, with post, to unset() the array index from the customer cookie
    if(!isset($_SESSION)){
        session_start();
    }
    if (isset($_SESSION["customerId"])) {
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
    }
?>
<!DOCTYPE html>
<html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Chinook Abridged</title>
        <script src="js/jquery-3.5.1.js"></script>
        <script src="js/script.js"></script>
        <script src="js/profile.js"></script>
    </head>
    <?php
        include_once("header.php");
    ?>
    <body id="profileBody">
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
                <table id="cartTable">
                    <tr>
                        <th>Song</th>
                        <th>Price</th>
                        <th>Quantity</th>
                        <th>Remove</th>
                    </tr>
                    <?php
                        $cart = unserialize($_COOKIE["CustomerID".$_SESSION["customerId"]]);
                        foreach ($cart as $cartItem){
                    ?>
                        <tr class="cartRow">
                            <td class="songName" ><?=$cartItem["Name"]?></td>
                            <td class="songPrice"><?=$cartItem["Price"]?></td>
                            <td class="songQuantity"><input type="number" class="songQuantInput" min="1" name="quantity" value="1"></td>
                            <td class="songRemove"><input type="image" src="imgs/trash.png" class="removeCartItemBtn"></td>
                        </tr>
                    <?php
                        }
                    ?>
                </table>
                <span id="totalPrice">Total: </span>
            </fieldset>
        </div>
        <?php
            include_once("footer.htm");
        ?>
    </body>
</html>