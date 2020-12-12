<?php
    //Make delete cart item button from form, with post, to unset() the array index from the customer cookie
    if(!isset($_SESSION)){
        session_start();
    }
    if(isset($_GET["trackIndex"])) {
        $toRemove = $_GET["trackIndex"];
    }
    if (isset($_SESSION["customerId"])) {
        $customerId = $_SESSION["customerId"];
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
        <link rel="stylesheet" href="css/styles.css">
        <script src="js/jquery-3.5.1.js"></script>
        <script src="js/script.js"></script>
        <script src="js/profile.js"></script>
    </head>
    <?php
        include_once("header.php");
    ?>
    <body id="profileBody">
        <span hidden id="customerId" value=<?=$customerId?>><?=$customerId?></span>
        <div id="profile">
            <fieldset id="profileInfo">
                <legend>Profile</legend>
                <span>First name: <?=$firstName?></span><br>
                <span>Last name: <?=$lastName?></span><br>
                <span>Email: <?=$email?></span><br>
                <span>Company: <?=$company?></span><br>
                <span>Phone: <?=$phone?></span><br>
                <span>Fax: <?=$fax?></span><br>
                <input type="image" id="editProlie" src="imgs/edit.png" class="editBtn">
                <fieldset id="shipping">
                    <legend>Shipping</legend>
                    <span>Address: <?=$address?></span><br>
                    <span>City: <?=$city?></span><br>
                    <span>State: <?=$state?></span><br>
                    <span>Country: <?=$country?></span><br>
                    <span>Postal Code: <?=$postalCode?></span><br>
                    <input type="image" id="editShipping" src="imgs/edit.png" class="editBtn">
                </fieldset>
                <input type="button" id="editPassword" value="Change Password">
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
                        $cookieName = "CustomerID".$_SESSION["customerId"];
                        $cart = unserialize($_COOKIE[$cookieName]);
                        if(isset($toRemove)){
                            unset($cart[$toRemove]);
                            setcookie($cookieName, serialize($cart), time() + (86400 * 30), "/");
                        }
                        $totalprice = 0;
                        foreach ($cart as $key => $value){
                    ?>
                            <tr class="cartRow" id=<?=$key?>>
                                <td class="songName" ><?=$value["Name"]?></td>
                                <td class="songPrice" ><?=$value["Price"]?></td>
                                <td class="songQuantity"><input type="text" class="songQuantInput" min="1" oninput="this.value = this.value.replace(/[^0-9.]/g, '').replace(/(\..*)\./g, '$1');" ></td>
                                <td class="songRemove"><input type="image" src="imgs/trash.png" class="removeCartItemBtn"></td>
                            </tr>
                    <?php
                            $totalprice = $totalprice + $value["Price"];
                        }
                    ?>
                </table>
                <div class="totalPrice">
                    <span >Total Price:</span>
                    <span id="invoicePrice"><?=$totalprice?></span>
                </div>
            </fieldset>
        </div>
        <div id="editProfileModal" class="modal">
            <div id="editProfileModalContent">
                <span class="closeForm">&times;</span>
                <form action="profile.php" id="editProfileForm" method="PUT" class="profileForm">
                    <p>First Name</p>
                    <input type="text" name="fisrtName" id="editFirstName" value=<?=$firstName?> required>
                    <p>Last Name</p>
                    <input type="text" name="lastName" id="editLastName" value=<?=$lastName?> required>
                    <p>Email</p>
                    <input type="mail" name="email" id="editEmail" value=<?=$email?> required>
                    <p>Company</p>
                    <input type="text" name="company" id="editCompany" value=<?=$company?> required>
                    <p>Phone</p>
                    <input type="text" name="phone" id="editPhone" value=<?=$phone?> required>
                    <p>Fax</p>
                    <input type="text" name="fax" id="editFax" value=<?=$fax?> required>
                    <input type="submit" value="Confirm">
                </form>
            </div>
        </div>
        <div id="editShippingModal" classe="modal">
            <div id="editShippingModalContent">
                <span class="closeForm">&times;</span>
                <form action="profile.php" id="editShippingForm" method="PUT" class="profileForm">
                    <p>Address</p>
                    <input type="text" name="address" id="editAddress" value=<?=$address?> required>
                    <p>City</p>
                    <input type="text" name="city" id="editCity" value=<?=$city?> required>
                    <p>State</p>
                    <input type="text" name="state" id="editState" value=<?=$state?> required>
                    <p>Country</p>
                    <input type="text" name="country" id="editCountry" value=<?=$country?> required>
                    <p>Postal Code</p>
                    <input type="text" name="postalCode" id="editPostalCode" value=<?=$postalCode?> required>
                    <input type="submit" value="Confirm">
                </form>
            </div>
        </div>
        <div id="editPasswordModal" classe="modal">
            <div id="editPasswordModalContent">
                <span class="closeForm">&times;</span>
                <form action="profile.php" id="edittPasswordForm" method="PUT" class="profileForm">
                    <p>New Password</p>
                    <input type="password" name="password" id="newPassword">
                    <input type="submit" value="Confirm">
                </form>
            </div>
        </div>
        <?php
            include_once("footer.htm");
        ?>
    </body>
</html>