<?php
    $search = "";
    $test = "";
?>
<!DOCTYPE html>
<html lang="en">
    <head>
        <title>Chinook Abridged</title>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <link rel="stylesheet" href="css/styles.css">
        <script src="js/jquery-3.5.1.js"></script>
        <script src="js/script.js"></script>
    </head>
    <body>
        <div>
            <select id="selector">
                <option value="name">Name</option>
                <option value="artist">Artist</option>
            </select>
            <input type="text" id="searchText">
            <input type="button" id="searchBtn" value="Search">
        </div>
    </body>
</html>