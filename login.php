<?php
    if (isset($_SESSION["role"]) && $_SESSION["role"] === "Customer") {
        header("Location: profile.php");
    } else if (isset($_SESSION["role"]) && $_SESSION["role"] === "Admin") {
        header("Location: admin.php");
    }
    
    $validation = "false";
    require_once('src/user.php');
    
    if (isset($_POST["email"]) && $_POST["email"] === "admin"){
        $user = new User();
        $verify = $user->admin($_POST["pwd"]);
        if($verify){
            session_start();
            $_SESSION["role"] = "Admin";
        }
    } else if (isset($_POST["email"])) {
        $userValidation = true;

        $email = $_POST["email"];
        $password = $_POST['pwd'];

        $customer = new User();
        $validUser = $customer->validate($email, $password);
        if ($validUser) {
            
            session_start();
            $_SESSION["role"] = "Customer";
            $_SESSION["customerId"] = $customer->customerId;
            $_SESSION["firstName"] = $customer->firstName;
            $_SESSION["lastName"] = $customer->lastName;
            $_SESSION["email"] = $customer->email;
            $_SESSION["company"] = $customer->company;
            $_SESSION["address"] = $customer->address;
            $_SESSION["city"] = $customer->city;
            $_SESSION["state"] = $customer->state;
            $_SESSION["country"] = $customer->country;
            $_SESSION["postalCode"] = $customer->postalCode;
            $_SESSION["phone"] = $customer->phone;
            $_SESSION["fax"] = $customer->fax;
            $cookieName = "CustomerID".$_SESSION["customerId"];
            if(!isset($_COOKIE[$cookieName])){
                $cart = array();
                setcookie($cookieName, serialize($cart), time() + (86400 * 30), "/", null, false, true);
            }
        }
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
        <script srt="js/ApiUrls.js"></script>
    </head>
    <?php
        include_once("header.php");
    ?>
    <body>
        <div id="loginDiv">
            <form method="POST" id="loginForm">
                <fieldset id="loginFieldset">
                    <legend>Login</legend>
                    <label>Username</label>
                    <input type="text" name="email" id="email">
                    <label>Password</label>
                    <input type="password" name="pwd" id="pwd">
                    <input type="submit" id="loginBtn" value="Login">
                    <a href="signup.php">Sign up now</a>
                </fieldset>
            </form>
        </div>
        <?php
            include_once("footer.htm");
        ?>
    </body>
</html>