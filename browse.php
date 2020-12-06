<?php
    if(isset($_POST["trackName"]) && isset($_POST["trackLength"]) && isset($_POST["trackPrice"])){
        if(isset($_COOKIE["tracks"])){
            $newTrack = ["Name"=>$_POST["trackName"], "Length"=>$_POST["trackLength"], "Price"=>$_POST["trackPrice"]];
            $tracks = unserialize($_COOKIE["tracks"]);
            array_push($tracks, $newTrack);
            setcookie("tracks", serialize($tracks), time() + (86400 * 30), "/");
        }elseif(!isset($_COOKIE["tracks"])){
            $tracks = [];
            setcookie("tracks", serialize($tracks), time() + (86400 * 30), "/");
            $newTrack = ["Name"=>$_POST["trackName"], "Length"=>$_POST["trackLength"], "Price"=>$_POST["trackPrice"]];
            $tracks = unserialize($_COOKIE["tracks"]);
            array_push($tracks, $newTrack);
            setcookie("tracks", serialize($tracks), time() + (86400 * 30), "/");
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
    <body>
        <?php
            include_once("header.php");
        ?>
        <main>
            <div id="searchByDiv">
                <span id="info">Search based on the selected value: </span>
                <select id="searchBy">
                    <option default>Select one</span>
                    <option value="track">Track</option>
                    <option value="artist">Artist</option>
                    <option value="album">Album</option>
                </select>
            </div>
        </main>
        <?php
            include_once("footer.htm");
        ?>
    </body>
</html>