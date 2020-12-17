<?php
    session_start();
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
        $cookieName = "CustomerID".$_SESSION["customerId"];
        $cart = unserialize($_COOKIE[$cookieName]);
    }
    else {
        header("Location: login.php");
    }

    function e($text) {
        return htmlspecialchars($text, ENT_COMPAT|ENT_HTML5, 'UTF-8', false);
    }
?>
<!DOCTYPE html>
<html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <meta http-equiv="Content-Security-Policy" content="script-src http://chinookabridged-env-1.eba-ap8rbted.us-east-1.elasticbeanstalk.com/js/">
        <title>Chinook Abridged</title>
        <link rel="stylesheet" href="css/styles.css">
        <script src="js/jquery-3.5.1.js"></script>
        <script src="js/script.js"></script>
        <script src="js/profile.js"></script>
        <script srt="js/ApiUrls.js"></script>
    </head>
    <?php
        include_once("header.php");
    ?>
    <body id="profileBody">
        <span hidden id="customerId" value=<?=$customerId?>><?=$customerId?></span>
        <div id="profile">
            <fieldset id="profileInfo">
                <legend>Profile</legend>
                <span>First name:<?php echo e($firstName); ?></span><br>
                <span>Last name:<?php echo e($lastName); ?></span><br>
                <span>Email:<?php echo e($email);?></span><br>
                <span>Company: <?php echo e($company);?></span><br>
                <span>Phone: <?php echo e($phone);?></span><br>
                <span>Fax: <?php echo e($fax);?></span><br>
                <input type="image" id="editProlie" src="imgs/edit.png" class="editBtn">
                <fieldset id="shipping">
                    <legend>Shipping</legend>
                    <span id="infoAddress">Address: <?php echo e($address);?></span><br>
                    <span id="infoCity">City: <?php echo e($city);?></span><br>
                    <span id="infoState">State: <?php echo e($state);?></span><br>
                    <span id="infoCountry">Country: <?php echo e($country);?></span><br>
                    <span id="infoPostalCode">Postal Code: <?php echo e($postalCode);?></span><br>
                    <input type="image" id="editShipping" src="imgs/edit.png" class="editBtn">
                </fieldset>
                <input type="button" id="editPassword" value="Change Password">
            </fieldset>
            <fieldset id="cart">
                <?php
                    if(isset($_POST["purchase"]))
                    {
                        foreach ($cart as $key => $value) {
                            unset($cart[$key]);
                        }
                        setcookie($cookieName, serialize($cart), time() + (86400 * 30), "/", null, false, true);
                ?>
                        <p><b>Thank you for your purchase!</b></p>
                <?php
                        unset($_POST["purchase"]);
                    }
                ?>
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
                        if(isset($toRemove)){
                            unset($cart[$toRemove]);
                            setcookie($cookieName, serialize($cart), time() + (86400 * 30), "/", null, false, true);
                        }
                        $totalprice = 0;
                        $trackIndex = 0;
                        foreach ($cart as $key => $value){
                    ?>
                            <tr class="cartRow" id=<?=$key?>>
                                <td class="songName" value=<?=$value["Name"]?>><?php echo e($value["Name"])?></td>
                                <td class="songPrice" id="songPrice<?=$key?>" value=<?=$value["Price"]?>><?php echo e($value["Price"])?></td>
                                <td class="songQuantity"><input type="number" class="songQuantInput" id="songIndex<?=$trackIndex?>" min="1" value=1 ></td>
                                <td class="songRemove"><input type="image" src="imgs/trash.png" class="removeCartItemBtn"></td>
                            </tr>
                    <?php
                            $totalprice = $totalprice + $value["Price"];
                            $trackIndex = $trackIndex + 1;
                        }
                    ?>
                </table>
                <input type="button" id="purchaseBtn" value="Purchase Items">
            </fieldset>
        </div>
        <div id="editProfileModal" class="modal">
            <div id="editProfileModalContent" class="modalContent">
                <span class="closeForm">&times;</span>
                <form action="profile.php" id="editProfileForm" method="POST" class="profileForm">
                    <p>First Name</p>
                    <input type="text" name="fisrtName" id="editFirstName" value="<?=$firstName?>" required>
                    <p>Last Name</p>
                    <input type="text" name="lastName" id="editLastName" value="<?=$lastName?>" required>
                    <p>Email</p>
                    <input type="mail" name="email" id="editEmail" value="<?=$email?>" required>
                    <p>Company</p>
                    <input type="text" name="company" id="editCompany" value="<?=$company?>" required>
                    <p>Phone</p>
                    <input type="text" name="phone" id="editPhone" value="<?=$phone?>" required>
                    <p>Fax</p>
                    <input type="text" name="fax" id="editFax" value="<?=$fax?>" required>
                    <input type="submit" value="Confirm">
                </form>
            </div>
        </div>
        <div id="editShippingModal" class="modal">
            <div id="editShippingModalContent" class="modalContent">
                <span class="closeForm">&times;</span>
                <form action="profile.php" id="editShippingForm" method="POST" class="profileForm">
                    <p>Address</p>
                    <input type="text" name="address" id="editAddress" value="<?=$address?>" required>
                    <p>City</p>
                    <input type="text" name="city" id="editCity" value="<?=$city?>" required>
                    <p>State</p>
                    <input type="text" name="state" id="editState" value="<?=$state?>" required>
                    <p>Country</p>
                    <input type="text" name="country" id="editCountry" value="<?=$country?>" required>
                    <p>Postal Code</p>
                    <input type="text" name="postalCode" id="editPostalCode" value="<?=$postalCode?>" required>
                    <input type="submit" value="Confirm">
                </form>
            </div>
        </div>
        <div id="editPasswordModal" class="modal">
            <div id="editPasswordModalContent">
                <span class="closeForm">&times;</span>
                <form action="profile.php" id="edittPasswordForm" method="POST" class="profileForm">
                    <p>New Password</p>
                    <input type="password" name="password" id="newPassword">
                    <input type="submit" value="Confirm">
                </form>
            </div>
        </div>
        <div id="purchaseModal" class="modal">
            <div id="purchaseModalContent" class="modalContent">
                <span id="cancelInvoiceBtn" class="closeForm">&times;</span>
                <form id="invoiceSubmitForm" action="profile.php" method="POST">
                    <fieldset id="invoiceShipping">
                        <legend>Invoice</legend>
                        <p>Billing Address</p>
                        <input type="text" id="invoiceBillingAddress" value="<?=$address?>">
                        <p>Billing City</p>
                        <input type="text" id="invoiceBillingCity" value="<?=$city?>">
                        <p>Billing State</p>
                        <input type="text" id="invoiceBillingState" value="<?=$state?>">
                        <p>Billing Country</p>
                        <input type="text" id="invoiceBillingCountry" value="<?=$country?>">
                        <p>Billing Postal Code</p>
                        <input type="text" id="invoiceBillingPostalCode" value="<?=$postalCode?>"><br>
                    </fieldset>
                    <fieldset id="invoiceCart">
                        <legend>Cart</legend>
                    </fieldset>
                    <input hidden type="text" name="purchase" value="true">
                    <input type="submit" id="submitInvoiceBtn" value="Buy">
                </form>
            </div>
        </div>
        <?php
            include_once("footer.htm");
        ?>
    </body>
</html>