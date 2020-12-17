<?php
    session_start();
    if(isset($_SESSION["customerId"])){
        $cookieName = "CustomerID".$_SESSION["customerId"];
        if(isset($_POST["trackName"]) && isset($_POST["trackPrice"]) && isset($_POST["trackId"])){
            if(isset($_COOKIE[$cookieName])){
                $newTrack = ["Name"=>$_POST["trackName"], "Price"=>$_POST["trackPrice"], "TrackId"=>$_POST["trackId"]];
                $tracks = unserialize($_COOKIE[$cookieName]);
                $containsTrack = false;
                foreach ($tracks as $key => $value) {
                    if($newTrack["TrackId"] === $value["TrackId"]){
                        $containsTrack = true;
                    }
                }
                if(!$containsTrack){
                    array_push($tracks, $newTrack);
                    setcookie($cookieName, serialize($tracks), time() + (86400 * 30), "/", null, false, true);
                }
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
    <body>
        <?php
            include_once("header.php");
        ?>
        <main id="browseMain">
            <div id="searchByDiv">
                <span id="info">Search on Tracks, Albums and Artists </span>
                <fieldset id="trackSearchFieldset">
                    <legend>Track Search</legend>
                    <select id="order">
                        <option value="composer">Composer</option>
                        <option value="artist">Artist</option>
                        <option value="album">Album</option>
                    </select>
                    <input type="text" id="searchBy">
                    <input type="button" id="getTracksBtn" class="searchOption" value="Get Tracks">
                </fieldset>
                <input type="button" id="getArtistsBtn" class="searchOption" value="Get Artists">
                <input type="button" id="getAlbumsBtn" class="searchOption" value="Get Albums">
            </div>
        </main>
        <?php
            include_once("footer.htm");
        ?>
    </body>
</html>