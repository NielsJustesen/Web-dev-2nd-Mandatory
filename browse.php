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
    <body>
        <?php
            include_once("header.php");
        ?>
        <main>
            <div id="searchByDiv">
                <span>Search based on the selected value: </span>
                <select id="searchBy">
                    <option default>Select one</span>
                    <option value="track">Track</option>
                    <option value="artist">Artist</option>
                    <option value="album">Album</option>
                </select>
            </div>
            <!-- <div id=browseDiv>
            <span>Search tracks from: </span><br>
                <select id="order">
                    <option value="track">Track</option>
                    <option value="artist">Artist</option>
                    <option value="album">Album</option>
                </select>
                <input type="text" id="searchBy">
                <input type="button" id="searchBtn" value="Search">
            </div> -->
        </main>
        <?php
            include_once("footer.htm");
        ?>
    </body>
</html>