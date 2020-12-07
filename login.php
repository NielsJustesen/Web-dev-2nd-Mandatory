<?php
    $validation = "false";

    if (isset($_SESSION["customerId"])) {
        header('Location: index.php');

    } else if (isset($_POST["email"])) {
        $userValidation = true;

        $email = $_POST["email"];
        $password = $_POST['pwd'];
        require_once('src/user.php');

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
                setcookie($cookieName, serialize($cart), time() + (86400 * 30), "/");
            }
        }
    } else if (isset($_POST["email"]) && isset($_POST["pwd"]) && $_POST["email"] === "admin" && $_POST["pwd"] === "admin"){
        echo "ADMIN";
        $user = new User();
        $verify = $user->admin($_POST["email"], $_POST["pwd"]);
        if($verify){
            if(isset($_SESSION)){
                // session_destroy();
                session_start();
                $_SESSION["role"] = "Admin";
            }
        }
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
    </head>
    <?php
        include_once("header.php");
    ?>
    <body>
        <form method="POST">
            <fieldset>
                <legend>Login</legend>
                <label>Username</label>
                <input type="text" name="email" id="email">
                <label>Password</label>
                <input type="password" name="pwd" id="pwd">
                <input type="submit" id="loginBtn" value="Login">
                <p>Not yet registered? <a href="signup.php">Sign up now</a>.</p>
            </fieldset>
        </form>
        <?php
            include_once("footer.htm");
        ?>
    </body>
</html>