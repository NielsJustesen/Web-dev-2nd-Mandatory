<?php
    $validation = "false";

    if (isset($_POST["logout"])) { 
        session_destroy();

    } else if (isset($_SESSION["customerId"])) {    
        header('Location: index.php');

    } else if (isset($_POST["email"])) {
        
        $userValidation = true;

        $email = $_POST["email"];
        $password = $_POST['pwd'];
        require_once('src/customer.php');

        $customer = new Customer();
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

            header('Location: index.php');
        }
    } else if (isset($_POST["email"]) && isset($_POST["pwd"]) && $_POST["email"] === "admin" && $_POST["pws"] === "admin"){
        session_start();
        $_SESSION["role"] = "Admin";
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
    </head>
    <body>
        <form action="login.php" method="POST">
            <fieldset>
                <legend>Login</legend>
                <label>Username</label>
                <input type="text" name="email" id="email">
                <label>Password</label>
                <input type="password" name="pwd" id="pwd">
                <input type="submit" id="loginBtn" value="Login">
                <p>Don't have an account? <a href="signup.php">Sign up now</a>.</p>
            </fieldset>
        </form>
    </body>
</html>