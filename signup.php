<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Chinook Abridged</title>
    <link rel="stylesheet" href="css/styles.css">
    <script src="js/jquery-3.5.1.js"></script>
    <script src="js/signup.js"></script>
</head>
<body>
    <form action="signup.php" id="signupForm" method="POST">
        <fieldset id="signupFieldset">
            <legend>Signup Form</legend>
            <label for="firstNametxt">First name</label>
            <input type="text" name="firstName" id="firstNametxt" >
            <label for="lastNametxt">Last name</label>
            <input type="text" name="lastName" id="lastNametxt" >
            <label for="companytxt">Company</label>
            <input type="text" name="company" id="companytxt" >
            <label for="addresstxt">Address</label>
            <input type="text" name="address" id="addresstxt" >
            <label for="countrytxt">Country</label>
            <input type="text" name="country" id="countrytxt" >
            <label for="citytxt">City</label>
            <input type="text" name="city" id="citytxt" >
            <label for="statetxt">State</label>
            <input type="text" name="state" id="statetxt" >
            <label for="postalCodetxt">Postal code</label>
            <input type="text" name="postalCode" id="postalCodetxt" >
            <label for="phonetxt">Phone</label>
            <input type="text" name="phone" id="phonetxt" >
            <label for="faxtxt">Fax</label>
            <input type="text" name="fax" id="faxtxt" >
            <label for="emailtxt">Email</label>
            <input type="email" name="email" id="emailtxt" >
            <label for="passwordtxt">Password</label>
            <input type="password" name="password" id="passwordtxt" >
            <!-- <label for="confirmpasswordtxt">Confirm password</label> -->
            <!-- <input type="password" name="confirmpassword" id="confirmpasswordtxt" > -->
            <input type="submit" value="Register" id="signupBtn">
        </fieldset>
    </form>
</body>