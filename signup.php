<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="Content-Security-Policy" content="script-src http://chinookabridged-env-1.eba-ap8rbted.us-east-1.elasticbeanstalk.com/js/">
    <title>Chinook Abridged</title>
    <link rel="stylesheet" href="css/styles.css">
    <script src="js/jquery-3.5.1.js"></script>
    <script src="js/signup.js"></script>
    <script srt="js/ApiUrls.js"></script>
</head>
<body>
    <?php
        include_once("header.php");
    ?>
    <form action="index.php" id="signupForm" method="POST">
        <fieldset id="signupFieldset">
            <legend>Signup Form</legend>
            <label for="firstNametxt">First name</label>
            <input type="text" name="firstName" id="firstNametxt" required>
            <label for="lastNametxt">Last name</label>
            <input type="text" name="lastName" id="lastNametxt" required>
            <label for="companytxt">Company</label>
            <input type="text" name="company" id="companytxt" required>
            <label for="addresstxt">Address</label>
            <input type="text" name="address" id="addresstxt" required>
            <label for="countrytxt">Country</label>
            <input type="text" name="country" id="countrytxt" required>
            <label for="citytxt">City</label>
            <input type="text" name="city" id="citytxt" required>
            <label for="statetxt">State</label>
            <input type="text" name="state" id="statetxt" required>
            <label for="postalCodetxt">Postal code</label>
            <input type="text" name="postalCode" id="postalCodetxt" required>
            <label for="phonetxt">Phone</label>
            <input type="text" name="phone" id="phonetxt" required>
            <label for="faxtxt">Fax</label>
            <input type="text" name="fax" id="faxtxt" required>
            <label for="emailtxt">Email</label>
            <input type="email" name="email" id="emailtxt" required>
            <label for="passwordtxt">Password</label>
            <input type="password" name="password" id="passwordtxt" required>
            <input type="submit" value="Register" id="signupBtn">
        </fieldset>
        <?php
            include_once("footer.htm");
        ?>
    </form>
</body>